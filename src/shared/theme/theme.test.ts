import { expect, it } from '@jest/globals'
import { createAppTheme } from './theme'

it('builds the light theme from the palette', () => {
  const { palette } = createAppTheme('light')
  expect(palette.mode).toBe('light')
  expect(palette.background.default).toBe('#EEEEEE')
  expect(palette.background.paper).toBe('#FFFFFF')
  expect(palette.text.primary).toBe('#071B2B')
  expect(palette.primary.main).toBe('#167D8D')
  expect(palette.primary.contrastText).toBe('#FFFFFF')
})

it('builds the dark theme from the palette', () => {
  const { palette } = createAppTheme('dark')
  expect(palette.mode).toBe('dark')
  expect(palette.background.default).toBe('#071B2B')
  expect(palette.text.primary).toBe('#EEEEEE')
  expect(palette.primary.main).toBe('#B9E4E8')
  expect(palette.primary.contrastText).toBe('#071B2B')
})
