import { CurriculumModule } from '../../types';

export const MODULE_6_EXCEPTIONS_COLLECTIONS: CurriculumModule = {
  id: 'mod-6',
  slug: 'exceptions-collections-generics',
  titleKm: '៦. ការគ្រប់គ្រង Exception បណ្តុំទិន្នន័យ Generics និង File I/O',
  titleEn: '6. Exceptions, Collections, Generics & File Handling',
  descriptionKm: 'ជំនាញកម្រិតខ្ពស់សម្រាប់សាងសង់កម្មវិធីពិត៖ ការពារកម្មវិធីមិនឱ្យគាំងជាមួយ Try-Catch, ការប្រើ ArrayList/HashMap, Generics និងការអាន/សរសេរ Files។',
  descriptionEn: 'Production-grade fundamentals: defensive exception handling, collections framework (ArrayList/HashMap), generics, and modern file I/O.',
  icon: 'Database',
  level: 'intermediate',
  lessons: [
    {
      id: 'java-exceptions-handling',
      slug: 'java-exceptions-handling',
      moduleSlug: 'exceptions-collections-generics',
      order: 1,
      titleKm: 'ការគ្រប់គ្រង Exception (Exception Handling & try-catch-finally)',
      titleEn: 'Exception Handling: try-catch-finally & Custom Exceptions',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីឋានានុក្រម Exception: Checked vs Unchecked (Runtime) Exceptions',
        'ចេះប្រើប្រាស់ try, catch, finally និង Try-with-resources ដើម្បីការពារកម្មវិធីមិនឱ្យគាំង',
        'ស្គាល់ពីភាពខុសគ្នារវាង `throw` និង `throws` និងការបង្កើត Custom Exception',
      ],
      objectivesEn: [
        'Master the Throwable hierarchy: Checked exceptions vs Unchecked RuntimeExceptions',
        'Safely catch anomalies via try, catch, finally, and modern try-with-resources',
        'Distinguish throw vs throws keywords and implement custom domain exceptions',
      ],
      summaryKm: 'Exception គឺជាព្រឹត្តិការណ៍មិនប្រក្រតីដែលកើតឡើងពេលកម្មវិធីកំពុងដំណើរការ។ ការគ្រប់គ្រង Exception ជួយឱ្យកម្មវិធីដំណើរការទៅមុខដោយរលូន មិនគាំងកណ្តាលផ្លូវ។',
      summaryEn: 'Exceptions disrupt normal application flow. Handle errors defensively with try-catch-finally blocks.',
      contentKm: `### ១. អ្វីទៅជា Exception?
នៅពេលមានកំហុសកើតឡើងនៅពេលរត់ (ដូចជា ចែកនឹងសូន្យ ឬអាន file ដែលគ្មាន) JVM នឹងបង្កើត **Exception Object** មួយ ហើយបោះវាចេញមក (Throw)។ បើគ្មានកូដណាទទួលចាប់ (Catch) វាទេ កម្មវិធីនឹងគាំងភ្លាមៗ (Crash)។

### ២. Checked vs Unchecked Exceptions
- **Unchecked Exceptions (RuntimeException):** កំហុសដែលបណ្តាលមកពីតក្កវិជ្ជារបស់អ្នកសរសេរកូដ (ដូចជា \`NullPointerException\`, \`ArithmeticException\`, \`ArrayIndexOutOfBoundsException\`)។ Compiler មិនបង្ខំឱ្យ try-catch ទេ។
- **Checked Exceptions (Exception ដទៃទៀត):** កំហុសដែលបណ្តាលមកពីកត្តាខាងក្រៅ (ដូចជា \`FileNotFoundException\`, \`SQLException\`)។ Compiler បង្ខំឱ្យអ្នកត្រូវតែដោះស្រាយដោយប្រើ \`try-catch\` ឬប្រកាស \`throws\` ជាដាច់ខាត!

### ៣. រចនាសម្ព័ន្ធ try-catch-finally
\`\`\`java
try {
    // កូដដែលអាចមានហានិភ័យ
} catch (ArithmeticException e) {
    // ដោះស្រាយកំហុសលេខ
} catch (Exception e) {
    // ចាប់កំហុសទូទៅ
} finally {
    // ដំណើរការជានិច្ច ទោះបីមានកំហុស ឬអត់ក៏ដោយ (សម្រាប់បិទ Connection)
}
\`\`\`

### ៤. throw vs throws
- \`throw\` : ពាក្យបញ្ជាសម្រាប់បោះ Exception ជាក់ស្តែងមួយចេញមកដោយផ្ទាល់ដៃ (\`throw new IllegalArgumentException("...");\`)។
- \`throws\` : ប្រកាសនៅចុងក្បាល Method ដើម្បីព្រមានអ្នកហៅថា Method នេះអាចនឹងបោះ Checked Exception ណាមួយ។`,
      contentEn: `Learn defensive programming with try-catch-finally, checked vs runtime exceptions, automatic resource management, and custom exception classes.`,
      syntax: `// Try-with-resources
try (Scanner scanner = new Scanner(System.in)) {
    // ធនធាននឹងត្រូវបិទដោយស្វ័យប្រវត្តិ
} catch (Exception e) {
    System.err.println("កំហុស: " + e.getMessage());
}`,
      vocabulary: [
        {
          term: 'Checked Exception',
          khmerTerm: 'Exception ត្រួតពិនិត្យជាមុន',
          definitionKm: 'កំហុសដែល Java Compiler បង្ខំឱ្យអ្នកសរសេរកូដគ្រប់គ្រងតាម try-catch ឬ throws មុននឹង compile',
          definitionEn: 'Exceptions checked at compile time inheriting from Exception (excluding RuntimeException).',
        },
        {
          term: 'Unchecked Exception',
          khmerTerm: 'Exception ពេលដំណើរការ (Runtime)',
          definitionKm: 'កំហុសដែលកើតឡើងពេលរត់កម្មវិធី ដែលស្នងពី RuntimeException (មិនបង្ខំឱ្យ try-catch ទេ)',
          definitionEn: 'Exceptions occurring at runtime inheriting from RuntimeException.',
        },
        {
          term: 'Try-with-resources',
          khmerTerm: 'Try គ្រប់គ្រងធនធានស្វ័យប្រវត្តិ',
          definitionKm: 'ទម្រង់ try ពិសេសដែលធានាថាធនធាន (File, Stream) នឹងត្រូវបិទ (.close()) ដោយស្វ័យប្រវត្តិ',
          definitionEn: 'A try statement that declares one or more resources automatically closed at completion.',
        },
      ],
      examples: [
        {
          title: 'ការគ្រប់គ្រង Exception សុវត្ថិភាព និង Custom Exception',
          code: `// ១. បង្កើត Custom Exception ផ្ទាល់ខ្លួន
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

class BankAccount {
    private double balance;

    public BankAccount(double balance) {
        this.balance = balance;
    }

    // Method ប្រកាស throws Custom Exception
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            // បោះ Custom Exception
            throw new InsufficientFundsException(
                String.format("សមតុល្យមិនគ្រប់គ្រាន់! ខ្វះចំនួន: $%.2f", (amount - balance))
            );
        }
        balance -= amount;
        System.out.printf("ដកប្រាក់ជោគជ័យ: -$%.2f | នៅសល់: $%.2f%n", amount, balance);
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount myAcc = new BankAccount(100.0);

        // ២. គ្រប់គ្រងដោយ try-catch-finally
        try {
            System.out.println("ប្រតិបត្តិការទី ១: ដក $40");
            myAcc.withdraw(40.0);

            System.out.println("ប្រតិបត្តិការទី ២: ដក $80 (លើសសមតុល្យ)");
            myAcc.withdraw(80.0); // នឹងបោះ Exception
            
            System.out.println("បន្ទាត់នេះនឹងមិនដំណើរការឡើយ");
        } catch (InsufficientFundsException e) {
            System.out.println("🚨 ចាប់បានកំហុស: " + e.getMessage());
        } finally {
            System.out.println("🔒 ប្លុក finally ដំណើរការជានិច្ច: បញ្ចប់ប្រតិបត្តិការធនាគារ។");
        }

        System.out.println("កម្មវិធីនៅតែដំណើរការបន្តដោយសុវត្ថិភាព!");
    }
}`,
          explanationKm: 'កូដនេះបង្ហាញពីការបង្កើត `InsufficientFundsException`, ការប្រើ `throw new`, និង `try-catch-finally` ការពារមិនឱ្យកម្មវិធីគាំង។',
          explanationEn: 'Demonstrates throwing a custom checked exception, catching it gracefully, and running cleanups in the finally block.',
          lineByLineExplanation: [
            {
              line: 'class InsufficientFundsException extends Exception',
              explanationKm: 'បង្កើត Checked Custom Exception ស្នងពី Exception។',
              explanationEn: 'Declares custom checked domain exception class.',
            },
            {
              line: 'throw new InsufficientFundsException(...);',
              explanationKm: 'បង្កើត Object Exception ហើយបោះវាចេញភ្លាមៗពេលសមតុល្យមិនគ្រប់។',
              explanationEn: 'Instantiates and throws domain exception object.',
            },
            {
              line: 'finally { ... }',
              explanationKm: 'ប្លុក finally ត្រូវបានធានាថានឹងដំណើរការ ១០០% ជានិច្ច មិនថាមានកំហុសឬអត់។',
              explanationEn: 'Finally block executes unconditionally ensuring teardown cleanups.',
            },
          ],
          expectedOutput: `ប្រតិបត្តិការទី ១: ដក $40
ដកប្រាក់ជោគជ័យ: -$40.00 | នៅសល់: $60.00
ប្រតិបត្តិការទី ២: ដក $80 (លើសសមតុល្យ)
🚨 ចាប់បានកំហុស: សមតុល្យមិនគ្រប់គ្រាន់! ខ្វះចំនួន: $20.00
🔒 ប្លុក finally ដំណើរការជានិច្ច: បញ្ចប់ប្រតិបត្តិការធនាគារ។
កម្មវិធីនៅតែដំណើរការបន្តដោយសុវត្ថិភាព!`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការចាប់ Exception តែមិនដោះស្រាយ (Silent Exception Swallowing)',
          titleEn: 'Empty catch block silently swallowing exceptions',
          badCode: `try {
    int res = 10 / 0;
} catch (Exception e) {
    // ទុកទទេ មិនសរសេរអ្វីទាំងអស់! គ្រោះថ្នាក់បំផុត
}`,
          goodCode: `try {
    int res = 10 / 0;
} catch (ArithmeticException e) {
    System.err.println("កំហុសគណិតវិទ្យា: " + e.getMessage());
    // ឬកត់ត្រាក្នុង Log File
}`,
          explanationKm: 'ការទុកប្លុក catch ទទេ (Swallowing) ធ្វើឱ្យអ្នកមិនដឹងថាកម្មវិធីខូចនៅត្រង់ណាឡើយ។ យ៉ាងហោចណាស់ត្រូវបោះពុម្ពសារ ឬកត់ត្រា Log ជានិច្ច។',
          explanationEn: 'Never leave catch blocks empty. At minimum log the error or rethrow to avoid masking failures.',
        },
      ],
      exercise: {
        id: 'ex-exc-1',
        titleKm: 'បម្លែងអត្ថបទទៅជាលេខដោយសុវត្ថិភាព (Safe Number Parser)',
        titleEn: 'Safe String-to-Integer Parser with Try-Catch',
        descriptionKm: 'សរសេរ Method `public static int parseSafeInt(String text, int defaultValue)` ដែលបម្លែង String ទៅ int ដោយប្រើ `Integer.parseInt(text)`។ ប្រសិនបើមានកំហុស `NumberFormatException` សូមចាប់វា ហើយ return `defaultValue`។',
        descriptionEn: 'Implement safe integer parsing using try-catch to return a fallback default on NumberFormatException.',
        starterCode: `public class Main {
    public static int parseSafeInt(String text, int defaultValue) {
        // ប្រើ try-catch
        return 0;
    }

    public static void main(String[] args) {
        // តេស្ត parse "123" និង "abc"
    }
}`,
        solutionCode: `public class Main {
    public static int parseSafeInt(String text, int defaultValue) {
        try {
            return Integer.parseInt(text);
        } catch (NumberFormatException e) {
            System.out.println("⚠️ មិនអាចបម្លែង '" + text + "' ទៅជាលេខបានទេ! ប្រើតម្លៃលំនាំដើម: " + defaultValue);
            return defaultValue;
        }
    }

    public static void main(String[] args) {
        int val1 = parseSafeInt("123", 0);
        int val2 = parseSafeInt("khmer_code", 99);

        System.out.println("តម្លៃ ១: " + val1);
        System.out.println("តម្លៃ ២: " + val2);
    }
}`,
        expectedOutput: `⚠️ មិនអាចបម្លែង 'khmer_code' ទៅជាលេខបានទេ! ប្រើតម្លៃលំនាំដើម: 99
តម្លៃ ១: 123
តម្លៃ ២: 99`,
        hintsKm: [
          'ដាក់ `Integer.parseInt(text)` ក្នុងប្លុក `try`',
          'ចាប់ `catch (NumberFormatException e)` រួច `return defaultValue;`',
        ],
        hintsEn: [
          'Enclose Integer.parseInt(text) in try block',
          'Catch NumberFormatException and return defaultValue',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-exc-1',
          questionKm: 'តើប្លុកណាដែលត្រូវបានធានាថានឹងដំណើរការជានិច្ច ទោះបីមាន Exception កើតឡើង ឬមិនកើតឡើងក៏ដោយ?',
          questionEn: 'Which block is guaranteed to execute regardless of whether an exception was thrown?',
          difficulty: 'easy',
          hintsKm: ['ពាក្យមានន័យថា "ជាចុងក្រោយ"'],
          hintsEn: ['finally block.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("finally");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("finally");
    }
}`,
          expectedOutput: 'finally',
        },
        {
          id: 'pq-exc-2',
          questionKm: 'តើ `throw` និង `throws` ខុសគ្នាយ៉ាងដូចម្តេចក្នុង Java Syntax?',
          questionEn: 'What is the syntax difference between throw and throws?',
          difficulty: 'medium',
          hintsKm: ['throw ប្រើក្នុងតួកូដដើម្បីបោះ Object, throws ប្រើនៅក្បាល method ដើម្បីប្រកាសប្រភេទ exception'],
          hintsEn: ['throw triggers an exception object; throws declares potential checked exceptions in method header.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បោះពុម្ពភាពខុសគ្នា
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("throw ប្រើក្នុង method ដើម្បីបោះ Exception Object ជាក់ស្តែង; throws ប្រើនៅក្បាល Method ដើម្បីប្រកាសព្រមាន!");
    }
}`,
          expectedOutput: 'throw ប្រើក្នុង method ដើម្បីបោះ Exception Object ជាក់ស្តែង; throws ប្រើនៅក្បាល Method ដើម្បីប្រកាសព្រមាន!',
        },
        {
          id: 'pq-exc-3',
          questionKm: 'ចូរបង្ហាញការចាប់ Exception ច្រើនបែប (Multi-catch Block) ដោយប្រើសញ្ញារបារបញ្ឈរ (`|`) ក្នុង Java 7+។',
          questionEn: 'Demonstrate multi-catch syntax using the single vertical pipe (|) operator.',
          difficulty: 'hard',
          hintsKm: ['ប្រើ `catch (ArithmeticException | NullPointerException e)`'],
          hintsEn: ['Group multiple exception types using pipe separator.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // សរសេរ multi-catch block
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        try {
            String s = null;
            if (s == null) throw new NullPointerException("អថេរទទេ (null)");
        } catch (ArithmeticException | NullPointerException e) {
            System.out.println("ចាប់បានកំហុសតាម Multi-catch: " + e.getClass().getSimpleName() + " -> " + e.getMessage());
        }
    }
}`,
          expectedOutput: 'ចាប់បានកំហុសតាម Multi-catch: NullPointerException -> អថេរទទេ (null)',
        },
      ],
      quizzes: [
        {
          id: 'q-exc-1',
          questionKm: 'តើ Class មេកំពូលនៃរាល់កំហុស និង Exception ទាំងអស់ក្នុង Java ឈ្មោះអ្វី?',
          questionEn: 'What is the root superclass of all exceptions and errors in Java?',
          optionsKm: ['java.lang.Throwable', 'java.lang.Exception', 'java.lang.Error', 'java.lang.RuntimeException'],
          optionsEn: ['java.lang.Throwable', 'java.lang.Exception', 'java.lang.Error', 'java.lang.RuntimeException'],
          correctOptionIndex: 0,
          explanationKm: '`java.lang.Throwable` គឺជា Class មេកំពូលនៃកំហុសទាំងអស់ ដែលបែកជាពីរសាខាគឺ Exception និង Error។',
          explanationEn: 'Throwable is the ultimate root of the Java error and exception hierarchy.',
          hintKm: 'ពាក្យ Throwable (អ្វីដែលអាចបោះបាន)',
          hintEn: 'java.lang.Throwable.',
        },
        {
          id: 'q-exc-2',
          questionKm: 'តើមួយណាជា Unchecked Exception (RuntimeException)?',
          questionEn: 'Which of the following is an unchecked RuntimeException?',
          optionsKm: ['NullPointerException', 'IOException', 'SQLException', 'FileNotFoundException'],
          optionsEn: ['NullPointerException', 'IOException', 'SQLException', 'FileNotFoundException'],
          correctOptionIndex: 0,
          explanationKm: 'NullPointerException ស្នងពី RuntimeException ដូច្នេះវាជា Unchecked Exception ដែលមិនតម្រូវឱ្យ try-catch ជាកាតព្វកិច្ចឡើយ។',
          explanationEn: 'NullPointerException extends RuntimeException and is therefore unchecked at compile time.',
          hintKm: 'កំហុសចង្អុលលើតម្លៃ null',
          hintEn: 'NullPointerException.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_try_catch.asp',
    },
    {
      id: 'java-collections-arraylist',
      slug: 'java-collections-arraylist',
      moduleSlug: 'exceptions-collections-generics',
      order: 2,
      titleKm: 'បណ្តុំទិន្នន័យ ArrayList និង LinkedList (Collections: List Interface)',
      titleEn: 'Java Collections: ArrayList & LinkedList',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពី Java Collections Framework និងចំណុចខ្លាំងរបស់ ArrayList ធៀបនឹង Array ធម្មតា (Dynamic Resizing)',
        'ចេះប្រើប្រាស់ Methods សំខាន់ៗ: add, get, set, remove, size, contains, clear',
        'ស្គាល់ពីភាពខុសគ្នារវាង ArrayList (លឿនខាង get random access) និង LinkedList (លឿនខាង add/remove ដើមជួរ)',
      ],
      objectivesEn: [
        'Understand the Java Collections Framework and dynamic resizing in ArrayList',
        'Master essential List methods: add(), get(), set(), remove(), size(), and contains()',
        'Contrast ArrayList (fast random access O(1)) with LinkedList (fast insertion/deletion O(1))',
      ],
      summaryKm: 'ខុសពី Array ធម្មតាដែលមានទំហំថេរ ArrayList អាចពង្រីក និងបង្រួមទំហំរបស់វាដោយស្វ័យប្រវត្តិនៅពេលអ្នកបន្ថែម ឬលុបទិន្នន័យ។',
      summaryEn: 'ArrayList is a resizable dynamic array implementing the List interface, ideal for flexible collections.',
      contentKm: `### ១. ហេតុអ្វីត្រូវប្រើ ArrayList?
Array ធម្មតាមានគុណវិបត្តិធំបំផុតគឺ **ទំហំថេរ (Fixed-size)**។ នៅពេលអ្នកចង់បន្ថែមធាតុទី ៦ ទៅក្នុង Array ទំហំ ៥ អ្នកត្រូវបង្កើត Array ថ្មីចម្លងទិន្នន័យ។
\`ArrayList\` ដោះស្រាយបញ្ហានេះដោយពង្រីកទំហំខាងក្នុង (Internal Capacity) ដោយស្វ័យប្រវត្តិរាល់ពេលពេញ!

\`\`\`java
import java.util.ArrayList;

ArrayList<String> students = new ArrayList<>();
\`\`\`

### ២. Methods សំខាន់ៗ
- \`add(element)\` : បន្ថែមធាតុទៅចុងបញ្ជី
- \`add(index, element)\` : បន្ថែមធាតុនៅទីតាំងជាក់លាក់
- \`get(index)\` : ទាញយកធាតុនៅ Index នោះមកមើល
- \`set(index, newElement)\` : ផ្លាស់ប្តូរតម្លៃធាតុនៅ Index នោះ
- \`remove(index)\` ឬ \`remove(object)\` : លុបធាតុចេញ
- \`size()\` : ចំនួនធាតុបច្ចុប្បន្ន (ដូច length របស់ array)
- \`contains(object)\` : ពិនិត្យថាមានវត្តមានធាតុឬអត់ (true/false)

### ៣. ArrayList vs LinkedList
- **ArrayList:** ផ្ទុកទិន្នន័យក្នុង Contiguous Array ខាងក្នុង។ ល្បឿនអាន \`get(index)\` លឿនបំផុត \`O(1)\`។
- **LinkedList:** ផ្ទុកទិន្នន័យជា Nodes តភ្ជាប់គ្នា (Doubly-linked List)។ ល្បឿនបន្ថែម/លុបនៅក្បាល ឬកន្ទុយ \`addFirst() / removeFirst()\` លឿនបំផុត \`O(1)\`។`,
      contentEn: `Explore dynamic arrays with ArrayList, indexed manipulations, and algorithmic trade-offs against doubly-linked LinkedLists.`,
      syntax: `List<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");
String first = list.get(0);
list.remove("Python");`,
      vocabulary: [
        {
          term: 'Dynamic Array',
          khmerTerm: 'អារេបត់បែនទំហំស្វ័យប្រវត្ត',
          definitionKm: 'រចនាសម្ព័ន្ធទិន្នន័យអារេដែលអាចពង្រីកផ្ទៃផ្ទុកដោយស្វ័យប្រវត្តិពេលទិន្នន័យកើនឡើង',
          definitionEn: 'An array data structure that automatically resizes itself when capacity is reached.',
        },
        {
          term: 'List Interface',
          khmerTerm: 'ចំណុចប្រទាក់បញ្ជី (List)',
          definitionKm: 'កិច្ចសន្យា Collection ដែលរក្សាលំដាប់ទិន្នន័យតាម Index និងអនុញ្ញាតឱ្យមានធាតុស្ទួនគ្នា',
          definitionEn: 'An ordered collection allowing positional access and duplicate elements.',
        },
        {
          term: 'Autoboxing',
          khmerTerm: 'ការវេចខ្ចប់ Primitive ស្វ័យប្រវត្តិ',
          definitionKm: 'យន្តការរបស់ Java ដែលបម្លែង primitive (int) ទៅជា Wrapper Object (Integer) ដោយស្វ័យប្រវត្តិ',
          definitionEn: 'Automatic conversion that Java makes between primitive types and their corresponding wrapper classes.',
        },
      ],
      examples: [
        {
          title: 'ការគ្រប់គ្រងបញ្ជីទំនិញតាម ArrayList និងការតម្រៀប',
          code: `import java.util.ArrayList;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        // បង្កើត ArrayList ផ្ទុកខ្សែអក្សរ
        ArrayList<String> fruits = new ArrayList<>();

        // ១. បន្ថែមធាតុ (add)
        fruits.add("ស្វាយ");
        fruits.add("ចេក");
        fruits.add("ទុរេន");
        fruits.add("មៀន");
        System.out.println("បញ្ជីដើម: " + fruits);
        System.out.println("ចំនួនធាតុ: " + fruits.size());

        // ២. អាន និងកែប្រែ (get, set)
        System.out.println("ផ្លែឈើទី ១: " + fruits.get(0));
        fruits.set(1, "ស្រកានាគ"); // ប្តូរ "ចេក" ទៅ "ស្រកានាគ"
        System.out.println("ក្រោយកែប្រែ: " + fruits);

        // ៣. លុបធាតុ (remove)
        fruits.remove("មៀន");
        System.out.println("ក្រោយលុបមៀន: " + fruits);

        // ៤. តម្រៀបតាមលំដាប់អក្ខរក្រម
        Collections.sort(fruits);
        System.out.println("ក្រោយតម្រៀប: " + fruits);

        // ៥. Iteration តាម For-each
        System.out.println("=== បញ្ជីផ្លែឈើលើទីផ្សារ ===");
        for (int i = 0; i < fruits.size(); i++) {
            System.out.printf("%d. %s%n", (i + 1), fruits.get(i));
        }
    }
}`,
          explanationKm: 'បង្ហាញពីគ្រប់សកម្មភាព CRUD (Create, Read, Update, Delete) លើ `ArrayList` និងការតម្រៀបតាម `Collections.sort()`។',
          explanationEn: 'Demonstrates complete CRUD operations and sorting on an ArrayList collection.',
          lineByLineExplanation: [
            {
              line: 'ArrayList<String> fruits = new ArrayList<>();',
              explanationKm: 'ប្រកាស ArrayList សម្រាប់ផ្ទុក String ដោយប្រើ Diamond Operator <>។',
              explanationEn: 'Creates a generic ArrayList storing String instances.',
            },
            {
              line: 'fruits.set(1, "ស្រកានាគ");',
              explanationKm: 'ជំនួសធាតុនៅ Index 1 ដោយពាក្យថ្មី។',
              explanationEn: 'Updates value at index 1 in place.',
            },
            {
              line: 'Collections.sort(fruits);',
              explanationKm: 'តម្រៀបធាតុទាំងអស់ក្នុង List តាមលំដាប់ធម្មជាតិ។',
              explanationEn: 'Sorts list elements lexicographically in ascending order.',
            },
          ],
          expectedOutput: `បញ្ជីដើម: [ស្វាយ, ចេក, ទុរេន, មៀន]
ចំនួនធាតុ: 4
ផ្លែឈើទី ១: ស្វាយ
ក្រោយកែប្រែ: [ស្វាយ, ស្រកានាគ, ទុរេន, មៀន]
ក្រោយលុបមៀន: [ស្វាយ, ស្រកានាគ, ទុរេន]
ក្រោយតម្រៀប: [ទុរេន, ស្រកានាគ, ស្វាយ]
=== បញ្ជីផ្លែឈើលើទីផ្សារ ===
1. ទុរេន
2. ស្រកានាគ
3. ស្វាយ`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការប្រើប្រាស់ Primitive Types ផ្ទាល់ក្នុង Generic Collections',
          titleEn: 'Attempting to use primitive types as generic type arguments',
          badCode: `ArrayList<int> list = new ArrayList<>(); // កំហុស Compile Error!
// Primitive Types មិនអាចដាក់ក្នុង Generic បានឡើយ`,
          goodCode: `// ត្រូវប្រើ Wrapper Classes ជំនួស:
ArrayList<Integer> list = new ArrayList<>(); // ត្រឹមត្រូវ (int -> Integer)
ArrayList<Double> prices = new ArrayList<>(); // ត្រឹមត្រូវ (double -> Double)`,
          explanationKm: 'Java Collections គាំទ្រតែ Objects ប៉ុណ្ណោះ។ ដើម្បីផ្ទុកលេខគត់ ឬទសភាគ ត្រូវប្រើ Wrapper Classes ដូចជា Integer, Double, Boolean ជំនួស int, double, boolean។',
          explanationEn: 'Java generics require reference types. Use boxed wrapper classes (Integer, Double) instead of primitives.',
        },
      ],
      exercise: {
        id: 'ex-list-1',
        titleKm: 'កម្មវិធីគ្រប់គ្រងបញ្ជីការងារត្រូវធ្វើ (Todo List Manager)',
        titleEn: 'Interactive Todo List with ArrayList',
        descriptionKm: 'ចូរបង្កើត `ArrayList<String> tasks` បន្ថែមការងារ ៣ យ៉ាង លុបការងារទីមួយដែលបានធ្វើរួចចេញ ហើយពិនិត្យមើលថា តើមានការងារឈ្មោះ "រៀន Java" នៅសល់ឬអត់។',
        descriptionEn: 'Manage tasks with ArrayList: add 3 items, remove completed item, and check contains().',
        starterCode: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> tasks = new ArrayList<>();
        // បន្ថែមការងារ និងដោះស្រាយ
    }
}`,
        solutionCode: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> tasks = new ArrayList<>();

        tasks.add("ហាត់ប្រាណពេលព្រឹក");
        tasks.add("រៀន Java 21 នៅ Khmer Java Academy");
        tasks.add("អានសៀវភៅ ៣០ នាទី");

        System.out.println("ការងារសរុប: " + tasks.size());
        System.out.println("បញ្ជីការងារ: " + tasks);

        // បញ្ចប់ការងារទី ១
        tasks.remove(0);
        System.out.println("ក្រោយលុបការងារទី ១: " + tasks);

        // ពិនិត្យវត្តមាន
        boolean hasJava = tasks.contains("រៀន Java 21 នៅ Khmer Java Academy");
        System.out.println("នៅសល់ការងាររៀន Java: " + hasJava);
    }
}`,
        expectedOutput: `ការងារសរុប: 3
បញ្ជីការងារ: [ហាត់ប្រាណពេលព្រឹក, រៀន Java 21 នៅ Khmer Java Academy, អានសៀវភៅ ៣០ នាទី]
ក្រោយលុបការងារទី ១: [រៀន Java 21 នៅ Khmer Java Academy, អានសៀវភៅ ៣០ នាទី]
នៅសល់ការងាររៀន Java: true`,
        hintsKm: [
          'ប្រើ `tasks.add(...)` សម្រាប់បន្ថែម',
          'ប្រើ `tasks.remove(0)` ដើម្បីលុបការងារទី ១',
          'ប្រើ `tasks.contains(...)` ត្រួតពិនិត្យវត្តមាន',
        ],
        hintsEn: [
          'Use tasks.add() to insert',
          'Use tasks.remove(0) to remove first',
          'Check with tasks.contains()',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-list-1',
          questionKm: 'តើ Method មួយណាដែលប្រើសម្រាប់ដឹងពីចំនួនធាតុសរុបក្នុង ArrayList?',
          questionEn: 'Which method returns the number of elements in an ArrayList?',
          difficulty: 'easy',
          hintsKm: ['Method size() មានវង់ក្រចក'],
          hintsEn: ['size() method.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("size()");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("size()");
    }
}`,
          expectedOutput: 'size()',
        },
        {
          id: 'pq-list-2',
          questionKm: 'តើ ArrayList និង LinkedList មួយណាមានប្រសិទ្ធភាពជាងសម្រាប់ការទាញយកធាតុចៃដន្យ `get(index)`?',
          questionEn: 'Which is faster for random access via get(index): ArrayList or LinkedList?',
          difficulty: 'medium',
          hintsKm: ['ArrayList ប្រើ Contiguous Array ចូលដល់ Index ភ្លាម O(1) រីឯ LinkedList ត្រូវដើររាប់ពីក្បាល O(N)'],
          hintsEn: ['ArrayList offers O(1) constant time random access.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បោះពុម្ពចម្លើយ
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("ArrayList មានល្បឿនលឿនជាង (O(1) Constant Time) ដោយសារវាប្រើ Contiguous Memory Array!");
    }
}`,
          expectedOutput: 'ArrayList មានល្បឿនលឿនជាង (O(1) Constant Time) ដោយសារវាប្រើ Contiguous Memory Array!',
        },
        {
          id: 'pq-list-3',
          questionKm: 'ចូរបង្ហាញកូដលុបលេខគូទាំងអស់ចេញពី `ArrayList<Integer>` ដោយប្រើ Iterator ឬ removeIf() ដើម្បីចៀសវាងកំហុស ConcurrentModificationException។',
          questionEn: 'Safely remove all even numbers from an ArrayList using removeIf().',
          difficulty: 'hard',
          hintsKm: ['ប្រើ `list.removeIf(n -> n % 2 == 0);`'],
          hintsEn: ['Call list.removeIf(n -> n % 2 == 0).'],
          starterCode: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8));
        // លុបលេខគូ
    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8));
        nums.removeIf(n -> n % 2 == 0);
        System.out.println("បញ្ជីក្រោយលុបលេខគូ: " + nums);
    }
}`,
          expectedOutput: 'បញ្ជីក្រោយលុបលេខគូ: [1, 3, 5, 7]',
        },
      ],
      quizzes: [
        {
          id: 'q-list-1',
          questionKm: 'តើ Collection មួយណាដែលអនុញ្ញាតឱ្យមានធាតុស្ទួនគ្នា (Duplicates) និងរក្សាលំដាប់នៃការបញ្ចូល?',
          questionEn: 'Which collection type preserves insertion order and permits duplicate elements?',
          optionsKm: ['List (ArrayList)', 'Set (HashSet)', 'Map (HashMap Keys)', 'TreeSet'],
          optionsEn: ['List (ArrayList)', 'Set (HashSet)', 'Map (HashMap Keys)', 'TreeSet'],
          correctOptionIndex: 0,
          explanationKm: 'List (ដូចជា ArrayList) រក្សាលំដាប់តាម Index និងអនុញ្ញាតឱ្យមានធាតុស្ទួនគ្នា។ រីឯ Set មិនអនុញ្ញាតឱ្យស្ទួនឡើយ។',
          explanationEn: 'Lists permit duplicate elements and maintain ordered sequential indexing.',
          hintKm: 'អនុញ្ញាតឱ្យស្ទួន និងមាន index',
          hintEn: 'List interface.',
        },
        {
          id: 'q-list-2',
          questionKm: 'តើ Wrapper Class ណាដែលត្រូវប្រើសម្រាប់បង្កើត `ArrayList` ផ្ទុកទិន្នន័យប្រភេទ `char`?',
          questionEn: 'Which wrapper class matches the primitive char for use in generic collections?',
          optionsKm: ['Character', 'Char', 'String', 'Letter'],
          optionsEn: ['Character', 'Char', 'String', 'Letter'],
          correctOptionIndex: 0,
          explanationKm: 'Wrapper Class របស់ primitive `char` គឺ `java.lang.Character` (សរសេរពាក្យពេញ)។',
          explanationEn: 'The boxed reference wrapper for char is Character.',
          hintKm: 'ពាក្យពេញ Character',
          hintEn: 'Character wrapper.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_arraylist.asp',
    },
    {
      id: 'java-collections-hashmap-set',
      slug: 'java-collections-hashmap-set',
      moduleSlug: 'exceptions-collections-generics',
      order: 3,
      titleKm: 'ផែនទីទិន្នន័យ HashMap និង HashSet (Key-Value Maps & Unique Sets)',
      titleEn: 'Java HashMap & HashSet: Fast Lookups & Unique Sets',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីរចនាសម្ព័ន្ធ Key-Value Pair របស់ HashMap និងល្បឿនស្វែងរក O(1)',
        'ចេះប្រើប្រាស់ HashSet ដើម្បីកម្ចាត់ធាតុស្ទួន (Duplicate Elimination)',
        'យល់ពីសារៈសំខាន់នៃ hashCode() និង equals() ក្នុងការស្វែងរកទិន្នន័យក្នុង Hash Bucket',
      ],
      objectivesEn: [
        'Master key-value dictionary mappings and O(1) average lookup performance with HashMap',
        'Use HashSet for fast unique membership testing and duplicate elimination',
        'Understand the equals() and hashCode() contract governing hash table buckets',
      ],
      summaryKm: 'HashMap ផ្ទុកទិន្នន័យជាគូ Key-Value សម្រាប់ស្វែងរកយ៉ាងរហ័សបំផុត។ ចំណែក HashSet ផ្ទុកតែធាតុប្លែកៗពីគ្នាដោយស្វ័យប្រវត្តិ។',
      summaryEn: 'HashMap provides lightning-fast key-value lookups; HashSet guarantees a set of unique elements without duplicates.',
      contentKm: `### ១. ផែនទីទិន្នន័យ HashMap<K, V>
