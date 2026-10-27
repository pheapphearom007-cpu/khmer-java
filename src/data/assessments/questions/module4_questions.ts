import { AssessmentQuestion } from '../../../types/assessment';

export const MODULE_4_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'm4-q1-predict-static-counter',
    type: 'predict-output',
    difficulty: 'intermediate',
    topic: 'static-vs-instance',
    topicTitleKm: 'Static vs Instance Variables',
    topicTitleEn: 'Static vs Instance Variables',
    learningObjectiveKm: 'យល់ច្បាស់ពីការចែករំលែកតម្លៃរបស់ static variable រវាង Objects ទាំងអស់នៃ Class តែមួយ',
    learningObjectiveEn: 'Understand shared memory state across instances for static class variables',
    titleKm: 'ទស្សន៍ទាយលទ្ធផល៖ ការចែករំលែក Static Variable',
    titleEn: 'Predict Output: Shared Static Variable',
    descriptionKm: 'តើកូដខាងក្រោមនឹងបោះពុម្ពតម្លៃអ្វីចុងក្រោយ?',
    descriptionEn: 'What final values will be printed by the following code?',
    codeSnippet: `class Counter {
    static int globalCount = 0;
    int instanceCount = 0;

    void increment() {
        globalCount++;
        instanceCount++;
    }
}

public class Main {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();

        c1.increment();
        c2.increment();

        System.out.println(c1.globalCount + " " + c1.instanceCount);
    }
}`,
    expectedAnswer: '2 1',
    acceptedAnswers: ['2 1'],
    explanationKm: 'globalCount ជា static variable ដូច្នេះវាមានតែមួយច្បាប់គត់ក្នុង Class ហើយត្រូវបានចែករំលែកដោយ Objects ទាំងអស់ (c1.increment() ឡើង 1, c2.increment() ឡើង 2)។ ចំណែក instanceCount ជា instance variable ដែល Object នីមួយៗមានដាច់ដោយឡែកពីគ្នា ដូច្នេះ c1.instanceCount នៅតែមានតម្លៃ 1 ដដែល។',
    explanationEn: 'globalCount is a static variable belonging to the Counter class itself, shared across all instances; both increments increment the same memory cell (producing 2). instanceCount belongs to each separate object instance, so c1.instanceCount remains 1.',
    hintsKm: ['static variable ត្រូវបានចែករំលែកដោយគ្រប់ Objects ទាំងអស់ ខណៈ instance variable គឺជារបស់ Object នីមួយៗដាច់ដោយឡែក។'],
    hintsEn: ['Static variables share one copy per class; instance variables are distinct per instance.'],
    recommendedLessonSlug: 'classes-and-objects',
    recommendedLessonTitleKm: 'មេរៀនទី 4.1: ថ្នាក់ (Classes) និងវត្ថុ (Objects)',
  },
  {
    id: 'm4-q2-find-bug-encapsulation',
    type: 'find-the-bug',
    difficulty: 'intermediate',
    topic: 'encapsulation',
    topicTitleKm: 'ការវេចខ្ចប់ទិន្នន័យ (Encapsulation)',
    topicTitleEn: 'Encapsulation Access Control',
    learningObjectiveKm: 'កំណត់មូលហេតុដែលនាំឱ្យ Compiler បដិសេធនៅពេលចូលប្រើ private field ក្រៅ Class',
    learningObjectiveEn: 'Recognize compilation failures caused by direct access to private fields',
    titleKm: 'ស្វែងរកកំហុស៖ ការចូលប្រើ Private Field ដោយផ្ទាល់',
    titleEn: 'Find the Bug: Direct Access to Private Field',
    descriptionKm: 'កូដខាងក្រោមមិនអាច Compile បានទេ (Compilation Error)។ តើកំហុសកើតឡើងត្រង់ណា?',
    descriptionEn: 'The following code produces a compilation error. Where is the bug?',
    codeSnippet: `class BankAccount {
    private double balance = 500.0;
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount();
        System.out.println(acc.balance);
    }
}`,
    bugLineNumber: 8,
    options: [
      { id: 'opt-a', textKm: 'acc.balance មាន access modifier ជា private មិនអាចចូលប្រើដោយផ្ទាល់ក្រៅ Class បានឡើយ (ត្រូវបង្កើត Getter Method)', textEn: 'acc.balance is private and has private access; requires a getter method' },
      { id: 'opt-b', textKm: 'BankAccount មិនទាន់មាន constructor', textEn: 'BankAccount lacks a constructor' },
      { id: 'opt-c', textKm: 'balance ត្រូវតែជា int មិនអាចជា double បានទេ', textEn: 'balance must be int, not double' },
      { id: 'opt-d', textKm: 'System.out.println មិនអាចបោះពុម្ពលុយបានទេ', textEn: 'System.out.println cannot output currency numbers' },
    ],
    expectedAnswer: 'opt-a',
    explanationKm: 'យោងតាមគោលការណ៍ Encapsulation ក្នុង Java អថេរណាដែលប្រកាសជា "private" អាចចូលប្រើបានតែនៅក្នុង Class BankAccount ប៉ុណ្ណោះ។ ដើម្បីទាញយកតម្លៃរបស់វាពីខាងក្រៅ Class ត្រូវបង្កើត public getter method ដូចជា getBalance()។',
    explanationEn: 'Under encapsulation principles in Java, members marked with private access cannot be read or modified directly from outside the class. A public getter method (e.g. getBalance()) must be provided.',
    hintsKm: ['ពិនិត្យពាក្យគន្លឹះ private នៅពីមុខអថេរ balance។'],
    hintsEn: ['Inspect the private access modifier on the balance field.'],
    recommendedLessonSlug: 'encapsulation-getters-setters',
    recommendedLessonTitleKm: 'មេរៀនទី 4.3: ការវេចខ្ចប់ទិន្នន័យ (Encapsulation), Getters & Setters',
  },
  {
    id: 'm4-q3-cloze-this-keyword',
    type: 'code-completion',
    difficulty: 'intermediate',
    topic: 'constructors',
    topicTitleKm: 'Constructor និង This Keyword',
    topicTitleEn: 'Constructors & This Keyword',
    learningObjectiveKm: 'ប្រើ keyword "this" ដើម្បីដោះស្រាយបញ្ហា Variable Shadowing ក្នុង Constructor',
    learningObjectiveEn: 'Use the "this" keyword to disambiguate shadowed instance variables in a constructor',
    titleKm: 'បំពេញចន្លោះកូដ៖ This Keyword',
    titleEn: 'Code Completion: This Reference Keyword',
    descriptionKm: 'បំពេញ keyword ដើម្បីចាត់ចែងតម្លៃទៅកាន់ instance variable របស់ Object ផ្ទាល់:',
    descriptionEn: 'Fill in the keyword used to refer to the current object instance:',
    blankSnippet: `public class Student {
    private String name;

    public Student(String name) {
        _____.name = name;
    }
}`,
    expectedAnswer: 'this',
    acceptedAnswers: ['this'],
    explanationKm: 'នៅពេលឈ្មោះ parameter ដូចគ្នាទៅនឹងឈ្មោះ instance variable (Variable Shadowing) យើងត្រូវប្រើ "this.name" ដើម្បីបញ្ជាក់ថាជា variable របស់ Object បច្ចុប្បន្ន។',
    explanationEn: 'When a method or constructor parameter has the exact same name as an instance variable, the "this" keyword explicitly refers to the current object\'s field.',
    hintsKm: ['ពាក្យ ៤ អក្សរ មានន័យថា "របស់ខ្លួនឯងនេះ"។'],
    hintsEn: ['A 4-letter keyword referring to the current instance.'],
    recommendedLessonSlug: 'constructors-and-initialization',
    recommendedLessonTitleKm: 'មេរៀនទី 4.2: Constructor និងការកំណត់តម្លៃដំបូង',
  },
];
