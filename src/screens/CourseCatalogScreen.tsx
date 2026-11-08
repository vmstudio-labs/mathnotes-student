import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { Search, Star, Clock, BookOpen, Globe } from 'lucide-react-native';
import { Course } from '../shared/types';
import { ApiService } from '../shared/services/apiService';
import { translations, SupportedLanguage } from '../shared/i18n/translations';

const SUBJECT_FILTERS = [
  { id: 'all', labelEn: 'All STEM', labelHi: 'à¤¸à¤­à¥€ à¤µà¤¿à¤·à¤¯' },
  { id: 'physics', labelEn: 'Physics', labelHi: 'à¤­à¥Œà¤¤à¤¿à¤• à¤µà¤¿à¤œà¥à¤žà¤¾à¤¨' },
  { id: 'chemistry', labelEn: 'Chemistry', labelHi: 'à¤°à¤¸à¤¾à¤¯à¤¨ à¤µà¤¿à¤œà¥à¤žà¤¾à¤¨' },
  { id: 'math', labelEn: 'Mathematics', labelHi: 'à¤—à¤£à¤¿à¤¤' },
  { id: 'class10', labelEn: 'Class 10th', labelHi: 'à¤•à¤•à¥à¤·à¤¾ 10 à¤¬à¥‹à¤°à¥à¤¡' },
  { id: 'class8', labelEn: 'Class 8th', labelHi: 'à¤•à¤•à¥à¤·à¤¾ 8à¤µà¥€à¤‚' },
  { id: 'jeeneet', labelEn: 'JEE & NEET', labelHi: 'à¤†à¤ˆà¤†à¤ˆà¤Ÿà¥€ à¤µ à¤¨à¥€à¤Ÿ' },
];

