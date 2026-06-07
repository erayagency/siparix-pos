# Siparix POS — Open Source Retail Toolkit

Open source React Native components and design tokens powering retail POS interfaces across Turkey.

> These packages are the public, reusable layer of the Siparix POS platform — actively used in production by **60+ businesses** across textile, cafe, pharmacy, grocery, and electronics retail sectors since 2024.

## Packages

| Package | Description | Status |
|---------|-------------|--------|
| [`@siparix/tokens`](./packages/tokens) | Apple HIG design tokens — 150+ values, zero dependencies | ✓ Production |
| [`@siparix/ui`](./packages/ui) | 11 POS-specific React Native components | ✓ Production |
| [`@siparix/app`](./packages/demo-pos) | Reference POS implementation (Expo) | ✗ Standalone reference |

## Quick start

```bash
git clone https://github.com/erayagency/siparix-pos.git
cd siparix-pos
npm install

# Run the reference POS app in Expo Go
cd packages/app
npx expo start
```

## Architecture

```
siparix-pos (OSS)
├── packages/tokens/     ← Design decisions → public
├── packages/ui/         ← Component library → public
└── packages/app/        ← Reference screens → public

Siparix Platform (proprietary)
├── src/domain/          ← Sector rules & workflows
├── src/state/           ← Cart, session, sync
├── src/services/        ← SQLite, Supabase, printer
└── src/main/            ← IPC, Electron, desktop UI
```

The public toolkit contains the **UI and design layer only** — the parts that benefit most from community input and reuse. Sector-specific business logic, sync engine, and licensing remain proprietary.

## Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `AppText` | Typography with 11 iOS variants, 8 tones | `variant`, `tone`, `numberOfLines` |
| `GroupedSection` | iOS inset grouped table wrapper | `header`, `footer` |
| `ListRow` | Settings-style row with icon, value, chevron, pill | `icon`, `title`, `subtitle`, `value`, `pill`, `onPress` |
| `PrimaryAction` / `SecondaryAction` | Solid/outlined CTA buttons | `icon`, `label`, `loading`, `disabled` |
| `StatusPill` | iOS badge (success/warning/danger/info/neutral) | `label`, `tone` |
| `SearchField` | Search input with clear button | `value`, `onChangeText`, `onSubmitEditing` |
| `EmptyState` | Placeholder with icon and action button | `icon`, `title`, `message`, `actionLabel`, `onAction` |
| `BottomActionSheet` | iOS modal sheet with keyboard avoidance | `open`, `title`, `children`, `footer` |
| `CartRow` | POS cart line item with stepper | `name`, `quantity`, `unitPrice`, `onIncrement`, `onDecrement`, `onRemove` |
| `FormInputRow` | Labeled text input row | `label`, `value`, `onChangeText`, `keyboardType` |
| `Screen` | Layout wrapper with scroll + keyboard avoidance | `scroll`, `refreshControl` |

## Design philosophy

- **iOS native** — Apple HIG spacing, typography, grouped tables, blur effects
- **Offline-first** — No network dependency, works on device
- **Touch targets ≥44px** — Shop workers use this all day, every day
- **TypeScript strict** — Full type coverage, 0 errors in typecheck
- **Zero business logic** — Pure presentational components

## Production usage

These components are battle-tested in the Siparix platform:

- **Textile wholesale**: 5-tier pricing, variant matrix, barcode picker
- **Coffee shops**: Quick-tap menu, modifier sheets, kitchen queue
- **Pharmacies**: İTS barcode, prescription verification, expiry tracking
- **Grocery**: Scale integration, shelf price verification
- **Courier**: Package tracking, proof of delivery, collection flow

Each sector runs the same component library with different business logic layered on top.

## Contributing

This is an actively maintained project. We welcome:

- New components (iOS HIG native)
- Test coverage improvements
- Bug fixes for edge cases
- Documentation

```bash
npm install
npm run typecheck   # 0 errors required
npm run test        # all tests must pass
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) and [ROADMAP.md](./ROADMAP.md).

## License

MIT © 2026 Maviona Dijital Ajans
