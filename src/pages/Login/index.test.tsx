import { beforeEach, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { SWRConfig } from 'swr'
import { i18next } from '../../shared/i18n/i18n'
import { clearSession, readSessionNotice } from '../../shared/services/auth-token'
import { ColorModeProvider } from '../../shared/theme/ColorModeProvider'
import { Login } from '.'

const renderPage = (state?: { passwordChanged: boolean }) =>
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <ColorModeProvider>
        <MemoryRouter initialEntries={[{ pathname: '/login', state }]}>
          <Login />
        </MemoryRouter>
      </ColorModeProvider>
    </SWRConfig>,
  )

beforeEach(async () => {
  await i18next.changeLanguage('en')
})

it('has no sign-up link or button', () => {
  renderPage()
  expect(screen.getByRole('heading', { level: 1, name: 'Sign in' })).toBeInTheDocument()
  expect(screen.queryByRole('link', { name: /sign up|register|create|cadastr/i })).toBeNull()
  expect(screen.queryByRole('button', { name: /sign up|register|create|cadastr/i })).toBeNull()
  expect(screen.getAllByRole('link')).toHaveLength(1)
})

it('tells that the session expired, only once', () => {
  clearSession('expired')
  renderPage()
  expect(screen.getByText('Your session has expired. Sign in again.')).toBeInTheDocument()
  expect(readSessionNotice()).toBeNull()
})

it('shows no notice by default', () => {
  renderPage()
  expect(screen.queryByRole('alert')).toBeNull()
})

it('confirms a password change', () => {
  renderPage({ passwordChanged: true })
  expect(screen.getByText('Password changed. Sign in with the new password.')).toBeInTheDocument()
})
