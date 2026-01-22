import { Repeat } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Movimentacao } from '@/types/models/movimentacao'

interface MovimentacaoItemProps {
  movimentacao: Movimentacao
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).format(date)
}

export function MovimentacaoItem({ movimentacao }: MovimentacaoItemProps) {
  const categoriaNome = movimentacao.categoria?.nome ?? 'Sem categoria'
  const contaNome = movimentacao.conta?.nome ?? 'Sem conta'

  const isDespesa = movimentacao.tipo === 'DESPESA'
  const isReceita = movimentacao.tipo === 'RECEITA'

  return (
    <Card className="py-3">
      <CardContent className="flex items-center justify-between p-0 px-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium">{movimentacao.descricao}</span>
            {movimentacao.recorrente && (
              <Repeat className="h-3 w-3 text-muted-foreground" />
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{formatDate(movimentacao.data)}</span>
            <span>-</span>
            <span>{categoriaNome}</span>
            <span>-</span>
            <span>{contaNome}</span>
          </div>
        </div>

        <span
          className={cn(
            'text-sm font-semibold',
            isReceita ? 'text-income' : 'text-expense'
          )}
        >
          {isDespesa ? '-' : '+'}
          {formatCurrency(movimentacao.valor)}
        </span>
      </CardContent>
    </Card>
  )
}
