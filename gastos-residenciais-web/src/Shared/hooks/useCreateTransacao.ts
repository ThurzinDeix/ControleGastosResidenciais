import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";

type CreateTransacao = {
  valor: number;
  data: string;
  tipo: string;
  descricao: string;
  categoriaId: number;
  pessoaId: number;
};

async function createTransacao(data: CreateTransacao) {
  const response = await api.post("/transacoes", data);
  return response.data;
}

export default function useCreateTransacao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransacao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
    },
  });
}
