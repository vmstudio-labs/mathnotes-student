// Bilingual (English & Hindi) Localization Dictionary for MathNotes Ecosystem

export type SupportedLanguage = 'en' | 'hi' | 'hinglish';

export interface TranslationSchema {
  // Brand & Navigation
  brandTitle: string;
  brandTagline: string;
  languageName: string;
  navHome: string;
  navCourses: string;
  navAILens: string;
  navAITutor: string;
  navProfile: string;
  navDashboard: string;
  navCurriculum: string;
  navExamStudio: string;
  navDoubts: string;
  navAnalytics: string;

  // Home Screen & 4 Pillars
  heroTitle: string;
  heroSubtitle: string;
  btnAskAI: string;
  section4Pillars: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  pillar4Title: string;
  pillar4Desc: string;
  featuredCourses: string;
  btnExploreAll: string;

  // Catalog & Search
  searchPlaceholder: string;
  filterAll: string;
  filterPhysics: string;
  filterChemistry: string;
  filterMath: string;
  filterClass8: string;
  filterClass10: string;
  filterClass12: string;
  filterJEENEET: string;
  filterCSAT: string;
  enrolledStudents: string;
  lessonsCount: string;

  // CBT Exam & Quiz
  quizTitle: string;
  markingScheme: string;
  correctMark: string;
  negativeMark: string;
  timeRemaining: string;
  btnSaveNext: string;
  btnMarkReview: string;
  btnSubmitTest: string;
  socraticHint: string;
  explanationTitle: string;
  questionPalette: string;

  // Course Details & Lessons
  enrollNow: string;
  curriculumTitle: string;
  nextLesson: string;
  prevLesson: string;
  completeTopic: string;
  completedBadge: string;

  // Teacher Studio & AI Generation
  teacherStudioTitle: string;
  teacherStudioSub: string;
  aiCurriculumGenerator: string;
  aiQuizGenerator: string;
  selectSubject: string;
  selectGrade: string;
  selectLanguage: string;
  enterTopic: string;
  topicPlaceholder: string;
  btnGenerateWithAI: string;
  btnPublishTutorLMS: string;
  generatingMessage: string;
  publishingMessage: string;
  successPublishedTitle: string;

  // Doubts & Q&A
  askDoubtTitle: string;
  askDoubtPlaceholder: string;
  replyPlaceholder: string;
  btnSendReply: string;
  btnAIDraft: string;

  // Theme & Settings
  themeLight: string;
  themeDark: string;
  toggleThemeLabel: string;
  toggleLangLabel: string;
}

