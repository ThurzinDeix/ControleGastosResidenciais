import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";

async function deleteCategoria(id: number) {
  await api.delete(`/categorias/${id}`);
}

function useDeleteCategoria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoria"] });
    },
  });
}

export default useDeleteCategoria;
