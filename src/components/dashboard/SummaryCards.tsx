import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ResumoMes {
  receitas: number;
  despesas: number;
  saldo: number;
}

interface SummaryCardsProps {
  resumo: ResumoMes;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function SummaryCards({ resumo }: SummaryCardsProps) {
  const cards = [
    {
      label: "Receitas",
      value: resumo.receitas,
      icon: TrendingUp,
      colorClass: "text-income",
    },
    {
      label: "Despesas",
      value: resumo.despesas,
      icon: TrendingDown,
      colorClass: "text-expense",
    },
    {
      label: "Saldo",
      value: resumo.saldo,
      icon: Wallet,
      colorClass: resumo.saldo >= 0 ? "text-income" : "text-expense",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label} className="py-4">
            <CardContent className="flex items-center justify-between p-0 px-4">
              <div className="flex items-center gap-3">
                <div className={card.colorClass}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {card.label}
                </span>
              </div>
              <span className={`text-lg font-semibold ${card.colorClass}`}>
                {formatCurrency(card.value)}
              </span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
