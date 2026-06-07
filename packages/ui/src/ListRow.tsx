import type { ComponentType } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import type { LucideProps } from 'lucide-react-native'
import { ChevronRight } from 'lucide-react-native'
import { AppText } from './AppText'
import { StatusPill, type PillTone } from './StatusPill'
import { colors, radius, spacing, typography } from '@siparix/tokens'

interface ListRowProps {
  icon?: ComponentType<LucideProps>
  iconColor?: string
  title: string
  subtitle?: string
  titleNumberOfLines?: number
  value?: string
  pill?: { label: string; tone?: PillTone }
  onPress?: () => void
  disabled?: boolean
  showChevron?: boolean
}

/**
 * iOS Settings-style list row with icon, title, subtitle, value, and chevron.
 *
 * @example
 * <ListRow icon={Search} title="Ürün seç" onPress={openPicker} />
 * <ListRow title="Cari" subtitle="Bakiye: 1.250₺" value="Seç" />
 */
export function ListRow({
  icon: Icon,
  iconColor = colors.primary,
  title,
  subtitle,
  value,
  pill,
  onPress,
  disabled,
  showChevron = Boolean(onPress),
  titleNumberOfLines = 1
}: ListRowProps) {
  const content = (
    <>
      {Icon ? (
        <View style={[s.iconWrap, { backgroundColor: colors.primarySoft }]}>
          <Icon color={iconColor} size={18} strokeWidth={2.2} />
        </View>
      ) : null}
      <View style={s.copy}>
        <AppText variant="body" numberOfLines={titleNumberOfLines === 0 ? undefined : titleNumberOfLines}>{title}</AppText>
        {subtitle ? <AppText variant="caption1" tone="muted" numberOfLines={2}>{subtitle}</AppText> : null}
      </View>
      {pill ? <StatusPill label={pill.label} tone={pill.tone ?? 'neutral'} /> : null}
      {value ? (
        <AppText variant="body" tone="muted" numberOfLines={1} style={s.value}>{value}</AppText>
      ) : null}
      {showChevron ? <ChevronRight color={colors.muted} size={17} /> : null}
    </>
  )

  if (!onPress) {
    return <View style={[s.row, disabled && s.disabled]}>{content}</View>
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [s.row, pressed && s.pressed, disabled && s.disabled]}
    >
      {content}
    </Pressable>
  )
}

const s = StyleSheet.create({
  row: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separatorLight
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center'
  },
  copy: { flex: 1, minWidth: 0, gap: spacing.xxs },
  value: { maxWidth: 120, textAlign: 'right', fontWeight: '500', fontSize: typography.subheadline },
  pressed: { backgroundColor: colors.groupedCellSelected },
  disabled: { opacity: 0.5 }
})
