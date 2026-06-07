# Contributing

## Setup

```bash
npm install
npm run test
npm run typecheck
```

## Adding a new component

1. Create the component in `packages/ui/src/YourComponent.tsx`
2. Export it from `packages/ui/src/index.ts`
3. Add tests in the same directory
4. Run `npm run typecheck`

## Commit convention

- `feat: add X component`
- `fix: correct Y token value`
- `docs: update README`

## Questions?

Open an issue on GitHub.
