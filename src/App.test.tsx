import { beforeEach, expect, it, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { App } from './App'
import { i18next } from './shared/i18n/i18n'
import { saveSession } from './shared/services/auth-token'
import { userResponse } from './shared/services/user.mock'

const session = { token: 'jwt', expiresAt: '2999-01-01T00:00:00Z', renewAt: '2999-01-01T00:00:00Z' }

const renderAt = (path: string) => {
  window.history.pushState({}, '', path)
  return render(<App />)
}

beforeEach(async () => {
  await i18next.changeLanguage('en')
  globalThis.fetch = jest.fn<typeof fetch>(async () => userResponse())
})

it.each(['/', '/anything', '/users/1'])('sends %s to the login without a token', async (path) => {
  renderAt(path)
  expect(await screen.findByRole('heading', { level: 1, name: 'Sign in' })).toBeInTheDocument()
  expect(window.location.pathname).toBe('/login')
})

it('keeps the forgot password page public', () => {
  renderAt('/forgot-password')
  expect(screen.getByRole('heading', { level: 1, name: 'Forgot my password' })).toBeInTheDocument()
  expect(window.location.pathname).toBe('/forgot-password')
})

it('shows the home page with a token', async () => {
  saveSession(session)
  renderAt('/')
  expect(await screen.findByRole('heading', { level: 1, name: 'Club Management Admin' })).toBeInTheDocument()
})

it('sends unknown paths to the home page with a token', async () => {
  saveSession(session)
  renderAt('/anything')
  expect(await screen.findByRole('heading', { level: 1, name: 'Club Management Admin' })).toBeInTheDocument()
  expect(window.location.pathname).toBe('/')
})

it('sends the login to the home page with a token', async () => {
  saveSession(session)
  renderAt('/login')
  expect(await screen.findByRole('heading', { level: 1, name: 'Club Management Admin' })).toBeInTheDocument()
  expect(window.location.pathname).toBe('/')
})
