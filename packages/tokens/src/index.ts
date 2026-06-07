// iOS 18 / Apple HIG Design Tokens
// Inspired by https://developer.apple.com/design/human-interface-guidelines
//
// These tokens power the Siparix POS platform and are shared
// as a standalone library for Turkish developers building
// iOS-native mobile apps.

export const colors = {
  // iOS System Backgrounds
  background: '#F2F2F7',
  backgroundDark: '#1C1C1E',
  surface: '#FFFFFF',
  surfaceAlt: '#F2F2F7',
  surfaceRaised: '#FFFFFF',
  surfaceSecondary: '#EFEFF4',

  // iOS System Grays
  ink: '#1C1C1E',
  inkSecondary: '#2C2C2E',
  inkTertiary: '#3A3A3C',
  muted: '#8E8E93',
  mutedLight: '#AEAEB2',
  subtle: '#8E8E93',
  separator: '#C6C6C8',
  separatorLight: '#E5E5EA',
  separatorUltraLight: '#F2F2F7',
  border: '#C6C6C8',
  borderLight: '#E5E5EA',
  separatorOpaque: '#545458',

  // Apple system colors (iOS 18 palette)
  accentBlue: '#007AFF',
  accentGreen: '#34C759',
  accentOrange: '#FF9500',
  accentRed: '#FF3B30',
  accentTeal: '#5AC8FA',
  accentPurple: '#AF52DE',
  accentYellow: '#FFCC00',
  accentIndigo: '#5856D6',
  accentPink: '#FF2D55',

  // Brand (teal/cyan)
  primary: '#0A7C66',
  primaryDark: '#065F4E',
  primarySoft: '#E3F5F0',
  primaryLight: '#E8F8F5',

  // Semantic aliases (iOS style)
  accent: '#FF9500',
  accentSoft: '#FFF3E0',
  danger: '#FF3B30',
  dangerSoft: '#FFE7E4',
  success: '#34C759',
  successSoft: '#E7F7ED',
  info: '#007AFF',
  infoSoft: '#E8F1FC',

  // iOS system fill colors
  systemFill: 'rgba(120, 120, 128, 0.16)',
  secondarySystemFill: 'rgba(120, 120, 128, 0.12)',
  tertiarySystemFill: 'rgba(118, 118, 128, 0.10)',
  quaternarySystemFill: 'rgba(116, 116, 128, 0.08)',

  // iOS grouped table
  groupedBackground: '#F2F2F7',
  groupedBackgroundSecondary: '#EFEFF4',
  groupedCell: '#FFFFFF',
  groupedCellSelected: '#D1D1D6',

  // iOS toolbar / tab bar
  tabBarBackground: 'rgba(249,249,249,0.94)',
  navBarBackground: 'rgba(255,255,255,0.88)'
} as const

export const spacing = {
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  gutter: 16,
  section: 20,
  safeBottom: 34
} as const

export const radius = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  xxl: 20,
  pill: 999,
  full: 9999
} as const

// Apple HIG Typography (iOS)
export const typography = {
  largeTitle: 34,
  title1: 28,
  title2: 22,
  title3: 20,
  headline: 17,
  body: 17,
  callout: 16,
  subheadline: 15,
  footnote: 13,
  caption1: 12,
  caption2: 11
} as const

export const shadow = {
  card: {
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  soft: {
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2
  },
  elevated: {
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6
  },
  tabBar: {
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8
  }
} as const

export const animation = {
  instant: 0,
  fast: 150,
  normal: 250,
  slow: 350,
  spring: { damping: 15, stiffness: 150 }
} as const
