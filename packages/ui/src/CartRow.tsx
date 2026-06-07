import { Pressable, StyleSheet, View } from 'react-native'
import { Minus, Plus, Trash2 } from 'lucide-react-native'
import { AppText } from './AppText'
import { colors, spacing } from '@siparix/tokens'

interface CartRowProps {
  name: string
  subtitle?: string
  quantity: number
  unitPrice: number
  onIncrement: () => void
  onDecrement: () => void
  onRemove: () => void
}

/**
 * Cart line item with quantity stepper, price display, and remove button.
 *
 * @example
 * <CartRow name="Tişört" subtitle="Siyah / M" quantity={2} unitPrice={249} onIncrement onDecrement onRemove />
 */
export function CartRow({ name, subtitle, quantity, unitPrice, onIncrement, onDecrement, onRemove }: CartRowProps) {
  const total = unitPrice * quantity

  return (
    <View style={s.row}>
      <View style={s.main}>
        <AppText variant="body" numberOfLines={1}>{name}</AppText>
        {subtitle ? <AppText variant="caption1" tone="muted" numberOfLines={1}>{subtitle}</AppText> : null}
        <View style={s.stepper}>
          <Pressable onPress={onDecrement} style={s.btn} accessibilityRole="button" accessibilityLabel="Azalt">
            <Minus color={colors.ink} size={12} />
          </Pressable>
          <AppText variant="body">{quantity}</AppText>
          <Pressable onPress={onIncrement} style={s.btn} accessibilityRole="button" accessibilityLabel="Arttır">
            <Plus color={colors.ink} size={12} />
          </Pressable>
          <Pressable onPress={onRemove} style={s.remove} accessibilityRole="button" accessibilityLabel="Kaldır">
            <Trash2 color={colors.danger} size={12} />
          </Pressable>
        </View>
      </View>
      <View style={s.right}>
        <AppText variant="body" style={s.total}>{total.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</AppText>
        <AppText variant="caption2" tone="muted">{unitPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</AppText>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  row: { minHeight: 60, flexDirection: 'row' as const, alignItems: 'center' as const, padding: spacing.sm, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.separatorLight },
  main: { flex: 1, minWidth: 0, gap: 2 },
  stepper: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: spacing.xs, marginTop: 2 },
  btn: { width: 28, height: 28, borderRadius: 6, backgroundColor: colors.surfaceAlt, alignItems: 'center' as const, justifyContent: 'center' as const },
  remove: { width: 28, height: 28, borderRadius: 6, backgroundColor: colors.dangerSoft, alignItems: 'center' as const, justifyContent: 'center' as const, marginLeft: spacing.xs },
  right: { alignItems: 'flex-end' as const, gap: 2 },
  total: { fontWeight: '600' as const }
})
