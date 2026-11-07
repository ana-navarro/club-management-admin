import { Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { z } from 'zod'
import { PublicLayout } from '../../shared/components/PublicLayout/PublicLayout'
import { clearSessionNotice, readSessionNotice } from '../../shared/services/auth-token'
import { LoginForm } from './components/LoginForm'

const locationStateSchema = z.object({ passwordChanged: z.boolean() })

export function Login() {
  const { t } = useTranslation()
  const location = useLocation()
  const state = locationStateSchema.safeParse(location.state)
  const passwordChanged = state.success && state.data.passwordChanged
  const [expired] = useState(() => readSessionNotice() === 'expired')

  useEffect(() => clearSessionNotice(), [])

  return (
    <PublicLayout title={t('login.title')}>
      {expired && <Alert severity="info">{t('login.sessionExpired')}</Alert>}
      {passwordChanged && <Alert severity="success">{t('resetPassword.success')}</Alert>}
      <LoginForm />
    </PublicLayout>
  )
}
