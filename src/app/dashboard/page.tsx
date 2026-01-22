"use client";

import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { ReceitaDespesaBarChart } from "@/components/charts/ReceitaDespesaBarChart";
import { DespesasPorCategoriaDonut } from "@/components/charts/DespesasPorCategoriasDonut";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentMovementsList } from "@/components/dashboard/ListaMovimentacoLista";
import { toast } from "sonner";

type ResumoMes = {
  competencia: string;
  receitas: number;
  despesas: number;
  saldo: number;
};

type DespesaPorCategoria = {
  categoriaId: string | null;
  categoriaNome: string;
  valor: number;
};

type MovimentacaoRecente = {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  tipo: "RECEITA" | "DESPESA";
  origem: "MANUAL" | "WHATSAPP" | "EXTRATO";
  categoriaNome: string;
  categoria?: { id: string; nome: string } | null;
  conta: { id: string; nome: string };
};

function getMesAtualYYYYMM() {
  const now = new Date();
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  return `${yyyy}-${mm}`;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [competencia, setCompetencia] = useState<string>(getMesAtualYYYYMM());

  const [resumoMes, setResumoMes] = useState<ResumoMes | null>(null);
  const [despesasPorCategoria, setDespesasPorCategoria] = useState<DespesaPorCategoria[]>([]);
  const [movimentacoesRecentes, setMovimentacoesRecentes] = useState<MovimentacaoRecente[]>([]);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (competencia) params.set("competencia", competencia);
    return params.toString();
  }, [competencia]);

  useEffect(() => {
    async function getDashboardData() {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Você precisa estar logado para acessar o dashboard.");
        setResumoMes(null);
        setDespesasPorCategoria([]);
        setMovimentacoesRecentes([]);
        return;
      }

      if (!baseUrl) {
        toast.error("NEXT_PUBLIC_API_URL não configurada.");
        return;
      }

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const resumoUrl = `${baseUrl}/dashboard/resumo?${query}`;
      const categoriasUrl = `${baseUrl}/dashboard/despesas-categoria?${query}`;
      const movimentacoesUrl = `${baseUrl}/dashboard/movimentacoes-recentes?limit=5&${query}`;

      const [resumoRes, categoriasRes, movimentacoesRes] = await Promise.all([
        fetch(resumoUrl, { headers }),
        fetch(categoriasUrl, { headers }),
        fetch(movimentacoesUrl, { headers }),
      ]);

      if (!resumoRes.ok) {
        const err = await resumoRes.json().catch(() => null);
        throw new Error(err?.erro || "Erro ao carregar resumo");
      }

      if (!categoriasRes.ok) {
        const err = await categoriasRes.json().catch(() => null);
        throw new Error(err?.erro || "Erro ao carregar despesas por categoria");
      }

      if (!movimentacoesRes.ok) {
        const err = await movimentacoesRes.json().catch(() => null);
        throw new Error(err?.erro || "Erro ao carregar movimentações recentes");
      }

      const resumoJson = (await resumoRes.json()) as ResumoMes;
      const categoriasJson = (await categoriasRes.json()) as DespesaPorCategoria[];
      const movimentacoesJson = (await movimentacoesRes.json()) as MovimentacaoRecente[];

      setResumoMes(resumoJson);
      setDespesasPorCategoria(categoriasJson);
      setMovimentacoesRecentes(movimentacoesJson);
    }

    getDashboardData()
      .catch((error: unknown) => {
        console.error(error);
        toast.error("Erro ao carregar dados do dashboard.");
      })
      .finally(() => setLoading(false));
  }, [baseUrl, query]);

  if (loading) {
    return (
      <AppShell>
        <TopBar title="Dashboard" />
        <div className="p-4">Carregando...</div>
      </AppShell>
    );
  }

  if (!resumoMes) {
    return (
      <AppShell>
        <TopBar title="Dashboard" />
        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between gap-3">
            <label className="text-sm text-muted-foreground" htmlFor="competencia">
              Competência
            </label>
            <input
              id="competencia"
              type="month"
              value={competencia}
              onChange={(e) => setCompetencia(e.target.value)}
              className="h-10 rounded-md border bg-background px-3 text-sm"
            />
          </div>

          <div>Não foi possível carregar os dados.</div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <TopBar title="Dashboard" />
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between gap-3">
          <label className="text-sm text-muted-foreground" htmlFor="competencia">
            Competência
          </label>
          <input
            id="competencia"
            type="month"
            value={competencia}
            onChange={(e) => setCompetencia(e.target.value)}
            className="h-10 rounded-md border bg-background px-3 text-sm"
          />
        </div>

        <SummaryCards resumo={resumoMes} />

        <div className="w-full min-h-65">
          <ReceitaDespesaBarChart receita={resumoMes.receitas} despesa={resumoMes.despesas} />
        </div>

        <div className="w-full min-h-80">
          <DespesasPorCategoriaDonut
            dados={despesasPorCategoria.map((item) => ({
              categoria: item.categoriaNome,
              valor: item.valor,
            }))}
          />
        </div>

        <QuickActions />

        <RecentMovementsList movimentacoes={movimentacoesRecentes} />
      </div>
    </AppShell>
  );
}
