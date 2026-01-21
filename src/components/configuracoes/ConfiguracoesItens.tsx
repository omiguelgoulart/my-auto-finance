'use client';

import React from "react"

import { ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SettingsItemProps {
  icon?: React.ReactNode
  label: string
  value?: string
  onClick?: () => void
  destructive?: boolean
  className?: string
}

export function SettingsItem({
  icon,
  label,
  value,
  onClick,
  destructive,
  className,
}: SettingsItemProps) {
  const Comp = onClick ? 'button' : 'div'

  return (
    <Card className={cn('py-3', className)}>
      <Comp
        onClick={onClick}
        className={cn(
          'flex w-full items-center justify-between',
          onClick && 'cursor-pointer'
        )}
      >
        <CardContent className="flex w-full items-center justify-between p-0 px-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className={cn('text-muted-foreground', destructive && 'text-expense')}>
                {icon}
              </div>
            )}
            <span
              className={cn(
                'text-sm font-medium',
                destructive && 'text-expense'
              )}
            >
              {label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {value && (
              <span className="text-sm text-muted-foreground">{value}</span>
            )}
            {onClick && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
          </div>
        </CardContent>
      </Comp>
    </Card>
  )
}
