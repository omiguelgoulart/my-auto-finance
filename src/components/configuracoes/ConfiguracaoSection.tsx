import React from "react"
import { cn } from '@/lib/utils'

interface SettingsSectionProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function SettingsSection({ title, children, className }: SettingsSectionProps) {
  return (
    <section className={cn('space-y-3', className)}>
      <h2 className="text-sm font-medium text-muted-foreground px-1">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  )
}
