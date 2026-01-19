import { Button } from "../Shared/components/ui/button";
import { Plus, Trash2, Users } from "lucide-react";
import Text from "../Shared/components/Text";
import { useState } from "react";
import useCreatePessoa from "../Shared/hooks/useCreatePessoa";
import useDeletePessoa from "../Shared/hooks/useDeletePessoa";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "../Shared/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "../Shared/components/ui/sheet";
import MyCard from "../Shared/components/MyCard";
import { Label } from "../Shared/components/ui/label";
import { Input } from "../Shared/components/ui/input";
import usePessoaData from "../Shared/hooks/useGetPessoa";

function Pessoa() {
  const { mutate, isPending } = useCreatePessoa();

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate: deletePessoa, isPending: isDeleting } = useDeletePessoa();
  const { data, isLoading, isError } = usePessoaData();

  if (isLoading) {
    // Evita montar a tela antes dos dados chegarem
    return <div className="mx-7">Carregando pessoas...</div>;
  }

  if (isError) {
    // Mantém o erro concentrado aqui para não poluir o resto da tela
    return <div className="mx-7">Erro ao carregar pessoas</div>;
  }

  function handleSave() {
    if (!nome || !idade) return;

    mutate(
      { nome, idade: Number(idade) },
      {
        // Após salvar fecha o drawer
        onSuccess: () => {
          setNome("");
          setIdade("");
          setOpen(false);
        },
      },
    );
  }

  return (
    <div className="mx-7">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="flex justify-between items-center">
          <div>
            {/* Título e descrição dão contexto rápido da tela */}
            <h1 className="text-3xl font-bold text-neutral-800">Pessoas</h1>
            <Text>Gerencie os membros da residência</Text>
          </div>
          <div>
            <SheetTrigger asChild>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus size={18} color="#fff" /> Nova Pessoa
              </Button>
            </SheetTrigger>
          </div>
        </div>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Adicionar Pessoa</SheetTitle>
            <SheetDescription>
              Cadastre um novo membro na residência.
            </SheetDescription>
          </SheetHeader>

          {/* Formulário controlado pelo estado local */}
          <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-4">
            <div className="grid gap-2">
              <Label>Nome</Label>
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome completo"
              />
            </div>
            <div className="grid gap-2">
              <Label>Idade</Label>
              <Input
                type="number"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                placeholder="Digite a idade"
              />
            </div>
          </div>

          <SheetFooter className="pt-5">
            {/* Evita clique duplo enquanto salva */}
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Fechar</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Resumo rápido antes da tabela */}
      <div className="mt-5 bg-white px-7 py-4 flex flex-col rounded-lg border-2">
        <div className="flex items-center gap-3">
          <Users color="#0040ff" />
          <h1 className="text-3xl font-bold text-neutral-800">Total Pessoas</h1>
        </div>
        <div>
          <Text>{`${data?.length ?? 0} pessoa(s) cadastrada(s)`}</Text>
        </div>
      </div>

      <MyCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nome</TableHead>
              <TableHead className="text-right">Idade</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Monta a tabela a partir da lista vinda da API */}
            {data?.map((pessoa) => (
              <TableRow key={pessoa.id}>
                <TableCell className="font-medium">{pessoa.nome}</TableCell>
                <TableCell className="text-right">{pessoa.idade}</TableCell>
                <TableCell className="text-right">{pessoa.status}</TableCell>
                <TableCell className="text-right">
                  {/* Ação de excluir fica aqui para manter a tabela simples */}
                  <Button
                    variant="ghost"
                    disabled={isDeleting}
                    onClick={() => deletePessoa(pessoa.id)}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MyCard>
    </div>
  );
}

export default Pessoa;
