'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Briefcase, Plus, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { logout, isAuthenticated } from '@/lib/auth'
import { useEffect, useState } from 'react'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    setIsAuth(isAuthenticated())
  }, [pathname])

  const handleLogout = () => {
    logout()
    setIsAuth(false)
    router.push('/')
  }

  const navigation = [
    { name: 'Jobs', href: '/', icon: Briefcase },
    { name: 'Submit Job', href: '/submit', icon: Plus },
    { name: 'Admin', href: '/admin', icon: Settings },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Briefcase className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-foreground">JobBoard</span>
        </Link>

        <nav className="flex items-center space-x-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    'flex items-center space-x-2',
                    isActive && 'shadow-md'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.name}</span>
                </Button>
              </Link>
            )
          })}
          
          {/* Logout button - show only when authenticated and on admin page */}
          {isAuth && pathname === '/admin' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2 ml-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}