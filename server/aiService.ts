import { AITutorRequest, AITutorResponse, AITutorStatus, AITutorAction } from '../src/types/ai';

interface RateLimitRecord {
  timestamps: number[];
  hourTimestamps: number[];
}

const clientRateLimits = new Map<string, RateLimitRecord>();

const RATE_LIMIT_PER_MINUTE = parseInt(process.env.AI_RATE_LIMIT_PER_MINUTE || '20', 10);
const HOURLY_LIMIT = parseInt(process.env.AI_HOURLY_LIMIT || '100', 10);
const MAX_CODE_LENGTH = 4000;

/**
 * Checks rate limits per client identifier (IP or session token)
 */
export function checkRateLimit(clientId: string): { allowed: boolean; retryAfterSeconds?: number; remaining: number } {
  const now = Date.now();
  const minuteAgo = now - 60 * 1000;
  const hourAgo = now - 60 * 60 * 1000;

  let record = clientRateLimits.get(clientId);
  if (!record) {
    record = { timestamps: [], hourTimestamps: [] };
    clientRateLimits.set(clientId, record);
  }

  // Prune older timestamps
  record.timestamps = record.timestamps.filter((ts) => ts > minuteAgo);
  record.hourTimestamps = record.hourTimestamps.filter((ts) => ts > hourAgo);

  if (record.timestamps.length >= RATE_LIMIT_PER_MINUTE) {
    const oldest = record.timestamps[0];
    const retryAfterSeconds = Math.ceil((oldest + 60000 - now) / 1000);
    return { allowed: false, retryAfterSeconds, remaining: 0 };
  }

  if (record.hourTimestamps.length >= HOURLY_LIMIT) {
    const oldestHour = record.hourTimestamps[0];
    const retryAfterSeconds = Math.ceil((oldestHour + 3600000 - now) / 1000);
    return { allowed: false, retryAfterSeconds, remaining: 0 };
  }

  record.timestamps.push(now);
  record.hourTimestamps.push(now);

  const remaining = RATE_LIMIT_PER_MINUTE - record.timestamps.length;
  return { allowed: true, remaining };
}

/**
 * Get AI server status and configuration
 */
export function getAITutorStatus(clientId: string = 'default'): AITutorStatus {
  const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
  const provider = apiKey ? (process.env.AI_PROVIDER || 'gemini') as any : 'fallback';
  const model = process.env.AI_MODEL || (provider === 'gemini' ? 'gemini-3.5-flash' : 'gpt-4o-mini');

  const record = clientRateLimits.get(clientId) || { timestamps: [], hourTimestamps: [] };
  const minuteAgo = Date.now() - 60000;
  const hourAgo = Date.now() - 3600000;

  const currentMinuteRequests = record.timestamps.filter((t) => t > minuteAgo).length;
  const currentHourRequests = record.hourTimestamps.filter((t) => t > hourAgo).length;

  return {
    isAvailable: true,
    provider,
    model,
    rateLimitPerMinute: RATE_LIMIT_PER_MINUTE,
    currentMinuteRequests,
    hourlyLimit: HOURLY_LIMIT,
    currentHourRequests,
  };
}

/**
 * Builds system prompt enforcing natural Khmer, Java 21, and pedagogical rules
 */
