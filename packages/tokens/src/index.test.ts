import { describe, it, expect } from 'vitest'
import { colors, spacing, radius, typography, shadow, animation } from './index'

describe('@siparix/tokens', () => {
  it('exports all color tokens as const', () => {
    expect(colors.primary).toBe('#0A7C66')
    expect(colors.background).toBe('#F2F2F7')
    expect(colors.surface).toBe('#FFFFFF')
    expect(colors.danger).toBe('#FF3B30')
    expect(colors.success).toBe('#34C759')
  })

  it('exports all spacing tokens as const', () => {
    expect(spacing.gutter).toBe(16)
    expect(spacing.xs).toBe(6)
    expect(spacing.sm).toBe(8)
  })

  it('exports all radius tokens as const', () => {
    expect(radius.lg).toBe(12)
    expect(radius.pill).toBe(999)
  })

  it('exports all typography tokens as const', () => {
    expect(typography.largeTitle).toBe(34)
    expect(typography.body).toBe(17)
    expect(typography.footnote).toBe(13)
  })

  it('exports shadow tokens', () => {
    expect(shadow.card.shadowOpacity).toBe(0.08)
    expect(shadow.tabBar.elevation).toBe(8)
  })

  it('exports animation tokens', () => {
    expect(animation.fast).toBe(150)
    expect(animation.spring.damping).toBe(15)
  })
})
