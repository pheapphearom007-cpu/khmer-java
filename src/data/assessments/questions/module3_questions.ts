import { AssessmentQuestion } from '../../../types/assessment';

export const MODULE_3_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'm3-q1-predict-loop-break',
    type: 'predict-output',
    difficulty: 'beginner',
    topic: 'loops',
    topicTitleKm: 'រង្វិលជុំ Loops និង Break',
    topicTitleEn: 'Loops & Break Mechanics',
    learningObjectiveKm: 'តាមដានការប្រែប្រួលតម្លៃក្នុង For Loop ពេលជួប break condition',
    learningObjectiveEn: 'Trace variable mutations through a for-loop interrupted by a break statement',
    titleKm: 'ទស្សន៍ទាយលទ្ធផល៖ For Loop ជាមួយ Break',
    titleEn: 'Predict Output: For Loop with Break',
    descriptionKm: 'តើកូដខាងក្រោមនឹងបោះពុម្ពផលបូកតម្លៃប៉ុន្មានលើ Console?',
    descriptionEn: 'What is printed to the console by the loop snippet below?',
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 5; i++) {
            if (i == 3) {
                break;
            }
            sum += i;
        }
        System.out.println(sum);
    }
}`,
    expectedAnswer: '3',
    acceptedAnswers: ['3'],
    explanationKm: 'ដំណើរការជុំនីមួយៗ៖\n- i = 1: sum = 0 + 1 = 1\n- i = 2: sum = 1 + 2 = 3\n- i = 3: លក្ខខណ្ឌ (i == 3) ពិត -> break បញ្ឈប់ loop ភ្លាមៗដោយមិនបូក 3 ឡើយ។\nដូច្នេះ sum នៅសល់ត្រឹម 3។',
    explanationEn: 'Iteration trace:\n- i = 1: sum = 0 + 1 = 1\n- i = 2: sum = 1 + 2 = 3\n- i = 3: (i == 3) matches, triggering "break" which immediately terminates the loop before adding.\nFinal sum is 3.',
    hintsKm: ['ពិនិត្យមើលថាតើនៅពេល i ស្មើ 3 តើ sum += i បានដំណើរការឬនៅ មុនពេល break?'],
    hintsEn: ['Notice whether sum += i executes before or after the break trigger.'],
    recommendedLessonSlug: 'loops-while-for',
    recommendedLessonTitleKm: 'មេរៀនទី 3.2: រង្វិលជុំ (While, Do-While & For Loops)',
  },
  {
    id: 'm3-q2-find-bug-array-bounds',
    type: 'find-the-bug',
    difficulty: 'beginner',
    topic: 'arrays',
    topicTitleKm: 'អារេ (Arrays) និងទំហំ',
    topicTitleEn: 'Array Bounds & Indexing',
    learningObjectiveKm: 'ស្វែងរកកំហុស ArrayIndexOutOfBoundsException ដោយសារលក្ខខណ្ឌ i <= length',
    learningObjectiveEn: 'Identify off-by-one errors that cause ArrayIndexOutOfBoundsException',
    titleKm: 'ស្វែងរកកំហុស៖ Off-By-One Array Index',
    titleEn: 'Find the Bug: Array Bounds Indexing',
    descriptionKm: 'កូដខាងក្រោមនឹងបណ្តាលឱ្យមាន Runtime Exception ពេលដំណើរការ។ តើកំហុសស្ថិតនៅជួរណា ហើយព្រោះអ្វី?',
    descriptionEn: 'The following code causes an unhandled Runtime Exception. Where and why?',
    codeSnippet: `int[] scores = { 85, 90, 78 };