HashMap ផ្ទុកទិន្នន័យជាគូ **Key-Value Pair**៖
- **Key (កូនសោរ):** ត្រូវតែប្លែកពីគ្នា (Unique) មិនអាចស្ទួនបានឡើយ។
- **Value (តម្លៃ):** អាចស្ទួនគ្នាបាន។
- **ល្បឿន:** ដោយសារវាប្រើក្បួន Hashing ល្បឿនស្វែងរក \`get(key)\` ជាមធ្យមគឺ **O(1) Constant Time**!

\`\`\`java
HashMap<String, Double> exchangeRates = new HashMap<>();
exchangeRates.put("USD", 1.0);
exchangeRates.put("KHR", 4100.0);
double khr = exchangeRates.get("KHR"); // 4100.0
\`\`\`

### ២. បណ្តុំធាតុមិនស្ទួន HashSet<E>
HashSet គឺជារចនាសម្ព័ន្ធទិន្នន័យដែល៖
- មិនអនុញ្ញាតឱ្យមានធាតុស្ទួនគ្នាឡើយ (No Duplicates)។
- មិនរក្សាលំដាប់នៃការបញ្ចូលទេ (Unordered)។
- ស័ក្តិសមបំផុតសម្រាប់ពិនិត្យមើលថាតើទិន្នន័យមានវត្តមានរួចហើយឬនៅ (\`set.contains(item)\`)។

### ៣. កិច្ចសន្យា hashCode() និង equals()
នៅពេលអ្នកដាក់ Key ចូលទៅក្នុង HashMap ឬ HashSet៖
1. JVM ហៅ \`key.hashCode()\` ដើម្បីគណនារកលេខសម្គាល់ Bucket ផ្ទុកទិន្នន័យ។
2. ប្រសិនបើមាន Bucket ជាន់គ្នា (Collision) JVM នឹងហៅ \`key.equals(otherKey)\` ដើម្បីបញ្ជាក់ថា Key ទាំងពីរដូចគ្នាពិតប្រាកដឬអត់។`,
      contentEn: `Learn hash table mechanics, bucket distribution, key uniqueness constraints, and high-speed membership testing.`,
      syntax: `// HashMap
Map<String, Integer> map = new HashMap<>();
map.put("Angkor", 1113);
int year = map.getOrDefault("Angkor", 0);

// HashSet
Set<String> uniqueTags = new HashSet<>();
uniqueTags.add("java");
uniqueTags.add("java"); // នឹងត្រូវច្រានចោលព្រោះស្ទួន`,
      vocabulary: [
        {
          term: 'Key-Value Pair',
          khmerTerm: 'គូកូនសោរ និងតម្លៃ',
          definitionKm: 'ការផ្សារភ្ជាប់គ្នារវាងកូនសោរស្វែងរក (Key) និងតម្លៃទិន្នន័យ (Value)',
          definitionEn: 'An association between a unique identifier key and an associated data value.',
        },
        {
          term: 'Hashing',
          khmerTerm: 'ក្បួនកូដហាស (Hashing)',
          definitionKm: 'ក្បួនគណិតវិទ្យាដែលបម្លែងទិន្នន័យ Object ទៅជាលេខកូដគត់ hashCode សម្រាប់រកទីតាំងផ្ទុក',
          definitionEn: 'Transforming an object into an integer hash value used to index hash buckets.',
        },
        {
          term: 'Hash Collision',
          khmerTerm: 'ការជាន់គ្នានៃលេខកូដ Hash',
          definitionKm: 'ស្ថានភាពដែល Keys ពីរផ្សេងគ្នាផ្តល់តម្លៃ hashCode ដូចគ្នាធ្លាក់ចូល Bucket តែមួយ',
          definitionEn: 'When two distinct keys produce the same hash code slotting into the same bucket.',
        },
      ],
      examples: [
        {
          title: 'ការប្រើប្រាស់ HashMap សម្រាប់វចនានុក្រម និង HashSet កម្ចាត់លេខស្ទួន',
          code: `import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        // ១. HashMap: បញ្ជីតម្លៃទំនិញ
        HashMap<String, Double> menuPrices = new HashMap<>();
        menuPrices.put("កាហ្វេទឹកដោះគោ", 1.75);
        menuPrices.put("តែបៃតង", 2.00);
        menuPrices.put("ទឹកក្រូចឆ្មា", 1.50);

        System.out.println("=== ម៉ឺនុយភេសជ្ជៈ (HashMap) ===");
        for (Map.Entry<String, Double> entry : menuPrices.entrySet()) {
            System.out.printf("ភេសជ្ជៈ: %-16s | តម្លៃ: $%.2f%n", entry.getKey(), entry.getValue());
        }

        // ស្វែងរកតម្លៃកាហ្វេ O(1)
        if (menuPrices.containsKey("កាហ្វេទឹកដោះគោ")) {
            System.out.println("-> តម្លៃកាហ្វេ: $" + menuPrices.get("កាហ្វេទឹកដោះគោ"));
        }

        // ២. HashSet: កម្ចាត់លេខសម្គាល់សិស្សដែលស្ទួន
        HashSet<Integer> uniqueStudentIds = new HashSet<>();
        uniqueStudentIds.add(101);
        uniqueStudentIds.add(102);
        uniqueStudentIds.add(101); // ស្ទួន (នឹងមិនបញ្ចូលទេ)
        uniqueStudentIds.add(103);
        uniqueStudentIds.add(102); // ស្ទួន

        System.out.println("\n=== លេខសម្គាល់សិស្សមិនស្ទួន (HashSet) ===");
        System.out.println("បញ្ជី IDs: " + uniqueStudentIds);
        System.out.println("ចំនួនសិស្សជាក់ស្តែង: " + uniqueStudentIds.size());
    }
}`,
          explanationKm: 'បង្ហាញពីការប្រើ `menuPrices.put` និង `get`, ការអានentrySet និងការប្រើ `HashSet` កម្ចាត់លេខសម្គាល់ស្ទួនដោយស្វ័យប្រវត្តិ។',
          explanationEn: 'Demonstrates Map entry traversal, constant time lookups, and set uniqueness filtering.',
          lineByLineExplanation: [
            {
              line: 'menuPrices.put("កាហ្វេទឹកដោះគោ", 1.75);',
              explanationKm: 'ផ្ទុកកូនសោរ "កាហ្វេទឹកដោះគោ" ភ្ជាប់ជាមួយតម្លៃ 1.75។',
              explanationEn: 'Stores key-value association in the map.',
            },
            {
              line: 'for (Map.Entry<String, Double> entry : menuPrices.entrySet())',
              explanationKm: 'រត់ Loop លើគ្រប់គូ Key-Value ទាំងអស់ក្នុង Map។',
              explanationEn: 'Iterates over map key-value entry pairs.',
            },
            {
              line: 'uniqueStudentIds.add(101);',
              explanationKm: 'ពេល add លេខ 101 ម្តងទៀត HashSet នឹងបដិសេធមិនបញ្ចូលដោយរក្សាភាព Unique។',
              explanationEn: 'Silently ignores duplicate additions to maintain strict set uniqueness.',
            },
          ],
          expectedOutput: `=== ម៉ឺនុយភេសជ្ជៈ (HashMap) ===
ភេសជ្ជៈ: តែបៃតង          | តម្លៃ: $2.00
ភេសជ្ជៈ: កាហ្វេទឹកដោះគោ   | តម្លៃ: $1.75
ភេសជ្ជៈ: ទឹកក្រូចឆ្មា       | តម្លៃ: $1.50
-> តម្លៃកាហ្វេ: $1.75

=== លេខសម្គាល់សិស្សមិនស្ទួន (HashSet) ===
បញ្ជី IDs: [101, 102, 103]
ចំនួនសិស្សជាក់ស្តែង: 3`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការច្រឡំថា HashMap រក្សាលំដាប់តាមជួរបញ្ចូល',
          titleEn: 'Assuming HashMap preserves insertion order',
          badCode: `HashMap<String, Integer> map = new HashMap<>();
// កុំរំពឹងថានឹងទាញយកតាមលំដាប់ដែលអ្នកបាន put ឱ្យសោះ!`,
          goodCode: `// ប្រសិនបើត្រូវការរក្សាលំដាប់បញ្ចូល សូមប្រើ LinkedHashMap:
LinkedHashMap<String, Integer> map = new LinkedHashMap<>(); // រក្សាលំដាប់បញ្ចូល
// ឬប្រើ TreeMap ប្រសិនបើចង់តម្រៀបតាមលំដាប់អក្ខរក្រម Key`,
          explanationKm: 'HashMap មិនធានាលំដាប់ទិន្នន័យឡើយ ព្រោះវាអាស្រ័យលើ hashCode។ ប្រសិនបើត្រូវការរក្សាលំដាប់ ត្រូវប្រើ `LinkedHashMap` ឬ `TreeMap`។',
          explanationEn: 'HashMap makes no ordering guarantees. Use LinkedHashMap for insertion order or TreeMap for sorted keys.',
        },
      ],
      exercise: {
        id: 'ex-map-1',
        titleKm: 'កម្មវិធីរាប់ចំនួនពាក្យ (Word Frequency Counter)',
        titleEn: 'Word Frequency Counter with HashMap',
        descriptionKm: 'ចូរសរសេរកូដរាប់ចំនួនពាក្យនីមួយៗក្នុង Array នៃខ្សែអក្សរដោយប្រើ `HashMap<String, Integer>`។',
        descriptionEn: 'Count frequencies of each word in a string array using HashMap.',
        starterCode: `import java.util.LinkedHashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        String[] words = {"java", "spring", "java", "docker", "java", "spring"};
        // រាប់ចំនួនពាក្យដោយប្រើ LinkedHashMap
    }
}`,
        solutionCode: `import java.util.LinkedHashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        String[] words = {"java", "spring", "java", "docker", "java", "spring"};
        LinkedHashMap<String, Integer> freq = new LinkedHashMap<>();

        for (String w : words) {
            freq.put(w, freq.getOrDefault(w, 0) + 1);
        }

        System.out.println("=== ចំនួនពាក្យនីមួយៗ ===");
        for (Map.Entry<String, Integer> entry : freq.entrySet()) {
            System.out.println("ពាក្យ '" + entry.getKey() + "' កើតឡើង: " + entry.getValue() + " ដង");
        }
    }
}`,
        expectedOutput: `=== ចំនួនពាក្យនីមួយៗ ===
ពាក្យ 'java' កើតឡើង: 3 ដង
ពាក្យ 'spring' កើតឡើង: 2 ដង
ពាក្យ 'docker' កើតឡើង: 1 ដង`,
        hintsKm: [
          'ប្រើ `freq.getOrDefault(w, 0) + 1` ដើម្បីបូកបន្ថែមចំនួន',
          'ដាក់តម្លៃថ្មីចូលតាម `freq.put(w, count)`',
        ],
        hintsEn: [
          'Use freq.getOrDefault(w, 0) + 1 to increment frequency',
          'Put result into map via freq.put(w, count)',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-map-1',
          questionKm: 'តើ Method មួយណាដែលប្រើសម្រាប់ទាញយកតម្លៃចេញពី HashMap ដោយផ្តល់តម្លៃលំនាំដើមបើគ្មាន Key នោះ?',
          questionEn: 'Which method safely retrieves a value from a HashMap with a fallback default?',
          difficulty: 'easy',
          hintsKm: ['Method getOrDefault(key, defaultValue)'],
          hintsEn: ['getOrDefault() method.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("getOrDefault()");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("getOrDefault()");
    }
}`,
          expectedOutput: 'getOrDefault()',
        },
        {
          id: 'pq-map-2',
          questionKm: 'តើមានអ្វីកើតឡើងប្រសិនបើអ្នកបញ្ចូល Key មួយដែលធ្លាប់មានស្រាប់ចូលទៅក្នុង HashMap?',
          questionEn: 'What happens when inserting an existing key with a new value into a HashMap?',
          difficulty: 'medium',
          hintsKm: ['វានឹងសរសេរជាន់លើ (Overwrite) តម្លៃចាស់ ដោយមិនបង្កើត Key ថ្មីទេ'],
          hintsEn: ['It overwrites the previous value mapped to that key.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // ពន្យល់
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("តម្លៃចាស់នឹងត្រូវជំនួស (Overwrite) ដោយតម្លៃថ្មី ដោយ Key នៅតែមួយគត់!");
    }
}`,
          expectedOutput: 'តម្លៃចាស់នឹងត្រូវជំនួស (Overwrite) ដោយតម្លៃថ្មី ដោយ Key នៅតែមួយគត់!',
        },
        {
          id: 'pq-map-3',
          questionKm: 'ចូរបង្ហាញកូដស្វែងរក Intersection (ធាតុរួមគ្នា) រវាង Set ពីរដោយប្រើ `retainAll()`។',
          questionEn: 'Find the intersection of two sets using retainAll().',
          difficulty: 'hard',
          hintsKm: ['បង្កើត Set ទីមួយ រួចហៅ `set1.retainAll(set2)`'],
          hintsEn: ['Call set1.retainAll(set2) to compute mathematical intersection.'],
          starterCode: `import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<String> backend = new HashSet<>(Set.of("Java", "Go", "Python", "SQL"));
        Set<String> cloud = new HashSet<>(Set.of("Docker", "Kubernetes", "Go", "Java"));
        // រកធាតុរួមគ្នា
    }
}`,
          solutionCode: `import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<String> backend = new HashSet<>(Set.of("Java", "Go", "Python", "SQL"));
        Set<String> cloud = new HashSet<>(Set.of("Docker", "Kubernetes", "Go", "Java"));

        Set<String> common = new HashSet<>(backend);
        common.retainAll(cloud);

        System.out.println("ជំនាញរួមរវាង Backend និង Cloud: " + common);
    }
}`,
          expectedOutput: 'ជំនាញរួមរវាង Backend និង Cloud: [Java, Go]',
        },
      ],
      quizzes: [
        {
          id: 'q-map-1',
          questionKm: 'តើ HashMap អាចផ្ទុក `null` ជា Key ឬ Value បានដែរឬទេ?',
          questionEn: 'Does HashMap permit null keys and null values?',
          optionsKm: ['អាចផ្ទុក null key បានមួយ និង null values បានច្រើន', 'មិនអាចផ្ទុក null បានទាល់តែសោះ', 'ផ្ទុក null keys បានច្រើន', 'ផ្ទុក null បានតែជា Value ប៉ុណ្ណោះ'],
          optionsEn: ['Permits exactly one null key and multiple null values', 'Does not permit null at all', 'Permits multiple null keys', 'Only null values allowed'],
          correctOptionIndex: 0,
          explanationKm: 'HashMap អនុញ្ញាតឱ្យមាន `null` Key បានតែមួយគត់ និងអាចមាន `null` Values បានច្រើន។ (ខុសពី HashTable ដែលហាមឃាត់ null ដាច់ខាត)។',
          explanationEn: 'HashMap permits one null key and unlimited null values.',
          hintKm: 'null key បានមួយ',
          hintEn: 'One null key allowed.',
        },
        {
          id: 'q-map-2',
          questionKm: 'តើល្បឿនស្វែងរក (Time Complexity) ជាមធ្យមនៃ HashMap.get(key) គឺជាអ្វី?',
          questionEn: 'What is the average time complexity for HashMap.get(key)?',
          optionsKm: ['O(1) Constant Time', 'O(N) Linear Time', 'O(log N)', 'O(N^2)'],
          optionsEn: ['O(1) Constant Time', 'O(N) Linear Time', 'O(log N)', 'O(N^2)'],
          correctOptionIndex: 0,
          explanationKm: 'ដោយសារក្បួន Hashing គណនា Index ផ្ទាល់ ល្បឿនជាមធ្យមគឺ O(1) Constant Time ភ្លាមៗ។',
          explanationEn: 'Under normal bucket distribution without catastrophic collisions, hash lookups average O(1).',
          hintKm: 'ល្បឿនថេរ O(1)',
          hintEn: 'O(1) constant time.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_hashmap.asp',
    },
    {
      id: 'java-generics',
      slug: 'java-generics',
      moduleSlug: 'exceptions-collections-generics',
      order: 4,
      titleKm: 'Generics ក្នុង Java (Java Generics: Type Safety & Reusability)',
      titleEn: 'Java Generics: Type Safety & Generic Classes',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីសារៈសំខាន់នៃ Generics ក្នុងការផ្តល់ Type Safety និងលុបបំបាត់ការ Cast ដោយផ្ទាល់ដៃ',
        'ចេះបង្កើត Generic Class (`Box<T>`) និង Generic Methods (`<T> void print(T item)`)',
        'ស្គាល់ពី Bounded Type Parameters (`<T extends Number>`) និង Wildcards (`<?>`)',
      ],
      objectivesEn: [
        'Understand how Generics enforce compile-time type safety and eliminate manual downcasting',
        'Implement generic classes (Box<T>) and generic methods (<T> void process(T item))',
        'Apply bounded type parameters (<T extends Number>) and wildcard bounds (<? extends T>) safely',
      ],
      summaryKm: 'Generics អនុញ្ញាតឱ្យអ្នកសរសេរ Class ឬ Method តែមួយ ប៉ុន្តែអាចដំណើរការជាមួយ Data Types ខុសៗគ្នាជាច្រើនប្រកបដោយសុវត្ថិភាព Compile-time Type Safety។',
      summaryEn: 'Generics parameterize types, enabling reusable code without sacrificing compile-time type safety.',
      contentKm: `### ១. ហេតុអ្វីត្រូវមាន Generics?
មុន Java 5 Collections ទាំងអស់ផ្ទុកធាតុជា \`Object\`។ ពេលទាញយកទិន្នន័យមកប្រើ អ្នកត្រូវតែបង្ខំ Cast \`(String) list.get(0)\` ដែលងាយនឹងបង្កកំហុស \`ClassCastException\` នៅពេលរត់។

Generics ជួយឱ្យ Compiler ពិនិត្យប្រភេទតម្លៃតាំងពីពេលសរសេរកូដ (Compile-time Type Safety)៖
\`\`\`java
List<String> names = new ArrayList<>();
names.add("សុខ");
// names.add(123); // Compiler នឹងទប់ស្កាត់ភ្លាម! គ្មានឱកាសខូច Runtime ទេ
String name = names.get(0); // មិនបាច់ Cast ឡើយ
\`\`\`

### ២. ការបង្កើត Generic Class
យើងប្រើ Type Parameter ដូចជា \`<T>\` (Type), \`<E>\` (Element), \`<K, V>\` (Key, Value)៖
\`\`\`java
public class Box<T> {
    private T content;

    public void set(T content) { this.content = content; }
    public T get() { return content; }
}
\`\`\`

### ៣. Bounded Type Parameters
ប្រសិនបើអ្នកចង់កំណត់ឱ្យ Generic ទទួលយកតែប្រភេទលេខ (Number)៖
\`\`\`java
public class NumericBox<T extends Number> {
    private T num;
    public double getDoubleValue() {
        return num.doubleValue(); // អាចហៅ method របស់ Number បាន!
    }
}
\`\`\``,
      contentEn: `Master parameterized types, compile-time type invariance, bounded wildcards, and generic algorithms in Java.`,
      syntax: `// Generic Method
public static <T> void printArray(T[] array) {
    for (T item : array) {
        System.out.println(item);
    }
}`,
      vocabulary: [
        {
          term: 'Type Safety',
          khmerTerm: 'សុវត្ថិភាពប្រភេទតម្លៃ',
          definitionKm: 'ការធានាថាកម្មវិធីនឹងមិនមានកំហុសប្រភេទទិន្នន័យខុសប្រក្រតីនៅពេលរត់ ដោយត្រួតពិនិត្យពេល Compile',
          definitionEn: 'The assurance that operations are strictly type-safe at compile time without ClassCastException.',
        },
        {
          term: 'Type Erasure',
          khmerTerm: 'ការលុបប្រភេទពេល Compile',
          definitionKm: 'ដំណើរការរបស់ Java Compiler ដែលបម្លែង Generic types ទៅជា Object ធម្មតាដើម្បីទ្រទ្រង់កូដចាស់ៗ (Backward Compatibility)',
          definitionEn: 'The compile-time process where generic type parameters are removed and replaced with raw types.',
        },
        {
          term: 'Bounded Parameter',
          khmerTerm: 'ប៉ារ៉ាម៉ែត្រមានព្រំដែន',
          definitionKm: 'ការដាក់កំហិតលើ Generic Type ឱ្យទទួលតែប្រភេទណាដែលស្នងពី Class ជាក់លាក់មួយ (ឧ. T extends Number)',
          definitionEn: 'Restricting allowed generic types to subtypes of a specific upper bound.',
        },
      ],
      examples: [
        {
          title: 'ការបង្កើត Generic Pair Class ផ្ទុកទិន្នន័យពីរប្រភេទខុសគ្នា',
          code: `// Generic Class ទទួល Type Parameters ពីរ: K និង V
class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }

    public void display() {
        System.out.println("Key: [" + key + "] => Value: [" + value + "]");
    }
}

public class Main {
    public static void main(String[] args) {
        // Pair ផ្ទុក String និង Integer
        Pair<String, Integer> studentAge = new Pair<>("សុខ សំណាង", 21);
        studentAge.display();

        // Pair ផ្ទុក String និង Double
        Pair<String, Double> productPrice = new Pair<>("កុំព្យូទ័រ MacBook", 1299.99);
        productPrice.display();

        // Generic Method សាកល្បង
        printElement("សួស្តី Khmer Java Academy");
        printElement(2026);
    }

    // Generic Method
    public static <T> void printElement(T element) {
        System.out.println("ធាតុ Generic: " + element + " (ប្រភេទ: " + element.getClass().getSimpleName() + ")");
    }
}`,
          explanationKm: 'បង្ហាញពីការបង្កើត Generic Class `Pair<K, V>` ដែលអាចផ្ទុកទិន្នន័យបត់បែនបានគ្រប់ប្រភេទ និង Generic Method `<T> void printElement(T element)`។',
          explanationEn: 'Demonstrates generic class Pair<K, V> and a standalone generic method operating across varied type arguments.',
          lineByLineExplanation: [
            {
              line: 'class Pair<K, V>',
              explanationKm: 'ប្រកាស Generic Class ដែលមាន Type Parameters ពីរ K និង V។',
              explanationEn: 'Defines two generic type variables for key and value.',
            },
            {
              line: 'Pair<String, Integer> studentAge = new Pair<>(...);',
              explanationKm: 'បញ្ជាក់ប្រភេទជាក់លាក់ String និង Integer ពេលបង្កើត Object។',
              explanationEn: 'Instantiates Pair with concrete String and Integer type arguments.',
            },
            {
              line: 'public static <T> void printElement(T element)',
              explanationKm: 'Method គាំទ្រគ្រប់ប្រភេទ Object ទាំងអស់ដោយសុវត្ថិភាព។',
              explanationEn: 'Generic method accepting any arbitrary type T.',
            },
          ],
          expectedOutput: `Key: [សុខ សំណាង] => Value: [21]
Key: [កុំព្យូទ័រ MacBook] => Value: [1299.99]
ធាតុ Generic: សួស្តី Khmer Java Academy (ប្រភេទ: String)
ធាតុ Generic: 2026 (ប្រភេទ: Integer)`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការបង្កើត Array ចេញពី Generic Type Parameter ផ្ទាល់ (new T[])',
          titleEn: 'Attempting to instantiate a generic array directly (new T[])',
          badCode: `public class MyStack<T> {
    private T[] items = new T[10]; // កំហុស Compile Error: Cannot create a generic array of T!
}`,
          goodCode: `public class MyStack<T> {
    // ដំណោះស្រាយ: ប្រើ Object[] ហើយ cast ឬប្រើ ArrayList<T>
    private Object[] items = new Object[10];
    // ឬប្រសើរជាងនេះ:
    // private ArrayList<T> items = new ArrayList<>();
}`,
          explanationKm: 'ដោយសារ Java ប្រើ Type Erasure (លុប Generic types ចោលពេល compile) JVM មិនដឹងថា T ជាប្រភេទអ្វីនៅ Runtime ឡើយ ដូច្នេះមិនអាច `new T[]` បានទេ។ គួរប្រើ `ArrayList<T>` ជំនួស។',
          explanationEn: 'Due to type erasure, generic array creation new T[] is illegal. Use ArrayList<T> or cast Object[].',
        },
      ],
      exercise: {
        id: 'ex-gen-1',
        titleKm: 'បង្កើត Generic Repository សម្រាប់រក្សាទុកទិន្នន័យ (Generic Repository)',
        titleEn: 'Build a Generic Memory Storage Box',
        descriptionKm: 'ចូរបង្កើត Generic Class `Storage<T>` ដែលមាន methods `store(T item)` និង `T retrieve()` រួចសាកល្បងប្រើវាជាមួយប្រភេទ `String` និង `Double`។',
        descriptionEn: 'Create generic Storage<T> class with store and retrieve operations.',
        starterCode: `class Storage<T> {
    // បង្កើត field និង methods
}

public class Main {
    public static void main(String[] args) {
        // សាកល្បង Storage<String> និង Storage<Double>
    }
}`,
        solutionCode: `class Storage<T> {
    private T item;

    public void store(T item) {
        this.item = item;
    }

    public T retrieve() {
        return item;
    }
}

public class Main {
    public static void main(String[] args) {
        Storage<String> strStore = new Storage<>();
        strStore.store("ឯកសារ Java 21");
        System.out.println("ទាញយកអត្ថបទ: " + strStore.retrieve());

        Storage<Double> numStore = new Storage<>();
        numStore.store(99.95);
        System.out.println("ទាញយកលេខ: " + numStore.retrieve());
    }
}`,
        expectedOutput: `ទាញយកអត្ថបទ: ឯកសារ Java 21
ទាញយកលេខ: 99.95`,
        hintsKm: [
          'ប្រើ field `private T item;`',
          'Method `store(T item)` និង `public T retrieve()`',
        ],
        hintsEn: [
          'Declare private T item;',
          'Methods store(T item) and public T retrieve()',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-gen-1',
          questionKm: 'តើ Type Parameter អក្សរ T, E, K, V តំណាងឱ្យអ្វីជាទូទៅក្នុងស្តង់ដារ Java Convention?',
          questionEn: 'What do naming conventions T, E, K, V represent in Java generics?',
          difficulty: 'easy',
          hintsKm: ['T=Type, E=Element, K=Key, V=Value'],
          hintsEn: ['T: Type, E: Element, K: Key, V: Value.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("T=Type, E=Element, K=Key, V=Value");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("T=Type, E=Element, K=Key, V=Value");
    }
}`,
          expectedOutput: 'T=Type, E=Element, K=Key, V=Value',
        },
        {
          id: 'pq-gen-2',
          questionKm: 'តើអ្វីទៅជា Type Erasure ក្នុង Java Generics?',
          questionEn: 'What is Type Erasure in the context of Java generics?',
          difficulty: 'medium',
          hintsKm: ['Compiler ជំនួស Generics ដោយ Object ឬ Bound Type ពេល Compile ដើម្បីឱ្យដំណើរការត្រូវជាមួយ JVM ចាស់ៗ'],
          hintsEn: ['Compile-time removal of generic type arguments replacing them with raw bounds or Object.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // ពន្យល់ Type Erasure
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Type Erasure លុប Generic Types ចោលនៅពេល Compile ដើម្បីធានា Backward Compatibility ជាមួយ Java កំណែចាស់ៗ!");
    }
}`,
          expectedOutput: 'Type Erasure លុប Generic Types ចោលនៅពេល Compile ដើម្បីធានា Backward Compatibility ជាមួយ Java កំណែចាស់ៗ!',
        },
        {
          id: 'pq-gen-3',
          questionKm: 'ចូរបង្ហាញ Generic Method ដែលគណនាផលបូកនៃលេខក្នុង List ណាក៏បានដែលស្នងពី Number ដោយប្រើ Upper Bounded Wildcard `<? extends Number>`។',
          questionEn: 'Implement a summation method accepting any List<? extends Number> using upper bounded wildcards.',
          difficulty: 'hard',
          hintsKm: ['ប្រើ `List<? extends Number> list` ហើយហៅ `num.doubleValue()`'],
          hintsEn: ['Iterate over Number element and sum num.doubleValue().'],
          starterCode: `import java.util.List;

public class Main {
    // សរសេរ sumList method
    public static void main(String[] args) {
        
    }
}`,
          solutionCode: `import java.util.List;

public class Main {
    public static double sumList(List<? extends Number> list) {
        double sum = 0.0;
        for (Number num : list) {
            sum += num.doubleValue();
        }
        return sum;
    }

    public static void main(String[] args) {
        List<Integer> ints = List.of(10, 20, 30);
        List<Double> doubles = List.of(1.5, 2.5, 3.0);

        System.out.println("ផលបូក Integers: " + sumList(ints));
        System.out.println("ផលបូក Doubles : " + sumList(doubles));
    }
}`,
          expectedOutput: `ផលបូក Integers: 60.0
ផលបូក Doubles : 7.0`,
        },
      ],
      quizzes: [
        {
          id: 'q-gen-1',
          questionKm: 'តើកូដមួយណាដែលកំណត់ថា Generic Type T ត្រូវតែជា Subclass នៃថ្នាក់ Number?',
          questionEn: 'Which syntax constrains type parameter T to subtypes of Number?',
          optionsKm: ['<T extends Number>', '<T implements Number>', '<T : Number>', '<T super Number>'],
          optionsEn: ['<T extends Number>', '<T implements Number>', '<T : Number>', '<T super Number>'],
          correctOptionIndex: 0,
          explanationKm: 'ក្នុង Java Generics យើងប្រើពាក្យគន្លឹះ `extends` ជានិច្ច ទាំងសម្រាប់ Class និង Interface (ឧ. `<T extends Number>`)។',
          explanationEn: 'The extends keyword specifies an upper bound for classes and interfaces in generic declarations.',
          hintKm: 'ពាក្យ extends',
          hintEn: '<T extends Number>.',
        },
        {
          id: 'q-gen-2',
          questionKm: 'តើ Generics ផ្តល់អត្ថប្រយោជន៍ចម្បងអ្វីខ្លះដល់អ្នកសរសេរកូដ Java?',
          questionEn: 'What is the primary benefit provided by Java Generics?',
          optionsKm: ['Compile-time Type Safety និងលុបបំបាត់ការ Cast ដោយផ្ទាល់ដៃ', 'ធ្វើឱ្យកូដរត់លឿនជាង C++', 'កាត់បន្ថយទំហំ RAM ដោយស្វ័យប្រវត្ត', 'បង្កើត Threads ដោយស្វ័យប្រវត្ត'],
          optionsEn: ['Compile-time Type Safety and eliminating manual casting', 'Faster than C++', 'Reduces RAM usage', 'Creates threads'],
          correctOptionIndex: 0,
          explanationKm: 'Generics ជួយឱ្យ Compiler ចាប់កំហុសប្រភេទតម្លៃតាំងពីពេលសរសេរកូដ និងមិនបាច់សរសេរ cast `(Type)` ដោយផ្ទាល់ដៃឡើយ។',
          explanationEn: 'Generics provide strong compile-time type checks and eliminate manual type casting.',
          hintKm: 'Type safety និងមិនបាច់ cast',
          hintEn: 'Compile-time type safety.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_intro.asp',
    },
    {
      id: 'java-file-handling',
      slug: 'java-file-handling',
      moduleSlug: 'exceptions-collections-generics',
      order: 5,
      titleKm: 'ការអាន និងសរសេរឯកសារ (File Handling: Reading & Writing Files)',
      titleEn: 'File Handling: Reading & Writing Files with NIO',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីការគ្រប់គ្រង Files ក្នុង Java ដោយប្រើ java.io.File និង Modern java.nio.file (NIO)',
        'ចេះបង្កើត និងសរសេរទិន្នន័យចូល File ដោយប្រើ FileWriter ឬ Files.writeString()',
        'ចេះអានទិន្នន័យពី File ដោយប្រើ Scanner ឬ Files.readString() ជាមួយ Try-with-resources',
      ],
      objectivesEn: [
        'Master Java file I/O using traditional java.io and modern java.nio.file.Files API',
        'Create and write persistent data using FileWriter and Files.writeString()',
        'Safely stream and parse file contents with Scanner and Files.readAllLines() under try-with-resources',
      ],
      summaryKm: 'ការរក្សាទុកទិន្នន័យលើ Disk (File I/O) គឺជាមូលដ្ឋានគ្រឹះនៃកម្មវិធីពិត។ រៀនបង្កើត អាន កែប្រែ និងលុប Files ដោយសុវត្ថិភាព។',
      summaryEn: 'Persistent file storage is essential for software applications. Master reading, writing, and NIO file streaming.',
      contentKm: `### ១. ថ្នាក់ java.io.File
ថ្នាក់ \`File\` តំណាងឱ្យផ្លូវ (File Path) នៃឯកសារ ឬថត (Directory) លើ Disk៖
\`\`\`java
File file = new File("student_records.txt");
boolean exists = file.exists(); // ពិនិត្យវត្តមាន
\`\`\`

### ២. ការសរសេរទិន្នន័យចូល File
យើងអាចប្រើ \`FileWriter\` ជាមួយ **Try-with-resources** ដើម្បីធានាថា File ត្រូវបានបិទ និង Save ជានិច្ច៖
\`\`\`java
try (FileWriter writer = new FileWriter("notes.txt", true)) { // true = append បន្តកន្ទុយ
    writer.write("សួស្តីកម្ពុជា!\\n");
}
\`\`\`

### ៣. ការអានទិន្នន័យពី File
យើងអាចប្រើ \`Scanner\` អាន File មួយបន្ទាត់ម្តងៗ៖
\`\`\`java
try (Scanner reader = new Scanner(new File("notes.txt"))) {
    while (reader.hasNextLine()) {
        String line = reader.nextLine();
        System.out.println(line);
    }
}
\`\`\`

### ៤. Modern Java NIO (Java 11+)
Java ជំនាន់ថ្មីផ្តល់វិធីសាស្ត្រខ្លី និងលឿនបំផុតតាមរយៈ \`java.nio.file.Files\`៖
- \`Files.writeString(Path.of("file.txt"), "អត្ថបទ");\`
- \`String content = Files.readString(Path.of("file.txt"));\``,
      contentEn: `Learn standard file streaming with FileWriter, Scanner parsing, and modern Java NIO utility methods like Files.writeString() and Files.readString().`,
      syntax: `// Modern NIO Writing & Reading:
import java.nio.file.Files;
import java.nio.file.Path;

Path path = Path.of("data.txt");
Files.writeString(path, "មាតិកាឯកសារ");
String text = Files.readString(path);`,
      vocabulary: [
        {
          term: 'File I/O',
          khmerTerm: 'ការបញ្ចូល/បញ្ចេញឯកសារ',
          definitionKm: 'ប្រតិបត្តិការអានទិន្នន័យពី Disk ឬសរសេរទិន្នន័យទៅកាន់ Disk',
          definitionEn: 'Input/Output operations interacting with storage files on the filesystem.',
        },
        {
          term: 'Append Mode',
          khmerTerm: 'ទម្រង់សរសេរបន្តកន្ទុយ',
          definitionKm: 'ការសរសេរបន្ថែមទៅចុង File ដោយមិនលុបទិន្នន័យចាស់ៗដែលធ្លាប់មានស្រាប់ចោល',
          definitionEn: 'Opening a file to write data at the end without truncating existing content.',
        },
        {
          term: 'AutoCloseable',
          khmerTerm: 'ចំណុចប្រទាក់បិទស្វ័យប្រវត្ត',
          definitionKm: 'Interface ដែលអនុញ្ញាតឱ្យ Class អាចប្រើក្នុង try-with-resources ដើម្បីបិទធនធានស្វ័យប្រវត្តិ',
          definitionEn: 'An interface enabling objects to be managed automatically by try-with-resources blocks.',
        },
      ],
      examples: [
        {
          title: 'ការបង្កើត សរសេរ និងអាន File ពេញលេញជាមួយ Try-with-resources',
          code: `import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String filename = "academy_report.txt";

        // ១. សរសេរទិន្នន័យចូល File (Try-with-resources)
        try (FileWriter writer = new FileWriter(filename)) {
            writer.write("=== របាយការណ៍សាលា KHMER JAVA ACADEMY ===\\n");
            writer.write("វគ្គសិក្សា: Java 21 Masterclass\\n");
            writer.write("ចំនួនសិស្សចុះឈ្មោះ: 150 នាក់\\n");
            writer.write("ស្ថានភាព: ដំណើរការយ៉ាងរលូន!\\n");
            System.out.println("✅ សរសេរទិន្នន័យចូល File ជោគជ័យ!");
        } catch (IOException e) {
            System.err.println("❌ កំហុសពេលសរសេរ File: " + e.getMessage());
        }

        // ២. អានទិន្នន័យត្រឡប់មកវិញដោយប្រើ Scanner
        System.out.println("\\n📖 កំពុងអានមាតិកាចេញពី " + filename + ":");
        File fileToRead = new File(filename);

        try (Scanner reader = new Scanner(fileToRead)) {
            int lineNumber = 1;
            while (reader.hasNextLine()) {
                String line = reader.nextLine();
                System.out.printf("[%02d] %s%n", lineNumber++, line);
            }
        } catch (IOException e) {
            System.err.println("❌ កំហុសពេលអាន File: " + e.getMessage());
        }

        // ៣. សម្អាត File សាកល្បង
        if (fileToRead.delete()) {
            System.out.println("\\n🧹 បានសម្អាត File បណ្តោះអាសន្នរួចរាល់។");
        }
    }
}`,
          explanationKm: 'បង្ហាញពីការសរសេរ File ដោយប្រើ `FileWriter`, ការអានមួយជួរៗដោយ `Scanner` ជាមួយ Try-with-resources និងការលុប file បណ្តោះអាសន្ន។',
          explanationEn: 'Demonstrates end-to-end file writing, reading line by line with Scanner under try-with-resources, and file cleanup.',
          lineByLineExplanation: [
            {
              line: 'try (FileWriter writer = new FileWriter(filename))',
              explanationKm: 'Try-with-resources ធានាថា writer នឹងត្រូវ .close() ដោយស្វ័យប្រវត្ត ទោះមានកំហុសក៏ដោយ។',
              explanationEn: 'Auto-closes the file writer upon block exit.',
            },
            {
              line: 'while (reader.hasNextLine())',
              explanationKm: 'រត់ Loop ដរាបណា File នៅមានបន្ទាត់អត្ថបទបន្តទៀត។',
              explanationEn: 'Scans sequentially line-by-line until end-of-file.',
            },
            {
              line: 'fileToRead.delete()',
              explanationKm: 'លុបឯកសារចេញពី Disk ក្រោយពេលប្រើរួច។',
              explanationEn: 'Deletes the temporary file from disk.',
            },
          ],
          expectedOutput: `✅ សរសេរទិន្នន័យចូល File ជោគជ័យ!

📖 កំពុងអានមាតិកាចេញពី academy_report.txt:
[01] === របាយការណ៍សាលា KHMER JAVA ACADEMY ===
[02] វគ្គសិក្សា: Java 21 Masterclass
[03] ចំនួនសិស្សចុះឈ្មោះ: 150 នាក់
[04] ស្ថានភាព: ដំណើរការយ៉ាងរលូន!

🧹 បានសម្អាត File បណ្តោះអាសន្នរួចរាល់។`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការភ្លេចបិទ File Stream ធ្វើឱ្យទិន្នន័យមិនទាន់ Save (Unflushed Buffer)',
          titleEn: 'Failure to close stream leaving data buffered and unwritten to disk',
          badCode: `FileWriter writer = new FileWriter("test.txt");
writer.write("ទិន្នន័យ");
// ភ្លេច writer.close()! ទិន្នន័យនៅជាប់ក្នុង RAM Buffer មិនទាន់ធ្លាក់ដល់ Disk ឡើយ`,
          goodCode: `// ប្រើ Try-with-resources ជានិច្ច:
try (FileWriter writer = new FileWriter("test.txt")) {
    writer.write("ទិន្នន័យ");
} // បិទ និង flush ដោយស្វ័យប្រវត្តិត្រង់នេះ!`,
          explanationKm: 'FileWriter ប្រើ Buffer ក្នុង RAM។ បើមិនបាន close() ឬ flush() ទេ ទិន្នន័យអាចនឹងបាត់បង់ទាំងស្រុង។ តែងតែប្រើ Try-with-resources ជានិច្ច។',
          explanationEn: 'Streams buffer data in memory. Omitting close() or flush() leaves files empty. Always use try-with-resources.',
        },
      ],
      exercise: {
        id: 'ex-fil-1',
        titleKm: 'ប្រព័ន្ធកត់ត្រាកំណត់ហេតុ (Simple File Logger)',
        titleEn: 'Append Log Entries to File',
        descriptionKm: 'សរសេរ Method `public static void logMessage(String filename, String message)` ដែលសរសេរបន្ថែមកន្ទុយ (Append Mode: `new FileWriter(filename, true)`) ចូលក្នុង File រួចអានត្រឡប់មកវិញ។',
        descriptionEn: 'Implement logMessage using FileWriter in append mode and verify contents.',
        starterCode: `import java.io.FileWriter;
import java.io.IOException;

public class Main {
    public static void logMessage(String filename, String message) {
        // សរសេរ append mode
    }

    public static void main(String[] args) {
        // តេស្ត log
    }
}`,
        solutionCode: `import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Main {
    public static void logMessage(String filename, String message) {
        try (FileWriter writer = new FileWriter(filename, true)) {
            writer.write(message + "\\n");
        } catch (IOException e) {
            System.err.println("កំហុស Log: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        String logFile = "app.log";
        logMessage(logFile, "INFO: កម្មវិធីបានចាប់ផ្តើម");
        logMessage(logFile, "SUCCESS: ភ្ជាប់ Database ជោគជ័យ");

        // អាន log
        try (Scanner sc = new Scanner(new File(logFile))) {
            while (sc.hasNextLine()) {
                System.out.println("LOG -> " + sc.nextLine());
            }
        } catch (IOException e) {
            System.err.println("អានមិនបាន: " + e.getMessage());
        }

        new File(logFile).delete();
    }
}`,
        expectedOutput: `LOG -> INFO: កម្មវិធីបានចាប់ផ្តើម
LOG -> SUCCESS: ភ្ជាប់ Database ជោគជ័យ`,
        hintsKm: [
          'ប្រើ `new FileWriter(filename, true)` ដោយមាន parameter `true` សម្រាប់ append',
          'ដាក់ក្នុង Try-with-resources',
        ],
        hintsEn: [
          'Use new FileWriter(filename, true) for append mode',
          'Enclose inside try-with-resources block',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-fil-1',
          questionKm: 'តើ Parameter ទីពីរ `true` ក្នុង `new FileWriter("data.txt", true)` មានន័យដូចម្តេច?',
          questionEn: 'What does the boolean true parameter in new FileWriter("data.txt", true) signify?',
          difficulty: 'easy',
          hintsKm: ['Append mode (សរសេរបន្តកន្ទុយ ដោយមិនលុបទិន្នន័យចាស់)'],
          hintsEn: ['Enables append mode rather than overwriting.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Append Mode (សរសេរបន្តកន្ទុយ)");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Append Mode (សរសេរបន្តកន្ទុយ)");
    }
}`,
          expectedOutput: 'Append Mode (សរសេរបន្តកន្ទុយ)',
        },
        {
          id: 'pq-fil-2',
          questionKm: 'តើ Checked Exception មួយណាដែល FileWriter និង Scanner អាចនឹងបោះនៅពេលមានបញ្ហាផ្លូវ File មិនត្រឹមត្រូវ?',
          questionEn: 'Which checked exception is thrown when an I/O operation or file access fails?',
          difficulty: 'medium',
          hintsKm: ['java.io.IOException'],
          hintsEn: ['java.io.IOException.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បោះពុម្ពឈ្មោះ Exception
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("java.io.IOException (ឬ FileNotFoundException)");
    }
}`,
          expectedOutput: 'java.io.IOException (ឬ FileNotFoundException)',
        },
        {
          id: 'pq-fil-3',
          questionKm: 'ចូរបង្ហាញការអានបន្ទាត់ទាំងអស់នៃ File ក្នុងពេលតែមួយដោយប្រើ Modern Java NIO `Files.readAllLines(Path.of(...))`។',
          questionEn: 'Demonstrate reading all lines of a file into a List<String> with Files.readAllLines().',
          difficulty: 'hard',
          hintsKm: ['ប្រើ `Files.writeString` បង្កើត file ជាមុន រួចប្រើ `Files.readAllLines`'],
          hintsEn: ['Write sample file then call Files.readAllLines(path).'],
          starterCode: `import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        Path p = Path.of("nio_test.txt");
        // សរសេរ និងអានដោយ NIO
    }
}`,
          solutionCode: `import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        Path p = Path.of("nio_test.txt");
        Files.writeString(p, "បន្ទាត់ទី ១\\nបន្ទាត់ទី ២\\nបន្ទាត់ទី ៣");

        List<String> lines = Files.readAllLines(p);
        for (String line : lines) {
            System.out.println("NIO: " + line);
        }

        Files.deleteIfExists(p);
    }
}`,
          expectedOutput: `NIO: បន្ទាត់ទី ១
NIO: បន្ទាត់ទី ២
NIO: បន្ទាត់ទី ៣`,
        },
      ],
      quizzes: [
        {
          id: 'q-fil-1',
          questionKm: 'តើ Interface ណាដែល Class មួយត្រូវតែ implements ដើម្បីអាចយកទៅប្រើក្នុងប្លុក Try-with-resources បាន?',
          questionEn: 'Which interface must a class implement to be managed inside a try-with-resources statement?',
          optionsKm: ['java.lang.AutoCloseable', 'java.io.Serializable', 'java.lang.Cloneable', 'java.lang.Runnable'],
          optionsEn: ['java.lang.AutoCloseable', 'java.io.Serializable', 'java.lang.Cloneable', 'java.lang.Runnable'],
          correctOptionIndex: 0,
          explanationKm: 'គ្រប់ធនធានដែលប្រើក្នុង Try-with-resources ត្រូវតែ implements `java.lang.AutoCloseable` ឬ `java.io.Closeable`។',
          explanationEn: 'Only classes implementing AutoCloseable can be managed by try-with-resources.',
          hintKm: 'មានពាក្យ Auto និង Close',
          hintEn: 'AutoCloseable interface.',
        },
        {
          id: 'q-fil-2',
          questionKm: 'តើ Method ណាដែលប្រើសម្រាប់ពិនិត្យមើលថាតើ File មួយមានវត្តមានលើ Disk ពិតមែនឬអត់?',
          questionEn: 'Which method checks if a file exists on the disk?',
          optionsKm: ['file.exists()', 'file.isAvailable()', 'file.check()', 'file.isOpen()'],
          optionsEn: ['file.exists()', 'file.isAvailable()', 'file.check()', 'file.isOpen()'],
          correctOptionIndex: 0,
          explanationKm: '`file.exists()` ត្រឡប់តម្លៃ `true` ប្រសិនបើ File ឬ Directory នោះពិតជាមានវត្តមានលើ Disk។',
          explanationEn: 'The exists() method on java.io.File returns true if the filesystem path exists.',
          hintKm: 'ពាក្យ exists (មានវត្តមាន)',
          hintEn: 'exists() method.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_files.asp',
    },
  ],
};
