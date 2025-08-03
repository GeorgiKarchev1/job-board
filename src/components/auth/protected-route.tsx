'use client'

import { useEffect, useState } from 'react'
import { isAuthenticated } from '@/lib/auth'
import { LoginForm } from './login-form'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    setIsAuth(isAuthenticated())
  }, [])

  const handleLoginSuccess = () => {
    setIsAuth(true)
  }

  // Show loading while checking auth status
  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login form if not authenticated
  if (!isAuth) {
    return <LoginForm onSuccess={handleLoginSuccess} />
  }

  // Show protected content if authenticated
  return <>{children}</>
}