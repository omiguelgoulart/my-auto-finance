import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { ReceitaDespesaBarChart } from "@/components/charts/ReceitaDespesaBarChart";
import { DespesasPorCategoriaDonut } from "@/components/charts/DespesasPorCategoriasDonut";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentMovementsList } from "@/components/dashboard/ListaMovimentacoLista";

async function getDashboardData() {
  const token =
    typeof window === "undefined"
      ? undefined
      : localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const [resumoRes, categoriasRes, movimentacoesRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/resumo`, {
      headers,
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/despesas-categoria`, {
      headers,
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/movimentacoes?limit=5`, {
      headers,
      cache: "no-store",
    }),
  ]);

  if (!resumoRes.ok || !categoriasRes.ok || !movimentacoesRes.ok) {
    throw new Error("Erro ao carregar dados do dashboard");
  }

  const resumoMes = await resumoRes.json();
  const despesasPorCategoria = await categoriasRes.json();
  const movimentacoesRecentes = await movimentacoesRes.json();

  return {
    resumoMes,
    despesasPorCategoria,
    movimentacoesRecentes,
  };
}

export default async function DashboardPage() {
  const { resumoMes, despesasPorCategoria, movimentacoesRecentes } =
    await getDashboardData();

  return (
    <AppShell>
      <TopBar title="Dashboard" />
      <div className="space-y-6 p-4">
        <SummaryCards resumo={resumoMes} />

        <ReceitaDespesaBarChart
          receita={resumoMes.receitas}
          despesa={resumoMes.despesas}
        />

        <DespesasPorCategoriaDonut dados={despesasPorCategoria} />

        <QuickActions />

        <RecentMovementsList movimentacoes={movimentacoesRecentes} />
      </div>
    </AppShell>
  );
}
