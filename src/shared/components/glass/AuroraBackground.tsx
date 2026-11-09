import React from 'react';
import { View, StyleSheet, Dimensions, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LiquidGlassTokens } from './LiquidGlassTokens';
import { useTheme } from '../../theme/ThemeContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'student' | 'teacher' | 'neutral';
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  style,
  variant = 'student',
}) => {
  let isDark = true;
  try {
    const theme = useTheme();
    if (theme && typeof theme.isDark === 'boolean') {
      isDark = theme.isDark;
    }
  } catch (e) {
    // fallback to dark
  }

  const isStudent = variant === 'student';
  const isTeacher = variant === 'teacher';

  const canvasBg = isDark ? '#07090E' : '#F8FAFC';

  return (
    <View style={[styles.container, { backgroundColor: canvasBg }, style]}>
      {/* Base Canvas */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        {/* Top-Right Ambient Orb */}
        <LinearGradient
          colors={
            isDark
              ? isStudent
                ? ['rgba(56, 189, 248, 0.18)', 'rgba(37, 99, 235, 0.08)', 'transparent']
                : isTeacher
                ? ['rgba(139, 92, 246, 0.20)', 'rgba(236, 72, 153, 0.08)', 'transparent']
                : ['rgba(255, 255, 255, 0.08)', 'transparent']
              : isStudent
              ? ['rgba(56, 189, 248, 0.14)', 'rgba(147, 197, 253, 0.08)', 'transparent']
              : isTeacher
              ? ['rgba(196, 181, 253, 0.16)', 'rgba(251, 207, 232, 0.08)', 'transparent']
              : ['rgba(241, 245, 249, 0.50)', 'transparent']
          }
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.orbTopRight}
        />

        {/* Bottom-Left Ambient Orb */}
        <LinearGradient
          colors={
            isDark
              ? isStudent
                ? ['rgba(37, 99, 235, 0.14)', 'rgba(79, 70, 229, 0.06)', 'transparent']
                : isTeacher
                ? ['rgba(16, 185, 129, 0.14)', 'rgba(56, 189, 248, 0.06)', 'transparent']
                : ['rgba(255, 255, 255, 0.04)', 'transparent']
              : isStudent
              ? ['rgba(191, 219, 254, 0.12)', 'rgba(199, 210, 254, 0.06)', 'transparent']
              : isTeacher
              ? ['rgba(167, 243, 208, 0.12)', 'rgba(186, 230, 253, 0.06)', 'transparent']
              : ['rgba(241, 245, 249, 0.30)', 'transparent']
          }
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.orbBottomLeft}
        />

        {/* Center Subtle Sheen */}
        <LinearGradient
          colors={
            isDark
              ? ['transparent', 'rgba(15, 23, 42, 0.40)', 'transparent']
              : ['transparent', 'rgba(255, 255, 255, 0.50)', 'transparent']
          }
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  orbTopRight: {
    position: 'absolute',
    top: -SCREEN_HEIGHT * 0.1,
    right: -SCREEN_WIDTH * 0.2,
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.45,
    borderRadius: (SCREEN_WIDTH * 0.85) / 2,
    opacity: 0.85,
  },
  orbBottomLeft: {
    position: 'absolute',
    bottom: -SCREEN_HEIGHT * 0.08,
    left: -SCREEN_WIDTH * 0.2,
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.45,
    borderRadius: (SCREEN_WIDTH * 0.85) / 2,
    opacity: 0.85,
  },
});
