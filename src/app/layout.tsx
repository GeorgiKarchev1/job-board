import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JobBoard - Find Your Next Opportunity',
  description: 'A modern job board platform for connecting companies with talented professionals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className={cn(inter.className, 'min-h-screen bg-gradient-to-br from-slate-50 to-blue-50')}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}