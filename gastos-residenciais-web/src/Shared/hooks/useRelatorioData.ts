import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";

export type Periodo = "UltimoMes" | "Ultimos3Meses" | "Total";

export interface RelatorioFinanceiroDTO {
  receitaDespesaPorPessoa: {
    pessoa: string;
    totalReceita: number;
    totalDespesa: number;
  }[];

  saldoPorPessoa: {
    pessoa: string;
    saldo: number;
  }[];

  totalPorCategoria: {
    categoria: string;
    totalReceita: number;
    totalDespesa: number;
  }[];

  saldoGeral: {
    data: string;
    saldo: number;
  }[];

  resumoPorPessoa: {
    pessoa: string;
    totalReceita: number;
    totalDespesa: number;
    saldo: number;
  }[];

  resumoPorCategoria: {
    categoria: string;
    totalReceita: number;
    totalDespesa: number;
    saldo: number;
  }[];
}

const fetchRelatorio = async (
  periodo: Periodo,
): Promise<RelatorioFinanceiroDTO> => {
  const response = await api.get(`/relatorios`, {
    params: { periodo },
  });
  return response.data;
};

export function useRelatorioData(periodo: Periodo) {
  return useQuery<RelatorioFinanceiroDTO>({
    queryKey: ["relatorio", periodo],
    queryFn: () => fetchRelatorio(periodo),
    placeholderData: (previousData) => previousData,
  });
}
