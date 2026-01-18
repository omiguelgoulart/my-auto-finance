'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts'

interface ReceitaDespesaBarChartProps {
  receita: number
  despesa: number
  titulo?: string
}

export function ReceitaDespesaBarChart({
  receita,
  despesa,
  titulo = 'Receita x Despesa',
}: ReceitaDespesaBarChartProps) {
  const data = [
    { name: 'Receita', value: receita },
    { name: 'Despesa', value: despesa },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {titulo}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 60, left: 0, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                width={60}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? 'oklch(0.65 0.15 145)' : 'oklch(0.55 0.2 25)'}
                  />
                ))}
                <LabelList
                  dataKey="value"
                  position="right"
                  style={{ fontSize: 12, fontWeight: 500 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
