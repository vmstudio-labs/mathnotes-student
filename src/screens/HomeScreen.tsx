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
import { Sparkles, Star, Clock } from 'lucide-react-native';
import { ApiService } from '../shared/services/apiService';
import { Course } from '../shared/types';
import { AuroraBackground, GlassCard, LiquidGlassTokens } from '../shared/components/glass';
import { useLanguage } from '../shared/i18n/LanguageContext';
import { useTheme } from '../shared/theme/ThemeContext';
import { AppHeaderControls } from '../shared/components/AppHeaderControls';

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const api = ApiService.getInstance();
  const { t, isHindi } = useLanguage();
  const { isDark, colors } = useTheme();

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
        {/* Top Header Controls (Language & Theme Mode Switchers) */}
        <View style={styles.topControlRow}>
          <Text style={[styles.brandLogo, { color: colors.textPrimary }]}>
            {isHindi ? 'मैथनोट्स' : 'MathNotes'} <Text style={{ color: colors.accentCyan }}>STEM</Text>
          </Text>
          <AppHeaderControls />
        </View>

        {/* Liquid Glass Hero Banner */}
        <GlassCard
          glowColor={colors.accentCyan}
          glowPosition="top-right"
          style={styles.heroGlass}
        >
          <View style={styles.badgeRow}>
            <View style={[styles.glassBadge, { backgroundColor: isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(2, 132, 199, 0.1)' }]}>
              <Sparkles color={colors.accentCyan} size={12} />
              <Text style={[styles.badgeText, { color: colors.accentCyan }]}>
                {isHindi ? 'अवधारणात्मक दृढ़ता • आईआईटी-जेईई 2026' : 'CONCEPTUAL RIGOR • IIT-JEE 2026'}
              </Text>
            </View>
          </View>
          <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>
            {t.heroTitle}
          </Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
            {t.heroSubtitle}
          </Text>
          <TouchableOpacity
            style={[styles.heroCTA, { backgroundColor: colors.accentSapphire }]}
            onPress={() => navigation.navigate('MathNotesAI')}
            activeOpacity={0.85}
          >
            <Sparkles color="#FFFFFF" size={18} />
            <Text style={styles.heroCTAText}>{t.btnAskAI}</Text>
          </TouchableOpacity>
        </GlassCard>

        {/* 4 Pillars Highlight */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            {t.section4Pillars}
          </Text>
          <View style={styles.pillarsGrid}>
            <GlassCard
              style={styles.pillarCard}
              glowColor="rgba(56, 189, 248, 0.2)"
              contentStyle={styles.pillarContent}
            >
              <Text style={styles.pillarNumber}>01</Text>
              <Text style={[styles.pillarName, { color: colors.textPrimary }]}>{t.pillar1Title}</Text>
              <Text style={[styles.pillarDesc, { color: colors.textSecondary }]}>{t.pillar1Desc}</Text>
            </GlassCard>

            <GlassCard
              style={styles.pillarCard}
              glowColor="rgba(139, 92, 246, 0.2)"
              contentStyle={styles.pillarContent}
            >
              <Text style={styles.pillarNumber}>02</Text>
              <Text style={[styles.pillarName, { color: colors.textPrimary }]}>{t.pillar2Title}</Text>
              <Text style={[styles.pillarDesc, { color: colors.textSecondary }]}>{t.pillar2Desc}</Text>
            </GlassCard>

            <GlassCard
              style={styles.pillarCard}
              glowColor="rgba(16, 185, 129, 0.2)"
              contentStyle={styles.pillarContent}
            >
              <Text style={styles.pillarNumber}>03</Text>
              <Text style={[styles.pillarName, { color: colors.textPrimary }]}>{t.pillar3Title}</Text>
              <Text style={[styles.pillarDesc, { color: colors.textSecondary }]}>{t.pillar3Desc}</Text>
            </GlassCard>

            <GlassCard
              style={styles.pillarCard}
              glowColor="rgba(244, 63, 94, 0.2)"
              contentStyle={styles.pillarContent}
            >
              <Text style={styles.pillarNumber}>04</Text>
              <Text style={[styles.pillarName, { color: colors.textPrimary }]}>{t.pillar4Title}</Text>
              <Text style={[styles.pillarDesc, { color: colors.textSecondary }]}>{t.pillar4Desc}</Text>
            </GlassCard>
          </View>
        </View>

        {/* Featured Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              {t.featuredCourses}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Catalog')}>
              <Text style={[styles.viewAllText, { color: colors.accentCyan }]}>
                {isHindi ? 'सभी देखें →' : 'View All →'}
              </Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={colors.accentCyan} style={{ marginTop: 24 }} />
          ) : (
            courses.map(course => (
              <GlassCard
                key={course.id}
                onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })}
                style={styles.courseGlassCard}
                contentStyle={styles.courseGlassContent}
                glowColor={colors.accentSapphire}
              >
                <Image source={{ uri: course.thumbnailUrl }} style={styles.thumbnail} />
                <View style={styles.courseContent}>
                  <View style={[styles.subjectTag, { backgroundColor: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.12)' }]}>
                    <Text style={[styles.subjectTagText, { color: colors.accentCyan }]}>{course.subject}</Text>
                  </View>
                  <Text style={[styles.courseTitle, { color: colors.textPrimary }]} numberOfLines={2}>
                    {typeof course.title === 'object' ? (course.title as any)?.rendered : (course.title || 'STEM Course')}
                  </Text>
                  <Text style={[styles.courseExcerpt, { color: colors.textSecondary }]} numberOfLines={2}>
                    {typeof course.excerpt === 'object' ? ((course.excerpt as any)?.rendered || '').replace(/<[^>]+>/g, '') : ((course.excerpt || '') as string).replace(/<[^>]+>/g, '')}
                  </Text>
                  <View style={styles.courseMeta}>
                    <View style={styles.metaItem}>
                      <Star color="#F59E0B" size={14} fill="#F59E0B" />
                      <Text style={[styles.metaText, { color: colors.textSecondary }]}>{course.rating}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Clock color={colors.textSecondary} size={14} />
                      <Text style={[styles.metaText, { color: colors.textSecondary }]}>36 {isHindi ? 'घंटे' : 'Hours'}</Text>
                    </View>
                  </View>
                </View>
              </GlassCard>
            ))
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </AuroraBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  topControlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 8,
  },
  brandLogo: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  heroGlass: {
    marginBottom: 24,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  glassBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: LiquidGlassTokens.radius.pill,
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 32,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13.5,
    lineHeight: 20,
    marginBottom: 18,
  },
  heroCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: LiquidGlassTokens.radius.md,
  },
  heroCTAText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
  },
  pillarsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  pillarCard: {
    width: '48%',
  },
  pillarContent: {
    padding: 12,
  },
  pillarNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: '#38BDF8',
    marginBottom: 4,
  },
  pillarName: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  pillarDesc: {
    fontSize: 11.5,
    lineHeight: 16,
  },
  courseGlassCard: {
    marginBottom: 14,
  },
  courseGlassContent: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  thumbnail: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#1E293B',
  },
  courseContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subjectTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  subjectTagText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  courseExcerpt: {
    fontSize: 11.5,
    lineHeight: 15,
    marginTop: 2,
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
