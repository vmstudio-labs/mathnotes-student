import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Search, Star, Clock, BookOpen } from 'lucide-react-native';
import { Course } from '../shared/types';
import { ApiService } from '../shared/services/apiService';
import { useLanguage } from '../shared/i18n/LanguageContext';
import { useTheme } from '../shared/theme/ThemeContext';
import { AppHeaderControls } from '../shared/components/AppHeaderControls';
import { GlassCard, LiquidGlassTokens } from '../shared/components/glass';

export const CourseCatalogScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const api = ApiService.getInstance();
  const { t, isHindi } = useLanguage();
  const { isDark, colors } = useTheme();

  const SUBJECT_FILTERS = [
    { id: 'all', label: isHindi ? 'सभी विषय' : 'All STEM' },
    { id: 'physics', label: isHindi ? 'भौतिक विज्ञान' : 'Physics' },
    { id: 'chemistry', label: isHindi ? 'रसायन विज्ञान' : 'Chemistry' },
    { id: 'math', label: isHindi ? 'गणित' : 'Mathematics' },
    { id: 'class10', label: isHindi ? 'कक्षा 10वीं' : 'Class 10th' },
    { id: 'class8', label: isHindi ? 'कक्षा 8वीं' : 'Class 8th' },
    { id: 'jeeneet', label: isHindi ? 'आईआईटी व नीट' : 'JEE & NEET' },
  ];

  useEffect(() => {
    api.getCourses().then(data => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  const getCourseTitle = (c: Course): string => {
    if (typeof c.title === 'object' && c.title !== null) {
      return (c.title as any).rendered || 'STEM Course';
    }
    return (c.title as string) || 'STEM Course';
  };

  const getCourseExcerpt = (c: Course): string => {
    if (typeof c.excerpt === 'object' && c.excerpt !== null) {
      return ((c.excerpt as any).rendered || '').replace(/<[^>]+>/g, '').trim();
    }
    return ((c.excerpt as string) || '').replace(/<[^>]+>/g, '').trim();
  };

  const filteredCourses = courses.filter(c => {
    const title = getCourseTitle(c).toLowerCase();
    const excerpt = getCourseExcerpt(c).toLowerCase();
    const subj = (c.subject || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    // Subject Filter matching
    let matchesCategory = true;
    if (selectedFilter === 'physics') {
      matchesCategory = subj.includes('physics') || title.includes('physics') || title.includes('भौतिक') || title.includes('kinematics') || title.includes('optics');
    } else if (selectedFilter === 'chemistry') {
      matchesCategory = subj.includes('chemistry') || title.includes('chemistry') || title.includes('रसायन') || title.includes('bonding') || title.includes('equilibrium');
    } else if (selectedFilter === 'math') {
      matchesCategory = subj.includes('calculus') || subj.includes('algebra') || subj.includes('geometry') || subj.includes('math') || title.includes('math') || title.includes('गणित') || title.includes('समाकलन');
    } else if (selectedFilter === 'class10') {
      matchesCategory = subj.includes('10') || title.includes('class 10') || title.includes('कक्षा 10');
    } else if (selectedFilter === 'class8') {
      matchesCategory = subj.includes('8') || title.includes('class 8') || title.includes('कक्षा 8');
    } else if (selectedFilter === 'jeeneet') {
      matchesCategory = title.includes('jee') || title.includes('neet') || subj.includes('jee') || subj.includes('neet');
    }

    const matchesSearch = !query || title.includes(query) || excerpt.includes(query) || subj.includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.canvas }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.canvas} />
      <View style={[styles.container, { backgroundColor: colors.canvas }]}>
        {/* Top Controls Row */}
        <View style={styles.topBar}>
          <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
            {isHindi ? 'पाठ्यक्रम कैटलॉग' : 'Course Catalog'}
          </Text>
          <AppHeaderControls />
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrap}>
          <View style={[styles.searchBarContainer, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder }]}>
            <Search color={colors.textSecondary} size={18} />
            <TextInput
              style={[styles.searchInput, { color: colors.textPrimary }]}
              placeholder={t.searchPlaceholder}
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {SUBJECT_FILTERS.map(f => {
              const active = selectedFilter === f.id;
              return (
                <TouchableOpacity
                  key={f.id}
                  style={[
                    styles.filterPill,
                    { backgroundColor: active ? colors.accentSapphire : colors.pillBg, borderColor: active ? colors.accentSapphire : colors.pillBorder }
                  ]}
                  onPress={() => setSelectedFilter(f.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.filterText, { color: active ? '#FFFFFF' : colors.textSecondary, fontWeight: active ? '800' : '600' }]}>
                    {f.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Courses Feed */}
        <ScrollView contentContainerStyle={styles.catalogScroll} showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.accentCyan} style={{ marginTop: 40 }} />
          ) : filteredCourses.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
                {isHindi ? 'कोई पाठ्यक्रम नहीं मिला' : 'No courses found'}
              </Text>
              <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
                {isHindi ? 'कृपया अन्य विषय या कीवर्ड खोजें।' : 'Try selecting another STEM subject filter.'}
              </Text>
            </View>
          ) : (
            filteredCourses.map(course => (
              <GlassCard
                key={course.id}
                onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })}
                style={styles.courseCard}
                contentStyle={styles.courseCardContent}
                glowColor={colors.accentCyan}
              >
                <Image source={{ uri: course.thumbnailUrl }} style={styles.courseThumb} />
                <View style={styles.courseInfo}>
                  <View style={[styles.badgePill, { backgroundColor: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.12)' }]}>
                    <Text style={[styles.badgePillText, { color: colors.accentCyan }]}>{course.subject}</Text>
                  </View>
                  <Text style={[styles.courseHeading, { color: colors.textPrimary }]} numberOfLines={2}>
                    {getCourseTitle(course)}
                  </Text>
                  <Text style={[styles.courseDesc, { color: colors.textSecondary }]} numberOfLines={2}>
                    {getCourseExcerpt(course)}
                  </Text>
                  <View style={styles.courseStats}>
                    <View style={styles.statItem}>
                      <Star color="#F59E0B" size={13} fill="#F59E0B" />
                      <Text style={[styles.statText, { color: colors.textSecondary }]}>{course.rating}</Text>
                    </View>
                    <View style={styles.statItem}>
                      <BookOpen color={colors.textSecondary} size={13} />
                      <Text style={[styles.statText, { color: colors.textSecondary }]}>24 {isHindi ? 'पाठ' : 'Lessons'}</Text>
                    </View>
                  </View>
                </View>
              </GlassCard>
            ))
          )}
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0,
  },
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  searchWrap: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  filterSection: {
    marginBottom: 14,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 12,
  },
  catalogScroll: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  courseCard: {
    marginBottom: 14,
  },
  courseCardContent: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  courseThumb: {
    width: 85,
    height: 85,
    borderRadius: 12,
    backgroundColor: '#1E293B',
  },
  courseInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  badgePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  badgePillText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  courseHeading: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  courseDesc: {
    fontSize: 11.5,
    lineHeight: 15,
    marginTop: 2,
  },
  courseStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 6,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    textAlign: 'center',
  },
});