for (int i = 0; i <= scores.length; i++) {
    System.out.println(scores[i]);
}`,
    bugLineNumber: 2,
    options: [
      { id: 'opt-a', textKm: 'ប្រើ i <= scores.length ធ្វើឱ្យលើស Index ចុងក្រោយ (ត្រូវប្រើ i < scores.length)', textEn: 'Using i <= scores.length exceeds max index (must use i < scores.length)' },
      { id: 'opt-b', textKm: 'អារេ scores មិនទាន់បានកំណត់ទំហំ', textEn: 'scores array was not sized' },
      { id: 'opt-c', textKm: 'System.out.println មិនអាចបោះពុម្ព element របស់ int[] បានទេ', textEn: 'System.out.println cannot print int elements' },
      { id: 'opt-d', textKm: 'i ត្រូវតែចាប់ផ្តើមពី 1 មិនមែន 0 ទេ', textEn: 'i must start at 1, not 0' },
    ],
    expectedAnswer: 'opt-a',
    explanationKm: 'អារេ scores មានធាតុចំនួន 3 (length = 3) ដែលមាន index ចាប់ពី 0 ដល់ 2។ នៅពេល loop រត់ដល់ i = 3 លក្ខខណ្ឌ i <= 3 នៅតែពិត ប៉ុន្តែ scores[3] មិនមានឡើយ ដែលបង្កជាកំហុស ArrayIndexOutOfBoundsException។ ដំណោះស្រាយត្រឹមត្រូវគឺប្រើ i < scores.length។',
    explanationEn: 'The array has 3 elements (indices 0, 1, 2). When i reaches 3, the condition i <= scores.length (3 <= 3) evaluates to true, attempting to access scores[3], which throws an ArrayIndexOutOfBoundsException. The correct loop condition is i < scores.length.',
    hintsKm: ['អារេក្នុង Java ចាប់ផ្តើមរាប់ពី Index 0 ដូច្នេះ Index ចុងក្រោយគឺ length - 1។'],
    hintsEn: ['Java arrays are zero-indexed, meaning the highest valid index is length - 1.'],
    recommendedLessonSlug: 'arrays-and-matrices',
    recommendedLessonTitleKm: 'មេរៀនទី 3.3: អារេ (Arrays) និងម៉ាទ្រីសពហុវិមាត្រ',
  },
  {
    id: 'm3-q3-code-completion-method-return',
    type: 'code-completion',
    difficulty: 'beginner',
    topic: 'methods',
    topicTitleKm: 'វិធីសាស្ត្រ (Methods) និង Return',
    topicTitleEn: 'Method Return Keyword',
    learningObjectiveKm: 'ប្រើប្រាស់ keyword "return" ដើម្បីប្រគល់តម្លៃចេញពី method',
    learningObjectiveEn: 'Use the "return" keyword properly to send back computation results from a method',
    titleKm: 'បំពេញចន្លោះកូដ៖ Return Keyword ក្នុង Method',
    titleEn: 'Code Completion: Method Return Statement',
    descriptionKm: 'បំពេញពាក្យគន្លឹះដើម្បីប្រគល់តម្លៃទ្វេដងនៃលេខដែលបានបញ្ចូល:',
    descriptionEn: 'Fill in the missing keyword to return twice the input number:',
    blankSnippet: `public static int doubleNumber(int n) {
    _____ n * 2;
}`,
    expectedAnswer: 'return',
    acceptedAnswers: ['return'],
    explanationKm: 'ពាក្យគន្លឹះ "return" ប្រើដើម្បីប្រគល់តម្លៃចេញពី method ទៅកាន់ caller ដែលបានហៅវា។ ដោយសារ method នេះប្រកាសថាប្រគល់ "int" នោះវាត្រូវតែមានបញ្ជា return ជាមួយតម្លៃជាចំនួនគត់។',
    explanationEn: 'The "return" keyword returns execution flow and a value matching the method\'s return type back to the caller.',
    hintsKm: ['ពាក្យគន្លឹះ ៦ អក្សរ ចាប់ផ្តើមដោយអក្សរ r។'],
    hintsEn: ['A 6-letter keyword starting with r that sends a value back.'],
    recommendedLessonSlug: 'methods-parameters-overloading',
    recommendedLessonTitleKm: 'មេរៀនទី 3.4: វិធីសាស្ត្រ (Methods), ប៉ារ៉ាម៉ែត្រ និង Method Overloading',
  },
  {
    id: 'm3-q4-predict-method-overload',
    type: 'predict-output',
    difficulty: 'intermediate',
    topic: 'methods',
    topicTitleKm: 'Method Overloading',
    topicTitleEn: 'Method Overloading Resolution',
    learningObjectiveKm: 'យល់ដឹងពីរបៀបដែល Java Compiler ជ្រើសរើស Method Overload ត្រឹមត្រូវតាម Argument Types',
    learningObjectiveEn: 'Understand how the Java compiler resolves method overloading based on argument types',
    titleKm: 'ទស្សន៍ទាយលទ្ធផល៖ Method Overloading',
    titleEn: 'Predict Output: Method Overloading',
    descriptionKm: 'តើកូដខាងក្រោមនឹងបោះពុម្ពលទ្ធផលអ្វីលើ Console?',
    descriptionEn: 'What will the following code output to the console?',
    codeSnippet: `public class Main {
    static void printValue(int x) {
        System.out.println("int: " + x);
    }
    static void printValue(double x) {
        System.out.println("double: " + x);
    }
    public static void main(String[] args) {
        printValue(5);
        printValue(5.5);
    }
}`,
    expectedAnswer: 'int: 5\ndouble: 5.5',
    acceptedAnswers: ['int: 5\ndouble: 5.5', 'int: 5\r\ndouble: 5.5'],
    explanationKm: 'Java គាំទ្រ Method Overloading ដោយពិនិត្យប្រភេទតម្លៃ (Parameter Type)៖ printValue(5) ហៅ method ទទួល int ចេញ "int: 5" ហើយ printValue(5.5) ហៅ method ទទួល double ចេញ "double: 5.5"។',
    explanationEn: 'Java determines which overloaded method to invoke based on argument types at compile time: printValue(5) matches printValue(int) while printValue(5.5) matches printValue(double).',
    hintsKm: ['លេខ 5 ជាចំនួនគត់ int រីឯ 5.5 ជាចំនួនទសភាគ double។'],
    hintsEn: ['5 is an int literal; 5.5 is a double literal.'],
    recommendedLessonSlug: 'methods-parameters-overloading',
    recommendedLessonTitleKm: 'មេរៀនទី 3.4: វិធីសាស្ត្រ (Methods), ប៉ារ៉ាម៉ែត្រ និង Method Overloading',
  },
];
