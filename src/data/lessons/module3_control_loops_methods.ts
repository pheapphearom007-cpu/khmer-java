import { CurriculumModule } from '../../types';

export const MODULE_3_CONTROL_LOOPS_METHODS: CurriculumModule = {
  id: 'mod-3',
  slug: 'conditions-loops-methods',
  titleKm: '៣. លក្ខខណ្ឌ រង្វិលជុំ អារេ និងវិធីសាស្ត្រ (Conditions, Loops, Arrays & Methods)',
  titleEn: '3. Conditions, Loops, Arrays & Methods',
  descriptionKm: 'ចេះគ្រប់គ្រងលំហូរកម្មវិធីជាមួយ if-else, switch expressions, រង្វិលជុំ loops, ការរៀបចំទិន្នន័យជាអារេ និងការបំបែកកូដជា Methods។',
  descriptionEn: 'Master program flow control with if-else, switch expressions, iteration loops, array structures, and modular Java methods.',
  icon: 'GitFork',
  level: 'beginner',
  lessons: [
    {
      id: 'java-conditions-if-switch',
      slug: 'java-conditions-if-switch',
      moduleSlug: 'conditions-loops-methods',
      order: 1,
      titleKm: 'ការសម្រេចចិត្តតាមលក្ខខណ្ឌ if-else និង switch (Control Flow & Decisions)',
      titleEn: 'Control Flow: if-else & switch Decisions',
      difficulty: 'beginner',
      estimatedMinutes: 25,
      objectivesKm: [
        'ចេះប្រើប្រាស់ if, else if, និង else ដើម្បីសម្រេចចិត្តតាមលក្ខខណ្ឌស្មុគស្មាញ',
        'ស្គាល់ពីរបៀបប្រើប្រាស់ Switch Statement និងតួនាទីរបស់ពាក្យគន្លឹះ break',
        'ស្គាល់ពី Modern Switch Expression (Arrow Syntax `->`) ដែលមានតាំងពី Java 14+',
      ],
      objectivesEn: [
        'Structure branching logic using if, else if, and else blocks',
        'Apply switch statements and understand fall-through behavior without break',
        'Utilize modern Java switch expressions with arrow syntax (->)',
      ],
      summaryKm: 'ការសម្រេចចិត្តគឺជាខួរក្បាលនៃកម្មវិធី។ រៀនពីរបៀបបង្វែរទិសដៅដំណើរការនៃកូដដោយផ្អែកលើលក្ខខណ្ឌផ្សេងៗគ្នា។',
      summaryEn: 'Decision branching is the core logic of programming. Control code execution branches with if-else and switch statements.',
      contentKm: `### ១. រចនាសម្ព័ន្ធ if-else if-else
Java ដំណើរការកូដពីលើចុះក្រោម ប៉ុន្តែជាមួយ \`if\` កូដនឹងដំណើរការលុះត្រាតែលក្ខខណ្ឌនោះផ្តល់តម្លៃ \`true\`៖
\`\`\`java
if (condition1) {
    // ដំណើរការពេល condition1 ពិត
} else if (condition2) {
    // ដំណើរការពេល condition1 មិនពិត ហើយ condition2 ពិត
} else {
    // ដំណើរការពេលលក្ខខណ្ឌខាងលើមិនពិតទាំងអស់
}
\`\`\`

### ២. Switch Statement បុរាណ
នៅពេលអ្នកមានតម្លៃច្រើនដែលត្រូវប្រៀបធៀបជាមួយអថេរតែមួយ (ដូចជាថ្ងៃនៃសប្តាហ៍ ឬលេខកូដម៉ឺនុយ) ការប្រើ \`switch\` ជួយឱ្យកូដមើលទៅស្អាតជាង \`if-else\` ជាន់គ្នា៖
\`\`\`java
switch (dayNumber) {
    case 1:
        System.out.println("ច័ន្ទ");
        break; // សំខាន់ណាស់! បើគ្មាន break វានឹងរអិលធ្លាក់ទៅ case បន្ទាប់ (Fall-through)
    case 2:
        System.out.println("អង្គារ");
        break;
    default:
        System.out.println("ថ្ងៃមិនត្រឹមត្រូវ");
}
\`\`\`

### ៣. Modern Switch Expression (Java 14+)
Java ជំនាន់ថ្មីគាំទ្រ Arrow Syntax (\`->\`) ដែលមិនត្រូវការ \`break\` និងការពារបញ្ហា fall-through ដោយស្វ័យប្រវត្តិ៖
\`\`\`java
String dayName = switch (dayNumber) {
    case 1 -> "ច័ន្ទ";
    case 2 -> "អង្គារ";
    default -> "មិនស្គាល់";
};
\`\`\``,
      contentEn: `Learn branching with if-else trees, classic switch statement fall-through behavior, and modern Java 14+ arrow switch expressions.`,
      syntax: `// Modern Arrow Switch (Java 14+)
String category = switch (grade) {
    case 'A', 'B' -> "ពូកែ";
    case 'C', 'D' -> "មធ្យម";
    default       -> "ខ្សោយ";
};`,
      vocabulary: [
        {
          term: 'Branching',
          khmerTerm: 'ការបំបែកខ្នែងលំហូរ',
          definitionKm: 'ការជ្រើសរើសផ្លូវដើរនៃកូដដោយផ្អែកលើលក្ខខណ្ឌពិត ឬមិនពិត',
          definitionEn: 'The path selection in code execution based on conditional evaluation.',
        },
        {
          term: 'Fall-through',
          khmerTerm: 'ការរអិលធ្លាក់ Case',
          definitionKm: 'បាតុភូតក្នុង switch បុរាណដែលកូដបន្តដំណើរការ case បន្ទាប់ដោយសារភ្លេចដាក់ពាក្យ break',
          definitionEn: 'Execution continuing into subsequent switch cases when break is omitted.',
        },
        {
          term: 'Switch Expression',
          khmerTerm: 'កន្សោម Switch ជំនាន់ថ្មី',
          definitionKm: 'ទម្រង់ switch ក្នុង Java 14+ ដែលអាចផ្តល់តម្លៃត្រឡប់មកវិញដោយផ្ទាល់ដោយប្រើសញ្ញា ->',
          definitionEn: 'Modern Java switch construct that yields a value directly without boilerplate break statements.',
        },
      ],
      examples: [
        {
          title: 'ប្រព័ន្ធចាត់ថ្នាក់និទ្ទេសសិស្ស (Grade Classification)',
          code: `public class Main {
    public static void main(String[] args) {
        int score = 88;
        char grade;

        // ១. បែងចែកនិទ្ទេសតាម if-else
        if (score >= 90) {
            grade = 'A';
        } else if (score >= 80) {
            grade = 'B';
        } else if (score >= 70) {
            grade = 'C';
        } else if (score >= 60) {
            grade = 'D';
        } else if (score >= 50) {
            grade = 'E';
        } else {
            grade = 'F';
        }

        // ២. វាយតម្លៃអត្ថន័យនិទ្ទេសតាម Modern Switch
        String evaluation = switch (grade) {
            case 'A' -> "ល្អឥតខ្ចោះ (Excellent)";
            case 'B' -> "ល្អណាស់ (Very Good)";
            case 'C' -> "ល្អបង្គួរ (Good)";
            case 'D', 'E' -> "ជាប់មធ្យម (Passed)";
            case 'F' -> "ធ្លាក់ (Failed)";
            default -> "គ្មាននិទ្ទេស";
        };

        System.out.println("ពិន្ទុ: " + score);
        System.out.println("និទ្ទេស: " + grade);
        System.out.println("ការវាយតម្លៃ: " + evaluation);
    }
}`,
          explanationKm: 'កម្មវិធីនេះបង្ហាញពីការគណនានិទ្ទេសតាមកម្រិតពិន្ទុ និងការបម្លែងនិទ្ទេសទៅជាការវាយតម្លៃជាភាសាខ្មែរតាម Modern Switch Expression។',
          explanationEn: 'Demonstrates cascading if-else grade classification paired with a modern arrow switch expression.',
          lineByLineExplanation: [
            {
              line: 'else if (score >= 80)',
              explanationKm: 'ប្រសិនបើពិន្ទុមិនដល់ 90 តែធំជាងឬស្មើ 80 និទ្ទេសគឺ B។',
              explanationEn: 'Evaluates next tier if initial condition is false.',
            },
            {
              line: 'String evaluation = switch (grade) { ... }',
              explanationKm: 'Modern switch ផ្តល់តម្លៃ String ត្រឡប់មកដាក់ក្នុងអថេរ evaluation ផ្ទាល់តែម្តង។',
              explanationEn: 'Assigns the result of switch expression directly to evaluation variable.',
            },
          ],
          expectedOutput: `ពិន្ទុ: 88
និទ្ទេស: B
ការវាយតម្លៃ: ល្អណាស់ (Very Good)`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ភ្លេចពាក្យ break ក្នុង switch បណ្តាលឱ្យកើត Fall-through',
          titleEn: 'Omission of break in classic switch causing accidental fall-through',
          badCode: `switch (role) {
    case 1:
        System.out.println("Admin"); // គ្មាន break!
    case 2:
        System.out.println("User"); // នឹងរត់ទាំង Admin និង User!
        break;
}`,
          goodCode: `switch (role) {
    case 1:
        System.out.println("Admin");
        break; // បញ្ឈប់ switch ត្រឹមនេះ
    case 2:
        System.out.println("User");
        break;
}`,
          explanationKm: 'ក្នុង switch បុរាណ ប្រសិនបើគ្មាន `break` កូដនឹងបន្តរត់ចូល case បន្ទាប់ដោយស្វ័យប្រវត្តិ ទោះបី case នោះមិនត្រូវក៏ដោយ។',
          explanationEn: 'Without break, Java falls through to execute subsequent case bodies unconditionally.',
        },
      ],
      exercise: {
        id: 'ex-cond-1',
        titleKm: 'ប្រព័ន្ធកំណត់តម្លៃសំបុត្រកុន (Movie Ticket Pricing)',
        titleEn: 'Movie Ticket Age-Based Pricing',
        descriptionKm: 'សរសេរកូដគណនាតម្លៃសំបុត្រកុន៖ ក្មេងអាយុក្រោម ១២ ឆ្នាំតម្លៃ ៣$, មនុស្សពេញវ័យ ១២-៥៩ ឆ្នាំតម្លៃ ៦$, ចាស់ជរា ៦០ ឆ្នាំឡើងតម្លៃ ៤$។',
        descriptionEn: 'Determine ticket price based on age: <12 is $3, 12-59 is $6, 60+ is $4.',
        starterCode: `public class Main {
    public static void main(String[] args) {
        int age = 65;
        double price;
        
        // ប្រើ if-else if-else ដើម្បីកំណត់តម្លៃ
        
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        int age = 65;
        double price;
        
        if (age < 12) {
            price = 3.0;
        } else if (age < 60) {
            price = 6.0;
        } else {
            price = 4.0;
        }
        
        System.out.printf("អាយុ: %d ឆ្នាំ -> តម្លៃសំបុត្រ: $%.2f%n", age, price);
    }
}`,
        hintsKm: [
          'ប្រើ `if (age < 12)`',
          'ប្រើ `else if (age < 60)` សម្រាប់មនុស្សពេញវ័យ',
          'ប្រើ `else` សម្រាប់ ៦០ ឆ្នាំឡើង',
        ],
        hintsEn: [
          'Check if (age < 12)',
          'Check else if (age < 60)',
          'Catch-all else for 60+',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-cond-1',
          questionKm: 'តើពាក្យគន្លឹះមួយណាដែលប្រើសម្រាប់ដំណើរការប្លុកកូដក្នុង switch នៅពេលគ្មាន case ណាមួយត្រូវ?',
          questionEn: 'Which keyword executes in a switch when no other cases match?',
          difficulty: 'easy',
          hintsKm: ['ពាក្យមានន័យថាតម្លៃលំនាំដើម (default)'],
          hintsEn: ['default keyword.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("default");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("default");
    }
}`,
          expectedOutput: 'default',
        },
        {
          id: 'pq-cond-2',
          questionKm: 'តើ Modern Switch Arrow Syntax (`->`) ក្នុង Java 14+ មានអត្ថប្រយោជន៍អ្វីខ្លះលើសពី switch បុរាណ?',
          questionEn: 'What advantages does Java 14+ arrow switch syntax provide over traditional switch?',
          difficulty: 'medium',
          hintsKm: ['មិនត្រូវការ break និងអាច return តម្លៃជា expression ផ្ទាល់'],
          hintsEn: ['Eliminates accidental fall-through without break and yields values directly.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បោះពុម្ពអត្ថប្រយោជន៍
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("មិនត្រូវការ break, គ្មានកំហុស fall-through, និងអាច return តម្លៃផ្ទាល់!");
    }
}`,
          expectedOutput: 'មិនត្រូវការ break, គ្មានកំហុស fall-through, និងអាច return តម្លៃផ្ទាល់!',
        },
        {
          id: 'pq-cond-3',
          questionKm: 'ចូរសរសេរកម្មវិធីគណនាចំនួនថ្ងៃក្នុងខែនៃឆ្នាំមួយ ដោយគិតទាំងឆ្នាំបង្គ្រប់ (Leap Year) សម្រាប់ខែកុម្ភៈ។',
          questionEn: 'Calculate the number of days in a given month and year, handling February leap years correctly.',
          difficulty: 'hard',
          hintsKm: ['ប្រើ switch សម្រាប់ខែ ហើយបើខែ ២ ត្រូវពិនិត្យឆ្នាំបង្គ្រប់'],
          hintsEn: ['Use switch for month days and evaluate leap year specifically for February.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        int year = 2024;
        int month = 2; // ខែកុម្ភៈ
        // គណនាចំនួនថ្ងៃ
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        int year = 2024;
        int month = 2;
        int days = switch (month) {
            case 1, 3, 5, 7, 8, 10, 12 -> 31;
            case 4, 6, 9, 11 -> 30;
            case 2 -> ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) ? 29 : 28;
            default -> 0;
        };
        System.out.println("ខែ " + month + " ឆ្នាំ " + year + " មាន: " + days + " ថ្ងៃ");
    }
}`,
          expectedOutput: 'ខែ 2 ឆ្នាំ 2024 មាន: 29 ថ្ងៃ',
        },
      ],
      quizzes: [
        {
          id: 'q-cond-1',
          questionKm: 'តើប្រភេទ Data Types ណាខ្លះដែលអាចប្រើជា Expression ក្នុង Switch Statement បាន?',
          questionEn: 'Which data types are valid targets in a Java switch statement?',
          optionsKm: ['byte, short, char, int, String, Enum', 'double និង float តែប៉ុណ្ណោះ', 'boolean តែមួយមុខគត់', 'គ្រប់ប្រភេទ Class ទាំងអស់'],
          optionsEn: ['byte, short, char, int, String, Enum', 'double and float only', 'boolean only', 'Any arbitrary class instance'],
          correctOptionIndex: 0,
          explanationKm: 'Switch គាំទ្រ primitive types ចំនួនគត់ (byte, short, char, int), String, និង Enums។ Switch មិនគាំទ្រ float, double, ឬ boolean ឡើយ។',
          explanationEn: 'Switch supports integral types (byte, short, char, int), Strings, and Enums. Floating-point and boolean are disallowed.',
          hintKm: 'ចំនួនគត់ អក្សរ និង String',
          hintEn: 'Integral types, Strings, and Enums.',
        },
        {
          id: 'q-cond-2',
          questionKm: 'ប្រសិនបើគ្មានពាក្យបញ្ជា `break` ក្នុង case មួយ តើ JVM នឹងធ្វើអ្វីបន្ត?',
          questionEn: 'If a break statement is absent in a classic case block, what does the JVM do?',
          optionsKm: ['បញ្ឈប់ switch ភ្លាម', 'រអិលធ្លាក់ទៅដំណើរការ case បន្ទាប់ (Fall-through)', 'បោះកំហុស Compile Error', 'បិទកម្មវិធីទាំងស្រុង'],
          optionsEn: ['Exits the switch immediately', 'Falls through into the subsequent case', 'Throws a compile error', 'Terminates the program'],
          correctOptionIndex: 1,
          explanationKm: 'JVM នឹងបន្តដំណើរការកូដក្នុង case បន្ទាប់ដោយមិនខ្វល់ថាលក្ខខណ្ឌត្រូវឬអត់ឡើយ ដែលហៅថា Fall-through។',
          explanationEn: 'The runtime continues executing code in subsequent cases unconditionally (fall-through).',
          hintKm: 'បាតុភូត Fall-through',
          hintEn: 'Fall-through behavior.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_conditions.asp',
    },
    {
      id: 'java-loops',
      slug: 'java-loops',
      moduleSlug: 'conditions-loops-methods',
      order: 2,
      titleKm: 'រង្វិលជុំ for, while, do-while និង for-each (Loops & Iteration)',
      titleEn: 'Loops & Iteration: for, while, do-while, for-each',
      difficulty: 'beginner',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ច្បាស់ពីភាពខុសគ្នារវាង for, while, do-while, និង enhanced for-each loop',
        'ចេះប្រើប្រាស់ break ដើម្បីបញ្ឈប់ loop និង continue ដើម្បីរំលងជុំបច្ចុប្បន្ន',
        'ស្គាល់ និងចៀសវាងកំហុស Infinite Loop និង Off-by-one Error',
      ],
      objectivesEn: [
        'Differentiate between for, while, do-while, and enhanced for-each loops',
        'Control loop execution flow with break and continue statements',
        'Avoid infinite loops and off-by-one index boundary errors',
      ],
      summaryKm: 'រៀនពីរបៀបធ្វើកិច្ចការដដែលៗប្រកបដោយប្រសិទ្ធភាពខ្ពស់ ស្វែងយល់ពីគ្រប់ប្រភេទរង្វិលជុំ និងវិធីសាស្ត្រគ្រប់គ្រងការវិលជុំ។',
      summaryEn: 'Automate repetitive tasks with for, while, do-while, and enhanced for-each iteration constructs.',
      contentKm: `### ១. ប្រភេទរង្វិលជុំទាំង ៤ ក្នុង Java
1. **For Loop:** ស័ក្តិសមបំផុតពេលដែលអ្នកដឹងច្បាស់ពីចំនួនជុំដែលត្រូវធ្វើការ៖
\`\`\`java
for (int i = 0; i < 5; i++) {
    System.out.println("ជុំទី: " + i);
}
\`\`\`
2. **While Loop:** ស័ក្តិសមពេលមិនដឹងចំនួនជុំច្បាស់លាស់ តែដឹងលក្ខខណ្ឌដែលត្រូវឈប់ (ពិនិត្យលក្ខខណ្ឌមុនដំណើរការ)៖
\`\`\`java
while (hasMoney) {
    buyItem();
}
\`\`\`
3. **Do-While Loop:** ធានាថាប្លុកកូដនឹងដំណើរការយ៉ាងតិច **១ លើកជានិច្ច** មុននឹងពិនិត្យលក្ខខណ្ឌ៖
\`\`\`java
do {
    askUserPassword();
} while (!isCorrect);
\`\`\`
4. **Enhanced For-Each Loop:** វិធីសាមញ្ញ និងស្អាតបំផុតសម្រាប់អានទិន្នន័យក្នុង Array ឬ Collection៖
\`\`\`java
for (String fruit : fruits) {
    System.out.println(fruit);
}
\`\`\`

### ២. ការគ្រប់គ្រង Loop: break និង continue
- \`break\` : បញ្ឈប់ និងចាកចេញពីរង្វិលជុំភ្លាមៗ។
- \`continue\` : រំលងកូដដែលនៅសល់ក្នុងជុំបច្ចុប្បន្ន ហើយលោតទៅចាប់ផ្តើមជុំបន្ទាប់ភ្លាម។`,
      contentEn: `Master iteration patterns: for, while, guaranteed-entry do-while, enhanced for-each, loop controls (break/continue), and avoiding infinite loops.`,
      syntax: `// For-each syntax:
for (Type element : collection) {
    // ដំណើរការជាមួយ element
}`,
      vocabulary: [
        {
          term: 'Iteration',
          khmerTerm: 'ការវិលជុំ',
          definitionKm: 'ការដំណើរការម្តងហើយម្តងទៀតនៃប្លុកកូដមួយរហូតដល់លក្ខខណ្ឌបញ្ចប់',
          definitionEn: 'A single execution pass through a loop code block.',
        },
        {
          term: 'Off-by-one Error',
          khmerTerm: 'កំហុសលើសឬខ្វះមួយជុំ',
          definitionKm: 'កំហុសតក្កវិជ្ជាដែល loop វិលខ្វះមួយជុំ ឬលើសមួយជុំដោយសារច្រឡំ < និង <=',
          definitionEn: 'Logic error where a loop iterates one time too many or one time too few.',
        },
        {
          term: 'Infinite Loop',
          khmerTerm: 'រង្វិលជុំមិនចេះចប់',
          definitionKm: 'Loop ដែលលក្ខខណ្ឌមិនដែល false ធ្វើឱ្យកម្មវិធីគាំងមិនឈប់',
          definitionEn: 'A loop that never terminates because the exit condition never becomes false.',
        },
      ],
      examples: [
        {
          title: 'ការប្រើប្រាស់ Loops, break និង continue',
          code: `public class Main {
    public static void main(String[] args) {
        // ១. គណនាផលបូកពី ១ ដល់ ១០ ដោយប្រើ For Loop
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println("ផលបូកពី ១ ដល់ ១០ = " + sum);

        // ២. ការប្រើ continue ដើម្បីរំលងលេខគូ (បង្ហាញតែលេខសេស)
        System.out.print("លេខសេសពី ១ ដល់ ៩: ");
        for (int i = 1; i < 10; i++) {
            if (i % 2 == 0) {
                continue; // រំលងលេខគូ
            }
            System.out.print(i + " ");
        }
        System.out.println();

        // ៣. For-each loop ជាមួយអារេឈ្មោះខេត្តខ្មែរ
        String[] provinces = {"សៀមរាប", "បាត់ដំបង", "កំពត", "កែប"};
        System.out.println("=== បញ្ជីខេត្តទេសចរណ៍ ===");
        for (String province : provinces) {
            System.out.println("📍 ខេត្ត " + province);
        }
    }
}`,
          explanationKm: 'បង្ហាញពីការគណនាផលបូកតាម loop, ការប្រើ `continue` រំលងលេខគូ និងការប្រើ `for-each` អានធាតុអារេស្រួលយល់។',
          explanationEn: 'Demonstrates summation accumulation, continue branching for odd numbers, and clean array traversal via enhanced for-each.',
          lineByLineExplanation: [
            {
              line: 'sum += i;',
              explanationKm: 'បូកបន្ថែមតម្លៃ i ចូលក្នុង sum រាល់ជុំ។',
              explanationEn: 'Accumulates current index value into sum variable.',
            },
            {
              line: 'if (i % 2 == 0) continue;',
              explanationKm: 'បើ i ជាលេខគូ វានឹងរំលងមិនព្រីន ហើយលោតទៅ i បន្ទាប់ភ្លាម។',
              explanationEn: 'Skips current iteration for even numbers.',
            },
            {
              line: 'for (String province : provinces)',
              explanationKm: 'Enhanced for-each loop ទាញយកឈ្មោះខេត្តម្តងមួយៗចេញពី array provinces។',
              explanationEn: 'Iterates through each element in provinces array sequentially.',
            },
          ],
          expectedOutput: `ផលបូកពី ១ ដល់ ១០ = 55
លេខសេសពី ១ ដល់ ៩: 1 3 5 7 9 
=== បញ្ជីខេត្តទេសចរណ៍ ===
📍 ខេត្ត សៀមរាប
📍 ខេត្ត បាត់ដំបង
📍 ខេត្ត កំពត
📍 ខេត្ត កែប`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'រង្វិលជុំមិនចេះចប់ (Infinite Loop) ដោយសារភ្លេច Increment',
          titleEn: 'Infinite loop due to omitted iteration variable update',
          badCode: `int i = 0;
while (i < 5) {
    System.out.println(i);
    // ភ្លេច i++ ! ធ្វើឱ្យ i នៅ 0 រហូត កម្មវិធីគាំង
}`,
          goodCode: `int i = 0;
while (i < 5) {
    System.out.println(i);
    i++; // បន្ថែមតម្លៃ i រាល់ជុំ
}`,
          explanationKm: 'ក្នុង while loop អ្នកត្រូវតែប្រាកដថាអថេរលក្ខខណ្ឌត្រូវបានផ្លាស់ប្តូរឆ្ពោះទៅចំណុចបញ្ចប់ បើមិនដូច្នោះទេកម្មវិធីនឹងគាំងរហូត។',
          explanationEn: 'Always ensure that the condition variables converge towards termination inside the loop body.',
        },
      ],
      exercise: {
        id: 'ex-loop-1',
        titleKm: 'តារាងមេគុណ ៧ (Multiplication Table)',
        titleEn: 'Print 7x Multiplication Table',
        descriptionKm: 'ចូរសរសេរ For Loop ដើម្បីបង្ហាញតារាងមេគុណ ៧ ចាប់ពី `7 x 1 = 7` រហូតដល់ `7 x 10 = 70`។',
        descriptionEn: 'Use a for loop to print the 7x multiplication table from 7x1 to 7x10.',
        starterCode: `public class Main {
    public static void main(String[] args) {
        int number = 7;
        
        // សរសេរ for loop ពី ១ ដល់ ១០
        
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        int number = 7;
        for (int i = 1; i <= 10; i++) {
            System.out.printf("%d x %2d = %2d%n", number, i, (number * i));
        }
    }
}`,
        hintsKm: [
          'ប្រើ `for (int i = 1; i <= 10; i++)`',
          'គណនាផលគុណ `number * i` ក្នុង loop',
        ],
        hintsEn: [
          'Loop from i = 1 to i <= 10',
          'Calculate number * i each iteration',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-loop-1',
          questionKm: 'តើ Do-While Loop ខុសពី While Loop ធម្មតាយ៉ាងដូចម្តេច?',
          questionEn: 'How does a do-while loop fundamentally differ from a standard while loop?',
          difficulty: 'easy',
          hintsKm: ['do-while ដំណើរការកូដជាមុនសិន ទើបពិនិត្យលក្ខខណ្ឌជាក្រោយ'],
          hintsEn: ['do-while guarantees at least one execution before condition checking.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("do-while រត់យ៉ាងតិច ១ លើកជានិច្ច");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("do-while រត់យ៉ាងតិច ១ លើកជានិច្ច ទោះបីលក្ខខណ្ឌដំបូង false ក៏ដោយ");
    }
}`,
          expectedOutput: 'do-while រត់យ៉ាងតិច ១ លើកជានិច្ច ទោះបីលក្ខខណ្ឌដំបូង false ក៏ដោយ',
        },
        {
          id: 'pq-loop-2',
          questionKm: 'តើអ្វីជាលទ្ធផលនៃ `break` នៅពេលប្រើក្នុង Nested Loop (Loop ក្នុង Loop)?',
          questionEn: 'What does break accomplish inside nested loops?',
          difficulty: 'medium',
          hintsKm: ['break ធម្មតានឹងចាកចេញតែពី loop ខាងក្នុងបំផុតដែលផ្ទុកវាប៉ុណ្ណោះ'],
          hintsEn: ['It terminates only the innermost loop enclosing it.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បង្ហាញឥរិយាបថ break ក្នុង nested loop
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("break ចាកចេញតែពី Inner Loop បច្ចុប្បន្នប៉ុណ្ណោះ");
    }
}`,
          expectedOutput: 'break ចាកចេញតែពី Inner Loop បច្ចុប្បន្នប៉ុណ្ណោះ',
        },
        {
          id: 'pq-loop-3',
          questionKm: 'ចូរសរសេរ Nested Loop ដើម្បីបង្ហាញរាងត្រីកោណផ្កាយ (*) កម្ពស់ ៤ ជួរ។',
          questionEn: 'Use nested loops to render a right-angled triangle pattern of asterisks 4 rows high.',
          difficulty: 'hard',
          hintsKm: ['Loop ខាងក្រៅរត់ជួរដេក (i) ហើយ Loop ខាងក្នុងរត់ជួរឈរ (j <= i)'],
          hintsEn: ['Outer loop for rows, inner loop for stars where j <= i.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បង្កើតត្រីកោណផ្កាយ
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
          expectedOutput: `*
**
***
****`,
        },
      ],
      quizzes: [
        {
          id: 'q-loop-1',
          questionKm: 'តើពាក្យគន្លឹះណាដែលប្រើដើម្បីរំលងកូដដែលនៅសល់ក្នុងជុំបច្ចុប្បន្ន ហើយចាប់ផ្តើមជុំថ្មីភ្លាម?',
          questionEn: 'Which keyword skips the remainder of the current iteration and advances the loop?',
          optionsKm: ['continue', 'break', 'skip', 'return'],
          optionsEn: ['continue', 'break', 'skip', 'return'],
          correctOptionIndex: 0,
          explanationKm: 'continue រំលងកូដដែលនៅសល់ក្នុងជុំបច្ចុប្បន្ន ហើយចាប់ផ្តើមជុំបន្ទាប់។ រីឯ break គឺបញ្ឈប់ loop ទាំងស្រុង។',
          explanationEn: 'continue abandons remaining code in current pass and moves to next step.',
          hintKm: 'មានន័យថា "បន្តទៅមុខ"',
          hintEn: 'continue keyword.',
        },
        {
          id: 'q-loop-2',
          questionKm: 'តើរង្វិលជុំ `for (int i = 0; i <= 5; i++)` ដំណើរការសរុបប៉ុន្មានជុំ?',
          questionEn: 'How many iterations does for (int i = 0; i <= 5; i++) execute?',
          optionsKm: ['៥ ជុំ', '៦ ជុំ', '៤ ជុំ', 'រត់មិនឈប់'],
          optionsEn: ['5 times', '6 times', '4 times', 'Infinite times'],
          correctOptionIndex: 1,
          explanationKm: 'ដោយសាររាប់ចាប់ពី 0 រហូតដល់ 5 (0, 1, 2, 3, 4, 5) សរុបទាំងអស់គឺ ៦ ជុំ។',
          explanationEn: 'Values of i are 0, 1, 2, 3, 4, and 5 inclusive, which sums to 6 iterations.',
          hintKm: 'រាប់ទាំងលេខ 0 និងលេខ 5',
          hintEn: 'Count from 0 through 5 inclusive.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_while_loop.asp',
    },
    {
      id: 'java-arrays',
      slug: 'java-arrays',
      moduleSlug: 'conditions-loops-methods',
      order: 3,
      titleKm: 'អារេមួយវិមាត្រ និងពហុវិមាត្រ (Java Arrays & Matrices)',
      titleEn: 'Java Arrays & Multi-dimensional Arrays',
      difficulty: 'beginner',
      estimatedMinutes: 25,
      objectivesKm: [
        'ចេះប្រកាស បង្កើត និងកំណត់តម្លៃអារេមួយវិមាត្រ និងពីរវិមាត្រ (2D Matrix)',
        'ស្គាល់ពីលក្ខណៈ Fixed-size របស់ Array និងកំហុស ArrayIndexOutOfBoundsException',
        'ចេះប្រើប្រាស់ Utilities របស់ java.util.Arrays (Arrays.sort, Arrays.toString)',
      ],
      objectivesEn: [
        'Declare, instantiate, and initialize 1D arrays and 2D matrices',
        'Understand fixed-size array constraints and handle ArrayIndexOutOfBoundsException safely',
        'Leverage java.util.Arrays utilities including sort() and toString()',
      ],
      summaryKm: 'អារេ គឺជារចនាសម្ព័ន្ធទិន្នន័យគ្រឹះសម្រាប់ផ្ទុកធាតុជាច្រើនដែលមានប្រភេទដូចគ្នាក្នុង Memory បន្តបន្ទាប់គ្នា។',
      summaryEn: 'Arrays store fixed-size sequential collections of elements of the same data type.',
      contentKm: `### ១. អ្វីទៅជាអារេ (Array)?
Array គឺជា Object ពិសេសមួយក្នុង Java ដែលផ្ទុកធាតុជាច្រើននៃប្រភេទ Data Type តែមួយក្នុងទំហំថេរ (Fixed Size)៖
\`\`\`java
int[] numbers = new int[5]; // បង្កើត Array ទំហំ ៥ មានតម្លៃលំនាំដើម 0
int[] primes = {2, 3, 5, 7, 11}; // បង្កើត និងដាក់តម្លៃភ្លាមៗ
\`\`\`

- **Zero-based Indexing:** អារេចាប់ផ្តើមពី Index 0 ដល់ \`length - 1\`។
- **array.length:** ជា Field សម្រាប់រកចំនួនធាតុសរុប (គ្មានវង់ក្រចកទេ)។

### ២. អារេពីរវិមាត្រ (2D Array / Matrix)
អារេពីរវិមាត្រ គឺជា "អារេនៃអារេ" ដែលផ្ទុកទិន្នន័យជាទម្រង់ជួរដេក (Rows) និងជួរឈរ (Columns) ដូចជាតារាង Excel ឬក្តារអុក៖
\`\`\`java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6}
};
int val = matrix[0][2]; // យកជួរដេក 0, ជួរឈរ 2 (តម្លៃគឺ 3)
\`\`\`

### ៣. ឧបករណ៍ជំនួយ java.util.Arrays
Java ផ្តល់ Class ជំនួយដ៏មានឥទ្ធិពល៖
- \`Arrays.toString(arr)\` : បម្លែង array ទៅជា String \`[a, b, c]\` ងាយស្រួលបោះពុម្ព
- \`Arrays.sort(arr)\` : តម្រៀបលេខ ឬអក្សរពីតូចទៅធំ
- \`Arrays.binarySearch(arr, key)\` : ស្វែងរកទីតាំងធាតុយ៉ាងលឿន`,
      contentEn: `Explore 1D/2D arrays, contiguous memory allocation, zero-based indexing, bounds checking, and java.util.Arrays utility functions.`,
      syntax: `// 1D Array
int[] scores = {90, 85, 78};

// 2D Array
int[][] grid = new int[3][3];`,
      vocabulary: [
        {
          term: 'Zero-based Index',
          khmerTerm: 'លិបិក្រមរាប់ពីសូន្យ',
          definitionKm: 'ប្រព័ន្ធកំណត់ទីតាំងដែលធាតុដំបូងគេបង្អស់ស្ថិតនៅ Index 0',
          definitionEn: 'Indexing scheme where the first element is located at index 0.',
        },
        {
          term: 'ArrayIndexOutOfBoundsException',
          khmerTerm: 'កំហុសហួសដែនកំណត់អារេ',
          definitionKm: 'កំហុស Runtime ដែលកើតឡើងពេលព្យាយាមទាញយក Index អវិជ្ជមាន ឬធំជាងឬស្មើ array.length',
          definitionEn: 'Runtime exception thrown when attempting to access an invalid array index.',
        },
        {
          term: 'Multi-dimensional Array',
          khmerTerm: 'អារេពហុវិមាត្រ',
          definitionKm: 'អារេដែលធាតុនីមួយៗរបស់វាផ្ទុកអារេមួយផ្សេងទៀត (អារេនៃអារេ)',
          definitionEn: 'An array whose elements are themselves arrays, forming a grid or matrix structure.',
        },
      ],
      examples: [
        {
          title: 'ការគ្រប់គ្រង Array, តម្រៀប និងរកពិន្ទុអតិបរមា',
          code: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] scores = {75, 92, 60, 88, 99, 45};

        System.out.println("អារេដើម: " + Arrays.toString(scores));
        System.out.println("ចំនួនធាតុ: " + scores.length);

        // ១. ស្វែងរកពិន្ទុខ្ពស់បំផុត (Max Score)
        int max = scores[0];
        for (int i = 1; i < scores.length; i++) {
            if (scores[i] > max) {
                max = scores[i];
            }
        }
        System.out.println("ពិន្ទុខ្ពស់បំផុត: " + max);

        // ២. តម្រៀបអារេពីតូចទៅធំ
        Arrays.sort(scores);
        System.out.println("អារេក្រោយតម្រៀប: " + Arrays.toString(scores));

        // ៣. អារេពីរវិមាត្រ (2D Array)
        int[][] matrix = {
            {10, 20},
            {30, 40}
        };
        System.out.println("ធាតុនៅជួរ 1 ជួរឈរ 1 = " + matrix[1][1]);
    }
}`,
          explanationKm: 'កូដនេះបង្ហាញពីការប្រើ `Arrays.toString`, algorithm រកតម្លៃអតិបរមា, ការតម្រៀបតាម `Arrays.sort` និងការទាញយកតម្លៃពី 2D Array។',
          explanationEn: 'Demonstrates finding maximum value, sorting in-place via Arrays.sort, and 2D matrix traversal.',
          lineByLineExplanation: [
            {
              line: 'Arrays.toString(scores)',
              explanationKm: 'បម្លែងអារេជាទម្រង់អត្ថបទ [75, 92, ...] ងាយស្រួលមើល។',
              explanationEn: 'Converts array contents into a formatted string.',
            },
            {
              line: 'if (scores[i] > max) max = scores[i];',
              explanationKm: 'ប្រៀបធៀបធាតុនីមួយៗ បើធំជាង max គឺជំនួសតម្លៃ max ថ្មី។',
              explanationEn: 'Updates current maximum candidate.',
            },
            {
              line: 'Arrays.sort(scores);',
              explanationKm: 'ប្រើក្បួន Dual-Pivot Quicksort តម្រៀបទិន្នន័យពីតូចទៅធំយ៉ាងលឿន។',
              explanationEn: 'Sorts primitive array in ascending order via dual-pivot quicksort.',
            },
          ],
          expectedOutput: `អារេដើម: [75, 92, 60, 88, 99, 45]
ចំនួនធាតុ: 6
ពិន្ទុខ្ពស់បំផុត: 99
អារេក្រោយតម្រៀប: [45, 60, 75, 88, 92, 99]
ធាតុនៅជួរ 1 ជួរឈរ 1 = 40`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'កំហុស ArrayIndexOutOfBoundsException ដោយសារប្រើ <= length',
          titleEn: 'Off-by-one boundary triggering ArrayIndexOutOfBoundsException',
          badCode: `int[] arr = {10, 20, 30};
for (int i = 0; i <= arr.length; i++) { // <= បណ្តាលឱ្យដល់ Index 3 ដែលគ្មានទេ!
    System.out.println(arr[i]);
}`,
          goodCode: `int[] arr = {10, 20, 30};
for (int i = 0; i < arr.length; i++) { // ប្រើ < ត្រឹមត្រូវ (Index 0 ដល់ 2)
    System.out.println(arr[i]);
}`,
          explanationKm: 'Array ទំហំ 3 មាន Index ត្រឹមតែ 0, 1, 2 ប៉ុណ្ណោះ។ បើប្រើ `<= arr.length` វានឹងព្យាយាមទាញ Index 3 ដែលបណ្តាលឱ្យគាំង Runtime Error។',
          explanationEn: 'Array indices range from 0 to length - 1. Loop guards must use strictly less than (<), not <=.',
        },
      ],
      exercise: {
        id: 'ex-arr-1',
        titleKm: 'គណនាផលបូក និងមធ្យមភាគក្នុង Array',
        titleEn: 'Array Sum & Average Calculation',
        descriptionKm: 'ចូរសរសេរកូដគណនាផលបូក និងមធ្យមភាគនៃលេខទាំងអស់នៅក្នុង Array `int[] numbers = {12, 45, 67, 23, 89};`។',
        descriptionEn: 'Compute sum and floating-point average of elements in an integer array.',
        starterCode: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {12, 45, 67, 23, 89};
        
        // គណនា sum និង average
        
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {12, 45, 67, 23, 89};
        
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        double average = (double) sum / numbers.length;
        
        System.out.println("ផលបូកសរុប: " + sum);
        System.out.printf("មធ្យមភាគ: %.2f%n", average);
    }
}`,
        hintsKm: [
          'ប្រើ for-each loop ដើម្បីបូកសន្សំចូលក្នុងអថេរ `sum`',
          'គណនា `(double) sum / numbers.length`',
        ],
        hintsEn: [
          'Accumulate with for (int num : numbers)',
          'Compute (double) sum / numbers.length',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-arr-1',
          questionKm: 'តើ Index ដំបូងបង្អស់នៃ Array ក្នុង Java គឺលេខប៉ុន្មាន?',
          questionEn: 'What is the starting index of any Java array?',
          difficulty: 'easy',
          hintsKm: ['ប្រព័ន្ធ Zero-based Indexing'],
          hintsEn: ['Zero.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Index ដំបូង: 0");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("0");
    }
}`,
          expectedOutput: '0',
        },
        {
          id: 'pq-arr-2',
          questionKm: 'តើមានអ្វីកើតឡើងប្រសិនបើអ្នកព្យាយាមផ្លាស់ប្តូរទំហំរបស់ Array ក្រោយពេលបង្កើតវារួច?',
          questionEn: 'Can the size of an allocated array be resized dynamically in Java?',
          difficulty: 'medium',
          hintsKm: ['Array មាន Fixed-size មិនអាចពង្រីក ឬបង្រួមបានទេ (ត្រូវប្រើ ArrayList ជំនួស)'],
          hintsEn: ['Array size is permanently fixed at allocation time.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // ពន្យល់អំពី fixed size របស់ array
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Array មានទំហំថេរ (Fixed-size) មិនអាចកែប្រែទំហំបានទេ ត្រូវបង្កើត Array ថ្មី ឬប្រើ ArrayList!");
    }
}`,
          expectedOutput: 'Array មានទំហំថេរ (Fixed-size) មិនអាចកែប្រែទំហំបានទេ ត្រូវបង្កើត Array ថ្មី ឬប្រើ ArrayList!',
        },
        {
          id: 'pq-arr-3',
          questionKm: 'ចូរសរសេរកូដត្រឡប់លំដាប់ធាតុក្នុង Array បញ្ច្រាសទិស (Reverse Array In-Place) ដោយមិនបាច់បង្កើត Array ថ្មី។',
          questionEn: 'Reverse an array in-place using two-pointer swapping without allocating a second array.',
          difficulty: 'hard',
          hintsKm: ['ប្រើ Two Pointers (left = 0, right = length - 1) ហើយ swap ធាតុរហូតដល់ជួបគ្នា'],
          hintsEn: ['Maintain left and right index pointers and swap elements inward.'],
          starterCode: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        // បញ្ច្រាសធាតុ
    }
}`,
          solutionCode: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int left = 0;
        int right = arr.length - 1;
        
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
        
        System.out.println("អារេបញ្ច្រាស: " + Arrays.toString(arr));
    }
}`,
          expectedOutput: 'អារេបញ្ច្រាស: [5, 4, 3, 2, 1]',
        },
      ],
      quizzes: [
        {
          id: 'q-arr-1',
          questionKm: 'តើពាក្យបញ្ជាណាដែលត្រឹមត្រូវសម្រាប់ដឹងពីចំនួនធាតុនៃ Array `int[] data`?',
          questionEn: 'Which syntax obtains the element length of an array named data?',
          optionsKm: ['data.length', 'data.length()', 'data.size()', 'data.count'],
          optionsEn: ['data.length', 'data.length()', 'data.size()', 'data.count'],
          correctOptionIndex: 0,
          explanationKm: 'សម្រាប់ Array គឺប្រើ field `data.length` (គ្មានវង់ក្រចក)។ ចំណែក `length()` គឺសម្រាប់ String ហើយ `size()` គឺសម្រាប់ Collection (ArrayList)។',
          explanationEn: 'Array length is an immutable field property (data.length), unlike String.length() method or List.size().',
          hintKm: 'ជា property គ្មានវង់ក្រចក',
          hintEn: 'data.length field.',
        },
        {
          id: 'q-arr-2',
          questionKm: 'តើតម្លៃលំនាំដើម (Default Value) នៃធាតុក្នុង Array ប្រភេទ `boolean[]` ពេលទើបបង្កើតថ្មីគឺជាអ្វី?',
          questionEn: 'What is the default value of elements in a freshly allocated boolean[] array?',
          optionsKm: ['false', 'true', 'null', '0'],
          optionsEn: ['false', 'true', 'null', '0'],
          correctOptionIndex: 0,
          explanationKm: 'នៅពេលបង្កើត boolean array ថ្មីដោយគ្មានបញ្ជាក់តម្លៃ គ្រប់ធាតុទាំងអស់ត្រូវបានកំណត់តម្លៃលំនាំដើមជា `false` ដោយស្វ័យប្រវត្តិ។',
          explanationEn: 'JVM initializes all boolean array elements to false by default.',
          hintKm: 'តម្លៃ boolean អវិជ្ជមាន',
          hintEn: 'false boolean flag.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_arrays.asp',
    },
    {
      id: 'java-methods-scope',
      slug: 'java-methods-scope',
      moduleSlug: 'conditions-loops-methods',
      order: 4,
      titleKm: 'វិធីសាស្ត្រ ប៉ារ៉ាម៉ែត្រ និង Overloading (Methods, Parameters & Scope)',
      titleEn: 'Java Methods, Parameters, Overloading & Scope',
      difficulty: 'beginner',
      estimatedMinutes: 25,
      objectivesKm: [
        'ចេះបង្កើត និងហៅប្រើ Methods ដើម្បីបំបែកកូដធំៗឱ្យទៅជាផ្នែកតូចៗ (Reusability & Clean Code)',
        'យល់ដឹងពី Parameters, Return Values និងគោលការណ៍ Pass-by-Value របស់ Java',
        'ចេះប្រើប្រាស់ Method Overloading (ឈ្មោះដូចគ្នា ប៉ារ៉ាម៉ែត្រខុសគ្នា)',
      ],
      objectivesEn: [
        'Declare, invoke, and modularize code using reusable Java methods',
        'Master parameters, return values, and Java\'s strict pass-by-value semantics',
        'Apply Method Overloading based on parameter counts and type signatures',
      ],
      summaryKm: 'Method គឺជាប្លុកកូដដែលមានឈ្មោះច្បាស់លាស់ អាចទទួលទិន្នន័យ (Parameters) គណនា និងផ្តល់លទ្ធផលមកវិញ (Return value) ដើម្បីកាត់បន្ថយការសរសេរកូដជាន់គ្នា។',
      summaryEn: 'Methods encapsulate reusable logic with parameters and return types, following strict pass-by-value behavior.',
      contentKm: `### ១. អ្វីទៅជា Method?
Method គឺជាបណ្តុំនៃពាក្យបញ្ជាដែលអនុវត្តកិច្ចការជាក់លាក់មួយ។ គោលបំណងសំខាន់បំផុតគឺ **DRY (Don't Repeat Yourself)**៖
\`\`\`java
public static int add(int a, int b) {
    return a + b;
}
\`\`\`
- \`public static\`: Access modifier និង static (ហៅប្រើបានដោយមិនបាច់បង្កើត Object)
- \`int\`: ប្រភេទតម្លៃត្រឡប់ (Return Type)។ បើមិនបញ្ជូនតម្លៃអ្វីទេ ត្រូវប្រើ \`void\`
- \`add\`: ឈ្មោះ Method (សរសេរជា camelCase)
- \`(int a, int b)\`: ប៉ារ៉ាម៉ែត្រទទួលពីក្រៅ

### ២. គោលការណ៍ Pass-by-Value ក្នុង Java
**ចំណាំសំខាន់:** Java ប្រើប្រាស់ **Pass-by-Value ជានិច្ច** គ្រប់កាលៈទេសៈទាំងអស់!
- ចំពោះ Primitive Type: តម្លៃត្រូវបានចម្លង (Copy) ទៅកាន់ប៉ារ៉ាម៉ែត្រ ដូច្នេះការកែប្រែក្នុង method មិនប៉ះពាល់អថេរដើមខាងក្រៅឡើយ។
- ចំពោះ Object Reference: អ្វីដែលត្រូវបានចម្លងគឺតម្លៃនៃ **Reference Address**។ ដូច្នេះបើអ្នកកែប្រែ attribute ខាងក្នុង Object វានឹងជះឥទ្ធិពលដល់ Object ដើម!

### ៣. Method Overloading
Method Overloading គឺជាសមត្ថភាពដែលអនុញ្ញាតឱ្យមាន Method ច្រើនក្នុង Class តែមួយ មានឈ្មោះដូចគ្នា **តែមានចំនួន ឬប្រភេទ Parameter ខុសគ្នា**៖
\`\`\`java
int multiply(int a, int b) { return a * b; }
double multiply(double a, double b) { return a * b; }
int multiply(int a, int b, int c) { return a * b * c; }
\`\`\``,
      contentEn: `Learn modular programming with methods, access modifiers, void vs typed return values, strict pass-by-value mechanics, and method signature overloading.`,
      syntax: `modifier returnType methodName(parameterList) {
    // កូដដំណើរការ
    return value; // (ប្រសិនបើ returnType មិនមែន void)
}`,
      vocabulary: [
        {
          term: 'Method Signature',
          khmerTerm: 'ហត្ថលេខា Method',
          definitionKm: 'ការរួមបញ្ចូលគ្នារវាងឈ្មោះ Method និងបញ្ជីប្រភេទនៃ Parameters របស់វា',
          definitionEn: 'The combination of the method name and its parameter type list.',
        },
        {
          term: 'Pass-by-Value',
          khmerTerm: 'ការបញ្ជូនតាមតម្លៃចម្លង',
          definitionKm: 'យន្តការរបស់ Java ដែលចម្លងតែតម្លៃនៃអថេរ ឬចម្លង reference address ទៅកាន់ Method',
          definitionEn: 'Passing strategy where the actual value or reference handle is copied into method arguments.',
        },
        {
          term: 'Method Overloading',
          khmerTerm: 'ការផ្ទុកលើសទម្ងន់ Method',
          definitionKm: 'ការបង្កើត Methods ច្រើនដែលមានឈ្មោះដូចគ្នាប៉ុន្តែមានប៉ារ៉ាម៉ែត្រខុសគ្នា',
          definitionEn: 'Defining multiple methods in the same class sharing the same name but differing parameter lists.',
        },
      ],
      examples: [
        {
          title: 'ការបង្កើត Reusable Methods និង Method Overloading',
          code: `public class Main {
    // Method ទី ១: គណនាការបញ្ចុះតម្លៃសម្រាប់លេខគត់
    public static double calculateDiscount(double price, int percent) {
        return price - (price * percent / 100.0);
    }

    // Method ទី ២: Overloading សម្រាប់អតិថិជន VIP (បញ្ចុះតម្លៃបន្ថែម)
    public static double calculateDiscount(double price, int percent, double vipExtraDollar) {
        double discounted = calculateDiscount(price, percent);
        return discounted - vipExtraDollar;
    }

    // Method ទី ៣: បោះពុម្ពព័ត៌មាន (void method)
    public static void printInvoice(String customer, double finalPrice) {
        System.out.printf("អតិថិជន: %-10s | តម្លៃសរុបត្រូវបង់: $%.2f%n", customer, finalPrice);
    }

    public static void main(String[] args) {
        double regularPrice = calculateDiscount(100.0, 10);
        double vipPrice = calculateDiscount(100.0, 10, 5.0);

        printInvoice("សុខា (ធម្មតា)", regularPrice);
        printInvoice("ចិន្តា (VIP)", vipPrice);
    }
}`,
          explanationKm: 'ឧទាហរណ៍នេះបង្ហាញពី Method គណនាតម្លៃ, Method Overloading សម្រាប់ VIP និង void method សម្រាប់បង្ហាញវិក្កយបត្រ។',
          explanationEn: 'Demonstrates typed methods returning doubles, overloaded parameters for VIP discounts, and void reporting methods.',
          lineByLineExplanation: [
            {
              line: 'public static double calculateDiscount(...)',
              explanationKm: 'Method ទទួលតម្លៃ price និង percent រួចគណនាបញ្ជូនលទ្ធផលមកវិញជា double។',
              explanationEn: 'Declares method with return type double taking two input arguments.',
            },
            {
              line: 'calculateDiscount(price, percent, vipExtraDollar)',
              explanationKm: 'Overloaded method ដែលមានឈ្មោះដូចគ្នា តែមាន parameter ចំនួន ៣។',
              explanationEn: 'Overloaded variant with three arguments invoking the two-argument version.',
            },
            {
              line: 'public static void printInvoice(...)',
              explanationKm: 'ពាក្យគន្លឹះ void មានន័យថា method នេះមិនបញ្ជូនតម្លៃអ្វីត្រឡប់មកវិញឡើយ។',
              explanationEn: 'Void return indicator meaning no result value is passed back to caller.',
            },
          ],
          expectedOutput: `អតិថិជន: សុខា (ធម្មតា)  | តម្លៃសរុបត្រូវបង់: $90.00
អតិថិជន: ចិន្តា (VIP)   | តម្លៃសរុបត្រូវបង់: $85.00`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការច្រឡំថាការកែប្រែ Primitive Variable ក្នុង Method នឹងប៉ះពាល់ខាងក្រៅ',
          titleEn: 'Assuming primitive pass-by-value mutates caller variables',
          badCode: `public static void doubleValue(int x) {
    x = x * 2; // កែប្រែតែអថេរចម្លងក្នុង method ប៉ុណ្ណោះ
}
public static void main(String[] args) {
    int num = 10;
    doubleValue(num);
    System.out.println(num); // នៅតែ 10 ដដែល! មិនមែន 20 ទេ!
}`,
          goodCode: `public static int doubleValue(int x) {
    return x * 2; // បញ្ជូនតម្លៃថ្មីមកវិញ
}
public static void main(String[] args) {
    int num = 10;
    num = doubleValue(num); // យកតម្លៃត្រឡប់មកដាក់ក្នុង num វិញ
    System.out.println(num); // 20 ត្រឹមត្រូវ
}`,
          explanationKm: 'Java ដំណើរការតាម Pass-by-Value។ នៅពេលបញ្ជូន Primitive variable ចូលទៅក្នុង Method វានឹងចម្លងតែតម្លៃប៉ុណ្ណោះ។ ដើម្បីយកតម្លៃថ្មី ត្រូវ return វាចេញមកវិញ។',
          explanationEn: 'Primitives are passed by copy. Callers must capture return values to update caller state.',
        },
      ],
      exercise: {
        id: 'ex-meth-1',
        titleKm: 'បង្កើត Method ពិនិត្យចំនួនបឋម (Prime Number Checker)',
        titleEn: 'Create isPrime() Predicate Method',
        descriptionKm: 'សរសេរ Method `public static boolean isPrime(int n)` ដែលត្រឡប់តម្លៃ `true` បើ n ជាចំនួនបឋម (ធំជាង 1 និងគ្មានលេខណាផ្សេងចែកដាច់ក្រៅពី 1 និងខ្លួនវា) និង `false` បើមិនមែន។',
        descriptionEn: 'Implement public static boolean isPrime(int n) checking whether n is a prime number.',
        starterCode: `public class Main {
    // សរសេរ method isPrime នៅទីនេះ
    
    public static void main(String[] args) {
        int testNum = 17;
        // ហៅ isPrime(testNum)
    }
}`,
        solutionCode: `public class Main {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
    
    public static void main(String[] args) {
        int testNum = 17;
        boolean result = isPrime(testNum);
        System.out.println("លេខ " + testNum + " ជាចំនួនបឋម: " + result);
    }
}`,
        hintsKm: [
          'លេខ <= 1 មិនមែនជាចំនួនបឋមឡើយ (return false)',
          'រត់ Loop ចាប់ពី 2 ដល់ `i * i <= n` បើមានលេខចែកដាច់ `n % i == 0` នោះមិនមែនជាចំនួនបឋមទេ',
        ],
        hintsEn: [
          'Numbers <= 1 are not prime',
          'Test divisors up to sqrt(n) via i * i <= n',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-meth-1',
          questionKm: 'តើពាក្យគន្លឹះមួយណាដែលប្រើនៅមុខ Method ដើម្បីបញ្ជាក់ថា Method នោះមិនបញ្ជូនតម្លៃអ្វីត្រឡប់មកវិញឡើយ?',
          questionEn: 'Which keyword designates a method that does not return any value?',
          difficulty: 'easy',
          hintsKm: ['ពាក្យមានន័យថា "ទទេរស្អាត" (void)'],
          hintsEn: ['void keyword.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("void");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("void");
    }
}`,
          expectedOutput: 'void',
        },
        {
          id: 'pq-meth-2',
          questionKm: 'តើការផ្លាស់ប្តូរតែ Return Type មួយមុខគត់ (ដោយ Method Name និង Parameters នៅដដែល) អាចបង្កើត Method Overloading បានដែរឬទេ?',
          questionEn: 'Can two methods be overloaded solely by changing their return types?',
          difficulty: 'medium',
          hintsKm: ['មិនអាចទេ! Compiler មិនអាចបែងចែក Method Signature បានឡើយ (Compile Error)'],
          hintsEn: ['No. Return type is not part of the unique method signature in Java.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // ពន្យល់បញ្ហានេះ
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("មិនអាចទេ! Method Overloading តម្រូវឱ្យមានចំនួន ឬប្រភេទ Parameters ខុសគ្នាជាដាច់ខាត!");
    }
}`,
          expectedOutput: 'មិនអាចទេ! Method Overloading តម្រូវឱ្យមានចំនួន ឬប្រភេទ Parameters ខុសគ្នាជាដាច់ខាត!',
        },
        {
          id: 'pq-meth-3',
          questionKm: 'ចូរសរសេរ Recursive Method គណនា Factorial នៃចំនួនមួយ `factorial(int n)` (ឧទាហរណ៍ 5! = 5 * 4 * 3 * 2 * 1 = 120)។',
          questionEn: 'Implement a recursive factorial method calculating n! (e.g. 5! = 120).',
          difficulty: 'hard',
          hintsKm: ['Base case: បើ n <= 1 return 1; Recursive case: return n * factorial(n - 1)'],
          hintsEn: ['Base case n <= 1 returns 1; recursive step returns n * factorial(n - 1).'],
          starterCode: `public class Main {
    // សរសេរ factorial method
    public static void main(String[] args) {
        
    }
}`,
          solutionCode: `public class Main {
    public static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
    
    public static void main(String[] args) {
        int num = 5;
        System.out.println(num + "! = " + factorial(num));
    }
}`,
          expectedOutput: '5! = 120',
        },
      ],
      quizzes: [
        {
          id: 'q-meth-1',
          questionKm: 'តើអ្វីជាសមាសភាគនៃ Method Signature ក្នុង Java?',
          questionEn: 'What constitutes a Method Signature in Java?',
          optionsKm: ['ឈ្មោះ Method និងបញ្ជីប្រភេទប៉ារ៉ាម៉ែត្រ (Name + Parameter Types)', 'Return Type និងឈ្មោះ Method', 'Access Modifier និង Return Type', 'ឈ្មោះ Method និងឈ្មោះអថេរ'],
          optionsEn: ['Method Name and Parameter Types list', 'Return Type and Method Name', 'Access Modifier and Return Type', 'Method Name and Variable names'],
          correctOptionIndex: 0,
          explanationKm: 'Method Signature រួមមានតែ ឈ្មោះ Method និងបញ្ជីប្រភេទប៉ារ៉ាម៉ែត្រ (Parameter Types) ប៉ុណ្ណោះ។ Return type មិនមែនជាផ្នែកនៃ Signature ឡើយ។',
          explanationEn: 'In Java, a method signature consists strictly of the method name and the sequence of parameter types.',
          hintKm: 'ឈ្មោះ និងប្រភេទនៃ arguments',
          hintEn: 'Name and parameter types.',
        },
        {
          id: 'q-meth-2',
          questionKm: 'នៅពេលអ្នកបញ្ជូនអថេរប្រភេទ `int x = 50;` ចូលក្នុង Method តើ Java បញ្ជូនវាតាមរបៀបណា?',
          questionEn: 'When passing int x = 50 into a method, which evaluation strategy is used?',
          optionsKm: ['Pass-by-Value (ចម្លងតម្លៃ 50)', 'Pass-by-Reference (ចង្អុលអាសយដ្ឋាន Memory)', 'Pass-by-Name', 'Dynamic Binding'],
          optionsEn: ['Pass-by-Value (copying 50)', 'Pass-by-Reference (passing pointer address)', 'Pass-by-Name', 'Dynamic Binding'],
          correctOptionIndex: 0,
          explanationKm: 'Java ដំណើរការតាម Pass-by-Value គ្រប់ករណីទាំងអស់។ តម្លៃ 50 ត្រូវបានចម្លងចូលទៅក្នុងអថេរ local របស់ method នោះ។',
          explanationEn: 'Java is strictly pass-by-value. Primitives are passed by copying their numerical bit value.',
          hintKm: 'ចម្លងតម្លៃ copy of value',
          hintEn: 'Pass-by-value.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_methods.asp',
    },
  ],
};
