import { StyleSheet, View } from 'react-native'
import { AppText } from './AppText'
import { colors, radius, spacing } from '@siparix/tokens'

export type PillTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

interface StatusPillProps {
  label: string
  tone?: PillTone
}

/**
 * iOS-style status pill badge.
 *
 * @example
 * <StatusPill label="Aktif" tone="success" />
 * <StatusPill label="3 eksik" tone="warning" />
 */
export function StatusPill({ label, tone = 'neutral' }: StatusPillProps) {
  return (
    <View style={[s.root, bg[tone]]} accessibilityLabel={`Durum: ${label}`}>
      <View style={[s.dot, dot[tone]]} importantForAccessibility="no-hide-descendants" />
      <AppText variant="caption2" tone={labelTone(tone)}>
        {label}
      </AppText>
    </View>
  )
}

function labelTone(tone: PillTone): 'primary' | 'danger' | 'success' | 'accent' | 'info' {
  if (tone === 'danger') return 'danger'
  if (tone === 'success') return 'success'
  if (tone === 'warning') return 'accent'
  if (tone === 'info') return 'info'
  return 'primary'
}

const s = StyleSheet.create({
  root: {
    alignSelf: 'flex-start',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderWidth: 1
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 999
  }
})

const bg = StyleSheet.create({
  success: { backgroundColor: colors.successSoft, borderColor: '#BFE8CD' },
  warning: { backgroundColor: colors.accentSoft, borderColor: '#F0D6A5' },
  danger: { backgroundColor: colors.dangerSoft, borderColor: '#F6BEB7' },
  info: { backgroundColor: colors.infoSoft, borderColor: '#C3DBF7' },
  neutral: { backgroundColor: colors.surfaceAlt, borderColor: colors.border }
})

const dot = StyleSheet.create({
  success: { backgroundColor: colors.success },
  warning: { backgroundColor: colors.accent },
  danger: { backgroundColor: colors.danger },
  info: { backgroundColor: colors.info },
  neutral: { backgroundColor: colors.subtle }
})
