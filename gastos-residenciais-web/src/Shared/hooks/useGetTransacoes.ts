import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";

export interface Transacao {
  id: number;
  valor: number;
  data: number;
  tipo: string;
  descricao: string;
  categoriaDescricao: string;
  pessoaNome: string;
}

const fetchTransacoes = async (): Promise<Transacao[]> => {
  const response = await api.get("/transacoes");
  return response.data;
};

function useGetTransacao() {
  return useQuery<Transacao[]>({
    queryKey: ["transacoes"],
    queryFn: fetchTransacoes,
  });
}

export default useGetTransacao;
