import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { MovimentacaoRecente } from '@/types/models/movimentacao'



interface RecentMovementsListProps {
  movimentacoes: MovimentacaoRecente[]
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

export function RecentMovementsList({ movimentacoes }: RecentMovementsListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">
          Ultimas movimentacoes
        </h2>
        <Link
          href="/movimentacoes"
          className="text-xs text-primary hover:underline"
        >
          Ver todas
        </Link>
      </div>

      <div className="space-y-2">
        {movimentacoes.map((mov) => (
          <Card key={mov.id} className="py-3">
            <CardContent className="flex items-center justify-between p-0 px-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{mov.descricao}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(mov.data)} - {mov.categoriaNome}
                </span>
              </div>
              <span
                className={cn(
                  'text-sm font-semibold',
                  mov.tipo === 'RECEITA' ? 'text-income' : 'text-expense'
                )}
              >
                {mov.tipo === 'DESPESA' ? '-' : '+'}
                {formatCurrency(mov.valor)}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
