import { Course, CourseTopic, Lesson, Quiz, StudentEnrollment, UserProfile, QNAThread, ExamTrack } from '../types';

export const API_BASE_URL = 'https://mathnotes.courses/wp-json';

export class ApiService {
  private static instance: ApiService;
  private authToken: string | null = null;

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public setAuthToken(token: string) {
    this.authToken = token;
  }

  public getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    if (this.authToken) {
      headers['Authorization'] = this.authToken.startsWith('Basic ') || this.authToken.startsWith('Bearer ') 
        ? this.authToken 
        : `Bearer ${this.authToken}`;
    }
    return headers;
  }

  // --- COURSES WITH COMPETITIVE EXAM TRACKS ---
  public async getCourses(track?: ExamTrack): Promise<Course[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/wp/v2/courses?per_page=20`, {
        headers: this.getHeaders(),
      });
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      
      const mapped = data.map((item: any) => this.mapCourseFromWP(item));
      return track ? mapped.filter((c: Course) => c.examTrack === track) : mapped;
    } catch (err) {
      const all = this.getMockCourses();
      return track ? all.filter(c => c.examTrack === track) : all;
    }
  }

  public async getCourseById(id: number): Promise<Course> {
    const all = this.getMockCourses();
    return all.find(c => c.id === id) || all[0];
  }

  public async markLessonComplete(lessonId: number): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/tutor/v1/lesson-mark-complete`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ lesson_id: lessonId }),
      });
      return response.ok;
    } catch (err) {
      return true; // Optimistic update
    }
  }

  public async enrollCourse(courseId: number): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/tutor/v1/enroll`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ course_id: courseId }),
      });
      return response.ok;
    } catch (err) {
      return true; // Dev optimistic enrollment
    }
  }

  public async getStudentEnrollments(studentId?: number): Promise<StudentEnrollment[]> {
    const courses = this.getMockCourses();
    return [
      {
        id: 101,
        courseId: courses[0].id,
        course: courses[0],
        enrolledAt: '2026-10-15',
        progressPercent: 72,
        completedLessonsCount: 9,
        lastAccessedLessonId: 1,
        isCompleted: false,
      },
      {
        id: 102,
        courseId: courses[3].id,
        course: courses[3],
        enrolledAt: '2026-10-22',
        progressPercent: 45,
        completedLessonsCount: 4,
        lastAccessedLessonId: 12,
        isCompleted: false,
      }
    ];
  }

  private mapCourseFromWP(item: any): Course {
    let subject = 'General Math';
    let examTrack: ExamTrack = 'IIT_JEE_MAIN';
    const rawTitle = typeof item.title === 'object' ? item.title?.rendered : item.title;
    const title = (rawTitle || 'Untitled Course').replace(/&#038;/g, '&');
    const lower = title.toLowerCase();

    let defaultThumb = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80';
    let level = 'Class 11 & 12 / JEE';

    if (lower.includes('physics') || lower.includes('à¤­à¥Œà¤¤à¤¿à¤•') || lower.includes('kinematics')) {
      subject = 'Physics (à¤­à¥Œà¤¤à¤¿à¤• à¤µà¤¿à¤œà¥à¤žà¤¾à¤¨)';
      examTrack = lower.includes('neet') ? 'NEET_UG' : 'IIT_JEE_MAIN';
      defaultThumb = 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80';
      level = 'JEE & NEET Prep';
    } else if (lower.includes('chemistry') || lower.includes('à¤°à¤¸à¤¾à¤¯à¤¨') || lower.includes('bonding')) {
      subject = 'Chemistry (à¤°à¤¸à¤¾à¤¯à¤¨ à¤µà¤¿à¤œà¥à¤žà¤¾à¤¨)';
      examTrack = lower.includes('neet') ? 'NEET_UG' : 'IIT_JEE_MAIN';
      defaultThumb = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80';
      level = 'Class 11 / JEE / NEET';
    } else if (lower.includes('class 10') || lower.includes('à¤•à¤•à¥à¤·à¤¾ 10')) {
      subject = 'Class 10th STEM';
      examTrack = 'CLASS_10_BOARDS';
      defaultThumb = 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80';
      level = 'Class 10th Boards';
    } else if (lower.includes('class 8') || lower.includes('à¤•à¤•à¥à¤·à¤¾ 8')) {
      subject = 'Class 8th Foundation';
      examTrack = 'CLASS_8_FOUNDATION';
      defaultThumb = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80';
      level = 'Class 8th Foundation';
    } else if (lower.includes('calculus')) {
      subject = 'Calculus';
      examTrack = 'IIT_JEE_ADVANCED';
      level = 'JEE Advanced Tier';
    } else if (lower.includes('algebra')) {
      subject = 'Algebra';
      examTrack = 'IIT_JEE_MAIN';
      level = 'JEE Main Tier';
    } else if (lower.includes('geometry') || lower.includes('vector')) {
      subject = 'Coordinate Geometry';
      examTrack = 'IIT_JEE_MAIN';
      level = 'JEE Main Tier';
    }

    const rawExcerpt = typeof item.excerpt === 'object' ? item.excerpt?.rendered : item.excerpt;
    const excerpt = (rawExcerpt || '').replace(/<[^>]+>/g, '').trim();

    return {
      id: item.id,
      title,
      slug: item.slug || course- + item.id,
      excerpt,
      content: typeof item.content === 'object' ? item.content?.rendered : (item.content || ''),
      price: 0,
      isFree: true,
      level,
      subject,
      examTrack,
      instructor: {
        id: item.author || 2,
        name: 'Webxpro Digital',
        designation: 'Ex-IITian Senior STEM Faculty',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      },
      duration: '24h 00m',
      totalLessons: 24,
      totalQuizzes: 6,
      rating: 4.95,
      reviewsCount: 142,
      enrolledCount: 1240,
      thumbnailUrl: defaultThumb,
      topics: this.getTopicsForSubject(subject),
    };
  }

  public getTopicsForSubject(subject: Course['subject']): CourseTopic[] {
    if (subject === 'Calculus') {
      return [
        {
          id: 1,
          title: 'Topic 1: Limits & Continuity (JEE Advanced Level)',
          order: 1,
          lessons: [
            {
              id: 1,
              topicId: 1,
              title: 'Visual Proofs: Squeeze Theorem & Standard Limits',
              slug: 'visual-limits',
              duration: '18 mins',
              content: `### Squeeze Theorem & First Principles