function buildSystemPrompt(request: AITutorRequest): string {
  return `អ្នកគឺជា "លោកគ្រូ Java AI" (KJA AI Java Tutor) នៃ Khmer Java Academy។

ច្បាប់គរុកោសល្យ និងគោលការណ៍ណែនាំសំខាន់ៗ៖
1. ភាសា៖ ទំនាក់ទំនងជាភាសាខ្មែរធម្មជាតិ គួរសម លើកទឹកចិត្ត និងងាយយល់សម្រាប់សិស្សទើបចាប់ផ្តើម។ ប្រើពាក្យបច្ចេកទេសភាសាអង់គ្លេសក្នុងវង់ក្រចកនៅពេលសមស្រប ឧទាហរណ៍៖ "អថេរ (Variable)", "ថ្នាក់ (Class)", "វិធីសាស្ត្រ (Method)", "រង្វិលជុំ (Loop)"។
2. ជំនាញ៖ ឯកទេសខ្ពស់លើ Java 21 LTS និងកម្មវិធីសិក្សា 8 Modules របស់ Khmer Java Academy។
3. សកម្មភាពតាមបរិបទ (Contextual Actions):
   - "explain_code": ពន្យល់កូដមួយជួរៗ (Line-by-line breakdown) យ៉ាងច្បាស់លាស់។
   - "find_bug": ធ្វើរោគវិនិច្ឆ័យលើ Compiler Error ឬ Runtime Exception (ដូចជា NullPointerException, ArrayIndexOutOfBoundsException) ពន្យល់មូលហេតុ និងបង្ហាញវិធីកែប្រែ។
   - "give_hint": ផ្តល់តម្រុយជាជំហានៗ (Socratic Hint) ដោយមិនទាន់បង្ហាញចម្លើយពេញលេញឡើយ ដើម្បីជំរុញឱ្យសិស្សគិតដោយខ្លួនឯង។
   - "simplify": សម្រួលការពន្យល់ឱ្យកាន់តែងាយ ដោយប្រើឧទាហរណ៍ជីវិតពិតនៅកម្ពុជា (ការគណនាប្រាក់ ABA, ទិញកាហ្វេ, ជិះកង់បី, ពិន្ទុសិស្ស)។
   - "generate_practice": បង្កើតលំហាត់អនុវត្តកូដ Java ថ្មីដែលសមស្របតាមកម្រិតសិស្ស រួមមាន៖ ចំណងជើង, បញ្ហា, កូដគំរូចាប់ផ្តើម (Starter Code), និងតម្រុយ។
4. ភាពស្មោះត្រង់ផ្នែកបច្ចេកទេស៖
   - កុំអះអាងថាកូដដែលអ្នកបង្កើតបានរត់សាកល្បងដោយជោគជ័យឡើយ លើកលែងតែមានលទ្ធផល Execution Result ភ្ជាប់មកជាមួយ។
   - ញែកឱ្យច្បាស់រវាងច្បាប់ Java Specification ពិតប្រាកដ (ដូចជា Pass-by-value, String Immutability) និងការស្មាន។
   - ប្រសិនបើសិស្សឆ្លើយខុស សូមពន្យល់ពីមូលហេតុដោយពាក្យលើកទឹកចិត្ត មិនធ្វើឱ្យបាក់ទឹកចិត្តឡើយ។
5. ដែនកំណត់៖ រំលឹកសិស្សថាកូដ AI គួរតែត្រូវបានផ្ទៀងផ្ទាត់ និងដំណើរការក្នុង Sandbox ពិតប្រាកដ។`;
}

/**
 * Built-in Intelligent Fallback Engine for when no API key is provided or AI service is unavailable
 */
