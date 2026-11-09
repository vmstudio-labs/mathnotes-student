import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LiquidGlassTokens } from './LiquidGlassTokens';
import { useTheme } from '../../theme/ThemeContext';

export interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  glowColor?: string;
  glowPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'center';
  borderGradientColors?: [string, string, ...string[]];
  onPress?: () => void;
  activeOpacity?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  contentStyle,
  glowColor,
  glowPosition = 'top-right',
  borderGradientColors,
  onPress,
  activeOpacity = 0.85,
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

  const borderColors: [string, string, ...string[]] = borderGradientColors || [
    glowColor
      ? `${glowColor}55`
      : isDark
      ? LiquidGlassTokens.colors.specularTop
      : 'rgba(255, 255, 255, 0.95)',
    isDark ? LiquidGlassTokens.colors.specularMid : 'rgba(226, 232, 240, 0.8)',
    isDark ? LiquidGlassTokens.colors.specularBottom : 'rgba(203, 213, 225, 0.5)',
  ];

  const glassBg = isDark ? LiquidGlassTokens.colors.glassMedium : 'rgba(255, 255, 255, 0.92)';

  const renderContent = () => (
    <LinearGradient
      colors={borderColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.specularBorder, isDark ? styles.shadowDark : styles.shadowLight, style]}
    >
      <View style={[styles.glassCore, { backgroundColor: glassBg }, contentStyle]}>
        {glowColor && (
          <View
            style={[
              styles.ambientGlow,
              glowPosition === 'top-right' && styles.glowTopRight,
              glowPosition === 'top-left' && styles.glowTopLeft,
              glowPosition === 'bottom-right' && styles.glowBottomRight,
              glowPosition === 'center' && styles.glowCenter,
              { backgroundColor: glowColor },
            ]}
          />
        )}
        {children}
      </View>
    </LinearGradient>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={activeOpacity}
        style={styles.touchableWrapper}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return renderContent();
};

const styles = StyleSheet.create({
  touchableWrapper: {
    borderRadius: LiquidGlassTokens.radius.lg,
  },
  specularBorder: {
    padding: 1.2,
    borderRadius: LiquidGlassTokens.radius.lg,
  },
  shadowDark: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 10,
  },
  shadowLight: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  glassCore: {
    borderRadius: LiquidGlassTokens.radius.lg - 1,
    padding: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  ambientGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    opacity: 0.16,
    transform: [{ scale: 1.4 }],
  },
  glowTopRight: {
    top: -50,
    right: -50,
  },
  glowTopLeft: {
    top: -50,
    left: -50,
  },
  glowBottomRight: {
    bottom: -50,
    right: -50,
  },
  glowCenter: {
    top: '25%',
    left: '25%',
  },
});
