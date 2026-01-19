import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";

type CreateCategoria = {
  descricao: string;
  finalidade: string;
};

async function createCategoria(data: CreateCategoria) {
  const response = await api.post("/categorias", data);
  return response.data;
}

export default function useCreateCategoria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoria"] });
    },
  });
}
