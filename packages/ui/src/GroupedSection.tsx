import type { PropsWithChildren, ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppText } from './AppText'
import { colors, radius, spacing } from '@siparix/tokens'

interface GroupedSectionProps {
  header?: string
  footer?: string
  children: ReactNode
}

/**
 * iOS insetGrouped table view section wrapper.
 *
 * @example
 * <GroupedSection header="ÖDEME">
 *   <ListRow title="Nakit" />
 *   <ListRow title="Kart" />
 * </GroupedSection>
 */
export function GroupedSection({ header, footer, children }: PropsWithChildren<GroupedSectionProps>) {
  return (
    <View style={s.wrapper}>
      {header ? <AppText variant="footnote" tone="muted" style={s.header}>{header.toLocaleUpperCase('tr-TR')}</AppText> : null}
      <View style={s.section}>{children}</View>
      {footer ? <AppText variant="caption1" tone="muted" style={s.footer}>{footer}</AppText> : null}
    </View>
  )
}

const s = StyleSheet.create({
  wrapper: { marginBottom: spacing.section },
  header: { paddingHorizontal: spacing.gutter, paddingBottom: spacing.sm, letterSpacing: 0.4 },
  section: { borderRadius: radius.lg, backgroundColor: colors.groupedCell, overflow: 'hidden' },
  footer: { paddingHorizontal: spacing.gutter, paddingTop: spacing.sm }
})
