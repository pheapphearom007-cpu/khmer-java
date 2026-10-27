import { CurriculumModule } from '../../types';

export const MODULE_2_SYNTAX_VARIABLES_IO: CurriculumModule = {
  id: 'mod-2',
  slug: 'syntax-variables-io',
  titleKm: '២. វេយ្យាករណ៍ អថេរ ប្រភេទទិន្នន័យ ប្រមាណវិធី ខ្សែអក្សរ និង I/O',
  titleEn: '2. Syntax, Variables, Data Types, Operators, Strings & I/O',
  descriptionKm: 'ស្វែងយល់ស៊ីជម្រៅពី Primitive Data Types, Type Casting, ប្រមាណវិធី Operators, String Immutability និងការបញ្ចូលទិន្នន័យតាម Scanner។',
  descriptionEn: 'Deep-dive into primitive data types, type casting, operators, string pool immutability, and interactive console I/O with Scanner.',
  icon: 'Layers',
  level: 'beginner',
  lessons: [
    {
      id: 'java-variables-types',
      slug: 'java-variables-types',
      moduleSlug: 'syntax-variables-io',
      order: 1,
      titleKm: 'អថេរ និងប្រភេទទិន្នន័យគ្រឹះ (Variables & Primitive Types)',
      titleEn: 'Variables & Primitive Data Types',
      difficulty: 'beginner',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីប្រភេទទិន្នន័យគ្រឹះទាំង ៨ (8 Primitive Data Types) របស់ Java',
        'ចេះប្រកាស និងកំណត់តម្លៃអថេរឱ្យបានត្រឹមត្រូវតាម naming convention',
        'យល់ច្បាស់ពី Type Casting (Widening ដោយស្វ័យប្រវត្ត និង Narrowing ដោយផ្ទាល់)',
      ],
      objectivesEn: [
        'Master all 8 primitive data types in Java and their memory footprints',
        'Properly declare, initialize, and follow camelCase variable naming conventions',
        'Understand widening vs narrowing type casting mechanisms',
      ],
      summaryKm: 'Java ជាភាសា Statically Typed ដែលតម្រូវឱ្យអ្នកបញ្ជាក់ប្រភេទអថេរឱ្យបានច្បាស់លាស់។ រៀនពីទំហំ Memory នៃប្រភេទនីមួយៗ និងវិធីបម្លែងតម្លៃ។',
      summaryEn: 'Java is statically typed. Learn memory allocations for primitive types and safe casting practices.',
      contentKm: `### ១. អ្វីទៅជាអថេរ (Variable)?
អថេរ គឺជាកន្លែងមួយក្នុង Memory សម្រាប់ផ្ទុកទិន្នន័យដែលកម្មវិធីរបស់អ្នកត្រូវការប្រើប្រាស់។ ដោយសារ Java ជាភាសា **Statically Typed** អ្នកត្រូវតែប្រកាសប្រភេទ (Data Type) របស់អថេរជានិច្ច មុនពេលដាក់តម្លៃឱ្យវា។

### ២. ប្រភេទទិន្នន័យគ្រឹះទាំង ៨ (8 Primitive Types)
| ប្រភេទ | ទំហំ Memory | តម្លៃដែលអាចផ្ទុកបាន | ឧទាហរណ៍ |
|---|---|---|---|
| \`byte\` | 1 byte (8 bits) | -128 ដល់ 127 | \`byte age = 25;\` |
| \`short\` | 2 bytes (16 bits) | -32,768 ដល់ 32,767 | \`short year = 2026;\` |
| \`int\` | 4 bytes (32 bits) | ប្រហែល -2 ពាន់លាន ដល់ 2 ពាន់លាន | \`int population = 17000000;\` |
| \`long\` | 8 bytes (64 bits) | ចំនួនគត់ធំសម្បើម (ត្រូវមានអក្សរ L នៅចុង) | \`long distance = 9876543210L;\` |
| \`float\` | 4 bytes (32 bits) | ចំនួនទសភាគ ៦-៧ ខ្ទង់ (ត្រូវមានអក្សរ f នៅចុង) | \`float price = 19.99f;\` |
| \`double\` | 8 bytes (64 bits) | ចំនួនទសភាគ ១៥-១៦ ខ្ទង់ (និយមប្រើបំផុត) | \`double pi = 3.1415926535;\` |
| \`boolean\` | 1 bit | \`true\` (ពិត) ឬ \`false\` (មិនពិត) | \`boolean isPassed = true;\` |
| \`char\` | 2 bytes (16 bits) | តួអក្សរ Unicode តែមួយ (សញ្ញា \`' \'\`) | \`char grade = 'A';\` |

### ៣. ការបម្លែងប្រភេទតម្លៃ (Type Casting)
1. **Widening Casting (ដោយស្វ័យប្រវត្ត):** បម្លែងពីប្រភេទតូចទៅធំ (ឧ. \`int\` ទៅ \`double\`)។ គ្មានការបាត់បង់ទិន្នន័យទេ។
2. **Narrowing Casting (ធ្វើដោយផ្ទាល់ដៃ):** បម្លែងពីប្រភេទធំមកតូច (ឧ. \`double\` មក \`int\`)។ អាចបាត់បង់កន្ទុយទសភាគ៖
\`\`\`java
double exactPrice = 9.99;
int roundedPrice = (int) exactPrice; // ទទួលបាន 9 (ដាច់កន្ទុយ .99)
\`\`\``,
      contentEn: `Explore Java's 8 primitive types, their bit representations, and precision trade-offs in numeric operations and casting.`,
      syntax: `// ទម្រង់: DataType variableName = initialValue;
int studentAge = 20;
double gpa = 3.85;
boolean isEnrolled = true;
char symbol = '🇰🇭';`,
      vocabulary: [
        {
          term: 'Primitive Type',
          khmerTerm: 'ប្រភេទទិន្នន័យគ្រឹះ',
          definitionKm: 'ប្រភេទតម្លៃមូលដ្ឋានរបស់ Java ដែលផ្ទុកទិន្នន័យផ្ទាល់ក្នុង Stack Memory ដោយមិនមែនជា Object',
          definitionEn: 'Basic, non-object data types built into the Java language.',
        },
        {
          term: 'Type Casting',
          khmerTerm: 'ការបម្លែងប្រភេទតម្លៃ',
          definitionKm: 'ដំណើរការបម្លែងតម្លៃពី Data Type មួយទៅ Data Type មួយផ្សេងទៀត',
          definitionEn: 'Assigning a value of one primitive data type to another type.',
        },
        {
          term: 'Statically Typed',
          khmerTerm: 'ភាសាកំណត់ប្រភេទតឹងរ៉ឹង',
          definitionKm: 'ភាសាដែលតម្រូវឱ្យត្រួតពិនិត្យប្រភេទអថេរនៅពេល Compile មុនពេលដំណើរការ',
          definitionEn: 'A language where variable types must be declared and checked at compile time.',
        },
      ],
      examples: [
        {
          title: 'ការប្រើប្រាស់ Data Types និង Type Casting',
          code: `public class Main {
    public static void main(String[] args) {
        // ១. ប្រកាសអថេរប្រភេទផ្សេងៗ
        int totalApples = 17;
        int totalPeople = 4;

        // ២. ការចែកដោយគ្មាន Casting (Integer Division)
        int perPersonInt = totalApples / totalPeople;
        System.out.println("ចែកជាចំនួនគត់ (បាត់ទសភាគ): " + perPersonInt);

        // ៣. ការចែកដោយប្រើ Widening Casting ទៅជា double
        double exactPerPerson = (double) totalApples / totalPeople;
        System.out.println("ចែកពិតប្រាកដ (មានទសភាគ): " + exactPerPerson);

        // ៤. Narrowing Casting ពី double មក int
        double priceUSD = 15.75;
        int roundedUSD = (int) priceUSD;
        System.out.println("កាត់យកតែចំនួនគត់: " + roundedUSD);
    }
}`,
          explanationKm: 'នៅពេលយក int ចែកនឹង int លទ្ធផលគឺកាត់ចោលទសភាគទាំងអស់។ ដើម្បីបានទសភាគត្រឹមត្រូវ យើងត្រូវ cast អថេរមួយទៅជា (double)។',
          explanationEn: 'Illustrates integer division truncation and explicit double casting for precision.',
          lineByLineExplanation: [
            {
              line: 'int perPersonInt = totalApples / totalPeople;',
              explanationKm: '17 ចែក 4 ជាចំនួនគត់ ទទួលបាន 4 (កាត់ចោលកន្ទុយ 0.25)។',
              explanationEn: 'Integer division truncates fractional components resulting in 4.',
            },
            {
              line: '(double) totalApples / totalPeople;',
              explanationKm: 'បម្លែង 17 ទៅ 17.0 ជាមុន ទើបការចែកផ្តល់លទ្ធផលជា double 4.25។',
              explanationEn: 'Casts numerator to double promoting floating-point division to yield 4.25.',
            },
            {
              line: 'int roundedUSD = (int) priceUSD;',
              explanationKm: 'កាត់យកតែផ្នែកចំនួនគត់នៃ 15.75 គឺ 15។',
              explanationEn: 'Explicit cast from double to int discarding decimals.',
            },
          ],
          expectedOutput: `ចែកជាចំនួនគត់ (បាត់ទសភាគ): 4
ចែកពិតប្រាកដ (មានទសភាគ): 4.25
កាត់យកតែចំនួនគត់: 15`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការចែកចំនួនគត់ (Integer Division Trap)',
          titleEn: 'Integer division truncation pitfall',
          badCode: `int a = 5;
int b = 2;
double result = a / b; // result នឹងទទួលបាន 2.0 មិនមែន 2.5 ទេ!`,
          goodCode: `int a = 5;
int b = 2;
double result = (double) a / b; // result គឺ 2.5 ត្រឹមត្រូវ`,
          explanationKm: 'កូដ `a / b` ធ្វើឡើងរវាង int និង int ដូច្នេះវាបង្កើតផលចែកជា int ជាមុនសិន ទើបយកទៅដាក់ក្នុង double។ ដំណោះស្រាយគឺត្រូវ cast មួយក្នុងចំណោមនោះជា `(double)`។',
          explanationEn: 'Division occurs before assignment. Without casting one operand to double, fractional data is permanently lost.',
        },
      ],
      exercise: {
        id: 'ex-vars-1',
        titleKm: 'គណនាពិន្ទុមធ្យមភាគ (Average Score Calculator)',
        titleEn: 'Calculate Floating-Point Average Score',
        descriptionKm: 'សិស្សម្នាក់ទទួលបានពិន្ទុ ៨៥, ៩២, និង ៧៨ ក្នុងមុខវិជ្ជា ៣។ ចូរបង្កើតអថេរគណនាផលបូក និងមធ្យមភាគជាទសភាគ (double)។',
        descriptionEn: 'Compute the exact floating-point average for three subject scores: 85, 92, and 78.',
        starterCode: `public class Main {
    public static void main(String[] args) {
        int score1 = 85;
        int score2 = 92;
        int score3 = 78;
        
        // គណនាផលបូក និងមធ្យមភាគត្រង់នេះ
        
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        int score1 = 85;
        int score2 = 92;
        int score3 = 78;
        
        int sum = score1 + score2 + score3;
        double average = (double) sum / 3;
        
        System.out.println("ផលបូកពិន្ទុ: " + sum);
        System.out.println("មធ្យមភាគ: " + average);
    }
}`,
        expectedOutput: `ផលបូកពិន្ទុ: 255
មធ្យមភាគ: 85.0`,
        hintsKm: [
          'បូកពិន្ទុទាំងបីចូលគ្នាដាក់ក្នុងអថេរ `int sum`',
          'គណនាមធ្យមភាគដោយប្រើ `(double) sum / 3` ដើម្បីកុំឱ្យបាត់ទសភាគ',
        ],
        hintsEn: [
          'Sum up the three variables into int sum',
          'Compute average as (double) sum / 3',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-var-1',
          questionKm: 'តើ Data Type មួយណាដែលស័ក្តិសមបំផុតសម្រាប់ផ្ទុកតម្លៃ Boolean `true` ឬ `false`?',
          questionEn: 'Which data type stores simple true/false flags?',
          difficulty: 'easy',
          hintsKm: ['ឈ្មោះរបស់វាដូចគ្នានឹងពិជគណិត Boolean'],
          hintsEn: ['boolean keyword.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បោះពុម្ពប្រភេទនោះ
        System.out.println("boolean");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        boolean flag = true;
        System.out.println("ប្រភេទ: boolean, តម្លៃ: " + flag);
    }
}`,
          expectedOutput: 'ប្រភេទ: boolean, តម្លៃ: true',
        },
        {
          id: 'pq-var-2',
          questionKm: 'តើមានអ្វីកើតឡើងប្រសិនបើអ្នកព្យាយាមដាក់តម្លៃ `int` លើសពី 2,147,483,647 (Integer Overflow)?',
          questionEn: 'What happens when an integer exceeds Integer.MAX_VALUE?',
          difficulty: 'medium',
          hintsKm: ['វានឹងវិលជុំមកលេខអវិជ្ជមានតូចបំផុតវិញ (Overflow)'],
          hintsEn: ['It wraps around to Integer.MIN_VALUE.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        int max = Integer.MAX_VALUE;
        // សាកល្បងបូក ១ ថែមទៀត
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        int max = Integer.MAX_VALUE;
        int overflow = max + 1;
        System.out.println("Max int : " + max);
        System.out.println("Overflow: " + overflow);
    }
}`,
          expectedOutput: `Max int : 2147483647
Overflow: -2147483648`,
        },
        {
          id: 'pq-var-3',
          questionKm: 'ចូរបង្ហាញកូដបម្លែងតួអក្សរ Unicode ខ្មែរ (`char`) ទៅជាលេខកូដ Code Point របស់វា (Integer ASCII/Unicode Value)។',
          questionEn: 'Convert a Khmer Unicode character into its numeric codepoint value.',
          difficulty: 'hard',
          hintsKm: ['អ្នកអាច Cast `(int) khmerChar` ដើម្បីទទួលបានលេខកូដ Unicode'],
          hintsEn: ['Cast (int) khmerChar directly.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        char ch = 'ក';
        // បម្លែង ch ទៅជា int
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        char ch = 'ក';
        int code = (int) ch;
        System.out.println("តួអក្សរ: " + ch + " មាន Unicode Code Point: " + code);
    }
}`,
          expectedOutput: 'តួអក្សរ: ក មាន Unicode Code Point: 6016',
        },
      ],
      quizzes: [
        {
          id: 'q-var-1',
          questionKm: 'តើ float និង double ខុសគ្នាយ៉ាងដូចម្តេចក្នុង Java?',
          questionEn: 'How do float and double differ in Java?',
          optionsKm: [
            'float ផ្ទុកចំនួនគត់ double ផ្ទុកទសភាគ',
            'float មានទំហំ 4 bytes រីឯ double មានទំហំ 8 bytes និងមានភាពជាក់លាក់ខ្ពស់ជាង',
            'គ្មានអ្វីខុសគ្នាឡើយ',
            'float អាចផ្ទុកអក្សរបាន',
          ],
          optionsEn: [
            'float is for integers, double is for fractions',
            'float is 4 bytes (single precision), double is 8 bytes (double precision)',
            'They are identical',
            'float can hold characters',
          ],
          correctOptionIndex: 1,
          explanationKm: 'float ជា Single-precision (32-bit) ខណៈ double ជា Double-precision (64-bit) ដែលផ្តល់ភាពសុក្រឹតខ្ពស់ជាងទ្វេដង។',
          explanationEn: 'double offers 64-bit IEEE 754 precision compared to float\'s 32-bit single precision.',
          hintKm: 'មើលលើចំនួន byte និងភាពសុក្រឹត',
          hintEn: '4 bytes vs 8 bytes precision.',
        },
        {
          id: 'q-var-2',
          questionKm: 'តើការបម្លែងមួយណាដែលតម្រូវឱ្យប្រើ Explicit Narrowing Casting (ដាក់វង់ក្រចក)?',
          questionEn: 'Which conversion requires an explicit cast?',
          optionsKm: ['byte ទៅ int', 'int ទៅ double', 'double ទៅ int', 'float ទៅ double'],
          optionsEn: ['byte to int', 'int to double', 'double to int', 'float to double'],
          correctOptionIndex: 2,
          explanationKm: 'ការបម្លែងពី double (8 bytes) មក int (4 bytes) អាចបាត់បង់ទិន្នន័យទសភាគ ដូច្នេះ Java តម្រូវឱ្យសរសេរ `(int)` បញ្ជាក់ដោយផ្ទាល់។',
          explanationEn: 'Narrowing conversions from double to int can cause loss of precision, requiring explicit syntax (int).',
          hintKm: 'បម្លែងពីប្រភេទធំដែលមានទសភាគ មកប្រភេទតូចដែលជាចំនួនគត់',
          hintEn: 'From high precision floating point to integer.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_data_types.asp',
    },
    {
      id: 'java-operators',
      slug: 'java-operators',
      moduleSlug: 'syntax-variables-io',
      order: 2,
      titleKm: 'ប្រមាណវិធី និងកន្សោមគណិត (Java Operators & Expressions)',
      titleEn: 'Java Operators & Expressions',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      objectivesKm: [
        'ប្រើប្រាស់ប្រមាណវិធីនព្វន្ធ (+, -, *, /, %) និងម៉ូឌុយឡូ Modulo ឱ្យបានស្ទាត់ជំនាញ',
        'យល់ច្បាស់ពីប្រមាណវិធីប្រៀបធៀប (==, !=, >, <, >=, <=) និងតក្កវិជ្ជា (&&, ||, !)',
        'ចេះប្រើប្រាស់ Ternary Operator (? :) ជាទម្រង់សង្ខេបនៃ if-else',
      ],
      objectivesEn: [
        'Master arithmetic (+, -, *, /, %) and remainder modulo operations',
        'Understand comparison and logical operators (&&, ||, !)',
        'Apply the concise ternary operator (? :) in expressions',
      ],
      summaryKm: 'ប្រមាណវិធីគឺជាសញ្ញាពិសេសដែលប្រើសម្រាប់គណនា ប្រៀបធៀប និងវាយតម្លៃលក្ខខណ្ឌនៅក្នុងកូដ Java។',
      summaryEn: 'Operators perform mathematical calculations, relational comparisons, and logical decision evaluations.',
      contentKm: `### ១. ប្រមាណវិធីនព្វន្ធ (Arithmetic Operators)
- \`+\` បូក (ឬភ្ជាប់ String)
- \`-\` ដក
- \`*\` គុណ
- \`/\` ចែក
- \`%\` ម៉ូឌុយឡូ (សំណល់នៃការចែក): ឧទាហរណ៍ \`10 % 3 = 1\`
- \`++\` បន្ថែមតម្លៃ ១ (Increment), \`--\` បន្ថយតម្លៃ ១ (Decrement)

### ២. ប្រមាណវិធីប្រៀបធៀប (Relational Operators)
ផ្តល់លទ្ធផលជា \`true\` ឬ \`false\`៖
- \`==\` ស្មើគ្នា, \`!=\` មិនស្មើគ្នា
- \`>\` ធំជាង, \`<\` តូចជាង, \`>=\` ធំជាងឬស្មើ, \`<=\` តូចជាងឬស្មើ

### ៣. ប្រមាណវិធីតក្កវិជ្ជា (Logical Operators)
- \`&&\` (Logical AND): ពិត លុះត្រាតែលក្ខខណ្ឌទាំងសងខាងពិតទាំងអស់។
- \`||\` (Logical OR): ពិត ប្រសិនបើមានលក្ខខណ្ឌណាមួយពិត។
- \`!\` (Logical NOT): បញ្ច្រាសតម្លៃពិតទៅជាមិនពិត និងច្រាសមកវិញ។

### ៤. Ternary Operator (លក្ខខណ្ឌ ៣ តួ)
ជាទម្រង់កាត់ខ្លីនៃ \`if-else\`៖
\`\`\`java
variable = (condition) ? valueIfTrue : valueIfFalse;
\`\`\``,
      contentEn: `Learn arithmetic, relational, boolean logic short-circuiting, and clean shorthand ternary expressions in Java.`,
      syntax: `// Ternary syntax:
String status = (score >= 50) ? "ជាប់" : "ធ្លាក់";`,
      vocabulary: [
        {
          term: 'Modulo (%)',
          khmerTerm: 'ប្រមាណវិធីរកសំណល់',
          definitionKm: 'ប្រមាណវិធីដែលរកសំណល់សល់ពីការចែកចំនួនគត់ពីរ',
          definitionEn: 'Remainder operator yielding the residue after integer division.',
        },
        {
          term: 'Short-circuit Evaluation',
          khmerTerm: 'ការវាយតម្លៃផ្លូវកាត់',
          definitionKm: 'យន្តការដែល && ឈប់ពិនិត្យបន្តបើផ្នែកខាងឆ្វេង false ហើយ || ឈប់ពិនិត្យបើផ្នែកខាងឆ្វេង true',
          definitionEn: 'Behavior where the second argument of && or || is not evaluated if the first determines the outcome.',
        },
        {
          term: 'Ternary Operator',
          khmerTerm: 'ប្រមាណវិធីលក្ខខណ្ឌបីតួ',
          definitionKm: 'សញ្ញា ? : សម្រាប់កំណត់តម្លៃអថេរដោយផ្អែកលើលក្ខខណ្ឌពិតឬមិនពិត',
          definitionEn: 'Inline conditional expression evaluating condition ? ifTrue : ifFalse.',
        },
      ],
      examples: [
        {
          title: 'ការប្រើប្រាស់ Modulo, Logical Operators និង Ternary',
          code: `public class Main {
    public static void main(String[] args) {
        int number = 14;

        // ១. ពិនិត្យលេខគូ ឬលេខសេសដោយប្រើ Modulo (%)
        boolean isEven = (number % 2 == 0);
        System.out.println("លេខ " + number + " ជាលេខគូ: " + isEven);

        // ២. ពិនិត្យលក្ខខណ្ឌតក្កវិជ្ជា (Logical AND &&)
        int age = 19;
        boolean hasNationalId = true;
        boolean canVote = (age >= 18) && hasNationalId;
        System.out.println("មានសិទ្ធិបោះឆ្នោត: " + canVote);

        // ៣. Ternary Operator
        int examScore = 75;
        String result = (examScore >= 50) ? "ជាប់ការប្រឡង (Passed)" : "ធ្លាក់ (Failed)";
        System.out.println("លទ្ធផលប្រឡង: " + result);
    }
}`,
          explanationKm: 'កម្មវិធីនេះបង្ហាញពីការប្រើ `% 2 == 0` រកលេខគូ ការប្រើ `&&` ផ្ទៀងផ្ទាត់លក្ខខណ្ឌពីរដំណាលគ្នា និង `? :` ផ្តល់ចម្លើយខ្លីរហ័ស។',
          explanationEn: 'Demonstrates modulo parity testing, conjunction with &&, and ternary evaluation.',
          lineByLineExplanation: [
            {
              line: '(number % 2 == 0)',
              explanationKm: '14 ចែក 2 សល់សំណល់ 0 ដូច្នេះលទ្ធផលគឺ true (លេខគូ)។',
              explanationEn: 'Evaluates if the remainder when divided by 2 is 0.',
            },
            {
              line: '(age >= 18) && hasNationalId',
              explanationKm: 'ទាំងអាយុលើសពី 18 និងមានអត្តសញ្ញាណប័ណ្ណ សុទ្ធតែ true ដូច្នេះ canVote គឺ true។',
              explanationEn: 'Both operands must be true for conjunction to hold.',
            },
            {
              line: '(examScore >= 50) ? ... : ...',
              explanationKm: 'ដោយសារ 75 >= 50 គឺ true វានឹងជ្រើសយកតម្លៃ "ជាប់ការប្រឡង"។',
              explanationEn: 'Evaluates condition and selects first branch on true.',
            },
          ],
          expectedOutput: `លេខ 14 ជាលេខគូ: true
មានសិទ្ធិបោះឆ្នោត: true
លទ្ធផលប្រឡង: ជាប់ការប្រឡង (Passed)`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការច្រឡំរវាងសញ្ញាស្មើមួយ (=) និងសញ្ញាស្មើពីរ (==)',
          titleEn: 'Confusing assignment (=) with equality comparison (==)',
          badCode: `int x = 5;
if (x = 10) { // កំហុស Compile Error: Type mismatch cannot convert int to boolean!
    System.out.println("ស្មើដប់");
}`,
          goodCode: `int x = 5;
if (x == 10) { // ត្រឹមត្រូវ: ប្រើ == សម្រាប់ប្រៀបធៀបតម្លៃ
    System.out.println("ស្មើដប់");
}`,
          explanationKm: 'សញ្ញា `=` គឺសម្រាប់កំណត់តម្លៃ (Assignment) រីឯ `==` គឺសម្រាប់ប្រៀបធៀបភាពស្មើគ្នានៃតម្លៃ (Equality Comparison)។',
          explanationEn: 'Single = assigns a value. Double == compares two values for equality.',
        },
      ],
      exercise: {
        id: 'ex-op-1',
        titleKm: 'ប្រព័ន្ធបញ្ចុះតម្លៃទំនិញ (Discount Eligibility)',
        titleEn: 'Store Discount Evaluation',
        descriptionKm: 'អតិថិជននឹងទទួលបានការបញ្ចុះតម្លៃ ២០% ប្រសិនបើទិញទំនិញលើសពី ៥០$ ឬជាសមាជិក VIP។ ចូរសរសេរកូដដោយប្រើប្រមាណវិធី `||` និង Ternary Operator ដើម្បីកំណត់អត្រាបញ្ចុះតម្លៃ។',
        descriptionEn: 'A customer receives 20% discount if spending over $50 or holding VIP membership. Use || and ternary operator.',
        starterCode: `public class Main {
    public static void main(String[] args) {
        double totalBill = 45.0;
        boolean isVip = true;

        // ប្រើ || និង ternary operator ដើម្បីកំណត់ discountPercent
        
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        double totalBill = 45.0;
        boolean isVip = true;

        boolean isEligible = (totalBill > 50.0) || isVip;
        int discountPercent = isEligible ? 20 : 0;

        System.out.println("សិទ្ធិទទួលបានបញ្ចុះតម្លៃ: " + isEligible);
        System.out.println("អត្រាបញ្ចុះតម្លៃ: " + discountPercent + "%");
    }
}`,
        expectedOutput: `សិទ្ធិទទួលបានបញ្ចុះតម្លៃ: true
អត្រាបញ្ចុះតម្លៃ: 20%`,
        hintsKm: [
          'ប្រើ `(totalBill > 50.0) || isVip` សម្រាប់លក្ខខណ្ឌ',
          'ប្រើ Ternary `isEligible ? 20 : 0`',
        ],
        hintsEn: [
          'Use (totalBill > 50.0) || isVip',
          'Use ternary isEligible ? 20 : 0',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-op-1',
          questionKm: 'តើកន្សោម `17 % 5` ផ្តល់លទ្ធផលជាលេខអ្វី?',
          questionEn: 'What is the evaluated output of 17 % 5?',
          difficulty: 'easy',
          hintsKm: ['17 ចែកនឹង 5 បាន 3 សល់សំណល់ប៉ុន្មាន?'],
          hintsEn: ['17 divided by 5 equals 3 with what remainder?'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("សំណល់គឺ: " + (17 % 5));
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println(17 % 5);
    }
}`,
          expectedOutput: '2',
        },
        {
          id: 'pq-op-2',
          questionKm: 'តើ `x++` (Post-increment) និង `++x` (Pre-increment) ខុសគ្នាយ៉ាងដូចម្តេចពេលយកទៅប្រើក្នុងកន្សោម?',
          questionEn: 'What is the distinction between post-increment x++ and pre-increment ++x in expressions?',
          difficulty: 'medium',
          hintsKm: ['x++ ប្រើតម្លៃចាស់រួចទើបបូក ១, ++x បូក ១ ជាមុនទើបយកទៅប្រើ'],
          hintsEn: ['Post-increment yields old value then increments; pre-increment increments first.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        int a = 5;
        int b = a++;
        int c = ++a;
        // បង្ហាញតម្លៃ b និង c
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        int a = 5;
        int b = a++; // b = 5, a ក្លាយជា 6
        int c = ++a; // a ក្លាយជា 7, c = 7
        System.out.println("b = " + b + ", c = " + c + ", a = " + a);
    }
}`,
          expectedOutput: 'b = 5, c = 7, a = 7',
        },
        {
          id: 'pq-op-3',
          questionKm: 'ចូរសរសេរកូដពិនិត្យឆ្នាំបង្គ្រប់ (Leap Year) តាមរូបមន្ត៖ ឆ្នាំនោះចែកដាច់នឹង 400 ឬ (ចែកដាច់នឹង 4 ហើយមិនចែកដាច់នឹង 100)។',
          questionEn: 'Implement leap year evaluation: divisible by 400 OR (divisible by 4 AND NOT divisible by 100).',
          difficulty: 'hard',
          hintsKm: ['ប្រើប្រមាណវិធី %, ==, !=, &&, ||'],
          hintsEn: ['Combine %, ==, !=, &&, and || operators.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        int year = 2024;
        // សរសេរលក្ខខណ្ឌពិនិត្យ leap year
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        int year = 2024;
        boolean isLeapYear = (year % 400 == 0) || ((year % 4 == 0) && (year % 100 != 0));
        System.out.println("ឆ្នាំ " + year + " ជាឆ្នាំបង្គ្រប់: " + isLeapYear);
    }
}`,
          expectedOutput: 'ឆ្នាំ 2024 ជាឆ្នាំបង្គ្រប់: true',
        },
      ],
      quizzes: [
        {
          id: 'q-op-1',
          questionKm: 'តើប្រមាណវិធីណាខ្លះដែលគាំទ្រ Short-circuit evaluation?',
          questionEn: 'Which operators exhibit short-circuit evaluation in Java?',
          optionsKm: ['&& និង ||', '& និង |', '+ និង -', '== និង !='],
          optionsEn: ['&& and ||', '& and |', '+ and -', '== and !='],
          correctOptionIndex: 0,
          explanationKm: '&& និង || នឹងបញ្ឈប់ការគណនាបន្ត ប្រសិនបើលក្ខខណ្ឌដំបូងអាចសន្និដ្ឋានលទ្ធផលបានរួចជាស្រេច។',
          explanationEn: '&& and || do not evaluate the right operand when the left operand suffices.',
          hintKm: 'សញ្ញា & ពីរ និង | ពីរ',
          hintEn: 'Logical AND and OR double-character operators.',
        },
        {
          id: 'q-op-2',
          questionKm: 'តើអ្វីជាលទ្ធផលនៃ `true || false && false` ដោយផ្អែកលើ Operator Precedence?',
          questionEn: 'What is the result of true || false && false?',
          optionsKm: ['true', 'false', 'Compile Error', 'Null'],
          optionsEn: ['true', 'false', 'Compile Error', 'Null'],
          correctOptionIndex: 0,
          explanationKm: '&& មានអាទិភាពខ្ពស់ជាង || ដូច្នេះ `false && false` គណនាមុនបាន `false`។ បន្ទាប់មក `true || false` ផ្តល់លទ្ធផល `true`។',
          explanationEn: '&& has higher precedence than ||. Hence (false && false) = false, then (true || false) = true.',
          hintKm: '&& គណនាមុន ||',
          hintEn: '&& takes precedence over ||.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_operators.asp',
    },
    {
      id: 'java-strings',
      slug: 'java-strings',
      moduleSlug: 'syntax-variables-io',
      order: 3,
      titleKm: 'ខ្សែអក្សរ និង String Pool (Java Strings & Text Processing)',
      titleEn: 'Java Strings & Text Processing',
      difficulty: 'beginner',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីគោលការណ៍ Immutability (មិនអាចផ្លាស់ប្តូរបាន) របស់ String ក្នុង Java',
        'ស្គាល់ពីទីតាំង និងដំណើរការរបស់ String Constant Pool ក្នុង Heap Memory',
        'ចេះប្រើប្រាស់ Methods សំខាន់ៗ: length(), charAt(), substring(), equals(), toUpperCase() និង StringBuilder',
      ],
      objectivesEn: [
        'Understand String immutability in Java',
        'Learn how the String Constant Pool optimizes heap memory usage',
        'Master essential methods: length(), charAt(), substring(), equals(), and StringBuilder',
      ],
      summaryKm: 'String គឺជា Object ពិសេសបំផុតក្នុង Java ដែលមិនអាចកែប្រែបាន (Immutable) និងត្រូវបានគ្រប់គ្រងដោយ String Pool ដើម្បីសន្សំសំចៃ Memory។',
      summaryEn: 'Strings are immutable objects in Java managed via the String Constant Pool for memory efficiency.',
      contentKm: `### ១. String ជាអ្វី?
ក្នុង Java ខ្សែអក្សរ (String) មិនមែនជា Primitive Type ទេ ប៉ុន្តែវាជា **Reference Type / Object** នៃថ្នាក់ \`java.lang.String\`។

### ២. គោលការណ៍ String Immutability
ពេលដែល String Object មួយត្រូវបានបង្កើតឡើង តម្លៃរបស់វាមិនអាចកែប្រែបានឡើយ (Immutable)។ រាល់ពេលដែលអ្នកកែ ឬត String (Concanetation) Java នឹងបង្កើត **Object ថ្មីមួយផ្សេងទៀត** នៅក្នុង Memory៖
\`\`\`java
String s = "Khmer";
s = s + " Java"; // បង្កើត Object ថ្មី "Khmer Java", Object ចាស់ "Khmer" នៅដដែល
\`\`\`

### ៣. String Constant Pool (SCP)
ដើម្បីសន្សំសំចៃ Memory JVM មានតំបន់ពិសេសក្នុង Heap ហៅថា **String Pool**៖
- ប្រសិនបើអ្នកបង្កើត String ដោយប្រើ Literal: \`String a = "Java"; String b = "Java";\` -> \`a\` និង \`b\` ចង្អុលទៅកាន់ Object តែមួយគត់ក្នុង Pool!
- ប្រសិនបើប្រើ \`new String("Java")\` -> Java នឹងបង្ខំបង្កើត Object ថ្មីក្នុង Heap ដាច់ដោយឡែក។

### ៤. ក្បួនប្រៀបធៀប String: .equals() vs ==
- \`==\` ប្រៀបធៀប **Memory Address (Reference)** ថាតើអថេរទាំងពីរចង្អុលទៅកន្លែងតែមួយឬអត់។
- \`.equals()\` ប្រៀបធៀប **អត្ថបទពិតប្រាកដ (Value Content)** នៃខ្សែអក្សរ។ **ចងចាំ:** តែងតែប្រើ \`.equals()\` ដើម្បីប្រៀបធៀប String!`,
      contentEn: `Deep-dive into string immutability, the internal string constant pool, StringBuilder for high-performance concatenation, and correct equality checking with .equals().`,
      syntax: `// ការប្រកាស String
String name = "កម្ពុជា";

// Method សំខាន់ៗ
int len = name.length();
char c = name.charAt(0);
boolean eq = name.equals("កម្ពុជា");`,
      vocabulary: [
        {
          term: 'Immutability',
          khmerTerm: 'ភាពមិនប្រែប្រួល',
          definitionKm: 'លក្ខណៈដែល Object មិនអាចផ្លាស់ប្តូរទិន្នន័យខាងក្នុងរបស់វាបានឡើយ បន្ទាប់ពីបង្កើតរួច',
          definitionEn: 'The state where an object cannot be modified after its creation.',
        },
        {
          term: 'String Constant Pool',
          khmerTerm: 'បណ្តុំខ្សែអក្សរអចិន្ត្រៃយ៍',
          definitionKm: 'តំបន់ផ្ទុកពិសេសក្នុង Heap ដែល JVM ប្រើសម្រាប់រក្សាទុកខ្សែអក្សរតែមួយច្បាប់ដើម្បីសន្សំ Memory',
          definitionEn: 'A storage area in the Java heap where string literals are pooled and shared.',
        },
        {
          term: 'StringBuilder',
          khmerTerm: 'ឧបករណ៍សាងសង់ String បែបកែប្រែបាន',
          definitionKm: 'Class មួយដែលអនុញ្ញាតឱ្យត និងកែប្រែអក្សរបានលឿនដោយមិនបាច់បង្កើត Object ថ្មីរាល់ដង',
          definitionEn: 'A mutable sequence of characters optimized for high-performance string concatenation.',
        },
      ],
      examples: [
        {
          title: 'ការប្រើប្រាស់ String Methods និងការប្រៀបធៀប',
          code: `public class Main {
    public static void main(String[] args) {
        String greeting = "សួស្តី Khmer Java Academy!";

        // ១. ប្រវែងខ្សែអក្សរ
        System.out.println("ប្រវែង String: " + greeting.length());

        // ២. Substring កាត់យកផ្នែកខ្លះ
        String sub = greeting.substring(7, 12);
        System.out.println("កាត់យកពាក្យ: " + sub);

        // ៣. បម្លែងជាអក្សរធំ និងតូច
        String enText = "learn java today";
        System.out.println("អក្សរធំ: " + enText.toUpperCase());

        // ៤. ភាពខុសគ្នារវាង == និង .equals()
        String str1 = "Angkor";
        String str2 = new String("Angkor");

        System.out.println("ប្រៀបធៀបដោយ == : " + (str1 == str2)); // false
        System.out.println("ប្រៀបធៀបដោយ .equals(): " + str1.equals(str2)); // true
    }
}`,
          explanationKm: 'បង្ហាញពីការប្រើ `.length()`, `.substring()`, `.toUpperCase()` និងបញ្ជាក់ច្បាស់ពីមូលហេតុដែល `==` ផ្តល់ false ខណៈ `.equals()` ផ្តល់ true។',
          explanationEn: 'Demonstrates common String manipulation methods and semantic equality testing with .equals().',
          lineByLineExplanation: [
            {
              line: 'greeting.length()',
              explanationKm: 'រាប់ចំនួនតួអក្សរទាំងអស់នៅក្នុងខ្សែអក្សរ (រាប់បញ្ចូលទាំងដកឃ្លា)។',
              explanationEn: 'Returns the total character count in the string.',
            },
            {
              line: 'greeting.substring(7, 12)',
              explanationKm: 'កាត់យកអក្សរចាប់ពី Index 7 ដល់ 11 (មុន Index 12) គឺពាក្យ "Khmer"។',
              explanationEn: 'Extracts a slice from index 7 inclusive to 12 exclusive.',
            },
            {
              line: 'str1.equals(str2)',
              explanationKm: 'ពិនិត្យខ្លឹមសារអក្សរ "Angkor" ដូចគ្នា ដូច្នេះផ្តល់តម្លៃ true។',
              explanationEn: 'Compares the actual character contents for strict semantic equality.',
            },
          ],
          expectedOutput: `ប្រវែង String: 26
កាត់យកពាក្យ: Khmer
អក្សរធំ: LEARN JAVA TODAY
ប្រៀបធៀបដោយ == : false
ប្រៀបធៀបដោយ .equals(): true`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការប្រើប្រាស់ == ដើម្បីប្រៀបធៀប String ពីរ',
          titleEn: 'Using == instead of .equals() for string comparison',
          badCode: `String s1 = new String("Java");
String s2 = new String("Java");
if (s1 == s2) { // មិនដំណើរការឡើយព្រោះ s1 និង s2 មាន Address ខុសគ្នា!
    System.out.println("ដូចគ្នា");
}`,
          goodCode: `String s1 = new String("Java");
String s2 = new String("Java");
if (s1.equals(s2)) { // ត្រឹមត្រូវ: ប្រៀបធៀបតម្លៃខាងក្នុង
    System.out.println("ដូចគ្នា");
}`,
          explanationKm: '`==` ពិនិត្យលើអាសយដ្ឋាន Memory រីឯ `.equals()` ពិនិត្យលើតួអក្សរជាក់ស្តែង។ ក្នុង Java ត្រូវប្រើ `.equals()` ឬ `.equalsIgnoreCase()` ជានិច្ច។',
          explanationEn: '== compares object memory addresses; .equals() inspects actual characters.',
        },
      ],
      exercise: {
        id: 'ex-str-1',
        titleKm: 'ត្រួតពិនិត្យពាក្យសម្ងាត់ (Password Strength Checker)',
        titleEn: 'Password Length & Validation',
        descriptionKm: 'សូមសរសេរកូដត្រួតពិនិត្យពាក្យសម្ងាត់មួយ៖ ប្រសិនបើប្រវែង `>= 8` និងមានពាក្យ "Java" នៅខាងក្នុង សូមបង្ហាញ "ពាក្យសម្ងាត់រឹងមាំ" ក្រៅពីនេះបង្ហាញ "ពាក្យសម្ងាត់ខ្សោយ"។',
        descriptionEn: 'Validate password: length >= 8 and contains substring "Java". Output strength message.',
        starterCode: `public class Main {
    public static void main(String[] args) {
        String password = "LearnJava2026!";
        
        // ប្រើ .length() និង .contains("Java")
        
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        String password = "LearnJava2026!";
        
        boolean isValidLength = password.length() >= 8;
        boolean hasJavaKeyword = password.contains("Java");
        
        if (isValidLength && hasJavaKeyword) {
            System.out.println("ពាក្យសម្ងាត់រឹងមាំ (Strong Password)");
        } else {
            System.out.println("ពាក្យសម្ងាត់ខ្សោយ (Weak Password)");
        }
    }
}`,
        expectedOutput: 'ពាក្យសម្ងាត់រឹងមាំ (Strong Password)',
        hintsKm: [
          'ប្រើ `password.length() >= 8`',
          'ប្រើ `password.contains("Java")`',
        ],
        hintsEn: [
          'Check password.length() >= 8',
          'Use password.contains("Java")',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-str-1',
          questionKm: 'តើ Method មួយណាដែលប្រើសម្រាប់ស្វែងរកប្រវែងនៃ String?',
          questionEn: 'Which method returns the length of a String?',
          difficulty: 'easy',
          hintsKm: ['ជា Method មានវង់ក្រចក () មិនមែន attribute ដូច array ទេ'],
          hintsEn: ['length() method call.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Method គឺ: length()");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("length()");
    }
}`,
          expectedOutput: 'length()',
        },
        {
          id: 'pq-str-2',
          questionKm: 'តើហេតុអ្វីបានជាគេណែនាំឱ្យប្រើ `StringBuilder` នៅពេលត្រូវការត String រាប់ពាន់ដងក្នុងរង្វិលជុំ?',
          questionEn: 'Why is StringBuilder preferred over string concatenation inside loops?',
          difficulty: 'medium',
          hintsKm: ['String ជា Immutable ការតម្តងៗបង្កើត Object ថ្មីបំផ្លាញ Memory'],
          hintsEn: ['StringBuilder is mutable and does not allocate a new string object on each iteration.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បោះពុម្ពមូលហេតុ
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        sb.append("លឿន");
        sb.append(" និងសន្សំសំចៃ Memory");
        System.out.println(sb.toString());
    }
}`,
          expectedOutput: 'លឿន និងសន្សំសំចៃ Memory',
        },
        {
          id: 'pq-str-3',
          questionKm: 'ចូរសរសេរកូដត្រួតពិនិត្យថា តើពាក្យមួយជា Palindrome (អានពីមុខទៅក្រោយ និងពីក្រោយមកមុខដូចគ្នា) ឬអត់ ដោយប្រើ StringBuilder reverse()។',
          questionEn: 'Determine if a string is a palindrome using StringBuilder reverse().',
          difficulty: 'hard',
          hintsKm: ['បង្កើត StringBuilder ពីពាក្យដើម រួច reverse() ហើយប្រៀបធៀបដោយ .equals()'],
          hintsEn: ['Construct a StringBuilder, reverse it, and compare to original using equals().'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        String word = "radar";
        // ពិនិត្យ palindrome
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        String word = "radar";
        String reversed = new StringBuilder(word).reverse().toString();
        boolean isPalindrome = word.equalsIgnoreCase(reversed);
        System.out.println("ពាក្យ '" + word + "' ជា Palindrome: " + isPalindrome);
    }
}`,
          expectedOutput: "ពាក្យ 'radar' ជា Palindrome: true",
        },
      ],
      quizzes: [
        {
          id: 'q-str-1',
          questionKm: 'តើអ្វីជាលទ្ធផលនៃ `"Java".substring(1, 3)`?',
          questionEn: 'What is the output of "Java".substring(1, 3)?',
          optionsKm: ['"av"', '"jav"', '"va"', '"a"'],
          optionsEn: ['"av"', '"jav"', '"va"', '"a"'],
          correctOptionIndex: 0,
          explanationKm: 'Index ចាប់ផ្តើមពី 0 (J=0, a=1, v=2, a=3)។ substring(1, 3) យកពី Index 1 ដល់ Index 2 (មុន 3) គឺ "av"។',
          explanationEn: 'Indices are 0-based: J=0, a=1, v=2. Substring is end-exclusive taking indices 1 and 2 ("av").',
          hintKm: 'យកពី index 1 ដល់ index 2',
          hintEn: 'Indices 1 and 2.',
        },
        {
          id: 'q-str-2',
          questionKm: 'តើ String Constant Pool ស្ថិតនៅក្នុងតំបន់ Memory មួយណានៃ JVM?',
          questionEn: 'Where does the String Constant Pool reside in JVM architecture?',
          optionsKm: ['Stack Memory', 'Heap Memory', 'PC Register', 'Native Method Stack'],
          optionsEn: ['Stack Memory', 'Heap Memory', 'PC Register', 'Native Method Stack'],
          correctOptionIndex: 1,
          explanationKm: 'String Constant Pool ស្ថិតនៅក្នុង Heap Memory របស់ JVM (តាំងពី Java 7 មក)។',
          explanationEn: 'Since Java 7, the String Constant Pool is allocated inside the main Java Heap Memory.',
          hintKm: 'តំបន់ផ្ទុក Objects ទាំងអស់',
          hintEn: 'Main object heap.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_strings.asp',
    },
    {
      id: 'java-user-input-scanner',
      slug: 'java-user-input-scanner',
      moduleSlug: 'syntax-variables-io',
      order: 4,
      titleKm: 'ការបញ្ចូលទិន្នន័យពីអ្នកប្រើ និងទម្រង់ Output (Scanner & Formatting)',
      titleEn: 'User Input with Scanner & Formatting',
      difficulty: 'beginner',
      estimatedMinutes: 25,
      objectivesKm: [
        'ចេះប្រើប្រាស់ថ្នាក់ java.util.Scanner ដើម្បីទទួលការបញ្ចូលទិន្នន័យតាម Terminal',
        'យល់ច្បាស់ពីបញ្ហា Scanner Newline Trap (nextLine បន្ទាប់ពី nextInt)',
        'ចេះប្រើប្រាស់ System.out.printf() ដើម្បីកំណត់ទម្រង់ទសភាគ និងតារាងយ៉ាងស្រស់ស្អាត',
      ],
      objectivesEn: [
        'Capture interactive user input via java.util.Scanner',
        'Avoid the classic Scanner newline leftover trap when mixing nextInt and nextLine',
        'Format numbers, currencies, and aligned tables using System.out.printf()',
      ],
      summaryKm: 'រៀនពីរបៀបធ្វើឱ្យកម្មវិធី Java មានភាពអន្តរកម្ម (Interactive) ដោយទទួលទិន្នន័យពីអ្នកប្រើប្រាស់តាមក្តារចុច និងការបង្ហាញទិន្នន័យតាមទម្រង់ printf។',
      summaryEn: 'Build interactive programs reading console input via Scanner and formatting outputs with printf specifiers.',
      contentKm: `### ១. ថ្នាក់ java.util.Scanner
ដើម្បីទទួលការបញ្ចូលទិន្នន័យពីក្តារចុច (Keyboard Input) Java ផ្តល់ជូនថ្នាក់ \`Scanner\` នៅក្នុងកញ្ចប់ \`java.util\`។
\`\`\`java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);
\`\`\`

Methods សំខាន់ៗរបស់ Scanner៖
- \`nextLine()\` : អានអត្ថបទមួយបន្ទាត់ពេញ (រាប់បញ្ចូលទាំងដកឃ្លា)
- \`next()\` : អានពាក្យតែមួយ (ឈប់ត្រឹមដកឃ្លា)
- \`nextInt()\` : អានចំនួនគត់
- \`nextDouble()\` : អានចំនួនទសភាគ
- \`nextBoolean()\` : អាន true ឬ false

### ២. អន្ទាក់ Scanner Newline Trap (កំហុសល្បីបំផុត!)
នៅពេលអ្នកហៅ \`nextInt()\` ឬ \`nextDouble()\` ហើយបន្ទាប់មកហៅ \`nextLine()\` ភ្លាម៖
- \`nextInt()\` នឹងអានតែលេខប៉ុណ្ណោះ ប៉ុន្តែវាមិនបានអានសញ្ញាចុះបន្ទាត់ \`\\n\` ដែលអ្នកបានចុច Enter នោះឡើយ។
- ជាលទ្ធផល \`nextLine()\` បន្ទាប់នឹងអានត្រូវសញ្ញា \`\\n\` នោះភ្លាម ហើយរំលងការវាយអត្ថបទរបស់អ្នកចោល!
- **ដំណោះស្រាយ:** ត្រូវហៅ \`scanner.nextLine()\` ទទេមួយបន្ទាត់កណ្តាល ដើម្បីសម្អាត Newline Buffer ចោល។

### ៣. ការរៀបចំទម្រង់ Output ដោយ System.out.printf()
- \`%s\` : សម្រាប់ខ្សែអក្សរ (String)
- \`%d\` : សម្រាប់ចំនួនគត់ (Integer)
- \`%.2f\` : សម្រាប់ចំនួនទសភាគយក ២ ខ្ទង់
- \`%n\` : សម្រាប់ចុះបន្ទាត់ថ្មីតាមប្រព័ន្ធ OS`,
      contentEn: `Learn interactive console input with Scanner, how to consume dangling newline tokens, and printf format specifiers (%s, %d, %.2f).`,
      syntax: `import java.util.Scanner;

Scanner scanner = new Scanner(System.in);
System.out.print("បញ្ចូលឈ្មោះ: ");
String name = scanner.nextLine();
System.out.printf("សួស្តី %s, សូមស្វាគមន៍!%n", name);`,
      vocabulary: [
        {
          term: 'System.in',
          khmerTerm: 'លំហូរបញ្ចូលទិន្នន័យស្តង់ដារ',
          definitionKm: 'InputStream ស្តង់ដារដែលភ្ជាប់ទៅកាន់ក្តារចុចរបស់អ្នកប្រើប្រាស់ក្នុង Terminal',
          definitionEn: 'The standard input stream connected by default to console keyboard input.',
        },
        {
          term: 'Format Specifier',
          khmerTerm: 'សញ្ញាកំណត់ទម្រង់',
          definitionKm: 'កូដសម្គាល់ដូចជា %s, %d, %.2f ក្នុង printf សម្រាប់កំណត់របៀបបង្ហាញតម្លៃ',
          definitionEn: 'Tokens like %d or %.2f used in printf to format variables.',
        },
        {
          term: 'Buffer Flushing',
          khmerTerm: 'ការសម្អាតអង្គចងចាំបណ្តោះអាសន្ន',
          definitionKm: 'ការអានកម្ទេចសញ្ញា Newline ដែលនៅសេសសល់ក្នុង Input Buffer ដើម្បីកុំឱ្យរំលងការបញ្ចូលបន្ទាប់',
          definitionEn: 'Consuming trailing whitespace or newline tokens left behind in the input stream.',
        },
      ],
      examples: [
        {
          title: 'កម្មវិធីទទួលទិន្នន័យ និងគណនាវិក្កយបត្រ (Invoice with printf)',
          code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // កូដនេះដំណើរការបានទាំងជាមួយ Input ផ្ទាល់ និង stdin
        String simulatedInput = "កាហ្វេទឹកដោះគោ\\n2\\n2.50\\n";
        Scanner scanner = new Scanner(simulatedInput);

        System.out.println("=== ប្រព័ន្ធគិតប្រាក់ហាងកាហ្វេ ===");
        
        // ១. ទទួលឈ្មោះទំនិញ
        String itemName = scanner.nextLine();
        
        // ២. ទទួលចំនួន
        int quantity = scanner.nextInt();
        
        // ៣. ទទួលតម្លៃក្នុងមួយកែវ
        double unitPrice = scanner.nextDouble();

        // គណនាតម្លៃសរុប
        double total = quantity * unitPrice;

        // ៤. បង្ហាញទិន្នន័យជាតារាងស្អាតដោយប្រើ printf
        System.out.printf("%-18s : %s%n", "ឈ្មោះទំនិញ", itemName);
        System.out.printf("%-18s : %d%n", "ចំនួន", quantity);
        System.out.printf("%-18s : $%.2f%n", "តម្លៃរាយ", unitPrice);
        System.out.println("--------------------------------");
        System.out.printf("%-18s : $%.2f%n", "សរុបត្រូវបង់", total);
        
        scanner.close();
    }
}`,
          explanationKm: 'កម្មវិធីនេះបង្ហាញពីការអានអត្ថបទ លេខគត់ លេខទសភាគ និងការប្រើ `%-18s` និង `$%.2f` ធ្វើឱ្យទិន្នន័យតម្រៀបត្រង់ជួរគ្នាស្អាត។',
          explanationEn: 'Demonstrates parsing mixed data types and formatting a clean receipt using printf alignment specifiers.',
          lineByLineExplanation: [
            {
              line: 'String itemName = scanner.nextLine();',
              explanationKm: 'អានឈ្មោះទំនិញជាអក្សរខ្មែរ រួមទាំងដកឃ្លា។',
              explanationEn: 'Reads full text line for item name.',
            },
            {
              line: 'int quantity = scanner.nextInt();',
              explanationKm: 'អានចំនួនជាលេខគត់ int។',
              explanationEn: 'Parses next token as integer.',
            },
            {
              line: 'System.out.printf("%-18s : $%.2f%n", ...);',
              explanationKm: 'រៀបជួរអក្សរឱ្យស្មើ 18 ចន្លោះ និងបង្ហាញទសភាគចំនួន ២ ខ្ទង់។',
              explanationEn: 'Aligns label with 18 character width and formats price with 2 decimals.',
            },
          ],
          expectedOutput: `=== ប្រព័ន្ធគិតប្រាក់ហាងកាហ្វេ ===
ឈ្មោះទំនិញ           : កាហ្វេទឹកដោះគោ
ចំនួន               : 2
តម្លៃរាយ             : $2.50
--------------------------------
សរុបត្រូវបង់         : $5.00`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'បញ្ហា Scanner Newline Trap រំលងការវាយបញ្ចូល',
          titleEn: 'Skipped nextLine() after nextInt() input trap',
          badCode: `Scanner sc = new Scanner(System.in);
int age = sc.nextInt();
String city = sc.nextLine(); // នឹងត្រូវរំលងចោលភ្លាមព្រោះអានត្រូវ \\n!`,
          goodCode: `Scanner sc = new Scanner(System.in);
int age = sc.nextInt();
sc.nextLine(); // សម្អាត \\n ចោលជាមុន!
String city = sc.nextLine(); // ដំណើរការបានត្រឹមត្រូវ`,
          explanationKm: 'nextInt() មិនបានអានសញ្ញា Enter (\\n) ឡើយ។ ត្រូវតែហៅ sc.nextLine() មួយបន្ទាត់ទទេ ដើម្បីលេបយកសញ្ញា \\n នោះចោលសិន។',
          explanationEn: 'nextInt() leaves a trailing newline character in the stream. Consume it with an empty sc.nextLine() call.',
        },
      ],
      exercise: {
        id: 'ex-scan-1',
        titleKm: 'គណនា BMI (Body Mass Index) របស់អ្នកប្រើ',
        titleEn: 'BMI Console Calculator',
        descriptionKm: 'សរសេរកម្មវិធីគណនា BMI តាមរូបមន្ត៖ `BMI = weight / (height * height)` ដោយទទួលទម្ងន់ជាគីឡូក្រាម (double) និងកម្ពស់ជាម៉ែត្រ (double) រួចបង្ហាញលទ្ធផលទសភាគ ២ ខ្ទង់។',
        descriptionEn: 'Calculate Body Mass Index (weight / (height * height)) and format with 2 decimal places using printf.',
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String input = "65.5\\n1.72\\n"; // ទម្ងន់ 65.5kg, កម្ពស់ 1.72m
        Scanner scanner = new Scanner(input);
        
        // អាន weight និង height រួចគណនា bmi
        
    }
}`,
        solutionCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String input = "65.5\\n1.72\\n";
        Scanner scanner = new Scanner(input);
        
        double weight = scanner.nextDouble();
        double height = scanner.nextDouble();
        
        double bmi = weight / (height * height);
        
        System.out.printf("ទម្ងន់: %.1f kg%n", weight);
        System.out.printf("កម្ពស់: %.2f m%n", height);
        System.out.printf("សន្ទស្សន៍ BMI របស់អ្នក: %.2f%n", bmi);
        
        scanner.close();
    }
}`,
        expectedOutput: `ទម្ងន់: 65.5 kg
កម្ពស់: 1.72 m
សន្ទស្សន៍ BMI របស់អ្នក: 22.14`,
        hintsKm: [
          'ប្រើ `scanner.nextDouble()` ពីរដងដើម្បីអានទម្ងន់ និងកម្ពស់',
          'គណនា `double bmi = weight / (height * height);`',
          'ប្រើ `System.out.printf("%.2f%n", bmi);`',
        ],
        hintsEn: [
          'Read weight and height using scanner.nextDouble()',
          'Calculate bmi = weight / (height * height)',
          'Format output with printf("%.2f%n", bmi)',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-scan-1',
          questionKm: 'តើសញ្ញាកំណត់ទម្រង់ (Format Specifier) មួយណាដែលប្រើសម្រាប់បង្ហាញចំនួនគត់ក្នុង `System.out.printf()`?',
          questionEn: 'Which format specifier is used for integers in printf?',
          difficulty: 'easy',
          hintsKm: ['អក្សរ d (តំណាងឱ្យ decimal integer)'],
          hintsEn: ['%d specifier.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.printf("ចម្លើយគឺ: %s%n", "%d");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        int count = 42;
        System.out.printf("ចំនួន: %d%n", count);
    }
}`,
          expectedOutput: 'ចំនួន: 42',
        },
        {
          id: 'pq-scan-2',
          questionKm: 'តើ Method `scanner.next()` និង `scanner.nextLine()` ខុសគ្នាយ៉ាងដូចម្តេច?',
          questionEn: 'What is the operational difference between scanner.next() and scanner.nextLine()?',
          difficulty: 'medium',
          hintsKm: ['next() អានត្រឹមដកឃ្លាដំបូង រីឯ nextLine() អានមួយបន្ទាត់ពេញរហូតដល់ Enter'],
          hintsEn: ['next() reads token until whitespace; nextLine() reads until line separator.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បង្ហាញភាពខុសគ្នា
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("next() អានតែពាក្យមួយ (ឈប់ត្រឹមដកឃ្លា)");
        System.out.println("nextLine() អានមួយបន្ទាត់ពេញ (រាប់ទាំងដកឃ្លា)");
    }
}`,
          expectedOutput: `next() អានតែពាក្យមួយ (ឈប់ត្រឹមដកឃ្លា)
nextLine() អានមួយបន្ទាត់ពេញ (រាប់ទាំងដកឃ្លា)`,
        },
        {
          id: 'pq-scan-3',
          questionKm: 'ចូរសរសេរកូដដែលប្រើ Scanner ពិនិត្យមើលថាតើទិន្នន័យបន្ទាប់ជាលេខគត់ឬអត់ ដោយប្រើ `hasNextInt()` មុននឹងអាន ដើម្បីការពារកំហុស InputMismatchException។',
          questionEn: 'Demonstrate safe parsing by verifying hasNextInt() before calling nextInt() to prevent InputMismatchException.',
          difficulty: 'hard',
          hintsKm: ['ប្រើ `if (scanner.hasNextInt())` ដើម្បីផ្ទៀងផ្ទាត់ជាមុន'],
          hintsEn: ['Guard input with if (scanner.hasNextInt()).'],
          starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner("123");
        // ផ្ទៀងផ្ទាត់ hasNextInt()
    }
}`,
          solutionCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner("123");
        if (sc.hasNextInt()) {
            int num = sc.nextInt();
            System.out.println("ទិន្នន័យត្រឹមត្រូវជាលេខ: " + num);
        } else {
            System.out.println("មិនមែនជាលេខគត់ទេ!");
        }
        sc.close();
    }
}`,
          expectedOutput: 'ទិន្នន័យត្រឹមត្រូវជាលេខ: 123',
        },
      ],
      quizzes: [
        {
          id: 'q-scan-1',
          questionKm: 'តើកញ្ចប់ (Package) ណាដែលផ្ទុកថ្នាក់ Scanner នៅក្នុង Java Standard Library?',
          questionEn: 'Which package contains the Scanner class?',
          optionsKm: ['java.lang', 'java.util', 'java.io', 'java.net'],
          optionsEn: ['java.lang', 'java.util', 'java.io', 'java.net'],
          correctOptionIndex: 1,
          explanationKm: 'Scanner ស្ថិតនៅក្នុងកញ្ចប់ `java.util.Scanner` ដូច្នេះអ្នកត្រូវតែសរសេរ `import java.util.Scanner;` នៅដើមឯកសារ។',
          explanationEn: 'Scanner is located in java.util and must be imported explicitly.',
          hintKm: 'កញ្ចប់ឧបករណ៍ប្រើប្រាស់ utility',
          hintEn: 'java.util package.',
        },
        {
          id: 'q-scan-2',
          questionKm: 'តើសញ្ញាកំណត់ទម្រង់ណាដែលបង្ហាញលេខទសភាគយក ២ ខ្ទង់ក្រោយក្បៀស?',
          questionEn: 'Which format specifier prints a floating-point number with exactly 2 decimal places?',
          optionsKm: ['%2d', '%.2f', '%f.2', '%2s'],
          optionsEn: ['%2d', '%.2f', '%f.2', '%2s'],
          correctOptionIndex: 1,
          explanationKm: '`%.2f` កំណត់ថាយក floating-point (f) ដោយមាន precision ២ ខ្ទង់ក្រោយសញ្ញាក្បៀស (.2)។',
          explanationEn: '%.2f instructs printf to render a floating-point number with two fractional decimal digits.',
          hintKm: 'មានសញ្ញាចុចពីរ និងអក្សរ f',
          hintEn: '%.2f format.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_user_input.asp',
    },
  ],
};
