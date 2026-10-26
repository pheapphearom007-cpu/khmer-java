import { GuidedProject } from '../types';

export const GUIDED_PROJECTS: GuidedProject[] = [
  {
    id: 'proj-1',
    slug: 'simple-calculator',
    titleKm: '១. ម៉ាស៊ីនគិតលេខពហុមុខងារ (Console Calculator)',
    titleEn: '1. Multi-functional Console Calculator',
    difficulty: 'beginner',
    estimatedHours: 2,
    descriptionKm: 'បង្កើតម៉ាស៊ីនគិតលេខលើ Terminal ដែលអាចអនុវត្តប្រមាណវិធីបូក ដក គុណ ចែក និងរកសំណល់ ដោយមានការត្រួតពិនិត្យភាពត្រឹមត្រូវនៃទិន្នន័យ (Input Validation)។',
    descriptionEn: 'Build a command-line calculator supporting addition, subtraction, multiplication, division, and modulo with input validation.',
    objectivesKm: [
      'អនុវត្តការប្រើប្រាស់ Scanner សម្រាប់ទទួលទិន្នន័យពីក្តារចុច',
      'ប្រើប្រាស់ Switch-Case សម្រាប់ជ្រើសរើសប្រមាណវិធី',
      'ទប់ស្កាត់កំហុសនៃការចែកនឹងលេខសូន្យ (Division by Zero)',
      'ប្រើរង្វិលជុំ While Loop ដើម្បីគណនាបន្តរហូតទាល់តែអ្នកប្រើប្រាស់ចង់ចាកចេញ',
    ],
    objectivesEn: [
      'Use Scanner for user input',
      'Use Switch-case for arithmetic operations',
      'Handle division by zero gracefully',
      'Use while loops for continuous calculations',
    ],
    requirements: [
      { id: 'req-1', textKm: 'ទទួលលេខទីមួយ និងលេខទីពីរពីអ្នកប្រើប្រាស់', textEn: 'Accept first and second numbers from user' },
      { id: 'req-2', textKm: 'អនុញ្ញាតឱ្យជ្រើសរើសប្រមាណវិធី (+, -, *, /, %)', textEn: 'Allow operator choice (+, -, *, /, %)' },
      { id: 'req-3', textKm: 'បង្ហាញលទ្ធផលត្រឹមត្រូវច្បាស់លាស់', textEn: 'Display accurate result' },
      { id: 'req-4', textKm: 'ការពារកំហុសនៅពេលចែកនឹងលេខ ០', textEn: 'Guard against division by zero' },
    ],
    starterCode: `import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("=== ម៉ាស៊ីនគិតលេខ Java ===");
        System.out.print("បញ្ចូលលេខទីមួយ: ");
        double num1 = scanner.nextDouble();
        
        System.out.print("ជ្រើសរើសប្រមាណវិធី (+, -, *, /): ");
        char operator = scanner.next().charAt(0);
        
        System.out.print("បញ្ចូលលេខទីពីរ: ");
        double num2 = scanner.nextDouble();
        
        double result = 0;
        // TODO: សរសេរ switch statement នៅទីនេះដើម្បីគណនា
        
        System.out.println("លទ្ធផល: " + result);
    }
}`,
    solutionCode: `import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("=== ម៉ាស៊ីនគិតលេខ Java ===");
        System.out.print("បញ្ចូលលេខទីមួយ: ");
        double num1 = scanner.nextDouble();
        
        System.out.print("ជ្រើសរើសប្រមាណវិធី (+, -, *, /, %): ");
        char operator = scanner.next().charAt(0);
        
        System.out.print("បញ្ចូលលេខទីពីរ: ");
        double num2 = scanner.nextDouble();
        
        double result;
        boolean valid = true;
        
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 == 0) {
                    System.out.println("កំហុស: មិនអាចចែកនឹងលេខសូន្យបានទេ!");
                    valid = false;
                    result = 0;
                } else {
                    result = num1 / num2;
                }
                break;
            case '%':
                result = num1 % num2;
                break;
            default:
                System.out.println("សញ្ញាប្រមាណវិធីមិនត្រឹមត្រូវ!");
                valid = false;
                result = 0;
        }
        
        if (valid) {
            System.out.println("លទ្ធផល: " + num1 + " " + operator + " " + num2 + " = " + result);
        }
    }
}`,
    hintsKm: [
      'ប្រើ scanner.nextDouble() សម្រាប់លេខទសភាគ',
      'ប្រើ scanner.next().charAt(0) សម្រាប់ចាប់យកសញ្ញា',
      'កុំភ្លេចពិនិត្យ if (num2 == 0) នៅត្រង់ករណីចែក /',
    ],
    hintsEn: [
      'Use scanner.nextDouble() for decimals',
      'Use scanner.next().charAt(0) to read the operator character',
      'Check if (num2 == 0) before dividing',
    ],
    testCases: [
      {
        name: 'ការបូក (Addition)',
        stdin: "25\n+\n75",
        expectedOutputSubstring: '100.0',
        descriptionKm: 'តេស្តបូក 25 + 75 ស្មើ 100',
        descriptionEn: 'Tests 25 + 75 = 100',
      },
      {
        name: 'ការចែកនឹងសូន្យ (Division by Zero)',
        stdin: "50\n/\n0",
        expectedOutputSubstring: 'មិនអាចចែកនឹងលេខសូន្យ',
        descriptionKm: 'តេស្តសុវត្ថិភាពនៅពេលចែកនឹង 0',
        descriptionEn: 'Tests guard against division by zero',
      },
    ],
    w3schoolsReferences: [
      { title: 'Java User Input (Scanner)', url: 'https://www.w3schools.com/java/java_user_input.asp' },
      { title: 'Java Switch Statement', url: 'https://www.w3schools.com/java/java_switch.asp' },
    ],
  },
  {
    id: 'proj-2',
    slug: 'student-grade-system',
    titleKm: '២. ប្រព័ន្ធគណនាពិន្ទុ និងនិទ្ទេសសិស្ស (Student Grade System)',
    titleEn: '2. Student Grading & GPA System',
    difficulty: 'beginner',
    estimatedHours: 2.5,
    descriptionKm: 'បង្កើតកម្មវិធីបញ្ចូលពិន្ទុមុខវិជ្ជាជាច្រើនរបស់សិស្ស គណនាពិន្ទុសរុប មធ្យមភាគ GPA និងចាត់ថ្នាក់និទ្ទេស (A, B, C, D, E, F) ព្រមទាំងបង្ហាញរបាយការណ៍ស្អាតបាត។',
    descriptionEn: 'Build a student grading system calculating total scores, averages, and grade letters (A to F) across multiple subjects.',
    objectivesKm: [
      'អនុវត្តការប្រើប្រាស់ Arrays សម្រាប់ផ្ទុកឈ្មោះមុខវិជ្ជា និងពិន្ទុ',
      'គណនាផលបូក និងមធ្យមភាគដោយប្រើ For Loop',
      'ប្រើលក្ខខណ្ឌ If-Else If សម្រាប់កំណត់និទ្ទេស',
    ],
    objectivesEn: [
      'Use arrays to hold subjects and scores',
      'Calculate sum and average with loops',
      'Map percentage to letter grades',
    ],
    requirements: [
      { id: 'req-2-1', textKm: 'បញ្ចូលឈ្មោះសិស្ស និងពិន្ទុ ៥ មុខវិជ្ជា', textEn: 'Accept student name and scores for 5 subjects' },
      { id: 'req-2-2', textKm: 'គណនាពិន្ទុមធ្យមភាគសរុប', textEn: 'Calculate average percentage' },
      { id: 'req-2-3', textKm: 'កំណត់និទ្ទេស (>=90: A, >=80: B, >=70: C, >=60: D, >=50: E, <50: F)', textEn: 'Assign grade letter' },
      { id: 'req-2-4', textKm: 'បង្ហាញរបាយការណ៍លទ្ធផលសង្ខេប', textEn: 'Display formatted transcript report' },
    ],
    starterCode: `import java.util.Scanner;

public class GradeSystem {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("បញ្ចូលឈ្មោះសិស្ស: ");
        String name = scanner.nextLine();
        
        String[] subjects = {"គណិតវិទ្យា", "រូបវិទ្យា", "គីមីវិទ្យា", "អក្សរសាស្ត្រខ្មែរ", "ភាសាអង់គ្លេស"};
        double[] scores = new double[subjects.length];
        
        // TODO: ប្រើ loop ដើម្បីទទួលពិន្ទុតាមមុខវិជ្ជានីមួយៗ
        
        // TODO: គណនាពិន្ទុសរុប មធ្យមភាគ និងនិទ្ទេស
    }
}`,
    solutionCode: `import java.util.Scanner;

public class GradeSystem {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("បញ្ចូលឈ្មោះសិស្ស: ");
        String name = scanner.nextLine();
        
        String[] subjects = {"គណិតវិទ្យា", "រូបវិទ្យា", "គីមីវិទ្យា", "អក្សរសាស្ត្រខ្មែរ", "ភាសាអង់គ្លេស"};
        double[] scores = new double[subjects.length];
        double total = 0;
        
        for (int i = 0; i < subjects.length; i++) {
            System.out.print("ពិន្ទុ " + subjects[i] + ": ");
            scores[i] = scanner.nextDouble();
            total += scores[i];
        }
        
        double average = total / subjects.length;
        char grade;
        
        if (average >= 90) grade = 'A';
        else if (average >= 80) grade = 'B';
        else if (average >= 70) grade = 'C';
        else if (average >= 60) grade = 'D';
        else if (average >= 50) grade = 'E';
        else grade = 'F';
        
        System.out.println("\n===== ព្រឹត្តិបត្រពិន្ទុ =====");
        System.out.println("សិស្សឈ្មោះ: " + name);
        System.out.println("ពិន្ទុសរុប: " + total + " / " + (subjects.length * 100));
        System.out.println("មធ្យមភាគ: " + String.format("%.2f", average) + "%");
        System.out.println("និទ្ទេសរួម: " + grade);
        System.out.println("លទ្ធផល: " + (grade != 'F' ? "ជាប់ (PASS)" : "ធ្លាក់ (FAIL)"));
    }
}`,
    hintsKm: [
      'ប្រើ scores.length សម្រាប់ចំនួនមុខវិជ្ជា',
      'String.format("%.2f", average) ជួយបង្ហាញទសភាគត្រឹម ២ ខ្ទង់',
    ],
    hintsEn: ['Iterate through subjects with loop', 'Format float output using String.format'],
    testCases: [
      {
        name: 'សិស្សនិទ្ទេស A',
        stdin: "សុខា\n95\n92\n88\n96\n90",
        expectedOutputSubstring: 'និទ្ទេសរួម: A',
        descriptionKm: 'តេស្តគណនានិទ្ទេស A ជាមួយពិន្ទុមធ្យមខ្ពស់',
        descriptionEn: 'Calculates Grade A properly',
      },
    ],
    w3schoolsReferences: [
      { title: 'Java Arrays', url: 'https://www.w3schools.com/java/java_arrays.asp' },
      { title: 'Java If...Else', url: 'https://www.w3schools.com/java/java_conditions.asp' },
    ],
  },
  {
    id: 'proj-3',
    slug: 'atm-simulator',
    titleKm: '៣. ម៉ាស៊ីនដកប្រាក់ស្វ័យប្រវត្តិ (ATM Simulator)',
    titleEn: '3. Bank ATM Simulator',
    difficulty: 'intermediate',
    estimatedHours: 3,
    descriptionKm: 'បង្កើតប្រព័ន្ធ ATM ក្លែងធ្វើពេញលេញដែលមានផ្ទៀងផ្ទាត់លេខសម្ងាត់ PIN, ពិនិត្យសមតុល្យ, ដាក់ប្រាក់, ដកប្រាក់ (មានត្រួតពិនិត្យសមតុល្យគ្រប់គ្រាន់) និងប្រវត្តិនៃប្រតិបត្តិការ។',
    descriptionEn: 'Simulate a bank ATM machine with PIN authentication, balance inquiry, deposit, withdrawal guards, and transaction logs.',
    objectivesKm: [
      'អនុវត្តកម្មវិធីបែប OOP ជាមួយ Class Account',
      'គ្រប់គ្រង State និងទិន្នន័យសម្ងាត់ដោយប្រើ Encapsulation',
      'បង្កើត Console Menu ដែលអាចរត់ដដែលៗរហូតដល់អ្នកប្រើជ្រើសរើសចាកចេញ',
    ],
    objectivesEn: [
      'Implement OOP with BankAccount class',
      'Encapsulate sensitive balance and PIN attributes',
      'Interactive menu loop pattern',
    ],
    requirements: [
      { id: 'req-3-1', textKm: 'ផ្ទៀងផ្ទាត់ PIN (អនុញ្ញាតឱ្យបញ្ចូលខុសអតិបរមា ៣ ដង)', textEn: 'Verify PIN with max 3 attempts' },
      { id: 'req-3-2', textKm: 'ពិនិត្យសមតុល្យទឹកប្រាក់បច្ចុប្បន្ន', textEn: 'Check current balance' },
      { id: 'req-3-3', textKm: 'ដាក់ប្រាក់ចូលគណនី (Deposit)', textEn: 'Deposit funds' },
      { id: 'req-3-4', textKm: 'ដកប្រាក់ (Withdraw) ដោយមិនអនុញ្ញាតឱ្យដកលើសពីសមតុល្យដែលមានឡើយ', textEn: 'Withdraw with insufficient funds guard' },
    ],
    starterCode: `import java.util.Scanner;

class BankAccount {
    private String accountNumber;
    private String pin;
    private double balance;
    
    public BankAccount(String accountNumber, String pin, double initialBalance) {
        this.accountNumber = accountNumber;
        this.pin = pin;
        this.balance = initialBalance;
    }
    
    public boolean verifyPin(String enteredPin) {
        return this.pin.equals(enteredPin);
    }
    
    // TODO: បង្កើត method getBalance(), deposit(), withdraw()
}

public class ATMSimulator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        BankAccount account = new BankAccount("ABA-998877", "1234", 1000.0);
        
        System.out.println("=== ស្វាគមន៍មកកាន់ធនាគារ ATM ===");
        // TODO: អនុវត្តការផ្ទៀងផ្ទាត់ PIN និង Menu
    }
}`,
    solutionCode: `import java.util.Scanner;

class BankAccount {
    private String accountNumber;
    private String pin;
    private double balance;
    
    public BankAccount(String accountNumber, String pin, double initialBalance) {
        this.accountNumber = accountNumber;
        this.pin = pin;
        this.balance = initialBalance;
    }
    
    public boolean verifyPin(String enteredPin) {
        return this.pin.equals(enteredPin);
    }
    
    public double getBalance() {
        return balance;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("ដាក់ប្រាក់ជោគជ័យ: +" + amount + "$ | សមតុល្យថ្មី: " + balance + "$");
        } else {
            System.out.println("ចំនួនប្រាក់ត្រូវតែធំជាង ០!");
        }
    }
    
    public boolean withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("ចំនួនទឹកប្រាក់ដកមិនត្រឹមត្រូវ!");
            return false;
        }
        if (amount > balance) {
            System.out.println("បរាជ័យ: សមតុល្យក្នុងគណនីមិនគ្រប់គ្រាន់ឡើយ (សមតុល្យ: " + balance + "$)");
            return false;
        }
        balance -= amount;
        System.out.println("ដកប្រាក់ជោគជ័យ: -" + amount + "$ | សមតុល្យនៅសល់: " + balance + "$");
        return true;
    }
}

public class ATMSimulator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        BankAccount account = new BankAccount("ABA-998877", "1234", 500.0);
        
        System.out.println("=== ស្វាគមន៍មកកាន់ធនាគារ ATM ===");
        System.out.print("សូមបញ្ចូលលេខកូដ PIN ៤ ខ្ទង់: ");
        String enteredPin = scanner.next();
        
        if (!account.verifyPin(enteredPin)) {
            System.out.println("លេខកូដ PIN មិនត្រឹមត្រូវឡើយ! កាតត្រូវបានចាក់សោ។");
            return;
        }
        
        System.out.println("ចូលគណនីជោគជ័យ!");
        boolean running = true;
        
        while (running) {
            System.out.println("\n--- ម៉ឺនុយប្រតិបត្តិការ ---");
            System.out.println("1. ពិនិត្យសមតុល្យ");
            System.out.println("2. ដាក់ប្រាក់");
            System.out.println("3. ដកប្រាក់");
            System.out.println("4. ចាកចេញ");
            System.out.print("ជ្រើសរើសជម្រើស (1-4): ");
            int choice = scanner.nextInt();
            
            switch (choice) {
                case 1:
                    System.out.println("សមតុល្យបច្ចុប្បន្ន: " + account.getBalance() + "$");
                    break;
                case 2:
                    System.out.print("បញ្ចូលចំនួនទឹកប្រាក់ត្រូវដាក់: ");
                    double dep = scanner.nextDouble();
                    account.deposit(dep);
                    break;
                case 3:
                    System.out.print("បញ្ចូលចំនួនទឹកប្រាក់ត្រូវដក: ");
                    double with = scanner.nextDouble();
                    account.withdraw(with);
                    break;
                case 4:
                    System.out.println("សូមអរគុណដែលបានប្រើប្រាស់សេវាកម្ម ATM របស់យើង! ជម្រាបលា។");
                    running = false;
                    break;
                default:
                    System.out.println("ជម្រើសមិនត្រឹមត្រូវ!");
            }
        }
    }
}`,
    hintsKm: [
      'ប្រើ while(running) សម្រាប់ Loop Menu',
      'ត្រូវពិនិត្យមើល balance >= amount មុននឹងដកប្រាក់',
    ],
    hintsEn: ['Use loop for menu interaction', 'Verify balance before approving withdrawal'],
    testCases: [
      {
        name: 'ដកប្រាក់ត្រឹមត្រូវ',
        stdin: "1234\n3\n200\n4",
        expectedOutputSubstring: 'ដកប្រាក់ជោគជ័យ: -200.0$',
        descriptionKm: 'តេស្តដកប្រាក់ 200$',
        descriptionEn: 'Tests valid withdrawal',
      },
    ],
    w3schoolsReferences: [
      { title: 'Java Encapsulation', url: 'https://www.w3schools.com/java/java_encapsulation.asp' },
      { title: 'Java Classes and Objects', url: 'https://www.w3schools.com/java/java_classes.asp' },
    ],
  },
  {
    id: 'proj-4',
    slug: 'library-management-system',
    titleKm: '៤. ប្រព័ន្ធគ្រប់គ្រងបណ្ណាល័យ OOP (Library Management)',
    titleEn: '4. OOP Library Management System',
    difficulty: 'intermediate',
    estimatedHours: 3.5,
    descriptionKm: 'កសាងប្រព័ន្ធបណ្ណាល័យបែប OOP ដោយប្រើ Class Book, Library, និង Member។ គាំទ្រការបន្ថែមសៀវភៅ ខ្ចីសៀវភៅ សងសៀវភៅ និងស្វែងរកតាមចំណងជើង ឬអ្នកនិពន្ធ។',
    descriptionEn: 'Build an OOP library system with Book and Library classes supporting book registration, loans, returns, and searching.',
    objectivesKm: [
      'រចនាទំនាក់ទំនងរវាង Class ច្រើន (Composition & Aggregation)',
      'គ្រប់គ្រងបណ្តុំសៀវភៅដោយប្រើ ArrayList<Book>',
      'អនុវត្ត State Pattern លើស្ថានភាពសៀវភៅ (isBorrowed)',
    ],
    objectivesEn: [
      'Design multiple interacting classes',
      'Use ArrayList<Book> collection',
      'Track book availability state',
    ],
    requirements: [
      { id: 'req-4-1', textKm: 'បង្កើត Class Book (id, title, author, isBorrowed)', textEn: 'Create Book class' },
      { id: 'req-4-2', textKm: 'បង្កើត Class Library សម្រាប់ផ្ទុក និងគ្រប់គ្រងសៀវភៅ', textEn: 'Create Library manager' },
      { id: 'req-4-3', textKm: 'មុខងារខ្ចីសៀវភៅ និងសងសៀវភៅ', textEn: 'Borrow and return functions' },
      { id: 'req-4-4', textKm: 'មុខងារស្វែងរកសៀវភៅតាមចំណងជើង', textEn: 'Search book by title' },
    ],
    starterCode: `import java.util.ArrayList;

class Book {
    private String id;
    private String title;
    private String author;
    private boolean isBorrowed;
    
    // TODO: បង្កើត Constructor, Getters និង Methods borrowBook() / returnBook()
}

class Library {
    private ArrayList<Book> books = new ArrayList<>();
    
    // TODO: បង្កើត addBook(), displayAllBooks(), findBook()
}

public class LibraryApp {
    public static void main(String[] args) {
        System.out.println("=== ប្រព័ន្ធបណ្ណាល័យកម្ពុជា ===");
    }
}`,
    solutionCode: `import java.util.ArrayList;

class Book {
    private String id;
    private String title;
    private String author;
    private boolean isBorrowed;
    
    public Book(String id, String title, String author) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isBorrowed = false;
    }
    
    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public boolean isBorrowed() { return isBorrowed; }
    
    public boolean borrowBook() {
        if (!isBorrowed) {
            isBorrowed = true;
            return true;
        }
        return false;
    }
    
    public void returnBook() {
        isBorrowed = false;
    }
    
    public void display() {
        System.out.println("[" + id + "] " + title + " - អ្នកនិពន្ធ: " + author + " | ស្ថានភាព: " + (isBorrowed ? "បានខ្ចីរួច (Borrowed)" : "នៅទំនេរ (Available)"));
    }
}

class Library {
    private ArrayList<Book> books = new ArrayList<>();
    
    public void addBook(Book book) {
        books.add(book);
        System.out.println("បានបន្ថែមសៀវភៅ: " + book.getTitle());
    }
    
    public void displayAll() {
        System.out.println("\n=== បញ្ជីសៀវភៅក្នុងបណ្ណាល័យ ===");
        for (Book b : books) {
            b.display();
        }
    }
    
    public Book findById(String id) {
        for (Book b : books) {
            if (b.getId().equalsIgnoreCase(id)) return b;
        }
        return null;
    }
}

public class LibraryApp {
    public static void main(String[] args) {
        Library library = new Library();
        
        library.addBook(new Book("B01", "កុលាបប៉ៃលិន", "ញ៉ុក ថែម"));
        library.addBook(new Book("B02", "រឿងព្រះវេស្សន្តរ", "ព្រះមហាវិមលធម្ម"));
        library.addBook(new Book("B03", "ចៅស្រទបចេក", "រឿងបុរាណ"));
        
        library.displayAll();
        
        // សាកល្បងខ្ចីសៀវភៅ
        System.out.println("\n--- ធ្វើការខ្ចីសៀវភៅ B01 ---");
        Book target = library.findById("B01");
        if (target != null && target.borrowBook()) {
            System.out.println("ខ្ចីជោគជ័យនូវសៀវភៅ: " + target.getTitle());
        }
        
        library.displayAll();
    }
}`,
    hintsKm: [
      'ប្រើ boolean isBorrowed ដើម្បីដឹងពីស្ថានភាពសៀវភៅ',
      'equalsIgnoreCase ជួយប្រៀបធៀបអក្សរ id ដោយមិនខ្វល់តូចធំ',
    ],
    hintsEn: ['Track availability with boolean', 'Use equalsIgnoreCase for flexible ID lookups'],
    testCases: [
      {
        name: 'ខ្ចីសៀវភៅជោគជ័យ',
        stdin: "",
        expectedOutputSubstring: 'ខ្ចីជោគជ័យនូវសៀវភៅ: កុលាបប៉ៃលិន',
        descriptionKm: 'តេស្តខ្ចីសៀវភៅ B01',
        descriptionEn: 'Tests borrowing functionality',
      },
    ],
    w3schoolsReferences: [
      { title: 'Java ArrayList', url: 'https://www.w3schools.com/java/java_arraylist.asp' },
      { title: 'Java Constructors', url: 'https://www.w3schools.com/java/java_constructors.asp' },
    ],
  },
  {
    id: 'proj-5',
    slug: 'student-management-system',
    titleKm: '៥. ប្រព័ន្ធគ្រប់គ្រងសិស្សពេញលេញ (Student Management System)',
    titleEn: '5. Complete Student Management System',
    difficulty: 'advanced',
    estimatedHours: 4,
    descriptionKm: 'គម្រោងបញ្ចប់ធំ: បង្កើតកម្មវិធីគ្រប់គ្រងសិស្ស (CRUD) ពេញលេញជាមួយ Java Collections (ArrayList & HashMap)។ អនុញ្ញាតឱ្យបន្ថែម កែប្រែ លុប ស្វែងរក គណនាស្ថិតិថ្នាក់រៀន និងតម្រៀបលំដាប់ពិន្ទុពីខ្ពស់ទៅទាប។',
    descriptionEn: 'Capstone Project: Full CRUD student database using ArrayList and HashMap with filtering, searching, statistics, and sorting.',
    objectivesKm: [
      'អនុវត្ត CRUD (Create, Read, Update, Delete) ពេញលេញ',
      'ប្រើប្រាស់ Generics, Collections, និង Comparator សម្រាប់តម្រៀបពិន្ទុ',
      'រៀបចំស្ថាបត្យកម្មកូដស្អាតតាមគោលការណ៍ Single Responsibility Principle (SRP)',
    ],
    objectivesEn: [
      'Implement complete CRUD operations',
      'Use Collections framework and sorting',
      'Maintain clean modular architecture',
    ],
    requirements: [
      { id: 'req-5-1', textKm: 'បន្ថែមសិស្សថ្មី (ID, ឈ្មោះ, ភេទ, ជំនាញ, ពិន្ទុ)', textEn: 'Add new students' },
      { id: 'req-5-2', textKm: 'បង្ហាញបញ្ជីសិស្សទាំងអស់ដែលមានរបៀបរៀបរយ', textEn: 'List all students' },
      { id: 'req-5-3', textKm: 'ស្វែងរកសិស្សតាម ID ឬឈ្មោះ', textEn: 'Search students by ID or name' },
      { id: 'req-5-4', textKm: 'លុបសិស្សតាម ID', textEn: 'Delete student by ID' },
      { id: 'req-5-5', textKm: 'តម្រៀបសិស្សតាមចំណាត់ថ្នាក់ពិន្ទុពីខ្ពស់ទៅទាប', textEn: 'Sort students by score descending' },
    ],
    starterCode: `import java.util.ArrayList;
import java.util.Scanner;

class Student {
    private String id;
    private String name;
    private double score;
    
    // TODO: បង្កើត Constructor, Getters និង toString()
}

public class StudentManagement {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<Student> list = new ArrayList<>();
        
        System.out.println("=== ប្រព័ន្ធគ្រប់គ្រងសិស្ស Java ===");
        // TODO: អនុវត្ត CRUD Menu
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

class Student {
    private String id;
    private String name;
    private String major;
    private double score;
    
    public Student(String id, String name, String major, double score) {
        this.id = id;
        this.name = name;
        this.major = major;
        this.score = score;
    }
    
    public String getId() { return id; }
    public String getName() { return name; }
    public String getMajor() { return major; }
    public double getScore() { return score; }
    
    public void display() {
        System.out.println("ID: " + id + " | ឈ្មោះ: " + name + " | ជំនាញ: " + major + " | ពិន្ទុ: " + score);
    }
}

public class StudentManagement {
    public static void main(String[] args) {
        ArrayList<Student> students = new ArrayList<>();
        
        // បន្ថែមសិស្សគំរូ
        students.add(new Student("ST01", "សុខ ចាន់ធា", "Computer Science", 88.5));
        students.add(new Student("ST02", "កែវ វិចិត្រ", "Software Engineering", 94.0));
        students.add(new Student("ST03", "ម៉េង បុប្ផា", "Data Science", 76.0));
        
        System.out.println("=== បញ្ជីសិស្សទាំងអស់ ===");
        for (Student s : students) {
            s.display();
        }
        
        // តម្រៀបតាមពិន្ទុពីខ្ពស់ទៅទាប (Descending Sort)
        Collections.sort(students, new Comparator<Student>() {
            @Override
            public int compare(Student s1, Student s2) {
                return Double.compare(s2.getScore(), s1.getScore());
            }
        });
        
        System.out.println("\n=== ចំណាត់ថ្នាក់សិស្សពូកែ (ពីខ្ពស់ទៅទាប) ===");
        int rank = 1;
        for (Student s : students) {
            System.out.print("ចំណាត់ថ្នាក់ទី " + (rank++) + " -> ");
            s.display();
        }
    }
}`,
    hintsKm: [
      'ប្រើ Collections.sort() ជាមួយ Custom Comparator សម្រាប់តម្រៀបតាមពិន្ទុ',
      'ប្រើ Double.compare(s2.getScore(), s1.getScore()) សម្រាប់លំដាប់ចុះ',
    ],
    hintsEn: ['Use Collections.sort with custom Comparator', 'Descending comparison: s2 compared to s1'],
    testCases: [
      {
        name: 'តម្រៀបសិស្សពូកែ',
        stdin: "",
        expectedOutputSubstring: 'ចំណាត់ថ្នាក់ទី 1 -> ID: ST02 | ឈ្មោះ: កែវ វិចិត្រ',
        descriptionKm: 'តេស្តចំណាត់ថ្នាក់លេខ ១ បានទៅលើ កែវ វិចិត្រ (94.0)',
        descriptionEn: 'Validates top rank correctly',
      },
    ],
    w3schoolsReferences: [
      { title: 'Java ArrayList', url: 'https://www.w3schools.com/java/java_arraylist.asp' },
      { title: 'Java Sorting Lists', url: 'https://www.w3schools.com/java/java_sorting.asp' },
    ],
  },
];
