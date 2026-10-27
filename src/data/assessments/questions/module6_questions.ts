import { AssessmentQuestion } from '../../../types/assessment';

export const MODULE_6_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'm6-q1-predict-finally-flow',
    type: 'predict-output',
    difficulty: 'intermediate',
    topic: 'exceptions',
    topicTitleKm: 'ការគ្រប់គ្រងកំហុស (Exceptions) និង Finally',
    topicTitleEn: 'Exception Handling & Finally Execution Order',
    learningObjectiveKm: 'យល់ដឹងច្បាស់ពីលំដាប់នៃការដំណើរការ try, catch, និង finally',
    learningObjectiveEn: 'Understand the deterministic execution flow of try, catch, and finally blocks',
    titleKm: 'ទស្សន៍ទាយលទ្ធផល៖ Try-Catch-Finally Execution Order',
    titleEn: 'Predict Output: Try-Catch-Finally Flow',
    descriptionKm: 'តើលទ្ធផលលើ Console នឹងបោះពុម្ពយ៉ាងដូចម្តេចតាមលំដាប់?',
    descriptionEn: 'What is the exact sequence of outputs printed by the code below?',
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        try {
            System.out.println("1");
            int result = 10 / 0;
            System.out.println("2");
        } catch (ArithmeticException e) {
            System.out.println("3");
        } finally {
            System.out.println("4");
        }
        System.out.println("5");
    }
}`,
    expectedAnswer: '1\n3\n4\n5',
    acceptedAnswers: ['1\n3\n4\n5', '1\r\n3\r\n4\r\n5'],
    explanationKm: 'លំដាប់ដំណើរការ៖\n1. បោះពុម្ព "1"\n2. ជួប 10 / 0 បង្ក ArithmeticException ភ្លាមៗ ធ្វើឱ្យបន្ទាត់ទី២ មិនដំណើរការឡើយ\n3. Exception ត្រូវចាប់ដោយ catch -> បោះពុម្ព "3"\n4. ប្លុក finally ដំណើរការជានិច្ច ទោះបីមាន Error ឬអត់ -> បោះពុម្ព "4"\n5. កម្មវិធីបន្តដំណើរការជាធម្មតាក្រោយ try-catch -> បោះពុម្ព "5"។',
    explanationEn: 'Execution trace:\n1. Prints "1".\n2. 10 / 0 throws ArithmeticException, skipping print "2".\n3. Caught by catch block -> prints "3".\n4. finally block always executes -> prints "4".\n5. Normal flow resumes after handler -> prints "5".',
    hintsKm: ['finally ប្លុក ដំណើរការជានិច្ច មិនថាមានកំហុសឬគ្មាននោះទេ!'],
    hintsEn: ['The finally block is guaranteed to execute whether an exception was thrown or caught.'],
    recommendedLessonSlug: 'exception-handling-try-catch',
    recommendedLessonTitleKm: 'មេរៀនទី 6.1: ការគ្រប់គ្រងកំហុស (Exceptions & Try-Catch-Finally)',
  },
  {
    id: 'm6-q2-find-bug-unhandled-null',
    type: 'find-the-bug',
    difficulty: 'intermediate',
    topic: 'exceptions',
    topicTitleKm: 'NullPointerException',
    topicTitleEn: 'NullPointerException Diagnosis',
    learningObjectiveKm: 'ធ្វើរោគវិនិច្ឆ័យលើកំហុស NullPointerException ពេលហៅ method លើ reference ដែលមានតម្លៃ null',
    learningObjectiveEn: 'Diagnose runtime NullPointerException triggered by dereferencing a null object',
    titleKm: 'ស្វែងរកកំហុស៖ ការហៅ Method លើ Null Object',
    titleEn: 'Find the Bug: NullPointerException',
    descriptionKm: 'កូដខាងក្រោមនឹងបោះពុម្ព Exception អ្វីនៅពេលដំណើរការ?',
    descriptionEn: 'Which runtime exception is triggered by executing the code below?',
    codeSnippet: `String username = null;
