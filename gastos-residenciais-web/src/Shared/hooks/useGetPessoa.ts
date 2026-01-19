import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";

export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  status: string;
}

const fetchPessoas = async (): Promise<Pessoa[]> => {
  const response = await api.get("/pessoas");
  return response.data;
};

function usePessoaData() {
  return useQuery<Pessoa[]>({
    queryKey: ["pessoas"],
    queryFn: fetchPessoas,
  });
}

export default usePessoaData;
