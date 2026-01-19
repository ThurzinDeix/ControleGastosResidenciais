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
    onError: (error: unknown) => {
      let message = "Ocorreu um erro inesperado.";

      if (error && typeof error === "object" && "response" in error) {
        const response = (error as { response?: unknown }).response;

        if (response && typeof response === "object" && "data" in response) {
          const data = (response as { data?: unknown }).data;

          if (typeof data === "string") {
            message = data;
          } else if (
            data &&
            typeof data === "object" &&
            "message" in data &&
            typeof (data as { message?: unknown }).message === "string"
          ) {
            message = (data as { message: string }).message;
          } else {
            message = JSON.stringify(data);
          }
        }
      }

      alert(message);
    },
  });
}
