import { AITutorRequest, AITutorResponse, AITutorStatus } from '../types/ai';

export const aiTutorService = {
  /**
   * Check AI service status and rate limits
   */
  async getStatus(): Promise<AITutorStatus> {
    try {
      const res = await fetch('/api/ai/status');
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback if running offline or API endpoint not available
    }

    return {
      isAvailable: true,
      provider: 'fallback',
      model: 'Khmer Java Knowledge Base',
      rateLimitPerMinute: 20,
      currentMinuteRequests: 0,
      hourlyLimit: 100,
      currentHourRequests: 0,
    };
  },

  /**
   * Send a query or contextual request to the AI Java Tutor
   */
  async askTutor(request: AITutorRequest): Promise<AITutorResponse> {
    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (res.status === 429) {
        const errorData = await res.json().catch(() => ({}));
        return {
          message: errorData.message || '⏳ អ្នកបានផ្ញើសំណើ AI លើសពីកម្រិតកំណត់ក្នុងមួយនាទីហើយ។ សូមរង់ចាំបន្តិចសិន។',
          actionType: request.actionType,
          isVerifiedExecution: false,
          rateLimitRemaining: 0,
          error: 'rate_limited',
        };
      }

      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('AI API endpoint unreachable, falling back to local reasoning:', e);
    }

    // Client-side offline fallback
    return this.getLocalFallbackResponse(request);
  },

  /**
   * Contextual Action: Explain Code Line by Line
   */
  async explainCode(code: string, lessonTitle?: string): Promise<AITutorResponse> {
    return this.askTutor({
      actionType: 'explain_code',
      prompt: 'សូមពន្យល់កូដនេះមួយជួរៗយ៉ាងលម្អិត និងងាយយល់សម្រាប់អ្នកចាប់ផ្តើមដំបូង។',
      codeContext: code,
      lessonTitle,
    });
  },

  /**
   * Contextual Action: Find the Bug
   */
  async findBug(code: string, errorOutput?: string, lessonTitle?: string): Promise<AITutorResponse> {
    return this.askTutor({
      actionType: 'find_bug',
      prompt: 'សូមស្វែងរកកំហុសក្នុងកូដ ឬសារ Error នេះ រួចពន្យល់ពីមូលហេតុ និងរបៀបកែប្រែឱ្យត្រឹមត្រូវ។',
      codeContext: code,
      errorContext: errorOutput,
      lessonTitle,
    });
  },

  /**
   * Contextual Action: Give Me a Hint
   */
  async giveHint(lessonTitle?: string, codeContext?: string): Promise<AITutorResponse> {
    return this.askTutor({
      actionType: 'give_hint',
      prompt: 'សូមផ្តល់តម្រុយ (Hints) ជាជំហានៗ ដើម្បីជួយឱ្យខ្ញុំគិត និងដោះស្រាយបញ្ហានេះបានដោយខ្លួនឯង ដោយមិនទាន់បង្ហាញចម្លើយពេញលេញឡើយ។',
      codeContext,
      lessonTitle,
    });
  },

  /**
   * Contextual Action: Simplify Explanation
   */
  async simplifyExplanation(conceptPrompt: string, lessonTitle?: string): Promise<AITutorResponse> {
    return this.askTutor({
      actionType: 'simplify',
      prompt: conceptPrompt || 'សូមសម្រួលការពន្យល់នេះឱ្យកាន់តែសាមញ្ញ ដោយប្រើឧទាហរណ៍ជាក់ស្តែងក្នុងជីវិតប្រចាំថ្ងៃនៅកម្ពុជា។',
      lessonTitle,
    });
  },

  /**
   * Contextual Action: Generate Practice
   */
  async generatePractice(level: 'beginner' | 'intermediate' | 'advanced' = 'beginner', topic?: string): Promise<AITutorResponse> {
    return this.askTutor({
      actionType: 'generate_practice',
      prompt: `សូមបង្កើតលំហាត់អនុវត្តកូដ Java ថ្មីមួយ សម្រាប់កម្រិត ${level} លើប្រធានបទ ${topic || 'មេរៀនបច្ចុប្បន្ន'}។`,
      level,
      lessonTitle: topic,
    });
  },

  /**
   * Safe local fallback in case network or backend is unreachable
   */
  getLocalFallbackResponse(request: AITutorRequest): AITutorResponse {
    const lines = (request.codeContext || '').split('\n').filter((l) => l.trim().length > 0);

    if (request.actionType === 'explain_code') {
      return {
        message: `សួស្តីប្អូន! ខ្ញុំជាលោកគ្រូ Java AI។ ខ្ញុំសូមពន្យល់កូដមួយជួរៗជូនប្អូន៖\n\n${
          lines.slice(0, 6).map((l, i) => `🔹 **ជួរទី ${i + 1} (${l.trim()})**: សេចក្តីថ្លែងការណ៍ Java ស្តង់ដារ។`).join('\n')
        }\n\n💡 *ចំណាំ៖ កូដនេះត្រូវបានបង្កើតឡើងសម្រាប់គោលបំណងពន្យល់។ សូមចុច 'Run' ដើម្បីដំណើរការជាក់ស្តែងក្នុង Sandbox OpenJDK 21។*`,
        actionType: 'explain_code',
        isVerifiedExecution: false,
        isFallback: true,
        suggestions: ['តើ static មានន័យដូចម្តេច?', 'ពន្យល់ពី For Loop', 'សុំតម្រុយជំនួយ'],
      };
    }

    if (request.actionType === 'find_bug') {
      return {
        message: `🔍 **ការវិភាគកំហុសកូដ Java**៖\n\n${
          request.errorContext
            ? `សារកំហុសដែលទទួលបាន៖ \`${request.errorContext.slice(0, 200)}\`\n\nសូមពិនិត្យមើលអក្ខរាវិរុទ្ធឈ្មោះអថេរ ការបិទបើកវង់ក្រចក និងសញ្ញា semicolon (\`;\`) នៅចុងបន្ទាត់។`
            : `ប្រសិនបើកូដមិនដំណើរការ សូមប្រាកដថា៖\n1. ឈ្មោះ Class ត្រូវគ្នានឹង File Name\n2. Main method មានទម្រង់ \`public static void main(String[] args)\`\n3. អថេរទាំងអស់ត្រូវបានប្រកាស Data Type ត្រឹមត្រូវ។`
        }\n\n💡 *សូមចុចប៊ូតុង "Run" ក្នុង Sandbox ដើម្បីពិនិត្យមើល Stack Trace ជាក់ស្តែង។*`,
        actionType: 'find_bug',
        isVerifiedExecution: false,
        isFallback: true,
        suggestions: ['តើធ្វើដូចម្តេចដើម្បីការពារ NullPointerException?', 'ពន្យល់កូដមួយជួរៗ'],
      };
    }

    return {
      message: `សួស្តីប្អូន! ខ្ញុំជាលោកគ្រូ Java AI។ ចំពោះសំណើ "${request.prompt || 'Java Help'}"៖ ខ្ញុំអាចជួយពន្យល់កូដ ស្វែងរកកំហុស ផ្តល់តម្រុយ ឬបង្កើតលំហាត់អនុវត្ត Java ជូនប្អូនបានគ្រប់ពេល។ សូមជ្រើសរើសប៊ូតុងមុខងាររហ័សខាងលើ!`,
      actionType: request.actionType || 'chat',
      isVerifiedExecution: false,
      isFallback: true,
      suggestions: ['Explain Code', 'Find the Bug', 'Give Me a Hint', 'Simplify Explanation', 'Generate Practice'],
    };
  },
};
