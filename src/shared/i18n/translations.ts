// Bilingual (English & Hindi) Localization Dictionary for MathNotes Ecosystem

export type SupportedLanguage = 'en' | 'hi' | 'hinglish';

export interface TranslationSchema {
  // Navigation & General
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

  // Subjects
  subjectAll: string;
  subjectMath: string;
  subjectPhysics: string;
  subjectChemistry: string;
  subjectAI: string;
  subjectCSAT: string;

  // Grades & Exam Tracks
  gradeClass8: string;
  gradeClass9: string;
  gradeClass10: string;
  gradeClass11: string;
  gradeClass12: string;
  trackJEE: string;
  trackNEET: string;
  trackBoards: string;
  trackCSAT: string;

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

  // Q&A Doubts
  askDoubtTitle: string;
  askDoubtPlaceholder: string;
  replyPlaceholder: string;
  btnSendReply: string;
  btnAIDraft: string;
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

    subjectAll: "All Subjects",
    subjectMath: "Mathematics",
    subjectPhysics: "Physics",
    subjectChemistry: "Chemistry",
    subjectAI: "AI & Python",
    subjectCSAT: "CSAT Quant",

    gradeClass8: "Class 8th Foundation",
    gradeClass9: "Class 9th Foundation",
    gradeClass10: "Class 10th Boards",
    gradeClass11: "Class 11th Science",
    gradeClass12: "Class 12th Target",
    trackJEE: "IIT-JEE (Main & Adv)",
    trackNEET: "NEET UG (Medical)",
    trackBoards: "CBSE / State Boards",
    trackCSAT: "UPSC CSAT",

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

    askDoubtTitle: "Ask Socratic Mentor",
    askDoubtPlaceholder: "Ask any Physics, Chemistry or Math question...",
    replyPlaceholder: "Type your detailed explanation with KaTeX math...",
    btnSendReply: "Send Explanation to Student",
    btnAIDraft: "Draft with Socratic AI",
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

    subjectAll: "सभी विषय",
    subjectMath: "गणित (Mathematics)",
    subjectPhysics: "भौतिक विज्ञान (Physics)",
    subjectChemistry: "रसायन विज्ञान (Chemistry)",
    subjectAI: "एआई एवं पायथन",
    subjectCSAT: "सीसैट योग्यता",

    gradeClass8: "कक्षा 8वीं फाउंडेशन",
    gradeClass9: "कक्षा 9वीं फाउंडेशन",
    gradeClass10: "कक्षा 10वीं बोर्ड",
    gradeClass11: "कक्षा 11वीं विज्ञान",
    gradeClass12: "कक्षा 12वीं टारगेट",
    trackJEE: "आईआईटी-जेईई (मेन व एडवांस्ड)",
    trackNEET: "नीट यूजी (मेडिकल)",
    trackBoards: "सीबीएसई व स्टेट बोर्ड्स",
    trackCSAT: "यूपीएससी सीसैट",

    teacherStudioTitle: "एआई पाठ्यक्रम एवं प्रश्न पत्र स्टूडियो",
    teacherStudioSub: "गणित, भौतिकी और रसायन के संपूर्ण पाठ और क्विज़ एआई से तैयार करें और सीधे वर्डप्रेस ट्यूटर एलएमएस पर लाइव करें",
    aiCurriculumGenerator: "✨ एआई कोर्स रूपरेखा निर्माण",
    aiQuizGenerator: "⚡ एआई प्रश्न पत्र एवं डीपीपी निर्माता",
    selectSubject: "विषय चुनें (Subject)",
    selectGrade: "कक्षा / परीक्षा चुनें",
    selectLanguage: "भाषा का चयन",
    enterTopic: "अध्याय या मुख्य संकल्पना दर्ज करें",
    topicPlaceholder: "उदा. न्यूटन के गति नियम, स्थिरवैद्युतिकी, रासायनिक आबंधन, समाकलन",
    btnGenerateWithAI: "एआई से पाठ व क्विज़ तैयार करें",
    btnPublishTutorLMS: "ट्यूटर एलएमएस (WordPress) पर लाइव प्रकाशित करें",
    generatingMessage: "सुकराती एआई संकल्पना व सूत्र तैयार कर रहा है...",
    publishingMessage: "mathnotes.courses पर पाठ्यक्रम अपलोड हो रहा है...",
    successPublishedTitle: "पाठ्यक्रम ट्यूटर एलएमएस पर सफलतापूर्वक लाइव हुआ! 🎉",

