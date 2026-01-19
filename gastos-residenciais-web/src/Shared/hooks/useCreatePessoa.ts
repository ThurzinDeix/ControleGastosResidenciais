import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";

type CreatePessoaDTO = {
  nome: string;
  idade: number;
};

async function createPessoa(data: CreatePessoaDTO) {
  const response = await api.post("/pessoas", data);
  return response.data;
}

export default function useCreatePessoa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPessoa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pessoas"] });
    },
  });
}
