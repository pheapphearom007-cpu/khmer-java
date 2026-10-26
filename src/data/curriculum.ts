import { CurriculumModule, Lesson } from '../types';

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'mod-1',
    slug: 'java-basics',
    titleKm: '១. មូលដ្ឋានគ្រឹះ និងបរិស្ថាន Java',
    titleEn: '1. Java Basics & Environment',
    descriptionKm: 'ស្វែងយល់ពីប្រវត្តិ របៀបដំណើរការរបស់ JVM, JRE, JDK និងការសរសេរកម្មវិធី Java ដំបូងបំផុត។',
    descriptionEn: 'Learn Java history, how JVM, JRE, JDK work, and write your first Java program.',
    icon: 'Coffee',
    level: 'beginner',
    lessons: [
      {
        id: 'intro-to-java',
        slug: 'intro-to-java',
        moduleSlug: 'java-basics',
        order: 1,
        titleKm: 'សេចក្តីផ្តើមអំពី Java (Introduction to Java)',
        titleEn: 'Introduction to Java',
        difficulty: 'beginner',
        estimatedMinutes: 15,
        objectivesKm: [
          'យល់ដឹងថាអ្វីទៅជា Java និងមូលហេតុដែលវាមានប្រជាប្រិយភាព',
          'ស្គាល់ពីគោលការណ៍ "Write Once, Run Anywhere" (WORA)',
          'យល់ពីភាពខុសគ្នារវាង JDK, JRE, និង JVM',
        ],
        objectivesEn: [
          'Understand what Java is and why it is popular',
          'Learn the "Write Once, Run Anywhere" (WORA) philosophy',
          'Understand the difference between JDK, JRE, and JVM',
        ],
        summaryKm: 'Java គឺជាភាសាកម្មវិធីបែប Object-Oriented ដ៏រឹងមាំ និងមានសុវត្ថិភាពខ្ពស់ ដែលត្រូវបានបង្កើតឡើងដោយ Sun Microsystems (បច្ចុប្បន្ន Oracle) នៅឆ្នាំ 1995។',
        summaryEn: 'Java is a robust, secure, object-oriented programming language created by Sun Microsystems (now Oracle) in 1995.',
        contentKm: `### ១. តើអ្វីទៅជា Java?
Java គឺជាភាសាកម្មវិធីកម្រិតខ្ពស់ (High-level Programming Language) បែប Class-based, Object-Oriented ដែលមានប្រជាប្រិយភាពខ្លាំងទូទាំងពិភពលោក។ ភាសា Java ត្រូវបានប្រើប្រាស់លើ៖
- កម្មវិធីទូរស័ព្ទ Android
- ប្រព័ន្ធ Web Applications ធំៗរបស់ធនាគារ និងស្ថាប័នរដ្ឋ
- Cloud Computing និង Microservices (Spring Boot)
- កម្មវិធី Desktop និង Embedded Systems

### ២. គោលការណ៍ "Write Once, Run Anywhere" (WORA)
ចំណុចពិសេសបំផុតរបស់ Java គឺនៅពេលដែលអ្នកសរសេរកូដ Java និង compile វារួច វានឹងបង្កើតទៅជា **Bytecode (.class file)**។ Bytecode នេះអាចដំណើរការលើគ្រប់ប្រព័ន្ធប្រតិបត្តិការ (Windows, macOS, Linux) ឱ្យតែប្រព័ន្ធនោះមានដំឡើង **JVM (Java Virtual Machine)**។

### ៣. ស្ថាបត្យកម្មគ្រឹះទាំង ៣ របស់ Java
1. **JVM (Java Virtual Machine):** ម៉ាស៊ីននិម្មិតដែលទទួលខុសត្រូវក្នុងការបកប្រែ Bytecode ទៅជា Machine Code របស់កុំព្យូទ័រជាក់ស្តែង។
2. **JRE (Java Runtime Environment):** រួមមាន JVM បូកផ្សំនឹង Java Standard Libraries សម្រាប់ដំណើរការកម្មវិធី Java។
3. **JDK (Java Development Kit):** កញ្ចប់ឧបករណ៍ពេញលេញសម្រាប់អ្នកអភិវឌ្ឍន៍ (រួមមាន JRE + Compiler \`javac\` + Debugger)។`,
        contentEn: `Java is a versatile, cross-platform language powering billions of devices worldwide. Learn the foundation of JVM, JRE, and JDK.`,
        w3schoolsUrl: 'https://www.w3schools.com/java/java_intro.asp',
        syntax: 'public class Main {\n    public static void main(String[] args) {\n        // កូដរបស់អ្នកនៅទីនេះ\n    }\n}',
        examples: [
          {
            title: 'កម្មវិធីជំរាបសួរដំបូង (Hello World in Khmer)',
            code: `public class Main {
    public static void main(String[] args) {
        System.out.println("សួស្តីកម្ពុជា! ស្វាគមន៍មកកាន់ Khmer Java Academy!");
        System.out.println("Java ដំណើរការបានគ្រប់ទីកន្លែង: Write Once, Run Anywhere.");
    }
}`,
            explanationKm: 'កូដនេះបង្ហាញពីទម្រង់មូលដ្ឋាននៃកម្មវិធី Java ដោយប្រើវិធីសាស្ត្រ main() និង System.out.println() ដើម្បីបង្ហាញអត្ថបទលើអេក្រង់។',
            explanationEn: 'This basic Java program uses the main() entry point and System.out.println() to print text.',
            expectedOutput: `សួស្តីកម្ពុជា! ស្វាគមន៍មកកាន់ Khmer Java Academy!
Java ដំណើរការបានគ្រប់ទីកន្លែង: Write Once, Run Anywhere.`,
            lineByLineExplanation: [
              {
                line: 'public class Main {',
                explanationKm: 'ប្រកាស Class ឈ្មោះ Main ដែលជាទម្រង់បង្ខំក្នុង Java ព្រោះកូដទាំងអស់ត្រូវតែស្ថិតនៅក្នុង Class។',
                explanationEn: 'Declares class Main; all Java code must live inside a class.',
              },
              {
                line: 'public static void main(String[] args) {',
                explanationKm: 'នេះជា Main Method ដែលជាច្រកចេញចូលដំបូងគេបង្អស់ (Entry Point) នៅពេលកម្មវិធីចាប់ផ្តើមដំណើរការ។',
                explanationEn: 'The entry point method where program execution begins.',
              },
              {
                line: 'System.out.println(...);',
                explanationKm: 'System គឺជា Class ស្តង់ដារ, out គឺជា Output Stream, ហើយ println() បញ្ជាឱ្យបង្ហាញអត្ថបទ និងចុះបន្ទាត់ថ្មី។',
                explanationEn: 'Prints the given text followed by a new line.',
              },
            ],
          },
        ],
        commonMistakes: [
          {
            titleKm: 'ភ្លេច Case Sensitive លើពាក្យគន្លឹះ និងឈ្មោះ Class',
            titleEn: 'Case Sensitivity Mismatch',
            badCode: 'system.out.Println("Error");',
            goodCode: 'System.out.println("Correct");',
            explanationKm: 'Java ប្រកាន់អក្សរតូចធំ (Case-sensitive)។ ពាក្យ `System` ត្រូវតែសរសេរអក្សរធំ `S` និង `println` ត្រូវតែអក្សរតូច។',
            explanationEn: 'Java is strictly case-sensitive. System starts with capital S and println is lowercase.',
          },
          {
            titleKm: 'ភ្លេចសញ្ញាក្បៀសកាត់ (Semicolon ;)',
            titleEn: 'Missing Semicolon',
            badCode: 'System.out.println("Hello")',
            goodCode: 'System.out.println("Hello");',
            explanationKm: 'រាល់ Statement ក្នុង Java ត្រូវតែបញ្ចប់ដោយសញ្ញា `;` បើពុំនោះទេ Compiler នឹងបង្ហាញកំហុស Syntax Error។',
            explanationEn: 'Every statement in Java must end with a semicolon (;).',
          },
        ],
        exercise: {
          id: 'ex-intro-1',
          titleKm: 'លំហាត់ទី ១: បង្ហាញព័ត៌មានផ្ទាល់ខ្លួន',
          titleEn: 'Exercise 1: Print Your Profile',
          descriptionKm: 'សូមសរសេរកូដ Java ដោយប្រើ System.out.println() ដើម្បីបង្ហាញឈ្មោះរបស់អ្នក និងពាក្យថា "ខ្ញុំកំពុងរៀន Java នៅ Khmer Java Academy"។',
          descriptionEn: 'Write Java code using System.out.println() to print your name and learning status.',
          starterCode: `public class Main {
    public static void main(String[] args) {
        // TODO: សរសេរ System.out.println ពីរជួរនៅទីនេះ
        
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("ខ្ញុំឈ្មោះ សុខា");
        System.out.println("ខ្ញុំកំពុងរៀន Java នៅ Khmer Java Academy");
    }
}`,
          hintsKm: [
            'ប្រើ System.out.println("អត្ថបទរបស់អ្នក");',
            'កុំភ្លេចសញ្ញាធ្មេញកណ្តុរគូ (" ") ជុំវិញអក្សរ និងសញ្ញា semicolon (;) នៅចុងបន្ទាត់',
          ],
          hintsEn: ['Use System.out.println("your text");', 'Do not forget double quotes and semicolon.'],
          expectedOutput: 'ខ្ញុំឈ្មោះ សុខា\nខ្ញុំកំពុងរៀន Java នៅ Khmer Java Academy',
        },
        quizzes: [
          {
            id: 'q-intro-1',
            questionKm: 'តើពាក្យពេញរបស់ JVM គឺជាអ្វី?',
            questionEn: 'What does JVM stand for?',
            optionsKm: [
              'Java Virtual Machine',
              'Java Variable Manager',
              'Java Visual Model',
              'Java Verified Module',
            ],
            optionsEn: [
              'Java Virtual Machine',
              'Java Variable Manager',
              'Java Visual Model',
              'Java Verified Module',
            ],
            correctOptionIndex: 0,
            explanationKm: 'JVM តំណាងឱ្យ Java Virtual Machine ដែលជាម៉ាស៊ីននិម្មិតដំណើរការ Java Bytecode។',
            explanationEn: 'JVM stands for Java Virtual Machine.',
            hintKm: 'វាជា Virtual Machine សម្រាប់រត់ Bytecode',
            hintEn: 'It is a virtual machine.',
          },
          {
            id: 'q-intro-2',
            questionKm: 'តើ Method មួយណាជាច្រកចាប់ផ្តើមដំបូងគេបង្អស់នៃកម្មវិធី Java?',
            questionEn: 'Which method is the starting point of any Java program?',
            optionsKm: ['start()', 'main(String[] args)', 'init()', 'run()'],
            optionsEn: ['start()', 'main(String[] args)', 'init()', 'run()'],
            correctOptionIndex: 1,
            explanationKm: 'កម្មវិធី Java តែងតែចាប់ផ្តើមប្រតិបត្តិការចេញពី method `public static void main(String[] args)`។',
            explanationEn: 'Java execution always begins at the main method.',
          },
        ],
      },
      {
        id: 'java-syntax',
        slug: 'java-syntax',
        moduleSlug: 'java-basics',
        order: 2,
        titleKm: 'វេយ្យាករណ៍ និងរចនាសម្ព័ន្ធកូដ (Java Syntax)',
        titleEn: 'Java Syntax',
        difficulty: 'beginner',
        estimatedMinutes: 20,
        objectivesKm: [
          'យល់ពីទំនាក់ទំនងរវាងឈ្មោះ Class និងឈ្មោះ File (.java)',
          'ស្វែងយល់ពីតួនាទីរបស់ public, static, void',
          'ចេះប្រើប្រាស់សញ្ញាវង់ក្រចកទម្រង់ {} និង Comments',
        ],
        objectivesEn: [
          'Understand class name and filename relationship',
          'Learn what public, static, and void mean',
          'Understand curly brackets {} and code blocks',
        ],
        summaryKm: 'រាល់កូដ Java ទាំងអស់ត្រូវតែសរសេរក្នុង Class។ ឈ្មោះ Public Class ត្រូវតែដូចគ្នានឹងឈ្មោះ File យ៉ាងជាក់លាក់។',
        summaryEn: 'Every line of code in Java must be inside a class. The public class name must match the filename.',
        contentKm: `### រចនាសម្ព័ន្ធស្តង់ដារនៃ Java File
នៅក្នុង Java:
1. **Class Header:** \`public class Main\` - ប្រកាស Class។ ប្រសិនបើ Class ជា \`public\` ឈ្មោះរបស់វាត្រូវតែដូចគ្នានឹងឈ្មោះ File ឧទាហរណ៍ \`Main.java\`។
2. **Main Method:** \`public static void main(String[] args)\`
   - **public:** Method នេះអាចហៅមកដំណើរការពីខាងក្រៅ Class បាន
   - **static:** អាចដំណើរការ method នេះបានដោយមិនចាំបាច់បង្កើត Instance (Object) នៃ Class ឡើយ
   - **void:** បញ្ជាក់ថា Method នេះពុំមាន Return តម្លៃអ្វីត្រឡប់មកវិញឡើយ
   - **String[] args:** Array ផ្ទុក Parameter បញ្ជូនមកពី Command Line
3. **Curly Brackets { }:** កំណត់ដែនកំណត់នៃ Code Block (ប្លុកកូដ)
4. **Statements & Semicolons:** បញ្ចប់ដោយសញ្ញា \`;\` ជានិច្ច`,
        contentEn: `Learn the anatomy of Java syntax: classes, main method signature, statements, and blocks.`,
        w3schoolsUrl: 'https://www.w3schools.com/java/java_syntax.asp',
        syntax: 'public class MyClass {\n    public static void main(String[] args) {\n        // Statements;\n    }\n}',
        examples: [
          {
            title: 'ភាពខុសគ្នារវាង print() និង println()',
            code: `public class Main {
    public static void main(String[] args) {
        // print() មិនចុះបន្ទាត់ទេ
        System.out.print("ភាសា ");
        System.out.print("Java ");
        System.out.print("អស្ចារ្យណាស់! ");
        
        // println() នឹងចុះបន្ទាត់ថ្មីបន្ទាប់ពីបង្ហាញ
        System.out.println("");
        System.out.println("បន្ទាត់ទីមួយ");
        System.out.println("បន្ទាត់ទីពីរ");
    }
}`,
            explanationKm: 'print() បង្ហាញអត្ថបទតៗគ្នានៅលើបន្ទាត់តែមួយ រីឯ println() នឹងលោតចុះបន្ទាត់ថ្មីដោយស្វ័យប្រវត្ត។',
            explanationEn: 'print() stays on the same line, whereas println() appends a newline character.',
            expectedOutput: `ភាសា Java អស្ចារ្យណាស់! 
បន្ទាត់ទីមួយ
បន្ទាត់ទីពីរ`,
          },
        ],
        commonMistakes: [
          {
            titleKm: 'បិទ ឬបើកវង់ក្រចកទម្រង់ {} មិនស្មើគ្នា',
            titleEn: 'Mismatched Curly Braces',
            badCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n}',
            goodCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}',
            explanationKm: 'រាល់សញ្ញា { ត្រូវតែមានសញ្ញា } មួយផ្គូផ្គងនឹងវាជានិច្ច។',
            explanationEn: 'Every opening brace { must have a matching closing brace }.',
          },
        ],
        quizzes: [
          {
            id: 'q-syntax-1',
            questionKm: 'តើពាក្យគន្លឹះ "void" ក្នុង main method មានន័យដូចម្តេច?',
            questionEn: 'What does the "void" keyword mean in a method declaration?',
            optionsKm: [
              'Method នេះមិនមាន return តម្លៃអ្វីត្រឡប់មកវិញឡើយ',
              'Method នេះអាចដំណើរការតែម្តងគត់',
              'Method នេះត្រូវការលេខសូន្យ',
              'Method នេះជា Private',
            ],
            optionsEn: [
              'The method does not return any value',
              'The method runs only once',
              'The method requires zero parameters',
              'The method is private',
            ],
            correctOptionIndex: 0,
            explanationKm: 'void បញ្ជាក់ប្រាប់ Java ថា Method នេះគ្រាន់តែបំពេញការងារ ហើយមិន Return តម្លៃអ្វីមកវិញឡើយ។',
            explanationEn: 'void indicates that the method does not return any value.',
          },
        ],
      },
    ],
  },
  {
    id: 'mod-2',
    slug: 'variables-data-types',
    titleKm: '២. អថេរ និងប្រភេទតម្លៃ (Variables & Data Types)',
    titleEn: '2. Variables & Data Types',
    descriptionKm: 'សិក្សាពី Primitive Data Types, Reference Types, ការប្រកាសអថេរ, Type Casting និង Operators។',
    descriptionEn: 'Learn primitive data types, reference types, variables, type casting, and operators.',
    icon: 'Binary',
    level: 'beginner',
    lessons: [
      {
        id: 'java-variables',
        slug: 'java-variables',
        moduleSlug: 'variables-data-types',
        order: 1,
        titleKm: 'អថេរក្នុង Java (Java Variables)',
        titleEn: 'Java Variables',
        difficulty: 'beginner',
        estimatedMinutes: 20,
        objectivesKm: [
          'យល់ពីគំនិតនៃ Variable (អថេរ) ក្នុងអង្គចងចាំ Memory',
          'ចេះរបៀបប្រកាស និងកំណត់តម្លៃឱ្យ Variable',
          'ស្គាល់ពីវិធាននៃការដាក់ឈ្មោះ Variable (CamelCase)',
        ],
        objectivesEn: [
          'Understand variable concept in memory',
          'Declare and assign variables properly',
          'Learn naming conventions (CamelCase)',
        ],
        summaryKm: 'អថេរ (Variable) គឺជាធុងផ្ទុកទិន្នន័យនៅក្នុង Memory។ ក្នុង Java អ្នកត្រូវតែបញ្ជាក់ប្រភេទ Data Type មុននឹងប្រើប្រាស់អថេរជានិច្ច (Strongly Typed)។',
        summaryEn: 'Variables are containers for storing data values. Java is strongly typed, meaning every variable must have a declared type.',
        contentKm: `### ប្រភេទអថេរគ្រឹះក្នុង Java
1. **int:** ផ្ទុកចំនួនគត់ (Integer) ដូចជា 10, -50, 2026
2. **double:** ផ្ទុកចំនួនទសភាគ (Floating point) ដូចជា 9.99, 3.14159
3. **char:** ផ្ទុកតួអក្សរតែមួយគត់ ព័ទ្ធដោយសញ្ញា \`' \` ដូចជា 'A', 'ក'
4. **boolean:** ផ្ទុកតម្លៃពិត ឬមិនពិត (\`true\` ឬ \`false\`)
5. **String:** ផ្ទុកឃ្លា ឬអក្សរជាជួរ ព័ទ្ធដោយសញ្ញា \`" \` ដូចជា "សួស្តីកម្ពុជា"

### វិធានការដាក់ឈ្មោះអថេរ (Naming Rules)
- ត្រូវចាប់ផ្តើមដោយអក្សរតូច (camelCase) ឧទាហរណ៍៖ \`studentAge\`, \`totalPrice\`
- អាចមានអក្សរ លេខ សញ្ញា \`_\` ឬ \`$\` ប៉ុន្តែមិនអាចចាប់ផ្តើមដោយលេខឡើយ
- មិនអាចយក Java Keywords មកធ្វើជាឈ្មោះអថេរបានទេ (ដូចជា int, class, return)`,
        contentEn: `Variables are typed storage locations. Learn int, double, char, boolean, String and naming conventions.`,
        w3schoolsUrl: 'https://www.w3schools.com/java/java_variables.asp',
        syntax: 'type variableName = value;',
        examples: [
          {
            title: 'ការបង្កើត និងប្រើប្រាស់អថេរ',
            code: `public class Main {
    public static void main(String[] args) {
        String studentName = "ចាន់ សុខា";
        int studentAge = 20;
        double gpa = 3.85;
        char grade = 'A';
        boolean isEnrolled = true;
        
        System.out.println("=== ព័ត៌មាននិស្សិត ===");
        System.out.println("ឈ្មោះ: " + studentName);
        System.out.println("អាយុ: " + studentAge + " ឆ្នាំ");
        System.out.println("GPA: " + gpa);
        System.out.println("និទ្ទេស: " + grade);
        System.out.println("បានចុះឈ្មោះ: " + isEnrolled);
    }
}`,
            explanationKm: 'ឧទាហរណ៍នេះបង្ហាញពីការប្រកាសប្រភេទអថេរផ្សេងៗគ្នា និងការប្រើសញ្ញា + ដើម្បីតភ្ជាប់ String (Concatenation)។',
            explanationEn: 'Demonstrates declaring different variable types and string concatenation.',
            expectedOutput: `=== ព័ត៌មាននិស្សិត ===
ឈ្មោះ: ចាន់ សុខា
អាយុ: 20 ឆ្នាំ
GPA: 3.85
និទ្ទេស: A
បានចុះឈ្មោះ: true`,
          },
        ],
        commonMistakes: [
          {
            titleKm: 'ប្រើប្រាស់អថេរមុនពេលកំណត់តម្លៃ (Uninitialized Variable)',
            titleEn: 'Using variable before initialization',
            badCode: 'int score;\nSystem.out.println(score); // Compiler Error',
            goodCode: 'int score = 100;\nSystem.out.println(score); // Correct',
            explanationKm: 'អថេរ Local Variable ក្នុង Method មិនមាន Default Value ទេ ដូច្នេះត្រូវតែកំណត់តម្លៃឱ្យវាជាមុនសិន។',
            explanationEn: 'Local variables are not given default values and must be initialized before use.',
          },
        ],
        quizzes: [
          {
            id: 'q-var-1',
            questionKm: 'តើប្រភេទ Data Type មួយណាដែលសមស្របបំផុតសម្រាប់ផ្ទុកតម្លៃ 99.95?',
            questionEn: 'Which data type is best suited to store the value 99.95?',
            optionsKm: ['int', 'double', 'boolean', 'char'],
            optionsEn: ['int', 'double', 'boolean', 'char'],
            correctOptionIndex: 1,
            explanationKm: 'double ត្រូវបានប្រើសម្រាប់ផ្ទុកចំនួនទសភាគដែលមានភាពជាក់លាក់ខ្ពស់ (Precision)។',
            explanationEn: 'double is used for floating-point decimal numbers.',
          },
        ],
      },
      {
        id: 'java-operators',
        slug: 'java-operators',
        moduleSlug: 'variables-data-types',
        order: 2,
        titleKm: 'ប្រមាណវិធី និងសញ្ញាគណិត (Java Operators)',
        titleEn: 'Java Operators',
        difficulty: 'beginner',
        estimatedMinutes: 20,
        objectivesKm: [
          'ស្គាល់ Arithmetic Operators (+, -, *, /, %)',
          'យល់ពី Comparison Operators (==, !=, >, <, >=, <=)',
          'យល់ពី Logical Operators (&&, ||, !)',
        ],
        objectivesEn: [
          'Learn arithmetic operators',
          'Learn comparison operators',
          'Learn logical operators (AND, OR, NOT)',
        ],
        summaryKm: 'Operators ត្រូវបានប្រើដើម្បីធ្វើប្រតិបត្តិការលើអថេរ និងតម្លៃ ដូចជាការបូកដកគុណចែក ការប្រៀបធៀប និងលក្ខខណ្ឌតក្កវិជ្ជា។',
        summaryEn: 'Operators perform operations on variables and values, including arithmetic, comparison, and logical checks.',
        contentKm: `### ១. Arithmetic Operators (សញ្ញាគណិតវិទ្យា)
- \`+\` : បូក
- \`-\` : ដក
- \`*\` : គុណ
- \`/\` : ចែក (ចំណាំ៖ ប្រសិនបើ int ចែក int លទ្ធផលជាចំនួនគត់ កាត់កន្ទុយទសភាគចោល!)
- \`%\` : សំណល់នៃការចែក (Modulus ឧទាហរណ៍ 10 % 3 ស្មើ 1)

### ២. Logical Operators (សញ្ញាតក្កវិទ្យា)
- \`&&\` (AND): ពិត (true) លុះត្រាតែលក្ខខណ្ឌទាំងសងខាងសុទ្ធតែពិត
- \`||\` (OR): ពិត (true) ប្រសិនបើមានលក្ខខណ្ឌណាមួយពិត
- \`!\` (NOT): បញ្ច្រាសតម្លៃពិតទៅជាមិនពិត ឬមិនពិតទៅជាពិត`,
        contentEn: `Arithmetic, comparison, and logical operators in Java explained with practical Khmer examples.`,
        w3schoolsUrl: 'https://www.w3schools.com/java/java_operators.asp',
        examples: [
          {
            title: 'ប្រតិបត្តិការ Modulus និង Logical Operators',
            code: `public class Main {
    public static void main(String[] args) {
        int number = 17;
        
        // ពិនិត្យមើលថាតើជាលេខគូ ឬលេខសេស ដោយប្រើ % (Modulus)
        boolean isEven = (number % 2 == 0);
        System.out.println("តើ " + number + " ជាលេខគូឬ? " + isEven);
        
        // Logical Operators
        int age = 22;
        boolean hasIdCard = true;
        boolean canVote = (age >= 18) && hasIdCard;
        System.out.println("សិទ្ធិបោះឆ្នោត: " + canVote);
    }
}`,
            explanationKm: 'ប្រើប្រាស់លេខសំណល់ % 2 ដើម្បីដឹងថាលេខគូ ឬសេស និងប្រើ && ដើម្បីពិនិត្យលក្ខខណ្ឌពីរព្រមគ្នា។',
            explanationEn: 'Using modulo % 2 for even/odd check and logical AND for eligibility.',
            expectedOutput: `តើ 17 ជាលេខគូឬ? false
សិទ្ធិបោះឆ្នោត: true`,
          },
        ],
        commonMistakes: [
          {
            titleKm: 'ការចែកចំនួនគត់ int / int បាត់បង់ទសភាគ',
            titleEn: 'Integer division truncation',
            badCode: 'double result = 5 / 2; // result will be 2.0 (not 2.5!)',
            goodCode: 'double result = 5.0 / 2; // result will be 2.5',
            explanationKm: 'នៅពេលយក int ចែកនឹង int Java នឹងធ្វើ Integer Division ដោយកាត់ទសភាគចោល។ ត្រូវប្តូរយ៉ាងហោចមួយជា double (ឧទាហរណ៍ 5.0 / 2)។',
            explanationEn: 'Dividing two integers drops the fractional part. Use 5.0 / 2 to get 2.5.',
          },
        ],
        quizzes: [
          {
            id: 'q-op-1',
            questionKm: 'តើតម្លៃនៃ `14 % 4` ស្មើនឹងប៉ុន្មាន?',
            questionEn: 'What is the value of 14 % 4?',
            optionsKm: ['2', '3', '3.5', '0'],
            optionsEn: ['2', '3', '3.5', '0'],
            correctOptionIndex: 0,
            explanationKm: '14 ចែកនឹង 4 បាន 3 សល់សំណល់ 2 (4 * 3 = 12, 14 - 12 = 2)។',
            explanationEn: '14 divided by 4 is 3 with remainder 2.',
          },
        ],
      },
    ],
  },
  {
    id: 'mod-3',
    slug: 'control-flow',
    titleKm: '៣. លក្ខខណ្ឌ និងការសម្រេចចិត្ត (Control Flow)',
    titleEn: '3. Control Flow & Conditions',
    descriptionKm: 'គ្រប់គ្រងលំហូរនៃការដំណើរការកម្មវិធីជាមួយ If, Else If, Else, Ternary Operator និង Switch Statement។',
    descriptionEn: 'Control execution flow using if-else statements, ternary operators, and switch cases.',
    icon: 'GitBranch',
    level: 'beginner',
    lessons: [
      {
        id: 'java-if-else',
        slug: 'java-if-else',
        moduleSlug: 'control-flow',
        order: 1,
        titleKm: 'លក្ខខណ្ឌ If...Else (Java If...Else)',
        titleEn: 'Java If...Else',
        difficulty: 'beginner',
        estimatedMinutes: 20,
        objectivesKm: [
          'ចេះប្រើប្រាស់ if, else if, និង else',
          'ស្វែងយល់ពី Nested If (លក្ខខណ្ឌត្រួតគ្នា)',
          'ចេះប្រើ Ternary Operator (? :) សម្រាប់កូដខ្លីរហ័ស',
        ],
        objectivesEn: [
          'Use if, else if, and else statements',
          'Understand nested conditional statements',
          'Use ternary operator shorthand',
        ],
        summaryKm: 'If...Else អនុញ្ញាតឱ្យកុំព្យូទ័រធ្វើការសម្រេចចិត្តថាតើត្រូវដំណើរការប្លុកកូដមួយណា អាស្រ័យលើលក្ខខណ្ឌពិត (true) ឬមិនពិត (false)។',
        summaryEn: 'If-else statements test conditions and branch program logic accordingly.',
        contentKm: `### ទម្រង់នៃ If-Else Statement
\`\`\`java
if (condition1) {
    // ដំណើរការប្រសិនបើ condition1 ជា true
} else if (condition2) {
    // ដំណើរការប្រសិនបើ condition2 ជា true
} else {
    // ដំណើរការប្រសិនបើគ្មានលក្ខខណ្ឌណាពិត
}
\`\`\`

### Ternary Operator (សរសេរកាត់មួយជួរ)
\`\`\`java
variable = (condition) ? expressionTrue : expressionFalse;
\`\`\``,
        contentEn: `Learn branching logic with if, else-if, else, and ternary shortcuts in Java.`,
        w3schoolsUrl: 'https://www.w3schools.com/java/java_conditions.asp',
        examples: [
          {
            title: 'ការគណនានិទ្ទេសសិស្ស (Grade Evaluation)',
            code: `public class Main {
    public static void main(String[] args) {
        int score = 85;
        char grade;
        
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
        
        System.out.println("ពិន្ទុសិស្ស: " + score);
        System.out.println("ទទួលបាននិទ្ទេស: " + grade);
        
        // Ternary Operator
        String status = (score >= 50) ? "ជាប់ (Passed)" : "ធ្លាក់ (Failed)";
        System.out.println("ស្ថានភាព: " + status);
    }
}`,
            explanationKm: 'កូដនេះត្រួតពិនិត្យពិន្ទុតាមលំដាប់លំដោយពីខ្ពស់មកទាប ហើយផ្តល់និទ្ទេសសមស្រប។',
            explanationEn: 'Evaluates score thresholds and assigns grade and pass/fail status.',
            expectedOutput: `ពិន្ទុសិស្ស: 85
ទទួលបាននិទ្ទេស: B
ស្ថានភាព: ជាប់ (Passed)`,
          },
        ],
        commonMistakes: [
          {
            titleKm: 'ប្រើសញ្ញា = (Assign) ជំនួសឱ្យ == (Compare)',
            titleEn: 'Using assignment = instead of comparison ==',
            badCode: 'if (x = 10) { ... } // Compiler Error!',
            goodCode: 'if (x == 10) { ... } // Correct comparison',
            explanationKm: 'សញ្ញា `=` គឺសម្រាប់កំណត់តម្លៃ រីឯ `==` គឺសម្រាប់ប្រៀបធៀបថាតើតម្លៃទាំងពីរស្មើគ្នាឬទេ។',
            explanationEn: '= is assignment; == is equality comparison.',
          },
        ],
        quizzes: [
          {
            id: 'q-if-1',
            questionKm: 'តើ Ternary Operator មួយណាដែលត្រឹមត្រូវ?',
            questionEn: 'Which ternary expression is valid?',
            optionsKm: [
              'String s = (x > 5) ? "ធំ" : "តូច";',
              'String s = (x > 5) : "ធំ" ? "តូច";',
              'String s = if (x > 5) "ធំ" else "តូច";',
              'String s = (x > 5) ? "ធំ"',
            ],
            optionsEn: [
              'String s = (x > 5) ? "Yes" : "No";',
              'String s = (x > 5) : "Yes" ? "No";',
              'String s = if (x > 5) "Yes" else "No";',
              'String s = (x > 5) ? "Yes"',
            ],
            correctOptionIndex: 0,
            explanationKm: 'ទម្រង់ Ternary គឺ `(condition) ? valueIfTrue : valueIfFalse;`។',
            explanationEn: 'The format is condition ? expr1 : expr2.',
          },
        ],
      },
      {
        id: 'java-switch',
        slug: 'java-switch',
        moduleSlug: 'control-flow',
        order: 2,
        titleKm: 'ការប្រើប្រាស់ Switch (Java Switch)',
        titleEn: 'Java Switch',
        difficulty: 'beginner',
        estimatedMinutes: 15,
        objectivesKm: [
          'ស្វែងយល់ពីពេលណាគួរប្រើ Switch ជំនួស If-Else ច្រើនជាន់',
          'យល់ពីតួនាទីរបស់ break និង default',
        ],
        objectivesEn: ['When to use switch over many if-elses', 'Understand break and default clauses'],
        summaryKm: 'Switch statement ត្រូវបានប្រើដើម្បីជ្រើសរើសប្លុកកូដមួយក្នុងចំណោមប្លុកកូដជាច្រើនមកដំណើរការ អាស្រ័យលើតម្លៃនៃអថេរមួយជាក់លាក់។',
        summaryEn: 'Switch statements select one of many code blocks to be executed based on matching values.',
        contentKm: `### ទម្រង់នៃ Switch
\`\`\`java
switch(expression) {
    case x:
        // code
        break;
    case y:
        // code
        break;
    default:
        // code បើគ្មានករណីណាត្រូវ
}
\`\`\`
**ចំណាំសំខាន់:** បើគ្មាន \`break;\` ទេ Java នឹងបន្តដំណើរការ case បន្ទាប់ៗទៀតដោយស្វ័យប្រវត្តិ (ហៅថា Fall-through)។`,
        contentEn: 'Switch statements provide clean multi-branch conditional execution.',
        w3schoolsUrl: 'https://www.w3schools.com/java/java_switch.asp',
        examples: [
          {
            title: 'ការកំណត់ថ្ងៃនៃសប្តាហ៍ជាភាសាខ្មែរ',
            code: `public class Main {
    public static void main(String[] args) {
        int dayOfWeek = 3;
        String dayName;
        
        switch (dayOfWeek) {
            case 1:
                dayName = "ថ្ងៃច័ន្ទ";
                break;
            case 2:
                dayName = "ថ្ងៃអង្គារ";
                break;
            case 3:
                dayName = "ថ្ងៃពុធ";
                break;
            case 4:
                dayName = "ថ្ងៃព្រហស្បតិ៍";
                break;
            case 5:
                dayName = "ថ្ងៃសុក្រ";
                break;
            case 6:
                dayName = "ថ្ងៃសៅរ៍";
                break;
            case 7:
                dayName = "ថ្ងៃអាទិត្យ";
                break;
            default:
                dayName = "ថ្ងៃមិនត្រឹមត្រូវ";
        }
        
        System.out.println("ថ្ងៃទី " + dayOfWeek + " គឺ: " + dayName);
    }
}`,
            explanationKm: 'Switch ពិនិត្យតម្លៃនៃ dayOfWeek ហើយលោតទៅកាន់ case 3 ដោយផ្ទាល់ រួចឈប់ដោយពាក្យ break។',
            explanationEn: 'Matches dayOfWeek directly to case 3 and exits using break.',
            expectedOutput: 'ថ្ងៃទី 3 គឺ: ថ្ងៃពុធ',
          },
        ],
        commonMistakes: [
          {
            titleKm: 'ភ្លេចពាក្យគន្លឹះ break;',
            titleEn: 'Missing break statement',
            badCode: 'case 1: System.out.println("A");\ncase 2: System.out.println("B");',
            goodCode: 'case 1: System.out.println("A"); break;\ncase 2: System.out.println("B"); break;',
            explanationKm: 'ប្រសិនបើគ្មាន break កម្មវិធីនឹងរត់កូដ case បន្ទាប់ទៀតទោះបីលក្ខខណ្ឌមិនត្រូវក៏ដោយ។',
            explanationEn: 'Missing break causes fall-through into following cases.',
          },
        ],
        quizzes: [
          {
            id: 'q-sw-1',
            questionKm: 'តើប្លុកមួយណាដែលនឹងដំណើរការប្រសិនបើគ្មាន case ណាផ្ទៀងផ្ទាត់ត្រូវ?',
            questionEn: 'Which block executes when no case matches?',
            optionsKm: ['default', 'else', 'finally', 'catch'],
            optionsEn: ['default', 'else', 'finally', 'catch'],
            correctOptionIndex: 0,
            explanationKm: 'ប្លុក default ដំណើរការនៅពេលដែលគ្មានករណី case ណាមួយផ្គូផ្គងនឹងតម្លៃនៃ switch ឡើយ។',
            explanationEn: 'The default keyword specifies code to run if there is no case match.',
          },
        ],
      },
    ],
  },
  {
    id: 'mod-4',
    slug: 'loops-arrays',
    titleKm: '៤. រង្វិលជុំ និងអារេ (Loops & Arrays)',
    titleEn: '4. Loops & Arrays',
    descriptionKm: 'ធ្វើស្វ័យប្រវត្តិកម្មកិច្ចការដដែលៗជាមួយ While, Do-While, For Loops, For-Each និងការគ្រប់គ្រង Array។',
    descriptionEn: 'Automate repetitive tasks with loops (while, for, for-each) and master arrays.',
    icon: 'Repeat',
    level: 'beginner',
    lessons: [
      {
        id: 'java-for-loop',
        slug: 'java-for-loop',
        moduleSlug: 'loops-arrays',
        order: 1,
        titleKm: 'រង្វិលជុំ For Loop និង For-Each (Java For Loop)',
        titleEn: 'Java For Loop',
        difficulty: 'beginner',
        estimatedMinutes: 20,
        objectivesKm: [
          'ចេះប្រើ Standard For Loop ជាមួយ Initialization, Condition, Increment',
          'ចេះប្រើ Enhanced For Loop (For-Each) សម្រាប់អានទិន្នន័យពី Array',
          'យល់ពី Break និង Continue ក្នុង Loop',
        ],
        objectivesEn: [
          'Use standard for loops',
          'Use enhanced for-each loops',
          'Understand break and continue in loops',
        ],
        summaryKm: 'នៅពេលដែលអ្នកដឹងច្បាស់ពីចំនួនដងដែលត្រូវធ្វើការដដែលៗ For Loop គឺជាជម្រើសដ៏ល្អបំផុត។',
        summaryEn: 'For loop executes a block of code a specific number of times.',
        contentKm: `### ទម្រង់នៃ For Loop
\`\`\`java
for (initialization; condition; increment/decrement) {
    // កូដដែលត្រូវរត់ដដែលៗ
}
\`\`\`
1. **initialization:** កំណត់តម្លៃចាប់ផ្តើម (ដំណើរការតែម្តងគត់នៅដើមទី)
2. **condition:** លក្ខខណ្ឌត្រួតពិនិត្យមុនពេលរត់ម្តងៗ
3. **increment:** បង្កើន ឬបន្ថយតម្លៃបន្ទាប់ពីរត់ចប់មួយជុំ`,
        contentEn: `Learn standard for loops, nested loops, and enhanced for-each loops for arrays.`,
        w3schoolsUrl: 'https://www.w3schools.com/java/java_for_loop.asp',
        examples: [
          {
            title: 'ការគណនាផលបូកពីលេខ ១ ដល់ ១០',
            code: `public class Main {
    public static void main(String[] args) {
        int sum = 0;
        
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        
        System.out.println("ផលបូកពីលេខ ១ ដល់ ១០ គឺ: " + sum);
    }
}`,
            explanationKm: 'Loop ចាប់ផ្តើមពី i = 1 រហូតដល់ 10 ដោយបូកបញ្ចូលតម្លៃ i ទៅក្នុងអថេរ sum រាល់ជុំ។',
            explanationEn: 'Accumulates sum of numbers from 1 to 10 iteratively.',
            expectedOutput: 'ផលបូកពីលេខ ១ ដល់ ១០ គឺ: 55',
          },
        ],
        commonMistakes: [
          {
            titleKm: 'រង្វិលជុំមិនចេះចប់ (Infinite Loop)',
            titleEn: 'Infinite Loop due to wrong condition',
            badCode: 'for (int i = 0; i >= 0; i++) { ... } // Never stops!',
            goodCode: 'for (int i = 0; i < 10; i++) { ... }',
            explanationKm: 'ត្រូវប្រាកដថាលក្ខខណ្ឌនឹងក្លាយជា false នៅចំណុចណាមួយ បើពុំនោះទេកម្មវិធីនឹងគាំង (Hang)។',
            explanationEn: 'Ensure loop counter progresses toward termination condition.',
          },
        ],
        quizzes: [
          {
            id: 'q-loop-1',
            questionKm: 'តើពាក្យគន្លឹះមួយណាប្រើដើម្បីរំលងជុំបច្ចុប្បន្ន ហើយបន្តទៅជុំបន្ទាប់ភ្លាមៗ?',
            questionEn: 'Which keyword skips the current iteration and jumps to the next?',
            optionsKm: ['continue', 'break', 'return', 'skip'],
            optionsEn: ['continue', 'break', 'return', 'skip'],
            correctOptionIndex: 0,
            explanationKm: 'continue រំលងកូដដែលនៅសល់ក្នុងជុំបច្ចុប្បន្ន ហើយបន្តទៅជុំបន្ទាប់ភ្លាមៗ។',
            explanationEn: 'The continue statement breaks one iteration in the loop.',
          },
        ],
      },
      {
        id: 'java-arrays',
        slug: 'java-arrays',
        moduleSlug: 'loops-arrays',
        order: 2,
        titleKm: 'អារេក្នុង Java (Java Arrays)',
        titleEn: 'Java Arrays',
        difficulty: 'beginner',
        estimatedMinutes: 25,
        objectivesKm: [
          'យល់ពីគំនិតនៃ Array និង Zero-based Indexing',
          'ចេះប្រកាស បង្កើត និងចូលប្រើប្រាស់ធាតុក្នុង Array',
          'ចេះប្រើប្រាស់ \`.length\` និង For-Each Loop ជាមួយ Array',
        ],
        objectivesEn: [
          'Understand zero-based indexing in arrays',
          'Declare, initialize, and access elements',
          'Use .length and enhanced for-each loops',
        ],
        summaryKm: 'Array គឺជាសំណុំផ្ទុកតម្លៃច្រើនដែលមានប្រភេទ Data Type ដូចគ្នា និងមានទំហំថេរកំណត់តាំងពីពេលបង្កើត។',
        summaryEn: 'Arrays store multiple values of the same type in a single variable with fixed length.',
        contentKm: `### លក្ខណៈសម្បត្តិសំខាន់នៃ Array
- ចាប់ផ្តើមរាប់ Index ពីលេខ **0**
- ទំហំរបស់ Array គឺ **Fixed** (មិនអាចពង្រីក ឬបង្រួញក្រោយពេលបង្កើតរួចឡើយ)
- ប្រើ \`array.length\` ដើម្បីដឹងពីចំនួនធាតុសរុប`,
        contentEn: `Arrays hold multiple fixed elements. Indexing starts at 0.`,
        w3schoolsUrl: 'https://www.w3schools.com/java/java_arrays.asp',
        examples: [
          {
            title: 'ការគណនាពិន្ទុមធ្យមភាគពី Array',
            code: `public class Main {
    public static void main(String[] args) {
        // ប្រកាស និងដាក់តម្លៃឱ្យ Array
        double[] testScores = { 85.5, 92.0, 78.5, 90.0, 88.0 };
        
        double total = 0;
        
        // ប្រើ For-Each Loop
        for (double score : testScores) {
            total += score;
        }
        
        double average = total / testScores.length;
        
        System.out.println("ចំនួនតេស្តសរុប: " + testScores.length);
        System.out.println("ពិន្ទុសរុប: " + total);
        System.out.println("មធ្យមភាគពិន្ទុ: " + average);
    }
}`,
            explanationKm: 'ប្រើ For-Each Loop ដើម្បីបូកសរុបពិន្ទុទាំងអស់ ហើយចែកនឹងប្រវែង array (.length) ដើម្បីរកមធ្យមភាគ។',
            explanationEn: 'Iterating through array using for-each to calculate average score.',
            expectedOutput: `ចំនួនតេស្តសរុប: 5
ពិន្ទុសរុប: 434.0
មធ្យមភាគពិន្ទុ: 86.8`,
          },
        ],
        commonMistakes: [
          {
            titleKm: 'ArrayIndexOutOfBoundsException (ហៅលើសទំហំ Array)',
            titleEn: 'ArrayIndexOutOfBoundsException',
            badCode: 'int[] arr = new int[5];\nSystem.out.println(arr[5]); // Error!',
            goodCode: 'int[] arr = new int[5];\nSystem.out.println(arr[4]); // Maximum index is 4',
            explanationKm: 'Array ដែលមានទំហំ 5 មាន Index ចាប់ពី 0 ដល់ 4។ ការហៅ arr[5] នឹងបណ្តាលឱ្យកើតកំហុស ArrayIndexOutOfBoundsException។',
            explanationEn: 'Array indices range from 0 to length - 1. Accessing index 5 on length 5 throws exception.',
          },
        ],
        quizzes: [
          {
            id: 'q-arr-1',
            questionKm: 'ប្រសិនបើ Array មានធាតុ 10 តើ Index ចុងក្រោយបង្អស់របស់វាគឺលេខប៉ុន្មាន?',
            questionEn: 'If an array has 10 elements, what is the last index?',
            optionsKm: ['9', '10', '11', '8'],
            optionsEn: ['9', '10', '11', '8'],
            correctOptionIndex: 0,
            explanationKm: 'ដោយសារ Java ចាប់ផ្តើមរាប់ពី 0 ដូច្នេះធាតុចុងក្រោយគឺ `length - 1` ពោលគឺ 9។',
            explanationEn: 'Arrays are zero-indexed, so the last element is at length - 1 (10 - 1 = 9).',
          },
        ],
      },
    ],
  },
  {
    id: 'mod-5',
    slug: 'methods',
    titleKm: '៥. វិធីសាស្ត្រ និងអនុគមន៍ (Java Methods)',
    titleEn: '5. Java Methods',
    descriptionKm: 'ការបំបែកកូដជាចំណែកតូចៗងាយស្រួលគ្រប់គ្រងជាមួយ Parameters, Return Values, Overloading និង Scope។',
    descriptionEn: 'Modularize code using parameters, return types, method overloading, and variable scope.',
    icon: 'Layers',
    level: 'beginner',
    lessons: [
      {
        id: 'java-methods',
        slug: 'java-methods',
        moduleSlug: 'methods',
        order: 1,
        titleKm: 'សេចក្តីផ្តើមអំពី Methods (Java Methods)',
        titleEn: 'Java Methods',
        difficulty: 'beginner',
        estimatedMinutes: 20,
        objectivesKm: [
          'យល់ពីសារៈសំខាន់នៃ Method ក្នុងការកាត់បន្ថយកូដដដែលៗ (DRY: Don\'t Repeat Yourself)',
          'ចេះបង្កើត Method ដែលមាន Parameters និង Return Value',
          'ចេះហៅ Method មកប្រើប្រាស់',
        ],
        objectivesEn: [
          'Understand DRY principle with methods',
          'Define methods with parameters and return types',
          'Call methods correctly',
        ],
        summaryKm: 'Method គឺជាប្លុកកូដដែលមានឈ្មោះ និងដំណើរការតែនៅពេលដែលត្រូវបានហៅប៉ុណ្ណោះ។ Method អាចទទួលទិន្នន័យ (Parameters) និងបញ្ជូនទិន្នន័យត្រឡប់មកវិញ (Return)។',
        summaryEn: 'A method is a reusable block of code that runs when called. It can take parameters and return data.',
        contentKm: `### ទម្រង់នៃការប្រកាស Method
\`\`\`java
modifier returnType methodName(parameter1, parameter2) {
    // កូដបំពេញភារកិច្ច
    return value; // បើ returnType មិនមែនជា void
}
\`\`\`

### គោលការណ៍ DRY (Don't Repeat Yourself)
ជំនួសឱ្យការចម្លងកូដដដែលៗ ៥ ដង អ្នកគ្រាន់តែសរសេរ Method មួយ ហើយហៅវាប្រើប្រាស់ ៥ ដងជាការស្រេច។`,
        contentEn: `Learn to declare and invoke methods with parameters and return values.`,
        w3schoolsUrl: 'https://www.w3schools.com/java/java_methods.asp',
        examples: [
          {
            title: 'Method គណនាផ្ទៃក្រឡាចតុកោណកែង',
            code: `public class Main {
    // Method ទទួលយកបណ្តោយ និងទទឹង រួច return ផ្ទៃក្រឡា
    public static double calculateArea(double width, double height) {
        return width * height;
    }
    
    // Method បង្ហាញពាក្យស្វាគមន៍ (void: មិន return តម្លៃ)
    public static void greetUser(String name) {
        System.out.println("សួស្តី " + name + "! រីករាយដែលបានជួបអ្នក។");
    }

    public static void main(String[] args) {
        greetUser("វិចិត្រ");
        
        double area1 = calculateArea(5.0, 4.0);
        double area2 = calculateArea(12.5, 3.0);
        
        System.out.println("ផ្ទៃក្រឡាទី ១: " + area1 + " ម៉ែត្រការ៉េ");
        System.out.println("ផ្ទៃក្រឡាទី ២: " + area2 + " ម៉ែត្រការ៉េ");
    }
}`,
            explanationKm: 'calculateArea ទទួល arguments ចំនួនពីរ និង return ផលគុណជា double។ greetUser គ្រាន់តែ print ចេញមកក្រៅ។',
            explanationEn: 'calculateArea accepts two arguments and returns area; greetUser prints a greeting.',
            expectedOutput: `សួស្តី វិចិត្រ! រីករាយដែលបានជួបអ្នក។
ផ្ទៃក្រឡាទី ១: 20.0 ម៉ែត្រការ៉េ
ផ្ទៃក្រឡាទី ២: 37.5 ម៉ែត្រការ៉េ`,
          },
        ],
        commonMistakes: [
          {
            titleKm: 'Method មាន returnType ប៉ុន្តែភ្លេចដាក់ពាក្យ return',
            titleEn: 'Missing return statement',
            badCode: 'public static int add(int a, int b) {\n    int sum = a + b;\n    // Missing return!\n}',
            goodCode: 'public static int add(int a, int b) {\n    return a + b;\n}',
            explanationKm: 'ប្រសិនបើ Method មិនមែនជា void ទេ អ្នកត្រូវតែមាន statement return តម្លៃប្រភេទនោះជានិច្ច។',
            explanationEn: 'Non-void methods must return a matching value along all execution paths.',
          },
        ],
        quizzes: [
          {
            id: 'q-meth-1',
            questionKm: 'តើអ្វីទៅជាភាពខុសគ្នារវាង Parameter និង Argument?',
            questionEn: 'What is the difference between a parameter and an argument?',
            optionsKm: [
              'Parameter គឺអថេរក្នុង Method Declaration រីឯ Argument គឺតម្លៃពិតដែលបញ្ជូនពេលហៅ',
              'ដូចគ្នាបេះបិទគ្មានខុសគ្នាទេ',
              'Argument ជាប្រភេទកូដ Error',
              'Parameter ប្រើតែលើលេខគត់ប៉ុណ្ណោះ',
            ],
            optionsEn: [
              'Parameter is the declared variable in method signature; argument is actual value passed',
              'They are completely identical',
              'Argument is a compile error',
              'Parameter is only used for integers',
            ],
            correctOptionIndex: 0,
            explanationKm: 'Parameter គឺជាអថេរដែលកំណត់ក្នុង Method Signature រីឯ Argument គឺជាតម្លៃជាក់ស្តែងដែលយើងបញ្ជូននៅពេលហៅ Method។',
            explanationEn: 'Parameters are defined in method signature; arguments are values passed in.',
          },
        ],
      },
    ],
  },
  {
    id: 'mod-6',
    slug: 'oop-concepts',
    titleKm: '៦. កម្មវិធីតម្រង់ទិសវត្ថុ (OOP Masterclass)',
    titleEn: '6. Object-Oriented Programming (OOP)',
    descriptionKm: 'ជំនាញស្នូលរបស់ Java: Classes, Objects, Constructors, Encapsulation, Inheritance, Polymorphism, Abstraction & Interfaces។',
    descriptionEn: 'The core heart of Java: Classes, Objects, Constructors, Encapsulation, Inheritance, Polymorphism, and Interfaces.',
    icon: 'Boxes',
    level: 'intermediate',
    lessons: [
      {
        id: 'java-classes-objects',
        slug: 'java-classes-objects',
        moduleSlug: 'oop-concepts',
        order: 1,
        titleKm: 'Class និង Object (Classes and Objects)',
        titleEn: 'Java Classes and Objects',
        difficulty: 'intermediate',
        estimatedMinutes: 25,
        objectivesKm: [
          'យល់ពីគំនិត Class ដូចជាប្លង់មេ (Blueprint) និង Object ដូចជាវត្ថុជាក់ស្តែង',
          'ចេះប្រើប្រាស់ពាក្យគន្លឹះ \`new\` ដើម្បីបង្កើត Object',
          'ចេះកំណត់ Field (Attributes) និង Method ក្នុង Class',
        ],
        objectivesEn: [
          'Understand class as blueprint and object as instance',
          'Use the `new` keyword to instantiate objects',
          'Define fields and methods inside classes',
        ],
        summaryKm: 'Java គឺជាភាសា OOP។ គ្រប់យ៉ាងក្នុង Java សុទ្ធតែទាក់ទងនឹង Class និង Object រួមទាំង Attributes (លក្ខណៈសម្បត្តិ) និង Methods (សកម្មភាព)។',
        summaryEn: 'Everything in Java is associated with classes and objects, along with attributes and behaviors.',
        contentKm: `### ការប្រៀបធៀប Class និង Object ក្នុងជីវិតពិត
- **Class (ប្លង់មេ):** ដូចជាប្លង់ស្ថាបត្យកម្មនៃឡានមួយគ្រឿង។ ប្លង់កំណត់ថាឡានត្រូវតែមានពណ៌ កម្លាំងសេះ និងល្បឿនអតិបរមា។
- **Object (វត្ថុពិត):** ដូចជាឡានជាក់ស្តែងដែលផលិតចេញពីប្លង់នោះ (ឧ. ឡានតូយ៉ូតា ពណ៌ក្រហម, ឡានហុងដា ពណ៌ខ្មៅ)។

### សមាសធាតុសំខាន់ពីររបស់ Class
1. **Fields / Attributes (State):** ទិន្នន័យដែល Object ផ្ទុក (ឧ. \`name\`, \`price\`)
2. **Methods (Behavior):** សកម្មភាពដែល Object អាចធ្វើបាន (ឧ. \`drive()\`, \`brake()\`)`,
        contentEn: `Class is a template for objects; object is an instance of a class. Learn instantiation with new.`,
        w3schoolsUrl: 'https://www.w3schools.com/java/java_classes.asp',
        examples: [
          {
            title: 'ការបង្កើត Class ឡាន (Car Class)',
            code: `class Car {
    // Attributes
    String brand;
    String color;
    int year;
    
    // Method
    void displayInfo() {
        System.out.println("ម៉ាកឡាន: " + brand + " | ពណ៌: " + color + " | ឆ្នាំផលិត: " + year);
    }
}

public class Main {
    public static void main(String[] args) {
        // បង្កើត Object ទីមួយ
        Car car1 = new Car();
        car1.brand = "Toyota Prius";
        car1.color = "ពណ៌ស";
        car1.year = 2022;
        
        // បង្កើត Object ទីពីរ
        Car car2 = new Car();
        car2.brand = "Ford Ranger";
        car2.color = "ពណ៌ខ្មៅ";
        car2.year = 2024;
        
        // ហៅ Method
        car1.displayInfo();
        car2.displayInfo();
    }
}`,
            explanationKm: 'យើងបង្កើត Class Car មួយ ហើយប្រើ new Car() ដើម្បីបង្កើត Object ពីរដាច់ដោយឡែកពីគ្នា ដែលមានតម្លៃ attribute រៀងៗខ្លួន។',
            explanationEn: 'Instantiates two separate Car objects with their own individual attribute values.',
            expectedOutput: `ម៉ាកឡាន: Toyota Prius | ពណ៌: ពណ៌ស | ឆ្នាំផលិត: 2022
ម៉ាកឡាន: Ford Ranger | ពណ៌: ពណ៌ខ្មៅ | ឆ្នាំផលិត: 2024`,
          },
        ],
        commonMistakes: [
          {
            titleKm: 'NullPointerException នៅពេលភ្លេចប្រើ new',
            titleEn: 'NullPointerException from uninitialized object',
            badCode: 'Car myCar; // myCar is null!\nmyCar.brand = "Toyota"; // Crashes with NullPointerException',
            goodCode: 'Car myCar = new Car(); // Object created in memory\nmyCar.brand = "Toyota"; // Works!',
            explanationKm: 'ការគ្រាន់តែប្រកាសឈ្មោះ Variable មិនទាន់បង្កើត Object ក្នុង Memory ឡើយ។ ត្រូវតែប្រើពាក្យ `new` ជានិច្ច។',
            explanationEn: 'Declaring reference does not allocate memory; new Car() is required to instantiate.',
          },
        ],
        quizzes: [
          {
            id: 'q-oop-1',
            questionKm: 'តើពាក្យគន្លឹះមួយណាដែលត្រូវបានប្រើដើម្បីបង្កើត Object ថ្មីក្នុង Java?',
            questionEn: 'Which keyword is used to create a new object in Java?',
            optionsKm: ['new', 'create', 'make', 'instanceOf'],
            optionsEn: ['new', 'create', 'make', 'instanceOf'],
            correctOptionIndex: 0,
            explanationKm: 'ពាក្យគន្លឹះ `new` ត្រូវបានប្រើដើម្បីបម្រុងទុកអង្គចងចាំ (Allocate memory) សម្រាប់ Object ថ្មី។',
            explanationEn: 'The new keyword instantiates a class by allocating memory for a new object.',
          },
        ],
      },
      {
        id: 'java-encapsulation',
        slug: 'java-encapsulation',
        moduleSlug: 'oop-concepts',
        order: 2,
        titleKm: 'ការវេចខ្ចប់ទិន្នន័យ (Encapsulation & Getters/Setters)',
        titleEn: 'Java Encapsulation',
        difficulty: 'intermediate',
        estimatedMinutes: 25,
        objectivesKm: [
          'យល់ពីគោលការណ៍ Encapsulation (សសរទ្រូងទីមួយនៃ OOP)',
          'ចេះប្រើប្រាស់ Access Modifier \`private\` ដើម្បីការពារទិន្នន័យរសើប',
          'ចេះបង្កើត Getter និង Setter methods ជាមួយ Validation',
        ],
        objectivesEn: [
          'Understand encapsulation as first OOP pillar',
          'Use private access modifier for data protection',
          'Write getters and setters with validation rules',
        ],
        summaryKm: 'Encapsulation គឺជាការវេចខ្ចប់ទិន្នន័យ (Fields) ឱ្យនៅជាសម្ងាត់ (private) និងអនុញ្ញាតឱ្យចូលប្រើប្រាស់បានតាមរយៈ Getter និង Setter methods ប៉ុណ្ណោះ ដើម្បីធានាសុវត្ថិភាព និងភាពត្រឹមត្រូវនៃទិន្នន័យ។',
        summaryEn: 'Encapsulation wraps data inside classes, hiding sensitive variables with private and providing controlled access via getters and setters.',
        contentKm: `### ហេតុអ្វីបានជាត្រូវប្រើ Encapsulation?
ស្រមៃមើលគណនីធនាគារមួយ ប្រសិនបើអ្នកណាក៏អាចផ្លាស់ប្តូរ \`accountBalance = -9999999;\` បានដោយផ្ទាល់ នោះប្រព័ន្ធនឹងមានបញ្ហាធ្ងន់ធ្ងរ!
តាមរយៈ Encapsulation:
1. យើងដាក់ \`private double balance;\`
2. យើងបង្កើត \`deposit(double amount)\` ដោយពិនិត្យមើលថា \`amount > 0\` ទើបឱ្យបូកចូល
3. យើងបង្កើត \`withdraw(double amount)\` ដោយពិនិត្យមើលថា \`amount <= balance\` ទើបឱ្យដក`,
        contentEn: `Learn data hiding, access protection, and data validation using getters and setters.`,
        w3schoolsUrl: 'https://www.w3schools.com/java/java_encapsulation.asp',
        examples: [
          {
            title: 'ការការពារសមតុល្យគណនីធនាគារ (BankAccount)',
            code: `class BankAccount {
    // ដាក់ជា private ដើម្បីកុំឱ្យកែប្រែពីខាងក្រៅដោយគ្មានការអនុញ្ញាត
    private String accountNumber;
    private double balance;
    
    // Constructor
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = (initialBalance >= 0) ? initialBalance : 0;
    }
    
    // Getter
    public double getBalance() {
        return this.balance;
    }
    
    // Setter / Deposit with validation
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
            System.out.println("ដាក់ប្រាក់ជោគជ័យ: +" + amount + "$");
        } else {
            System.out.println("ចំនួនប្រាក់មិនត្រឹមត្រូវ!");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("ABA-102938", 500.0);
        
        System.out.println("សមតុល្យដំបូង: " + account.getBalance() + "$");
        account.deposit(250.0);
        account.deposit(-50.0); // នឹងត្រូវរារាំង
        System.out.println("សមតុល្យបច្ចុប្បន្ន: " + account.getBalance() + "$");
    }
}`,
            explanationKm: 'balance ត្រូវបានការពារដោយ modifier private។ ការដាក់ប្រាក់ត្រូវបានត្រួតពិនិត្យ validation យ៉ាងតឹងរ៉ឹង។',
            explanationEn: 'Balance is private and can only be mutated through deposit with validation.',
            expectedOutput: `សមតុល្យដំបូង: 500.0$
ដាក់ប្រាក់ជោគជ័យ: +250.0$
ចំនួនប្រាក់មិនត្រឹមត្រូវ!
សមតុល្យបច្ចុប្បន្ន: 750.0$`,
          },
        ],
        commonMistakes: [
          {
            titleKm: 'ដាក់ Fields ទាំងអស់ជា public ដោយគ្មានការការពារ',
            titleEn: 'Exposing fields directly as public',
            badCode: 'class User {\n    public String password;\n}',
            goodCode: 'class User {\n    private String password;\n    public void setPassword(String p) { ... }\n}',
            explanationKm: 'ការដាក់ public ធ្វើឱ្យទិន្នន័យងាយស្រួលនឹងត្រូវកែប្រែខូច ឬគ្មានសុវត្ថិភាព។ គួរដាក់ private ជានិច្ច។',
            explanationEn: 'Public fields break encapsulation and allow invalid mutations.',
          },
        ],
        quizzes: [
          {
            id: 'q-enc-1',
            questionKm: 'តើ Access Modifier មួយណាដែលលាក់ Field មិនឱ្យ Class ផ្សេងមើលឃើញ ឬកែប្រែបាន?',
            questionEn: 'Which access modifier restricts visibility strictly to within the same class?',
            optionsKm: ['private', 'public', 'protected', 'default'],
            optionsEn: ['private', 'public', 'protected', 'default'],
            correctOptionIndex: 0,
            explanationKm: 'private ធ្វើឱ្យអថេរ ឬ method អាចមើលឃើញ និងប្រើប្រាស់បានតែក្នុង Class ផ្ទាល់ខ្លួនប៉ុណ្ណោះ។',
            explanationEn: 'private restricts access exclusively to within the declaring class.',
          },
        ],
      },
      {
        id: 'java-inheritance-polymorphism',
        slug: 'java-inheritance-polymorphism',
        moduleSlug: 'oop-concepts',
        order: 3,
        titleKm: 'ការស្នងមរតក និងពហុរូប (Inheritance & Polymorphism)',
        titleEn: 'Java Inheritance & Polymorphism',
        difficulty: 'intermediate',
        estimatedMinutes: 30,
        objectivesKm: [
          'ចេះប្រើប្រាស់ពាក្យគន្លឹះ \`extends\` ដើម្បីធ្វើ Inheritance',
          'យល់ពីតួនាទីរបស់ \`super\` និង \`@Override\`',
          'យល់ពីគំនិតនៃ Polymorphism (ទម្រង់មួយ សកម្មភាពច្រើន)',
        ],
        objectivesEn: [
          'Use the extends keyword for inheritance',
          'Understand super and @Override',
          'Master runtime polymorphism',
        ],
        summaryKm: 'Inheritance អនុញ្ញាតឱ្យ Subclass ទទួលមរតកនូវ Fields និង Methods ពី Superclass រីឯ Polymorphism អនុញ្ញាតឱ្យ Subclass អាច Override កែច្នៃការអនុវត្ត Method នោះទៅតាមលក្ខណៈពិសេសរបស់ខ្លួន។',
        summaryEn: 'Inheritance lets child classes inherit features from parent classes; polymorphism enables one interface to have multiple implementations.',
        contentKm: `### ១. Inheritance (ការស្នងមរតក)
ប្រើពាក្យគន្លឹះ \`extends\` ឧទាហរណ៍៖ \`class Dog extends Animal\`
- **Superclass (Parent):** ថ្នាក់មេ (ផ្ទុកកូដរួម)
- **Subclass (Child):** ថ្នាក់កូន (ស្នងយកកូដទាំងអស់ពីថ្នាក់មេ)

### ២. Polymorphism (ពហុរូប)
មានន័យថា "ទម្រង់ច្រើន" (Many forms)។ បើទោះបីជាសត្វឆ្កែ និងសត្វឆ្មាសុទ្ធតែជា "Animal" ក៏ដោយ នៅពេលដែលយើងហៅ Method \`makeSound()\`៖
- ឆ្កែនឹងព្រុស "វូសៗ!"
- ឆ្មាវាស្រែក "ម៉្យាវៗ!"`,
        contentEn: `Inheritance reuses parent class code with extends; polymorphism overrides behavior dynamically.`,
        w3schoolsUrl: 'https://www.w3schools.com/java/java_inheritance.asp',
        examples: [
          {
            title: 'ប្រព័ន្ធឋានានុក្រមសត្វ (Animal Hierarchy)',
            code: `class Animal {
    String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void makeSound() {
        System.out.println(name + " បន្លឺសំឡេងធម្មតា");
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name); // ហៅ Constructor របស់ Parent
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " ព្រុស: វូសៗ! (Woof Woof)");
    }
}

class Cat extends Animal {
    public Cat(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " ស្រែក: ម៉្យាវៗ! (Meow)");
    }
}

public class Main {
    public static void main(String[] args) {
        // Polymorphism: ប្រភេទ Animal សំដៅទៅ Object កូនផ្សេងៗគ្នា
        Animal a1 = new Dog("គីគី");
        Animal a2 = new Cat("មីមី");
        
        a1.makeSound();
        a2.makeSound();
    }
}`,
            explanationKm: 'a1 និង a2 សុទ្ធតែជា Reference ប្រភេទ Animal ប៉ុន្តែនៅពេលហៅ makeSound() Java នឹងជ្រើសរើស Method ជាក់ស្តែងរបស់ Object នោះ (Dynamic Method Dispatch)។',
            explanationEn: 'Demonstrates runtime polymorphism using superclass references to subclass instances.',
            expectedOutput: `គីគី ព្រុស: វូសៗ! (Woof Woof)
មីមី ស្រែក: ម៉្យាវៗ! (Meow)`,
          },
        ],
        commonMistakes: [
          {
            titleKm: 'ភ្លេចហៅ super() នៅពេល Parent Constructor មាន Parameters',
            titleEn: 'Missing super() call in subclass constructor',
            badCode: 'class Dog extends Animal {\n    public Dog(String name) {\n        // Error: Parent constructor requires name!\n    }\n}',
            goodCode: 'class Dog extends Animal {\n    public Dog(String name) {\n        super(name);\n    }\n}',
            explanationKm: 'ប្រសិនបើ Parent Class គ្មាន No-arg Constructor ទេ Subclass ត្រូវតែហៅ `super(args)` នៅជួរដំបូងបង្អស់នៃ Constructor របស់ខ្លួន។',
            explanationEn: 'Subclass constructors must call super(args) explicitly if parent lacks default no-arg constructor.',
          },
        ],
        quizzes: [
          {
            id: 'q-inh-1',
            questionKm: 'តើពាក្យគន្លឹះមួយណាដែលត្រូវបានប្រើដើម្បីស្នងមរតក Class មួយពី Class មួយទៀតក្នុង Java?',
            questionEn: 'Which keyword is used to inherit a class in Java?',
            optionsKm: ['extends', 'implements', 'inherits', 'super'],
            optionsEn: ['extends', 'implements', 'inherits', 'super'],
            correctOptionIndex: 0,
            explanationKm: 'ពាក្យគន្លឹះ `extends` ត្រូវបានប្រើសម្រាប់ Inheritance រវាង Class និង Class។',
            explanationEn: 'The extends keyword is used to extend a class in Java.',
          },
        ],
      },
    ],
  },
  {
    id: 'mod-7',
    slug: 'advanced-collections',
    titleKm: '៧. បណ្តុំទិន្នន័យ និងកម្រិតខ្ពស់ (Collections & Advanced)',
    titleEn: '7. Collections & Advanced Java',
    descriptionKm: 'ជំនាញធ្វើការលើទិន្នន័យជាក់ស្តែងជាមួយ ArrayList, HashMap, Exception Handling, Lambdas និង Files។',
    descriptionEn: 'Master practical data structures: ArrayList, HashMap, Exception handling, Lambdas, and File I/O.',
    icon: 'Database',
    level: 'advanced',
    lessons: [
      {
        id: 'java-arraylist',
        slug: 'java-arraylist',
        moduleSlug: 'advanced-collections',
        order: 1,
        titleKm: 'ការប្រើប្រាស់ ArrayList (Java ArrayList)',
        titleEn: 'Java ArrayList',
        difficulty: 'intermediate',
        estimatedMinutes: 25,
        objectivesKm: [
          'យល់ពីភាពខុសគ្នារវាង Array ទំហំថេរ និង ArrayList ទំហំឌីណាមិក',
          'ចេះប្រើប្រាស់ Method សំខាន់ៗ: add(), get(), set(), remove(), size(), clear()',
          'ចេះប្រើប្រាស់ Generic Types ដូចជា ArrayList<String>',
        ],
        objectivesEn: [
          'Understand difference between static array and dynamic ArrayList',
          'Use add(), get(), set(), remove(), size() methods',
          'Use Generics like ArrayList<String>',
        ],
        summaryKm: 'ArrayList គឺជា Resizable Array ដែលអាចពង្រីក ឬបង្រួញទំហំដោយស្វ័យប្រវត្តនៅពេលដែលយើងបន្ថែម ឬលុបធាតុ។',
        summaryEn: 'ArrayList is a resizable array implementation found in java.util package.',
        contentKm: `### ហេតុអ្វីត្រូវប្រើ ArrayList ជំនួស Array ធម្មតា?
1. **Dynamic Size:** Array ធម្មតាត្រូវកំណត់ទំហំជាមុន (ឧ. 10 ធាតុ) ហើយមិនអាចថែមទៀតបានទេ។ ArrayList អាចបន្ថែមធាតុបានឥតកំណត់។
2. **Built-in Methods:** មាន Method ស្រាប់ៗជាច្រើនដូចជា \`add()\`, \`remove()\`, \`contains()\`, \`indexOf()\`។
3. **Generics (<T>):** ធានាថានឹងផ្ទុកតែទិន្នន័យប្រភេទដែលចង់បាន។`,
        contentEn: `ArrayList grows and shrinks dynamically. Part of Java Collections Framework.`,
        w3schoolsUrl: 'https://www.w3schools.com/java/java_arraylist.asp',
        examples: [
          {
            title: 'ការគ្រប់គ្រងបញ្ជីឈ្មោះនិស្សិតជាមួយ ArrayList',
            code: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        // បង្កើត ArrayList ផ្ទុក String
        ArrayList<String> students = new ArrayList<>();
        
        // បន្ថែមធាតុ (add)
        students.add("សុខា");
        students.add("ធារ៉ា");
        students.add("បុប្ផា");
        
        System.out.println("ចំនួនសិស្ស: " + students.size());
        System.out.println("សិស្សទីមួយ: " + students.get(0));
        
        // កែប្រែធាតុ (set)
        students.set(1, "វ៉ាន់ដា");
        
        // លុបធាតុ (remove)
        students.remove("បុប្ផា");
        
        System.out.println("=== បញ្ជីសិស្សបច្ចុប្បន្ន ===");
        for (String s : students) {
            System.out.println("- " + s);
        }
    }
}`,
            explanationKm: 'ឧទាហរណ៍នេះបង្ហាញពីរបៀបប្រើ add(), get(), set(), remove(), និង size() លើ ArrayList។',
            explanationEn: 'Demonstrates ArrayList operations: adding, accessing, modifying, and iterating.',
            expectedOutput: `ចំនួនសិស្ស: 3
សិស្សទីមួយ: សុខា
=== បញ្ជីសិស្សបច្ចុប្បន្ន ===
- សុខា
- វ៉ាន់ដា`,
          },
        ],
        commonMistakes: [
          {
            titleKm: 'ប្រើ Primitive Types ដោយផ្ទាល់ក្នុង Generic ArrayList<int>',
            titleEn: 'Using primitive types in generics',
            badCode: 'ArrayList<int> list = new ArrayList<>(); // Compile Error!',
            goodCode: 'ArrayList<Integer> list = new ArrayList<>(); // Correct Wrapper Class',
            explanationKm: 'Java Collections មិនអាចផ្ទុក Primitive Types ដោយផ្ទាល់បានទេ។ ត្រូវប្រើ Wrapper Class ដូចជា Integer, Double, Boolean, Character។',
            explanationEn: 'Generics only support reference types. Use Integer instead of int.',
          },
        ],
        quizzes: [
          {
            id: 'q-alist-1',
            questionKm: 'តើ Method មួយណាប្រើដើម្បីដឹងពីចំនួនធាតុសរុបក្នុង ArrayList?',
            questionEn: 'Which method returns the number of elements in an ArrayList?',
            optionsKm: ['size()', 'length()', 'count()', 'capacity()'],
            optionsEn: ['size()', 'length()', 'count()', 'capacity()'],
            correctOptionIndex: 0,
            explanationKm: 'ArrayList ប្រើ method `.size()` រីឯ Array ធម្មតាប្រើ `.length`។',
            explanationEn: 'ArrayList uses the size() method, whereas regular arrays use the .length property.',
          },
        ],
      },
      {
        id: 'java-exceptions',
        slug: 'java-exceptions',
        moduleSlug: 'advanced-collections',
        order: 2,
        titleKm: 'ការគ្រប់គ្រងកំហុស (Exception Handling: Try...Catch)',
        titleEn: 'Java Exceptions (Try...Catch)',
        difficulty: 'intermediate',
        estimatedMinutes: 25,
        objectivesKm: [
          'យល់ពីគំនិតនៃ Exception (កំហុសដែលកើតមានពេលកម្មវិធីកំពុងដំណើរការ Runtime)',
          'ចេះប្រើប្រាស់ \`try\`, \`catch\`, និង \`finally\`',
          'យល់ពីរបៀបការពារកម្មវិធីកុំឱ្យរលត់ ឬគាំង (Crash)',
        ],
        objectivesEn: [
          'Understand runtime exceptions',
          'Use try, catch, and finally blocks',
          'Prevent application crashes with graceful error handling',
        ],
        summaryKm: 'Exception Handling អនុញ្ញាតឱ្យកម្មវិធីអាចទប់ទល់ និងដោះស្រាយបញ្ហាមិនប្រក្រតី (ដូចជាចែកនឹងសូន្យ ហៅហួសទំហំ array ឬរកមិនឃើញ file) ដោយមិនធ្វើឱ្យកម្មវិធីគាំងបិទទាំងស្រុងឡើយ។',
        summaryEn: 'Exceptions disrupt normal application flow. Try-catch blocks handle errors gracefully and keep apps running.',
        contentKm: `### ទម្រង់នៃ Try...Catch...Finally
\`\`\`java
try {
    // ប្លុកកូដដែលអាចនឹងបង្កឱ្យមានកំហុស (Risk of exception)
} catch (ExceptionType e) {
    // ប្លុកកូដសម្រាប់ដោះស្រាយនៅពេលមានកំហុសកើតឡើង
} finally {
    // ប្លុកកូដដែលដំណើរការជានិច្ច មិនថាកំហុសកើតឡើងឬអត់
}
\`\`\`

### Exception ដែលជួបញឹកញាប់
1. **ArithmeticException:** ដូចជាចែកនឹងលេខសូន្យ \`10 / 0\`
2. **NullPointerException:** ហៅ method លើ object ដែលមានតម្លៃ null
3. **ArrayIndexOutOfBoundsException:** ហៅលើសទំហំ array
4. **NumberFormatException:** បំលែងអក្សរដែលមិនមែនជាលេខ \`Integer.parseInt("abc")\``,
        contentEn: `Learn try, catch, finally, throw, and throws to handle errors resiliently in Java.`,
        w3schoolsUrl: 'https://www.w3schools.com/java/java_try_catch.asp',
        examples: [
          {
            title: 'ការទប់ស្កាត់កំហុសនៃការចែកនឹងសូន្យ',
            code: `public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 0;
        
        try {
            System.out.println("កំពុងធ្វើការចែក...");
            int result = a / b;
            System.out.println("លទ្ធផល: " + result);
        } catch (ArithmeticException e) {
            System.err.println("កំហុស: មិនអាចចែកនឹងលេខសូន្យបានឡើយ! (" + e.getMessage() + ")");
        } finally {
            System.out.println("បញ្ចប់ដំណើរការត្រួតពិនិត្យ (finally block ran).");
        }
        
        System.out.println("កម្មវិធីនៅតែដំណើរការបន្តដោយរលូន មិនគាំងឡើយ!");
    }
}`,
            explanationKm: 'នៅពេលមាន ArithmeticException កើតឡើង កូដក្នុង catch នឹងដំណើរការជំនួសឱ្យការគាំងកម្មវិធី។',
            explanationEn: 'Catches ArithmeticException safely and prints diagnostic message without crashing.',
            expectedOutput: `កំពុងធ្វើការចែក...
កំហុស: មិនអាចចែកនឹងលេខសូន្យបានឡើយ! (/ by zero)
បញ្ចប់ដំណើរការត្រួតពិនិត្យ (finally block ran).
កម្មវិធីនៅតែដំណើរការបន្តដោយរលូន មិនគាំងឡើយ!`,
          },
        ],
        commonMistakes: [
          {
            titleKm: 'ចាប់ទទេ Catch Empty ដោយមិនបង្ហាញមូលហេតុ ឬមិន Log កំហុស',
            titleEn: 'Swallowing exceptions with empty catch blocks',
            badCode: 'try { ... } catch (Exception e) {} // Bad: Hides bugs!',
            goodCode: 'try { ... } catch (Exception e) { System.err.println(e.getMessage()); }',
            explanationKm: 'ការទុកប្លុក catch ទទេនឹងបិទបាំងកំហុសធ្វើឱ្យអ្នកមិនដឹងថាតើហេតុអ្វីបានជាកម្មវិធីមិនដំណើរការដូចបំណង។',
            explanationEn: 'Never swallow exceptions silently; always log or handle the error properly.',
          },
        ],
        quizzes: [
          {
            id: 'q-exc-1',
            questionKm: 'តើប្លុកមួយណាដែលនឹងដំណើរការជានិច្ច មិនថាក្នុងប្លុក try មានកំហុសកើតឡើងឬអត់?',
            questionEn: 'Which block always executes regardless of whether an exception occurred?',
            optionsKm: ['finally', 'catch', 'try', 'default'],
            optionsEn: ['finally', 'catch', 'try', 'default'],
            correctOptionIndex: 0,
            explanationKm: 'ប្លុក finally នឹងដំណើរការជានិច្ច ភាគច្រើនត្រូវបានប្រើសម្រាប់បិទធនធានដូចជា File ឬ Database Connection។',
            explanationEn: 'The finally block executes whether an exception is handled or not.',
          },
        ],
      },
    ],
  },
];

export const ALL_LESSONS: Lesson[] = CURRICULUM_MODULES.flatMap((mod) => mod.lessons);

export function findLessonBySlug(slug: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.slug === slug);
}

export function getAdjacentLessons(currentSlug: string): { prevLesson?: Lesson; nextLesson?: Lesson } {
  const index = ALL_LESSONS.findIndex((l) => l.slug === currentSlug);
  if (index === -1) return {};
  return {
    prevLesson: index > 0 ? ALL_LESSONS[index - 1] : undefined,
    nextLesson: index < ALL_LESSONS.length - 1 ? ALL_LESSONS[index + 1] : undefined,
  };
}
