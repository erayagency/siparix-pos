import type { PropsWithChildren } from 'react'
import { StyleSheet, Text, type TextProps } from 'react-native'
import { colors, typography } from '@siparix/tokens'

/**
 * Apple HIG typography variants.
 *
 * @example
 * <AppText variant="largeTitle">Satış</AppText>
 * <AppText variant="body" tone="muted">Sepet boş</AppText>
 */
export type TextVariant =
  | 'largeTitle'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'headline'
  | 'body'
  | 'callout'
  | 'subheadline'
  | 'footnote'
  | 'caption1'
  | 'caption2'

export type TextTone = 'primary' | 'muted' | 'subtle' | 'inverse' | 'danger' | 'success' | 'accent' | 'info'

interface AppTextProps extends TextProps {
  variant?: TextVariant
  tone?: TextTone
}

export function AppText({
  children,
  variant = 'body',
  tone = 'primary',
  style,
  ...props
}: PropsWithChildren<AppTextProps>) {
  return (
    <Text {...props} style={[s.base, vs[variant], ts[tone], style]}>
      {children}
    </Text>
  )
}

const s = StyleSheet.create({
  base: { color: colors.ink }
})

const vs = StyleSheet.create({
  largeTitle: { fontSize: typography.largeTitle, lineHeight: 41, fontWeight: '700' as const, letterSpacing: 0 },
  title1: { fontSize: typography.title1, lineHeight: 34, fontWeight: '700' as const, letterSpacing: 0 },
  title2: { fontSize: typography.title2, lineHeight: 28, fontWeight: '700' as const, letterSpacing: 0 },
  title3: { fontSize: typography.title3, lineHeight: 25, fontWeight: '600' as const, letterSpacing: 0 },
  headline: { fontSize: typography.headline, lineHeight: 22, fontWeight: '600' as const, letterSpacing: 0 },
  body: { fontSize: typography.body, lineHeight: 22, fontWeight: '400' as const, letterSpacing: 0 },
  callout: { fontSize: typography.callout, lineHeight: 21, fontWeight: '400' as const, letterSpacing: 0 },
  subheadline: { fontSize: typography.subheadline, lineHeight: 20, fontWeight: '400' as const, letterSpacing: 0 },
  footnote: { fontSize: typography.footnote, lineHeight: 18, fontWeight: '400' as const, letterSpacing: 0 },
  caption1: { fontSize: typography.caption1, lineHeight: 16, fontWeight: '400' as const, letterSpacing: 0 },
  caption2: { fontSize: typography.caption2, lineHeight: 13, fontWeight: '400' as const, letterSpacing: 0 },
})

const ts = StyleSheet.create({
  primary: { color: colors.ink },
  muted: { color: colors.muted },
  subtle: { color: colors.subtle },
  inverse: { color: colors.surface },
  danger: { color: colors.danger },
  success: { color: colors.success },
  accent: { color: colors.accent },
  info: { color: colors.info },
})
