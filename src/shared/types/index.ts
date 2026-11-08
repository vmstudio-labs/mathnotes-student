// Shared TypeScript Definitions for Mathnotes Mobile Ecosystem - India 2026 Authority Platform

export type UserRole = 'student' | 'instructor' | 'administrator';

export type ExamTrack = 
  | 'IIT_JEE_MAIN' 
  | 'IIT_JEE_ADVANCED' 
  | 'NEET_UG'
  | 'CBSE_BOARDS' 
  | 'CLASS_8_FOUNDATION'
  | 'CLASS_9_FOUNDATION'
  | 'CLASS_10_BOARDS'
  | 'CLASS_11_SCIENCE'
  | 'CLASS_12_TARGET'
  | 'UPSC_CSAT' 
  | 'AI_AND_AUTOMATION' 
  | 'OLYMPIAD_FOUNDATION'
  | string;

export interface UserProfile {
  id: number;
  username: string;
  name: string;
  email: string;
  roles: UserRole[];
  avatarUrl?: string;
  bio?: string;
  targetExam?: ExamTrack;
  targetExamYear?: number;
  allIndiaRankEstimate?: number;
  enrolledCoursesCount?: number;
  completedCoursesCount?: number;
}

export interface GoogleAuthPayload {
  idToken: string;
  accessToken?: string;
  user: {
    id: string;
    email: string;
    name: string;
    givenName?: string;
    familyName?: string;
    photoUrl?: string;
  };
}

export interface AuthSession {
  token: string;
  refreshToken?: string;
  expiresAt: number;
  user: UserProfile;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  thumbnailUrl?: string;
  price: number;
  isFree: boolean;
  level: string;
  subject: string;
  examTrack: ExamTrack;
  instructor: {
    id: number;
    name: string;
    avatarUrl?: string;
    designation?: string;
  };
  duration?: string;
  totalLessons: number;
  totalQuizzes: number;
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  topics?: CourseTopic[];
}

export interface CourseTopic {
  id: number;
  title: string;
  order: number;
  lessons: Lesson[];
  quizzes?: Quiz[];
}

export interface Lesson {
  id: number;
  topicId: number;
  title: string;
  slug: string;
  duration?: string;
  videoUrl?: string;
  content: string; // Markdown or HTML with LaTeX
  order: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  codeSnippet?: string; // Python code snippet for AI/Math track
  attachments?: LessonAttachment[];
}

export interface LessonAttachment {
  id: number;
  name: string;
  url: string;
  size: string;
  type: 'pdf' | 'notes' | 'worksheet' | 'python_notebook';
}

export interface Quiz {
  id: number;
  topicId: number;
  title: string;
  examTrack?: ExamTrack;
  timeLimitMinutes?: number;
  passPercentage: number;
  questionsCount: number;
  markingScheme: {
    correctPoints: number; // e.g. +4 for JEE, +2.5 for UPSC
    negativePoints: number; // e.g. -1 for JEE, -0.83 for UPSC
  };
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string; // Supports LaTeX ($...$)
  type: 'single_choice' | 'multiple_choice' | 'numerical';
  options: QuizOption[];
  explanation?: string;
  points: number;
  negativePoints?: number;
  difficulty: 'Easy' | 'Moderate' | 'JEE Advanced' | 'UPSC Tough';
  topicTag: string;
}

export interface QuizOption {
  id: string;
  text: string; // Supports LaTeX
  isCorrect: boolean;
}

export interface QuizAttempt {
  id: number;
  quizId: number;
  studentId: number;
  score: number;
  maxScore: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  earnedPercentage: number;
  allIndiaPercentile?: number;
  isPassed: boolean;
  submittedAt: string;
  answers: Record<number, string>;
  aiDiagnosticAnalysis?: string; // AI error classification
}

export interface StudentEnrollment {
  id: number;
  courseId: number;
  course: Course;
  enrolledAt: string;
  progressPercent: number;
  completedLessonsCount: number;
  lastAccessedLessonId?: number;
  isCompleted: boolean;
}

export interface QNAThread {
  id: number;
  courseId: number;
  lessonId?: number;
  author: {
    id: number;
    name: string;
    avatarUrl?: string;
    role: UserRole;
  };
  title: string;
  question: string;
  createdAt: string;
  replies: QNAReply[];
}

export interface QNAReply {
  id: number;
  author: {
    id: number;
    name: string;
    avatarUrl?: string;
    role: UserRole;
  };
  content: string;
  createdAt: string;
  isInstructorReply?: boolean;
}

// AI Assistant & RAG Types
export type BotPersona = 'mathnotes_student_ai' | 'mathnotes_teacher_ai';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string; // Supports markdown and LaTeX: $formula$ and $$formula$$
  timestamp: string;
  sources?: string[];
  suggestedFollowups?: string[];
  isStreaming?: boolean;
  imageUri?: string; // Captured photo for Snap & Solve
  visionAnalysis?: VisionDoubtSolution;
}

export interface VisionDoubtRequest {
  imageUri: string;
  base64?: string;
  prompt?: string;
  examTrack?: ExamTrack;
}

export interface VisionDoubtSolution {
  extractedLaTeX: string;
  problemSummary: string;
  concept: string;
  steps: string[];
  finalAnswer: string;
  commonPitfall: string;
  relatedTopic: string;
}

// CBT Exam Engine Types (JEE Main/Adv & UPSC CSAT)
export type QuestionStatus = 
  | 'not_visited' 
  | 'not_answered' 
  | 'answered' 
  | 'marked_for_review' 
  | 'answered_marked_for_review';

export interface CBTExamSection {
  id: string;
  title: string;
  description?: string;
  questionIds: number[];
}

export interface CBTExamState {
  currentQuestionIndex: number;
  activeSectionId: string;
  questionStatuses: Record<number, QuestionStatus>;
  answers: Record<number, string>; // Option ID or Numerical Value
  timeRemainingSeconds: number;
  timeSpentPerQuestion: Record<number, number>; // Seconds spent
  isSubmitted: boolean;
}

// Payment & Razorpay / UPI Types
export interface PaymentOrder {
  orderId: string;
  courseId: number;
  amount: number;
  currency: string;
  studentId: number;
  receipt: string;
  status: 'created' | 'paid' | 'failed';
}

export interface PaymentVerificationPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  courseId: number;
}

// Paperclip Autonomous Automation Types
export interface PaperclipAutomationJob {
  id: string;
  title: string;
  cronSchedule: string;
  examTrack: ExamTrack;
  action: 'generate_daily_dpp' | 'audit_student_learning_gaps' | 'synthesize_mock_exam' | 'dispatch_weekly_digest';
  lastRun?: string;
  status: 'active' | 'paused' | 'running';
}

export interface AutonomousDPP {
  id: string;
  date: string;
  examTrack: ExamTrack;
  topic: string;
  questions: QuizQuestion[];
  generatedByAI: boolean;
}

export interface RAGBotConfig {
  botId: number;
  name: string;
  persona: BotPersona;
  welcomeMessage: string;
  starters: string[];
  systemPrompt: string;
}

// Teacher Specific Types
export interface TeacherAnalytics {
  totalStudents: number;
  activeCourses: number;
  totalEarnings: number;
  monthlyRevenue: number;
  averageRating: number;
  pendingReviewsCount: number;
  unansweredQuestionsCount: number;
  allIndiaTopRankersCount: number;
}