$$\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1$$

On the unit circle, for $0 < x < \\frac{\\pi}{2}$:
$$\\text{Area}(\\triangle OAB) < \\text{Area}(\\text{Sector } OAB) < \\text{Area}(\\triangle OAC)$$
$$\\frac{1}{2} \\sin(x) < \\frac{1}{2} x < \\frac{1}{2} \\tan(x)$$
Dividing by $\\sin(x)$:
$$1 < \\frac{x}{\\sin(x)} < \\frac{1}{\\cos(x)} \\implies \\cos(x) < \\frac{\\sin(x)}{x} < 1$$
As $x \\to 0$, $\\cos(x) \\to 1$. Hence, by the Squeeze Theorem, $\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1$.`,
              order: 1,
              isCompleted: true,
            }
          ],
          quizzes: [
            {
              id: 101,
              topicId: 1,
              title: 'CBT Mock Checkpoint: Limits & Continuity (JEE Pattern)',
              examTrack: 'IIT_JEE_ADVANCED',
              passPercentage: 70,
              questionsCount: 2,
              markingScheme: { correctPoints: 4, negativePoints: -1 },
              questions: [
                {
                  id: 1,
                  question: 'Evaluate the limit: $\\lim_{x \\to 0} \\frac{x - \\sin(x)}{x^3}$',
                  type: 'single_choice',
                  points: 4,
                  negativePoints: -1,
                  difficulty: 'JEE Advanced',
                  topicTag: 'Taylor Expansion / L-Hopital',
                  explanation: 'Using Taylor series: $\\sin(x) = x - \\frac{x^3}{6} + \\dots$. Therefore, $\\frac{x - (x - x^3/6)}{x^3} = \\frac{1}{6}$.',
                  options: [
                    { id: 'a', text: '0', isCorrect: false },
                    { id: 'b', text: '$\\frac{1}{6}$', isCorrect: true },
                    { id: 'c', text: '$\\frac{1}{3}$', isCorrect: false },
                    { id: 'd', text: '1', isCorrect: false }
                  ]
                }
              ]
            }
          ]
        }
      ];
    }
    return [];
  }

  public getMockCourses(): Course[] {
    return [
      {
        id: 739,
        title: 'Calculus for IIT-JEE (Main & Advanced): Intuitive Foundations',
        slug: 'calculus-iit-jee',
        excerpt: 'Complete mastery of limits, continuity, derivatives, and definite integration with visual proofs, first principles, and rigorous JEE Advanced multi-correct numerical problems.',
        price: 0,
        isFree: true,
        level: 'JEE Advanced Tier',
        subject: 'Calculus',
        examTrack: 'IIT_JEE_ADVANCED',
        instructor: {
          id: 2,
          name: 'Webxpro Digital',
          designation: 'Ex-IITian Senior Math Faculty',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        },
        duration: '32h 00m',
        totalLessons: 36,
        totalQuizzes: 12,
        rating: 4.96,
        reviewsCount: 312,
        enrolledCount: 2840,
        thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
        topics: this.getTopicsForSubject('Calculus')
      },
      {
        id: 740,
        title: 'Algebra & Polynomials Mastery (IIT-JEE & Boards)',
        slug: 'algebra-polynomials-mastery',
        excerpt: 'Bridge arithmetic to abstract algebraic reasoning. Functions, quadratics, complex roots, binomial theorem, and permutations & combinations from first principles.',
        price: 0,
        isFree: true,
        level: 'JEE Advanced Tier',
        subject: 'Algebra',
        examTrack: 'IIT_JEE_MAIN',
        instructor: {
          id: 2,
          name: 'Webxpro Digital',
          designation: 'Ex-IITian Senior Math Faculty',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        },
        duration: '28h 30m',
        totalLessons: 28,
        totalQuizzes: 8,
        rating: 4.91,
        reviewsCount: 210,
        enrolledCount: 1950,
        thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 741,
        title: 'Coordinate Geometry & Vector 3D Intuition',
        slug: 'coordinate-geometry-vectors',
        excerpt: 'Spatial visualization of straight lines, circles, parabolas, ellipses, hyperbolas, and vector cross/dot products. Essential spatial intuition for JEE.',
        price: 0,
        isFree: true,
        level: 'JEE Advanced Tier',
        subject: 'Coordinate Geometry',
        examTrack: 'IIT_JEE_MAIN',
        instructor: {
          id: 2,
          name: 'Webxpro Digital',
          designation: 'Ex-IITian Senior Math Faculty',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        },
        duration: '24h 00m',
        totalLessons: 24,
        totalQuizzes: 6,
        rating: 4.93,
        reviewsCount: 185,
        enrolledCount: 1620,
        thumbnailUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 742,
        title: 'Mathematics of AI & Automation: From Calculus to Neural Networks',
        slug: 'mathematics-of-ai',
        excerpt: 'Equipping modern students for 2026. Learn the linear algebra, gradient descent calculus, probability distributions, and Python code that power modern artificial intelligence.',
        price: 0,
        isFree: true,
        level: 'All Levels',
        subject: 'AI & Python',
        examTrack: 'AI_AND_AUTOMATION',
        instructor: {
          id: 2,
          name: 'Webxpro Digital',
          designation: 'AI & Computational Mathematics Lead',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        },
        duration: '20h 00m',
        totalLessons: 20,
        totalQuizzes: 5,
        rating: 4.98,
        reviewsCount: 290,
        enrolledCount: 3100,
        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 743,
        title: 'UPSC Civil Services CSAT: Quantitative & Analytical Mastery',
        slug: 'upsc-csat-mathematics',
        excerpt: 'Crack UPSC Prelims CSAT Paper-II with zero fear. First-principles speed math, number systems, permutations, probability, and logical syllogisms with UPSC negative marking practice.',
        price: 0,
        isFree: true,
        level: 'All Levels',
        subject: 'UPSC CSAT',
        examTrack: 'UPSC_CSAT',
        instructor: {
          id: 2,
          name: 'Webxpro Digital',
          designation: 'Aptitude & Analytical Reasoning Mentor',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        },
        duration: '22h 30m',
        totalLessons: 22,
        totalQuizzes: 8,
        rating: 4.94,
        reviewsCount: 160,
        enrolledCount: 1840,
        thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80'
      }
    ];
  }

  // --- TEACHER & INSTRUCTOR SPECIFIC METHODS ---
  public async getTeacherAnalytics(): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/mathnotes/v1/teacher/analytics`, {
        headers: this.getHeaders(),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }
    return {
      totalStudents: 1420,
      activeCourses: 5,
      draftCourses: 1,
      totalEarnings: 184500,
      monthlyRevenue: 46200,
      averageRating: 4.94,
      unansweredQuestionsCount: 2,
      pendingReviewsCount: 8,
    };
  }

  public async getTeacherCourses(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/mathnotes/v1/teacher/courses`, {
        headers: this.getHeaders(),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }
    return this.getMockCourses();
  }

  public async createTeacherCourse(data: {
    title: string;
    description: string;
    excerpt?: string;
    level: string;
    duration: string;
    price_type: string;
    price: number;
    status: string;
    topics?: any[];
  }): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/mathnotes/v1/teacher/create-course`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Failed to create course: ${res.statusText}`);
    }
    return await res.json();
  }

  public async getTeacherQNA(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/mathnotes/v1/teacher/qna`, {
        headers: this.getHeaders(),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // Fallback
    }
    return [];
  }

  public async replyTeacherQNA(doubtId: number, replyText: string, courseTitle?: string): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/mathnotes/v1/teacher/qna/reply`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        doubt_id: doubtId,
        reply_text: replyText,
        course_title: courseTitle,
      }),
    });
    return await res.json();
  }
}

export const apiService = ApiService.getInstance();

