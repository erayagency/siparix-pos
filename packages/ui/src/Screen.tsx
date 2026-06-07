import type { PropsWithChildren, ReactElement } from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, View, type RefreshControlProps, type ViewStyle } from 'react-native'
import { colors, spacing } from '@siparix/tokens'

interface ScreenProps {
  scroll?: boolean
  style?: ViewStyle
  contentStyle?: ViewStyle
  refreshControl?: ReactElement<RefreshControlProps>
}

/**
 * Main screen layout wrapper with safe area, optional scroll, and keyboard avoidance.
 *
 * @example
 * <Screen scroll>
 *   <AppText variant="largeTitle">Satış</AppText>
 * </Screen>
 */
export function Screen({ children, scroll = false, style, contentStyle, refreshControl }: PropsWithChildren<ScreenProps>) {
  const content = scroll ? (
    <SafeAreaView style={[s.safeArea, style]}>
      <ScrollView refreshControl={refreshControl} contentInsetAdjustmentBehavior="automatic" keyboardDismissMode="on-drag" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={[s.scrollContent, contentStyle]}>
        {children}
      </ScrollView>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={[s.safeArea, style]}>
      <View style={[s.content, contentStyle]}>{children}</View>
    </SafeAreaView>
  )

  return (
    <KeyboardAvoidingView style={s.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {content}
    </KeyboardAvoidingView>
  )
}

const s = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingHorizontal: spacing.gutter },
  scrollContent: { paddingHorizontal: spacing.gutter, paddingBottom: 168 }
})
