import Link from 'next/link'
import { Plus, Wallet, Tags } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function QuickActions() {
  const actions = [
    {
      label: 'Nova',
      href: '/movimentacoes',
      icon: Plus,
    },
    {
      label: 'Contas',
      href: '/contas',
      icon: Wallet,
    },
    {
      label: 'Categorias',
      href: '/categorias',
      icon: Tags,
    },
  ]

  return (
    <div className="flex gap-2">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <Button
            key={action.href}
            variant="outline"
            size="sm"
            asChild
            className="flex-1 bg-transparent"
          >
            <Link href={action.href}>
              <Icon className="h-4 w-4" />
              {action.label}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}