    quizTitle: "सीबीटी अभ्यास मॉक टेस्ट",
    markingScheme: "अंकन पद्धति",
    correctMark: "+4.0 सही उत्तर",
    negativeMark: "-1.0 ऋणात्मक अंक",
    timeRemaining: "शेष समय",
    btnSaveNext: "सुरक्षित करें व आगे बढ़ें",
    btnMarkReview: "पुनर्विचार हेतु चिह्नित करें",
    btnSubmitTest: "परीक्षा सबमिट करें",
    socraticHint: "संकल्पनात्मक संकेत",
    explanationTitle: "चरणबद्ध प्रमाण व उत्तर कुंजी",

    askDoubtTitle: "सुकराती मेंटर से पूछें",
    askDoubtPlaceholder: "भौतिकी, रसायन या गणित से संबंधित कोई भी प्रश्न पूछें...",
    replyPlaceholder: "सूत्रों और स्पष्टीकरण के साथ उत्तर लिखें...",
    btnSendReply: "विद्यार्थी को उत्तर भेजें",
    btnAIDraft: "एआई से उत्तर तैयार करें",
  },

  hinglish: {
    brandTitle: "MathNotes",
    brandTagline: "Complete STEM Prep • Math, Physics & Chemistry (Class 8-12 & JEE/NEET)",
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

    subjectAll: "All Subjects",
    subjectMath: "Maths (गणित)",
    subjectPhysics: "Physics (भौतिकी)",
    subjectChemistry: "Chemistry (रसायन)",
    subjectAI: "AI & Python",
    subjectCSAT: "CSAT Quant",

    gradeClass8: "Class 8 Foundation",
    gradeClass9: "Class 9 Foundation",
    gradeClass10: "Class 10 Boards",
    gradeClass11: "Class 11 Science",
    gradeClass12: "Class 12 Target",
    trackJEE: "IIT-JEE Main + Advanced",
    trackNEET: "NEET UG Medical",
    trackBoards: "Boards Exam",
    trackCSAT: "UPSC CSAT",

    teacherStudioTitle: "AI STEM Course & Exam Builder",
    teacherStudioSub: "Bilingual lessons, formulas & quizzes auto-generated and synced to Tutor LMS",
    aiCurriculumGenerator: "✨ AI Course Outline Generator",
    aiQuizGenerator: "⚡ AI Question Paper & DPP Generator",
    selectSubject: "Choose Subject",
    selectGrade: "Class / Exam Target",
    selectLanguage: "Language Preference",
    enterTopic: "Chapter ya Topic likhein",
    topicPlaceholder: "e.g. Newton's Laws, Optics, Periodic Table, Calculus",
    btnGenerateWithAI: "Generate Course & Lessons with AI",
    btnPublishTutorLMS: "Publish to Tutor LMS Live",
    generatingMessage: "AI is creating concepts and LaTeX equations...",
    publishingMessage: "Publishing to mathnotes.courses...",
    successPublishedTitle: "Course successfully published on WordPress! 🎉",

    quizTitle: "CBT Practice Mock Test",
    markingScheme: "Marking Scheme",
    correctMark: "+4.0 Correct",
    negativeMark: "-1.0 Negative",
    timeRemaining: "Time Left",
    btnSaveNext: "Save & Next",
    btnMarkReview: "Mark for Review",
    btnSubmitTest: "Submit Test",
    socraticHint: "Concept Hint",
    explanationTitle: "Step-by-Step Solution",

    askDoubtTitle: "Ask Socratic Mentor",
    askDoubtPlaceholder: "Apna doubt yahan type karein...",
    replyPlaceholder: "Detailed explanation likhein...",
    btnSendReply: "Send to Student",
    btnAIDraft: "AI Draft Help",
  }
};
