import { CurriculumModule } from '../../types';

export const MODULE_8_PROJECTS_DEBUGGING: CurriculumModule = {
  id: 'mod-8',
  slug: 'practical-projects-debugging',
  titleKm: '៨. គម្រោងអនុវត្តជាក់ស្តែង និងបច្ចេកទេស Debugging',
  titleEn: '8. Practical Projects & Debugging Techniques',
  descriptionKm: 'បញ្ចប់វគ្គសិក្សាដោយភាពជឿជាក់៖ បច្ចេកទេសស្វែងរក និងដោះស្រាយកំហុស (Debugging Masterclass) និងការរៀបចំស្ថាបត្យកម្មកសាងគម្រោងកម្មវិធីជាក់ស្តែងទាំង ៥។',
  descriptionEn: 'Graduate with professional skills: stack trace debugging diagnostics, architectural design patterns, and executing the 5 portfolio projects.',
  icon: 'Terminal',
  level: 'advanced',
  lessons: [
    {
      id: 'java-debugging-best-practices',
      slug: 'java-debugging-best-practices',
      moduleSlug: 'practical-projects-debugging',
      order: 1,
      titleKm: 'បច្ចេកទេស Debugging និងស្វែងរកកំហុសក្នុង Java (Debugging Masterclass)',
      titleEn: 'Java Debugging Masterclass: Stack Traces & Diagnostic Skills',
      difficulty: 'advanced',
      estimatedMinutes: 25,
      objectivesKm: [
        'ចេះអាន និងវិភាគ Stack Trace របស់ Java ដើម្បីស្វែងរកបន្ទាត់កូដដែលមានកំហុសយ៉ាងរហ័ស',
        'ស្គាល់ និងចេះដោះស្រាយកំហុសល្បីៗទាំង ៥: NullPointerException, IndexOutOfBounds, ClassCast, StackOverflow, និង Infinite Loops',
        'យល់ដឹងពីបច្ចេកទេស Debugging ទំនើប: Breakpoints, Step Over, Step Into, Watch Expressions, និង Defensive Logging',
      ],
      objectivesEn: [
        'Read and dissect Java stack traces to locate root-cause exceptions immediately',
        'Diagnose and remediate top 5 common errors: NullPointerException, IndexOutOfBounds, ClassCast, StackOverflow, and logical bugs',
        'Apply modern debugging workflows: IDE breakpoints, step execution, variable inspection, and defensive logging',
      ],
      summaryKm: 'ការសរសេរកូដត្រូវតែដើរទន្ទឹមគ្នានឹងសមត្ថភាពដោះស្រាយកំហុស។ រៀនអាន Stack Trace ដូចវិស្វករជំនាញ និងប្រើប្រាស់វិធីសាស្ត្រ Debugging ប្រកបដោយប្រសិទ្ធភាព។',
      summaryEn: 'Debugging is the true superpower of a software engineer. Master reading stack traces and isolating runtime bugs.',
      contentKm: `### ១. របៀបអាន Java Stack Trace ដូចអ្នកជំនាញ
នៅពេលកម្មវិធី Java គាំង JVM នឹងបោះពុម្ព **Stack Trace**។ កុំភ័យខ្លាចអក្សរក្រហមទាំងនោះ!
ច្បាប់អាន Stack Trace៖
1. **មើលបន្ទាត់ទីមួយបង្អស់ (Top Line):** វានឹងប្រាប់ពី **ប្រភេទកំហុស** និង **សារពន្យល់** (ឧ. \`java.lang.NullPointerException: Cannot invoke method because "s" is null\`)។
2. **ស្វែងរកឈ្មោះ Class របស់អ្នក (First line pointing to your code):** រំលងបន្ទាត់ដែលជា Internal Java Libraries ចោល រកបន្ទាត់ណាដែលមានឈ្មោះ Class របស់អ្នក (ឧ. \`at Main.java:24\`)។ នោះហើយជាកន្លែងដែលកូដរបស់អ្នកផ្ទុះកំហុស!

### ២. កំហុសកំពូលទាំង ៥ ក្នុង Java
1. **NullPointerException (NPE):** ព្យាយាមហៅ method ឬ field លើអថេរដែលជា \`null\`។
2. **ArrayIndexOutOfBoundsException:** ចូលប្រើ Index លើស \`length - 1\` ឬ Index អវិជ្ជមាន។
3. **ClassCastException:** បង្ខំ Downcast Object ទៅកាន់ប្រភេទខុស។
4. **StackOverflowError:** Recursion គ្មាន Base Case ឬហៅខ្លួនឯងមិនចេះចប់។
5. **ArithmeticException (/ by zero):** ចែកនឹងលេខ 0 ក្នុងចំនួនគត់។

### ៣. យុទ្ធសាស្ត្រ Debugging
- **Print Statement Debugging:** ដាក់ \`System.out.println("DEBUG: x = " + x);\` នៅចំណុចសង្ស័យ។
- **IDE Breakpoint:** ផ្អាកកម្មវិធីត្រង់បន្ទាត់ជាក់លាក់ ដើម្បីពិនិត្យមើលតម្លៃ Memory ក្នុង Stack និង Heap។
- **Defensive Programming:** ប្រើ \`Objects.requireNonNull()\` ឬ \`Optional<T>\` ការពារតម្លៃ null ជាមុន។`,
      contentEn: `Learn diagnostic strategies for dissecting stack traces, isolating off-by-one errors, eliminating NullPointerExceptions, and debugging workflows.`,
      syntax: `// Defensive null checking
if (user == null) {
    throw new IllegalArgumentException("User មិនអាចជា null ឡើយ!");
}`,
      vocabulary: [
        {
          term: 'Stack Trace',
          khmerTerm: 'ដានដានជង់នៃការហៅ (Stack Trace)',
          definitionKm: 'បញ្ជីរាយនាមនៃការហៅ Methods ក្នុង Call Stack នៅពេល Exception មួយកើតឡើង',
          definitionEn: 'A report showing the active stack frames at the moment an exception occurred.',
        },
        {
          term: 'Breakpoint',
          khmerTerm: 'ចំណុចផ្អាក Debugger',
          definitionKm: 'សញ្ញាសម្គាល់ក្នុង IDE ដែលបញ្ជាឱ្យកម្មវិធីផ្អាកដំណើរការត្រង់បន្ទាត់នោះ ដើម្បីពិនិត្យ Memory',
          definitionEn: 'An intentional stopping point in a program put in place for debugging purposes.',
        },
        {
          term: 'Defensive Programming',
          khmerTerm: 'ការសរសេរកូដការពារជាមុន',
          definitionKm: 'ទម្លាប់សរសេរកូដដែលផ្ទៀងផ្ទាត់ Input និងស្ថានភាពជាមុន ដើម្បីចៀសវាងកំហុសដែលមិនបានរំពឹងទុក',
          definitionEn: 'A practice designed to ensure continuing function under unforeseen circumstances.',
        },
      ],
      examples: [
        {
          title: 'ការវិភាគ និងដោះស្រាយកំហុស NullPointerException ដោយសុវត្ថិភាព',
          code: `import java.util.Optional;

class User {
    private String name;
    private String email;

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() { return name; }
    public Optional<String> getEmail() {
        return Optional.ofNullable(email);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== ការពារកំហុស NullPointerException ដោយ Optional ===");

        User u1 = new User("សុខ សំណាង", "sok@academy.kh");
        User u2 = new User("ចិន្តា", null); // គ្មានអ៊ីមែល (null)

        printUserProfile(u1);
        printUserProfile(u2);
    }

    public static void printUserProfile(User user) {
        // ពិនិត្យការពារកំហុសជាមុន (Defensive Guard)
        if (user == null) {
            System.out.println("⚠️ User មិនត្រឹមត្រូវ!");
            return;
        }

        System.out.println("ឈ្មោះ: " + user.getName());
        
        // ប្រើ Optional ដើម្បីដោះស្រាយ null ដោយមិនគាំងកម្មវិធី
        String emailText = user.getEmail().orElse("[មិនបានបញ្ជាក់អ៊ីមែល]");
        System.out.println("អ៊ីមែល: " + emailText);
        System.out.println("-----------------------------------");
    }
}`,
          explanationKm: 'បង្ហាញពីការប្រើ `Optional<String>` និង Guard Conditions ដើម្បីការពារកុំឱ្យកើតមាន NullPointerException ដែលជាកំហុសឧស្សាហ៍ជួបប្រទះបំផុត។',
          explanationEn: 'Demonstrates defensive programming patterns and Java Optional to eliminate NullPointerException failures.',
          lineByLineExplanation: [
            {
              line: 'Optional.ofNullable(email)',
              explanationKm: 'វេចខ្ចប់តម្លៃ email ក្នុង Optional ដែលអាចមានតម្លៃ ឬជា null ដោយសុវត្ថិភាព។',
              explanationEn: 'Safely wraps nullable field in an Optional container.',
            },
            {
              line: 'user.getEmail().orElse("[មិនបានបញ្ជាក់អ៊ីមែល]")',
              explanationKm: 'បើមាន email វាយក email; បើជា null វាយកតម្លៃជំនួសលំនាំដើម ដោយមិនគាំង NPE ឡើយ។',
              explanationEn: 'Extracts value or falls back to default string gracefully without exception.',
            },
          ],
          expectedOutput: `=== ការពារកំហុស NullPointerException ដោយ Optional ===
ឈ្មោះ: សុខ សំណាង
អ៊ីមែល: sok@academy.kh
-----------------------------------
ឈ្មោះ: ចិន្តា
អ៊ីមែល: [មិនបានបញ្ជាក់អ៊ីមែល]
-----------------------------------`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការភ័យខ្លាច Stack Trace ដោយមិនមើលបន្ទាត់ Class ផ្ទាល់ខ្លួន',
          titleEn: 'Ignoring line numbers in stack traces and guessing errors randomly',
          badCode: `// ឃើញ Exception ភ្លាម អង្គុយទាយកូដខុសដោយមិនមើលលេខបន្ទាត់...`,
          goodCode: `// ជំហានត្រឹមត្រូវ:
// ១. អានឈ្មោះ Exception (ឧ. NullPointerException)
// ២. ស្វែងរកបន្ទាត់ "at Main.java:25"
// ៣. បើកមើលបន្ទាត់ទី 25 ពិនិត្យមើលថាអថេរណាជា null!`,
          explanationKm: 'Stack Trace បង្ហាញលេខបន្ទាត់កូដជាក់លាក់ ១០០%។ កុំទាយ! ត្រូវចុចលើ ឬបើកមើលបន្ទាត់ដែល Stack Trace បង្ហាញជាមុនសិន។',
          explanationEn: 'Stack traces pinpoint the exact filename and line number of failures. Always inspect the indicated line directly.',
        },
      ],
      exercise: {
        id: 'ex-dbg-1',
        titleKm: 'ស្វែងរក និងជួសជុលកំហុសក្នុងកូដគណនាមធ្យមភាគ',
        titleEn: 'Debug Off-by-one and Division by Zero Bugs',
        descriptionKm: 'កូដខាងក្រោមមានកំហុស ArrayIndexOutOfBoundsException (ប្រើ `<=`) និង ArithmeticException (ចែកនឹង 0 ពេល array ទទេ)។ សូមជួសជុលវាឱ្យដំណើរការបានត្រឹមត្រូវ។',
        descriptionEn: 'The starter code contains off-by-one and zero-length bugs. Fix and stabilize.',
        starterCode: `public class Main {
    public static double computeAverage(int[] arr) {
        int sum = 0;
        for (int i = 0; i <= arr.length; i++) { // កំហុសទី ១: <=
            sum += arr[i];
        }
        return sum / arr.length; // កំហុសទី ២: បាត់ទសភាគ
    }

    public static void main(String[] args) {
        int[] scores = {80, 90, 85};
        System.out.println("មធ្យមភាគ: " + computeAverage(scores));
    }
}`,
        solutionCode: `public class Main {
    public static double computeAverage(int[] arr) {
        if (arr == null || arr.length == 0) {
            return 0.0;
        }
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return (double) sum / arr.length;
    }

    public static void main(String[] args) {
        int[] scores = {80, 90, 85};
        System.out.println("មធ្យមភាគ: " + computeAverage(scores));
    }
}`,
        expectedOutput: 'មធ្យមភាគ: 85.0',
        hintsKm: [
          'ប្តូរ `i <= arr.length` មក `i < arr.length`',
          'បម្លែង `(double) sum / arr.length` ដើម្បីកុំឱ្យបាត់ទសភាគ',
          'បន្ថែមការត្រួតពិនិត្យ `if (arr == null || arr.length == 0)`',
        ],
        hintsEn: [
          'Change i <= arr.length to i < arr.length',
          'Cast (double) sum for precision',
          'Guard against null or empty arrays',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-dbg-1',
          questionKm: 'តើកំហុស Exception មួយណាដែលកើតឡើងញឹកញាប់បំផុតនៅពេលព្យាយាមហៅ method លើ Object reference ដែលគ្មានតម្លៃ?',
          questionEn: 'Which exception occurs most frequently when invoking methods on an uninitialized reference?',
          difficulty: 'easy',
          hintsKm: ['NullPointerException (NPE)'],
          hintsEn: ['NullPointerException.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("NullPointerException");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("NullPointerException");
    }
}`,
          expectedOutput: 'NullPointerException',
        },
        {
          id: 'pq-dbg-2',
          questionKm: 'តើ Class `java.util.Optional` ក្នុង Java 8+ ត្រូវបានបង្កើតឡើងក្នុងគោលបំណងចម្បងអ្វី?',
          questionEn: 'What is the primary purpose of introducing java.util.Optional in Java 8?',
          difficulty: 'medium',
          hintsKm: ['ដើម្បីតំណាងឱ្យតម្លៃដែលអាចមាន ឬគ្មាន (Absent/Present) ដោយមិនចាំបាច់ប្រើ null ការពារ NPE'],
          hintsEn: ['To explicitly represent the presence or absence of a value without relying on dangerous nulls.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // ពន្យល់ Optional
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Optional ជួយការពារកំហុស NullPointerException ដោយបញ្ជាក់ច្បាស់ថាតម្លៃអាចមាន ឬគ្មាន!");
    }
}`,
          expectedOutput: 'Optional ជួយការពារកំហុស NullPointerException ដោយបញ្ជាក់ច្បាស់ថាតម្លៃអាចមាន ឬគ្មាន!',
        },
        {
          id: 'pq-dbg-3',
          questionKm: 'ចូរបង្ហាញកូដដែលប្រើ `Objects.requireNonNull()` ដើម្បីការពារ parameter មិនឱ្យជា null ជាមួយសារពន្យល់ច្បាស់លាស់។',
          questionEn: 'Demonstrate defensive validation using java.util.Objects.requireNonNull().',
          difficulty: 'hard',
          hintsKm: ['ប្រើ `Objects.requireNonNull(name, "ឈ្មោះមិនអាចជា null ឡើយ!");`'],
          hintsEn: ['Call Objects.requireNonNull(param, message).'],
          starterCode: `import java.util.Objects;

public class Main {
    public static void registerUser(String name) {
        // Validate name
    }

    public static void main(String[] args) {
        
    }
}`,
          solutionCode: `import java.util.Objects;

public class Main {
    public static void registerUser(String name) {
        Objects.requireNonNull(name, "ឈ្មោះអ្នកប្រើមិនអាចជា null បានឡើយ!");
        System.out.println("ចុះឈ្មោះជោគជ័យ: " + name);
    }

    public static void main(String[] args) {
        registerUser("សុខ សំណាង");
        try {
            registerUser(null);
        } catch (NullPointerException e) {
            System.out.println("ការពារបានត្រឹមត្រូវ: " + e.getMessage());
        }
    }
}`,
          expectedOutput: `ចុះឈ្មោះជោគជ័យ: សុខ សំណាង
ការពារបានត្រឹមត្រូវ: ឈ្មោះអ្នកប្រើមិនអាចជា null បានឡើយ!`,
        },
      ],
      quizzes: [
        {
          id: 'q-dbg-1',
          questionKm: 'នៅពេលអាន Stack Trace តើអ្នកគួរតែស្វែងរកបន្ទាត់ណាជាមុនសិន?',
          questionEn: 'When analyzing a stack trace, which line should you inspect first?',
          optionsKm: ['បន្ទាត់កំពូលដែលបង្ហាញប្រភេទ Exception និងបន្ទាត់ដំបូងដែលចង្អុលទៅកាន់ Class ផ្ទាល់ខ្លួន', 'បន្ទាត់ចុងក្រោយគេបង្អស់នៃ Java Internal Libraries', 'កណ្តាលនៃ JVM ClassLoader', 'រំលងចោលមិនបាច់អានទេ'],
          optionsEn: ['The top exception message and the first frame matching your application code', 'The very bottom library frame', 'ClassLoader internals', 'Ignore it completely'],
          correctOptionIndex: 0,
          explanationKm: 'ត្រូវអានបន្ទាត់កំពូលដើម្បីដឹងប្រភេទ Exception និងសារកំហុស រួចរកបន្ទាត់ដំបូងបង្អស់ដែលមានឈ្មោះ Class និងលេខបន្ទាត់កូដរបស់អ្នក។',
          explanationEn: 'Always inspect the top exception message and the first stack frame belonging to your application codebase.',
          hintKm: 'បន្ទាត់កំពូល និងបន្ទាត់កូដផ្ទាល់ខ្លួន',
          hintEn: 'Top line and user code frame.',
        },
        {
          id: 'q-dbg-2',
          questionKm: 'តើកំហុសអ្វីដែលកើតឡើងនៅពេល Method មួយហៅខ្លួនឯងមិនចេះចប់ (Infinite Recursion)?',
          questionEn: 'Which error is thrown when a method invokes itself infinitely without a base case?',
          optionsKm: ['java.lang.StackOverflowError', 'java.lang.OutOfMemoryError', 'java.lang.NullPointerException', 'java.lang.IndexOutOfBoundsException'],
          optionsEn: ['java.lang.StackOverflowError', 'java.lang.OutOfMemoryError', 'java.lang.NullPointerException', 'java.lang.IndexOutOfBoundsException'],
          correctOptionIndex: 0,
          explanationKm: 'រាល់ពេលហៅ Method មួយ JVM នឹងកក់ Frame មួយក្នុង Stack Memory។ បើហៅមិនចេះចប់ Stack នឹងពេញ បង្កជា `StackOverflowError`។',
          explanationEn: 'Excessive recursive calls fill the call stack frames leading to StackOverflowError.',
          hintKm: 'ហួសចំណុះ Stack (StackOverflow)',
          hintEn: 'StackOverflowError.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_errors.asp',
    },
    {
      id: 'java-guided-projects-guide',
      slug: 'java-guided-projects-guide',
      moduleSlug: 'practical-projects-debugging',
      order: 2,
      titleKm: 'វិធីសាស្រ្តកសាងគម្រោងកម្មវិធីពិត (From Spec to Working Java Software)',
      titleEn: 'From Spec to Production Software: Architecture & 5 Portfolio Projects',
      difficulty: 'advanced',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីស្ថាបត្យកម្មកម្មវិធីបែបបំបែកទំនួលខុសត្រូវ: Model (ទិន្នន័យ), Service (Business Logic), និង UI/Console',
        'ចេះរៀបចំគម្រោង Java ជា Packages ស្អាត និងអនុវត្តគោលការណ៍ Single Responsibility Principle (SRP)',
        'ស្គាល់ពីគម្រោងជាក់ស្តែងទាំង ៥ ក្នុង Khmer Java Academy និងរបៀបបញ្ចប់វាឱ្យទទួលបានពិន្ទុពេញ',
      ],
      objectivesEn: [
        'Architect software using separation of concerns: Models, Business Services, and Console UI controllers',
        'Structure Java projects into clean modular packages adhering to the Single Responsibility Principle (SRP)',
        'Connect knowledge to complete all 5 guided portfolio projects with full test passing',
      ],
      summaryKm: 'រៀនពីរបៀបបម្លែងបញ្ហាក្នុងពិភពពិត ឱ្យក្លាយជាកម្មវិធី Java ដែលមានស្ថាបត្យកម្មរឹងមាំ ងាយស្រួលថែទាំ និងត្រៀមខ្លួនសម្រាប់គម្រោងធំៗ។',
      summaryEn: 'Transition from isolated syntax exercises into architecting complete, maintainable Java software systems.',
      contentKm: `### ១. ស្ថាបត្យកម្មកម្មវិធីបែបបែងចែកទំនួលខុសត្រូវ (Separation of Concerns)
កំហុសធំបំផុតរបស់អ្នករៀនដំបូងគឺ **សរសេរកូដទាំងអស់ក្នុង main method តែមួយ**!
នៅក្នុងគម្រោងពិត កម្មវិធីត្រូវបានបំបែកជា ៣ ស្រទាប់ច្បាស់លាស់៖
1. **Model Layer (Entity):** ផ្ទុកទិន្នន័យសុទ្ធសាធ (State) ដូចជា \`Student\`, \`Account\`, \`Book\` ជាមួយ Encapsulation ត្រឹមត្រូវ។
2. **Service Layer (Business Logic):** ផ្ទុកក្បួនគណនា និងប្រតិបត្តិការ ដូចជា \`AccountService\` (ដាក់ប្រាក់ ដកប្រាក់ ផ្ទេរប្រាក់)។
3. **Controller / UI Layer:** ទទួល input ពីអ្នកប្រើ (Scanner) និងបង្ហាញលទ្ធផល (System.out) ដោយមិនលាយក្បួនគណនាឡើយ។

### ២. គម្រោងទាំង ៥ នៃ Khmer Java Academy
ដើម្បីបញ្ចប់វគ្គសិក្សា អ្នកមានគម្រោងអនុវត្តជាក់ស្តែងចំនួន ៥៖
1. **Simple Calculator (ម៉ាស៊ីនគិតលេខឆ្លាតវៃ):** អនុវត្ត Operators, switch, Scanner, និងការទប់ស្កាត់ការចែកនឹងសូន្យ។
2. **Student Grade System (ប្រព័ន្ធគ្រប់គ្រងពិន្ទុសិស្ស):** អនុវត្ត Arrays/ArrayList, loops, class Student, និងការគណនាមធ្យមភាគ GPA។
3. **ATM Simulator (ម៉ាស៊ីន ATM ក្លែងធ្វើ):** អនុវត្ត Encapsulation, Authentication (PIN), Exception handling, និងសមតុល្យគណនី។
4. **Library Management System (ប្រព័ន្ធបណ្ណាល័យ):** អនុវត្ត OOP Inheritance, interfaces, borrow/return logic, និងការស្វែងរកសៀវភៅតាម HashMap។
5. **Student Management System (ប្រព័ន្ធសាលារៀនពេញលេញ):** គម្រោងធំចុងក្រោយ រួមបញ្ចូល CRUD ពេញលេញ, File I/O រក្សាទុកទិន្នន័យ, និង Stream API filters។`,
      contentEn: `Learn modular system architecture, domain modeling, business logic decoupling, and review specifications for the 5 hands-on portfolio projects.`,
      syntax: `// ស្ថាបត្យកម្មកញ្ចប់ស្អាត:
// com.khmeracademy.model.Book
// com.khmeracademy.service.LibraryService
// com.khmeracademy.ui.ConsoleApp`,
      vocabulary: [
        {
          term: 'Separation of Concerns',
          khmerTerm: 'ការបែងចែកទំនួលខុសត្រូវ',
          definitionKm: 'គោលការណ៍រចនា Software ដែលបំបែកកម្មវិធីជាផ្នែកៗដាច់ដោយឡែកពីគ្នា ដោយផ្នែកនីមួយៗទទួលខុសត្រូវលើការងារតែមួយ',
          definitionEn: 'Design principle separating software into distinct sections addressing separate concerns.',
        },
        {
          term: 'Domain Model',
          khmerTerm: 'ម៉ូដែលទិន្នន័យដែន',
          definitionKm: 'Class តំណាងឱ្យវត្ថុពិតក្នុងប្រព័ន្ធ (ដូចជា Student, Order, Product) ជាមួយ attributes និង getters/setters',
          definitionEn: 'An object model representing the real-world concepts, entities, and rules of a business domain.',
        },
        {
          term: 'CRUD Operations',
          khmerTerm: 'ប្រតិបត្តិការ CRUD',
          definitionKm: 'ប្រតិបត្តិការគ្រឹះទាំង ៤ នៃប្រព័ន្ធទិន្នន័យ: Create (បង្កើត), Read (អាន), Update (កែប្រែ), Delete (លុប)',
          definitionEn: 'The four basic functions of persistent storage: Create, Read, Update, and Delete.',
        },
      ],
      examples: [
        {
          title: 'គំរូរចនាសម្ព័ន្ធកម្មវិធីបែបបំបែក Service និង Model (Clean Architecture)',
          code: `import java.util.ArrayList;
import java.util.List;

// ១. MODEL LAYER: ផ្ទុកទិន្នន័យ
class Product {
    private String id;
    private String name;
    private double price;

    public Product(String id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public double getPrice() { return price; }
}

// ២. SERVICE LAYER: ផ្ទុក Business Logic គណនា
class CartService {
    private List<Product> items = new ArrayList<>();

    public void addProduct(Product p) {
        items.add(p);
        System.out.println("🛒 បានបន្ថែមចូលកន្ត្រក: " + p.getName());
    }

    public double calculateSubtotal() {
        return items.stream().mapToDouble(Product::getPrice).sum();
    }

    public double calculateTax(double taxRate) {
        return calculateSubtotal() * taxRate;
    }

    public double calculateTotal(double taxRate) {
        return calculateSubtotal() + calculateTax(taxRate);
    }
}

// ៣. CONTROLLER / UI LAYER: គ្រប់គ្រងការបង្ហាញ
public class Main {
    public static void main(String[] args) {
        System.out.println("=== ប្រព័ន្ធលក់ទំនិញស្ថាបត្យកម្មស្អាត (Clean Architecture) ===");

        CartService cart = new CartService();
        cart.addProduct(new Product("P01", "កាហ្វេប្រណិត", 2.50));
        cart.addProduct(new Product("P02", "នំបុ័ងសាំងវិច", 3.00));
        cart.addProduct(new Product("P03", "ទឹកក្រូចច្របាច់", 1.50));

        double vat = 0.10; // អាករលើតម្លៃបន្ថែម ១០%
        System.out.println("----------------------------------------");
        System.out.printf("តម្លៃទំនិញសរុប (Subtotal): $%.2f%n", cart.calculateSubtotal());
        System.out.printf("ពន្ធអាករ VAT (10%%)       : $%.2f%n", cart.calculateTax(vat));
        System.out.printf("សរុបត្រូវទូទាត់ (Total)   : $%.2f%n", cart.calculateTotal(vat));
    }
}`,
          explanationKm: 'បង្ហាញពីការបំបែក Model `Product` ចេញពី Service `CartService` និង Controller `Main` ធ្វើឱ្យកូដងាយស្រួលសរសេរ Unit Test និងពង្រីកនៅថ្ងៃមុខ។',
          explanationEn: 'Architects a clean three-tier separation isolating Product entity state from CartService business calculations and Main console presentation.',
          lineByLineExplanation: [
            {
              line: 'class Product { ... }',
              explanationKm: 'ស្រទាប់ Model ទទួលខុសត្រូវតែលើការរក្សាទុកទិន្នន័យផលិតផលតែប៉ុណ្ណោះ។',
              explanationEn: 'Encapsulated entity holding domain state.',
            },
            {
              line: 'class CartService { ... }',
              explanationKm: 'ស្រទាប់ Service ទទួលខុសត្រូវលើក្បួនគណនាពន្ធ និងតម្លៃសរុប ដោយគ្មានការសរសេរ System.out.println ច្របូកច្របល់ឡើយ។',
              explanationEn: 'Domain service encapsulating business computation workflows.',
            },
            {
              line: 'cart.calculateTotal(vat);',
              explanationKm: 'ហៅ logic ពី Service មកបង្ហាញលើ UI យ៉ាងស្រួល។',
              explanationEn: 'Decoupled presentation invoking domain service methods.',
            },
          ],
          expectedOutput: `=== ប្រព័ន្ធលក់ទំនិញស្ថាបត្យកម្មស្អាត (Clean Architecture) ===
🛒 បានបន្ថែមចូលកន្ត្រក: កាហ្វេប្រណិត
🛒 បានបន្ថែមចូលកន្ត្រក: នំបុ័ងសាំងវិច
🛒 បានបន្ថែមចូលកន្ត្រក: ទឹកក្រូចច្របាច់
----------------------------------------
តម្លៃទំនិញសរុប (Subtotal): $7.00
ពន្ធអាករ VAT (10%)       : $0.70
សរុបត្រូវទូទាត់ (Total)   : $7.70`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការសរសេរកូដទាំងអស់ច្របល់គ្នាក្នុង Main Method (God Method Anti-pattern)',
          titleEn: 'Stuffing all application logic into a monolithic main method',
          badCode: `public static void main(String[] args) {
    // ដាក់ Scanner, Database, គណនាពន្ធ, បោះពុម្ព ទាំងអស់ក្នុង main ជាង ៥០០ បន្ទាត់!
}`,
          goodCode: `// បំបែកជា Classes និង Methods ដាច់ដោយឡែក:
// Student.java (Model)
// StudentService.java (Logic)
// Main.java (UI Runner ខ្លីៗ)`,
          explanationKm: 'ការសរសេរកូដទាំងអស់ក្នុង main method ធ្វើឱ្យកូដពិបាកអាន មិនអាច reusable បាន និងមិនអាចសរសេរ Unit Test បានឡើយ។ តែងតែបំបែកជា Class និង Service តូចៗជានិច្ច។',
          explanationEn: 'Monolithic main methods break maintainability and testability. Decompose into modular models, services, and controllers.',
        },
      ],
      exercise: {
        id: 'ex-arch-1',
        titleKm: 'បំបែកកូដគណនីធនាគារជា Model និង Service',
        titleEn: 'Refactor Account and Transfer Service',
        descriptionKm: 'បង្កើត Model `Account` (id, balance) និង Service `BankService` ដែលមាន method `transfer(Account from, Account to, double amount)` ដោយមាន validation ត្រឹមត្រូវ។',
        descriptionEn: 'Create Account model and BankService supporting transfer between accounts.',
        starterCode: `class Account {
    // private id, balance, getters, setters
}

class BankService {
    // transfer logic
}

public class Main {
    public static void main(String[] args) {
        // តេស្តផ្ទេរប្រាក់
    }
}`,
        solutionCode: `class Account {
    private String id;
    private double balance;

    public Account(String id, double balance) {
        this.id = id;
        this.balance = balance;
    }

    public String getId() { return id; }
    public double getBalance() { return balance; }
    public void setBalance(double b) { this.balance = b; }
}

class BankService {
    public boolean transfer(Account from, Account to, double amount) {
        if (amount <= 0 || from.getBalance() < amount) {
            System.out.println("❌ ប្រតិបត្តិការផ្ទេរប្រាក់មិនជោគជ័យ: សមតុល្យមិនគ្រប់គ្រាន់!");
            return false;
        }
        from.setBalance(from.getBalance() - amount);
        to.setBalance(to.getBalance() + amount);
        System.out.printf("✅ ផ្ទេរប្រាក់ $%.2f ពី %s ទៅ %s ជោគជ័យ!%n", amount, from.getId(), to.getId());
        return true;
    }
}

public class Main {
    public static void main(String[] args) {
        Account a1 = new Account("ACC-001", 200.0);
        Account a2 = new Account("ACC-002", 50.0);

        BankService bank = new BankService();
        bank.transfer(a1, a2, 75.0);

        System.out.println("សមតុល្យ ACC-001: $" + a1.getBalance());
        System.out.println("សមតុល្យ ACC-002: $" + a2.getBalance());
    }
}`,
        expectedOutput: `✅ ផ្ទេរប្រាក់ $75.00 ពី ACC-001 ទៅ ACC-002 ជោគជ័យ!
សមតុល្យ ACC-001: $125.0
សមតុល្យ ACC-002: $125.0`,
        hintsKm: [
          'ក្នុង `transfer` ពិនិត្យ `amount > 0` និង `from.getBalance() >= amount`',
          'កែប្រែសមតុល្យទាំងពីរតាម setters',
        ],
        hintsEn: [
          'Verify amount > 0 and sufficient balance before debiting',
          'Update account balances via setters',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-arch-1',
          questionKm: 'តើគោលការណ៍ Single Responsibility Principle (SRP) មានន័យដូចម្តេច?',
          questionEn: 'What does the Single Responsibility Principle (SRP) state?',
          difficulty: 'easy',
          hintsKm: ['Class មួយគួរតែមានការទទួលខុសត្រូវតែមួយគត់'],
          hintsEn: ['A class should have one, and only one, reason to change.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Class មួយគួរតែមានទំនួលខុសត្រូវតែមួយគត់");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Class មួយគួរតែមានហេតុផលកែប្រែតែមួយគត់ (ទំនួលខុសត្រូវតែមួយ)");
    }
}`,
          expectedOutput: 'Class មួយគួរតែមានហេតុផលកែប្រែតែមួយគត់ (ទំនួលខុសត្រូវតែមួយ)',
        },
        {
          id: 'pq-arch-2',
          questionKm: 'តើអ្វីជាអត្ថប្រយោជន៍នៃការបំបែក Business Logic ចេញពី Console I/O (Scanner/System.out)?',
          questionEn: 'Why should business logic be decoupled from Console I/O?',
          difficulty: 'medium',
          hintsKm: ['ដើម្បីឱ្យ Business Logic អាចយកទៅប្រើឡើងវិញជាមួយ Web API, Mobile App ឬ Automated Tests បាន'],
          hintsEn: ['Decoupling allows business logic to be reused across Web APIs, GUIs, mobile backends, and unit tests.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // ពន្យល់
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("អាចយក Business Logic ទៅប្រើឡើងវិញលើ Web API, Mobile App ឬ Automated Tests ដោយមិនជាប់ជំពាក់នឹង Terminal!");
    }
}`,
          expectedOutput: 'អាចយក Business Logic ទៅប្រើឡើងវិញលើ Web API, Mobile App ឬ Automated Tests ដោយមិនជាប់ជំពាក់នឹង Terminal!',
        },
        {
          id: 'pq-arch-3',
          questionKm: 'ចូរបង្ហាញកូដគំរូនៃ Student Grade System ដែលមាន Class Student និង GradeService គណនាចំណាត់ថ្នាក់ A, B, C, F។',
          questionEn: 'Implement a concise Student Grade System modeling Student and GradeService tiers.',
          difficulty: 'hard',
          hintsKm: ['បំបែក Model Student និង Service GradeService'],
          hintsEn: ['Decouple Student entity and GradeService logic.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // អនុវត្ត Student & GradeService
    }
}`,
          solutionCode: `class Student {
    private String name;
    private double score;

    public Student(String name, double score) {
        this.name = name;
        this.score = score;
    }

    public String getName() { return name; }
    public double getScore() { return score; }
}

class GradeService {
    public char determineGrade(double score) {
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        if (score >= 50) return 'E';
        return 'F';
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("សុខ វិបុល", 87.5);
        GradeService service = new GradeService();
        char grade = service.determineGrade(s.getScore());

        System.out.printf("សិស្ស: %s | ពិន្ទុ: %.1f | និទ្ទេស: %c%n", s.getName(), s.getScore(), grade);
    }
}`,
          expectedOutput: 'សិស្ស: សុខ វិបុល | ពិន្ទុ: 87.5 | និទ្ទេស: B',
        },
      ],
      quizzes: [
        {
          id: 'q-arch-1',
          questionKm: 'តើ Layer មួយណាដែលគួរផ្ទុក Business Logic គណនាប្រាក់ខែ ឬពន្ធ ក្នុងស្ថាបត្យកម្មស្តង់ដារ?',
          questionEn: 'Which architectural layer holds core business calculation rules?',
          optionsKm: ['Service Layer', 'UI Controller Layer', 'Entity Model Layer', 'Database Driver Layer'],
          optionsEn: ['Service Layer', 'UI Controller Layer', 'Entity Model Layer', 'Database Driver Layer'],
          correctOptionIndex: 0,
          explanationKm: 'Service Layer ទទួលខុសត្រូវលើ Business Logic និងក្បួនច្បាប់ប្រតិបត្តិការទាំងអស់នៃប្រព័ន្ធ។',
          explanationEn: 'Business logic belongs strictly in the Service layer, decoupled from presentation and entities.',
          hintKm: 'Service Layer',
          hintEn: 'Service Layer.',
        },
        {
          id: 'q-arch-2',
          questionKm: 'តើការបំបែកកូដជា Classes និង Packages តូចៗជួយដល់អ្វីខ្លះ?',
          questionEn: 'What are the core benefits of organizing code into small modular classes and packages?',
          optionsKm: ['ងាយស្រួលថែទាំ ងាយស្រួលសរសេរ Test និងអាចធ្វើការជាក្រុមបានយ៉ាងរលូន', 'ធ្វើឱ្យទំហំ RAM កើនឡើងទ្វេដង', 'ធ្វើឱ្យកូដពិបាក compile', 'គ្មានអត្ថប្រយោជន៍ទេ'],
          optionsEn: ['Maintainability, automated testability, and smooth team collaboration', 'Doubles RAM usage', 'Makes compilation slower', 'No advantages'],
          correctOptionIndex: 0,
          explanationKm: 'Modular Architecture ជួយឱ្យកូដងាយស្រួលថែទាំ ងាយសរសេរ Test និងអនុញ្ញាតឱ្យក្រុម Developer ធ្វើការជាមួយគ្នាដោយមិនជាន់កូដគ្នា។',
          explanationEn: 'Modular packaging drives maintainability, testability, and clean team development.',
          hintKm: 'ងាយស្រួលថែទាំ និង test',
          hintEn: 'Maintainability and testing.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/default.asp',
    },
  ],
};
