import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";

export interface TransacaoTotal {
  totalReceita: number;
  totalDespesa: number;
  saldo: number;
}

const fetchTransacoesTotais = async (): Promise<TransacaoTotal[]> => {
  const response = await api.get("/transacoes/totais/gerais");
  return response.data;
};

function useGetTransacoesTotais() {
  return useQuery<TransacaoTotal[]>({
    queryKey: ["transacoesTotais"],
    queryFn: fetchTransacoesTotais,
  });
}

export default useGetTransacoesTotais;
