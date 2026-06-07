import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import { useState, useCallback, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import { StatusBar } from 'expo-status-bar'
import {
  Search, Barcode, UserRound, ShoppingCart, Plus, Minus,
  Trash2, ReceiptText
} from 'lucide-react-native'
import { colors, spacing } from '@siparix/tokens'
import { AppText, StatusPill, GroupedSection, ListRow } from '@siparix/ui'

// ----------- MOCK DATA -----------

const MOCK_PRODUCTS = [
  { id: '1', name: 'Basic Pamuk Tişört', code: 'TSRT-001', color: 'Siyah', size: 'M', stock: 25, price: 249.90 },
  { id: '2', name: 'Slim Fit Gömlek', code: 'GMLK-001', color: 'Beyaz', size: 'L', stock: 18, price: 449.90 },
  { id: '3', name: 'Kot Pantolon', code: 'PNTL-001', color: 'Mavi', size: '32', stock: 12, price: 599.90 },
  { id: '4', name: 'Yün Kazak', code: 'KZK-001', color: 'Gri', size: 'M', stock: 8, price: 499.90 },
  { id: '5', name: 'Polo Tişört', code: 'PLO-001', color: 'Lacivert', size: 'XL', stock: 30, price: 329.90 },
  { id: '6', name: 'Sweatshirt', code: 'SWT-001', color: 'Siyah', size: 'L', stock: 15, price: 449.90 },
  { id: '7', name: 'Kumaş Pantolon', code: 'KMS-001', color: 'Bej', size: '34', stock: 20, price: 499.90 },
  { id: '8', name: 'Deri Ceket', code: 'DR-001', color: 'Siyah', size: 'M', stock: 5, price: 1899.90 },
]

const PAYMENT_OPTIONS = ['Nakit', 'Kart', 'Parçalı', 'Veresiye'] as const
type PaymentType = typeof PAYMENT_OPTIONS[number]

interface CartItem {
  id: string
  name: string
  color: string
  size: string
  price: number
  quantity: number
}

function money(v: number) { return v.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }) }

// ----------- MAIN SCREEN -----------

