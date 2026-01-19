import { CategoriaItem } from './CategoriaItem'
import { EmptyState } from '@/components/feedback/EmptyState'
import { Categoria } from '@/types/models/categoria'
import { Tags } from 'lucide-react'

interface CategoriasListProps {
  categorias: Categoria[]
}

export function CategoriasList({ categorias }: CategoriasListProps) {
  if (categorias.length === 0) {
    return (
      <EmptyState
        icon={<Tags className="h-10 w-10" />}
        title="Nenhuma categoria cadastrada"
        description="Adicione categorias para organizar suas movimentacoes"
      />
    )
  }

  return (
    <div className="space-y-2">
      {categorias.map((cat) => (
        <CategoriaItem key={cat.id} categoria={cat} />
      ))}
    </div>
  )
}
