import type { ReactNode } from 'react'
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { X } from 'lucide-react-native'
import { AppText } from './AppText'
import { colors, radius, shadow, spacing } from '@siparix/tokens'

interface BottomActionSheetProps {
  open: boolean
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
  onClose: () => void
}

/**
 * iOS-style bottom sheet modal.
 *
 * @example
 * <BottomActionSheet open={visible} title="Ürün seç" onClose={() => setVisible(false)}>
 *   {children}
 * </BottomActionSheet>
 */
export function BottomActionSheet({ open, title, subtitle, children, footer, onClose }: BottomActionSheetProps) {
  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={onClose}>
      <View style={s.backdrop}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.flex}>
          <Pressable accessibilityLabel="Kapat" accessibilityRole="button" style={s.backdropHit} onPress={onClose} />
          <View style={s.sheet}>
            <View style={s.handle} />
            <View style={s.header}>
              <View style={s.headerCopy}>
                <AppText variant="title3" numberOfLines={1}>{title}</AppText>
                {subtitle ? <AppText variant="footnote" tone="muted" numberOfLines={2}>{subtitle}</AppText> : null}
              </View>
              <Pressable accessibilityRole="button" accessibilityLabel="Kapat" onPress={onClose} style={s.closeButton} hitSlop={10}>
                <X color={colors.ink} size={20} strokeWidth={2.4} />
              </Pressable>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
              {children}
            </ScrollView>
            {footer ? <View style={s.footer}>{footer}</View> : null}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
}

const s = StyleSheet.create({
  flex: { flex: 1, justifyContent: 'flex-end' as const },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.28)' },
  backdropHit: { ...StyleSheet.absoluteFillObject },
  sheet: { maxHeight: '88%', minHeight: 220, borderTopLeftRadius: radius.xxl, borderTopRightRadius: radius.xxl, backgroundColor: colors.background, paddingTop: spacing.sm, ...shadow.elevated },
  handle: { alignSelf: 'center' as const, width: 42, height: 5, borderRadius: radius.pill, backgroundColor: colors.separator, marginBottom: spacing.md },
  header: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: spacing.md, paddingHorizontal: spacing.gutter, paddingBottom: spacing.md },
  headerCopy: { flex: 1, minWidth: 0, gap: spacing.xxs },
  closeButton: { width: 36, height: 36, alignItems: 'center' as const, justifyContent: 'center' as const, borderRadius: radius.full, backgroundColor: colors.secondarySystemFill },
  content: { gap: spacing.md, paddingHorizontal: spacing.gutter, paddingBottom: spacing.lg },
  footer: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.separatorLight, paddingHorizontal: spacing.gutter, paddingTop: spacing.md, paddingBottom: spacing.lg, backgroundColor: colors.surface }
})
