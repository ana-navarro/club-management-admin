import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { ForgotPassword } from './pages/ForgotPassword'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { PublicOnly, RequireAuth } from './shared/components/RouteGuards/RouteGuards'
import { AppSwrProvider } from './shared/services/AppSwrProvider'
import { ColorModeProvider } from './shared/theme/ColorModeProvider'

export function App() {
  return (
    <ColorModeProvider>
      <AppSwrProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicOnly />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppSwrProvider>
    </ColorModeProvider>
  )
}
