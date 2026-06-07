import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { useState, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Search, Barcode, Boxes, PackageCheck, CircleAlert } from 'lucide-react-native'
import { colors, spacing } from '@siparix/tokens'
import { AppText, GroupedSection, ListRow, SearchField, EmptyState, StatusPill } from '@siparix/ui'

const MOCK_PRODUCTS = [
  { code: 'TSRT-001', name: 'Basic Pamuk Tişört', category: 'Tişört', brand: 'Maviona', stock: 45, minStock: 10, price: 249.90 },
  { code: 'GMLK-001', name: 'Slim Fit Gömlek', category: 'Gömlek', brand: 'Maviona', stock: 18, minStock: 5, price: 449.90 },
  { code: 'PNTL-001', name: 'Kot Pantolon', category: 'Pantolon', brand: 'Maviona', stock: 12, minStock: 8, price: 599.90 },
  { code: 'CKT-001', name: 'Keten Ceket', category: 'Ceket', brand: 'Maviona', stock: 22, minStock: 5, price: 899.90 },
  { code: 'KZK-001', name: 'Yün Kazak', category: 'Kazak', brand: 'Maviona', stock: 8, minStock: 5, price: 499.90 },
  { code: 'SRT-001', name: 'Şort Bermuda', category: 'Şort', brand: 'Maviona', stock: 35, minStock: 10, price: 349.90 },
  { code: 'PLO-001', name: 'Polo Yaka Tişört', category: 'Tişört', brand: 'Maviona', stock: 30, minStock: 10, price: 329.90 },
  { code: 'SWT-001', name: 'Sweatshirt Kapüşonlu', category: 'Sweatshirt', brand: 'Maviona', stock: 15, minStock: 5, price: 449.90 },
  { code: 'TKM-001', name: 'Takım Elbise', category: 'Takım', brand: 'Maviona', stock: 6, minStock: 3, price: 2499.90 },
  { code: 'KMS-001', name: 'Kumaş Pantolon', category: 'Pantolon', brand: 'Maviona', stock: 20, minStock: 8, price: 499.90 },
  { code: 'DR-001', name: 'Deri Ceket', category: 'Ceket', brand: 'Maviona', stock: 5, minStock: 3, price: 1899.90 },
  { code: 'ESF-001', name: 'Eşofman Altı', category: 'Eşofman', brand: 'Maviona', stock: 42, minStock: 10, price: 299.90 },
  { code: 'HRK-001', name: 'Triko Hırka', category: 'Hırka', brand: 'Maviona', stock: 11, minStock: 5, price: 399.90 },
  { code: 'ISG-001', name: 'İş Gömleği', category: 'Gömlek', brand: 'Maviona', stock: 28, minStock: 10, price: 349.90 },
  { code: 'BLZ-001', name: 'Blazer Ceket', category: 'Ceket', brand: 'Maviona', stock: 7, minStock: 3, price: 1199.90 },
  { code: 'ELB-001', name: 'Viskon Elbise', category: 'Elbise', brand: 'Maviona', stock: 14, minStock: 5, price: 449.90 },
  { code: 'AYK-001', name: 'Spor Ayakkabı', category: 'Ayakkabı', brand: 'Maviona', stock: 33, minStock: 8, price: 799.90 },
  { code: 'KLS-001', name: 'Klasik Ayakkabı', category: 'Ayakkabı', brand: 'Maviona', stock: 9, minStock: 5, price: 899.90 },
  { code: 'MNT-001', name: 'Mont', category: 'Mont', brand: 'Maviona', stock: 16, minStock: 5, price: 1499.90 },
  { code: 'YLK-001', name: 'Yelek', category: 'Yelek', brand: 'Maviona', stock: 24, minStock: 8, price: 279.90 },
]

function money(v: number) { return v.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }) }

function stockTone(s: number, min: number): 'success' | 'warning' | 'danger' {
  if (s <= 0) return 'danger' as const
  if (s <= min) return 'warning' as const
  return 'success' as const
}

export default function ProductsScreen() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return MOCK_PRODUCTS
    const q = query.toLowerCase()
    return MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q))
  }, [query])

  const stats = useMemo(() => ({
    total: MOCK_PRODUCTS.length,
    low: MOCK_PRODUCTS.filter(p => p.stock <= p.minStock && p.stock > 0).length,
    empty: MOCK_PRODUCTS.filter(p => p.stock <= 0).length,
  }), [])

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingTop: spacing.lg, paddingHorizontal: spacing.gutter, marginBottom: spacing.sm }}>
          <AppText variant="largeTitle">Ürünler</AppText>
          <AppText variant="footnote" tone="muted">{stats.total} ürün · {stats.low} kritik · {stats.empty} tükenen</AppText>
        </View>

        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: spacing.gutter }}>
            <SearchField value={query} onChangeText={setQuery} placeholder="Ürün adı, barkod veya kod..." />

            <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.section }}>
              <View style={{ flex: 1, padding: spacing.sm, borderRadius: 12, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: colors.infoSoft, alignItems: 'center', justifyContent: 'center' }}>
                  <Boxes color={colors.info} size={16} />
                </View>
                <View><AppText variant="caption2" tone="muted">Kayıt</AppText><AppText variant="headline" style={{ fontWeight: '700' }}>{stats.total}</AppText></View>
              </View>
              <View style={{ flex: 1, padding: spacing.sm, borderRadius: 12, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: colors.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
                  <CircleAlert color={colors.accent} size={16} />
                </View>
                <View><AppText variant="caption2" tone="muted">Kritik</AppText><AppText variant="headline" style={{ fontWeight: '700' }}>{stats.low + stats.empty}</AppText></View>
              </View>
            </View>
          </View>

          <GroupedSection header="TÜM ÜRÜNLER">
            {filtered.length === 0 ? (
              <EmptyState icon={Search} title="Ürün bulunamadı" message={`"${query}" ile eşleşen ürün yok`} />
            ) : (
              filtered.map(product => (
                <View key={product.code} style={{ minHeight: 62, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.gutter, paddingVertical: spacing.sm, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.separatorLight }}>
                  <View style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm }}>
                    <AppText variant="headline" tone="primary">{product.name.slice(0, 1)}</AppText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <AppText variant="body" numberOfLines={1}>{product.name}</AppText>
                    <AppText variant="caption1" tone="muted">{product.code} · {product.category} · {product.brand}</AppText>
                  </View>
                  <View style={{ alignItems: 'flex-end', gap: 2 }}>
                    <AppText variant="body" style={{ fontWeight: '600' }}>{money(product.price)}</AppText>
                    <StatusPill label={`Stok ${product.stock}`} tone={stockTone(product.stock, product.minStock)} />
                  </View>
                </View>
              ))
            )}
          </GroupedSection>
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}
