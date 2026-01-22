'use client'

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus } from 'lucide-react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'

import type { Categoria } from '@/types/models/categoria'
import type { Conta } from '@/types/models/conta'
import type { Movimentacao } from '@/types/models/movimentacao'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  categorias: Categoria[]
  contas: Conta[]
  onCriar: (data: Movimentacao) => Promise<void> | void
}

export function NovaMovimentacaoDrawer({ open, onOpenChange, categorias, contas, onCriar }: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Movimentacao>({
    defaultValues: {
      tipo: 'DESPESA',
      descricao: '',
      valor: 0,
      data: new Date().toISOString().split('T')[0],
      categoriaId: undefined,
      contaId: '',
    },
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<Movimentacao> = async (data) => {
    await onCriar(data)
    reset()
    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button size="icon-sm" variant="ghost">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Nova movimentação</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Nova Movimentação</DrawerTitle>
          <DrawerDescription>Registre uma nova receita ou despesa</DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="px-4">
          <div className="space-y-4">
            {/* TIPO */}
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo</Label>

              <Controller
                name="tipo"
                control={control}
                rules={{ required: 'Selecione o tipo.' }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="tipo">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RECEITA">Receita</SelectItem>
                      <SelectItem value="DESPESA">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.tipo?.message ? (
                <p className="text-sm text-red-600">{errors.tipo.message}</p>
              ) : null}
            </div>

            {/* DESCRIÇÃO */}
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                placeholder="Ex: Supermercado"
                {...register('descricao', {
                  required: 'Informe a descrição.',
                  minLength: { value: 2, message: 'A descrição deve ter pelo menos 2 caracteres.' },
                })}
              />
              {errors.descricao?.message ? (
                <p className="text-sm text-red-600">{errors.descricao.message}</p>
              ) : null}
            </div>

            {/* VALOR */}
            <div className="space-y-2">
              <Label htmlFor="valor">Valor</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                placeholder="0,00"
                {...register('valor', {
                  valueAsNumber: true,
                  required: 'Informe o valor.',
                  min: { value: 0.01, message: 'O valor precisa ser maior que 0.' },
                })}
              />
              {errors.valor?.message ? (
                <p className="text-sm text-red-600">{errors.valor.message}</p>
              ) : null}
            </div>

            {/* DATA */}
            <div className="space-y-2">
              <Label htmlFor="data">Data</Label>
              <Input
                id="data"
                type="date"
                {...register('data', { required: 'Informe a data.' })}
              />
              {errors.data?.message ? (
                <p className="text-sm text-red-600">{errors.data.message}</p>
              ) : null}
            </div>

            {/* CATEGORIA */}
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>

              <Controller
                name="categoriaId"
                control={control}
                rules={{ required: 'Selecione a categoria.' }}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ''}
                    onValueChange={(value) => field.onChange(value || undefined)}
                  >
                    <SelectTrigger id="categoria">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.categoriaId?.message ? (
                <p className="text-sm text-red-600">{errors.categoriaId.message}</p>
              ) : null}
            </div>

            {/* CONTA */}
            <div className="space-y-2">
              <Label htmlFor="conta">Conta</Label>

              <Controller
                name="contaId"
                control={control}
                rules={{ required: 'Selecione a conta.' }}
                render={({ field }) => (
                  <Select value={field.value ?? ''} onValueChange={field.onChange}>
                    <SelectTrigger id="conta">
                      <SelectValue placeholder="Selecione a conta" />
                    </SelectTrigger>
                    <SelectContent>
                      {contas.map((conta) => (
                        <SelectItem key={conta.id} value={conta.id}>
                          {conta.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.contaId?.message ? (
                <p className="text-sm text-red-600">{errors.contaId.message}</p>
              ) : null}
            </div>
          </div>

          <DrawerFooter className="px-0">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Criar movimentação'}
            </Button>

            <DrawerClose asChild>
              <Button variant="outline" type="button" onClick={() => reset()}>
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
