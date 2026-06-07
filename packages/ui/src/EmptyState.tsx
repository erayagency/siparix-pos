import type { ComponentType } from 'react'
import { StyleSheet, View } from 'react-native'
import type { LucideProps } from 'lucide-react-native'
import { AppText } from './AppText'
import { PrimaryAction } from './PrimaryAction'
import { colors, spacing } from '@siparix/tokens'

interface EmptyStateProps {
  icon?: ComponentType<LucideProps>
  iconColor?: string
  title: string
  message?: string
  actionLabel?: string
  onAction?: () => void
}

/**
 * iOS-style empty state placeholder with optional action button.
 *
 * @example
 * <EmptyState
 *   icon={ShoppingCart}
 *   title="Sepet boş"
 *   message="Ürün seç veya barkod okut"
 *   actionLabel="Ürün seç"
 *   onAction={openPicker}
 * />
 */
export function EmptyState({
  icon: Icon,
  iconColor = colors.muted,
  title,
  message,
  actionLabel,
  onAction
}: EmptyStateProps) {
  return (
    <View style={s.root}>
      {Icon ? (
        <View style={s.iconWrap} importantForAccessibility="no-hide-descendants">
          <Icon color={iconColor} size={40} strokeWidth={1.5} />
        </View>
      ) : null}
      <AppText variant="title3" style={s.title}>{title}</AppText>
      {message ? <AppText variant="body" tone="muted" style={s.message}>{message}</AppText> : null}
      {actionLabel && onAction ? (
        <View style={s.actionWrap}>
          <PrimaryAction label={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </View>
  )
}

const s = StyleSheet.create({
  root: { alignItems: 'center', justifyContent: 'center', padding: spacing.xxl, gap: spacing.sm },
  iconWrap: { marginBottom: spacing.md },
  title: { textAlign: 'center', color: colors.ink, fontWeight: '600' as const },
  message: { textAlign: 'center', lineHeight: 22 },
  actionWrap: { marginTop: spacing.md }
})
