import { AssessmentQuestion } from '../../../types/assessment';

export const MODULE_7_8_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'm7-q1-predict-stream-filter',
    type: 'predict-output',
    difficulty: 'advanced',
    topic: 'lambdas-streams',
    topicTitleKm: 'Java Streams API & Filter',
    topicTitleEn: 'Java Streams API & Filter',
    learningObjectiveKm: 'តាមដានលទ្ធផលនៃការ Filter និង Map លើ List តាមរយៈ Streams API',
    learningObjectiveEn: 'Trace pipeline output through stream filter and count operations',
    titleKm: 'ទស្សន៍ទាយលទ្ធផល៖ Stream Filter និង Count',
    titleEn: 'Predict Output: Stream Filter & Count',
    descriptionKm: 'តើកូដខាងក្រោមនឹងបោះពុម្ពចំនួនលេខគូ (Even Numbers) ប៉ុន្មាន?',
    descriptionEn: 'What number will be printed by the stream pipeline below?',
    codeSnippet: `import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8);
        long evenCount = numbers.stream()
                                .filter(n -> n % 2 == 0)
                                .count();
        System.out.println(evenCount);
    }
}`,
    expectedAnswer: '4',
    acceptedAnswers: ['4'],
    explanationKm: 'ក្នុងបញ្ជី [1, 2, 3, 4, 5, 6, 7, 8] លេខគូ (n % 2 == 0) មានចំនួន ៤ គឺ [2, 4, 6, 8]។ filter() រក្សាទុកតែលេខគូទាំងនេះ ហើយ count() រាប់ចំនួនធាតុដែលនៅសល់ ដូច្នេះលទ្ធផលគឺ 4។',
    explanationEn: 'In the list [1, 2, 3, 4, 5, 6, 7, 8], only numbers divisible by 2 pass the predicate filter: 2, 4, 6, 8 (4 items). The terminal operation count() returns 4.',
    hintsKm: ['រាប់ចំនួនលេខគូរវាងលេខ 1 ដល់ 8។'],
    hintsEn: ['Count the quantity of even integers between 1 and 8.'],
    recommendedLessonSlug: 'lambdas-functional-interfaces',
    recommendedLessonTitleKm: 'មេរៀនទី 7.1: កន្សោម Lambda និង Functional Interfaces',
  },
  {
    id: 'm7-q2-cloze-lambda-arrow',
    type: 'code-completion',
    difficulty: 'advanced',
    topic: 'lambdas-streams',
    topicTitleKm: 'Lambda Arrow Operator',
    topicTitleEn: 'Lambda Arrow Operator',
    learningObjectiveKm: 'ស្គាល់សញ្ញាព្រួញ (Arrow Operator ->) សម្រាប់ Lambda Expression ក្នុង Java',
    learningObjectiveEn: 'Recognize and write the arrow operator separating lambda parameters from body',
    titleKm: 'បំពេញចន្លោះកូដ៖ Lambda Arrow Operator',
    titleEn: 'Code Completion: Lambda Arrow Operator',
    descriptionKm: 'បំពេញសញ្ញាប្រតិបត្តិករព្រួញ (Arrow Operator) ត្រឹមត្រូវក្នុង Lambda Expression ខាងក្រោម:',
    descriptionEn: 'Fill in the arrow operator that links the parameter to the lambda expression body:',
    blankSnippet: 'names.forEach(name _____ System.out.println(name));',
    expectedAnswer: '->',
    acceptedAnswers: ['->'],
    explanationKm: 'ក្នុង Java 8+ សញ្ញាព្រួញ "->" ត្រូវបានប្រើប្រាស់ក្នុង Lambda Expressions ដើម្បីបំបែក Parameter List ចេញពី Body នៃ Function (Syntax: (params) -> { body })។',
    explanationEn: 'In Java, the arrow operator "->" connects formal parameters with the lambda body: (param) -> statement.',
    hintsKm: ['សញ្ញាដក (-) បន្តដោយសញ្ញាធំជាង (>) បង្កើតបានជាព្រួញចង្អុលទៅស្តាំ។'],
    hintsEn: ['A dash followed by a greater-than sign.'],
    recommendedLessonSlug: 'lambdas-functional-interfaces',
    recommendedLessonTitleKm: 'មេរៀនទី 7.1: កន្សោម Lambda និង Functional Interfaces',
  },
  {
    id: 'm8-q1-find-bug-debug-offbyone',
    type: 'find-the-bug',
    difficulty: 'intermediate',
    topic: 'debugging-techniques',
    topicTitleKm: 'បច្ចេកទេសដោះស្រាយកំហុស (Debugging)',
    topicTitleEn: 'Debugging Techniques & Stack Trace',
    learningObjectiveKm: 'អាន Stack Trace ដើម្បីកំណត់ទីតាំងច្បាស់លាស់នៃកំហុសក្នុងកម្មវិធី Java',
    learningObjectiveEn: 'Interpret a Java exception stack trace to locate the failing file and line number',
    titleKm: 'ស្វែងរកកំហុស៖ ការអាន Stack Trace',
    titleEn: 'Find the Bug: Reading Stack Trace',
    descriptionKm: 'នៅពេល Terminal បង្ហាញ "Exception in thread "main" java.lang.ArithmeticException: / by zero at Calculator.divide(Calculator.java:18)" តើកំហុសកើតឡើងត្រង់ណា?',
    descriptionEn: 'Given the stack trace above, what is the root cause and location of the fault?',
    options: [
      { id: 'opt-a', textKm: 'កំហុសចែកនឹងលេខសូន្យ (ArithmeticException) ស្ថិតក្នុង file Calculator.java ជួរទី 18 ក្នុង method divide', textEn: 'Division by zero on line 18 in Calculator.java inside divide method' },
      { id: 'opt-b', textKm: 'កំហុសខ្វះ Memory ក្នុង JVM', textEn: 'Out of memory in JVM' },
      { id: 'opt-c', textKm: 'Java មិនស្គាល់ class Calculator', textEn: 'Class not found' },
      { id: 'opt-d', textKm: 'Compiler version ចាស់ពេក', textEn: 'Outdated compiler version' },
    ],
    expectedAnswer: 'opt-a',
    explanationKm: 'Java Stack Trace ផ្តល់ព័ត៌មានលម្អិតច្បាស់លាស់៖ ប្រភេទកំហុសគឺ ArithmeticException (/ by zero), កើតឡើងក្នុង method "divide", នៅឯឯកសារ "Calculator.java", ត្រង់បន្ទាត់ទី 18។ នេះជាគន្លឹះដំបូងគេដែល Developer ត្រូវមើលដើម្បីដោះស្រាយកំហុស។',
    explanationEn: 'The stack trace indicates the exact exception type (ArithmeticException), the reason (/ by zero), the enclosing method (divide), source file (Calculator.java), and the line number (18).',
    hintsKm: ['ពិនិត្យព័ត៌មាន "(Calculator.java:18)" និងពាក្យ "/ by zero"។'],
    hintsEn: ['Look at the file name, line number, and error reason in the trace.'],
    recommendedLessonSlug: 'debugging-and-testing-strategies',
    recommendedLessonTitleKm: 'មេរៀនទី 8.1: បច្ចេកទេស Debugging, Logging និង Unit Testing (JUnit)',
  },
];