function generateIntelligentFallback(request: AITutorRequest): AITutorResponse {
  const { actionType, prompt, codeContext, errorContext, lessonTitle } = request;

  switch (actionType) {
    case 'explain_code': {
      const codeSnippet = codeContext ? codeContext.trim() : '';
      const lines = codeSnippet ? codeSnippet.split('\n') : [];
      let explanation = `សួស្តីប្អូន! ខ្ញុំជាលោកគ្រូ Java AI។ ខ្ញុំសូមពន្យល់កូដខាងលើមួយជួរៗជូនប្អូន៖\n\n`;

      if (lines.length > 0) {
        lines.slice(0, 10).forEach((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return;
          if (trimmed.startsWith('public class') || trimmed.startsWith('class')) {
            explanation += `🔹 **ជួរទី ${idx + 1} (${trimmed})**: ប្រកាសថ្នាក់ (Class) ដែលជាពុម្ពគំរូនៃកម្មវិធី Java របស់យើង។\n`;
          } else if (trimmed.includes('main(')) {
            explanation += `🔹 **ជួរទី ${idx + 1} (${trimmed})**: ជាច្រកចូលដំណើរការដំបូងបង្អស់របស់កម្មវិធី (Main Method Entry Point) ដែល JVM ស្វែងរកដើម្បីចាប់ផ្តើមរត់កូដ។\n`;
          } else if (trimmed.startsWith('int ') || trimmed.startsWith('double ') || trimmed.startsWith('String ')) {
            explanation += `🔹 **ជួរទី ${idx + 1} (${trimmed})**: ប្រកាស និងកំណត់តម្លៃឱ្យអថេរ (Variable Declaration & Assignment) សម្រាប់រក្សាទុកទិន្នន័យក្នុង Memory។\n`;
          } else if (trimmed.includes('System.out.println') || trimmed.includes('System.out.print')) {
            explanation += `🔹 **ជួរទី ${idx + 1} (${trimmed})**: បោះពុម្ពទិន្នន័យចេញទៅកាន់ Console/Terminal ដើម្បីបង្ហាញលទ្ធផលដល់អ្នកប្រើប្រាស់។\n`;
          } else if (trimmed.startsWith('for ') || trimmed.startsWith('while ')) {
            explanation += `🔹 **ជួរទី ${idx + 1} (${trimmed})**: រង្វិលជុំ (Loop) សម្រាប់ធ្វើសកម្មភាពដដែលៗតាមលក្ខខណ្ឌកំណត់។\n`;
          } else if (trimmed.startsWith('if ') || trimmed.startsWith('else')) {
            explanation += `🔹 **ជួរទី ${idx + 1} (${trimmed})**: ការត្រួតពិនិត្យលក្ខខណ្ឌ (Conditional Statement) ដើម្បីជ្រើសរើសផ្លូវដំណើរការកូដ។\n`;
          } else {
            explanation += `🔹 **ជួរទី ${idx + 1} (${trimmed})**: សេចក្តីថ្លែងការណ៍កូដ Java អនុវត្តតាមវេយ្យាករណ៍ស្តង់ដារ។\n`;
          }
        });
      } else {
        explanation += `បច្ចុប្បន្នគ្មានកូដនៅក្នុង Editor ទេ។ សូមសាកល្បងសរសេរ ឬជ្រើសរើសកូដគំរូ រួចចុច "Explain Code" ម្តងទៀត!`;
      }

      explanation += `\n💡 *ចំណាំ៖ កូដនេះត្រូវបានវិភាគដោយផ្អែកលើ Java 21 Syntax។ អ្នកអាចចុចប៊ូតុង Run ដើម្បីផ្ទៀងផ្ទាត់លទ្ធផលជាក់ស្តែងក្នុង Sandbox។*`;

      return {
        message: explanation,
        actionType: 'explain_code',
        isVerifiedExecution: false,
        isFallback: true,
        suggestions: ['តើ static មានន័យដូចម្តេច?', 'ពន្យល់ពី For Loop ឱ្យងាយយល់', 'បង្កើតលំហាត់អនុវត្ត'],
      };
    }

    case 'find_bug': {
      let analysis = `សួស្តីប្អូន! ខ្ញុំបានពិនិត្យមើលកូដ និងកំហុសរបស់ប្អូនហើយ៖\n\n`;

      if (errorContext && errorContext.trim()) {
        const err = errorContext.trim();
        if (err.includes('cannot find symbol')) {
          analysis += `🚨 **កំហុស Cannot Find Symbol (មិនស្គាល់អថេរ ឬ Method)**៖\n- **មូលហេតុ**៖ កូដកំពុងហៅឈ្មោះអថេរ ឬ method ដែលមិនទាន់បានប្រកាស ឬសរសេរខុសអក្សរតូច/ធំ (Case-sensitive)។\n- **វិធីកែប្រែ**៖ ពិនិត្យមើលអក្ខរាវិរុទ្ធឈ្មោះអថេរ និងប្រាកដថាបានប្រកាសវាជាមុនសិន។\n`;
        } else if (err.includes('NullPointerException')) {
          analysis += `🚨 **កំហុស NullPointerException (NPE)**៖\n- **មូលហេតុ**៖ កូដព្យាយាមហៅ method ឬ property លើ Object ដែលមានតម្លៃ null (គ្មាននៅក្នុង Memory)។\n- **វិធីកែប្រែ**៖ បន្ថែមការផ្ទៀងផ្ទាត់ \`if (obj != null)\` មុននឹងប្រើប្រាស់វា។\n`;
        } else if (err.includes('ArrayIndexOutOfBoundsException')) {
          analysis += `🚨 **កំហុស ArrayIndexOutOfBoundsException (លើសទំហំអារេ)**៖\n- **មូលហេតុ**៖ កំពុងព្យាយាមទាញយកធាតុនៅ Index លើសពីទំហំអារេ (កុំភ្លេចថា Array រាប់ពី 0 ដល់ length - 1)។\n- **វិធីកែប្រែ**៖ ពិនិត្យលក្ខខណ្ឌ Loop ដោយប្តូរពី \`i <= arr.length\` ទៅជា \`i < arr.length\`។\n`;
        } else if (err.includes('; expected')) {
          analysis += `🚨 **កំហុស Syntax: ; expected (ខ្វះសញ្ញាក្បៀសចុច)**៖\n- **មូលហេតុ**៖ បន្ទាត់សេចក្តីថ្លែងការណ៍ Java មិនបានបញ្ចប់ដោយសញ្ញា \`;\`។\n- **វិធីកែប្រែ**៖ បន្ថែមសញ្ញា \`;\` នៅចុងបន្ទាត់ដែលមានកំហុស។\n`;
        } else {
          analysis += `🚨 **សារកំហុស**៖ \`${err.slice(0, 200)}\`\n- **ការណែនាំ**៖ សូមពិនិត្យមើលបន្ទាត់ដែលបានបង្ហាញក្នុង Stack Trace ដើម្បីស្វែងរកកន្លែងដែលបង្កបញ្ហា។\n`;
        }
      } else if (codeContext) {
        if (!codeContext.includes(';')) {
          analysis += `⚠️ ពិនិត្យមើលចុងបន្ទាត់កូដ៖ ភាសា Java តម្រូវឱ្យរាល់ Statement ទាំងអស់ត្រូវបញ្ចប់ដោយសញ្ញា semicolon (\`;\`)។\n`;
        } else if (codeContext.includes('==') && codeContext.includes('String')) {
          analysis += `⚠️ ការប្រៀបធៀបខ្សែអក្សរ String៖ ប្រសិនបើប្រៀបធៀបខ្លឹមសារ String សូមកុំប្រើ \`==\` តែត្រូវប្រើ \`.equals()\` វិញ ដើម្បីជៀសវាងបញ្ហា Reference Comparison។\n`;
        } else {
          analysis += `✅ មិនមានកំហុសវេយ្យាករណ៍ធ្ងន់ធ្ងរត្រូវបានរកឃើញភ្លាមៗទេ។ សូមចុចប៊ូតុង **"Run"** ក្នុង Sandbox ដើម្បីពិនិត្យមើល Output ជាក់ស្តែង!`;
        }
      } else {
        analysis += `សូមផ្តល់កូដ ឬ Error Message ដើម្បីឱ្យខ្ញុំអាចជួយរកកំហុសបានកាន់តែសុក្រឹត!`;
      }

      return {
        message: analysis,
        actionType: 'find_bug',
        isVerifiedExecution: false,
        isFallback: true,
        suggestions: ['តើវិធីការពារ NullPointerException យ៉ាងដូចម្តេច?', 'ពន្យល់ពី Try-Catch', 'សុំតម្រុយជំនួយ'],
      };
    }

    case 'give_hint': {
      return {
        message: `💡 **តម្រុយគរុកោសល្យ (Socratic Hint)** សម្រាប់មេរៀន ${lessonTitle || 'Java'}៖\n\n1. **ជំហានទី ១**៖ កំណត់ប្រភេទតម្លៃ (Data Type) នៃលទ្ធផលដែលអ្នកចង់បាន (តើជា int, double, boolean ឬ String?)។\n2. **ជំហានទី ២**៖ គិតអំពីលក្ខខណ្ឌ ឬរូបមន្តគណនាដែលត្រូវប្រើ។ បើត្រូវធ្វើដដែលៗ សូមគិតដល់រង្វិលជុំ (For ឬ While Loop)។\n3. **ជំហានទី ៣**៖ សាកល្បងសរសេរសេចក្តីព្រាងកូដ (Pseudocode) លើក្រដាសជាជំហានៗ មុននឹងសរសេរកូដ Java ពិតប្រាកដ។\n\n*ប្អូនអាចសាកល្បងសរសេរបន្តិចសិន រួចផ្ញើមកឱ្យខ្ញុំពិនិត្យបានគ្រប់ពេល!*`,
        actionType: 'give_hint',
        isVerifiedExecution: false,
        isFallback: true,
        suggestions: ['ពន្យល់ឱ្យកាន់តែងាយ', 'រកកំហុសក្នុងកូដខ្ញុំ', 'បង្កើតលំហាត់អនុវត្ត'],
      };
    }

    case 'simplify': {
      return {
        message: `🌟 **ការពន្យល់បែបងាយយល់ (Real-world Analogy)**៖\n\nស្រមៃថាការសរសេរកម្មវិធី Java ដូចជាការគ្រប់គ្រងហាងកាហ្វេមួយ៖\n\n- **Class (ថ្នាក់)** ☕៖ ដូចជា "រូបមន្តឆុងកាហ្វេ" ឬម៉ឺនុយហាង ដែលបញ្ជាក់ថាកាហ្វេមួយកែវត្រូវមានអ្វីខ្លះ។\n- **Object (វត្ថុ)** 🥤៖ ដូចជាកែវកាហ្វេជាក់ស្តែងដែលឆុងរួចដាក់លើតុអតិថិជន។\n- **Variable (អថេរ)** 🏷️៖ ដូចជាស្លាកតម្លៃបិទលើកែវ (ឧ. \`price = 2.5\`)។\n- **Method (វិធីសាស្ត្រ)** ⚙️៖ ដូចជាសកម្មភាពឆុងកាហ្វេ ឬគិតលុយ (ឧ. \`brewCoffee()\`, \`payBill()\`)។\n\nតើប្អូនយល់កាន់តែច្បាស់ហើយឬនៅ? បើមានចំណុចណាមិនទាន់ច្បាស់ អាចសួរខ្ញុំបន្ថែមបាន!`,
        actionType: 'simplify',
        isVerifiedExecution: false,
        isFallback: true,
        suggestions: ['ពន្យល់ពី Loop ដោយប្រើឧទាហរណ៍ជាក់ស្តែង', 'តើ Inheritance ដូចអ្វីក្នុងជីវិតពិត?'],
      };
    }

    case 'generate_practice': {
      return {
        message: `🎯 **លំហាត់អនុវត្តថ្មី (Java Practice Challenge)**៖\n\n**ប្រធានបទ**៖ គណនាប្រាក់បញ្ចុះតម្លៃទំនិញ (Discount Calculator)\n\n**លក្ខខណ្ឌតម្រូវ**៖\n1. បង្កើតអថេរ \`double originalPrice = 50.0;\` (តម្លៃដើម $50)\n2. បង្កើតអថេរ \`double discountPercent = 15.0;\` (បញ្ចុះតម្លៃ 15%)\n3. គណនាតម្លៃដែលត្រូវបង់ចុងក្រោយ (Final Price = Original - Discount)\n4. បោះពុម្ពលទ្ធផលចេញមកក្រៅ Console ជាទម្រង់៖ \`"តម្លៃចុងក្រោយ: $42.50"\`\n\n**កូដគំរូចាប់ផ្តើម (Starter Code)**៖\n\`\`\`java\npublic class PracticeExercise {\n    public static void main(String[] args) {\n        double originalPrice = 50.0;\n        double discountPercent = 15.0;\n        \n        // សរសេរកូដគណនារបស់ប្អូនត្រង់នេះ\n        \n    }\n}\n\`\`\`\n\n💡 *តម្រុយ៖ រូបមន្តគណនាគឺ \`originalPrice * (1 - discountPercent / 100.0)\`*`,
        actionType: 'generate_practice',
        isVerifiedExecution: false,
        isFallback: true,
        suggestions: ['សុំតម្រុយបន្ថែម', 'បង្ហាញចម្លើយគំរូ', 'ពន្យល់កូដមួយជួរៗ'],
      };
    }

    default: {
      return {
        message: `សួស្តីប្អូន! ខ្ញុំជាលោកគ្រូ Java AI។ ចំពោះសំណួរ "${prompt || 'Java Programming'}"៖\n\nក្នុងភាសា Java 21 ការយល់ដឹងអំពីគោលការណ៍គ្រឹះ (Syntax, Types, Control Flow, OOP, Collections) គឺជាគ្រឹះដ៏សំខាន់បំផុត។\n\nប្អូនអាចសាកល្បងចុចលើប៊ូតុងមុខងាររហ័សខាងក្រោម៖\n- **Explain Code**៖ ពន្យល់កូដក្នុង Editor មួយជួរៗ\n- **Find the Bug**៖ ស្វែងរកកំហុស និងវិធីដោះស្រាយ\n- **Give Me a Hint**៖ សុំតម្រុយជំនួយក្នុងការដោះស្រាយលំហាត់\n- **Simplify Explanation**៖ សម្រួលការពន្យល់ជាមួយឧទាហរណ៍ជីវិតពិត\n- **Generate Practice**៖ បង្កើតលំហាត់អនុវត្តថ្មី\n\nតើប្អូនចង់ឱ្យខ្ញុំជួយលើចំណុចណាដែរ?`,
        actionType: 'chat',
        isVerifiedExecution: false,
        isFallback: true,
        suggestions: ['តើ JVM ដំណើរការយ៉ាងដូចម្តេច?', 'ពន្យល់ពី For Loop', 'បង្កើតលំហាត់អនុវត្តថ្មី'],
      };
    }
  }
}

