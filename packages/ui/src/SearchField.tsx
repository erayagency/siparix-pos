import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { Search, X } from 'lucide-react-native'
import { colors, radius, spacing, typography } from '@siparix/tokens'

interface SearchFieldProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  autoFocus?: boolean
  onSubmitEditing?: () => void
}

/**
 * iOS-style search input field with clear button.
 *
 * @example
 * <SearchField value={query} onChangeText={setQuery} placeholder="Ürün ara..." />
 */
export function SearchField({
  value,
  onChangeText,
  placeholder = 'Ara...',
  autoFocus,
  onSubmitEditing
}: SearchFieldProps) {
  return (
    <View style={s.root}>
      <Search color={colors.muted} size={18} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={autoFocus}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        accessibilityLabel={placeholder}
        returnKeyType="search"
        onSubmitEditing={onSubmitEditing}
        style={s.input}
      />
      {value.length > 0 ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Temizle" onPress={() => onChangeText('')} hitSlop={6} style={s.clear}>
          <X color={colors.muted} size={16} />
        </Pressable>
      ) : null}
    </View>
  )
}

const s = StyleSheet.create({
  root: {
    minHeight: 40,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  input: {
    flex: 1,
    minHeight: 38,
    color: colors.ink,
    fontSize: typography.subheadline,
    fontWeight: '500' as const
  },
  clear: { padding: spacing.xs }
})
