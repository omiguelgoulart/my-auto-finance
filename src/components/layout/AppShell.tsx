import React from "react"
import { BottomNav } from './BottomNav'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: React.ReactNode
  className?: string
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className={cn('flex-1 pb-20', className)}>
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
