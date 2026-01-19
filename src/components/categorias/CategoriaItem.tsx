import { Card, CardContent } from '@/components/ui/card'
import { Categoria } from '@/types/models/categoria'

interface CategoriaItemProps {
  categoria: Categoria
}

export function CategoriaItem({ categoria }: CategoriaItemProps) {
  return (
    <Card className="py-3">
      <CardContent className="flex items-center gap-3 p-0 px-4">
        <div
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: categoria.cor || '#ccc' }}
        />
        <span className="text-sm font-medium">{categoria.nome}</span>
      </CardContent>
    </Card>
  )
}
