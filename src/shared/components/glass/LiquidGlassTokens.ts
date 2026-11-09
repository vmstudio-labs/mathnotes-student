// Liquid Glass Design System Tokens (Dark & Light Mode Support)

export const LiquidGlassTokens = {
  colors: {
    // Base Canvas (Dark)
    canvas: '#07090E',
    canvasElevated: '#0B0F19',

    // Base Canvas (Light)
    canvasLight: '#F8FAFC',
    canvasElevatedLight: '#FFFFFF',

    // Glass Translucent Acrylic Surfaces
    glassLight: 'rgba(255, 255, 255, 0.05)',
    glassMedium: 'rgba(15, 23, 42, 0.68)',
    glassDark: 'rgba(8, 12, 22, 0.82)',
    glassModal: 'rgba(11, 15, 25, 0.94)',

    // Light Mode Glass
    glassLightMode: 'rgba(255, 255, 255, 0.92)',
    glassBorderLight: 'rgba(15, 23, 42, 0.08)',

    // Specular Highlight Gradients
    specularTop: 'rgba(255, 255, 255, 0.22)',
    specularMid: 'rgba(255, 255, 255, 0.06)',
    specularBottom: 'rgba(255, 255, 255, 0.01)',

    // Neon Accents
    accentCyan: '#38BDF8',
    accentSapphire: '#2563EB',
    accentViolet: '#8B5CF6',
    accentEmerald: '#10B981',
    accentAmber: '#F59E0B',
    accentRose: '#F43F5E',

    // Text Colors
    textDarkPrimary: '#FFFFFF',
    textDarkSecondary: '#94A3B8',
    textLightPrimary: '#0F172A',
    textLightSecondary: '#475569',
  },

  radius: {
    sm: 10,
    md: 16,
    lg: 22,
    xl: 30,
    pill: 9999,
  },

  shadows: {
    glassElevated: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: 0.45,
      shadowRadius: 24,
      elevation: 10,
    },
    glassElevatedLight: {
      shadowColor: '#0f172a',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 4,
    },
    neonGlow: (color: string) => ({
      shadowColor: color,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 12,
      elevation: 6,
    }),
  },
};
