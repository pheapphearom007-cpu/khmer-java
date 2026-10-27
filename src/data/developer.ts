export interface DeveloperProfile {
  nameEn: string;
  nameKm?: string;
  roleEn: string;
  roleKm: string;
  locationEn: string;
  locationKm: string;
  email: string;
  phone: string;
  telegram: string;
  portfolioUrl: string;
  photoUrl: string;
  backgroundUrl: string;
  highSchoolEn: string;
  highSchoolKm: string;
  graduationYear: number;
  bioEn: string;
  bioKm: string;
  approachEn: string;
  approachKm: string;
  skillsKm: string[];
  skillsEn: string[];
  goalsKm: string[];
  goalsEn: string[];
  stats: {
    labelKm: string;
    labelEn: string;
    valueKm: string;
    valueEn: string;
  }[];
}

export const DEVELOPER_PROFILE: DeveloperProfile = {
  nameEn: 'Pheap Phirom',
  roleEn: 'Junior Web Developer',
  roleKm: 'អ្នកអភិវឌ្ឍន៍គេហទំព័រ (Junior Web Developer)',
  locationEn: 'Siem Reap, Cambodia',
  locationKm: 'ក្រុងសៀមរាប, ខេត្តសៀមរាប, ប្រទេសកម្ពុជា',
  email: 'pheapphearom007@gmail.com',
  phone: '+855 16 988 154',
  telegram: '+855 16 988 154',
  portfolioUrl: 'https://student-attendance-app-lkjj.onrender.com/my-portfolio.html',
  photoUrl: '/images/pheap-phirom.jpg',
  backgroundUrl: '/images/angkor-apsara.jpg',
  highSchoolEn: 'Athipadei High School',
  highSchoolKm: 'វិទ្យាល័យអធិបតី',
  graduationYear: 2025,
  bioEn:
    'A young web developer from Siem Reap crafting clean digital experiences with discipline, clarity, and a calm design sense. My work combines strong structure with elegant visual details inspired by Cambodian heritage. Passionate about building reliable, accessible educational tools for Cambodian students.',
  bioKm:
    'យុវជនអ្នកអភិវឌ្ឍន៍គេហទំព័រមកពីទឹកដីខេត្តសៀមរាប ដែលបង្កើតបទពិសោធន៍ឌីជីថលស្អាត ម៉ត់ចត់ ច្បាស់លាស់ និងរចនាសម្ព័ន្ធរៀបរយ។ ការងាររបស់ខ្ញុំរួមបញ្ចូលរចនាសម្ព័ន្ធកូដដ៏រឹងមាំជាមួយនឹងសោភ័ណភាពរចនាដ៏ទន់ភ្លន់ដែលបំផុសគំនិតដោយបេតិកភណ្ឌវប្បធម៌ខ្មែរ ព្រមទាំងប្តេជ្ញាចិត្តបង្កើតឧបករណ៍អប់រំសរសេរកូដ Java ដ៏មានប្រយោជន៍សម្រាប់សិស្ស-និស្សិតកម្ពុជា។',
  approachEn: 'Organized, respectful, detail-oriented, and learning continuously.',
  approachKm: 'មានរបៀបរៀបរយ គោរពពេលវេលា ផ្ចិតផ្ចង់រាល់ព័ត៌មានលម្អិត និងរៀនសូត្រអភិវឌ្ឍសមត្ថភាពជាប្រចាំ។',
  skillsKm: [
    'HTML5 និងរចនាសម្ព័ន្ធ Semantic តាមគោលការណ៍ទំនើប',
    'Responsive CSS និងការរចនា Interface ផ្ចិតផ្ចង់ទាក់ទាញ',
    'JavaScript/React ប្រព័ន្ធ Interaction និង Logic បម្រើអ្នកប្រើ',
    'ការរៀបចំប្រព័ន្ធរៀន Java, Logic ច្បាស់លាស់ និងការរៀនឆាប់រហ័ស',
  ],
  skillsEn: [
    'HTML5 and semantic markup with modern layout principles',
    'Responsive CSS and polished interface design',
    'JavaScript & React interaction patterns and user-focused behavior',
    'Clear logic, structure, attention to detail, and rapid learning',
  ],
  goalsKm: [
    'អភិវឌ្ឍគម្រោងគេហទំព័រដែលមានរចនាសម្ព័ន្ធកូដរឹងមាំ និងសោភ័ណភាពច្បាស់លាស់',
    'ពង្រីកជំនាញបច្ចេកវិទ្យាតាមរយៈការបង្កើតគម្រោងជាក់ស្តែងដែលបម្រើសង្គម',
    'សហការជាមួយក្រុមការងារដែលផ្តល់តម្លៃដល់ការគោរព និងការកែលម្អជាប្រចាំ',
    'បង្កើតបទពិសោធន៍ឌីជីថលដ៏ប្រណិត និងគួរឱ្យទុកចិត្តសម្រាប់អ្នកប្រើប្រាស់ពិតប្រាកដ',
  ],
  goalsEn: [
    'Develop polished web projects with strong structure and visual clarity',
    'Grow technical skills through practical development work',
    'Collaborate with teams that value respect and consistent improvement',
    'Create dependable, elegant digital experiences for real users',
  ],
  stats: [
    {
      labelKm: 'បទពិសោធន៍',
      labelEn: 'Experience',
      valueKm: 'Web Fundamentals & React',
      valueEn: 'Web Fundamentals & React',
    },
    {
      labelKm: 'ការផ្តោតសំខាន់',
      labelEn: 'Focus',
      valueKm: 'User Interface & Frontend Logic',
      valueEn: 'User Interface & Frontend Logic',
    },
    {
      labelKm: 'ការសិក្សា',
      labelEn: 'Education',
      valueKm: 'វិទ្យាល័យអធិបតី (ឆ្នាំ២០២៥)',
      valueEn: 'Athipadei High School (2025)',
    },
    {
      labelKm: 'ទីតាំង',
      labelEn: 'Location',
      valueKm: 'សៀមរាប, កម្ពុជា',
      valueEn: 'Siem Reap, Cambodia',
    },
  ],
};
