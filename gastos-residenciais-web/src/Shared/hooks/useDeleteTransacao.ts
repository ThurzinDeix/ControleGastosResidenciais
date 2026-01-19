import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";

async function deleteTransacao(id: number) {
  await api.delete(`/transacoes/${id}`);
}

function useDeleteTransacao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransacao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
    },
  });
}

export default useDeleteTransacao;