if (username.length() > 0) {
    System.out.println("Valid user");
}`,
    bugLineNumber: 2,
    options: [
      { id: 'opt-a', textKm: 'NullPointerException (ដោយសារ username មានតម្លៃ null មិនអាចហៅ .length() បានទេ)', textEn: 'NullPointerException (cannot invoke .length() on null reference)' },
      { id: 'opt-b', textKm: 'IndexOutOfBoundsException', textEn: 'IndexOutOfBoundsException' },
      { id: 'opt-c', textKm: 'ArithmeticException', textEn: 'ArithmeticException' },
      { id: 'opt-d', textKm: 'ClassCastException', textEn: 'ClassCastException' },
    ],
    expectedAnswer: 'opt-a',
    explanationKm: 'នៅពេលអថេរ username ផ្ទុកតម្លៃ null (គ្មាន Object ក្នុង memory) ការព្យាយាមហៅ method ឬ field លើវា (ដូចជា username.length()) នឹងបង្កឱ្យមានកំហុស NullPointerException (NPE) ភ្លាមៗ។ ដំណោះស្រាយត្រឹមត្រូវគឺត្រូវពិនិត្យ "if (username != null && username.length() > 0)" ជាមុនសិន។',
    explanationEn: 'Dereferencing a variable that points to null triggers a NullPointerException at runtime. Safe pattern requires a null check first: if (username != null && username.length() > 0).',
    hintsKm: ['តើ username កំពុងចង្អុលទៅកាន់ Object ជាក់ស្តែង ឬចង្អុលទៅ null?'],
    hintsEn: ['Does username reference a live String instance or null?'],
    recommendedLessonSlug: 'exception-handling-try-catch',
    recommendedLessonTitleKm: 'មេរៀនទី 6.1: ការគ្រប់គ្រងកំហុស (Exceptions & Try-Catch-Finally)',
  },
  {
    id: 'm6-q3-predict-hashmap-keys',
    type: 'predict-output',
    difficulty: 'intermediate',
    topic: 'collections',
    topicTitleKm: 'Collections Framework (HashMap)',
    topicTitleEn: 'HashMap Key Uniqueness',
    learningObjectiveKm: 'យល់ច្បាស់ពីលក្ខណៈ Uniqueness នៃ Keys ក្នុង HashMap (ការជាន់តម្លៃចាស់)',
    learningObjectiveEn: 'Understand key uniqueness in HashMap and replacement of old associated values',
    titleKm: 'ទស្សន៍ទាយលទ្ធផល៖ HashMap Key Overwrite',
    titleEn: 'Predict Output: HashMap Key Replacement',
    descriptionKm: 'តើកូដខាងក្រោមនឹងបោះពុម្ពទំហំ size() និងតម្លៃរបស់ key "USD" ប៉ុន្មាន?',
    descriptionEn: 'What is the map size and the value of key "USD" output below?',
    codeSnippet: `import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> rates = new HashMap<>();
        rates.put("USD", 4000);
        rates.put("KHR", 1);
        rates.put("USD", 4100);

        System.out.println(rates.size() + " " + rates.get("USD"));
    }
}`,
    expectedAnswer: '2 4100',
    acceptedAnswers: ['2 4100'],
    explanationKm: 'ក្នុង HashMap មិនអាចមាន Key ដូចគ្នាពីរបានឡើយ (Keys are unique)។ នៅពេលយើង put("USD", 4100) ជាលើកទីពីរ វាមិនបង្កើត entry ថ្មីទេ តែវាទៅផ្លាស់ប្តូរតម្លៃចាស់ 4000 ជំនួសដោយ 4100។ ដូច្នេះ Map នៅសល់តែ 2 keys ប៉ុណ្ណោះ ("USD" និង "KHR") ហើយ rates.get("USD") គឺ 4100។',
    explanationEn: 'In a HashMap, keys are strictly unique. Calling put("USD", 4100) overwrites the existing entry with key "USD", replacing 4000 with 4100 without increasing the map size. Hence, size is 2 and get("USD") returns 4100.',
    hintsKm: ['តើ HashMap អនុញ្ញាតឱ្យមាន Duplicate Keys ដែរឬទេ?'],
    hintsEn: ['Does HashMap permit duplicate keys or does it overwrite previous values?'],
    recommendedLessonSlug: 'hashmap-hashset',
    recommendedLessonTitleKm: 'មេរៀនទី 6.3: ផែនទី និងសំនុំ (HashMap & HashSet)',
  },
  {
    id: 'm6-q4-cloze-arraylist-add',
    type: 'code-completion',
    difficulty: 'beginner',
    topic: 'collections',
    topicTitleKm: 'ArrayList និងការបន្ថែមធាតុ',
    topicTitleEn: 'ArrayList Add Method',
    learningObjectiveKm: 'ប្រើប្រាស់ method add() លើ ArrayList ដើម្បីបន្ថែមទិន្នន័យ',
    learningObjectiveEn: 'Use the add() method to append elements to an ArrayList instance',
    titleKm: 'បំពេញចន្លោះកូដ៖ បន្ថែមធាតុទៅកាន់ ArrayList',
    titleEn: 'Code Completion: ArrayList Add Method',
    descriptionKm: 'បំពេញឈ្មោះ method ត្រឹមត្រូវដើម្បីបន្ថែមឈ្មោះ "Sok" ចូលក្នុង ArrayList:',
    descriptionEn: 'Fill in the method name used to insert "Sok" into the ArrayList:',
    blankSnippet: `ArrayList<String> students = new ArrayList<>();
students._____("Sok");`,
    expectedAnswer: 'add',
    acceptedAnswers: ['add'],
    explanationKm: 'ក្នុង Java Collections (ដូចជា ArrayList, LinkedList, HashSet) យើងប្រើ method "add()" ដើម្បីបន្ថែមធាតុថ្មី។',
    explanationEn: 'The List interface and ArrayList class provide the "add()" method to append elements.',
    hintsKm: ['ពាក្យ ៣ អក្សរ មានន័យថា "បន្ថែម"។'],
    hintsEn: ['A 3-letter English word meaning append or insert.'],
    recommendedLessonSlug: 'arraylist-linkedlist',
    recommendedLessonTitleKm: 'មេរៀនទី 6.2: បញ្ជីបត់បែន (ArrayList & LinkedList)',
  },
];
