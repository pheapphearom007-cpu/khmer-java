import { CurriculumModule } from '../../types';

export const MODULE_4_CLASSES_OOP: CurriculumModule = {
  id: 'mod-4',
  slug: 'classes-objects-oop',
  titleKm: '៤. ថ្នាក់ វត្ថុ និងគោលការណ៍គ្រឹះ OOP (Classes, Objects, Constructors & Encapsulation)',
  titleEn: '4. Classes, Objects, Constructors & OOP Basics',
  descriptionKm: 'ឈានជើងចូលពិភព Object-Oriented Programming (OOP) ពិតប្រាកដ រៀនពី Class, Object, Constructor Chaining និង Encapsulation ការពារទិន្នន័យ។',
  descriptionEn: 'Step into real-world Object-Oriented Programming (OOP): blueprints, heap instances, constructor chaining, and data encapsulation.',
  icon: 'Box',
  level: 'intermediate',
  lessons: [
    {
      id: 'java-classes-objects',
      slug: 'java-classes-objects',
      moduleSlug: 'classes-objects-oop',
      order: 1,
      titleKm: 'ថ្នាក់ និងវត្ថុក្នុង Java (Classes, Objects & Heap vs Stack)',
      titleEn: 'Java Classes, Objects & Heap vs Stack Memory',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីទស្សនទាន OOP: ភាពខុសគ្នារវាង Class (ប្លង់មេ) និង Object (វត្ថុជាក់ស្តែង)',
        'ស្គាល់ពី State (Attributes/Fields) និង Behavior (Methods) របស់ Object',
        'យល់ច្បាស់ពីរបៀបដែល JVM បែងចែក Memory: Stack ផ្ទុក Reference ចំណែក Heap ផ្ទុក Object ជាក់ស្តែង',
      ],
      objectivesEn: [
        'Understand OOP philosophy: Class as a blueprint vs Object as a concrete instance',
        'Model object state (instance fields) and behaviors (instance methods)',
        'Visualize memory layout: stack reference variables pointing to heap instances',
      ],
      summaryKm: 'Object-Oriented Programming (OOP) គឺជាបេះដូងរបស់ Java។ រៀនបង្កើត Class ជាប្លង់មេ និងបង្កើត Objects ជាច្រើនចេញពីប្លង់មេនោះ។',
      summaryEn: 'OOP models real-world entities through classes and instances allocated in heap memory.',
      contentKm: `### ១. Class និង Object ជាអ្វី?
- **Class (ប្លង់មេ):** ប្រៀបដូចជាប្លង់ស្ថាបត្យកម្មនៃផ្ទះមួយ ឬពុម្ពនំ។ វាកំណត់ថាតើផ្ទះនោះមានបន្ទប់ប៉ុន្មាន ឬនំនោះមានរូបរាងយ៉ាងណា តែវាមិនទាន់ជាផ្ទះ ឬនំពិតនៅឡើយទេ។
- **Object (វត្ថុជាក់ស្តែង):** គឺជាផ្ទះពិតប្រាកដដែលសាងសង់ចេញពីប្លង់មេនោះ។ អ្នកអាចសាងសង់ផ្ទះ (Objects) រាប់ពាន់ខ្នងចេញពីប្លង់មេ (Class) តែមួយ!

សមាសភាគនៃ Object៖
1. **State (ស្ថានភាព/ទិន្នន័យ):** កំណត់ដោយ Instance Variables ដូចជា ឈ្មោះ អាយុ ពណ៌។
2. **Behavior (អាកប្បកិរិយា/សកម្មភាព):** កំណត់ដោយ Methods ដូចជា ដើរ និយាយ គណនា។

### ២. របៀបបង្កើត Object ជាមួយពាក្យគន្លឹះ new
\`\`\`java
Student s1 = new Student();
\`\`\`
- \`Student s1\`: បង្កើត Reference Variable នៅក្នុង **Stack Memory**។
- \`new Student()\`: កក់ទីតាំង Memory ថ្មីក្នុង **Heap Memory** ដើម្បីផ្ទុក Object ជាក់ស្តែង។
- សញ្ញា \`=\`: ភ្ជាប់អាសយដ្ឋាននៃ Heap មកកាន់អថេរ \`s1\` ក្នុង Stack។

### ៣. វត្ថុច្រើន ចង្អុលចេញពី Class តែមួយ
អ្នកអាចបង្កើត Object \`s1\` តំណាងឱ្យសិស្សឈ្មោះ "សុខ" និង \`s2\` តំណាងឱ្យសិស្សឈ្មោះ "ដារ៉ា"។ Object នីមួយៗមានទិន្នន័យដាច់ដោយឡែកពីគ្នាក្នុង Heap Memory។`,
      contentEn: `Learn the blueprint-instance paradigm, heap vs stack reference mechanisms, and modeling state and behavior in Java.`,
      syntax: `// ១. កំណត់ Class
class Car {
    String model;
    int year;

    void drive() {
        System.out.println("កំពុងបើកបរ...");
    }
}

// ២. បង្កើត Object
Car myCar = new Car();
myCar.model = "Toyota Camry";
myCar.drive();`,
      vocabulary: [
        {
          term: 'Class',
          khmerTerm: 'ថ្នាក់ (ប្លង់មេ)',
          definitionKm: 'ប្លង់មេ ឬពុម្ពគំរូដែលកំណត់ attributes និង methods សម្រាប់បង្កើត Objects',
          definitionEn: 'A user-defined prototype or blueprint from which objects are created.',
        },
        {
          term: 'Object / Instance',
          khmerTerm: 'វត្ថុ / គំរូជាក់ស្តែង',
          definitionKm: 'វត្ថុពិតប្រាកដដែលត្រូវបានបង្កើតឡើងក្នុង Memory ដោយផ្អែកលើ Class',
          definitionEn: 'A concrete instance of a class with allocated memory, state, and behaviors.',
        },
        {
          term: 'Instantiation',
          khmerTerm: 'ការបង្កើត Instance',
          definitionKm: 'ដំណើរការនៃការប្រើប្រាស់ពាក្យគន្លឹះ new ដើម្បីកក់ Memory បង្កើត Object ថ្មី',
          definitionEn: 'The act of allocating memory and creating a concrete instance using the new keyword.',
        },
      ],
      examples: [
        {
          title: 'ការបង្កើត Class សិស្ស និង Instantiation Objects ច្រើន',
          code: `class Student {
    // Instance Variables (State)
    String name;
    int age;
    double gpa;

    // Instance Method (Behavior)
    void displayProfile() {
        System.out.printf("សិស្ស: %-10s | អាយុ: %d ឆ្នាំ | និទ្ទេស GPA: %.2f%n", name, age, gpa);
    }

    boolean isHonorRoll() {
        return gpa >= 3.5;
    }
}

public class Main {
    public static void main(String[] args) {
        // បង្កើត Object ទី ១
        Student s1 = new Student();
        s1.name = "សុខ សំណាង";
        s1.age = 20;
        s1.gpa = 3.85;

        // បង្កើត Object ទី ២
        Student s2 = new Student();
        s2.name = "គង់ ចិន្តា";
        s2.age = 19;
        s2.gpa = 3.20;

        System.out.println("=== បញ្ជីព័ត៌មាននិស្សិត ===");
        s1.displayProfile();
        System.out.println("-> ជាប់តារាងកិត្តិយស: " + s1.isHonorRoll());

        s2.displayProfile();
        System.out.println("-> ជាប់តារាងកិត្តិយស: " + s2.isHonorRoll());
    }
}`,
          explanationKm: 'កូដនេះបង្កើត Class `Student` ដែលមាន attributes និង methods រួចបង្កើត Objects ពីរផ្សេងគ្នា `s1` និង `s2` ដែលផ្ទុកទិន្នន័យរៀងៗខ្លួន។',
          explanationEn: 'Defines a Student class template and instantiates two distinct student objects in the heap.',
          lineByLineExplanation: [
            {
              line: 'class Student { ... }',
              explanationKm: 'ប្រកាសប្លង់មេ Student ដែលមាន fields (name, age, gpa) និង methods។',
              explanationEn: 'Class declaration specifying fields and member methods.',
            },
            {
              line: 'Student s1 = new Student();',
              explanationKm: 'កក់ Memory ក្នុង Heap បង្កើត Object សិស្សទីមួយ ហើយឱ្យ s1 ចង្អុលទៅ។',
              explanationEn: 'Allocates heap space for new Student instance and stores reference in s1.',
            },
            {
              line: 's1.displayProfile();',
              explanationKm: 'ហៅ method displayProfile() ឱ្យដំណើរការលើទិន្នន័យរបស់ Object s1។',
              explanationEn: 'Invokes member method on the s1 instance context.',
            },
          ],
          expectedOutput: `=== បញ្ជីព័ត៌មាននិស្សិត ===
សិស្ស: សុខ សំណាង   | អាយុ: 20 ឆ្នាំ | និទ្ទេស GPA: 3.85
-> ជាប់តារាងកិត្តិយស: true
សិស្ស: គង់ ចិន្តា    | អាយុ: 19 ឆ្នាំ | និទ្ទេស GPA: 3.20
-> ជាប់តារាងកិត្តិយស: false`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'កំហុស NullPointerException ដោយសារភ្លេចប្រើ new',
          titleEn: 'Attempting to access fields on an uninstantiated null reference',
          badCode: `Student s; // គ្រាន់តែជា Reference អថេរទទេ (null) គ្មាន Object ក្នុង Heap ទេ
s.name = "សុខ"; // បោះកំហុស NullPointerException ភ្លាម!`,
          goodCode: `Student s = new Student(); // បង្កើត Object ពិតប្រាកដក្នុង Heap
s.name = "សុខ"; // ត្រឹមត្រូវ`,
          explanationKm: 'ការប្រកាស `Student s;` មិនទាន់បង្កើត Object ក្នុង Memory ឡើយ។ បើគ្មាន `new Student()` អថេរនោះផ្ទុកតម្លៃ `null` ហើយការហៅ field នឹងបណ្តាលឱ្យកើត NullPointerException។',
          explanationEn: 'Declaring a reference does not allocate heap memory. Attempting to dereference a null pointer throws NullPointerException.',
        },
      ],
      exercise: {
        id: 'ex-cls-1',
        titleKm: 'បង្កើត Class គណនីធនាគារ (BankAccount Class)',
        titleEn: 'Implement BankAccount with Deposit & Withdraw',
        descriptionKm: 'ចូរបង្កើត Class `BankAccount` ដែលមាន fields `accountNumber`, `balance` និង methods `deposit(double amount)` និង `withdraw(double amount)` រួចសាកល្បងដាក់ប្រាក់ និងដកប្រាក់ក្នុង `main`។',
        descriptionEn: 'Create BankAccount class with deposit and withdraw methods and test transactions.',
        starterCode: `class BankAccount {
    String accountNumber;
    double balance;
    
    // បង្កើត method deposit និង withdraw
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount();
        acc.accountNumber = "ABA-123456";
        acc.balance = 100.0;
        
        // ដាក់ប្រាក់ $50 និងដកប្រាក់ $30
        
    }
}`,
        solutionCode: `class BankAccount {
    String accountNumber;
    double balance;
    
    void deposit(double amount) {
        balance += amount;
        System.out.printf("ដាក់ប្រាក់: +$%.2f | សមតុល្យថ្មី: $%.2f%n", amount, balance);
    }
    
    void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            System.out.printf("ដកប្រាក់: -$%.2f | សមតុល្យនៅសល់: $%.2f%n", amount, balance);
        } else {
            System.out.println("សមតុល្យមិនគ្រប់គ្រាន់សម្រាប់ដកប្រាក់ឡើយ!");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount();
        acc.accountNumber = "ABA-123456";
        acc.balance = 100.0;
        
        System.out.println("គណនី: " + acc.accountNumber + " | សមតុល្យដើម: $" + acc.balance);
        acc.deposit(50.0);
        acc.withdraw(30.0);
    }
}`,
        hintsKm: [
          'ក្នុង method `deposit(double amount)` ត្រូវបូក `balance += amount;`',
          'ក្នុង method `withdraw(double amount)` ត្រូវពិនិត្យ `amount <= balance` មុននឹងដក',
        ],
        hintsEn: [
          'In deposit(), increment balance += amount',
          'In withdraw(), guard with if (amount <= balance)',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-cls-1',
          questionKm: 'តើពាក្យគន្លឹះមួយណាដែលប្រើសម្រាប់បង្កើត Object ថ្មីក្នុង Heap Memory នៃ Java?',
          questionEn: 'Which keyword dynamically allocates memory for an object in Java?',
          difficulty: 'easy',
          hintsKm: ['ពាក្យមានន័យថា "ថ្មី"'],
          hintsEn: ['new keyword.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("new");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("new");
    }
}`,
          expectedOutput: 'new',
        },
        {
          id: 'pq-cls-2',
          questionKm: 'តើមានអ្វីកើតឡើងនៅពេល Object មួយនៅក្នុង Heap លែងមាន Reference Variable ណាទៀតចង្អុលទៅវា?',
          questionEn: 'What happens to a heap object when it has no active references pointing to it?',
          difficulty: 'medium',
          hintsKm: ['វានឹងក្លាយជា Unreachable ហើយរង់ចាំ Garbage Collector (GC) មកសម្អាត'],
          hintsEn: ['It becomes eligible for automatic garbage collection.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បោះពុម្ពចម្លើយ
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Object ក្លាយជា Unreachable ហើយត្រូវបាន Garbage Collector (GC) សម្អាតចោលដោយស្វ័យប្រវត្តិ!");
    }
}`,
          expectedOutput: 'Object ក្លាយជា Unreachable ហើយត្រូវបាន Garbage Collector (GC) សម្អាតចោលដោយស្វ័យប្រវត្តិ!',
        },
        {
          id: 'pq-cls-3',
          questionKm: 'ចូរបង្កើត Class `Rectangle` ដែលមាន fields `width` និង `height` រួចបង្កើត method គណនាផ្ទៃក្រឡា `calculateArea()` និងបរិមាត្រ `calculatePerimeter()`។',
          questionEn: 'Create a Rectangle class with width and height, and implement calculateArea() and calculatePerimeter().',
          difficulty: 'hard',
          hintsKm: ['ផ្ទៃក្រឡា = width * height; បរិមាត្រ = 2 * (width + height)'],
          hintsEn: ['Area = width * height; Perimeter = 2 * (width + height).'],
          starterCode: `class Rectangle {
    // សរសេរកូដនៅទីនេះ
}

public class Main {
    public static void main(String[] args) {
        
    }
}`,
          solutionCode: `class Rectangle {
    double width;
    double height;

    double calculateArea() {
        return width * height;
    }

    double calculatePerimeter() {
        return 2 * (width + height);
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle rect = new Rectangle();
        rect.width = 5.0;
        rect.height = 3.0;

        System.out.println("ផ្ទៃក្រឡា: " + rect.calculateArea());
        System.out.println("បរិមាត្រ: " + rect.calculatePerimeter());
    }
}`,
          expectedOutput: `ផ្ទៃក្រឡា: 15.0
បរិមាត្រ: 16.0`,
        },
      ],
      quizzes: [
        {
          id: 'q-cls-1',
          questionKm: 'តើ Reference Variable និង Object ជាក់ស្តែងត្រូវបានរក្សាទុកនៅតំបន់ Memory ណាខ្លះ?',
          questionEn: 'Where are reference variables and actual object instances stored in memory?',
          optionsKm: ['Reference ក្នុង Stack, Object ក្នុង Heap', 'Reference ក្នុង Heap, Object ក្នុង Stack', 'ទាំងពីរក្នុង Stack', 'ទាំងពីរក្នុង Method Area'],
          optionsEn: ['Reference in Stack, Object in Heap', 'Reference in Heap, Object in Stack', 'Both in Stack', 'Both in Method Area'],
          correctOptionIndex: 0,
          explanationKm: 'អថេរ Reference (Pointer) ត្រូវបានផ្ទុកនៅក្នុង Stack Memory របស់ Thread ចំណែក Object ពិតប្រាកដត្រូវបានបង្កើតនៅក្នុង Heap Memory។',
          explanationEn: 'Stack frames store local reference handles pointing to allocated heap object memory.',
          hintKm: 'Stack ផ្ទុក pointer, Heap ផ្ទុក object ធំ',
          hintEn: 'Stack holds pointer, heap holds instance.',
        },
        {
          id: 'q-cls-2',
          questionKm: 'តើតម្លៃលំនាំដើមនៃ Object Reference Variable ពេលទើបប្រកាសហើយមិនទាន់ដាក់តម្លៃគឺជាអ្វី?',
          questionEn: 'What is the default value of an uninitialized object reference field in a class?',
          optionsKm: ['null', '0', 'undefined', 'false'],
          optionsEn: ['null', '0', 'undefined', 'false'],
          correctOptionIndex: 0,
          explanationKm: 'រាល់ Reference Type ទាំងអស់ក្នុង Java មានតម្លៃលំនាំដើមជា `null` ដែលមានន័យថាវាមិនទាន់ចង្អុលទៅកាន់ Object ណាមួយក្នុង Heap ឡើយ។',
          explanationEn: 'All uninitialized reference variables in Java evaluate to null.',
          hintKm: 'ពាក្យ null',
          hintEn: 'null reference.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_classes.asp',
    },
    {
      id: 'java-constructors-this',
      slug: 'java-constructors-this',
      moduleSlug: 'classes-objects-oop',
      order: 2,
      titleKm: 'Constructor និងពាក្យគន្លឹះ this (Constructors & "this" Keyword)',
      titleEn: 'Java Constructors & The "this" Keyword',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីតួនាទីរបស់ Constructor ក្នុងការកំណត់តម្លៃដំបូង (Initialization) នៃ Object',
        'ស្គាល់ពី Default Constructor, Parameterized Constructor និង Constructor Overloading',
        'ចេះប្រើប្រាស់ពាក្យគន្លឹះ `this` ដើម្បីដោះស្រាយបញ្ហា Name Shadowing និងធ្វើ Constructor Chaining (`this()`)',
      ],
      objectivesEn: [
        'Understand constructor roles in initializing object state safely',
        'Differentiate between default, no-arg, and overloaded constructors',
        'Apply the this keyword for name shadowing and constructor chaining (this())',
      ],
      summaryKm: 'Constructor គឺជា Method ពិសេសដែលដំណើរការដោយស្វ័យប្រវត្តភ្លាមៗនៅពេលបង្កើត Object ជាមួយ new។ រៀនប្រើ this និង constructor chaining ដើម្បីកូដខ្លីស្អាត។',
      summaryEn: 'Constructors initialize newly created instances. Use this and constructor chaining for clean initialization.',
      contentKm: `### ១. អ្វីទៅជា Constructor?
Constructor គឺជាប្លុកកូដពិសេសដែលមានលក្ខណៈសម្គាល់ ២ យ៉ាង៖
1. **ឈ្មោះរបស់វាត្រូវតែដូចគ្នា ១០០% ទៅនឹងឈ្មោះ Class**។
2. **គ្មាន Return Type ឡើយ** (សូម្បីតែ \`void\` ក៏មិនត្រូវមានដែរ)។

\`\`\`java
class Book {
    String title;

    // Constructor
    Book(String t) {
        title = t;
    }
}
\`\`\`

### ២. ប្រភេទនៃ Constructor
1. **Default Constructor:** ប្រសិនបើអ្នកមិនសរសេរ Constructor ណាមួយទាល់តែសោះ Java Compiler នឹងបង្កើត No-argument Constructor មួយដោយស្វ័យប្រវត្ត។ ប៉ុន្តែបើអ្នកបានសរសេរ Constructor មួយហើយនោះ Default Constructor នឹងលែងមានទៀតហើយ!
2. **Parameterized Constructor:** Constructor ដែលទទួលទិន្នន័យដើម្បីកំណត់តម្លៃភ្លាមៗពេល \`new\`។
3. **Constructor Overloading:** បង្កើត Constructor ច្រើនដែលមាន Parameters ខុសៗគ្នា។

### ៣. ពាក្យគន្លឹះ this
- **ដោះស្រាយ Name Shadowing:** ពេលដែលឈ្មោះ Parameter ដូចគ្នាទៅនឹងឈ្មោះ Instance Variable:
\`\`\`java
public Student(String name, int age) {
    this.name = name; // this.name សំដៅលើ instance variable
    this.age = age;
}
\`\`\`
- **Constructor Chaining (\`this(...)\`):** ហៅ Constructor មួយផ្សេងទៀតក្នុង Class ដដែល ដើម្បីកុំឱ្យសរសេរកូដដដែលៗ (ត្រូវតែស្ថិតនៅ **បន្ទាត់ទី ១** នៃ Constructor ជានិច្ច)។`,
      contentEn: `Learn constructors, no-arg defaults, constructor overloading, resolving field shadowing with this.field, and chaining with this().`,
      syntax: `public class Product {
    private String name;
    private double price;

    // Constructor Chaining
    public Product(String name) {
        this(name, 0.0); // ហៅ Constructor ២ ប៉ារ៉ាម៉ែត្រ
    }

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
}`,
      vocabulary: [
        {
          term: 'Constructor',
          khmerTerm: 'ខនស្ត្រាក់ទ័រ (អ្នកស្ថាបនា)',
          definitionKm: 'Method ពិសេសដែលមានឈ្មោះដូច Class សម្រាប់កំណត់តម្លៃដំបូងឱ្យ Object ពេលត្រូវបានបង្កើត',
          definitionEn: 'Special member function invoked upon object creation to initialize instance state.',
        },
        {
          term: 'this Keyword',
          khmerTerm: 'ពាក្យគន្លឹះ this',
          definitionKm: 'Reference Variable ដែលចង្អុលទៅកាន់ Object បច្ចុប្បន្នដែលកំពុងដំណើរការ',
          definitionEn: 'Reference variable referring to the current object instance within a method or constructor.',
        },
        {
          term: 'Constructor Chaining',
          khmerTerm: 'ច្រវាក់ Constructor',
          definitionKm: 'ការហៅ Constructor មួយពីក្នុង Constructor មួយទៀតក្នុង Class ដដែលដោយប្រើ this(...)',
          definitionEn: 'Calling one constructor from another constructor within the same class using this().',
        },
      ],
      examples: [
        {
          title: 'Constructor Overloading និង Constructor Chaining',
          code: `class Employee {
    String name;
    String department;
    double salary;

    // Constructor ទី ១: ពេញលេញ (Full Parameters)
    public Employee(String name, String department, double salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    // Constructor ទី ២: បុគ្គលិកទើបចូល (Default Salary = $350)
    public Employee(String name, String department) {
        this(name, department, 350.0); // Constructor Chaining ទៅទី ១
    }

    // Constructor ទី ៣: បុគ្គលិកហាត់ការ (Default Dept = "Intern", Salary = $150)
    public Employee(String name) {
        this(name, "ហាត់ការ (Intern)", 150.0); // Chaining
    }

    void printInfo() {
        System.out.printf("បុគ្គលិក: %-15s | ផ្នែក: %-16s | ប្រាក់ខែ: $%.2f%n", 
            this.name, this.department, this.salary);
    }
}

public class Main {
    public static void main(String[] args) {
        // បង្កើត Object ដោយប្រើ Constructor ទាំង ៣ បែប
        Employee emp1 = new Employee("សុខ សុវណ្ណ", "អភិវឌ្ឍន៍ Software", 1200.0);
        Employee emp2 = new Employee("គង់ មករា", "ទីផ្សារ (Marketing)");
        Employee emp3 = new Employee("លី សីហា");

        System.out.println("=== បញ្ជីបុគ្គលិកក្រុមហ៊ុន ===");
        emp1.printInfo();
        emp2.printInfo();
        emp3.printInfo();
    }
}`,
          explanationKm: 'បង្ហាញពីការប្រើ `this.name = name` ការពារច្រឡំឈ្មោះ និងការប្រើ `this(...)` ហៅ constructor មេ ជួយកាត់បន្ថយការសរសេរកូដជាន់គ្នា។',
          explanationEn: 'Demonstrates constructor chaining via this() delegating to a primary constructor to avoid duplicated code.',
          lineByLineExplanation: [
            {
              line: 'this(name, department, 350.0);',
              explanationKm: 'ហៅ Constructor ៣ ប៉ារ៉ាម៉ែត្រដោយស្វ័យប្រវត្តិ ដោយកំណត់ប្រាក់ខែលំនាំដើម $350។',
              explanationEn: 'Constructor chaining delegating to the 3-argument constructor with default salary.',
            },
            {
              line: 'this.name = name;',
              explanationKm: 'បញ្ជាក់ថា name ខាងឆ្វេងជា instance field របស់ Object ចំណែក name ខាងស្តាំជា parameter។',
              explanationEn: 'Disambiguates between the instance field and local parameter.',
            },
          ],
          expectedOutput: `=== បញ្ជីបុគ្គលិកក្រុមហ៊ុន ===
បុគ្គលិក: សុខ សុវណ្ណ       | ផ្នែក: អភិវឌ្ឍន៍ Software | ប្រាក់ខែ: $1200.00
បុគ្គលិក: គង់ មករា        | ផ្នែក: ទីផ្សារ (Marketing) | ប្រាក់ខែ: $350.00
បុគ្គលិក: លី សីហា         | ផ្នែក: ហាត់ការ (Intern)    | ប្រាក់ខែ: $150.00`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការដាក់ this() នៅក្រោមបន្ទាត់ផ្សេងក្នុង Constructor',
          titleEn: 'Placing this() constructor invocation after other statements',
          badCode: `public Employee(String name) {
    System.out.println("បង្កើតបុគ្គលិក..."); // កំហុស Compile Error!
    this(name, "General", 200.0); // this() ត្រូវតែនៅបន្ទាត់ទី ១!
}`,
          goodCode: `public Employee(String name) {
    this(name, "General", 200.0); // ត្រឹមត្រូវ: នៅបន្ទាត់ទី ១
    System.out.println("បង្កើតបុគ្គលិក...");
}`,
          explanationKm: 'ការហៅ Constructor Chaining `this(...)` ត្រូវតែជា Statement ទីមួយបង្អស់ (first statement) ក្នុង Constructor ជានិច្ច បើមិនដូច្នេះទេ Compiler នឹងបោះកំហុសភ្លាម។',
          explanationEn: 'Constructor call this() must strictly be the first line in the constructor body.',
        },
      ],
      exercise: {
        id: 'ex-con-1',
        titleKm: 'បង្កើត Class ឡាន (Car) ជាមួយ Constructor Overloading',
        titleEn: 'Create Car Class with Constructor Overloading',
        descriptionKm: 'ចូរបង្កើត Class `Car` ដែលមាន fields `brand`, `model`, `year` និងបង្កើត Constructor ពីរ៖ មួយទទួល parameter ទាំង ៣ និងមួយទៀតទទួលតែ `brand` និង `model` ដោយកំណត់ `year = 2026` តាមរយៈ `this(...)`។',
        descriptionEn: 'Create Car class with two constructors using constructor chaining to set default year to 2026.',
        starterCode: `class Car {
    String brand;
    String model;
    int year;
    
    // បង្កើត Constructors ដោយប្រើ this(...)
}

public class Main {
    public static void main(String[] args) {
        // បង្កើតឡានពីរគ្រឿង
    }
}`,
        solutionCode: `class Car {
    String brand;
    String model;
    int year;
    
    public Car(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    
    public Car(String brand, String model) {
        this(brand, model, 2026); // Chaining
    }
    
    void display() {
        System.out.println("ឡាន: " + brand + " " + model + " (ឆ្នាំ " + year + ")");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car1 = new Car("Toyota", "Prius", 2022);
        Car car2 = new Car("Tesla", "Model 3");
        
        car1.display();
        car2.display();
    }
}`,
        hintsKm: [
          'ប្រើ `this.brand = brand;` ក្នុង constructor ធំ',
          'ក្នុង constructor តូច ប្រើ `this(brand, model, 2026);` នៅបន្ទាត់ទីមួយ',
        ],
        hintsEn: [
          'Use this.brand = brand in primary constructor',
          'Use this(brand, model, 2026) as first statement in overloaded constructor',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-con-1',
          questionKm: 'តើ Constructor អាចមាន Return Type (ដូចជា void ឬ int) បានដែរឬទេ?',
          questionEn: 'Can a Java constructor declare a return type like void or int?',
          difficulty: 'easy',
          hintsKm: ['បើដាក់ return type វានឹងក្លាយជា Method ធម្មតាភ្លាម មិនមែនជា Constructor ទៀតឡើយ'],
          hintsEn: ['No. Adding a return type converts it into a normal method.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("មិនអាចទេ");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("មិនអាចទេ! Constructor គ្មាន Return Type ឡើយ សូម្បីតែ void ក៏មិនអាចមានដែរ!");
    }
}`,
          expectedOutput: 'មិនអាចទេ! Constructor គ្មាន Return Type ឡើយ សូម្បីតែ void ក៏មិនអាចមានដែរ!',
        },
        {
          id: 'pq-con-2',
          questionKm: 'ប្រសិនបើអ្នកបានបង្កើត Constructor ដែលមាន Parameters មួយ តើ Compiler នៅតែបង្កើត No-arg Constructor ឱ្យអ្នកដោយស្វ័យប្រវត្តិទៀតដែរឬទេ?',
          questionEn: 'Does the compiler still generate a default no-argument constructor if you define a custom constructor?',
          difficulty: 'medium',
          hintsKm: ['ទេ! នៅពេលអ្នកបង្កើត constructor ខ្លួនឯង Java នឹងដក default constructor ចេញ'],
          hintsEn: ['No. Java only provides the default constructor if no constructors are explicitly declared.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បោះពុម្ពការពន្យល់
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("ទេ! បើអ្នកសរសេរ Constructor ផ្ទាល់ខ្លួន Java នឹងមិនបង្កើត No-arg Constructor ឱ្យទៀតឡើយ!");
    }
}`,
          expectedOutput: 'ទេ! បើអ្នកសរសេរ Constructor ផ្ទាល់ខ្លួន Java នឹងមិនបង្កើត No-arg Constructor ឱ្យទៀតឡើយ!',
        },
        {
          id: 'pq-con-3',
          questionKm: 'ចូរបង្ហាញកូដ Copy Constructor ក្នុង Java (Constructor ដែលទទួល Object នៃ Class ដដែលមកចម្លងតម្លៃបង្កើត Object ថ្មី)។',
          questionEn: 'Demonstrate a Copy Constructor pattern that clones fields from another instance into a new object.',
          difficulty: 'hard',
          hintsKm: ['បង្កើត `public Point(Point other)` ហើយចម្លង `this.x = other.x;`'],
          hintsEn: ['Define public Point(Point other) copying fields from the parameter.'],
          starterCode: `class Point {
    int x, y;
    // បង្កើត regular constructor និង copy constructor
}

public class Main {
    public static void main(String[] args) {
        
    }
}`,
          solutionCode: `class Point {
    int x, y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    // Copy Constructor
    public Point(Point other) {
        this.x = other.x;
        this.y = other.y;
    }
}

public class Main {
    public static void main(String[] args) {
        Point p1 = new Point(10, 20);
        Point p2 = new Point(p1); // ចម្លងតម្លៃពី p1

        System.out.println("p1: (" + p1.x + ", " + p1.y + ")");
        System.out.println("p2 (Copy): (" + p2.x + ", " + p2.y + ")");
        System.out.println("ជា Object ដាច់ដោយឡែកពីគ្នា: " + (p1 != p2));
    }
}`,
          expectedOutput: `p1: (10, 20)
p2 (Copy): (10, 20)
ជា Object ដាច់ដោយឡែកពីគ្នា: true`,
        },
      ],
      quizzes: [
        {
          id: 'q-con-1',
          questionKm: 'តើការហៅ Constructor Chaining `this(...)` ត្រូវស្ថិតនៅទីតាំងណាខ្លះក្នុង Constructor?',
          questionEn: 'Where must this(...) constructor invocation appear inside a constructor?',
          optionsKm: ['នៅបន្ទាត់ទីមួយបង្អស់ (First Statement) ជានិច្ច', 'នៅបន្ទាត់ចុងក្រោយគេ', 'នៅកន្លែងណាក៏បាន', 'ក្នុងប្លុក try-catch'],
          optionsEn: ['Must strictly be the first statement', 'At the very end', 'Anywhere in constructor', 'Inside try-catch'],
          correctOptionIndex: 0,
          explanationKm: 'Java តម្រូវឱ្យ `this(...)` ឬ `super(...)` ត្រូវតែជា Statement ដំបូងគេបង្អស់ក្នុង Constructor ជានិច្ច ដើម្បីធានាការរៀបចំ Object បានត្រឹមត្រូវ។',
          explanationEn: 'The this() call must strictly appear as the first statement in the constructor body.',
          hintKm: 'Statement ដំបូងបង្អស់',
          hintEn: 'First line.',
        },
        {
          id: 'q-con-2',
          questionKm: 'តើពាក្យគន្លឹះ `this` ក្នុង Java សំដៅលើអ្វី?',
          questionEn: 'What does the this keyword reference in Java?',
          optionsKm: ['Object បច្ចុប្បន្នដែលកំពុងដំណើរការ', 'Parent Class', 'Class ស្តាទិច', 'Main Method'],
          optionsEn: ['The current object instance', 'The parent superclass', 'The static class', 'The main method'],
          correctOptionIndex: 0,
          explanationKm: '`this` គឺជា Reference Variable ដែលចង្អុលទៅកាន់ Object បច្ចុប្បន្ន (Current Instance) នៃ Class នោះ។',
          explanationEn: 'this always references the active object instance executing the current method or constructor.',
          hintKm: 'Object បច្ចុប្បន្ន',
          hintEn: 'Current instance.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_constructors.asp',
    },
    {
      id: 'java-modifiers-encapsulation',
      slug: 'java-modifiers-encapsulation',
      moduleSlug: 'classes-objects-oop',
      order: 3,
      titleKm: 'Access Modifiers និង Encapsulation (Encapsulation & Data Hiding)',
      titleEn: 'Access Modifiers & Data Encapsulation',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      objectivesKm: [
        'ស្គាល់កម្រិត Access Modifiers ទាំង ៤ របស់ Java: private, default, protected, public',
        'យល់ដឹងពីសសរទ្រូងទី ១ នៃ OOP គឺ Encapsulation (ការវេចខ្ចប់ និងលាក់បាំងទិន្នន័យ)',
        'ចេះបង្កើត Getter និង Setter Methods ដែលមាន Validation ត្រួតពិនិត្យភាពត្រឹមត្រូវនៃទិន្នន័យ',
      ],
      objectivesEn: [
        'Master all 4 access modifier levels: private, default (package-private), protected, public',
        'Understand the first OOP pillar: Encapsulation and Data Hiding',
        'Implement Getter and Setter accessors enforcing business validation logic',
      ],
      summaryKm: 'Encapsulation គឺជាសសរទ្រូងទីមួយនៃ OOP។ វាការពារទិន្នន័យខាងក្នុង Object មិនឱ្យអ្នកក្រៅកែប្រែផ្តេសផ្តាសដោយកំណត់ field ជា private និងគ្រប់គ្រងតាម Getters/Setters។',
      summaryEn: 'Encapsulation bundles data with accessor methods and protects fields from unauthorized direct mutation.',
      contentKm: `### ១. Access Modifiers ទាំង ៤ កម្រិតក្នុង Java
| Modifier | ក្នុង Class ដដែល | ក្នុង Package ដដែល | Subclass ក្រៅ Package | ពិភពខាងក្រៅទាំងអស់ |
|---|:---:|:---:|:---:|:---:|
| \`private\` | ✅ | ❌ | ❌ | ❌ |
| *(default)* | ✅ | ✅ | ❌ | ❌ |
| \`protected\` | ✅ | ✅ | ✅ (តាមរយៈ Inheritance) | ❌ |
| \`public\` | ✅ | ✅ | ✅ | ✅ |

### ២. គោលការណ៍ Encapsulation (Data Hiding)
ហេតុអ្វីបានជាយើងមិនត្រូវដាក់ field ជា \`public\`?
ឧបមាថាអ្នកមាន field \`public double balance;\`។ អ្នកដទៃអាចសរសេរ \`account.balance = -9999999;\` បានយ៉ាងងាយ ដែលធ្វើឱ្យប្រព័ន្ធធនាគារខូចទាំងស្រុង!

**ច្បាប់មាសនៃ Encapsulation:**
1. ប្រកាស Instance Variables ទាំងអស់ជា **\`private\`** (លាក់បាំងមិនឱ្យខាងក្រៅប៉ះផ្ទាល់)។
2. ផ្តល់ **Getters (អានតម្លៃ)** និង **Setters (កែប្រែតម្លៃ)** ជា \`public\`។
3. ដាក់ **Validation Logic** ក្នុង Setter ដើម្បីផ្ទៀងផ្ទាត់ទិន្នន័យមុននឹងអនុញ្ញាតឱ្យកែប្រែ។`,
      contentEn: `Learn the 4 Java access tiers, why direct field mutation is dangerous, and how to write defensive Getters and Setters with validation.`,
      syntax: `public class User {
    private String username; // លាក់បាំង
    private int age;

    public int getAge() { return age; } // Getter
    public void setAge(int age) { // Setter ជាមួយ Validation
        if (age > 0) {
            this.age = age;
        }
    }
}`,
      vocabulary: [
        {
          term: 'Encapsulation',
          khmerTerm: 'ការវេចខ្ចប់ទិន្នន័យ',
          definitionKm: 'ការរុំព័ទ្ធទិន្នន័យ (fields) និងកូដដំណើរការ (methods) ជាមួយគ្នា និងការលាក់បាំងព័ត៌មានខាងក្នុងមិនឱ្យក្រៅប៉ះផ្ទាល់',
          definitionEn: 'Wrapping data and methods into a single unit and restricting direct external access.',
        },
        {
          term: 'Getter / Accessor',
          khmerTerm: 'ហ្គេតធ័រ (វិធីសាស្ត្រអានតម្លៃ)',
          definitionKm: 'Method សាធារណៈសម្រាប់អានតម្លៃនៃ private field',
          definitionEn: 'A public method that retrieves the value of a private instance field.',
        },
        {
          term: 'Setter / Mutator',
          khmerTerm: 'សេតធ័រ (វិធីសាស្ត្រកែតម្លៃ)',
          definitionKm: 'Method សាធារណៈសម្រាប់ផ្ទៀងផ្ទាត់ និងកែប្រែតម្លៃនៃ private field',
          definitionEn: 'A public method that validates and assigns a new value to a private instance field.',
        },
      ],
      examples: [
        {
          title: 'Encapsulation ពេញលេញជាមួយ Validation ក្នុង Setter',
          code: `class BankAccount {
    // ១. Private fields មិនអាចប៉ះពាល់ពីក្រៅបានឡើយ
    private String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        setBalance(initialBalance); // ប្រើ setter ដើម្បី validate
    }

    // ២. Getter សម្រាប់អាន
    public String getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    // ៣. Setter ជាមួយ Validation ការពារមិនឱ្យដាក់លេខអវិជ្ជមាន
    public void setBalance(double balance) {
        if (balance >= 0) {
            this.balance = balance;
        } else {
            System.out.println("⚠️ កំហុស: សមតុល្យមិនអាចជាលេខអវិជ្ជមានឡើយ!");
        }
    }

    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
            System.out.printf("ដាក់ប្រាក់: +$%.2f | សមតុល្យ: $%.2f%n", amount, this.balance);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("KH-ABA-9988", 500.0);

        System.out.println("គណនី: " + acc.getAccountNumber());
        System.out.println("សមតុល្យបច្ចុប្បន្ន: $" + acc.getBalance());

        // សាកល្បងដាក់តម្លៃអវិជ្ជមាន (នឹងត្រូវទប់ស្កាត់)
        System.out.println("សាកល្បងកែប្រែសមតុល្យទៅ -$200:");
        acc.setBalance(-200.0);
        System.out.println("សមតុល្យនៅតែមានសុវត្ថិភាព: $" + acc.getBalance());

        // ដាក់ប្រាក់ត្រឹមត្រូវ
        acc.deposit(150.0);
    }
}`,
          explanationKm: 'បង្ហាញពីការលាក់ fields ជា private និងការប្រើ `setBalance` ទប់ស្កាត់ការដាក់លេខអវិជ្ជមាន ដែលជាស្នូលនៃ Encapsulation។',
          explanationEn: 'Encapsulates bank balance with private visibility, exposing guarded access via validation in setBalance.',
          lineByLineExplanation: [
            {
              line: 'private double balance;',
              explanationKm: 'ការពារកុំឱ្យកូដក្រៅ Class អាចសរសេរ acc.balance = -500 បាន។',
              explanationEn: 'Restricts direct external field modification.',
            },
            {
              line: 'if (balance >= 0) this.balance = balance;',
              explanationKm: 'ត្រួតពិនិត្យលក្ខខណ្ឌសុវត្ថិភាពមុននឹងអនុញ្ញាតឱ្យបញ្ចូលតម្លៃ។',
              explanationEn: 'Guards against illegal negative account balance assignments.',
            },
          ],
          expectedOutput: `គណនី: KH-ABA-9988
សមតុល្យបច្ចុប្បន្ន: $500.0
សាកល្បងកែប្រែសមតុល្យទៅ -$200:
⚠️ កំហុស: សមតុល្យមិនអាចជាលេខអវិជ្ជមានឡើយ!
សមតុល្យនៅតែមានសុវត្ថិភាព: $500.0
ដាក់ប្រាក់: +$150.00 | សមតុល្យ: $650.00`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការដាក់ Fields ជា Public ធ្វើឱ្យបាត់បង់ការគ្រប់គ្រងទិន្នន័យ',
          titleEn: 'Exposing fields as public breaking encapsulation principle',
          badCode: `class Student {
    public int age; // គ្រោះថ្នាក់! អ្នកណាៗក៏អាចកែបាន
}
// នៅខាងក្រៅ:
Student s = new Student();
s.age = -25; // អាយុអវិជ្ជមាន! គ្មានអ្វីទប់ស្កាត់ឡើយ`,
          goodCode: `class Student {
    private int age; // មានសុវត្ថិភាព
    public void setAge(int age) {
        if (age > 0 && age < 120) {
            this.age = age;
        }
    }
}`,
          explanationKm: 'ការបើក field ជា public ធ្វើឱ្យទិន្នន័យងាយរងគ្រោះពីការកែប្រែខុសប្រក្រតី។ តែងតែប្រើ private fields ជាមួយ getters និង setters ជានិច្ច។',
          explanationEn: 'Public fields bypass validation logic. Encapsulate fields with private access and provide guarded setters.',
        },
      ],
      exercise: {
        id: 'ex-enc-1',
        titleKm: 'អនុវត្ត Encapsulation លើ Class ផលិតផល (Product Class)',
        titleEn: 'Encapsulate Product with Price Validation',
        descriptionKm: 'បង្កើត Class `Product` ដែលមាន private fields: `name`, `price`។ បង្កើត Getters និង Setters ដោយក្នុង `setPrice(double price)` ត្រូវពិនិត្យថាបើ `price > 0` ទើបដាក់តម្លៃ បើមិនដូច្នោះទេត្រូវបង្ហាញសារកំហុស។',
        descriptionEn: 'Create Product class with private fields and validated setPrice() method.',
        starterCode: `class Product {
    // បង្កើត private fields, constructor, getters, setters
}

public class Main {
    public static void main(String[] args) {
        Product p = new Product("កុំព្យូទ័រយួរដៃ", 850.0);
        // សាកល្បងកែប្រែតម្លៃ
    }
}`,
        solutionCode: `class Product {
    private String name;
    private double price;

    public Product(String name, double price) {
        this.name = name;
        setPrice(price);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        if (price > 0) {
            this.price = price;
        } else {
            System.out.println("តម្លៃផលិតផលត្រូវតែធំជាង 0!");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Product p = new Product("កុំព្យូទ័រយួរដៃ", 850.0);
        System.out.printf("ផលិតផល: %s | តម្លៃ: $%.2f%n", p.getName(), p.getPrice());

        p.setPrice(-50.0); // ត្រូវបង្ហាញកំហុស
        p.setPrice(799.0); // ជោគជ័យ
        System.out.printf("តម្លៃក្រោយកែប្រែ: $%.2f%n", p.getPrice());
    }
}`,
        hintsKm: [
          'ដាក់ `private String name;` និង `private double price;`',
          'ក្នុង `setPrice` ដាក់ `if (price > 0) this.price = price;`',
        ],
        hintsEn: [
          'Declare fields as private',
          'Enforce if (price > 0) inside setPrice()',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-enc-1',
          questionKm: 'តើ Access Modifier មួយណាដែលតឹងរ៉ឹងបំផុត ដោយអនុញ្ញាតឱ្យមើលឃើញតែក្នុង Class ផ្ទាល់ខ្លួនប៉ុណ្ណោះ?',
          questionEn: 'Which access modifier is the most restrictive, visible only within the declaring class?',
          difficulty: 'easy',
          hintsKm: ['ពាក្យ private (ឯកជន)'],
          hintsEn: ['private modifier.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("private");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("private");
    }
}`,
          expectedOutput: 'private',
        },
        {
          id: 'pq-enc-2',
          questionKm: 'តើអ្វីទៅជាអត្ថប្រយោជន៍ចម្បងនៃ Encapsulation ក្នុងការអភិវឌ្ឍ Software ធំៗ?',
          questionEn: 'What is the primary benefit of encapsulation in enterprise software engineering?',
          difficulty: 'medium',
          hintsKm: ['លាក់បាំងភាពស្មុគស្មាញ ការពារទិន្នន័យខូច និងងាយស្រួលកែប្រែកូដខាងក្នុងដោយមិនប៉ះពាល់ខាងក្រៅ'],
          hintsEn: ['Protects internal state integrity and allows internal changes without breaking external consumers.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បោះពុម្ពអត្ថប្រយោជន៍
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("ការពារសុវត្ថិភាពទិន្នន័យ (Data Integrity) និងអនុញ្ញាតឱ្យកែប្រែកូដខាងក្នុងដោយមិនប៉ះពាល់ប្រព័ន្ធខាងក្រៅ!");
    }
}`,
          expectedOutput: 'ការពារសុវត្ថិភាពទិន្នន័យ (Data Integrity) និងអនុញ្ញាតឱ្យកែប្រែកូដខាងក្នុងដោយមិនប៉ះពាល់ប្រព័ន្ធខាងក្រៅ!',
        },
        {
          id: 'pq-enc-3',
          questionKm: 'ចូរបង្កើត Class បែប Immutable (Immutable Class) ដែល fields ទាំងអស់ជា private final ហើយគ្មាន Setter ឡើយ។',
          questionEn: 'Implement an Immutable Class with private final fields and no setter mutators.',
          difficulty: 'hard',
          hintsKm: ['ប្រើ `final class` និង `private final` fields ដោយ initialize តែក្នុង constructor ប៉ុណ្ណោះ'],
          hintsEn: ['Mark class final, fields private final, and omit mutator setters.'],
          starterCode: `// បង្កើត Immutable StudentId class
final class StudentId {
    
}

public class Main {
    public static void main(String[] args) {
        
    }
}`,
          solutionCode: `final class StudentId {
    private final String idNumber;
    private final int issueYear;

    public StudentId(String idNumber, int issueYear) {
        this.idNumber = idNumber;
        this.issueYear = issueYear;
    }

    public String getIdNumber() { return idNumber; }
    public int getIssueYear() { return issueYear; }
}

public class Main {
    public static void main(String[] args) {
        StudentId id = new StudentId("KJA-2026-001", 2026);
        System.out.println("អត្តសញ្ញាណប័ណ្ណនិស្សិត: " + id.getIdNumber() + " (ឆ្នាំ " + id.getIssueYear() + ")");
        System.out.println("Class នេះជា Immutable មិនអាចកែប្រែតម្លៃបានឡើយ!");
    }
}`,
          expectedOutput: `អត្តសញ្ញាណប័ណ្ណនិស្សិត: KJA-2026-001 (ឆ្នាំ 2026)
Class នេះជា Immutable មិនអាចកែប្រែតម្លៃបានឡើយ!`,
        },
      ],
      quizzes: [
        {
          id: 'q-enc-1',
          questionKm: 'ប្រសិនបើអ្នកមិនសរសេរ Access Modifier ណាមួយនៅពីមុខ variable ឬ method តើកម្រិត Access របស់វាគឺអ្វី?',
          questionEn: 'If no access modifier is specified for a member, what is its access level?',
          optionsKm: ['Default (Package-Private)', 'public', 'private', 'protected'],
          optionsEn: ['Default (Package-Private)', 'public', 'private', 'protected'],
          correctOptionIndex: 0,
          explanationKm: 'នៅពេលគ្មានបញ្ជាក់ modifier កម្រិតរបស់វាគឺ Default (Package-Private) ដែលអាចមើលឃើញតែក្នុង Package តែមួយប៉ុណ្ណោះ។',
          explanationEn: 'Omitting access modifiers defaults to package-private visibility.',
          hintKm: 'អាចចូលមើលបានតែក្នុង Package ជាមួយគ្នា',
          hintEn: 'Package-private default.',
        },
        {
          id: 'q-enc-2',
          questionKm: 'តើមួយណាជាការអនុវត្ត Encapsulation ដ៏ត្រឹមត្រូវបំផុតក្នុង Java?',
          questionEn: 'Which pattern represents idiomatic Java encapsulation?',
          optionsKm: ['Fields ជា private ហើយមាន public getters និង setters', 'Fields ជា public ទាំងអស់ដើម្បីស្រួលសរសេរ', 'Fields ជា static និង methods ជា private', 'គ្មានការប្រើ methods ឡើយ'],
          optionsEn: ['Private fields with public getters and setters', 'All fields declared public', 'Fields static and methods private', 'No member methods'],
          correctOptionIndex: 0,
          explanationKm: 'ក្បួន Encapsulation ស្តង់ដារគឺលាក់ fields ជា private ហើយអនុញ្ញាតឱ្យចូលប្រើតាមរយៈ public getter/setter methods។',
          explanationEn: 'Encapsulation standard requires private fields accessed via public getter and setter methods.',
          hintKm: 'លាក់ field បើក method',
          hintEn: 'Private fields, public accessors.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_encapsulation.asp',
    },
  ],
};
