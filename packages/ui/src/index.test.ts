import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const srcDir = __dirname

const expectedFiles = [
  'AppText.tsx',
  'StatusPill.tsx',
  'GroupedSection.tsx',
  'ListRow.tsx',
  'PrimaryAction.tsx',
  'SearchField.tsx',
  'EmptyState.tsx',
  'BottomActionSheet.tsx',
  'CartRow.tsx',
  'FormRow.tsx',
  'Screen.tsx',
  'index.ts',
]

describe('@siparix/ui', () => {
  it('has all component files', () => {
    for (const file of expectedFiles) {
      const fullPath = path.join(srcDir, file)
      expect(fs.existsSync(fullPath), `${file} should exist`).toBe(true)
    }
  })
})
