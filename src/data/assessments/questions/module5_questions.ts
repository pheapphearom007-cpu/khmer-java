import { AssessmentQuestion } from '../../../types/assessment';

export const MODULE_5_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'm5-q1-predict-polymorphism',
    type: 'predict-output',
    difficulty: 'intermediate',
    topic: 'polymorphism',
    topicTitleKm: 'ពហុសណ្ឋាន (Polymorphism) & Dynamic Dispatch',
    topicTitleEn: 'Polymorphism & Dynamic Dispatch',
    learningObjectiveKm: 'យល់ដឹងពី Dynamic Method Dispatch ពេលហៅ Overridden Method តាមរយៈ Superclass Reference',
    learningObjectiveEn: 'Understand runtime dynamic method dispatch when invoking overridden methods via superclass references',
    titleKm: 'ទស្សន៍ទាយលទ្ធផល៖ Dynamic Method Dispatch',
    titleEn: 'Predict Output: Dynamic Method Dispatch',
    descriptionKm: 'តើកូដខាងក្រោមនឹងបោះពុម្ពសំឡេងអ្វីលើ Console?',
    descriptionEn: 'What sound will be printed by dynamic dispatch in the code below?',
    codeSnippet: `class Animal {
    void makeSound() {
        System.out.println("Generic sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Woof Woof");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myPet = new Dog();
        myPet.makeSound();
    }
}`,
    expectedAnswer: 'Woof Woof',
    acceptedAnswers: ['Woof Woof'],
    explanationKm: 'ទោះបីជាអថេរ myPet ត្រូវបានប្រកាសជាប្រភេទ Animal (Superclass reference) ក៏ដោយ ក៏ Object ពិតប្រាកដក្នុង Memory គឺជា Dog (new Dog())។ ក្នុងពេល Runtime ម៉ាស៊ីន JVM នឹងអនុវត្ត Dynamic Method Dispatch ដោយហៅ method makeSound() របស់ Dog ផ្ទាល់ ដូច្នេះលទ្ធផលគឺ "Woof Woof"។',
    explanationEn: 'Even though myPet has the compile-time type Animal, the actual runtime object on the heap is an instance of Dog. Java executes runtime dynamic dispatch, invoking Dog\'s overridden makeSound() method ("Woof Woof").',
    hintsKm: ['តើ Object ពិតប្រាកដដែលត្រូវបានបង្កើតឡើងក្នុង Memory គឺជាអ្វី? Animal ឬ Dog?'],
    hintsEn: ['Which concrete object was allocated on the heap via "new"? Animal or Dog?'],
    recommendedLessonSlug: 'polymorphism-method-overriding',
    recommendedLessonTitleKm: 'មេរៀនទី 5.2: ពហុសណ្ឋាន (Polymorphism) និង Method Overriding',
  },
  {
    id: 'm5-q2-find-bug-abstract-new',
    type: 'find-the-bug',
    difficulty: 'intermediate',
    topic: 'abstraction',
    topicTitleKm: 'ថ្នាក់អរូបី (Abstract Classes)',
    topicTitleEn: 'Abstract Class Instantiation Pitfall',
    learningObjectiveKm: 'ចងចាំថា Abstract Class មិនអាចត្រូវបានបង្កើត Object ដោយផ្ទាល់តាមរយៈពាក្យគន្លឹះ new ឡើយ',
    learningObjectiveEn: 'Remember that abstract classes cannot be directly instantiated with the new operator',
    titleKm: 'ស្វែងរកកំហុស៖ ការបង្កើត Object ពី Abstract Class',
    titleEn: 'Find the Bug: Instantiating Abstract Class',
    descriptionKm: 'ពិនិត្យកូដខាងក្រោម។ ហេតុអ្វីបានជាបន្ទាត់ទី ៦ បង្កឱ្យមានកំហុសពេល Compile?',
    descriptionEn: 'Inspect the code. Why does line 6 fail to compile?',
    codeSnippet: `abstract class Shape {
    abstract double area();
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Shape();
    }
}`,
    bugLineNumber: 6,
    options: [
      { id: 'opt-a', textKm: 'Shape ជា Abstract Class មិនអាចបង្កើតជា Object ដោយផ្ទាល់ (Instantiation) ជាមួយ new Shape() បានឡើយ', textEn: 'Shape is an abstract class and cannot be directly instantiated' },
      { id: 'opt-b', textKm: 'area() ត្រូវតែ return int', textEn: 'area() must return an int' },
      { id: 'opt-c', textKm: 'Shape មិនទាន់មាន constructor', textEn: 'Shape has no constructor' },
      { id: 'opt-d', textKm: 'Main class ត្រូវតែជា abstract ដែរ', textEn: 'Main class must also be abstract' },
    ],
    expectedAnswer: 'opt-a',
    explanationKm: 'Abstract Class គឺជាគំរូមិនទាន់ពេញលេញ (មាន abstract methods ដែលគ្មាន body) ដូច្នេះ Java ហាមឃាត់ដាច់ខាតមិនឱ្យបង្កើត Object ដោយផ្ទាល់តាមរយៈ "new Shape()" ឡើយ។ យើងត្រូវបង្កើត Subclass ជាក់ស្តែង (Concrete Class ដូចជា Circle ឬ Rectangle) ដែល implement abstract method នោះសិន ទើបអាចបង្កើត Object បាន។',
    explanationEn: 'An abstract class cannot be instantiated directly with new because it represents an incomplete abstraction. Only concrete subclasses that provide implementations for all abstract methods can be instantiated.',
    hintsKm: ['ពាក្យគន្លឹះ "abstract" បញ្ជាក់ថា Class នេះមិនអាចបង្កើតជា Instance បានឡើយ។'],
    hintsEn: ['The "abstract" modifier prevents direct instantiation via the new keyword.'],
    recommendedLessonSlug: 'abstraction-abstract-classes',
    recommendedLessonTitleKm: 'មេរៀនទី 5.3: ភាពអរូបី (Abstraction) និងថ្នាក់អរូបី (Abstract Classes)',
  },
  {
    id: 'm5-q3-cloze-implements-keyword',
    type: 'code-completion',
    difficulty: 'intermediate',
    topic: 'interfaces',
    topicTitleKm: 'Interfaces និងការអនុវត្ត',
    topicTitleEn: 'Interface Implementation Keyword',
    learningObjectiveKm: 'ប្រើប្រាស់ keyword "implements" សម្រាប់ Class ដែលអនុវត្ត Interface',
    learningObjectiveEn: 'Use the "implements" keyword when a class provides concrete implementations for an interface',
    titleKm: 'បំពេញចន្លោះកូដ៖ Keyword អនុវត្ត Interface',
    titleEn: 'Code Completion: Interface Implementation',
    descriptionKm: 'បំពេញពាក្យគន្លឹះត្រឹមត្រូវដើម្បីឱ្យ Class Car ទទួលយក Interface Drivable:',
    descriptionEn: 'Fill in the keyword that allows class Car to implement the Drivable interface:',
    blankSnippet: 'public class Car _____ Drivable {',
    expectedAnswer: 'implements',
    acceptedAnswers: ['implements'],
    explanationKm: 'ក្នុង Java យើងប្រើ "extends" សម្រាប់ពង្រីកពី Class មួយទៅ Class មួយទៀត ប៉ុន្តែសម្រាប់ Interface យើងត្រូវប្រើ keyword "implements"។',
    explanationEn: 'In Java, "extends" is used for class inheritance, whereas "implements" is used when a class realizes an interface contract.',
    hintsKm: ['ពាក្យនេះមានន័យថា "អនុវត្តតាមកិច្ចសន្យា" (១០ អក្សរ ចាប់ផ្តើមដោយ i)។'],
    hintsEn: ['A 10-letter keyword starting with "i" meaning realizing a contract.'],
    recommendedLessonSlug: 'interfaces-multiple-inheritance',
    recommendedLessonTitleKm: 'មេរៀនទី 5.4: ចំណុចប្រទាក់ (Interfaces) និង Multiple Inheritance',
  },
];
