import { CurriculumModule } from '../../types';

export const MODULE_5_INHERITANCE_INTERFACES: CurriculumModule = {
  id: 'mod-5',
  slug: 'inheritance-polymorphism-interfaces',
  titleKm: '៥. ការស្នងសិទ្ធិ ពហុរូបភាព អរូបីភាព និង Interfaces',
  titleEn: '5. Inheritance, Polymorphism, Abstraction & Interfaces',
  descriptionKm: 'ស្វែងយល់ស៊ីជម្រៅពីសសរទ្រូងទាំង ៣ បន្តនៃ OOP: ការស្នងមរតក (extends), super(), Dynamic Polymorphism, Abstract Classes និង Interfaces។',
  descriptionEn: 'Master the remaining OOP pillars: class inheritance (extends), super(), dynamic polymorphism, abstract classes, and multiple interface implementation.',
  icon: 'Network',
  level: 'intermediate',
  lessons: [
    {
      id: 'java-inheritance-super',
      slug: 'java-inheritance-super',
      moduleSlug: 'inheritance-polymorphism-interfaces',
      order: 1,
      titleKm: 'ការស្នងសិទ្ធិ និងពាក្យគន្លឹះ super (Inheritance & "super" Keyword)',
      titleEn: 'Inheritance & The "super" Keyword',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីសសរទ្រូងទី ២ នៃ OOP គឺ Inheritance (ទំនាក់ទំនងបែប "IS-A")',
        'ចេះប្រើប្រាស់ពាក្យគន្លឹះ `extends` ដើម្បីបង្កើត Subclass ស្នងពី Superclass',
        'ចេះប្រើប្រាស់ពាក្យគន្លឹះ `super` ដើម្បីហៅ Constructor និង Method របស់ Class មេ',
      ],
      objectivesEn: [
        'Understand the second OOP pillar: Inheritance and the "IS-A" hierarchy',
        'Use the extends keyword to derive specialized subclasses from parent superclasses',
        'Apply the super keyword to invoke superclass constructors and parent methods',
      ],
      summaryKm: 'ការស្នងសិទ្ធិ (Inheritance) អនុញ្ញាតឱ្យ Class កូន ទទួលយក attributes និង methods ពី Class មេ ជួយកាត់បន្ថយការសរសេរកូដដដែលៗ និងពង្រីកសមត្ថភាពកម្មវិធី។',
      summaryEn: 'Inheritance allows a child subclass to inherit state and behavior from a parent superclass.',
      contentKm: `### ១. អ្វីទៅជាការស្នងសិទ្ធិ (Inheritance)?
Inheritance គឺជាយន្តការដែល Class មួយ (ហៅថា **Subclass / Child Class**) ទទួលបាននូវ properties និង methods ពី Class មួយទៀត (ហៅថា **Superclass / Parent Class**)។
- ទំនាក់ទំនងនេះហៅថា **IS-A relationship** (ឧ. ឆ្កែ គឺជាសត្វ: Dog IS-A Animal)។
- ប្រើពាក្យគន្លឹះ **\`extends\`** ដើម្បីស្នងសិទ្ធិ។
- **ចំណាំសំខាន់:** Java គាំទ្រ **Single Inheritance** សម្រាប់ Class (Class មួយអាច extends បានតែ Class មួយគត់ មិនអាចស្នងពី Class ពីរដំណាលគ្នាបានឡើយ)។

### ២. Method Overriding (\`@Override\`)
នៅពេល Class កូន ចង់ផ្លាស់ប្តូរអាកប្បកិរិយានៃ Method ដែលទទួលបានពី Class មេ ឱ្យមានលក្ខណៈសមស្របនឹងខ្លួន វាអាចធ្វើ **Method Overriding** បាន៖
- ឈ្មោះ Method, Parameters, និង Return Type ត្រូវតែដូចគ្នា ១០០%។
- គួរតែប្រើ Annotation \`@Override\` ពីលើ ដើម្បីឱ្យ Compiler ជួយផ្ទៀងផ្ទាត់។

### ៣. ពាក្យគន្លឹះ super
- \`super(...)\` : ហៅ Constructor របស់ Class មេ (ត្រូវតែស្ថិតនៅ **បន្ទាត់ទី ១** នៃ Constructor កូន)។
- \`super.methodName()\` : ហៅ Method របស់ Class មេ។`,
      contentEn: `Learn the "IS-A" class hierarchy with extends, method overriding with @Override, constructor forwarding with super(), and Java's single inheritance model.`,
      syntax: `class Animal {
    void makeSound() { System.out.println("សម្លេងសត្វ"); }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        super.makeSound(); // ហៅ method មេ
        System.out.println("ព្រុស: វូស! វូស!");
    }
}`,
      vocabulary: [
        {
          term: 'Superclass / Parent',
          khmerTerm: 'ថ្នាក់មេ (Superclass)',
          definitionKm: 'Class ដើមដែលផ្ទេរ attributes និង methods ឱ្យ Class ដទៃទៀតស្នងយក',
          definitionEn: 'The parent class whose members are inherited by child subclasses.',
        },
        {
          term: 'Subclass / Child',
          khmerTerm: 'ថ្នាក់កូន (Subclass)',
          definitionKm: 'Class ថ្មីដែលស្នងសិទ្ធិពី Class មេ និងអាចបន្ថែមសមត្ថភាពថ្មីៗផ្ទាល់ខ្លួន',
          definitionEn: 'The derived child class inheriting and extending parent class members.',
        },
        {
          term: 'Method Overriding',
          khmerTerm: 'ការបដិសេធសរសេរជាន់ Method',
          definitionKm: 'ការផ្តល់ implementation ថ្មីជាក់លាក់មួយសម្រាប់ Method ដែលទទួលបានពី Class មេ',
          definitionEn: 'Redefining a superclass method in a subclass with identical signature.',
        },
      ],
      examples: [
        {
          title: 'ការអនុវត្ត Inheritance និង super() ក្នុងប្រព័ន្ធបុគ្គលិក',
          code: `// Superclass: បុគ្គលិកទូទៅ
class Person {
    protected String name;
    protected int birthYear;

    public Person(String name, int birthYear) {
        this.name = name;
        this.birthYear = birthYear;
    }

    public void displayInfo() {
        System.out.println("ឈ្មោះ: " + name + " | ឆ្នាំកំណើត: " + birthYear);
    }
}

// Subclass: ស្នងសិទ្ធិពី Person
class SoftwareEngineer extends Person {
    private String primaryLanguage;
    private double salary;

    public SoftwareEngineer(String name, int birthYear, String lang, double salary) {
        super(name, birthYear); // ហៅ Constructor របស់ Person មេ
        this.primaryLanguage = lang;
        this.salary = salary;
    }

    @Override
    public void displayInfo() {
        super.displayInfo(); // បង្ហាញឈ្មោះ និងឆ្នាំកំណើតតាម Person
        System.out.printf("  -> ជំនាញកូដ: %s | ប្រាក់ខែ: $%.2f%n", primaryLanguage, salary);
    }
}

public class Main {
    public static void main(String[] args) {
        SoftwareEngineer dev = new SoftwareEngineer("សុខ វិបុល", 2002, "Java 21 & Spring Boot", 1500.0);
        
        System.out.println("=== ព័ត៌មានវិស្វករកម្មវិធី ===");
        dev.displayInfo();
    }
}`,
          explanationKm: 'បង្ហាញពីការប្រើ `extends Person`, ការហៅ `super(name, birthYear)` បញ្ជូនទិន្នន័យទៅ constructor មេ និងការប្រើ `@Override` បន្ថែមព័ត៌មានវិស្វករ។',
          explanationEn: 'Demonstrates extends Person, constructor forwarding via super(), and augmenting parent logic with super.displayInfo().',
          lineByLineExplanation: [
            {
              line: 'class SoftwareEngineer extends Person',
              explanationKm: 'បង្កើត Subclass SoftwareEngineer ដែលមានទំនាក់ទំនង IS-A ជាមួយ Person។',
              explanationEn: 'Declares SoftwareEngineer subclass inheriting from Person.',
            },
            {
              line: 'super(name, birthYear);',
              explanationKm: 'បញ្ជូន name និង birthYear ទៅឱ្យ Person Constructor រៀបចំជាមុនសិន។',
              explanationEn: 'Delegates initialization to parent superclass constructor.',
            },
            {
              line: '@Override public void displayInfo()',
              explanationKm: 'សរសេរជាន់លើ method displayInfo របស់ Person ដើម្បីបង្ហាញព័ត៌មានលម្អិតបន្ថែម។',
              explanationEn: 'Overrides parent method to customize output behavior.',
            },
          ],
          expectedOutput: `=== ព័ត៌មានវិស្វករកម្មវិធី ===
ឈ្មោះ: សុខ វិបុល | ឆ្នាំកំណើត: 2002
  -> ជំនាញកូដ: Java 21 & Spring Boot | ប្រាក់ខែ: $1500.00`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការយល់ច្រឡំថា Java អាច extends Class ច្រើនក្នុងពេលតែមួយ',
          titleEn: 'Attempting multiple class inheritance with extends',
          badCode: `class A {}
class B {}
class C extends A, B { // កំហុសធ្ងន់ធ្ងរ! Java មិនអនុញ្ញាតឡើយ
}`,
          goodCode: `// ដំណោះស្រាយ: ប្រើ Single Inheritance ជាមួយ Interfaces
interface A {}
interface B {}
class C implements A, B { // ត្រឹមត្រូវ
}`,
          explanationKm: 'Java មិនអនុញ្ញាតឱ្យ Class មួយ extends Class ពីរ ឬច្រើនឡើយ (Multiple Inheritance) ដើម្បីចៀសវាងបញ្ហា Diamond Problem។ ដើម្បីប្រើច្រើន ត្រូវប្រើ Interface ជំនួស។',
          explanationEn: 'Java disallows multiple class inheritance to prevent ambiguity (Diamond Problem). Use interfaces instead.',
        },
      ],
      exercise: {
        id: 'ex-inh-1',
        titleKm: 'បង្កើតរចនាសម្ព័ន្ធ Inheritance យានយន្ត (Vehicle & ElectricCar)',
        titleEn: 'Implement Vehicle and ElectricCar Hierarchy',
        descriptionKm: 'បង្កើត Superclass `Vehicle` (មាន field `brand` និង method `start()`) និង Subclass `ElectricCar` (បន្ថែម field `batteryCapacity` និង override method `start()`)។',
        descriptionEn: 'Create Vehicle superclass and ElectricCar subclass overriding start() method.',
        starterCode: `class Vehicle {
    protected String brand;
    // បង្កើត constructor និង start()
}

class ElectricCar extends Vehicle {
    private int batteryCapacity; // kWh
    // បង្កើត constructor ប្រើ super និង override start()
}

public class Main {
    public static void main(String[] args) {
        // បង្កើត ElectricCar
    }
}`,
        solutionCode: `class Vehicle {
    protected String brand;

    public Vehicle(String brand) {
        this.brand = brand;
    }

    public void start() {
        System.out.println(brand + " កំពុងបញ្ឆេះម៉ាស៊ីន...");
    }
}

class ElectricCar extends Vehicle {
    private int batteryCapacity;

    public ElectricCar(String brand, int batteryCapacity) {
        super(brand);
        this.batteryCapacity = batteryCapacity;
    }

    @Override
    public void start() {
        System.out.printf("%s (អាគុយ %d kWh) ចាប់ផ្តើមដំណើរការស្ងាត់ល្អគ្មានសំឡេង!%n", brand, batteryCapacity);
    }
}

public class Main {
    public static void main(String[] args) {
        ElectricCar ev = new ElectricCar("BYD Seal", 82);
        ev.start();
    }
}`,
        expectedOutput: 'BYD Seal (អាគុយ 82 kWh) ចាប់ផ្តើមដំណើរការស្ងាត់ល្អគ្មានសំឡេង!',
        hintsKm: [
          'ក្នុង ElectricCar constructor ប្រើ `super(brand);` នៅបន្ទាត់ដំបូង',
          'ប្រើ `@Override` ពីលើ `start()` ក្នុង ElectricCar',
        ],
        hintsEn: [
          'Invoke super(brand) as first line in ElectricCar constructor',
          'Annotate start() with @Override',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-inh-1',
          questionKm: 'តើ Class ទាំងអស់ក្នុង Java សុទ្ធតែស្នងសិទ្ធិដោយប្រយោល ឬដោយផ្ទាល់ពី Class មេកំពូលមួយណា?',
          questionEn: 'Which root class does every Java class directly or indirectly inherit from?',
          difficulty: 'easy',
          hintsKm: ['Class មេនៃ Class ទាំងអស់ក្នុងកញ្ចប់ java.lang'],
          hintsEn: ['java.lang.Object.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("java.lang.Object");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("java.lang.Object");
    }
}`,
          expectedOutput: 'java.lang.Object',
        },
        {
          id: 'pq-inh-2',
          questionKm: 'តើមានអ្វីកើតឡើងប្រសិនបើអ្នកដាក់ពាក្យគន្លឹះ `final` នៅពីមុខ Class ឬ Method?',
          questionEn: 'What is the effect of the final keyword when applied to classes and methods?',
          difficulty: 'medium',
          hintsKm: ['final class មិនអាច extends បានទេ ហើយ final method មិនអាច override បានទេ'],
          hintsEn: ['A final class cannot be extended; a final method cannot be overridden.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បោះពុម្ពឥទ្ធិពល final
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("final class មិនអាចស្នងសិទ្ធិ (extends) បានទេ ហើយ final method មិនអាច Override បានឡើយ!");
    }
}`,
          expectedOutput: 'final class មិនអាចស្នងសិទ្ធិ (extends) បានទេ ហើយ final method មិនអាច Override បានឡើយ!',
        },
        {
          id: 'pq-inh-3',
          questionKm: 'ចូរបង្ហាញកូដដែល Subclass ហៅទាំង Method របស់ខ្លួន និងហៅ Method របស់ Superclass ដោយប្រើ `super.` ក្នុង method តែមួយ។',
          questionEn: 'Demonstrate a subclass method delegating to super.method() while appending extra behavior.',
          difficulty: 'hard',
          hintsKm: ['ប្រើ `super.render()` ក្នុង subclass `render()`'],
          hintsEn: ['Call super.render() inside overriding method.'],
          starterCode: `class UIComponent {
    void render() { System.out.println("[គូររូបរាង Component មេ]"); }
}

class ButtonComponent extends UIComponent {
    // Override render
}

public class Main {
    public static void main(String[] args) {
        
    }
}`,
          solutionCode: `class UIComponent {
    void render() {
        System.out.println("[គូររូបរាង Component មេ]");
    }
}

class ButtonComponent extends UIComponent {
    @Override
    void render() {
        super.render();
        System.out.println("[បន្ថែមពណ៌ផ្ទៃ និងអត្ថបទប៊ូតុង]");
    }
}

public class Main {
    public static void main(String[] args) {
        ButtonComponent btn = new ButtonComponent();
        btn.render();
    }
}`,
          expectedOutput: `[គូររូបរាង Component មេ]
[បន្ថែមពណ៌ផ្ទៃ និងអត្ថបទប៊ូតុង]`,
        },
      ],
      quizzes: [
        {
          id: 'q-inh-1',
          questionKm: 'តើពាក្យគន្លឹះមួយណាដែលប្រើសម្រាប់បង្កើតការស្នងសិទ្ធិពី Class មេក្នុង Java?',
          questionEn: 'Which keyword establishes class inheritance in Java?',
          optionsKm: ['extends', 'implements', 'inherits', 'super'],
          optionsEn: ['extends', 'implements', 'inherits', 'super'],
          correctOptionIndex: 0,
          explanationKm: '`extends` គឺជាពាក្យគន្លឹះសម្រាប់ Class ស្នងពី Class មួយទៀត។ រីឯ `implements` គឺសម្រាប់ Interface។',
          explanationEn: 'extends is used for class-to-class inheritance.',
          hintKm: 'ពាក្យមានន័យថា ពង្រីកបន្ថែម',
          hintEn: 'extends keyword.',
        },
        {
          id: 'q-inh-2',
          questionKm: 'តើការហៅ `super(...)` ក្នុង Subclass Constructor ត្រូវតែស្ថិតនៅកន្លែងណា?',
          questionEn: 'Where must super(...) constructor invocation be positioned in a subclass constructor?',
          optionsKm: ['នៅបន្ទាត់ដំបូងគេបង្អស់ (First Line)', 'នៅបន្ទាត់ចុងក្រោយ', 'នៅកណ្តាល', 'មិនចាំបាច់មានទីតាំងជាក់លាក់ទេ'],
          optionsEn: ['Must strictly be the first line', 'At the bottom line', 'In the middle', 'No strict ordering'],
          correctOptionIndex: 0,
          explanationKm: 'ដូចគ្នានឹង `this()` ដែរ `super(...)` ត្រូវតែជាបន្ទាត់ទីមួយបង្អស់នៃ Constructor ដើម្បីឱ្យ Class មេរៀបចំខ្លួនរួចរាល់មុនគេ។',
          explanationEn: 'super(...) must strictly be the first executable statement in any subclass constructor.',
          hintKm: 'បន្ទាត់ដំបូងគេបង្អស់',
          hintEn: 'First line.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_inheritance.asp',
    },
    {
      id: 'java-polymorphism',
      slug: 'java-polymorphism',
      moduleSlug: 'inheritance-polymorphism-interfaces',
      order: 2,
      titleKm: 'ពហុរូបភាព (Polymorphism & Dynamic Method Dispatch)',
      titleEn: 'Polymorphism & Dynamic Method Dispatch',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីសសរទ្រូងទី ៣ នៃ OOP គឺ Polymorphism (ពាក្យក្រិកមានន័យថា "មានច្រើនទម្រង់")',
        'បែងចែកឱ្យដាច់រវាង Compile-time (Method Overloading) និង Runtime Polymorphism (Method Overriding)',
        'ចេះប្រើប្រាស់ Upcasting, Downcasting និង Pattern Matching ជាមួយ `instanceof`',
      ],
      objectivesEn: [
        'Understand the third OOP pillar: Polymorphism ("many forms")',
        'Distinguish compile-time (overloading) vs runtime (overriding / dynamic dispatch) polymorphism',
        'Master reference upcasting, safe downcasting, and pattern matching with instanceof',
      ],
      summaryKm: 'Polymorphism អនុញ្ញាតឱ្យយើងចាត់ទុក Objects នៃ Class កូនខុសៗគ្នា ជាប្រភេទ Class មែតែមួយ ប៉ុន្តែដំណើរការសកម្មភាពជាក់លាក់រៀងៗខ្លួននៅពេលរត់ (Runtime)។',
      summaryEn: 'Polymorphism allows objects of different subtypes to be treated uniformly through a parent reference while executing specific behaviors.',
      contentKm: `### ១. អ្វីទៅជា Polymorphism?
Polymorphism កើតចេញពីពាក្យក្រិក **Poly (ច្រើន)** + **Morph (រូបរាង/ទម្រង់)**។
ក្នុង Java វាមានន័យថា សកម្មភាពតែមួយ អាចមានរបៀបអនុវត្តខុសៗគ្នាទៅតាមប្រភេទនៃ Object ជាក់ស្តែង៖
\`\`\`java
Shape s1 = new Circle(); // Upcasting
Shape s2 = new Square(); // Upcasting
s1.draw(); // គូររង្វង់
s2.draw(); // គូរបួនជ្រុងស្មើ
\`\`\`

### ២. ប្រភេទទាំង ២ នៃ Polymorphism
1. **Compile-time Polymorphism (Static Binding):** សម្រេចនៅពេល compile តាមរយៈ **Method Overloading** (ដឹង method ណាត្រូវរត់តាមរយៈ parameter types)។
2. **Runtime Polymorphism (Dynamic Method Dispatch):** សម្រេចនៅពេលកម្មវិធីកំពុងរត់តាមរយៈ **Method Overriding**។ JVM នឹងពិនិត្យមើល Object ពិតប្រាកដក្នុង Heap ដើម្បីសម្រេចថាត្រូវហៅ method មួយណា។

### ៣. Upcasting, Downcasting និង Pattern Matching
- **Upcasting (ដោយស្វ័យប្រវត្ត):** \`Animal a = new Dog();\` (មានសុវត្ថិភាព ១០០%)។
- **Downcasting (ដោយផ្ទាល់ដៃ):** \`Dog d = (Dog) a;\` (ត្រូវប្រយ័ត្ន! បើ a មិនមែនជា Dog ទេ វានឹងបោះ ClassCastException)។
- **Modern Pattern Matching for instanceof (Java 16+):**
\`\`\`java
if (a instanceof Dog d) {
    d.bark(); // មិនបាច់សរសេរ (Dog) a ដាច់ដោយឡែកទៀតឡើយ!
}
\`\`\``,
      contentEn: `Master runtime dynamic dispatch, static vs late method binding, heterogeneous collections, and Java 16+ pattern matching with instanceof.`,
      syntax: `// Runtime Polymorphism:
Parent ref = new Child();
ref.polymorphicMethod(); // ហៅ method របស់ Child

// Pattern Matching (Java 16+):
if (obj instanceof String s) {
    System.out.println(s.length());
}`,
      vocabulary: [
        {
          term: 'Polymorphism',
          khmerTerm: 'ពហុរូបភាព',
          definitionKm: 'សមត្ថភាពនៃ Object ក្នុងការបង្ហាញទម្រង់ និងអាកប្បកិរិយាច្រើនបែបតាមរយៈ Interface ឬ Superclass តែមួយ',
          definitionEn: 'The ability of different objects to respond to the same method invocation in their own unique way.',
        },
        {
          term: 'Dynamic Method Dispatch',
          khmerTerm: 'ការបញ្ជូន Method តាមពេលវេលារត់',
          definitionKm: 'យន្តការរបស់ JVM ដែលស្វែងរក Method Override របស់ Object ជាក់ស្តែងក្នុង Heap នៅពេល Runtime',
          definitionEn: 'The mechanism by which a call to an overridden method is resolved at runtime rather than compile time.',
        },
        {
          term: 'Upcasting',
          khmerTerm: 'ការបម្លែងឡើងលើ',
          definitionKm: 'ការយក Reference នៃ Subclass ទៅដាក់ក្នុង Reference នៃ Superclass ដោយស្វ័យប្រវត្តិ',
          definitionEn: 'Casting a subclass reference to a superclass reference type.',
        },
      ],
      examples: [
        {
          title: 'ប្រព័ន្ធគណនាប្រាក់ខែពហុរូបភាព (Polymorphic Payroll)',
          code: `// Class មេ
abstract class Employee {
    protected String name;

    public Employee(String name) { this.name = name; }

    public abstract double calculatePay(); // Method អរូបី
}

// Class កូនទី ១: បុគ្គលិកពេញម៉ោង (ប្រាក់ខែថេរ)
class SalariedEmployee extends Employee {
    private double monthlySalary;

    public SalariedEmployee(String name, double salary) {
        super(name);
        this.monthlySalary = salary;
    }

    @Override
    public double calculatePay() {
        return monthlySalary;
    }
}

// Class កូនទី ២: បុគ្គលិកម៉ោង (គិតតាមម៉ោងធ្វើការ)
class HourlyEmployee extends Employee {
    private double hourlyRate;
    private int hoursWorked;

    public HourlyEmployee(String name, double rate, int hours) {
        super(name);
        this.hourlyRate = rate;
        this.hoursWorked = hours;
    }

    @Override
    public double calculatePay() {
        return hourlyRate * hoursWorked;
    }
}

public class Main {
    public static void main(String[] args) {
        // Polymorphic Array: ផ្ទុកបុគ្គលិកខុសៗគ្នាជាប្រភេទ Employee តែមួយ
        Employee[] staff = {
            new SalariedEmployee("សុខ ចាន់ដា", 1200.0),
            new HourlyEmployee("គង់ វណ្ណៈ", 10.0, 80),
            new SalariedEmployee("លី ដានី", 950.0)
        };

        System.out.println("=== របាយការណ៍បើកប្រាក់ខែបុគ្គលិក ===");
        double totalPayroll = 0;

        for (Employee emp : staff) {
            // Dynamic Method Dispatch: JVM ហៅ calculatePay ត្រឹមត្រូវតាមប្រភេទនីមួយៗ
            double pay = emp.calculatePay();
            System.out.printf("បុគ្គលិក: %-15s | ប្រាក់ត្រូវបើក: $%.2f%n", emp.name, pay);
            totalPayroll += pay;
        }

        System.out.println("----------------------------------------");
        System.out.printf("សរុបថវិកាត្រូវបើក: $%.2f%n", totalPayroll);
    }
}`,
          explanationKm: 'បង្ហាញពីអានុភាពនៃ Polymorphic Array ដែលផ្ទុកបុគ្គលិកផ្សេងគ្នា តែអាចគណនាប្រាក់ខែដោយហៅ `emp.calculatePay()` យ៉ាងស្រួល។',
          explanationEn: 'Demonstrates a polymorphic array iterating over diverse employee types and executing appropriate payroll calculations at runtime.',
          lineByLineExplanation: [
            {
              line: 'Employee[] staff = { new SalariedEmployee(...), new HourlyEmployee(...) };',
              explanationKm: 'Upcasting ធាតុទាំងអស់ទៅជាប្រភេទ Employee តែមួយ។',
              explanationEn: 'Upcasts distinct concrete employee instances into a homogeneous Employee array.',
            },
            {
              line: 'double pay = emp.calculatePay();',
              explanationKm: 'Dynamic Method Dispatch: JVM សម្រេចហៅ calculatePay របស់ Salaried ឬ Hourly អាស្រ័យលើ Object ពិត។',
              explanationEn: 'Dynamic dispatch executes the overridden calculatePay logic matching the actual heap object.',
            },
          ],
          expectedOutput: `=== របាយការណ៍បើកប្រាក់ខែបុគ្គលិក ===
បុគ្គលិក: សុខ ចាន់ដា       | ប្រាក់ត្រូវបើក: $1200.00
បុគ្គលិក: គង់ វណ្ណៈ        | ប្រាក់ត្រូវបើក: $800.00
បុគ្គលិក: លី ដានី          | ប្រាក់ត្រូវបើក: $950.00
----------------------------------------
សរុបថវិកាត្រូវបើក: $2950.00`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'កំហុស ClassCastException ពេល Downcasting ខុសប្រភេទ',
          titleEn: 'Unchecked downcasting triggering runtime ClassCastException',
          badCode: `Employee emp = new HourlyEmployee("គង់", 10, 40);
SalariedEmployee sal = (SalariedEmployee) emp; // គាំង ClassCastException ភ្លាម!`,
          goodCode: `Employee emp = new HourlyEmployee("គង់", 10, 40);
// ប្រើ Pattern Matching ដើម្បីផ្ទៀងផ្ទាត់សុវត្ថិភាពជាមុន
if (emp instanceof SalariedEmployee sal) {
    System.out.println(sal.calculatePay());
} else {
    System.out.println("មិនមែនជា SalariedEmployee ទេ");
}`,
          explanationKm: 'មិនអាច cast Object ទៅជា Class កូនដែលវាមិនមែនជា instance របស់វាបានឡើយ។ ត្រូវតែប្រើ `instanceof` ត្រួតពិនិត្យជាមុនជានិច្ច។',
          explanationEn: 'Never force downcasting without validating runtime type. Use instanceof to guard against ClassCastException.',
        },
      ],
      exercise: {
        id: 'ex-poly-1',
        titleKm: 'ប្រព័ន្ធជូនដំណឹងពហុរូបភាព (Notification Dispatcher)',
        titleEn: 'Polymorphic Notification Sender System',
        descriptionKm: 'បង្កើត Superclass `Notification` (មាន method `send(String msg)`) និង Subclasses `EmailNotification` និង `SmsNotification`។ រួចប្រើ Polymorphism ដើម្បីផ្ញើសារតាមគ្រប់មធ្យោបាយ។',
        descriptionEn: 'Create Notification hierarchy and test polymorphic message dispatching.',
        starterCode: `class Notification {
    public void send(String msg) {
        System.out.println("ផ្ញើសារ: " + msg);
    }
}

// បង្កើត EmailNotification និង SmsNotification override send()

public class Main {
    public static void main(String[] args) {
        // បង្កើត array នៃ Notification ហើយផ្ញើសារ
    }
}`,
        solutionCode: `class Notification {
    public void send(String msg) {
        System.out.println("ផ្ញើសារទូទៅ: " + msg);
    }
}

class EmailNotification extends Notification {
    @Override
    public void send(String msg) {
        System.out.println("📧 ផ្ញើអ៊ីមែល: " + msg);
    }
}

class SmsNotification extends Notification {
    @Override
    public void send(String msg) {
        System.out.println("📱 ផ្ញើសារ SMS ទៅទូរស័ព្ទ: " + msg);
    }
}

public class Main {
    public static void main(String[] args) {
        Notification[] channels = {
            new EmailNotification(),
            new SmsNotification()
        };

        for (Notification ch : channels) {
            ch.send("កូដផ្ទៀងផ្ទាត់ OTP របស់អ្នកគឺ 8899");
        }
    }
}`,
        expectedOutput: `📧 ផ្ញើអ៊ីមែល: កូដផ្ទៀងផ្ទាត់ OTP របស់អ្នកគឺ 8899
📱 ផ្ញើសារ SMS ទៅទូរស័ព្ទ: កូដផ្ទៀងផ្ទាត់ OTP របស់អ្នកគឺ 8899`,
        hintsKm: [
          'Override method `send(String msg)` ក្នុង Subclasses ទាំងពីរ',
          'ប្រើ Loop រត់លើ `Notification[] channels`',
        ],
        hintsEn: [
          'Override send(String msg) in EmailNotification and SmsNotification',
          'Iterate through Notification[] array',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-poly-1',
          questionKm: 'តើ Method Overloading ជាប្រភេទ Compile-time ឬ Runtime Polymorphism?',
          questionEn: 'Is method overloading classified as compile-time or runtime polymorphism?',
          difficulty: 'easy',
          hintsKm: ['សម្រេចនៅពេល Compiler ពិនិត្យកូដ (Compile-time / Static Binding)'],
          hintsEn: ['Compile-time / Static Binding.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Compile-time Polymorphism");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Compile-time Polymorphism");
    }
}`,
          expectedOutput: 'Compile-time Polymorphism',
        },
        {
          id: 'pq-poly-2',
          questionKm: 'តើ Dynamic Method Dispatch ពឹងផ្អែកលើប្រភេទ Reference Variable ឬពឹងផ្អែកលើ Object ជាក់ស្តែងក្នុង Heap?',
          questionEn: 'Does dynamic method dispatch depend on the reference type or the actual heap instance?',
          difficulty: 'medium',
          hintsKm: ['ពឹងផ្អែកលើ Object ពិតប្រាកដដែលបានបង្កើតដោយ new ក្នុង Heap'],
          hintsEn: ['It resolves using the actual runtime object instance in heap memory.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បោះពុម្ពចម្លើយ
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("ពឹងផ្អែកលើ Object ជាក់ស្តែងក្នុង Heap Memory នៅពេល Runtime!");
    }
}`,
          expectedOutput: 'ពឹងផ្អែកលើ Object ជាក់ស្តែងក្នុង Heap Memory នៅពេល Runtime!',
        },
        {
          id: 'pq-poly-3',
          questionKm: 'ចូរបង្ហាញកូដដែលប្រើ Pattern Matching for instanceof (Java 16+) ដើម្បីទាញយកប្រវែង String ដោយសុវត្ថិភាពពី Object ប្រភេទចម្រុះ។',
          questionEn: 'Demonstrate Java 16+ pattern matching with instanceof to inspect diverse Object instances.',
          difficulty: 'hard',
          hintsKm: ['ប្រើ `if (obj instanceof String s)` ហើយព្រីន `s.length()`'],
          hintsEn: ['Apply if (obj instanceof String s).'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        Object item1 = "Khmer Java Academy";
        Object item2 = 2026;
        // ពិនិត្យដោយ pattern matching
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        Object item1 = "Khmer Java Academy";
        Object item2 = 2026;

        inspect(item1);
        inspect(item2);
    }

    public static void inspect(Object obj) {
        if (obj instanceof String s) {
            System.out.println("ខ្សែអក្សរ: '" + s + "' មានប្រវែង: " + s.length());
        } else if (obj instanceof Integer num) {
            System.out.println("លេខគត់: " + num);
        }
    }
}`,
          expectedOutput: `ខ្សែអក្សរ: 'Khmer Java Academy' មានប្រវែង: 18
លេខគត់: 2026`,
        },
      ],
      quizzes: [
        {
          id: 'q-poly-1',
          questionKm: 'តើការបម្លែងមួយណាដែលហៅថា Upcasting?',
          questionEn: 'Which reference conversion represents an Upcasting operation?',
          optionsKm: ['បម្លែងពី Subclass Reference ទៅកាន់ Superclass Reference', 'បម្លែងពី Superclass Reference មកកាន់ Subclass Reference', 'បម្លែង int ទៅជា double', 'បម្លែង String ទៅជា Integer'],
          optionsEn: ['Subclass reference to superclass reference type', 'Superclass reference to subclass reference type', 'int to double primitive', 'String to Integer'],
          correctOptionIndex: 0,
          explanationKm: 'Upcasting គឺជាការកំណត់ Subclass Instance ទៅក្នុង Superclass Reference (ឧ. `Animal a = new Dog();`) ដែលតែងតែមានសុវត្ថិភាពជានិច្ច។',
          explanationEn: 'Upcasting assigns a more specific child instance to a more generic parent reference type.',
          hintKm: 'ឡើងទៅរកថ្នាក់មេខាងលើ',
          hintEn: 'Child to parent reference.',
        },
        {
          id: 'q-poly-2',
          questionKm: 'តើ Runtime Exception មួយណាដែលកើតឡើងនៅពេល Downcasting បរាជ័យ?',
          questionEn: 'Which runtime exception is triggered when downcasting fails?',
          optionsKm: ['ClassCastException', 'NullPointerException', 'IllegalArgumentException', 'IndexOutOfBoundsException'],
          optionsEn: ['ClassCastException', 'NullPointerException', 'IllegalArgumentException', 'IndexOutOfBoundsException'],
          correctOptionIndex: 0,
          explanationKm: 'នៅពេលអ្នកព្យាយាម Downcast Object មួយទៅកាន់ប្រភេទ Class ដែលវាមិនមែនជា instance JVM នឹងបោះកំហុស `ClassCastException`។',
          explanationEn: 'Attempting to cast an incompatible reference triggers a runtime ClassCastException.',
          hintKm: 'មានពាក្យ Cast',
          hintEn: 'ClassCastException.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_polymorphism.asp',
    },
    {
      id: 'java-abstraction-interfaces',
      slug: 'java-abstraction-interfaces',
      moduleSlug: 'inheritance-polymorphism-interfaces',
      order: 3,
      titleKm: 'ថ្នាក់អរូបី និង Interfaces (Abstract Classes & Interfaces)',
      titleEn: 'Abstract Classes & Interfaces',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      objectivesKm: [
        'យល់ដឹងពីសសរទ្រូងទី ៤ នៃ OOP គឺ Abstraction (ការផ្តោតលើ "តើត្រូវធ្វើអ្វី" មិនមែន "ធ្វើដោយរបៀបណា")',
        'បែងចែកឱ្យដាច់រវាង Abstract Class (extends) និង Interface (implements)',
        'ចេះអនុវត្ត Multiple Interface Implementation និង Default Methods ក្នុង Interface (Java 8+)',
      ],
      objectivesEn: [
        'Understand the fourth OOP pillar: Abstraction (hiding implementation complexity)',
        'Contrast Abstract Classes (is-a identity) against Interfaces (can-do contract capability)',
        'Implement multiple interfaces and leverage Java 8+ interface default methods',
      ],
      summaryKm: 'Abstraction លាក់បាំងភាពស្មុគស្មាញ និងបង្ហាញតែអ្វីដែលចាំបាច់។ រៀនបង្កើតកិច្ចសន្យាកូដ (Contracts) តាមរយៈ Interfaces និង Abstract Classes។',
      summaryEn: 'Abstraction defines clean interface contracts separating architectural design from concrete implementation.',
      contentKm: `### ១. អ្វីទៅជា Abstraction?
Abstraction គឺជាគោលការណ៍ដែលផ្តល់តែ "អ្វីដែលត្រូវធ្វើ" (What to do) ដោយលាក់បាំង "របៀបដែលវាធ្វើ" (How to do)។

ក្នុង Java យើងសម្រេច Abstraction តាមពីរវិធី៖
1. **Abstract Class (អរូបីមួយផ្នែក 0-100%):**
   - មិនអាចបង្កើត Object ដោយផ្ទាល់ជាមួយ \`new\` បានឡើយ។
   - អាចមានទាំង Abstract Methods (គ្មានតួកូដ \`{}\`) និង Concrete Methods (មានតួកូដ)។
   - ប្រើពាក្យគន្លឹះ \`extends\` (បានតែមួយគត់)។
2. **Interface (កិច្ចសន្យាពេញលេញ 100% Contract):**
   - កំណត់កិច្ចសន្យាថាតើ Class ណាខ្លះអាចធ្វើសកម្មភាពអ្វីបានខ្លះ (Can-do capability)។
   - ប្រើពាក្យគន្លឹះ \`implements\`។
   - **ចំណុចពិសេស:** Class មួយអាច \`implements\` Interface **បានច្រើនក្នុងពេលតែមួយ** (Multiple Implementation)!

### ២. Interface Default & Static Methods (Java 8+)
តាំងពី Java 8 មក Interface អាចមាន Method ដែលមានតួកូដស្រាប់ដោយប្រើពាក្យគន្លឹះ \`default\` ដែលជួយឱ្យយើងបន្ថែម Method ថ្មីក្នុង Interface ដោយមិនបាច់បំបែកកូដ Class ចាស់ៗ។`,
      contentEn: `Learn complete abstraction through interfaces, partial abstraction via abstract classes, multiple interface contracts, and default methods.`,
      syntax: `// Interface
interface PaymentGateway {
    void processPayment(double amount); // abstract method

    default void printReceipt() { // default method
        System.out.println("វិក្កយបត្រអេឡិចត្រូនិចត្រូវបានបង្កើត។");
    }
}

// Implementation
class BakongPayment implements PaymentGateway {
    @Override
    public void processPayment(double amount) {
        System.out.println("ទូទាត់តាមបាគង KHQR: $" + amount);
    }
}`,
      vocabulary: [
        {
          term: 'Abstraction',
          khmerTerm: 'អរូបីភាព',
          definitionKm: 'ការលាក់បាំងសេចក្តីលម្អិតនៃកូដខាងក្នុង និងបង្ហាញតែមុខងារចាំបាច់សម្រាប់អ្នកប្រើប្រាស់',
          definitionEn: 'Hiding internal implementation details and displaying only essential functional features.',
        },
        {
          term: 'Interface',
          khmerTerm: 'ចំណុចប្រទាក់ / កិច្ចសន្យា Interface',
          definitionKm: 'កិច្ចសន្យាកូដដែលបញ្ជាក់ថ្នាក់ណា implements វាត្រូវតែមាន methods ទាំងនោះជាដាច់ខាត',
          definitionEn: 'A blueprint of a class containing abstract method contracts and default behaviors.',
        },
        {
          term: 'Default Method',
          khmerTerm: 'វិធីសាស្ត្រលំនាំដើមក្នុង Interface',
          definitionKm: 'Method ក្នុង Interface ដែលមានតួកូដស្រាប់ ដោយប្រើពាក្យគន្លឹះ default (មានតាំងពី Java 8)',
          definitionEn: 'A method inside an interface that provides a default concrete implementation.',
        },
      ],
      examples: [
        {
          title: 'ប្រព័ន្ធទូទាត់ប្រាក់ពហុចំណុចប្រទាក់ (Multiple Interfaces)',
          code: `// Interface ទី ១: ដំណើរការទូទាត់
interface Payable {
    void pay(double amount);
}

// Interface ទី ២: អាចបង្វិលសងប្រាក់វិញ
interface Refundable {
    void refund(double amount);
}

// Class អនុវត្ត Interfaces ទាំងពីរ (Multiple Interfaces)
class BakongKHQR implements Payable, Refundable {
    private String merchantId;

    public BakongKHQR(String merchantId) {
        this.merchantId = merchantId;
    }

    @Override
    public void pay(double amount) {
        System.out.printf("✅ ទូទាត់ជោគជ័យតាម Bakong KHQR (%s): $%.2f%n", merchantId, amount);
    }

    @Override
    public void refund(double amount) {
        System.out.printf("🔄 បង្វិលប្រាក់ត្រឡប់ទៅកាបូបបាគងវិញ: $%.2f%n", amount);
    }
}

public class Main {
    public static void main(String[] args) {
        BakongKHQR payment = new BakongKHQR("MERCHANT-PHNOMPENH-01");
        
        System.out.println("=== សាកល្បងប្រព័ន្ធទូទាត់ហាងទំនិញ ===");
        payment.pay(12.50);
        payment.refund(2.50);
    }
}`,
          explanationKm: 'បង្ហាញពីសមត្ថភាព Multiple Implementation ដែល `BakongKHQR` អាច `implements Payable, Refundable` ដំណាលគ្នា បំពេញកិច្ចសន្យាទាំងពីរ។',
          explanationEn: 'Demonstrates implementing multiple interfaces (Payable and Refundable) within a single class.',
          lineByLineExplanation: [
            {
              line: 'class BakongKHQR implements Payable, Refundable',
              explanationKm: 'Class មួយអាច implements interfaces ច្រើនដោយខណ្ឌដោយសញ្ញាក្បៀស (,)។',
              explanationEn: 'Implements both Payable and Refundable contract obligations.',
            },
            {
              line: 'public void pay(double amount) { ... }',
              explanationKm: 'ផ្តល់ concrete implementation សម្រាប់ method ដែលទាមទារដោយ Payable interface។',
              explanationEn: 'Fulfills the abstract contract demanded by the Payable interface.',
            },
          ],
          expectedOutput: `=== សាកល្បងប្រព័ន្ធទូទាត់ហាងទំនិញ ===
✅ ទូទាត់ជោគជ័យតាម Bakong KHQR (MERCHANT-PHNOMPENH-01): $12.50
🔄 បង្វិលប្រាក់ត្រឡប់ទៅកាបូបបាគងវិញ: $2.50`,
        },
      ],
      commonMistakes: [
        {
          titleKm: 'ការព្យាយាមបង្កើត Object ចេញពី Interface ឬ Abstract Class ដោយប្រើ new',
          titleEn: 'Attempting to instantiate an abstract class or interface directly',
          badCode: `PaymentGateway pg = new PaymentGateway(); // កំហុស Compile Error!
// Abstract Class / Interface មិនអាច new ផ្ទាល់បានឡើយ`,
          goodCode: `// ត្រូវ instantiate តាមរយៈ Concrete Class ដែលបាន implements វា:
PaymentGateway pg = new BakongPayment(); // ត្រឹមត្រូវ`,
          explanationKm: 'Interface និង Abstract Class ជាគំនិតអរូបីដែលគ្មានកូដពេញលេញ។ អ្នកមិនអាច `new` វាផ្ទាល់បានឡើយ ត្រូវតែ `new` តាម Class ដែលបាន implements ឬ extends វា។',
          explanationEn: 'Interfaces and abstract classes cannot be directly instantiated. You must instantiate a concrete implementing class.',
        },
      ],
      exercise: {
        id: 'ex-abs-1',
        titleKm: 'បង្កើត Interface ឧបករណ៍បំពងសម្លេង (Playable Interface)',
        titleEn: 'Create Playable Interface & AudioPlayer',
        descriptionKm: 'បង្កើត Interface `Playable` (មាន method `play()` និង `pause()`) រួចបង្កើត Class `AudioPlayer` implements Interface នោះ។',
        descriptionEn: 'Define Playable interface with play() and pause() and implement in AudioPlayer.',
        starterCode: `// បង្កើត interface Playable
interface Playable {
    
}

// បង្កើត class AudioPlayer implements Playable
class AudioPlayer {
    
}

public class Main {
    public static void main(String[] args) {
        // តេស្ត play() និង pause()
    }
}`,
        solutionCode: `interface Playable {
    void play();
    void pause();
}

class AudioPlayer implements Playable {
    private String trackName;

    public AudioPlayer(String trackName) {
        this.trackName = trackName;
    }

    @Override
    public void play() {
        System.out.println("▶️ កំពុងចាក់ចម្រៀង: " + trackName);
    }

    @Override
    public void pause() {
        System.out.println("⏸️ បានផ្អាកចម្រៀង: " + trackName);
    }
}

public class Main {
    public static void main(String[] args) {
        Playable player = new AudioPlayer("បទចម្រៀង: ផ្ការីកលើមេឃ");
        player.play();
        player.pause();
    }
}`,
        expectedOutput: `▶️ កំពុងចាក់ចម្រៀង: បទចម្រៀង: ផ្ការីកលើមេឃ
⏸️ បានផ្អាកចម្រៀង: បទចម្រៀង: ផ្ការីកលើមេឃ`,
        hintsKm: [
          'ក្នុង interface កំណត់ `void play();` និង `void pause();`',
          'ក្នុង AudioPlayer ប្រើ `implements Playable` ហើយ override methods ទាំងពីរ',
        ],
        hintsEn: [
          'Declare void play(); and void pause(); in Playable',
          'Use implements Playable on AudioPlayer and override methods',
        ],
      },
      practiceQuestions: [
        {
          id: 'pq-abs-1',
          questionKm: 'តើ Class មួយអាច implements Interfaces បានចំនួនប៉ុន្មានក្នុង Java?',
          questionEn: 'How many interfaces can a single Java class implement?',
          difficulty: 'easy',
          hintsKm: ['គ្មានដែនកំណត់ទេ (អាច implements ច្រើនមិនកំណត់)'],
          hintsEn: ['Multiple / unlimited interfaces.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("ច្រើនមិនកំណត់ (Multiple)");
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("ច្រើនមិនកំណត់ (Multiple Interfaces)");
    }
}`,
          expectedOutput: 'ច្រើនមិនកំណត់ (Multiple Interfaces)',
        },
        {
          id: 'pq-abs-2',
          questionKm: 'តើ Abstract Class និង Interface ខុសគ្នាជាចម្បងលើចំណុចណាខ្លះ?',
          questionEn: 'What are the core architectural differences between abstract classes and interfaces?',
          difficulty: 'medium',
          hintsKm: ['Abstract Class តំណាងឱ្យអត្តសញ្ញាណ (IS-A) និងមាន state/constructor, Interface តំណាងឱ្យកិច្ចសន្យា (CAN-DO)'],
          hintsEn: ['Abstract class represents core identity with state/constructors; interfaces define contract capabilities.'],
          starterCode: `public class Main {
    public static void main(String[] args) {
        // បោះពុម្ពភាពខុសគ្នា
    }
}`,
          solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Abstract Class អាចមាន constructor និង instance fields (IS-A); Interface គាំទ្រ Multiple Implementation និងកំណត់កិច្ចសន្យា (CAN-DO)!");
    }
}`,
          expectedOutput: 'Abstract Class អាចមាន constructor និង instance fields (IS-A); Interface គាំទ្រ Multiple Implementation និងកំណត់កិច្ចសន្យា (CAN-DO)!',
        },
        {
          id: 'pq-abs-3',
          questionKm: 'ចូរបង្ហាញ Interface ដែលមាន Default Method និង Static Helper Method ហើយហៅប្រើប្រាស់វា។',
          questionEn: 'Demonstrate an interface featuring both a default method and a static utility method.',
          difficulty: 'hard',
          hintsKm: ['ប្រើពាក្យគន្លឹះ `default` សម្រាប់ method ធម្មតា និង `static` សម្រាប់ helper method'],
          hintsEn: ['Define default void log() and static void info() inside interface.'],
          starterCode: `interface Logger {
    // បង្កើត default និង static methods
}

public class Main {
    public static void main(String[] args) {
        
    }
}`,
          solutionCode: `interface Logger {
    void log(String message);

    default void logWithTimestamp(String message) {
        System.out.println("[2026-10-26] " + message);
    }

    static void printSystemHeader() {
        System.out.println("=== KHMER LOGGING SYSTEM ===");
    }
}

class ConsoleLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println("LOG: " + message);
    }
}

public class Main {
    public static void main(String[] args) {
        Logger.printSystemHeader();
        Logger myLog = new ConsoleLogger();
        myLog.log("ប្រតិបត្តិការបានចាប់ផ្តើម");
        myLog.logWithTimestamp("ទិន្នន័យត្រូវបានរក្សាទុកដោយជោគជ័យ");
    }
}`,
          expectedOutput: `=== KHMER LOGGING SYSTEM ===
LOG: ប្រតិបត្តិការបានចាប់ផ្តើម
[2026-10-26] ទិន្នន័យត្រូវបានរក្សាទុកដោយជោគជ័យ`,
        },
      ],
      quizzes: [
        {
          id: 'q-abs-1',
          questionKm: 'តើអថេរ (Fields) ទាំងអស់ដែលប្រកាសនៅក្នុង Interface ត្រូវបានចាត់ទុកជាអ្វីដោយស្វ័យប្រវត្តិ?',
          questionEn: 'What modifiers are automatically applied to fields declared inside a Java interface?',
          optionsKm: ['public static final', 'private volatile', 'protected transient', 'package-private'],
          optionsEn: ['public static final', 'private volatile', 'protected transient', 'package-private'],
          correctOptionIndex: 0,
          explanationKm: 'គ្រប់ Fields ទាំងអស់ក្នុង Interface ត្រូវបានចាត់ទុកជា `public static final` (Constants) ដោយស្វ័យប្រវត្តិ។',
          explanationEn: 'Interface fields are implicitly public, static, and final constants.',
          hintKm: 'ជាថេរ Constant សាធារណៈ',
          hintEn: 'public static final.',
        },
        {
          id: 'q-abs-2',
          questionKm: 'តើ Class មួយអាច extends Abstract Classes ប៉ុន្មានក្នុង Java?',
          questionEn: 'How many abstract classes can a Java class extend?',
          optionsKm: ['បានតែ ១ គត់ (Single Inheritance)', 'បានច្រើនមិនកំណត់', 'បាន ២', 'មិនអាច extends បានទេ'],
          optionsEn: ['Exactly one (Single Inheritance)', 'Unlimited', 'Up to two', 'None'],
          correctOptionIndex: 0,
          explanationKm: 'ទោះបីជា Abstract Class ក៏ដោយ ក៏ក្បួន Single Inheritance របស់ Java នៅតែអនុវត្ត គឺ extends បានតែ ១ គត់។',
          explanationEn: 'A class can only extend a single abstract class due to single inheritance.',
          hintKm: 'បានតែមួយគត់',
          hintEn: 'Exactly one.',
        },
      ],
      w3schoolsUrl: 'https://www.w3schools.com/java/java_interface.asp',
    },
  ],
};
