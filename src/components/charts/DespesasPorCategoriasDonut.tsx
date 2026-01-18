"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DespesaCategoria {
  categoria: string;
  valor: number;
  [key: string]: string | number;
}

interface DespesasPorCategoriaDonutProps {
  dados: DespesaCategoria[];
  titulo?: string;
}

const COLORS = [
  "oklch(0.65 0.15 250)", // blue
  "oklch(0.7 0.15 145)", // green
  "oklch(0.75 0.15 80)", // yellow
  "oklch(0.65 0.15 30)", // orange
  "oklch(0.6 0.1 270)", // muted purple
];

export function DespesasPorCategoriaDonut({
  dados,
  titulo = "Despesas por Categoria",
}: DespesasPorCategoriaDonutProps) {
  const processedData = (() => {
    if (dados.length <= 5) return dados;

    const sorted = [...dados].sort((a, b) => b.valor - a.valor);
    const top4 = sorted.slice(0, 4);
    const others = sorted.slice(4);
    const outrosTotal = others.reduce((sum, item) => sum + item.valor, 0);

    return [...top4, { categoria: "Outros", valor: outrosTotal }];
  })();

  const total = processedData.reduce((sum, item) => sum + item.valor, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const renderLegend = () => (
    <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
      {processedData.map((entry, index) => (
        <li key={entry.categoria} className="flex items-center gap-1.5 text-xs">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
          />
          <span className="text-muted-foreground">{entry.categoria}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {titulo}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-45 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={processedData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                dataKey="valor"
                nameKey="categoria"
              >
                {processedData.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.categoria}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-sm font-semibold">{formatCurrency(total)}</p>
            </div>
          </div>
        </div>
        {renderLegend()}
      </CardContent>
    </Card>
  );
}
