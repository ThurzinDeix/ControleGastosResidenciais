import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  data: {
    pessoa: string;
    totalReceita: number;
    totalDespesa: number;
  }[];
};

export function IncomeVsExpenseChart({ data }: Props) {
  return (
    <Card className="h-[360px]">
      <CardHeader>
        <CardTitle>Receitas x Despesas por Pessoa</CardTitle>
      </CardHeader>

      <CardContent className="h-[280px]">
        {/* Ajusta o gráfico ao tamanho do card */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            {/* Grade para facilitar leitura */}
            <CartesianGrid strokeDasharray="3 3" />

            {/* Eixo X usa o nome da pessoa */}
            <XAxis dataKey="pessoa" tick={{ fontSize: 12 }} />

            {/* Eixo Y representa os valores */}
            <YAxis />

            {/* Tooltip formata os valores em real */}
            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(value))
              }
            />

            {/* Legenda para identificar receitas e despesas */}
            <Legend />

            {/* Barra de receitas */}
            <Bar
              dataKey="totalReceita"
              fill="#16a34a"
              name="Receitas"
              radius={[4, 4, 0, 0]}
            />

            {/* Barra de despesas */}
            <Bar
              dataKey="totalDespesa"
              fill="#dc2626"
              name="Despesas"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
