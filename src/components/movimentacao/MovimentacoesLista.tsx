import { MovimentacaoItem } from './MovimentacaoItem'
import { EmptyState } from '@/components/feedback/EmptyState'
import { Movimentacao } from '@/types/models/movimentacao'
import { ArrowLeftRight } from 'lucide-react'

interface MovimentacoesListProps {
  movimentacoes: Movimentacao[]
}

export function MovimentacoesList({ movimentacoes }: MovimentacoesListProps) {
  if (movimentacoes.length === 0) {
    return (
      <EmptyState
        icon={<ArrowLeftRight className="h-10 w-10" />}
        title="Nenhuma movimentacao encontrada"
        description="Adicione sua primeira movimentacao ou ajuste os filtros"
      />
    )
  }

  return (
    <div className="space-y-2">
      {movimentacoes.map((mov) => (
        <MovimentacaoItem key={mov.id} movimentacao={mov} />
      ))}
    </div>
  )
}
