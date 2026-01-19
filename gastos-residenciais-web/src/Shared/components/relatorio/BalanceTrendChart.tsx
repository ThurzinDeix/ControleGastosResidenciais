import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  data: {
    data: string;
    saldo: number;
  }[];
};

export function BalanceTrendChart({ data }: Props) {
  return (
    <Card className="h-[360px]">
      <CardHeader>
        <CardTitle>Evolução do Saldo</CardTitle>
      </CardHeader>

      <CardContent className="h-[280px]">
        {/* Faz o gráfico ocupar todo o espaço disponível */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            {/* Grade para facilitar leitura */}
            <CartesianGrid strokeDasharray="3 3" />

            {/* Eixo X mostra a data formatada */}
            <XAxis
              dataKey="data"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("pt-BR")
              }
            />

            {/* Eixo Y representa o valor do saldo */}
            <YAxis />

            {/* Tooltip mostra data e valor formatados */}
            <Tooltip
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("pt-BR")
              }
              formatter={(value) =>
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(value))
              }
            />

            {/* Linha que representa a evolução do saldo */}
            <Line
              type="monotone"
              dataKey="saldo"
              name="Saldo"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
