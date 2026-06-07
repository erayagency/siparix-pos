# Siparix POS — Open Source Retail Toolkit

🇹🇷 Türkiye'de perakende ve toptan satış için geliştirilmiş açık kaynak POS araçları.  
🇬🇧 Open source retail POS toolkit — design tokens, UI components, and demo app.

> Built by [Maviona Dijital Ajans](https://maviona.com).  
> Powers the [Siparix](https://siparix.com) platform used by textile, cafe, pharmacy, and grocery businesses.

## What's inside

| Package | Description |
|---------|-------------|
| [`packages/tokens`](./packages/tokens) | Apple HIG iOS design tokens — colors, spacing, typography |
| [`packages/ui`](./packages/ui) | Reusable React Native POS components — AppText, ListRow, GroupedSection, etc. |
| [`packages/demo-pos`](./packages/demo-pos) | Working Expo demo — complete retail sales screen with cart, payment, search |

## Quick preview

```bash
git clone https://github.com/erayagency/siparix-pos.git
cd siparix-pos
npm install
cd packages/demo-pos
npx expo start
```

Scan the QR code with Expo Go to see a working retail POS screen (sales + products tabs).

## Why open source?

We build sector-specific POS software for Turkish businesses. Each sector (textile, cafe, pharmacy, grocery) needs a different sales flow. These shared components are the foundation — we're opening them to help other Turkish developers build better retail apps.

## Used by

- Textile wholesale & retail stores
- Coffee shops & cafes  
- Pharmacies
- Courier & delivery services
- Grocery stores & markets
- Electronics repair shops

## Tech stack

- React Native / Expo SDK 54
- TypeScript (strict)
- Apple HIG design system
- Lucide icons
- expo-blur, expo-haptics

## Contributing

```bash
npm install
npm run typecheck
npm run test
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT © 2026 Maviona Dijital Ajans
