import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";

async function deletePessoa(id: number) {
  await api.delete(`/pessoas/${id}`);
}

function useDeletePessoa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePessoa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pessoas"] });
    },
  });
}

export default useDeletePessoa;
