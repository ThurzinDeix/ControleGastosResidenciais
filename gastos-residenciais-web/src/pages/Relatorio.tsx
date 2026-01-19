import { useState } from "react";
import { BarChart3, Filter } from "lucide-react";
import { IncomeVsExpenseChart } from "../Shared/components/relatorio/IncomeVsExpenseChart";
import { BalanceByPersonChart } from "../Shared/components/relatorio/BalanceByPersonChart";
import { CategoryBarChart } from "../Shared/components/relatorio/CategoryBarChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "../Shared/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Shared/components/ui/card";
import { cn } from "../lib/utils";
import { PeriodFilter } from "../Shared/components/relatorio/PeriodFilter";
import {
  useRelatorioData,
  type Periodo,
} from "../Shared/hooks/useRelatorioData";
import CardConf from "../Shared/components/CardConf";
import useGetTransacoesTotais from "../Shared/hooks/useGetTransacoesGerais";

export function ReportsView() {
  // Controla o período selecionado no filtro
  const [periodo, setPeriodo] = useState<Periodo>("UltimoMes");

  // Totais gerais para o card de resumo no topo
  const { data: totais } = useGetTransacoesTotais();

  // Formata valores em real para reutilizar na tela inteira
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  // Busca todos os dados do relatório baseado no período
  const { data, isPending, isError } = useRelatorioData(periodo);

  if (isPending) {
    // Evita renderizar gráfico/tabela vazios
    return <p>Carregando relatório...</p>;
  }

  if (isError || !data) {
    // Centraliza o erro aqui para simplificar o resto da tela
    return <p>Erro ao carregar relatório</p>;
  }

  // Soma geral para montar o rodapé da tabela
  const totalGeral = data.resumoPorPessoa.reduce(
    (acc, cur) => {
      acc.receita += cur.totalReceita;
      acc.despesa += cur.totalDespesa;
      return acc;
    },
    { receita: 0, despesa: 0 },
  );

  const saldoGeral = totalGeral.receita - totalGeral.despesa;

  return (
    <div className="space-y-6 mx-6">
      {/* Card de visão geral */}
      <CardConf
        totalReceita={totais?.[0]?.totalReceita ?? 0}
        totalDespesa={totais?.[0]?.totalDespesa ?? 0}
        saldo={totais?.[0]?.saldo ?? 0}
      />

      {/* Cabeçalho com filtro */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Relatórios</h2>
          <p className="text-muted-foreground">Visão consolidada financeira</p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <PeriodFilter value={periodo} onChange={setPeriodo} />
        </div>
      </div>

      {/* Gráficos principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <IncomeVsExpenseChart data={data.receitaDespesaPorPessoa} />
        <BalanceByPersonChart data={data.saldoPorPessoa} />
      </div>

      <CategoryBarChart data={data.totalPorCategoria} />

      {/* Tabela por pessoa */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle>Resumo por Pessoa</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="text-right">Receitas</TableHead>
                <TableHead className="text-right">Despesas</TableHead>
                <TableHead className="text-right">Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Monta a tabela a partir dos dados calculados no backend */}
              {data.resumoPorPessoa.map((p) => (
                <TableRow key={p.pessoa}>
                  <TableCell>{p.pessoa}</TableCell>
                  <TableCell className="text-right text-income">
                    {formatCurrency(p.totalReceita)}
                  </TableCell>
                  <TableCell className="text-right text-expense">
                    {formatCurrency(p.totalDespesa)}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-medium",
                      p.saldo >= 0 ? "text-income" : "text-expense",
                    )}
                  >
                    {formatCurrency(p.saldo)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            {/* Rodapé com total geral */}
            <TableFooter>
              <TableRow className="font-bold">
                <TableCell>TOTAL</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(totalGeral.receita)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(totalGeral.despesa)}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right",
                    saldoGeral >= 0 ? "text-income" : "text-expense",
                  )}
                >
                  {formatCurrency(saldoGeral)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      {/* Tabela por categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Receitas</TableHead>
                <TableHead className="text-right">Despesas</TableHead>
                <TableHead className="text-right">Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Mostra como cada categoria impacta no financeiro */}
              {data.resumoPorCategoria.map((c) => (
                <TableRow key={c.categoria}>
                  <TableCell>{c.categoria}</TableCell>
                  <TableCell className="text-right text-income">
                    {formatCurrency(c.totalReceita)}
                  </TableCell>
                  <TableCell className="text-right text-expense">
                    {formatCurrency(c.totalDespesa)}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-medium",
                      c.saldo >= 0 ? "text-income" : "text-expense",
                    )}
                  >
                    {formatCurrency(c.saldo)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReportsView;
