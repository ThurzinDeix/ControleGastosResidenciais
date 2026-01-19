import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  data: {
    pessoa: string;
    saldo: number;
  }[];
};

export function BalanceByPersonChart({ data }: Props) {
  return (
    <Card className="h-[360px]">
      <CardHeader>
        <CardTitle>Saldo por Pessoa</CardTitle>
      </CardHeader>

      <CardContent className="h-[280px]">
        {/* Garante que o gráfico se adapte ao tamanho do card */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            {/* Grade só para facilitar leitura visual */}
            <CartesianGrid strokeDasharray="3 3" />

            {/* Eixo X usa o nome da pessoa */}
            <XAxis dataKey="pessoa" tick={{ fontSize: 12 }} />
            {/* Eixo Y representa o valor do saldo */}
            <YAxis />

            {/* Tooltip formata o valor em real quando passa o mouse */}
            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(value))
              }
            />

            {/* Barra principal do gráfico */}
            <Bar dataKey="saldo" name="Saldo" radius={[4, 4, 0, 0]}>
              {/* map cria uma célula para cada pessoa e define a cor conforme o saldo */}
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.saldo > 0 ? "#16a34a" : "#dc2626"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
