import type { ComponentType, PropsWithChildren } from 'react'
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import type { LucideProps } from 'lucide-react-native'
import { AppText } from './AppText'
import { colors, radius, spacing } from '@siparix/tokens'

interface PrimaryActionProps {
  icon?: ComponentType<LucideProps>
  label: string
  onPress: () => void
  disabled?: boolean
  loading?: boolean
}

/**
 * Apple-style solid primary action button.
 *
 * @example
 * <PrimaryAction icon={Search} label="Ürün seç" onPress={openPicker} />
 */
export function PrimaryAction({
  icon: Icon,
  label,
  onPress,
  disabled,
  loading
}: PropsWithChildren<PrimaryActionProps>) {
  const isDisabled = disabled || loading

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [s.root, pressed && s.pressed, isDisabled && s.disabled]}
    >
      {loading ? (
        <ActivityIndicator color={colors.surface} size="small" accessibilityLabel="Yükleniyor" />
      ) : Icon ? (
        <Icon color={colors.surface} size={18} strokeWidth={2.4} />
      ) : null}
      <AppText tone="inverse" variant="body" style={s.label}>{label}</AppText>
    </Pressable>
  )
}

/**
 * Apple-style outlined secondary action button.
 */
export function SecondaryAction({
  icon: Icon,
  label,
  onPress,
  disabled,
  loading
}: PropsWithChildren<PrimaryActionProps>) {
  const isDisabled = disabled || loading

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [s.secondary, pressed && s.pressed, isDisabled && s.disabled]}
    >
      {loading ? (
        <ActivityIndicator color={colors.primary} size="small" />
      ) : Icon ? (
        <Icon color={colors.primary} size={18} strokeWidth={2.4} />
      ) : null}
      <AppText tone="primary" variant="body" style={s.label}>{label}</AppText>
    </Pressable>
  )
}

const s = StyleSheet.create({
  root: {
    minHeight: 50,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg
  },
  secondary: {
    minHeight: 50,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg
  },
  label: { fontWeight: '600' as const },
  pressed: { opacity: 0.78 },
  disabled: { opacity: 0.5 }
})