export const translations: Record<SupportedLanguage, TranslationSchema> = {
  en: {
    brandTitle: "MathNotes",
    brandTagline: "STEM Authority Platform • Math, Physics & Chemistry",
    languageName: "English",
    navHome: "Learn",
    navCourses: "Courses",
    navAILens: "AI Lens",
    navAITutor: "AI Tutor",
    navProfile: "Profile",
    navDashboard: "Dashboard",
    navCurriculum: "Curriculum",
    navExamStudio: "CBT Studio",
    navDoubts: "Q&A Doubts",
    navAnalytics: "Analytics",

    heroTitle: "Learn. Practice. Understand. Achieve.",
    heroSubtitle: "Master STEM (Physics, Chemistry & Math) from Class 8th to 12th, JEE & NEET from first principles. Visual derivations, deliberate practice, and 24/7 AI mentoring.",
    btnAskAI: "Ask MathNotes AI Mentor",
    section4Pillars: "The 4-Pillar Pedagogical System",
    pillar1Title: "Learn",
    pillar1Desc: "Visual intuition before mechanical equations",
    pillar2Title: "Practice",
    pillar2Desc: "Deliberate, multi-variation problem solving",
    pillar3Title: "Understand",
    pillar3Desc: "Feynman explanations & error analysis",
    pillar4Title: "Achieve",
    pillar4Desc: "Timed CBT mocks & national exam readiness",
    featuredCourses: "Featured STEM Masterclasses",
    btnExploreAll: "Explore All 60+ Courses",

    searchPlaceholder: "Search STEM chapters, topics, formulas...",
    filterAll: "All STEM",
    filterPhysics: "Physics",
    filterChemistry: "Chemistry",
    filterMath: "Mathematics",
    filterClass8: "Class 8th",
    filterClass10: "Class 10th",
    filterClass12: "Class 12th",
    filterJEENEET: "JEE & NEET",
    filterCSAT: "UPSC CSAT",
    enrolledStudents: "Students Enrolled",
    lessonsCount: "Lessons",

    quizTitle: "CBT Practice Mock Test",
    markingScheme: "Marking Scheme",
    correctMark: "+4.0 Correct",
    negativeMark: "-1.0 Incorrect",
    timeRemaining: "Time Left",
    btnSaveNext: "Save & Next",
    btnMarkReview: "Mark for Review",
    btnSubmitTest: "Submit Test",
    socraticHint: "Socratic Intuition Hint",
    explanationTitle: "Step-by-Step Proof & Answer Key",
    questionPalette: "Question Palette",

    enrollNow: "Enroll in Masterclass",
    curriculumTitle: "Course Curriculum & Lessons",
    nextLesson: "Next Lesson →",
    prevLesson: "← Previous Lesson",
    completeTopic: "Mark as Completed",
    completedBadge: "Completed",

    teacherStudioTitle: "AI STEM Curriculum & Exam Studio",
    teacherStudioSub: "Auto-generate bilingual courses, lessons & CBT quizzes for WordPress Tutor LMS",
    aiCurriculumGenerator: "✨ AI Course Outline Generator",
    aiQuizGenerator: "⚡ AI Question Paper & DPP Generator",
    selectSubject: "Target STEM Subject",
    selectGrade: "Grade Level / Exam Track",
    selectLanguage: "Curriculum Language",
    enterTopic: "Chapter / Concept Focus",
    topicPlaceholder: "e.g. Newton's Laws of Motion, Thermodynamics, Chemical Bonding, Calculus Limits",
    btnGenerateWithAI: "Generate Course & Lessons with AI",
    btnPublishTutorLMS: "Publish Live to Tutor LMS (WordPress)",
    generatingMessage: "Socratic AI is structuring curriculum and LaTeX math...",
    publishingMessage: "Deploying courses and lessons to mathnotes.courses...",
    successPublishedTitle: "Course & Lessons Published to Tutor LMS! 🎉",

    askDoubtTitle: "Ask Socratic Mentor",
    askDoubtPlaceholder: "Ask any Physics, Chemistry or Math question...",
    replyPlaceholder: "Type your detailed explanation with KaTeX math...",
    btnSendReply: "Send Explanation to Student",
    btnAIDraft: "Draft with Socratic AI",

    themeLight: "Light Mode",
    themeDark: "Dark Mode",
    toggleThemeLabel: "Theme",
    toggleLangLabel: "Language",
  },

  hi: {
    brandTitle: "मैथनोट्स (MathNotes)",
    brandTagline: "स्टेम शिक्षा मंच • गणित, भौतिकी और रसायन विज्ञान (कक्षा 8 से 12 एवं प्रतियोगी परीक्षाएं)",
    languageName: "हिन्दी",
    navHome: "अध्ययन",
    navCourses: "पाठ्यक्रम",
    navAILens: "एआई लेंस",
    navAITutor: "एआई शिक्षक",
    navProfile: "प्रोफ़ाइल",
    navDashboard: "डैशबोर्ड",
    navCurriculum: "पाठ्यक्रम प्रबंधन",
    navExamStudio: "परीक्षा स्टूडियो",
    navDoubts: "संदेह व उत्तर",
    navAnalytics: "प्रगति समीक्षा",

    heroTitle: "अध्ययन • अभ्यास • बोध • सफलता",
    heroSubtitle: "कक्षा 8वीं से 12वीं, जेईई और नीट हेतु मूल सिद्धांतों से स्टेम (गणित, भौतिकी, रसायन) की संपूर्ण तैयारी। दृश्य अंतर्ज्ञान, गहन अभ्यास और 24/7 एआई मार्गदर्शन।",
    btnAskAI: "एआई गुरु से पूछें",
    section4Pillars: "4-स्तंभ शिक्षण पद्धति",
    pillar1Title: "अध्ययन",
    pillar1Desc: "सूत्रों से पहले दृश्य अंतर्ज्ञान और स्पष्टता",
    pillar2Title: "अभ्यास",
    pillar2Desc: "विविध प्रश्न समाधान व सतत अभ्यास",
    pillar3Title: "बोध",
    pillar3Desc: "फाइनमैन अवधारणा व त्रुटि विश्लेषण",
    pillar4Title: "सफलता",
    pillar4Desc: "समयबद्ध सीबीटी मॉक व राष्ट्रीय परीक्षा तैयारी",
    featuredCourses: "प्रमुख स्टेम मास्टरक्लास",
    btnExploreAll: "सभी 60+ पाठ्यक्रम देखें",

    searchPlaceholder: "अध्याय, विषय, सूत्र या परीक्षा खोजें...",
    filterAll: "सभी विषय",
    filterPhysics: "भौतिक विज्ञान",
    filterChemistry: "रसायन विज्ञान",
    filterMath: "गणित",
    filterClass8: "कक्षा 8वीं",
    filterClass10: "कक्षा 10वीं",
    filterClass12: "कक्षा 12वीं",
    filterJEENEET: "जेईई एवं नीट",
    filterCSAT: "यूपीएससी सीसैट",
    enrolledStudents: "नामांकित छात्र",
    lessonsCount: "पाठ",

    quizTitle: "सीबीटी अभ्यास मॉक टेस्ट",
    markingScheme: "अंकन योजना",
    correctMark: "+4.0 सही उत्तर",
    negativeMark: "-1.0 ऋणात्मक",
    timeRemaining: "शेष समय",
    btnSaveNext: "सहेजें और आगे बढ़ें",
    btnMarkReview: "समीक्षा हेतु चिह्नित करें",
    btnSubmitTest: "परीक्षा जमा करें",
    socraticHint: "एआई संकेत एवं मार्गदर्शन",
    explanationTitle: "चरणबद्ध समाधान व उत्तर कुंजी",
    questionPalette: "प्रश्न तालिका",

    enrollNow: "पाठ्यक्रम में प्रवेश लें",
    curriculumTitle: "पाठ्यक्रम रूपरेखा व पाठ विवरण",
    nextLesson: "अगला पाठ →",
    prevLesson: "← पिछला पाठ",
    completeTopic: "पूर्ण चिह्नित करें",
    completedBadge: "पूर्ण",

    teacherStudioTitle: "एआई पाठ्यक्रम एवं प्रश्न पत्र स्टूडियो",
    teacherStudioSub: "गणित, भौतिकी और रसायन के संपूर्ण पाठ और क्विज़ एआई से तैयार करें और सीधे वर्डप्रेस ट्यूटर एलएमएस पर लाइव करें",
    aiCurriculumGenerator: "✨ एआई कोर्स रूपरेखा निर्माण",
    aiQuizGenerator: "⚡ एआई प्रश्न पत्र एवं डीपीपी निर्माता",
    selectSubject: "विषय चुनें (Subject)",
    selectGrade: "कक्षा / परीक्षा चुनें",
    selectLanguage: "भाषा का चयन",
    enterTopic: "अध्याय / अवधारणा का नाम",
    topicPlaceholder: "उदा. न्यूटन के गति नियम, ऊष्मागतिकी, रासायनिक आबंधन, समाकलन एवं सीमाएं",
    btnGenerateWithAI: "एआई से पाठ व प्रश्न पत्र तैयार करें",
    btnPublishTutorLMS: "ट्यूटर एलएमएस (वर्डप्रेस) पर लाइव प्रकाशित करें",
    generatingMessage: "एआई पाठ्यक्रम और लाटेक सूत्रों का निर्माण कर रहा है...",
    publishingMessage: "mathnotes.courses पर पाठ्यक्रम लाइव किया जा रहा है...",
    successPublishedTitle: "पाठ्यक्रम ट्यूटर एलएमएस पर सफलतापूर्वक लाइव हो गया! 🎉",

    askDoubtTitle: "एआई गुरु से शंका समाधान",
    askDoubtPlaceholder: "भौतिकी, रसायन या गणित का कोई भी प्रश्न पूछें...",
    replyPlaceholder: "गणितीय सूत्रों के साथ अपना विस्तृत उत्तर लिखें...",
    btnSendReply: "छात्र को उत्तर प्रेषित करें",
    btnAIDraft: "एआई से उत्तर का प्रारूप तैयार करें",

    themeLight: "लाइट मोड",
    themeDark: "डार्क मोड",
    toggleThemeLabel: "थीम",
    toggleLangLabel: "भाषा",
  },

  hinglish: {
    brandTitle: "MathNotes",
    brandTagline: "STEM Authority Platform • Math, Physics & Chemistry",
    languageName: "Hinglish",
    navHome: "Learn",
    navCourses: "Courses",
    navAILens: "AI Lens",
    navAITutor: "AI Tutor",
    navProfile: "Profile",
    navDashboard: "Dashboard",
    navCurriculum: "Curriculum",
    navExamStudio: "CBT Studio",
    navDoubts: "Q&A Doubts",
    navAnalytics: "Analytics",

    heroTitle: "Learn. Practice. Understand. Achieve.",
    heroSubtitle: "Class 8th se 12th, JEE & NEET ki complete STEM preparation first principles ke saath. Visual derivations, daily practice aur 24/7 AI mentor.",
    btnAskAI: "Ask MathNotes AI Mentor",
    section4Pillars: "4-Pillar Pedagogical System",
    pillar1Title: "Learn",
    pillar1Desc: "Formulas se pehle visual intuition aur concepts",
    pillar2Title: "Practice",
    pillar2Desc: "Multi-variation problem solving aur deliberate practice",
    pillar3Title: "Understand",
    pillar3Desc: "Feynman explanations aur error analysis",
    pillar4Title: "Achieve",
    pillar4Desc: "Timed CBT mocks aur exam readiness",
    featuredCourses: "Featured STEM Masterclasses",
    btnExploreAll: "Saare 60+ Courses Dekhein",

    searchPlaceholder: "Search STEM chapters, topics, formulas...",
    filterAll: "All STEM",
    filterPhysics: "Physics",
    filterChemistry: "Chemistry",
    filterMath: "Mathematics",
    filterClass8: "Class 8th",
    filterClass10: "Class 10th",
    filterClass12: "Class 12th",
    filterJEENEET: "JEE & NEET",
    filterCSAT: "UPSC CSAT",
    enrolledStudents: "Students Enrolled",
    lessonsCount: "Lessons",

    quizTitle: "CBT Practice Mock Test",
    markingScheme: "Marking Scheme",
    correctMark: "+4.0 Correct",
    negativeMark: "-1.0 Negative",
    timeRemaining: "Time Left",
    btnSaveNext: "Save & Next",
    btnMarkReview: "Mark for Review",
    btnSubmitTest: "Test Submit Karein",
    socraticHint: "Socratic Intuition Hint",
    explanationTitle: "Step-by-Step Proof & Answer Key",
    questionPalette: "Question Palette",

    enrollNow: "Course mein Enroll Karein",
    curriculumTitle: "Course Curriculum & Lessons",
    nextLesson: "Agla Lesson →",
    prevLesson: "← Pichhla Lesson",
    completeTopic: "Complete Mark Karein",
    completedBadge: "Completed",

    teacherStudioTitle: "AI STEM Curriculum & Exam Studio",
    teacherStudioSub: "Auto-generate bilingual courses, lessons & CBT quizzes for WordPress Tutor LMS",
    aiCurriculumGenerator: "✨ AI Course Outline Generator",
    aiQuizGenerator: "⚡ AI Question Paper & DPP Generator",
    selectSubject: "Target STEM Subject",
    selectGrade: "Grade Level / Exam Track",
    selectLanguage: "Curriculum Language",
    enterTopic: "Chapter / Concept Focus",
    topicPlaceholder: "e.g. Newton's Laws, Thermodynamics, Chemical Bonding, Calculus Limits",
    btnGenerateWithAI: "AI se Course & Lessons Generate Karein",
    btnPublishTutorLMS: "Tutor LMS (WordPress) par Live Publish Karein",
    generatingMessage: "Socratic AI curriculum aur LaTeX math structure kar raha hai...",
    publishingMessage: "mathnotes.courses par deploy ho raha hai...",
    successPublishedTitle: "Course Tutor LMS par Live Publish Ho Gaya! 🎉",

    askDoubtTitle: "Ask Socratic Mentor",
    askDoubtPlaceholder: "Physics, Chemistry ya Math ka koi bhi doubt poochhein...",
    replyPlaceholder: "KaTeX math ke saath explanation type karein...",
    btnSendReply: "Student ko Explanation Bhejein",
    btnAIDraft: "Socratic AI se Draft Karein",

    themeLight: "Light Mode",
    themeDark: "Dark Mode",
    toggleThemeLabel: "Theme",
    toggleLangLabel: "Language",
  }
};
