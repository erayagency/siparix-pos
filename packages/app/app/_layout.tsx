import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ReceiptText, Boxes } from 'lucide-react-native'
import { colors } from '@siparix/tokens'

function TabIcon(Icon: typeof ReceiptText) {
  return function RenderIcon({ color, size }: { color: string; size: number }) {
    return <Icon color={color} size={size} strokeWidth={2.2} />
  }
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Tabs screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.subtle,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
        }}>
          <Tabs.Screen name="index" options={{ title: 'Satış', tabBarIcon: TabIcon(ReceiptText) }} />
          <Tabs.Screen name="products" options={{ title: 'Ürünler', tabBarIcon: TabIcon(Boxes) }} />
        </Tabs>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  tabBar: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 12,
    height: 72,
    paddingTop: 8,
    paddingBottom: 10,
    borderTopWidth: 0,
    borderRadius: 22,
    backgroundColor: 'rgba(249,249,249,0.94)',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  tabBarLabel: { fontSize: 11, fontWeight: '500' as const, letterSpacing: 0 }
})