/**
 * Executes a call to Google Gemini API with automatic resilient fallback
 */
async function callGeminiAPI(apiKey: string, prompt: string, systemPrompt: string): Promise<string> {
  const preferredModel = process.env.AI_MODEL || 'gemini-3.5-flash';
  const modelsToTry = [
    preferredModel,
    'gemini-3.5-flash-lite',
    'gemini-3-flash-preview',
    'gemini-flash-latest',
  ];

  let lastError: Error | null = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const requestBody = {
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nសំណួរ ឬសំណើរបស់សិស្ស៖\n${prompt}` }],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1500,
          topP: 0.95,
        },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(15000),
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 404 || response.status === 503 || response.status === 429) {
          console.warn(`[Gemini API] Model ${model} returned HTTP ${response.status}, rolling to next model...`);
          lastError = new Error(`Gemini API Error (${response.status}): ${errorText}`);
          continue;
        }
        throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
      }

      const data = (await response.json()) as any;
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!reply) {
        throw new Error('Gemini API returned an empty response');
      }
      return reply;
    } catch (err: any) {
      lastError = err;
      console.warn(`[Gemini API] Request to ${model} failed: ${err.message}`);
    }
  }

  throw lastError || new Error('All Gemini models failed');
}

/**
 * Executes a call to OpenAI API (or compatible endpoint)
 */
async function callOpenAIAPI(apiKey: string, prompt: string, systemPrompt: string): Promise<string> {
  const model = process.env.AI_MODEL || 'gpt-4o-mini';
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 1200,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API Error (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as any;
  const reply = data?.choices?.[0]?.message?.content;
  if (!reply) {
    throw new Error('OpenAI API returned an empty response');
  }
  return reply;
}

/**
 * Main AI Tutor handler - routes request securely, enforces rate limits, truncates payloads
 */
export async function handleAITutorRequest(
  request: AITutorRequest,
  clientId: string = 'client_default'
): Promise<AITutorResponse> {
  // 1. Check rate limits
  const rateLimit = checkRateLimit(clientId);
  if (!rateLimit.allowed) {
    return {
      message: `⏳ **អ្នកបានប្រើប្រាស់សំណើ AI លើសពីកម្រិតកំណត់** (${RATE_LIMIT_PER_MINUTE} សំណើ/នាទី)។\n\nសូមរង់ចាំប្រមាណ ${rateLimit.retryAfterSeconds} វិនាទី រួចសាកល្បងម្តងទៀត។ Khmer Java Academy កំណត់កម្រិតនេះដើម្បីធានាស្ថិរភាពប្រព័ន្ធ និងការពារការផ្ទុកលើសទម្ងន់។`,
      actionType: request.actionType,
      isVerifiedExecution: false,
      rateLimitRemaining: 0,
      error: 'rate_limited',
    };
  }

  // 2. Sanitize and truncate inputs to prevent excessive token consumption
  const sanitizedCode = request.codeContext ? request.codeContext.slice(0, MAX_CODE_LENGTH) : '';
  const sanitizedPrompt = (request.prompt || '').slice(0, 1000);
  const sanitizedError = (request.errorContext || '').slice(0, 1000);

  const enrichedRequest: AITutorRequest = {
    ...request,
    codeContext: sanitizedCode,
    prompt: sanitizedPrompt,
    errorContext: sanitizedError,
  };

  // 3. Check for API keys
  const geminiKey = process.env.GEMINI_API_KEY || (process.env.AI_PROVIDER === 'gemini' ? process.env.AI_API_KEY : undefined);
  const openaiKey = process.env.OPENAI_API_KEY || (process.env.AI_PROVIDER === 'openai' ? process.env.AI_API_KEY : undefined);
  const genericApiKey = process.env.AI_API_KEY;

  const systemPrompt = buildSystemPrompt(enrichedRequest);

  // Construct context-rich user query
  let userQuery = `[បរិបទមេរៀន]: ${enrichedRequest.lessonTitle || 'Java Fundamentals'} (Slug: ${enrichedRequest.lessonSlug || 'general'})\n`;
  if (enrichedRequest.level) {
    userQuery += `[កម្រិតសិក្សា]: ${enrichedRequest.level}\n`;
  }
  if (enrichedRequest.actionType) {
    userQuery += `[សកម្មភាពដែលត្រូវធ្វើ]: ${enrichedRequest.actionType}\n`;
  }
  if (sanitizedCode) {
    userQuery += `\n[កូដ Java ក្នុង Editor]:\n\`\`\`java\n${sanitizedCode}\n\`\`\`\n`;
  }
  if (sanitizedError) {
    userQuery += `\n[សារកំហុស Compiler / Runtime Exception]:\n\`\`\`\n${sanitizedError}\n\`\`\`\n`;
  }
  userQuery += `\n[សំណួរ ឬសំណើរបស់សិស្ស]:\n${sanitizedPrompt || 'សូមជួយពន្យល់ និងណែនាំលើកូដនេះ'}`;

  // 4. Attempt calling configured external AI provider
  try {
    if (geminiKey) {
      const reply = await callGeminiAPI(geminiKey, userQuery, systemPrompt);
      return {
        message: reply,
        actionType: request.actionType,
        isVerifiedExecution: false,
        isFallback: false,
        rateLimitRemaining: rateLimit.remaining,
      };
    } else if (openaiKey || (genericApiKey && process.env.AI_PROVIDER === 'openai')) {
      const key = openaiKey || genericApiKey!;
      const reply = await callOpenAIAPI(key, userQuery, systemPrompt);
      return {
        message: reply,
        actionType: request.actionType,
        isVerifiedExecution: false,
        isFallback: false,
        rateLimitRemaining: rateLimit.remaining,
      };
    }
  } catch (apiError: any) {
    console.warn('[AI Tutor Backend] External AI API failed, falling back to local expert engine:', apiError?.message);
    // Graceful fallback below
  }

  // 5. Intelligent Fallback Engine
  const fallback = generateIntelligentFallback(enrichedRequest);
  return {
    ...fallback,
    rateLimitRemaining: rateLimit.remaining,
  };
}
