'use client'

import { AppShell } from '@/components/layout/AppShell'
import { useEffect, useMemo, useState } from 'react'

import { NovaMovimentacaoDrawer } from '@/components/movimentacao/NovaMovimentacaoDrawer'
import { FiltrosDrawer, type FiltrosState } from '@/components/movimentacao/FiltrosDrawer'
import { MovimentacoesList } from '@/components/movimentacao/MovimentacoesLista'
import { toast } from 'sonner'

import type { Conta } from '@/types/models/conta'
import type { Movimentacao } from '@/types/models/movimentacao'
import type { Categoria } from '@/types/models/categoria'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

const filtrosDefault: FiltrosState = {
  periodo: 'mes',
  contaId: 'todas',
  tipo: 'todos',
  categoriaId: 'todas',
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

function authHeaders(extra?: Record<string, string>): HeadersInit {
  const token = getToken()
  return {
    ...(extra ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

function parseISODateOnly(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00`)
}

function getPeriodoStart(periodo: FiltrosState['periodo']): Date {
  const now = new Date()

  if (periodo === 'semana') return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 0, 0, 0, 0)
  if (periodo === 'mes') return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)

  if (periodo === 'trimestre') {
    const month = now.getMonth()
    const quarterStartMonth = Math.floor(month / 3) * 3
    return new Date(now.getFullYear(), quarterStartMonth, 1, 0, 0, 0, 0)
  }

  return new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0)
}

export default function MovimentacoesPage() {
  const [open, setOpen] = useState(false)
  const [filtrosOpen, setFiltrosOpen] = useState(false)
  const [filtros, setFiltros] = useState<FiltrosState>(filtrosDefault)

  const [contas, setContas] = useState<Conta[]>([])
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])

  useEffect(() => {
    const token = getToken()
    if (!token) {
      toast.error('Sessão expirada. Faça login novamente.')
      return
    }

    async function fetchContas() {
      const response = await fetch(`${baseUrl}/conta`, { headers: authHeaders() })
      if (!response.ok) return toast.error('Erro ao carregar contas')
      const data: Conta[] = await response.json()
      setContas(data)
    }

    async function fetchMovimentacoes() {
      const response = await fetch(`${baseUrl}/movimentacao`, { headers: authHeaders() })
      if (!response.ok) return toast.error('Erro ao carregar movimentações')
      const data: Movimentacao[] = await response.json()
      setMovimentacoes(data)
    }

    async function fetchCategorias() {
      const response = await fetch(`${baseUrl}/categoria`, { headers: authHeaders() })
      if (!response.ok) return toast.error('Erro ao carregar categorias')
      const data: Categoria[] = await response.json()
      setCategorias(data)
    }

    fetchContas()
    fetchMovimentacoes()
    fetchCategorias()
  }, [])

  function handleApplyFilters(next: FiltrosState) {
    setFiltros(next)
    setFiltrosOpen(false)
  }

  function handleClearFilters() {
    setFiltros(filtrosDefault)
    setFiltrosOpen(false)
  }

  async function handleCriarMovimentacao(data: Movimentacao) {
    const token = getToken()
    if (!token) {
      toast.error('Sessão expirada. Faça login novamente.')
      return
    }

    try {
      const response = await fetch(`${baseUrl}/movimentacao`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData: { erro?: string } = await response.json()
        toast.error(errorData.erro ?? 'Erro ao criar movimentação')
        return
      }

      const newMovimentacao: Movimentacao = await response.json()
      setMovimentacoes((prev) => [...prev, newMovimentacao])
      toast.success('Movimentação criada com sucesso')
      setOpen(false)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar movimentação')
    }
  }

  const movimentacoesFiltradas = useMemo(() => {
    const start = getPeriodoStart(filtros.periodo)
    const end = new Date()
    end.setHours(23, 59, 59, 999)

    return movimentacoes.filter((m) => {
      if (m.data) {
        const d = parseISODateOnly(m.data)
        if (d < start || d > end) return false
      }

      if (filtros.contaId !== 'todas' && m.contaId !== filtros.contaId) return false
      if (filtros.categoriaId !== 'todas' && m.categoriaId !== filtros.categoriaId) return false
      if (filtros.tipo !== 'todos' && m.tipo !== filtros.tipo) return false

      return true
    })
  }, [movimentacoes, filtros])

  return (
    <AppShell>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background px-4">
        <div className="w-8" />
        <h1 className="text-base font-semibold">Movimentações</h1>

        <NovaMovimentacaoDrawer
          open={open}
          onOpenChange={setOpen}
          categorias={categorias}
          contas={contas}
          onCriar={handleCriarMovimentacao}
        />
      </header>

      <div className="space-y-4 p-4">
        <div className="flex justify-end">
          <FiltrosDrawer
            open={filtrosOpen}
            onOpenChange={setFiltrosOpen}
            filtros={filtros}
            onChange={setFiltros}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
            contas={contas}
            categorias={categorias}
          />
        </div>

        <MovimentacoesList movimentacoes={movimentacoesFiltradas} />
      </div>
    </AppShell>
  )
}
