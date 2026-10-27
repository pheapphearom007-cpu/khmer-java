import { CurriculumModule } from '../../types';

export const MODULE_7_LAMBDAS_CONCURRENCY: CurriculumModule = {
  id: 'mod-7',
  slug: 'lambdas-streams-concurrency',
  titleKm: '៧. Lambda Expressions, Stream API និងដំណើរការស្របគ្នា (Concurrency)',
  titleEn: '7. Lambdas, Streams & Introductory Concurrency',
  descriptionKm: 'ឈានដល់កម្រិត Modern Java (Java 8 ដល់ Java 21)៖ ការសរសេរ Functional Programming ជាមួយ Lambdas, Stream Pipelines ទិន្នន័យ និងដំណើរការ Threads ស្របគ្នា។',
  descriptionEn: 'Modern Java 8-21 paradigms: functional lambdas, stream transformations, and multithreading fundamentals.',
  icon: 'Zap',
  level: 'advanced',
  lessons: [
    {
      id: 'java-lambda-expressions',
      slug: 'java-lambda-expressions',
      moduleSlug: 'lambdas-streams-concurrency',
      order: 1,
      titleKm: 'Lambda Expressions និង Functional Interfaces',
      titleEn: 'Java Lambda Expressions & Functional Interfaces',
      difficulty: 'advanced',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីបដិវត្តន៍ Functional Programming ក្នុង Java និងទម្រង់ Syntax នៃ Lambda Expression `(params) -> { body }`',
        'ស្គាល់ពី Functional Interfaces ស្នូលក្នុង `java.util.function`: Predicate, Consumer, Function, Supplier',
        'ចេះប្រើប្រាស់ Method References (`Class::method`) ដើម្បីកាត់បន្ថយទំហំកូដ',
      ],
      objectivesEn: [
        'Master functional programming syntax with Lambda Expressions: (params) -> { body }',
        'Understand core Functional Interfaces: Predicate<T>, Consumer<T>, Function<T, R>, and Supplier<T>',
        'Apply Method References (Class::method) for elegant, ultra-concise code',
      ],
      summaryKm: 'Lambda Expressions (មានតាំងពី Java 8) អនុញ្ញាតឱ្យអ្នកបញ្ជូនប្លុកកូដ ឬអនុគមន៍ ធ្វើជាទិន្នន័យ (Code as Data) ដោយកាត់បន្ថយការសរសេរប្លុក Anonymous Class វែងៗ។',
      summaryEn: 'Lambdas treat functionality as a method argument, dramatically cutting boilerplate for functional interfaces.',
      contentKm: `### ១. អ្វីទៅជា Lambda Expression?
Lambda គឺជាអនុគមន៍អនាមិក (Anonymous Function) ដែលគ្មានឈ្មោះ គ្មាន Access Modifier និងគ្មាន Return Type បញ្ជាក់ដោយផ្ទាល់។

ទម្រង់ Syntax គ្រឹះ៖
\`\`\`
(parameters) -> { body }
\`\`\`
- ពីមុន (Anonymous Class):
\`\`\`java
Runnable r = new Runnable() {
    public void run() { System.out.println("រត់..."); }
};
\`\`\`
- ឥឡូវ (Lambda Expression ខ្លីមួយជួរ):
\`\`\`java
Runnable r = () -> System.out.println("រត់...");
\`\`\`

### ២. Functional Interfaces ក្នុង java.util.function
Functional Interface គឺជា Interface ដែលមាន **Abstract Method តែមួយគត់** (អាចមាន \`@FunctionalInterface\` annotation)៖
1. **Predicate<T>:** ទទួល \`T\` ត្រឡប់ \`boolean\` (ប្រើសម្រាប់លក្ខខណ្ឌចម្រោះ: \`filter\`)។ Method: \`test(t)\`
2. **Consumer<T>:** ទទួល \`T\` មិនត្រឡប់អ្វីឡើយ (\`void\`) (ប្រើសម្រាប់សកម្មភាព: \`forEach\`)។ Method: \`accept(t)\`
3. **Function<T, R>:** ទទួល \`T\` បម្លែងទៅជា \`R\` (ប្រើសម្រាប់: \`map\`)។ Method: \`apply(t)\`
4. **Supplier<T>:** មិនទទួលអ្វីឡើយ តែផ្តល់ \`T\` មកវិញ។ Method: \`get()\`

### ៣. Method References (\`::\`)
ជាទម្រង់ខ្លីជាង Lambda ទៅទៀត នៅពេល Lambda នោះគ្រាន់តែហៅ Method ដែលមានស្រាប់៖
- \`s -> System.out.println(s)\` ក្លាយជា \`System.out::println\`
- \`s -> s.toUpperCase()\` ក្លាយជា \`String::toUpperCase\``,
      contentEn: `Learn Java 8 functional abstractions, single abstract method (SAM) contracts, Predicate/Consumer/Function utility interfaces, and :: method reference syntax.`,
      syntax: `// Lambda Predicate
Predicate<Integer> isAdult = age -> age >= 18;
boolean result = isAdult.test(20); // true

// Method Reference
List.of("A", "B").forEach(System.out::println);`,
      vocabulary: [
        {
          term: 'Lambda Expression',
          khmerTerm: 'កន្សោមឡាំដា (Lambda)',
          definitionKm: 'ប្លុកអនុគមន៍អនាមិកខ្លីដែលអនុញ្ញាតឱ្យបញ្ជូនកូដជា Parameter ទៅកាន់ Method ផ្សេងទៀត',
          definitionEn: 'An anonymous function that can be used to create delegates or pass code as data.',
        },
        {
          term: 'Functional Interface',
          khmerTerm: 'ចំណុចប្រទាក់អនុគមន៍',
          definitionKm: 'Interface ដែលមាន Abstract Method តែមួយគត់ សម្រាប់ឱ្យ Lambda Expression អនុវត្តលើ',
          definitionEn: 'An interface containing exactly one abstract method (Single Abstract Method).',
        },
        {
          term: 'Method Reference',
          khmerTerm: 'សេចក្តីយោងវិធីសាស្ត្រ',
          definitionKm: 'សញ្ញា :: សម្រាប់ហៅ Method ដែលមានស្រាប់ដោយផ្ទាល់ជាទម្រង់សង្ខេបនៃ Lambda',
          definitionEn: 'A compact, easy-to-read lambda expression for methods that already have a name.',
        },
      ],
      examples: [
        {
          title: 'ការប្រើប្រាស់ Predicate, Consumer, Function និង Method References',
          code: `import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("សុខ", "ចិន្តា", "សំណាង", "ដារ៉ា", "វិបុល"));

        // ១. Predicate: លក្ខខណ្ឌជ្រើសរើសឈ្មោះដែលមានអក្សរ 'ស'
        Predicate<String> startsWithS = name -> name.startsWith("ស");

        System.out.println("=== ឈ្មោះដែលចាប់ផ្តើមដោយអក្សរ 'ស' ===");
        for (String name : names) {
            if (startsWithS.test(name)) {
                System.out.println("-> " + name);
            }
        }

        // ២. Function: បម្លែងឈ្មោះទៅជាប្រវែងតួអក្សរ
        Function<String, Integer> nameLength = String::length; // Method reference
        System.out.println("\\nប្រវែងឈ្មោះ 'សំណាង': " + nameLength.apply("សំណាង") + " តួអក្សរ");

        // ៣. Consumer & Method Reference លើ forEach
        System.out.println("\\n=== បង្ហាញឈ្មោះទាំងអស់តាម forEach ===");
        Consumer<String> printer = n -> System.out.println("👤 សិស្ស: " + n);
        names.forEach(printer);
    }
}`,
          explanationKm: 'បង្ហាញពីការប្រើប្រាស់ `Predicate` សម្រាប់ផ្ទៀងផ្ទាត់លក្ខខណ្ឌ, `Function` បម្លែងទិន្នន័យ, និង `Consumer` ជាមួយ method reference `forEach`។',
          explanationEn: 'Demonstrates core functional interfaces in action: filtering with Predicate, transforming with Function, and iterating with Consumer.',
          lineByLineExplanation: [
            {
              line: 'Predicate<String> startsWithS = name -> name.startsWith("ស");',
              explanationKm: 'កន្សោម Lambda ពិនិត្យថាឈ្មោះចាប់ផ្តើមដោយអក្សរ "ស" ឬអត់ (true/false)។',
              explanationEn: 'Defines boolean predicate testing if string begins with prefix.',
            },
            {
              line: 'Function<String, Integer> nameLength = String::length;',
              explanationKm: 'Method reference សង្ខេបពី `s -> s.length()` ទទួល String ត្រឡប់ Integer។',
              explanationEn: 'Method reference transforming input String into integer length.',
            },
            {
              line: 'names.forEach(printer);',
              explanationKm: 'ហៅ method accept() នៃ Consumer លើគ្រប់ធាតុក្នុង list តាមលំដាប់។',
              explanationEn: 'Feeds each list element into the consumer functional interface.',
            },
          ],
          expectedOutput: `=== ឈ្មោះដែលចាប់ផ្តើមដោយអក្សរ 'ស' ===
-> សុខ
-> សំណាង

ប្រវែងឈ្មោះ 'សំណាង': 6 តួអក្សរ

=== បង្ហាញឈ្មោះទាំងអស់តាម forEach ===
👤 សិស្ស: សុខ
👤 សិស្ស: ចិន្តា
👤 សិស្ស: សំណាង
👤 សិស្ស: ដារ៉ា
👤 សិស្ស: វិបុល`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការកែប្រែ Local Variable ខាងក្រៅពីក្នុង Lambda (Variable Mutation Trap)',
          titleEn: 'Attempting to mutate a local variable from within a lambda body',
          badCode: `int counter = 0;
List.of(1, 2, 3).forEach(n -> {
    counter += n; // កំហុស Compile Error: Local variable must be final or effectively final!
});`,
          goodCode: `// ដំណោះស្រាយ: ប្រើ Stream API reduce() ឬ AtomicInteger:
int sum = List.of(1, 2, 3).stream().mapToInt(Integer::intValue).sum();
System.out.println("ផលបូក: " + sum);`,
          explanationKm: 'អថេរ Local ដែលប្រើក្នុង Lambda ត្រូវតែជា `final` ឬ `effectively final` (មិនអាចកែប្រែតម្លៃបានឡើយ)។ បើចង់បូកសន្សំ ត្រូវប្រើ Stream API ជំនួស។',
          explanationEn: 'Variables captured by lambdas must be final or effectively final. Use Stream reductions for accumulations.',
        },
      ],
      exercise: {
        id: 'ex-lam-1',
        titleKm: 'បង្កើត Custom Functional Interface គណនាគណិតវិទ្យា',
        titleEn: 'Define Custom MathOperation Functional Interface',
        descriptionKm: 'បង្កើត `@FunctionalInterface interface MathOperation { int operate(int a, int b); }` រួចប្រើ Lambda Expressions បង្កើតប្រតិបត្តិការបូក (+) និងគុណ (*)។',
        descriptionEn: 'Declare MathOperation interface and implement addition and multiplication using lambdas.',
        starterCode: `// បង្កើត MathOperation functional interface

public class Main {
    public static void main(String[] args) {
        // បង្កើត addOperation និង multiplyOperation តាម lambda
    }
}`,
        solutionCode: `@FunctionalInterface
interface MathOperation {
    int operate(int a, int b);
}

public class Main {
    public static void main(String[] args) {
        MathOperation addition = (a, b) -> a + b;
        MathOperation multiplication = (a, b) -> a * b;

        int sum = addition.operate(15, 25);
        int product = multiplication.operate(6, 7);

        System.out.println("ផលបូក (Lambda): " + sum);
        System.out.println("ផលគុណ (Lambda): " + product);
    }
}`,
        expectedOutput: `ផលបូក (Lambda): 40
ផលគុណ (Lambda): 42`,
        hintsKm: [
          'ប្រើ `@FunctionalInterface` ពីលើ Interface',
          'Lambda សរសេរជា `(a, b) -> a + b;`',
        ],
        hintsEn: [
          'Annotate with @FunctionalInterface',
          'Implement with (a, b) -> a + b',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-lam-1',
          questionKm: 'តើ Interface មួយអាចមាន Abstract Methods ប៉ុន្មានដើម្បីចាត់ទុកជា Functional Interface?',
          questionEn: 'How many abstract methods can a Functional Interface declare?',
          difficulty: 'easy',
          hintsKm: ['ពាក្យ Single Abstract Method (SAM) គឺមានតែមួយគត់'],
          hintsEn: ['Exactly one abstract method.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("មានតែ ១ គត់ (Single Abstract Method)");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("មានតែ ១ គត់ (Single Abstract Method)");
    }
}`,
          expectedOutput: 'មានតែ ១ គត់ (Single Abstract Method)',
        },
        {
          id: 'pq-lam-2',
          questionKm: 'តើ Lambda `str -> System.out.println(str)` អាចសរសេរជា Method Reference យ៉ាងដូចម្តេច?',
          questionEn: 'How is str -> System.out.println(str) written as a method reference?',
          difficulty: 'medium',
          hintsKm: ['ប្រើសញ្ញា :: រវាង System.out និង println'],
          hintsEn: ['System.out::println.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("System.out::println");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("System.out::println");
    }
}`,
          expectedOutput: 'System.out::println',
        },
        {
          id: 'pq-lam-3',
          questionKm: 'ចូរបង្ហាញការផ្សំ Predicate ពីរចូលគ្នាដោយប្រើ `and()` និង `or()` (Predicate Chaining)។',
          questionEn: 'Demonstrate predicate chaining by combining two conditions with and() and or().',
          difficulty: 'hard',
          hintsKm: ['ប្រើ `isPositive.and(isEven)`'],
          hintsEn: ['Chain predicates using isPositive.and(isEven).'],
          starterCode: `import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        // បង្កើត និងផ្សំ predicates
    }
}`,
          solutionCode: `import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        Predicate<Integer> isPositive = n -> n > 0;
        Predicate<Integer> isEven = n -> n % 2 == 0;

        Predicate<Integer> isPositiveAndEven = isPositive.and(isEven);

        System.out.println("លេខ 4 ជាវិជ្ជមាន និងគូ: " + isPositiveAndEven.test(4));
        System.out.println("លេខ -4 ជាវិជ្ជមាន និងគូ: " + isPositiveAndEven.test(-4));
    }
}`,
          expectedOutput: `លេខ 4 ជាវិជ្ជមាន និងគូ: true
លេខ -4 ជាវិជ្ជមាន និងគូ: false`,
        },
      ],
      quizzes: [
        {
          id: 'q-lam-1',
          questionKm: 'តើ Functional Interface ណាដែលទទួល Parameter មួយ ហើយត្រឡប់តម្លៃជា Boolean?',
          questionEn: 'Which standard functional interface accepts one argument and returns a boolean?',
          optionsKm: ['Predicate<T>', 'Consumer<T>', 'Function<T, R>', 'Supplier<T>'],
          optionsEn: ['Predicate<T>', 'Consumer<T>', 'Function<T, R>', 'Supplier<T>'],
          correctOptionIndex: 0,
          explanationKm: '`Predicate<T>` មាន method `boolean test(T t)` សម្រាប់វាយតម្លៃលក្ខខណ្ឌពិតឬមិនពិត។',
          explanationEn: 'Predicate<T> defines boolean test(T t) intended for conditional evaluations.',
          hintKm: 'ពាក្យ Predicate (សេចក្តីបញ្ជាក់)',
          hintEn: 'Predicate<T>.',
        },
        {
          id: 'q-lam-2',
          questionKm: 'តើសញ្ញាសម្គាល់ណាដែលប្រើសម្រាប់សរសេរ Method Reference ក្នុង Java?',
          questionEn: 'Which token denotes a method reference in Java syntax?',
          optionsKm: [':: (សញ្ញាចុចពីរពីរដង)', '-> (សញ្ញាព្រួញ)', '=> (សញ្ញាព្រួញស្មើ)', '.. (សញ្ញាចុចពីរ)'],
          optionsEn: [':: (double colon)', '-> (arrow operator)', '=> (fat arrow)', '.. (double dot)'],
          correctOptionIndex: 0,
          explanationKm: 'Method References ប្រើសញ្ញា `::` (Double Colon) ដូចជា `String::toUpperCase` ឬ `System.out::println`។',
          explanationEn: 'The double colon (::) operator is used for method references.',
          hintKm: 'សញ្ញាចុចពីរ ::',
          hintEn: 'Double colon :: operator.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_lambda.asp',
    },
    {
      id: 'java-stream-api',
      slug: 'java-stream-api',
      moduleSlug: 'lambdas-streams-concurrency',
      order: 2,
      titleKm: 'Stream API និង Functional Data Processing',
      titleEn: 'Java Stream API: Filter, Map & Reduce Pipelines',
      difficulty: 'advanced',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីស្ថាបត្យកម្ម Stream Pipeline: Data Source -> Intermediate Operations -> Terminal Operation',
        'ចេះប្រើប្រាស់ Intermediate Operations (filter, map, sorted, distinct) និងយល់ពីយន្តការ Lazy Evaluation',
        'ចេះប្រើប្រាស់ Terminal Operations (collect, toList, forEach, count, reduce)',
      ],
      objectivesEn: [
        'Understand Stream pipeline stages: Source -> Intermediate Operations -> Terminal Operation',
        'Master lazy intermediate transformations: filter(), map(), sorted(), and distinct()',
        'Execute terminal reductions: collect(Collectors.toList()), toList(), count(), and reduce()',
      ],
      summaryKm: 'Stream API គឺជាវិធីសាស្ត្រទំនើបក្នុងការកែច្នៃ និងចម្រាញ់ទិន្នន័យពី Collections បែបប្រកាស (Declarative Programming) ដូចជា SQL queries ក្នុងកូដ Java។',
      summaryEn: 'Streams provide expressive, declarative data processing pipelines over collections with lazy evaluation.',
      contentKm: `### ១. អ្វីទៅជា Java Stream?
Stream មិនមែនជារចនាសម្ព័ន្ធទិន្នន័យ (Data Structure) ដែលផ្ទុកទិន្នន័យផ្ទាល់នោះទេ។ វាគឺជា **លំហូរនៃទិន្នន័យ (Data Pipeline)** ដែលហូរចេញពី Source (ដូចជា List) ឆ្លងកាត់ការកែច្នៃ រួចបញ្ជូនទៅកាន់គោលដៅបញ្ចប់។

\`\`\`
Source (List) ──> filter() ──> map() ──> sorted() ──> collect() (លទ្ធផលថ្មី)
\`\`\`

### ២. ដំណាក់កាលទាំង ៣ នៃ Stream Pipeline
1. **Source:** បង្កើត Stream ពី Collection: \`list.stream()\`
2. **Intermediate Operations (Lazy - មិនទាន់ដំណើរការទេ):**
   - \`filter(predicate)\` : ចម្រាញ់យកតែធាតុណាដែលត្រូវតាមលក្ខខណ្ឌ
   - \`map(function)\` : បម្លែងទិន្នន័យពីទម្រង់មួយទៅទម្រង់មួយទៀត
   - \`sorted()\` : តម្រៀបលំដាប់
   - \`distinct()\` : យកតែធាតុដែលមិនស្ទួន
3. **Terminal Operation (Eager - បញ្ឆេះឱ្យ Pipeline ដំណើរការ):**
   - \`toList()\` (Java 16+) ឬ \`collect(Collectors.toList())\`
   - \`forEach(consumer)\`
   - \`count()\`
   - \`reduce(identity, accumulator)\`

### ៣. គោលការណ៍ Lazy Evaluation
Intermediate Operations នឹងមិនដំណើរការឡើយ ប្រសិនបើគ្មាន **Terminal Operation** មកហៅនៅចុងបញ្ចប់។ វាជួយឱ្យ Java គណនាតែអ្វីដែលចាំបាច់បំផុត (High Performance)។`,
      contentEn: `Deep-dive into declarative stream processing, intermediate vs terminal operations, lazy execution graphs, and parallelStreams.`,
      syntax: `List<String> result = list.stream()
    .filter(s -> s.length() > 3)
    .map(String::toUpperCase)
    .sorted()
    .toList(); // Terminal Operation`,
      vocabulary: [
        {
          term: 'Stream Pipeline',
          khmerTerm: 'បំពង់បង្ហូរទិន្នន័យ Stream',
          definitionKm: 'លំដាប់នៃប្រតិបត្តិការដែលទាញទិន្នន័យពី Source កែច្នៃតាមបំពង់ និងបញ្ចប់ដោយ Terminal operation',
          definitionEn: 'A sequence of operations on a data source terminating in a result computation.',
        },
        {
          term: 'Lazy Evaluation',
          khmerTerm: 'ការវាយតម្លៃពន្យារពេល (ខ្ជិល)',
          definitionKm: 'យន្តការដែលមិនទាន់ដំណើរការកូដឡើយ រហូតទាល់តែមាន Terminal Operation ទាមទារលទ្ធផលជាក់ស្តែង',
          definitionEn: 'Postponing computation of intermediate stream steps until the terminal operation initiates.',
        },
        {
          term: 'Reduction',
          khmerTerm: 'ការបង្រួមទិន្នន័យ (Reduce)',
          definitionKm: 'ប្រតិបត្តិការដែលច្របាច់បញ្ចូលធាតុទាំងអស់ក្នុង Stream ឱ្យក្លាយជាលទ្ធផលទោលតែមួយ (ដូចជាផលបូក)',
          definitionEn: 'Combining stream elements into a single summary result.',
        },
      ],
      examples: [
        {
          title: 'ការចម្រាញ់ បម្លែង និងតម្រៀបបញ្ជីសិស្សតាម Stream API',
          code: `import java.util.List;

class Student {
    String name;
    double gpa;

    public Student(String name, double gpa) {
        this.name = name;
        this.gpa = gpa;
    }

    public String getName() { return name; }
    public double getGpa() { return gpa; }
}

public class Main {
    public static void main(String[] args) {
        List<Student> students = List.of(
            new Student("សុខា", 3.2),
            new Student("សំណាង", 3.8),
            new Student("ចិន្តា", 3.9),
            new Student("ដារ៉ា", 2.9),
            new Student("វិបុល", 3.6)
        );

        System.out.println("=== និស្សិតឆ្នើម (GPA >= 3.5) តម្រៀបពីខ្ពស់ទៅទាប ===");

        // Stream Pipeline ពេញលេញ
        List<String> honorRollNames = students.stream()
            // ១. ចម្រាញ់យកតែសិស្សដែលមាន GPA >= 3.5
            .filter(s -> s.getGpa() >= 3.5)
            // ២. តម្រៀប GPA ពីធំមកតូច
            .sorted((s1, s2) -> Double.compare(s2.getGpa(), s1.getGpa()))
            // ៣. បម្លែងពី Student Object មកជា String ឈ្មោះ និង GPA
            .map(s -> String.format("%s (GPA: %.2f)", s.getName(), s.getGpa()))
            // ៤. Terminal Operation: ប្រមូលផ្តុំជា List ថ្មី
            .toList();

        honorRollNames.forEach(info -> System.out.println("🏆 " + info));

        // ៥. គណនា GPA មធ្យមភាគសរុបដោយប្រើ mapToDouble និង average()
        double averageGpa = students.stream()
            .mapToDouble(Student::getGpa)
            .average()
            .orElse(0.0);

        System.out.printf("%nGPA មធ្យមភាគទូទាំងថ្នាក់: %.2f%n", averageGpa);
    }
}`,
          explanationKm: 'បង្ហាញពីអានុភាពនៃ Stream API ដែល filter, sorted, map និងប្រមូលផ្តុំជា List ដោយកូដខ្លី និងងាយអានជាង For Loop ធម្មតាឆ្ងាយណាស់។',
          explanationEn: 'Demonstrates declarative data processing: filtering, reverse sorting by GPA, mapping to formatted strings, and computing averages.',
          lineByLineExplanation: [
            {
              line: 'students.stream().filter(s -> s.getGpa() >= 3.5)',
              explanationKm: 'បើក Stream ហើយចម្រាញ់យកតែសិស្សដែលជាប់តារាងកិត្តិយស (GPA >= 3.5)។',
              explanationEn: 'Filters stream preserving students with GPA >= 3.5.',
            },
            {
              line: '.map(s -> String.format(...))',
              explanationKm: 'បម្លែង Object Student ទៅជាខ្សែអក្សរសម្រាប់បង្ហាញ។',
              explanationEn: 'Transforms Student stream elements into formatted String instances.',
            },
            {
              line: '.toList()',
              explanationKm: 'Terminal operation បញ្ឆេះ pipeline ហើយប្រមូលលទ្ធផលជា Unmodifiable List (Java 16+)។',
              explanationEn: 'Terminal operation collecting pipeline elements into an unmodifiable list.',
            },
          ],
          expectedOutput: `=== និស្សិតឆ្នើម (GPA >= 3.5) តម្រៀបពីខ្ពស់ទៅទាប ===
🏆 ចិន្តា (GPA: 3.90)
🏆 សំណាង (GPA: 3.80)
🏆 វិបុល (GPA: 3.60)

GPA មធ្យមភាគទូទាំងថ្នាក់: 3.48`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការព្យាយាមដំណើរការ Stream ឡើងវិញជាលើកទីពីរ (Stream Already Consumed)',
          titleEn: 'Reusing a consumed stream triggering IllegalStateException',
          badCode: `Stream<String> s = list.stream().filter(x -> x.length() > 3);
s.forEach(System.out::println); // Terminal operation ទី ១ (Stream ត្រូវបិទបញ្ចប់)
long count = s.count(); // កំហុស Runtime: stream has already been operated upon or closed!`,
          goodCode: `// ដំណោះស្រាយ: ត្រូវបង្កើត stream() ថ្មីរាល់ពេលត្រូវការប្រើ
list.stream().filter(x -> x.length() > 3).forEach(System.out::println);
long count = list.stream().filter(x -> x.length() > 3).count(); // បង្កើត stream ថ្មី`,
          explanationKm: 'Stream ក្នុង Java ដំណើរការបានតែម្តងគត់ (One-time use)។ ពេលដែល Terminal operation ដំណើរការរួច Stream នោះនឹងត្រូវបិទចោល មិនអាច reuse បានឡើយ។',
          explanationEn: 'Streams cannot be reused once a terminal operation executes. Obtain a new stream instance from the source collection.',
        },
      ],
      exercise: {
        id: 'ex-str-pipeline-1',
        titleKm: 'ចម្រាញ់ និងបូកសរុបតម្លៃទំនិញ (Product Stream Pipeline)',
        titleEn: 'Filter & Sum Product Prices with Stream',
        descriptionKm: 'ចូរបង្កើត Stream ពី List នៃតម្លៃទំនិញ `List<Double> prices = List.of(15.0, 45.0, 80.0, 120.0, 25.0);` ចម្រាញ់យកតែទំនិញដែលមានតម្លៃ `>= 50.0` និងគណនាផលបូកសរុបរបស់វា។',
        descriptionEn: 'Filter prices >= 50.0 and compute their total sum using Stream API.',
        starterCode: `import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Double> prices = List.of(15.0, 45.0, 80.0, 120.0, 25.0);
        // ប្រើ Stream filter និង sum
    }
}`,
        solutionCode: `import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Double> prices = List.of(15.0, 45.0, 80.0, 120.0, 25.0);

        double sumOver50 = prices.stream()
            .filter(p -> p >= 50.0)
            .mapToDouble(Double::doubleValue)
            .sum();

        System.out.println("ផលបូកទំនិញតម្លៃចាប់ពី $50 ឡើង: $" + sumOver50);
    }
}`,
        expectedOutput: 'ផលបូកទំនិញតម្លៃចាប់ពី $50 ឡើង: $200.0',
        hintsKm: [
          'ប្រើ `filter(p -> p >= 50.0)`',
          'ប្រើ `mapToDouble(Double::doubleValue)` រួចហៅ `sum()`',
        ],
        hintsEn: [
          'Filter with p -> p >= 50.0',
          'Call mapToDouble(Double::doubleValue).sum()',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-stm-1',
          questionKm: 'តើ Operation ណាខ្លះក្នុង Stream ដែលត្រូវបានចាត់ទុកជា Intermediate Operations?',
          questionEn: 'Which stream methods are categorized as intermediate operations?',
          difficulty: 'easy',
          hintsKm: ['filter(), map(), sorted(), distinct(), limit()'],
          hintsEn: ['filter, map, sorted, distinct.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("filter, map, sorted, distinct");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("filter, map, sorted, distinct (ផ្តល់ Stream ត្រឡប់មកវិញ)");
    }
}`,
          expectedOutput: 'filter, map, sorted, distinct (ផ្តល់ Stream ត្រឡប់មកវិញ)',
        },
        {
          id: 'pq-stm-2',
          questionKm: 'តើអ្វីជាភាពខុសគ្នារវាង `map()` និង `filter()` ក្នុង Stream Pipeline?',
          questionEn: 'What is the functional difference between map() and filter() in streams?',
          difficulty: 'medium',
          hintsKm: ['filter() ចម្រាញ់ចំនួនធាតុតាមលក្ខខណ្ឌ boolean, map() បម្លែងទម្រង់ធាតុមួយទៅទម្រង់មួយទៀត'],
          hintsEn: ['filter evaluates a predicate to include/exclude elements; map transforms elements from one type/value to another.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // ពន្យល់
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("filter() ចម្រាញ់យកធាតុតាមលក្ខខណ្ឌ boolean; map() បម្លែងធាតុពីទម្រង់មួយទៅទម្រង់ថ្មី!");
    }
}`,
          expectedOutput: 'filter() ចម្រាញ់យកធាតុតាមលក្ខខណ្ឌ boolean; map() បម្លែងធាតុពីទម្រង់មួយទៅទម្រង់ថ្មី!',
        },
        {
          id: 'pq-stm-3',
          questionKm: 'ចូរបង្ហាញការប្រើប្រាស់ `reduce()` ដើម្បីស្វែងរកពាក្យដែលមានប្រវែងវែងជាងគេបំផុតក្នុង List។',
          questionEn: 'Implement longest word search using Stream reduce().',
          difficulty: 'hard',
          hintsKm: ['ប្រើ `reduce((w1, w2) -> w1.length() >= w2.length() ? w1 : w2)`'],
          hintsEn: ['Use reduce with a binary operator comparing word lengths.'],
          starterCode: `import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> words = List.of("Java", "Spring Boot", "JDK", "Microservices");
        // ប្រើ reduce
    }
}`,
          solutionCode: `import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> words = List.of("Java", "Spring Boot", "JDK", "Microservices");

        String longest = words.stream()
            .reduce((w1, w2) -> w1.length() >= w2.length() ? w1 : w2)
            .orElse("");

        System.out.println("ពាក្យវែងបំផុត: " + longest);
    }
}`,
          expectedOutput: 'ពាក្យវែងបំផុត: Microservices',
        },
      ],
      quizzes: [
        {
          id: 'q-stm-1',
          questionKm: 'តើមានអ្វីកើតឡើងប្រសិនបើ Stream Pipeline មានតែ Intermediate Operations ដោយគ្មាន Terminal Operation?',
          questionEn: 'What happens if a stream pipeline has intermediate steps but no terminal operation?',
          optionsKm: ['គ្មានអ្វីដំណើរការឡើយ (Lazy Evaluation)', 'កម្មវិធីបោះ Compile Error', 'កូដនឹងរត់តែមិនបង្ហាញលទ្ធផល', 'កើតឡើង Infinite Loop'],
          optionsEn: ['Nothing executes (Lazy Evaluation)', 'Compile error', 'Runs without output', 'Infinite loop'],
          correctOptionIndex: 0,
          explanationKm: 'ដោយសារយន្តការ Lazy Evaluation របស់ Java Streams កូដនឹងមិនដំណើរការទាល់តែសោះ ប្រសិនបើគ្មាន Terminal Operation មកបញ្ឆេះវា។',
          explanationEn: 'Intermediate operations are lazy; without a terminal operation no processing occurs.',
          hintKm: 'Lazy Evaluation មិនទាន់រត់',
          hintEn: 'Lazy evaluation.',
        },
        {
          id: 'q-stm-2',
          questionKm: 'តើ Method ណាជា Terminal Operation ខ្លីដែលមានតាំងពី Java 16 សម្រាប់ប្រមូលធាតុ Stream ទៅជា List?',
          questionEn: 'Which concise terminal operation was added in Java 16 to collect stream elements into a list?',
          optionsKm: ['.toList()', '.collectList()', '.asList()', '.toArrayList()'],
          optionsEn: ['.toList()', '.collectList()', '.asList()', '.toArrayList()'],
          correctOptionIndex: 0,
          explanationKm: 'Java 16 បានបន្ថែម `.toList()` ខ្លីស្រួលសរសេរ ជំនួសឱ្យ `.collect(Collectors.toList())` វែងអន្លាយកាលពីមុន។',
          explanationEn: 'Java 16 introduced the direct stream.toList() convenience terminal operation.',
          hintKm: 'Method toList()',
          hintEn: '.toList().',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_intro.asp',
    },
    {
      id: 'java-concurrency-threads',
      slug: 'java-concurrency-threads',
      moduleSlug: 'lambdas-streams-concurrency',
      order: 3,
      titleKm: 'ខ្សែស្រឡាយការងារ និង Concurrency ដំបូង (Threads & Concurrency)',
      titleEn: 'Java Threads & Concurrency Fundamentals',
      difficulty: 'advanced',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីភាពខុសគ្នារវាង Process និង Thread ក្នុងប្រព័ន្ធកុំព្យូទ័រ',
        'ចេះបង្កើត Thread តាមពីរវិធី: Extends Thread Class និង Implements Runnable Interface (ឬ Lambda)',
        'ស្គាល់ពីបញ្ហា Race Condition និងការប្រើប្រាស់ពាក្យគន្លឹះ `synchronized` ការពារ Critical Section',
      ],
      objectivesEn: [
        'Distinguish operating system processes from lightweight JVM threads',
        'Create threads via Thread extension and Runnable lambda tasks',
        'Understand race conditions and synchronize critical sections to protect shared state',
      ],
      summaryKm: 'Multithreading អនុញ្ញាតឱ្យកម្មវិធី Java ដំណើរការកិច្ចការច្រើនក្នុងពេលដំណាលគ្នា (Concurrently) ទាញយកប្រយោជន៍ពេញលេញពី Multi-core CPU ទំនើប។',
      summaryEn: 'Multithreading enables concurrent execution paths within a single application, utilizing modern multi-core processors.',
      contentKm: `### ១. Process vs Thread
- **Process (ដំណើរការ):** កម្មវិធីមួយដែលកំពុងដំណើរការក្នុង OS ដែលមាន Memory Space ផ្ទាល់ខ្លួនដាច់ដោយឡែក (ដូចជា JVM ទាំងមូល)។
- **Thread (ខ្សែស្រឡាយការងារ):** ផ្នែកតូចមួយក្នុង Process ដែលចែករំលែក Heap Memory រួមគ្នា។ កម្មវិធី Java តែងតែមាន Thread យ៉ាងតិចមួយ គឺ **Main Thread**។

### ២. របៀបបង្កើត Thread ក្នុង Java
1. **វិធីទី ១: Implements \`Runnable\` (វិធីសាស្ត្រល្អបំផុត):**
\`\`\`java
Thread t = new Thread(() -> {
    System.out.println("Thread កំពុងដំណើរការ: " + Thread.currentThread().getName());
});
t.start(); // សំខាន់: ត្រូវហៅ start() មិនមែន run() ទេ!
\`\`\`
2. **វិធីទី ២: Extends \`Thread\`:**
\`\`\`java
class MyWorker extends Thread {
    public void run() { ... }
}
\`\`\`

### ៣. start() vs run()
- \`start()\` : ប្រាប់ JVM ឱ្យបង្កើត **Thread ថ្មីមួយដាច់ដោយឡែកក្នុង OS** ហើយដំណើរការ method \`run()\` ក្នុង Thread ថ្មីនោះ។
- \`run()\` : បើអ្នកហៅ \`t.run()\` ដោយផ្ទាល់ វានឹងរត់លើ **Thread ចាស់ដដែល** (គ្មានអ្វីកើតឡើងស្របគ្នាឡើយ)!

### ៤. បញ្ហា Race Condition និង synchronized
នៅពេល Thread ច្រើនព្យាយាមកែប្រែអថេររួមគ្នាក្នុងពេលតែមួយ (Shared Mutable State) ទិន្នន័យនឹងខូចខាត (Race Condition)។
- **ដំណោះស្រាយ:** ប្រើពាក្យគន្លឹះ **\`synchronized\`** ដើម្បីចាក់សោរ (Lock) អនុញ្ញាតឱ្យ Thread ចូលកែប្រែម្តងបានតែមួយគត់។`,
      contentEn: `Learn the fundamentals of Java concurrency, thread lifecycles, Runnable task delegation, race condition pitfalls, and thread synchronization.`,
      syntax: `// Creating and starting a Thread
Thread t = new Thread(() -> {
    System.out.println("ការងារស្របគ្នា");
});
t.start();
t.join(); // រង់ចាំ thread បញ្ចប់`,
      vocabulary: [
        {
          term: 'Thread',
          khmerTerm: 'ខ្សែស្រឡាយការងារ',
          definitionKm: 'លំហូរប្រតិបត្តិការកូដស្រាលបំផុតនៅក្នុង Process មួយដែលអាចដំណើរការដំណាលគ្នា',
          definitionEn: 'The smallest unit of execution within a process sharing heap memory.',
        },
        {
          term: 'Race Condition',
          khmerTerm: 'ស្ថានភាពប្រជែងទិន្នន័យ',
          definitionKm: 'កំហុសដែលកើតឡើងពេល Threads ច្រើនព្យាយាមអាន និងសរសេរទិន្នន័យរួមគ្នាក្នុងពេលតែមួយ',
          definitionEn: 'A defect where program outcome depends on the unpredictable sequence of concurrent thread timing.',
        },
        {
          term: 'Synchronized',
          khmerTerm: 'ការធ្វើសមកាលកម្ម',
          definitionKm: 'យន្តការចាក់សោរ (Lock) ដែលអនុញ្ញាតឱ្យ Thread តែមួយគត់ចូលដំណើរការប្លុកកូដក្នុងពេលជាក់លាក់មួយ',
          definitionEn: 'A Java keyword preventing concurrent execution of critical sections by multiple threads.',
        },
      ],
      examples: [
        {
          title: 'ដំណើរការ Threads ស្របគ្នា និងការដោះស្រាយ Race Condition ដោយ synchronized',
          code: `class Counter {
    private int count = 0;

    // synchronized ធានាថា Thread ចូលកែប្រែម្តងបានតែមួយគត់
    public synchronized void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        // បង្កើត Thread ទី ១: បូក ១០០០ ដង
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        }, "Worker-Thread-1");

        // បង្កើត Thread ទី ២: បូក ១០០០ ដង
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        }, "Worker-Thread-2");

        System.out.println("=== ចាប់ផ្តើម Threads ដំណើរការស្របគ្នា ===");
        t1.start();
        t2.start();

        // រង់ចាំ Threads ទាំងពីរបញ្ចប់ការងារ
        t1.join();
        t2.join();

        System.out.println("ការងារបញ្ចប់! តម្លៃ Count សរុប (រំពឹងទុក 2000): " + counter.getCount());
        System.out.println("ទិន្នន័យមានភាពសុក្រឹត ១០០% ដោយសារ synchronized!");
    }
}`,
          explanationKm: 'បង្ហាញពីការបង្កើត threads ពីរដំណើរការស្របគ្នា និងការប្រើ `synchronized` លើ method `increment()` ដើម្បីធានាថាតម្លៃចេញមក 2000 ត្រឹមត្រូវជានិច្ច គ្មានបាត់បង់។',
          explanationEn: 'Demonstrates two concurrent threads mutating a shared counter, synchronized to prevent race conditions and guarantee accurate summation.',
          lineByLineExplanation: [
            {
              line: 'public synchronized void increment()',
              explanationKm: 'ប្រើ Intrinsic Lock របស់ Object ដើម្បីអនុញ្ញាតឱ្យ thread ចូលបូកម្តងបានតែមួយគត់។',
              explanationEn: 'Locks method execution monitor so only one thread increments at a time.',
            },
            {
              line: 't1.start(); t2.start();',
              explanationKm: 'ប្រាប់ OS ឱ្យបង្កើត thread ពិតពីរដំណើរការស្របគ្នា។',
              explanationEn: 'Launches new concurrent threads in the operating system.',
            },
            {
              line: 't1.join(); t2.join();',
              explanationKm: 'Main thread រង់ចាំរហូតដល់ t1 និង t2 រត់ចប់ ទើបបន្តទៅមុខ។',
              explanationEn: 'Blocks main thread until t1 and t2 finish execution.',
            },
          ],
          expectedOutput: `=== ចាប់ផ្តើម Threads ដំណើរការស្របគ្នា ===
ការងារបញ្ចប់! តម្លៃ Count សរុប (រំពឹងទុក 2000): 2000
ទិន្នន័យមានភាពសុក្រឹត ១០០% ដោយសារ synchronized!`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការហៅ t.run() ជំនួសឱ្យ t.start()',
          titleEn: 'Calling run() directly instead of start()',
          badCode: `Thread t = new Thread(() -> {
    System.out.println("ស្របគ្នា");
});
t.run(); // កំហុស! មិនបានបង្កើត Thread ថ្មីទេ គឺរត់លើ main thread ដដែល!`,
          goodCode: `Thread t = new Thread(() -> {
    System.out.println("ស្របគ្នា");
});
t.start(); // ត្រឹមត្រូវ: បង្កើត Thread ថ្មីក្នុង OS`,
          explanationKm: '`t.run()` គ្រាន់តែជាការហៅ method ធម្មតានៅលើ Thread បច្ចុប្បន្នប៉ុណ្ណោះ។ ដើម្បីដំណើរការជា Multithreading ពិតប្រាកដ អ្នកត្រូវតែហៅ `t.start()` ជានិច្ច។',
          explanationEn: 'Calling run() directly executes in the caller thread. Only start() allocates a new OS execution thread.',
        },
      ],
      exercise: {
        id: 'ex-thr-1',
        titleKm: 'បង្កើត Thread រាប់ថយក្រោយ (Countdown Timer Thread)',
        titleEn: 'Implement Countdown Timer with Thread.sleep',
        descriptionKm: 'ចូរបង្កើត Thread មួយដែលរាប់ថយក្រោយពី ៣ ដល់ ១ ដោយប្រើ `Thread.sleep(1000)` (ផ្អាក ១ វិនាទីរាល់ជុំ) រួចបោះពុម្ពពាក្យ "🚀 បាញ់បង្ហោះរ៉ុក្កែត!"។',
        descriptionEn: 'Create a thread counting down from 3 to 1 with Thread.sleep(1000) before blastoff.',
        starterCode: `public class Main {
    public static void main(String[] args) {
        // បង្កើត thread រាប់ថយក្រោយ
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread countdown = new Thread(() -> {
            try {
                for (int i = 3; i >= 1; i--) {
                    System.out.println("⏱️ រាប់ថយក្រោយ: " + i);
                    Thread.sleep(1000); // ផ្អាក ១ វិនាទី
                }
                System.out.println("🚀 បាញ់បង្ហោះរ៉ុក្កែតជោគជ័យ!");
            } catch (InterruptedException e) {
                System.out.println("Thread ត្រូវបានរំខាន");
            }
        });

        countdown.start();
        countdown.join();
    }
}`,
        expectedOutput: `⏱️ រាប់ថយក្រោយ: 3
⏱️ រាប់ថយក្រោយ: 2
⏱️ រាប់ថយក្រោយ: 1
🚀 បាញ់បង្ហោះរ៉ុក្កែតជោគជ័យ!`,
        hintsKm: [
          'ប្រើ `Thread.sleep(1000)` ក្នុងប្លុក try-catch',
          'ហៅ `countdown.start()` និង `countdown.join()` ក្នុង main',
        ],
        hintsEn: [
          'Use Thread.sleep(1000) wrapped in try-catch',
          'Invoke countdown.start() and countdown.join()',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-thr-1',
          questionKm: 'តើ Method មួយណាដែលត្រូវហៅដើម្បីឱ្យ JVM បង្កើត Thread ថ្មីដំណើរការក្នុង OS?',
          questionEn: 'Which method initiates new thread execution in Java?',
          difficulty: 'easy',
          hintsKm: ['Method start() មិនមែន run() ទេ'],
          hintsEn: ['start() method.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("start()");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("start()");
    }
}`,
          expectedOutput: 'start()',
        },
        {
          id: 'pq-thr-2',
          questionKm: 'តើហេតុអ្វីបានជាគេនិយមប្រើ `implements Runnable` ជាង `extends Thread`?',
          questionEn: 'Why is implementing Runnable preferred over extending Thread class?',
          difficulty: 'medium',
          hintsKm: ['Java មិនគាំទ្រ Multiple Inheritance នៃ Class ទេ ដូច្នេះបើ extends Thread យើងមិនអាច extends Class ដទៃទៀតបានឡើយ'],
          hintsEn: ['Java only permits single class inheritance; implementing Runnable keeps your class open to extend another parent.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // ពន្យល់
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("implements Runnable អនុញ្ញាតឱ្យ Class នៅតែអាច extends Class ផ្សេងទៀតបាន (Single Inheritance Flexibility)!");
    }
}`,
          expectedOutput: 'implements Runnable អនុញ្ញាតឱ្យ Class នៅតែអាច extends Class ផ្សេងទៀតបាន (Single Inheritance Flexibility)!',
        },
        {
          id: 'pq-thr-3',
          questionKm: 'ចូរបង្ហាញកូដដែល Main Thread រង់ចាំ Threads ពីរបញ្ចប់ការងារដោយប្រើ `thread.join()`។',
          questionEn: 'Demonstrate coordinating thread completion using join().',
          difficulty: 'hard',
          hintsKm: ['បង្កើត t1, t2 រួចហៅ `t1.start(); t2.start(); t1.join(); t2.join();`'],
          hintsEn: ['Call start() then join() on both thread instances.'],
          starterCode: `public class Main {
    public static void main(String[] args) throws Exception {
        // បង្កើត threads និង join
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread taskA = new Thread(() -> System.out.println("កិច្ចការ A សម្រេច"));
        Thread taskB = new Thread(() -> System.out.println("កិច្ចការ B សម្រេច"));

        taskA.start();
        taskB.start();

        taskA.join();
        taskB.join();

        System.out.println("Main Thread: គ្រប់កិច្ចការទាំងអស់ត្រូវបានបញ្ចប់!");
    }
}`,
          expectedOutput: `កិច្ចការ A សម្រេច
កិច្ចការ B សម្រេច
Main Thread: គ្រប់កិច្ចការទាំងអស់ត្រូវបានបញ្ចប់!`,
        },
      ],
      quizzes: [
        {
          id: 'q-thr-1',
          questionKm: 'តើពាក្យគន្លឹះណាដែលប្រើសម្រាប់ការពារកុំឱ្យ Threads ច្រើនចូលកែប្រែទិន្នន័យរួមគ្នាក្នុងពេលតែមួយ?',
          questionEn: 'Which keyword prevents concurrent threads from executing a critical section simultaneously?',
          optionsKm: ['synchronized', 'volatile', 'transient', 'static'],
          optionsEn: ['synchronized', 'volatile', 'transient', 'static'],
          correctOptionIndex: 0,
          explanationKm: '`synchronized` ចាក់សោរលើ Method ឬ Code block ការពារបញ្ហា Race Condition។',
          explanationEn: 'synchronized acquires an object monitor lock allowing single-threaded access to critical sections.',
          hintKm: 'ពាក្យ synchronized',
          hintEn: 'synchronized keyword.',
        },
        {
          id: 'q-thr-2',
          questionKm: 'តើ Method ណាដែលធ្វើឱ្យ Thread បច្ចុប្បន្នផ្អាកដំណើរការបណ្តោះអាសន្នតាមចំនួនមីលីវិនាទី (Milliseconds)?',
          questionEn: 'Which static method pauses current thread execution for a specified duration in milliseconds?',
          optionsKm: ['Thread.sleep(millis)', 'Thread.wait(millis)', 'Thread.pause(millis)', 'Thread.stop()'],
          optionsEn: ['Thread.sleep(millis)', 'Thread.wait(millis)', 'Thread.pause(millis)', 'Thread.stop()'],
          correctOptionIndex: 0,
          explanationKm: '`Thread.sleep(long millis)` ផ្អាក Thread បច្ចុប្បន្នដោយមិនលែង Monitor Lock ឡើយ។',
          explanationEn: 'Thread.sleep() causes the currently executing thread to sleep for the specified milliseconds.',
          hintKm: 'ពាក្យ sleep (គេង)',
          hintEn: 'Thread.sleep().',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_threads.asp',
    },
  ],
};
