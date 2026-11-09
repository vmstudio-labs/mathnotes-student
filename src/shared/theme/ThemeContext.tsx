import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'dark' | 'light';

export interface ThemeColors {
  canvas: string;
  canvasElevated: string;
  glassMedium: string;
  glassBorder: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentCyan: string;
  accentSapphire: string;
  accentViolet: string;
  accentEmerald: string;
  accentAmber: string;
  accentRose: string;
  inputBg: string;
  inputBorder: string;
  pillBg: string;
  pillBorder: string;
  specularTop: string;
  specularBottom: string;
}

export const darkThemeColors: ThemeColors = {
  canvas: '#07090E',
  canvasElevated: '#0B0F19',
  glassMedium: 'rgba(15, 23, 42, 0.72)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  cardBg: '#0F172A',
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  accentCyan: '#38BDF8',
  accentSapphire: '#2563EB',
  accentViolet: '#8B5CF6',
  accentEmerald: '#10B981',
  accentAmber: '#F59E0B',
  accentRose: '#F43F5E',
  inputBg: '#1E293B',
  inputBorder: '#334155',
  pillBg: '#1E293B',
  pillBorder: '#334155',
  specularTop: 'rgba(255, 255, 255, 0.22)',
  specularBottom: 'rgba(255, 255, 255, 0.02)',
};

export const lightThemeColors: ThemeColors = {
  canvas: '#F8FAFC',
  canvasElevated: '#FFFFFF',
  glassMedium: 'rgba(255, 255, 255, 0.90)',
  glassBorder: 'rgba(15, 23, 42, 0.08)',
  cardBg: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  accentCyan: '#0284C7',
  accentSapphire: '#1D4ED8',
  accentViolet: '#7C3AED',
  accentEmerald: '#059669',
  accentAmber: '#D97706',
  accentRose: '#E11D48',
  inputBg: '#F1F5F9',
  inputBorder: '#CBD5E1',
  pillBg: '#F1F5F9',
  pillBorder: '#E2E8F0',
  specularTop: 'rgba(255, 255, 255, 0.8)',
  specularBottom: 'rgba(15, 23, 42, 0.04)',
};

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  isDark: true,
  toggleTheme: () => {},
  setMode: () => {},
  colors: darkThemeColors,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>('dark');

  const toggleTheme = () => {
    setModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const isDark = mode === 'dark';
  const colors = isDark ? darkThemeColors : lightThemeColors;

  return (
    <ThemeContext.Provider value={{ mode, isDark, toggleTheme, setMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