export const CourseCatalogScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const api = ApiService.getInstance();
  const dict = translations[lang];

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
      matchesCategory = subj.includes('physics') || title.includes('physics') || title.includes('à¤­à¥Œà¤¤à¤¿à¤•') || title.includes('kinematics');
    } else if (selectedFilter === 'chemistry') {
      matchesCategory = subj.includes('chemistry') || title.includes('chemistry') || title.includes('à¤°à¤¸à¤¾à¤¯à¤¨') || title.includes('bonding');
    } else if (selectedFilter === 'math') {
      matchesCategory = subj.includes('calculus') || subj.includes('algebra') || subj.includes('geometry') || subj.includes('math') || title.includes('math') || title.includes('à¤—à¤£à¤¿à¤¤');
    } else if (selectedFilter === 'class10') {
      matchesCategory = subj.includes('10') || title.includes('class 10') || title.includes('à¤•à¤•à¥à¤·à¤¾ 10');
    } else if (selectedFilter === 'class8') {
      matchesCategory = subj.includes('8') || title.includes('class 8') || title.includes('à¤•à¤•à¥à¤·à¤¾ 8');
    } else if (selectedFilter === 'jeeneet') {
      matchesCategory = title.includes('jee') || title.includes('neet') || subj.includes('jee') || subj.includes('neet');
    }

    const matchesSearch = !query || title.includes(query) || excerpt.includes(query) || subj.includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Search Header & Language Switcher */}
      <View style={styles.headerRow}>
        <View style={styles.searchBarContainer}>
          <Search color="#64748B" size={18} />
          <TextInput
            style={styles.searchInput}
            placeholder={lang === 'hi' ? 'à¤…à¤§à¥à¤¯à¤¾à¤¯, à¤¸à¥‚à¤¤à¥à¤° à¤¯à¤¾ à¤µà¤¿à¤·à¤¯ à¤–à¥‹à¤œà¥‡à¤‚...' : 'Search topics, formulas, or subjects...'}
            placeholderTextColor="#64748B"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.langToggle}
          onPress={() => setLang(prev => (prev === 'en' ? 'hi' : 'en'))}
          activeOpacity={0.8}
        >
          <Globe color="#38BDF8" size={15} />
          <Text style={styles.langToggleText}>{lang === 'en' ? 'à¤¹à¤¿à¤¨à¥à¤¦à¥€' : 'EN'}</Text>
        </TouchableOpacity>
      </View>

      {/* STEM Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
      >
        {SUBJECT_FILTERS.map(filter => {
          const isSelected = selectedFilter === filter.id;
          return (
            <TouchableOpacity
              key={filter.id}
              style={[styles.filterChip, isSelected && styles.filterChipActive]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text style={[styles.filterText, isSelected && styles.filterTextActive]}>
                {lang === 'hi' ? filter.labelHi : filter.labelEn}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Course List */}
      <ScrollView contentContainerStyle={styles.courseList} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#38BDF8" style={{ marginTop: 40 }} />
        ) : filteredCourses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              {lang === 'hi' ? 'à¤•à¥‹à¤ˆ à¤ªà¤¾à¤ à¥à¤¯à¤•à¥à¤°à¤® à¤¨à¤¹à¥€à¤‚ à¤®à¤¿à¤²à¤¾' : 'No matching courses found'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {lang === 'hi' ? 'à¤­à¥Œà¤¤à¤¿à¤•à¥€, à¤°à¤¸à¤¾à¤¯à¤¨ à¤µà¤¿à¤œà¥à¤žà¤¾à¤¨ à¤¯à¤¾ à¤•à¤•à¥à¤·à¤¾ 10-12 à¤–à¥‹à¤œà¥‡à¤‚' : 'Try searching Physics, Chemistry, or Class 8-12'}
            </Text>
          </View>
        ) : (
          filteredCourses.map(course => {
            const courseTitle = getCourseTitle(course);
            const courseExcerpt = getCourseExcerpt(course);
            return (
              <TouchableOpacity
                key={course.id}
                style={styles.card}
                onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })}
                activeOpacity={0.85}
              >
                <Image source={{ uri: course.thumbnailUrl }} style={styles.thumbnail} />
                <View style={styles.cardBody}>
                  <View style={styles.badgeRow}>
                    <Text style={styles.subjectBadge}>{course.subject}</Text>
                    <Text style={styles.levelBadge}>{course.level}</Text>
                    <Text style={styles.freeBadge}>
                      {lang === 'hi' ? 'à¤®à¥à¤«à¥à¤¤ à¤…à¤§à¥à¤¯à¤¯à¤¨' : 'Free Access'}
                    </Text>
                  </View>
                  <Text style={styles.title} numberOfLines={2}>{courseTitle}</Text>
                  <Text style={styles.excerpt} numberOfLines={2}>{courseExcerpt}</Text>
                  
                  <View style={styles.footerRow}>
                    <View style={styles.metaPair}>
                      <Star color="#F59E0B" size={13} fill="#F59E0B" />
                      <Text style={styles.metaVal}>{course.rating}</Text>
                    </View>
                    <View style={styles.metaPair}>
                      <BookOpen color="#94A3B8" size={13} />
                      <Text style={styles.metaVal}>
                        {course.totalLessons} {lang === 'hi' ? 'à¤ªà¤¾à¤ ' : 'Lessons'}
                      </Text>
                    </View>
                    <View style={styles.metaPair}>
                      <Clock color="#94A3B8" size={13} />
                      <Text style={styles.metaVal}>{course.duration}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 14,
    gap: 10,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 14,
    paddingVertical: 10,
  },
  langToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  langToggleText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
  },
  filterList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  filterChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#38BDF8',
  },
  filterText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  courseList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 16,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  thumbnail: {
    width: '100%',
    height: 150,
  },
  cardBody: {
    padding: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  subjectBadge: {
    backgroundColor: '#0F172A',
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  levelBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    color: '#94A3B8',
    fontSize: 10.5,
    fontWeight: '600',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  freeBadge: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 'auto',
  },
  title: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  excerpt: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 10,
  },
  metaPair: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaVal: {
    color: '#94A3B8',
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 4,
  },
});