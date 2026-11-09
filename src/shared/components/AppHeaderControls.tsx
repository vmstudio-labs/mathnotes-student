import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';

export const AppHeaderControls: React.FC<{ style?: any }> = ({ style }) => {
  const { language, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {/* 1. Language Toggle */}
      <TouchableOpacity
        style={[styles.pillBtn, language === 'hi' && styles.pillBtnActive]}
        onPress={toggleLanguage}
        activeOpacity={0.8}
      >
        <Text style={styles.pillIcon}>🌐</Text>
        <Text style={[styles.pillText, language === 'hi' && styles.pillTextActive]}>
          {language === 'hi' ? 'हिन्दी' : 'EN'}
        </Text>
      </TouchableOpacity>

      {/* 2. Theme Mode Toggle */}
      <TouchableOpacity
        style={[styles.pillBtn, !isDark && styles.pillBtnLight]}
        onPress={toggleTheme}
        activeOpacity={0.8}
      >
        <Text style={styles.pillIcon}>{isDark ? '🌙' : '☀️'}</Text>
        <Text style={[styles.pillText, !isDark && styles.pillTextLight]}>
          {isDark ? 'Dark' : 'Light'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(30, 41, 59, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  pillBtnActive: {
    backgroundColor: '#4f46e5',
    borderColor: '#818cf8',
  },
  pillBtnLight: {
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
  },
  pillIcon: {
    fontSize: 12,
  },
  pillText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#e2e8f0',
  },
  pillTextActive: {
    color: '#ffffff',
  },
  pillTextLight: {
    color: '#0f172a',
  },
});
