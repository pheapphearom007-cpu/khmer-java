import { CurriculumModule } from '../../types';

export const MODULE_1_SETUP: CurriculumModule = {
  id: 'mod-1',
  slug: 'getting-started-environment',
  titleKm: '១. ចាប់ផ្តើមជាមួយ Java និងការរៀបចំបរិស្ថាន (Getting Started & Setup)',
  titleEn: '1. Getting Started with Java & Environment Setup',
  descriptionKm: 'ស្វែងយល់ពីប្រវត្តិ គោលការណ៍ WORA ភាពខុសគ្នារវាង JDK, JRE, JVM ដំណើរការ Compile និងទម្រង់ Syntax គ្រឹះនៃ Java។',
  descriptionEn: 'Learn Java history, WORA philosophy, JDK vs JRE vs JVM, compilation workflow, and core Java syntax.',
  icon: 'Coffee',
  level: 'beginner',
  lessons: [
    {
      id: 'intro-to-java',
      slug: 'intro-to-java',
      moduleSlug: 'getting-started-environment',
      order: 1,
      titleKm: 'សេចក្តីផ្តើមអំពី Java (Introduction to Java)',
      titleEn: 'Introduction to Java',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      objectivesKm: [
        'យល់ដឹងច្បាស់ថាអ្វីទៅជា Java និងប្រវត្តិសង្ខេបរបស់វា',
        'ស្គាល់ពីគោលការណ៍ស្នូល "Write Once, Run Anywhere" (WORA)',
        'បែងចែកឱ្យដាច់រវាង JDK (ឧបករណ៍អភិវឌ្ឍន៍), JRE (បរិស្ថានរត់), និង JVM (ម៉ាស៊ីននិម្មិត)',
      ],
      objectivesEn: [
        'Understand what Java is and its history',
        'Master the core philosophy: "Write Once, Run Anywhere" (WORA)',
        'Distinguish clearly between JDK, JRE, and JVM',
      ],
      summaryKm: 'Java គឺជាភាសាកម្មវិធីបែប Object-Oriented ដ៏មានឥទ្ធិពល បង្កើតឡើងដោយ Sun Microsystems (បច្ចុប្បន្ន Oracle) នៅឆ្នាំ 1995 ដែលដំណើរការលើឧបករណ៍រាប់ពាន់លានទូទាំងពិភពលោក។',
      summaryEn: 'Java is a powerful object-oriented programming language created by Sun Microsystems in 1995, powering billions of devices globally.',
      contentKm: `### ១. តើអ្វីទៅជា Java?
Java គឺជាភាសាសរសេរកម្មវិធីកម្រិតខ្ពស់ (High-level Programming Language) បែប Class-based និង Object-Oriented (OOP)។ វាត្រូវបានបង្កើតឡើងដោយលោក **James Gosling** នៅក្រុមហ៊ុន Sun Microsystems ក្នុងឆ្នាំ 1995 ហើយក្រោយមកត្រូវបានទិញដោយក្រុមហ៊ុន Oracle Corporation។

Java ត្រូវបានគេនិយមប្រើប្រាស់យ៉ាងទូលំទូលាយព្រោះតែ៖
- **ភាពឯករាជ្យពីប្រព័ន្ធប្រតិបត្តិការ (Platform Independent):** សរសេរម្តងអាចដំណើរការលើ Windows, macOS, Linux ឬ Android បានទាំងអស់។
- **សុវត្ថិភាពខ្ពស់ (High Security):** គ្មានការប្រើ pointer ដោយផ្ទាល់ទៅកាន់ Memory ដូច C/C++ ឡើយ និងមានយន្តការ Sandbox ការពារយ៉ាងរឹងមាំ។
- **ការគ្រប់គ្រង Memory ដោយស្វ័យប្រវត្ត (Automatic Garbage Collection):** JVM ជួយសម្អាត Memory ដែលលែងប្រើដោយស្វ័យប្រវត្តិ។

### ២. គោលការណ៍ "Write Once, Run Anywhere" (WORA)
នៅពេលដែលអ្នកសរសេរកូដជាភាសា Java (file កន្ទុយ \`.java\`) Compiler (\`javac\`) នឹងមិនបម្លែងវាទៅជា Machine Code របស់កុំព្យូទ័រជាក់លាក់ណាមួយនោះទេ។ ផ្ទុយទៅវិញ វាបម្លែងទៅជា **Bytecode** (file កន្ទុយ \`.class\`)។

Bytecode នេះអាចយកទៅដំណើរការលើគ្រប់កុំព្យូទ័រ និងទូរស័ព្ទទាំងអស់ឱ្យតែឧបករណ៍នោះមានដំឡើង **JVM (Java Virtual Machine)**!

### ៣. ត្រីកោណស្ថាបត្យកម្ម៖ JDK, JRE, និង JVM
ដើម្បីយល់ច្បាស់ពី Java អ្នកត្រូវស្គាល់សមាសភាគទាំង ៣ នេះ៖
1. **JVM (Java Virtual Machine):** ជាបេះដូងរបស់ Java។ វាទទួលខុសត្រូវក្នុងការអាន Bytecode (\`.class\`) ហើយបម្លែងទៅជា Native Machine Code (0 និង 1) តាមរយៈ JIT (Just-In-Time) Compiler ដើម្បីឱ្យ CPU ដំណើរការបាន។
2. **JRE (Java Runtime Environment):** គឺជាកញ្ចប់បរិស្ថានសម្រាប់អ្នកប្រើប្រាស់ទូទៅដើម្បីបើកដំណើរការកម្មវិធី Java។ JRE = JVM + Java Core Libraries។
3. **JDK (Java Development Kit):** គឺជាកញ្ចប់ឧបករណ៍ពេញលេញសម្រាប់អ្នកសរសេរកូដ (Programmer)។ JDK = JRE + Development Tools (\`javac\`, \`javadoc\`, \`jdb\`)។`,
      contentEn: `Java is a robust, object-oriented language that revolutionized software with the WORA paradigm. Discover how JDK, JRE, and JVM cooperate to run Java code anywhere.`,
      syntax: `// ទម្រង់គ្រឹះនៃឯកសារ Java
public class Main {
    public static void main(String[] args) {
        // ពាក្យបញ្ជា Java នៅទីនេះ
        System.out.println("អត្ថបទបង្ហាញលើអេក្រង់");
    }
}`,
      vocabulary: [
        {
          term: 'Platform Independent',
          khmerTerm: 'ឯករាជ្យពីផ្លាតហ្វម',
          definitionKm: 'សមត្ថភាពនៃកម្មវិធីដែលអាចដំណើរការលើគ្រប់ OS ដោយមិនបាច់សរសេរឡើងវិញ',
          definitionEn: 'Ability of a program to run across multiple operating systems without recompilation.',
        },
        {
          term: 'Bytecode',
          khmerTerm: 'បៃកូដ (កូដកម្រិតកណ្តាល)',
          definitionKm: 'កូដកម្រិតមធ្យមដែលបង្កើតដោយ javac compiler ហើយដំណើរការដោយ JVM',
          definitionEn: 'Intermediate instruction set compiled from Java source and executed by the JVM.',
        },
        {
          term: 'JVM (Java Virtual Machine)',
          khmerTerm: 'ម៉ាស៊ីននិម្មិត Java',
          definitionKm: 'ម៉ាស៊ីននិម្មិតដែលផ្ទុក និងដំណើរការ Java Bytecode លើប្រព័ន្ធប្រតិបត្តិការជាក់ស្តែង',
          definitionEn: 'Abstract computing machine enabling a computer to run a Java program.',
        },
        {
          term: 'JDK (Java Development Kit)',
          khmerTerm: 'កញ្ចប់ឧបករណ៍អភិវឌ្ឍន៍ Java',
          definitionKm: 'កញ្ចប់ Software ដែលមាន Compiler (javac) និងបណ្ណាល័យសម្រាប់បង្កើតកម្មវិធី',
          definitionEn: 'Software development environment used for developing Java applications.',
        },
      ],
      examples: [
        {
          title: 'កម្មវិធីជំរាបសួរដំបូង (First Java Program)',
          code: `public class Main {
    public static void main(String[] args) {
        System.out.println("សួស្តីកម្ពុជា! ស្វាគមន៍មកកាន់ Khmer Java Academy!");
        System.out.println("Java ដំណើរការតាមគោលការណ៍: Write Once, Run Anywhere.");
        System.out.println("កំណែ Java បច្ចុប្បន្ន: OpenJDK 21");
    }
}`,
          explanationKm: 'កម្មវិធីនេះបង្ហាញពីទម្រង់សាមញ្ញបំផុតនៃ Java ដោយប្រើ System.out.println() ដើម្បីបោះពុម្ពអក្សរខ្មែរលើ Console។',
          explanationEn: 'This program demonstrates the simplest Java class printing Khmer and English messages to standard output.',
          lineByLineExplanation: [
            {
              line: 'public class Main {',
              explanationKm: 'ប្រកាសថ្នាក់ (class) ឈ្មោះថា Main ដែលជាចំណុចចាប់ផ្តើមនៃកម្មវិធី។ ឈ្មោះ class ត្រូវតែដូចឈ្មោះ file (Main.java)។',
              explanationEn: 'Declares a public class named Main. In Java, public classes must match their filename.',
            },
            {
              line: 'public static void main(String[] args) {',
              explanationKm: 'Main Method ដែលជាទ្វារចូលដំបូងគេបង្អស់ (Entry Point) ពេល JVM ចាប់ផ្តើមដំណើរការកូដ។',
              explanationEn: 'The entry point method where the JVM begins executing any standalone Java application.',
            },
            {
              line: 'System.out.println("...");',
              explanationKm: 'ពាក្យបញ្ជាសម្រាប់បង្ហាញអត្ថបទលើ Console ហើយចុះបន្ទាត់ថ្មីមួយបន្ទាប់ពីបង្ហាញរួច។',
              explanationEn: 'Standard library call that prints a line of text to standard output and terminates the line.',
            },
            {
              line: '}',
              explanationKm: 'សញ្ញាបិទវង់ក្រចកទំពក់ ដើម្បីបញ្ចប់ main method និង Main class។',
              explanationEn: 'Closing curly braces that delimit the method and class definitions.',
            },
          ],
          expectedOutput: `សួស្តីកម្ពុជា! ស្វាគមន៍មកកាន់ Khmer Java Academy!
Java ដំណើរការតាមគោលការណ៍: Write Once, Run Anywhere.
កំណែ Java បច្ចុប្បន្ន: OpenJDK 21`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការសរសេរឈ្មោះ Class ខុសអក្សរតូចធំ (Case-Sensitivity)',
          titleEn: 'Case-sensitivity mismatch in class name and file',
          badCode: `public class main { // អក្សរតូច m
    Public static void Main(String[] args) { // អក្សរធំ P និង M
        system.out.println("សួស្តី"); // អក្សរតូច s
    }
}`,
          goodCode: `public class Main { // អក្សរធំ M ត្រូវគ្នានឹង Main.java
    public static void main(String[] args) { // អក្សរតូច public និង main
        System.out.println("សួស្តី"); // អក្សរធំ System
    }
}`,
          explanationKm: 'Java ប្រកាន់អក្សរតូចធំយ៉ាងតឹងរ៉ឹង (Case-sensitive)។ ពាក្យគន្លឹះដូចជា public, static, void ត្រូវតែសរសេរជាអក្សរតូច ចំណែកឈ្មោះ Class និង System ត្រូវតែសរសេរអក្សរធំនៅខាងដើម។',
          explanationEn: 'Java is strictly case-sensitive. Keywords like public and static must be lowercase, while System and Main start with capital letters.',
        },
      ],
      exercise: {
        id: 'ex-intro-1',
        titleKm: 'បោះពុម្ពព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក',
        titleEn: 'Print Your Student Profile',
        descriptionKm: 'សូមសរសេរកូដ Java ដោយប្រើ System.out.println() ចំនួន ៣ បន្ទាត់ ដើម្បីបង្ហាញ៖ ១. ឈ្មោះរបស់អ្នក ២. មុខវិជ្ជាដែលអ្នកចូលចិត្ត ៣. គោលដៅសិក្សា Java របស់អ្នក។',
        descriptionEn: 'Write a Java program using 3 System.out.println() statements displaying your name, favorite subject, and Java goal.',
        starterCode: `public class Main {
    public static void main(String[] args) {
        // បញ្ចូលកូដ System.out.println() របស់អ្នកនៅត្រង់នេះ
        
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("ឈ្មោះ: សុខ សំណាង");
        System.out.println("មុខវិជ្ជា: វិទ្យាសាស្ត្រកុំព្យូទ័រ");
        System.out.println("គោលដៅ: ក្លាយជា Java Backend Developer ដ៏ពូកែ!");
    }
}`,
        hintsKm: [
          'ប្រើពាក្យបញ្ជា System.out.println("អត្ថបទនៅទីនេះ");',
          'កុំភ្លេចសញ្ញា ; (semicolon) នៅចុងបន្ទាត់នីមួយៗ',
          'ដាក់អត្ថបទនៅក្នុងសញ្ញាសម្រង់ពីរ ("...")',
        ],
        hintsEn: [
          'Use System.out.println("Your text");',
          'Remember the semicolon (;) at the end of every statement',
          'Wrap string literals in double quotes ("...")',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-intro-1',
          questionKm: 'តើគោលការណ៍ "Write Once, Run Anywhere" (WORA) របស់ Java កើតឡើងបានដោយសារតែសមាសភាគមួយណា?',
          questionEn: 'Which Java component enables the "Write Once, Run Anywhere" capability?',
          difficulty: 'easy',
          hintsKm: ['សមាសភាគនេះមានវត្តមានលើគ្រប់ OS ហើយជាអ្នកអាន Bytecode'],
          hintsEn: ['It is a virtual machine installed on the host operating system.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បោះពុម្ពឈ្មោះសមាសភាគនោះ (JVM, JRE ឬ JDK)
        System.out.println("ចម្លើយគឺ: JVM");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("JVM (Java Virtual Machine)");
    }
}`,
          expectedOutput: 'JVM (Java Virtual Machine)',
        },
        {
          id: 'pq-intro-2',
          questionKm: 'តើមានអ្វីកើតឡើងប្រសិនបើអ្នកលុបពាក្យ `static` ចេញពី `public static void main(String[] args)`?',
          questionEn: 'What happens if you omit the `static` keyword from the main method?',
          difficulty: 'medium',
          hintsKm: ['JVM ត្រូវការហៅ main() method ដោយមិនបាច់បង្កើត instance នៃ Class ជាមុន'],
          hintsEn: ['JVM requires the entry method to be callable without creating an object instance.'],
          starterCode: `// សាកល្បងពិចារណាលើបញ្ហានេះ
public class Main {
    // សរសេរការពន្យល់របស់អ្នក
}`,
          solutionCode: `// កម្មវិធីនឹង Compile ជោគជ័យ ប៉ុន្តែពេល Run JVM នឹងបោះកំហុស NoSuchMethodError: main method is not static
public class Main {
    public static void main(String[] args) {
        System.out.println("កំហុស Runtime: Main method not found / not static");
    }
}`,
          expectedOutput: 'កំហុស Runtime: Main method not found / not static',
        },
        {
          id: 'pq-intro-3',
          questionKm: 'ចូរពន្យល់ពីភាពខុសគ្នារវាង `System.out.print()` និង `System.out.println()` តាមរយៈកូដឧទាហរណ៍ជាក់ស្តែង។',
          questionEn: 'Demonstrate the practical difference between print() and println() with code.',
          difficulty: 'hard',
          hintsKm: ['println បញ្ចប់ដោយបន្ទាត់ថ្មី (newline) រីឯ print បន្តលើបន្ទាត់ដដែល'],
          hintsEn: ['println outputs a newline feed; print keeps the cursor on the same line.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // សរសេរ print() និង println() ដើម្បីបង្ហាញភាពខុសគ្នា
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.print("Khmer ");
        System.out.print("Java ");
        System.out.println("Academy");
        System.out.println("បន្ទាត់ថ្មីបន្ទាប់ពី println!");
    }
}`,
          expectedOutput: `Khmer Java Academy
បន្ទាត់ថ្មីបន្ទាប់ពី println!`,
        },
      ],
      quizzes: [
        {
          id: 'q-intro-1',
          questionKm: 'តើ Java Compiler (javac) បម្លែងកូដ Java Source (.java) ទៅជាអ្វី?',
          questionEn: 'What does the Java compiler (javac) convert .java source code into?',
          optionsKm: ['Binary Machine Code ផ្ទាល់', 'Java Bytecode (.class)', 'Assembly Code', 'HTML Script'],
          optionsEn: ['Direct Binary Machine Code', 'Java Bytecode (.class)', 'Assembly Code', 'HTML Script'],
          correctOptionIndex: 1,
          explanationKm: 'javac បម្លែងកូដ .java ទៅជា Java Bytecode (.class) ដែលអាចដំណើរការបានលើគ្រប់ JVM។',
          explanationEn: 'javac converts source code into architecture-neutral Java Bytecode (.class files).',
          hintKm: 'វាជាកូដកណ្តាលដែលមានកន្ទុយ .class',
          hintEn: 'It is an intermediate bytecode file ending with .class',
        },
        {
          id: 'q-intro-2',
          questionKm: 'ប្រសិនបើអ្នកចង់បង្កើត និងសរសេរកម្មវិធី Java តើអ្នកត្រូវដំឡើងកញ្ចប់មួយណា?',
          questionEn: 'If you want to develop and compile Java applications, which bundle do you need?',
          optionsKm: ['JRE (Java Runtime Environment)', 'JDK (Java Development Kit)', 'JVM តែមួយមុខគត់', 'Java Browser Plugin'],
          optionsEn: ['JRE (Java Runtime Environment)', 'JDK (Java Development Kit)', 'JVM standalone', 'Java Browser Plugin'],
          correctOptionIndex: 1,
          explanationKm: 'អ្នកសរសេរកូដត្រូវការ JDK ព្រោះវាមានទាំង Compiler (javac), Debugger និង Core Libraries។ រីឯ JRE គឺសម្រាប់តែអ្នកប្រើប្រាស់ទូទៅបើកកម្មវិធីប៉ុណ្ណោះ។',
          explanationEn: 'Developers need the JDK because it packages the javac compiler, debugger, and runtime libraries.',
          hintKm: 'កញ្ចប់នេះមានពាក្យ "Development Kit"',
          hintEn: 'It stands for Java Development Kit.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_intro.asp',
    },
    {
      id: 'java-environment-jvm',
      slug: 'java-environment-jvm',
      moduleSlug: 'getting-started-environment',
      order: 2,
      titleKm: 'បរិស្ថានដំណើរការ និងយន្តការ JVM (Java Environment & JVM Internals)',
      titleEn: 'Java Environment, Compilation & JVM Internals',
      difficulty: 'beginner',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីដំណើរការពីរជំហាន Compile-then-Interpret របស់ Java',
        'ស្គាល់សមាសភាគខាងក្នុងរបស់ JVM: ClassLoader, Memory Areas, Execution Engine, និង JIT Compiler',
        'យល់ពីរបៀបរៀបចំ OpenJDK និងដំណើរការកូដតាម Command Line (Terminal)',
      ],
      objectivesEn: [
        'Master the two-phase Compile-then-Interpret process of Java',
        'Understand internal JVM architecture: ClassLoader, Memory Areas, Execution Engine, and JIT Compiler',
        'Learn how to set up OpenJDK and compile/run programs via terminal commands',
      ],
      summaryKm: 'ស្វែងយល់ស៊ីជម្រៅពីរបៀបដែល JVM ផ្ទុក Bytecode ចូលទៅក្នុង Memory និងបម្លែងវាទៅជា Machine Code យ៉ាងលឿនតាមរយៈ JIT Compiler។',
      summaryEn: 'Deep-dive into how the JVM loads bytecode into memory and executes it at high speed with the JIT compiler.',
      contentKm: `### ១. ដំណើរការ Compile និង Run ក្នុង Java
ខុសពីភាសា C++ (ដែល compile ទៅជា native machine code ភ្លាមៗ) ឬ Python (ដែល interpret កូដផ្ទាល់) Java ប្រើវិធីសាស្ត្ររួមបញ្ចូលគ្នា (Hybrid Approach):

\`\`\`
Source Code (.java)  ---> [ javac Compiler ] --->  Bytecode (.class)
                                                          │
                                                    [ JVM Loading ]
                                                          │
                                                [ JIT Compiler / Interpreter ]
                                                          │
                                                   Machine Code (CPU)
\`\`\`

1. **ជំហានទី ១ (Compile Time):** ប្រើពាក្យបញ្ជា \`javac Main.java\`។ កូដអត្ថបទរបស់អ្នកនឹងត្រូវបានត្រួតពិនិត្យ Syntax ហើយបម្លែងទៅជា Bytecode នៅក្នុង file \`Main.class\`។
2. **ជំហានទី ២ (Runtime):** ប្រើពាក្យបញ្ជា \`java Main\`។ JVM នឹងបើកដំណើរការ ហើយចាប់ផ្តើមអនុវត្ត Bytecode នោះ។

### ២. សមាសភាគខាងក្នុងទាំង ៤ របស់ JVM
ពេលអ្នកដំណើរការ \`java Main\` JVM នឹងចែកការងារជា ៤ ផ្នែកធំៗ៖
1. **ClassLoader Subsystem:** ទទួលខុសត្រូវក្នុងការស្វែងរក និងផ្ទុក (Load), ផ្ទៀងផ្ទាត់សុវត្ថិភាព (Verify), និងរៀបចំ Memory (Prepare) សម្រាប់ file \`.class\`។
2. **JVM Memory Structure:**
   - **Method Area:** ផ្ទុក Class Metadata, Static Variables, និង Method Code។
   - **Heap Memory:** ផ្ទុក Object ទាំងអស់ដែលបង្កើតឡើងដោយពាក្យគន្លឹះ \`new\`។
   - **Stack Memory:** ផ្ទុក Method Calls, Local Variables, និង Primitive Types នៃ Thread នីមួយៗ។
   - **PC Register:** កត់ត្រាអាសយដ្ឋាននៃពាក្យបញ្ជា Bytecode បច្ចុប្បន្នដែលកំពុងដំណើរការ។
3. **Execution Engine:** រួមមាន **Interpreter** (អាន Bytecode មួយជួរៗ) និង **JIT (Just-In-Time) Compiler** (បម្លែង Bytecode ដែលរត់ញឹកញាប់ទៅជា Machine Code ផ្ទាល់ ដើម្បីឱ្យរត់លឿនដូច C++)។
4. **Garbage Collector (GC):** កម្មវិធីស្វ័យប្រវត្តដែលស្កេន Heap Memory ដើម្បីលុប Object ណាដែលលែងមានគេចង្អុលបង្ហាញ (Unreachable Objects)។`,
      contentEn: `Learn the internal execution engine of Java, how ClassLoaders verify bytecode, and how the JIT compiler optimizes execution speed.`,
      syntax: `// ការ compile តាម command line:
// $ javac Main.java
// $ java Main`,
      vocabulary: [
        {
          term: 'ClassLoader',
          khmerTerm: 'ម៉ាស៊ីនផ្ទុក Class',
          definitionKm: 'ផ្នែកមួយនៃ JVM ដែលទាញយក file .class ពី Disk មកដាក់ក្នុង Memory',
          definitionEn: 'JVM subsystem responsible for loading class files into memory dynamically.',
        },
        {
          term: 'Heap Memory',
          khmerTerm: 'អង្គចងចាំ Heap',
          definitionKm: 'តំបន់ Memory នៅក្នុង JVM សម្រាប់ផ្ទុក Objects និង Instance Variables',
          definitionEn: 'Runtime data area from which memory for all class instances and arrays is allocated.',
        },
        {
          term: 'Stack Memory',
          khmerTerm: 'អង្គចងចាំ Stack',
          definitionKm: 'តំបន់ Memory សម្រាប់ផ្ទុក Local Variables និងការហៅ Method នីមួយៗ',
          definitionEn: 'Thread-private memory that stores frames containing local variables and partial results.',
        },
        {
          term: 'JIT Compiler',
          khmerTerm: 'Just-In-Time Compiler',
          definitionKm: 'Compiler ក្នុង JVM ដែលបម្លែង Bytecode ក្តៅៗទៅជា Machine Code ភ្លាមៗដើម្បីបង្កើនល្បឿន',
          definitionEn: 'Component that improves performance by compiling bytecode into native machine code at runtime.',
        },
      ],
      examples: [
        {
          title: 'ការត្រួតពិនិត្យព័ត៌មាន JVM និង Memory',
          code: `public class Main {
    public static void main(String[] args) {
        // ទទួលបាន Runtime Instance របស់ JVM
        Runtime runtime = Runtime.getRuntime();

        // ព័ត៌មានប្រព័ន្ធ
        String javaVersion = System.getProperty("java.version");
        String javaVendor = System.getProperty("java.vendor");
        String osName = System.getProperty("os.name");

        System.out.println("=== ព័ត៌មាន JVM & ប្រព័ន្ធ ===");
        System.out.println("Java Version : " + javaVersion);
        System.out.println("Java Vendor  : " + javaVendor);
        System.out.println("ប្រព័ន្ធ OS  : " + osName);
        System.out.println("ចំនួន CPU Core: " + runtime.availableProcessors());
        
        // គណនា Heap Memory ជា Megabytes (MB)
        long totalMemoryMB = runtime.totalMemory() / (1024 * 1024);
        long freeMemoryMB = runtime.freeMemory() / (1024 * 1024);
        
        System.out.println("Total Heap   : " + totalMemoryMB + " MB");
        System.out.println("Free Heap    : " + freeMemoryMB + " MB");
    }
}`,
          explanationKm: 'កូដនេះប្រើប្រាស់ Runtime API និង System Properties ដើម្បីពិនិត្យមើលកំណែ Java និងទំហំ Heap Memory ដែល JVM កំពុងប្រើប្រាស់។',
          explanationEn: 'This program inspects JVM system properties and queries available runtime heap memory.',
          lineByLineExplanation: [
            {
              line: 'Runtime runtime = Runtime.getRuntime();',
              explanationKm: 'ទាញយក Object តំណាងឱ្យ Runtime បច្ចុប្បន្នរបស់ JVM។',
              explanationEn: 'Obtains the current JVM runtime environment instance.',
            },
            {
              line: 'System.getProperty("java.version");',
              explanationKm: 'អានតម្លៃកំណែ Java ដែលកំពុងដំណើរការ (ឧទាហរណ៍ 21)។',
              explanationEn: 'Retrieves the version string of the active Java runtime.',
            },
            {
              line: 'runtime.totalMemory() / (1024 * 1024);',
              explanationKm: 'បម្លែងទំហំ Memory ពី Bytes ទៅជា Megabytes (MB)។',
              explanationEn: 'Converts raw byte count into human-readable megabytes.',
            },
          ],
          expectedOutput: `=== ព័ត៌មាន JVM & ប្រព័ន្ធ ===
Java Version : 21.0.2
Java Vendor  : Oracle Corporation
ប្រព័ន្ធ OS  : Linux
ចំនួន CPU Core: 4
Total Heap   : ... MB
Free Heap    : ... MB`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការច្រឡំរវាង javac និង java ពាក្យបញ្ជា',
          titleEn: 'Confusing javac and java command line arguments',
          badCode: `// នៅលើ Terminal:
$ java Main.java // ក្នុងកំណែ Java ចាស់ៗមិនអាចរត់បែបនេះបានទេ
$ javac Main // ខុស! javac ត្រូវការ .java extension`,
          goodCode: `// ជំហានត្រឹមត្រូវ:
$ javac Main.java  // Compile បង្កើតបាន Main.class
$ java Main        // Run ដោយមិនបាច់ដាក់កន្ទុយ .class ឡើយ`,
          explanationKm: 'ពេល compile ជាមួយ javac ត្រូវដាក់កន្ទុយ .java។ ប៉ុន្តែពេល run ជាមួយពាក្យបញ្ជា java គឺត្រូវហៅតែឈ្មោះ Class ដោយមិនបាច់ដាក់កន្ទុយ .class ឡើយ។',
          explanationEn: 'javac requires the full filename (Main.java). java expects the fully qualified class name without .class suffix.',
        },
      ],
      exercise: {
        id: 'ex-jvm-1',
        titleKm: 'សរសេរកូដបង្ហាញព័ត៌មានអ្នកប្រើប្រាស់ពី System Properties',
        titleEn: 'Query User System Properties',
        descriptionKm: 'សូមសរសេរកូដដើម្បីបង្ហាញ User Working Directory (`user.dir`) និង File Encoding (`file.encoding`) ដោយប្រើ System.getProperty()។',
        descriptionEn: 'Write Java code to query and print the user working directory and file encoding via System.getProperty().',
        starterCode: `public class Main {
    public static void main(String[] args) {
        // ប្រើ System.getProperty("user.dir") និង System.getProperty("file.encoding")
        
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        String workDir = System.getProperty("user.dir");
        String encoding = System.getProperty("file.encoding");
        System.out.println("Working Directory: " + workDir);
        System.out.println("File Encoding: " + encoding);
    }
}`,
        hintsKm: [
          'ប្រើ System.getProperty("...") ដោយបញ្ចូល key ឈ្មោះ "user.dir"',
          'បោះពុម្ពលទ្ធផលដោយប្រើ System.out.println()',
        ],
        hintsEn: [
          'Call System.getProperty("user.dir")',
          'Print results using System.out.println()',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-env-1',
          questionKm: 'តើតំបន់ Memory មួយណាត្រូវបានប្រើសម្រាប់ផ្ទុក Local Variables ពេល method កំពុងដំណើរការ?',
          questionEn: 'Which JVM memory area holds method-local variables during execution?',
          difficulty: 'easy',
          hintsKm: ['ជា Memory បែប LIFO (Last-In-First-Out)'],
          hintsEn: ['It operates as a LIFO frame structure allocated per thread.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("ចម្លើយ: Stack Memory");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Stack Memory");
    }
}`,
          expectedOutput: 'Stack Memory',
        },
        {
          id: 'pq-env-2',
          questionKm: 'តើ JIT Compiler ក្នុង JVM មានតួនាទីអ្វីខុសពី Interpreter ធម្មតា?',
          questionEn: 'How does the JIT Compiler differ from a standard bytecode interpreter?',
          difficulty: 'medium',
          hintsKm: ['JIT កំណត់ Hotspots ហើយបម្លែងទៅជា Native Machine Code ទុកជាមុន'],
          hintsEn: ['JIT identifies frequently executed hot spots and compiles them directly into native instructions.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បោះពុម្ពចម្លើយរបស់អ្នក
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("JIT បម្លែង Bytecode ដែលរត់ញឹកញាប់ទៅជា Machine Code ផ្ទាល់ ដើម្បីល្បឿនលឿនបំផុត!");
    }
}`,
          expectedOutput: 'JIT បម្លែង Bytecode ដែលរត់ញឹកញាប់ទៅជា Machine Code ផ្ទាល់ ដើម្បីល្បឿនលឿនបំផុត!',
        },
        {
          id: 'pq-env-3',
          questionKm: 'ចូរសរសេរកូដ Java ដែលបង្កើត Object ថ្មីមួយ ហើយពន្យល់ថាតើ Reference variable ស្ថិតនៅកន្លែងណា ហើយ Object ពិតស្ថិតនៅកន្លែងណាក្នុង Memory?',
          questionEn: 'Demonstrate creating an object and explain where the reference vs the actual object reside in JVM memory.',
          difficulty: 'hard',
          hintsKm: ['Reference អថេរស្ថិតនៅក្នុង Stack រីឯ Object ជាក់ស្តែងស្ថិតនៅក្នុង Heap'],
          hintsEn: ['The pointer variable lives on the stack; the allocated object lives on the heap.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        String msg = new String("សួស្តី Heap Memory!");
        // ពន្យល់ទីតាំង Memory របស់ msg និង Object ថ្មី
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        String msg = new String("សួស្តី Heap Memory!");
        System.out.println("អថេរ 'msg' ស្ថិតក្នុង Stack (Pointer)");
        System.out.println("Object ពិត 'សួស្តី Heap Memory!' ស្ថិតក្នុង Heap Memory");
    }
}`,
          expectedOutput: `អថេរ 'msg' ស្ថិតក្នុង Stack (Pointer)
Object ពិត 'សួស្តី Heap Memory!' ស្ថិតក្នុង Heap Memory`,
        },
      ],
      quizzes: [
        {
          id: 'q-jvm-1',
          questionKm: 'តើសមាសភាគមួយណាដែលសម្អាត Memory ដែលលែងប្រើក្នុង Heap ដោយស្វ័យប្រវត្តិ?',
          questionEn: 'Which automatic component reclaims unused heap memory in Java?',
          optionsKm: ['JIT Compiler', 'Garbage Collector (GC)', 'ClassLoader', 'Bytecode Verifier'],
          optionsEn: ['JIT Compiler', 'Garbage Collector (GC)', 'ClassLoader', 'Bytecode Verifier'],
          correctOptionIndex: 1,
          explanationKm: 'Garbage Collector (GC) គឺជាដំណើរការផ្ទៃក្នុងរបស់ JVM ដែលតាមដាន និងលុប Objects ដែលគ្មាន Reference ចង្អុលទៅ ដើម្បីកុំឱ្យអស់ Memory (Memory Leak)។',
          explanationEn: 'The Garbage Collector automatically scans heap memory and frees objects that are no longer referenced.',
          hintKm: 'ពាក្យនេះមានន័យថា "អ្នកប្រមូលសម្រាម"',
          hintEn: 'Translates to Garbage Collector.',
        },
        {
          id: 'q-jvm-2',
          questionKm: 'នៅពេលអ្នកដំណើរការ `java Main` តើសមាសភាគដំបូងគេបង្អស់ណាដែលផ្ទុក file .class ចូលទៅក្នុង Memory?',
          questionEn: 'When executing `java Main`, which subsystem first loads the .class file into JVM memory?',
          optionsKm: ['Execution Engine', 'ClassLoader Subsystem', 'JIT Compiler', 'Operating System Kernel'],
          optionsEn: ['Execution Engine', 'ClassLoader Subsystem', 'JIT Compiler', 'Operating System Kernel'],
          correctOptionIndex: 1,
          explanationKm: 'ClassLoader Subsystem គឺជាសមាសភាគដំបូងដែលស្វែងរក file .class ផ្ទុកវាចូល Memory និងផ្ទៀងផ្ទាត់ Bytecode។',
          explanationEn: 'The ClassLoader is the entry subsystem that reads and links binary bytecode classes.',
          hintKm: 'មានពាក្យ Class និង Loader',
          hintEn: 'ClassLoader subsystem.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_getstarted.asp',
    },
    {
      id: 'java-syntax-structure',
      slug: 'java-syntax-structure',
      moduleSlug: 'getting-started-environment',
      order: 3,
      titleKm: 'វេយ្យាករណ៍គ្រឹះ និង Comment ក្នុង Java (Syntax & Comments)',
      titleEn: 'Java Syntax, Statements & Comments',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      objectivesKm: [
        'ស្គាល់ពីទម្រង់កូដ Class និង Method ស្តង់ដារក្នុង Java',
        'យល់ដឹងពីតួនាទីនៃ Semicolon (;) និង Curly Brackets ({})',
        'ចេះប្រើប្រាស់ Single-line, Multi-line និង Javadoc Comments ឱ្យបានត្រឹមត្រូវ',
      ],
      objectivesEn: [
        'Understand standard Java class and method structure',
        'Master the syntax role of semicolons (;) and curly brackets ({})',
        'Correctly apply single-line, multi-line, and Javadoc documentation comments',
      ],
      summaryKm: 'រៀនពីច្បាប់វេយ្យាករណ៍គ្រឹះរបស់ Java ការប្រើប្រាស់សញ្ញាសម្គាល់ និងរបៀបសរសេរកំណត់ចំណាំ (Comments) ប្រកបដោយវិជ្ជាជីវៈ។',
      summaryEn: 'Master fundamental Java syntax rules, punctuation conventions, and professional code commenting standards.',
      contentKm: `### ១. គ្រោងឆ្អឹងស្តង់ដារនៃកម្មវិធី Java
រាល់កូដទាំងអស់ក្នុង Java ត្រូវតែស្ថិតនៅក្នុង **Class**។ មិនអាចសរសេរអនុគមន៍ ឬកូដនៅក្រៅ Class ដូច JavaScript ឬ Python បានឡើយ។

\`\`\`java
public class MyProgram {
    public static void main(String[] args) {
        System.out.println("កូដដំណើរការនៅទីនេះ");
    }
}
\`\`\`

- **Class Name:** ត្រូវតែចាប់ផ្តើមដោយអក្សរធំ (PascalCase) ដូចជា \`MyProgram\`, \`StudentManager\`។
- **Statements & Semicolons:** រាល់ឃ្លាបញ្ជាទាំងអស់ត្រូវបញ្ចប់ដោយសញ្ញា \`;\` (semicolon)។ បើភ្លេច \`;\` កូដនឹង Compile Error ភ្លាម។
- **Code Blocks:** ប្លុកកូដនីមួយៗត្រូវបានកំណត់ដោយសញ្ញាវង់ក្រចកទំពក់ \`{\` (បើក) និង \`}\` (បិទ)។

### ២. ប្រភេទ Comment ទាំង ៣ ក្នុង Java
Comment គឺជាកំណត់ចំណាំរបស់អ្នកសរសេរកូដ ដែល Compiler នឹងរំលងចោលមិនដំណើរការឡើយ៖
1. **Single-line Comment (\`//\`):** សម្រាប់ចំណាំខ្លីៗមួយបន្ទាត់។
2. **Multi-line Comment (\`/* ... */\`):** សម្រាប់ចំណាំវែងៗច្រើនបន្ទាត់។
3. **Javadoc Comment (\`/** ... */\`):** សម្រាប់បង្កើតឯកសារ API Document ស្វ័យប្រវត្តិ។`,
      contentEn: `Learn standard Java boilerplate structure, statement terminators, block scopes, and single-line/multi-line/Javadoc comments.`,
      syntax: `// ១. Single-line comment
/* ២. Multi-line
      comment */
/** 
 * ៣. Javadoc documentation comment
 * @author Khmer Java Academy
 */`,
      vocabulary: [
        {
          term: 'Statement',
          khmerTerm: 'ឃ្លាបញ្ជា',
          definitionKm: 'បញ្ជាពេញលេញមួយក្នុងកូដដែលត្រូវបញ្ចប់ដោយសញ្ញា Semicolon (;)',
          definitionEn: 'An executable command in Java terminated by a semicolon.',
        },
        {
          term: 'Block Scope',
          khmerTerm: 'វិសាលភាពប្លុកកូដ',
          definitionKm: 'ដែនកំណត់នៃកូដដែលស្ថិតនៅក្នុងរវាងសញ្ញា { និង }',
          definitionEn: 'The region between matching opening and closing braces {}.',
        },
        {
          term: 'Javadoc',
          khmerTerm: 'ឯកសារស្វ័យប្រវត្តិ Javadoc',
          definitionKm: 'Comment ពិសេសដែលឧបករណ៍ Javadoc អាចទាញយកទៅបង្កើតជាគេហទំព័រ HTML Document',
          definitionEn: 'Documentation generator tool that extracts structured API docs from /** ... */ comments.',
        },
      ],
      examples: [
        {
          title: 'ការប្រើប្រាស់ Comment និងទម្រង់កូដស្អាត (Clean Syntax)',
          code: `/**
 * កម្មវិធីគំរូបង្ហាញពីការប្រើប្រាស់ Comment និង Syntax
 * @author សិស្ស Java កម្ពុជា
 * @version 1.0
 */
public class Main {
    public static void main(String[] args) {
        // ១. បោះពុម្ពសារស្វាគមន៍
        System.out.println("=== សាលាបង្រៀន Java កម្ពុជា ===");

        /*
         * ២. ប្លុកខាងក្រោមគណនាផលបូកសាមញ្ញ
         * ចំនួនសិស្សសរុប = សិស្សប្រុស + សិស្សស្រី
         */
        int maleStudents = 45;
        int femaleStudents = 55;
        int total = maleStudents + femaleStudents;

        // ៣. បង្ហាញលទ្ធផល
        System.out.println("ចំនួនសិស្សសរុប: " + total + " នាក់");
    }
}`,
          explanationKm: 'ឧទាហរណ៍នេះបង្ហាញពីការដាក់ Javadoc នៅពីលើ Class ការប្រើ Single-line comment និង Multi-line comment យ៉ាងមានរបៀប។',
          explanationEn: 'Demonstrates Javadoc headers, inline commentary, and clean formatting for clarity.',
          lineByLineExplanation: [
            {
              line: '/** ... */',
              explanationKm: 'Javadoc comment សម្រាប់ផ្តល់ព័ត៌មានអំពីអ្នកនិពន្ធ និងកំណែកម្មវិធី។',
              explanationEn: 'Standard Javadoc block describing the class and author.',
            },
            {
              line: 'int maleStudents = 45;',
              explanationKm: 'បង្កើតអថេរប្រភេទចំនួនគត់ (int) ផ្ទុកតម្លៃ ៤៥ ហើយបញ្ចប់ដោយសញ្ញា ;។',
              explanationEn: 'Declares an integer variable initialized to 45.',
            },
            {
              line: 'System.out.println(...);',
              explanationKm: 'ភ្ជាប់អក្សរ និងតម្លៃអថេរដើម្បីបង្ហាញលើ Console។',
              explanationEn: 'Concatenates strings and integer variables for terminal output.',
            },
          ],
          expectedOutput: `=== សាលាបង្រៀន Java កម្ពុជា ===
ចំនួនសិស្សសរុប: 100 នាក់`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការភ្លេចសញ្ញា Semicolon (;) នៅចុងបន្ទាត់',
          titleEn: 'Missing statement semicolon delimiter',
          badCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("សួស្តី") // ខ្វះសញ្ញា ;
        int x = 10 // ខ្វះសញ្ញា ;
    }
}`,
          goodCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("សួស្តី"); // មាន ;
        int x = 10; // មាន ;
    }
}`,
          explanationKm: 'គ្រប់ Statement ក្នុង Java ត្រូវតែមានសញ្ញា ; ជាដាច់ខាត។ បើភ្លេច Compiler នឹងបោះកំហុស `error: \';\' expected`។',
          explanationEn: 'Every executable expression in Java must terminate with a semicolon (;).',
        },
      ],
      exercise: {
        id: 'ex-syntax-1',
        titleKm: 'ជួសជុលកំហុស Syntax ក្នុងកូដដែលខូច',
        titleEn: 'Fix Broken Java Syntax Errors',
        descriptionKm: 'កូដខាងក្រោមមានកំហុស Syntax ដូចជាភ្លេច ; សរសេរ Class អក្សរតូច និងខ្វះសញ្ញាបិទវង់ក្រចក។ សូមកែវាឱ្យដំណើរការបានត្រឹមត្រូវ។',
        descriptionEn: 'The starter code contains syntax errors including missing semicolons and casing flaws. Fix and run it.',
        starterCode: `public class main {
    public static void main(String[] args) {
        System.out.println("កូដនេះត្រូវបានជួសជុលរួចរាល់!")
        int score = 100
        System.out.println("ពិន្ទុ: " + score)
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("កូដនេះត្រូវបានជួសជុលរួចរាល់!");
        int score = 100;
        System.out.println("ពិន្ទុ: " + score);
    }
}`,
        hintsKm: [
          'ប្តូរ `class main` ទៅជា `class Main` (អក្សរធំ M)',
          'បន្ថែមសញ្ញា ; នៅចុងបន្ទាត់ System.out.println និង int score = 100',
        ],
        hintsEn: [
          'Capitalize Main in public class Main',
          'Add semicolons at the ends of statements',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-syn-1',
          questionKm: 'តើសញ្ញាមួយណាដែលប្រើសម្រាប់កំណត់ចាប់ផ្តើម និងបញ្ចប់ប្លុកកូដ (Code Block) ក្នុង Java?',
          questionEn: 'Which punctuation characters denote code blocks in Java?',
          difficulty: 'easy',
          hintsKm: ['សញ្ញាវង់ក្រចកទំពក់'],
          hintsEn: ['Curly braces { and }.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("សញ្ញា: { និង }");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("{ និង } (Curly Braces)");
    }
}`,
          expectedOutput: '{ និង } (Curly Braces)',
        },
        {
          id: 'pq-syn-2',
          questionKm: 'តើសញ្ញាណាខ្លះដែលប្រើសម្រាប់សរសេរ Javadoc Comment ដែលអាចទាញយកជា HTML documentation បាន?',
          questionEn: 'What syntax marks a Javadoc documentation comment block?',
          difficulty: 'medium',
          hintsKm: ['ចាប់ផ្តើមដោយសញ្ញាក្រឡាស់ និងផ្កាយពីរ /**'],
          hintsEn: ['Begins with /** and ends with */.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បោះពុម្ពទម្រង់ Javadoc
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("/** ... */");
    }
}`,
          expectedOutput: '/** ... */',
        },
        {
          id: 'pq-syn-3',
          questionKm: 'ចូរសរសេរកម្មវិធី Java មួយដែលប្រើគ្រប់ប្រភេទ Comment ទាំង ៣ (Single-line, Multi-line, Javadoc) និងបោះពុម្ពពាក្យ "Syntax Master"។',
          questionEn: 'Write a program featuring all three comment types and outputting "Syntax Master".',
          difficulty: 'hard',
          hintsKm: ['ដាក់ Javadoc ពីលើ class, multi-line ក្នុង main, និង single-line ពីមុខ println'],
          hintsEn: ['Combine all three commenting mechanisms appropriately.'],
          starterCode: `// សរសេរកូដនៅទីនេះ
public class Main {
    public static void main(String[] args) {
        
    }
}`,
          solutionCode: `/**
 * Javadoc comment គំរូ
 */
public class Main {
    /*
     * Multi-line comment
     */
    public static void main(String[] args) {
        // Single-line comment
        System.out.println("Syntax Master");
    }
}`,
          expectedOutput: 'Syntax Master',
        },
      ],
      quizzes: [
        {
          id: 'q-syn-1',
          questionKm: 'តើឈ្មោះ Class ក្នុង Java គួរតែសរសេរតាមទម្រង់មួយណាជាស្តង់ដារ?',
          questionEn: 'Which casing convention is standard for Java class names?',
          optionsKm: ['camelCase (ឧ. studentManager)', 'PascalCase (ឧ. StudentManager)', 'snake_case (ឧ. student_manager)', 'kebab-case (ឧ. student-manager)'],
          optionsEn: ['camelCase (e.g. studentManager)', 'PascalCase (e.g. StudentManager)', 'snake_case (e.g. student_manager)', 'kebab-case (e.g. student-manager)'],
          correctOptionIndex: 1,
          explanationKm: 'តាមស្តង់ដារ Java Convention ឈ្មោះ Class ត្រូវសរសេរជា PascalCase (អក្សរធំនៅដើមពាក្យនីមួយៗ) ដូចជា StudentManager ឬ Main។',
          explanationEn: 'Java naming conventions specify PascalCase (UpperCamelCase) for all class and interface identifiers.',
          hintKm: 'អក្សរធំនៅដើមពាក្យនីមួយៗ',
          hintEn: 'PascalCase starting with a capital letter.',
        },
        {
          id: 'q-syn-2',
          questionKm: 'តើមានអ្វីកើតឡើងប្រសិនបើអ្នកភ្លេចសញ្ញា Semicolon (;) នៅចុងបន្ទាត់ឃ្លាបញ្ជា?',
          questionEn: 'What occurs if you omit a semicolon at the end of an executable statement?',
          optionsKm: ['កម្មវិធីនៅតែ Run បានដោយស្វ័យប្រវត្ត', 'កើតឡើងកំហុស Compile-time Error', 'កើតឡើងកំហុស Runtime NullPointerException', 'JVM នឹងរំលងបន្ទាត់នោះចោល'],
          optionsEn: ['The program runs automatically anyway', 'A compile-time error occurs', 'A runtime NullPointerException occurs', 'The JVM silently ignores that statement'],
          correctOptionIndex: 1,
          explanationKm: 'Java Compiler នឹងបដិសេធមិន compile កូដនោះឡើយ ដោយបង្ហាញកំហុស `\';\' expected` នៅ Compile-time។',
          explanationEn: 'The javac compiler stops with a compile-time syntax error (\';\' expected).',
          hintKm: 'កំហុសកើតឡើងមុនពេលកម្មវិធីបានរត់ (Compile-time)',
          hintEn: 'Occurs during compilation phase.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_syntax.asp',
    },
  ],
};