export default function SalesScreen() {
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [payment, setPayment] = useState<PaymentType>('Nakit')
  const [discount, setDiscount] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)

  const filtered = query.trim()
    ? MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.code.toLowerCase().includes(query.toLowerCase()))
    : MOCK_PRODUCTS

  const total = useMemo(() => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return subtotal - (parseFloat(discount) || 0)
  }, [cart, discount])

  const addToCart = useCallback((product: typeof MOCK_PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === `${product.id}-${product.color}-${product.size}`)
      if (existing) return prev.map(i => i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { id: `${product.id}-${product.color}-${product.size}`, name: product.name, color: product.color, size: product.size, price: product.price, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const adjustQty = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id !== id) return i
      const qty = i.quantity + delta
      return qty <= 0 ? null : { ...i, quantity: qty }
    }).filter(Boolean) as CartItem[])
  }, [])

  const clearCart = useCallback(() => { setCart([]); setSelectedCustomer(null); setDiscount(''); setPayment('Nakit') }, [])

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="dark" />
      <SafeAreaView style={{ flex: 1 }}>
        {/* HEADER */}
        <View style={{ paddingTop: spacing.lg, paddingHorizontal: spacing.gutter, marginBottom: spacing.sm, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            <AppText variant="largeTitle">Satış</AppText>
            <AppText variant="footnote" tone="muted">Beylikdüzü Mağaza</AppText>
          </View>
          <Pressable accessibilityLabel="Temizle" onPress={clearCart} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
            <ReceiptText color={colors.muted} size={16} />
          </Pressable>
        </View>

        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.gutter }}>
          {/* PRODUCT SEARCH + ENTRY */}
          <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.section }}>
            <View style={{ flex: 1, minHeight: 44, borderRadius: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.separatorLight, paddingHorizontal: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
              <Search color={colors.muted} size={17} />
              <TextInput value={query} onChangeText={setQuery} placeholder="Ürün ara veya barkod okut" placeholderTextColor={colors.muted} style={{ flex: 1, color: colors.ink, fontSize: 15, fontWeight: '500' }} />
            </View>
            <Pressable accessibilityLabel="Barkod" style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
              <Barcode color={colors.surface} size={20} />
            </Pressable>
          </View>

          {/* CUSTOMER */}
          <GroupedSection>
            <ListRow icon={UserRound} title={selectedCustomer ?? 'Cari seçilmedi'} onPress={() => setSelectedCustomer(selectedCustomer ? null : 'Ahmet Yılmaz')} />
          </GroupedSection>

          {/* CART */}
          <GroupedSection header="SEPET">
            {cart.length === 0 ? (
              <View style={{ paddingVertical: 48, alignItems: 'center', gap: spacing.sm }}>
                <ShoppingCart color={colors.muted} size={40} strokeWidth={1.5} />
                <AppText variant="body" tone="muted">Sepet boş</AppText>
                <AppText variant="caption1" tone="muted">Yukarıdan ürün seçin</AppText>
              </View>
            ) : (
              cart.map(item => (
                <View key={item.id} style={{ minHeight: 60, flexDirection: 'row', alignItems: 'center', padding: spacing.sm, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.separatorLight }}>
                  <View style={{ flex: 1, gap: 2 }}>
                    <AppText variant="body" numberOfLines={1}>{item.name}</AppText>
                    <AppText variant="caption1" tone="muted">{item.color} / {item.size}</AppText>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: 2 }}>
                      <Pressable onPress={() => adjustQty(item.id, -1)} style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' }}>
                        <Minus color={colors.ink} size={12} />
                      </Pressable>
                      <AppText variant="body">{item.quantity}</AppText>
                      <Pressable onPress={() => adjustQty(item.id, 1)} style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' }}>
                        <Plus color={colors.ink} size={12} />
                      </Pressable>
                      <Pressable onPress={() => removeItem(item.id)} style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: colors.dangerSoft, alignItems: 'center', justifyContent: 'center', marginLeft: spacing.xs }}>
                        <Trash2 color={colors.danger} size={12} />
                      </Pressable>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end', gap: 2 }}>
                    <AppText variant="body" style={{ fontWeight: '600' }}>{money(item.price * item.quantity)}</AppText>
                    <AppText variant="caption1" tone="muted">{money(item.price)}</AppText>
                  </View>
                </View>
              ))
            )}
          </GroupedSection>

          {/* PAYMENT */}
          <GroupedSection header="ÖDEME">
            <View style={{ flexDirection: 'row', paddingHorizontal: spacing.gutter, paddingVertical: spacing.sm, gap: spacing.sm }}>
              {PAYMENT_OPTIONS.map(opt => (
                <Pressable key={opt} onPress={() => setPayment(opt)} style={{ flex: 1, minHeight: 36, borderRadius: 8, backgroundColor: payment === opt ? colors.primary : colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' }}>
                  <AppText variant="caption1" tone={payment === opt ? 'inverse' : 'primary'}>{opt}</AppText>
                </Pressable>
              ))}
            </View>
            {cart.length > 0 && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.gutter, paddingBottom: spacing.sm, alignItems: 'center' }}>
                <AppText variant="footnote" tone="muted">İndirim</AppText>
                <TextInput value={discount} onChangeText={setDiscount} keyboardType="decimal-pad" placeholder="0" placeholderTextColor={colors.muted} style={{ width: 100, minHeight: 36, borderRadius: 8, borderWidth: 1, borderColor: colors.separatorLight, backgroundColor: colors.surfaceAlt, paddingHorizontal: spacing.sm, color: colors.ink, fontSize: 15, fontWeight: '600', textAlign: 'right' }} />
              </View>
            )}
          </GroupedSection>

          {/* PRODUCT LIST */}
          <GroupedSection header="ÜRÜNLER">
            {filtered.map(product => (
              <Pressable key={product.id} onPress={() => addToCart(product)} style={{ minHeight: 56, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.gutter, paddingVertical: spacing.sm, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.separatorLight }}>
                <View style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
                  <AppText variant="headline" tone="primary">{product.name.slice(0, 1)}</AppText>
                </View>
                <View style={{ flex: 1 }}>
                  <AppText variant="body" numberOfLines={1}>{product.name}</AppText>
                  <AppText variant="caption1" tone="muted">{product.code} · {product.color}/{product.size} · Stok {product.stock}</AppText>
                </View>
                <AppText variant="body" style={{ fontWeight: '600' }}>{money(product.price)}</AppText>
              </Pressable>
            ))}
            {filtered.length === 0 && (
              <View style={{ paddingVertical: 32, alignItems: 'center' }}>
                <AppText variant="body" tone="muted">Ürün bulunamadı</AppText>
              </View>
            )}
          </GroupedSection>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* STICKY CHECKOUT */}
        <BlurView intensity={90} tint="light" style={{ paddingBottom: 84 }}>
          <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: colors.separator }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.gutter, paddingVertical: spacing.sm, gap: spacing.md }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
              <ShoppingCart color={colors.primary} size={18} />
              <AppText variant="headline" style={{ fontWeight: '700' }}>{money(total)}</AppText>
            </View>
            <Pressable
              disabled={cart.length === 0}
              onPress={() => {}}
              style={{ minHeight: 44, borderRadius: 12, backgroundColor: cart.length === 0 ? colors.separatorLight : colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingHorizontal: spacing.lg, opacity: cart.length === 0 ? 0.5 : 1 }}
            >
              <AppText tone="inverse" variant="body" style={{ fontWeight: '600' }}>Satışı Tamamla</AppText>
            </Pressable>
          </View>
        </BlurView>
      </SafeAreaView>
    </View>
  )
}
