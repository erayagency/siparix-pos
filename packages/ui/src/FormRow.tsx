import { Pressable, StyleSheet, TextInput, View, type KeyboardTypeOptions } from 'react-native'
import type { ReactNode } from 'react'
import { AppText } from './AppText'
import { colors, spacing, typography } from '@siparix/tokens'

interface FormInputRowProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  keyboardType?: KeyboardTypeOptions
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  multiline?: boolean
  accessory?: ReactNode
}

/**
 * Labeled form input row, iOS Settings style.
 *
 * @example
 * <FormInputRow label="Ürün adı" value={name} onChangeText={setName} placeholder="Tişört" />
 */
export function FormInputRow({ label, value, onChangeText, placeholder, keyboardType, autoCapitalize, multiline, accessory }: FormInputRowProps) {
  return (
    <View style={s.row}>
      <View style={s.copy}>
        <AppText variant="caption1" tone="muted">{label}</AppText>
        <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.muted} keyboardType={keyboardType} autoCapitalize={autoCapitalize} multiline={multiline} accessibilityLabel={label} returnKeyType="done" style={[s.input, multiline && s.inputMultiline]} />
      </View>
      {accessory}
    </View>
  )
}

const s = StyleSheet.create({
  row: { minHeight: 50, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.gutter, paddingVertical: spacing.sm, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.separatorLight },
  copy: { flex: 1, minWidth: 0, gap: spacing.xxs },
  input: { color: colors.ink, fontSize: typography.subheadline, fontWeight: '500' as const, paddingVertical: 0, minHeight: 22 },
  inputMultiline: { minHeight: 56, textAlignVertical: 'top' as const }
})
