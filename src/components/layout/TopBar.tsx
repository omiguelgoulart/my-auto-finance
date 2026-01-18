'use client'

import React from "react"

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TopBarProps {
  title: string
  showBack?: boolean
  action?: {
    icon: React.ReactNode
    onClick: () => void
    label: string
  }
  className?: string
}

export function TopBar({ title, showBack = false, action, className }: TopBarProps) {
  const router = useRouter()

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background px-4',
        className
      )}
    >
      <div className="flex items-center gap-2">
        {showBack && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => router.back()}
            aria-label="Voltar"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        {!showBack && <div className="w-8" />}
      </div>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-semibold">
        {title}
      </h1>

      <div className="flex items-center">
        {action ? (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={action.onClick}
            aria-label={action.label}
          >
            {action.icon}
          </Button>
        ) : (
          <div className="w-8" />
        )}
      </div>
    </header>
  )
}
