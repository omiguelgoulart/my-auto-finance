'use client'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Filter } from 'lucide-react'

type PeriodoFiltro = 'semana' | 'mes' | 'trimestre' | 'ano'
type TipoFiltro = 'todos' | 'RECEITA' | 'DESPESA'

interface ContaSimples {
  id: string
  nome: string
}

interface CategoriaSimples {
  id: string
  nome: string
}

export interface FiltrosState {
  periodo: PeriodoFiltro
  contaId: string | 'todas'
  tipo: TipoFiltro
  categoriaId: string | 'todas'
}

interface FiltrosDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void

  filtros: FiltrosState
  onChange: (next: FiltrosState) => void

  onApply: (filtros: FiltrosState) => void
  onClear: () => void

  contas: ContaSimples[]
  categorias: CategoriaSimples[]
}

export function FiltrosDrawer({
  open,
  onOpenChange,
  filtros,
  onChange,
  onApply,
  onClear,
  contas,
  categorias,
}: FiltrosDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filtros</DrawerTitle>
          <DrawerDescription>Filtre suas movimentações</DrawerDescription>
        </DrawerHeader>

        <div className="space-y-4 px-4">
          <div className="space-y-2">
            <Label>Período</Label>
            <Select
              value={filtros.periodo}
              onValueChange={(value) => onChange({ ...filtros, periodo: value as PeriodoFiltro })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semana">Última semana</SelectItem>
                <SelectItem value="mes">Este mês</SelectItem>
                <SelectItem value="trimestre">Último trimestre</SelectItem>
                <SelectItem value="ano">Este ano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Conta</Label>
            <Select
              value={filtros.contaId}
              onValueChange={(value) => onChange({ ...filtros, contaId: value as FiltrosState['contaId'] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas as contas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as contas</SelectItem>
                {contas.map((conta) => (
                  <SelectItem key={conta.id} value={conta.id}>
                    {conta.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select
              value={filtros.tipo}
              onValueChange={(value) => onChange({ ...filtros, tipo: value as TipoFiltro })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="RECEITA">Receitas</SelectItem>
                <SelectItem value="DESPESA">Despesas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              value={filtros.categoriaId}
              onValueChange={(value) =>
                onChange({ ...filtros, categoriaId: value as FiltrosState['categoriaId'] })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as categorias</SelectItem>
                {categorias.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DrawerFooter>
          <Button onClick={() => onApply(filtros)}>Aplicar filtros</Button>

          <DrawerClose asChild>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                onClear()
                onOpenChange(false)
              }}
            >
              Limpar filtros
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
