import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { BookOpen, Sparkles, Award, ArrowRight, Star, Clock, Compass } from 'lucide-react-native';
import { ApiService } from '../shared/services/apiService';
import { Course } from '../shared/types';
import { AuroraBackground, GlassCard, LiquidGlassTokens } from '../shared/components/glass';

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const api = ApiService.getInstance();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await api.getCourses();
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <AuroraBackground variant="student">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Liquid Glass Hero Banner */}
        <GlassCard
          glowColor={LiquidGlassTokens.colors.accentCyan}
          glowPosition="top-right"
          style={styles.heroGlass}
        >
          <View style={styles.badgeRow}>
            <View style={styles.glassBadge}>
              <Sparkles color="#38BDF8" size={12} />
              <Text style={styles.badgeText}>CONCEPTUAL RIGOR • IIT-JEE 2026</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>Learn. Practice. Understand. Achieve.</Text>
          <Text style={styles.heroSubtitle}>
            Master STEM (Physics, Chemistry & Math) from Class 8th to 12th, JEE & NEET from first principles. Visual derivations, deliberate practice, and 24/7 AI mentoring.
          </Text>
          <TouchableOpacity
            style={styles.heroCTA}
            onPress={() => navigation.navigate('MathNotesAI')}
            activeOpacity={0.85}
          >
            <Sparkles color="#FFFFFF" size={18} />
            <Text style={styles.heroCTAText}>Ask MathNotes AI Mentor</Text>
          </TouchableOpacity>
        </GlassCard>

        {/* 4 Pillars Highlight */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The 4-Pillar Pedagogical System</Text>
          <View style={styles.pillarsGrid}>
            <GlassCard
              style={styles.pillarCard}
              glowColor="rgba(56, 189, 248, 0.2)"
              contentStyle={styles.pillarContent}
            >
              <Text style={styles.pillarNumber}>01</Text>
              <Text style={styles.pillarName}>Learn</Text>
              <Text style={styles.pillarDesc}>Visual intuition before mechanical equations</Text>
            </GlassCard>

            <GlassCard
              style={styles.pillarCard}
              glowColor="rgba(139, 92, 246, 0.2)"
              contentStyle={styles.pillarContent}
            >
              <Text style={styles.pillarNumber}>02</Text>
              <Text style={styles.pillarName}>Practice</Text>
              <Text style={styles.pillarDesc}>Deliberate, multi-variation problem solving</Text>
            </GlassCard>

            <GlassCard
              style={styles.pillarCard}
              glowColor="rgba(16, 185, 129, 0.2)"
              contentStyle={styles.pillarContent}
            >
              <Text style={styles.pillarNumber}>03</Text>
              <Text style={styles.pillarName}>Understand</Text>
              <Text style={styles.pillarDesc}>Feynman explanations & error analysis</Text>
            </GlassCard>

            <GlassCard
              style={styles.pillarCard}
              glowColor="rgba(244, 63, 94, 0.2)"
              contentStyle={styles.pillarContent}
            >
              <Text style={styles.pillarNumber}>04</Text>
              <Text style={styles.pillarName}>Achieve</Text>
              <Text style={styles.pillarDesc}>Exam resilience & analytical thinking</Text>
            </GlassCard>
          </View>
        </View>

        {/* Featured Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Courses</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Catalog')}>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#38BDF8" style={{ marginTop: 24 }} />
          ) : (
            courses.map(course => (
              <GlassCard
                key={course.id}
                onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })}
                style={styles.courseGlassCard}
                contentStyle={styles.courseGlassContent}
                glowColor={LiquidGlassTokens.colors.accentSapphire}
              >
                <Image source={{ uri: course.thumbnailUrl }} style={styles.thumbnail} />
                <View style={styles.courseContent}>
                  <View style={styles.subjectTag}>
                    <Text style={styles.subjectTagText}>{course.subject}</Text>
                  </View>
                  <Text style={styles.courseTitle} numberOfLines={2}>
                    {typeof course.title === 'object' ? (course.title as any)?.rendered : (course.title || 'STEM Course')}
                  </Text>
                  <Text style={styles.courseExcerpt} numberOfLines={2}>
                    {typeof course.excerpt === 'object' ? ((course.excerpt as any)?.rendered || '').replace(/<[^>]+>/g, '') : ((course.excerpt || '') as string).replace(/<[^>]+>/g, '')}
                  </Text>
                  <View style={styles.courseMeta}>
                    <View style={styles.metaItem}>
                      <Star color="#F59E0B" size={14} fill="#F59E0B" />
                      <Text style={styles.metaText}>{course.rating}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Clock color="#94A3B8" size={14} />
                      <Text style={styles.metaText}>{course.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <BookOpen color="#38BDF8" size={14} />
                      <Text style={styles.metaText}>{course.totalLessons} Lessons</Text>
                    </View>
                  </View>
                </View>
              </GlassCard>
            ))
          )}
        </View>
      </ScrollView>
    </AuroraBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110, // Gives space for floating glass dock
  },
  heroGlass: {
    margin: 16,
    marginTop: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  glassBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
  },
  badgeText: {
    color: '#38BDF8',
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F8FAFC',
    lineHeight: 32,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    fontSize: 13.5,
    color: '#94A3B8',
    lineHeight: 21,
    marginBottom: 18,
  },
  heroCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  heroCTAText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 26,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.2,
  },
  viewAllText: {
    color: '#38BDF8',
    fontWeight: '700',
    fontSize: 13.5,
  },
  pillarsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  pillarCard: {
    width: '48%',
  },
  pillarContent: {
    padding: 14,
  },
  pillarNumber: {
    fontSize: 11,
    fontWeight: '900',
    color: '#38BDF8',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  pillarName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  pillarDesc: {
    fontSize: 11.5,
    color: '#94A3B8',
    lineHeight: 16,
  },
  courseGlassCard: {
    marginBottom: 16,
  },
  courseGlassContent: {
    padding: 0,
  },
  thumbnail: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: LiquidGlassTokens.radius.lg - 1,
    borderTopRightRadius: LiquidGlassTokens.radius.lg - 1,
  },
  courseContent: {
    padding: 16,
  },
  subjectTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.2)',
    marginBottom: 8,
  },
  subjectTagText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  courseExcerpt: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
    marginBottom: 12,
  },
  courseMeta: {
    flexDirection: 'row',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
  },
});
