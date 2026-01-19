import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";

export interface Categoria {
  id: number;
  descricao: string;
  finalidade: string;
}

const fetchCategoria = async (): Promise<Categoria[]> => {
  const response = await api.get("/categorias");
  return response.data;
};

function useGetCategoria() {
  return useQuery<Categoria[]>({
    queryKey: ["categoria"],
    queryFn: fetchCategoria,
  });
}

export default useGetCategoria;
