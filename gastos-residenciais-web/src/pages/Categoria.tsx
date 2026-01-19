import { Button } from "../Shared/components/ui/button";
import { Plus, Trash2, Users } from "lucide-react";
import Text from "../Shared/components/Text";
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
import ComboboxConf from "../Shared/components/ComboBox/ComboboxConf";
import useGetCategoria from "../Shared/hooks/useGetCategoria";
import useDeleteCategoria from "../Shared/hooks/useDeleteCategoria";
import useCreateCategoria from "../Shared/hooks/useCreateCategoria";
import { useState } from "react";

function Categoria() {
  const { mutate, isPending } = useCreateCategoria();

  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState("");
  const [open, setOpen] = useState(false);

  function handleSave() {
    if (!descricao || !finalidade) return;

    mutate(
      { descricao, finalidade },
      {
        // Após salvar fecha o drawer
        onSuccess: () => {
          setDescricao("");
          setFinalidade("");
          setOpen(false);
        },
      },
    );
  }

  const { mutate: deleteCategoria, isPending: isDeleting } =
    useDeleteCategoria();

  const { data, isLoading, isError } = useGetCategoria();

  if (isLoading) {
    // Evita mostrar a tela “quebrada” enquanto os dados ainda não chegaram
    return <div className="mx-7">Carregando categorias...</div>;
  }

  if (isError) {
    // Centraliza o tratamento de erro aqui para simplificar o resto do componente
    return <div className="mx-7">Erro ao carregar categorias</div>;
  }

  return (
    <div className="mx-7">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="flex justify-between items-center">
          <div>
            {/* Título e descrição ficam juntos para dar contexto rápido da tela */}
            <h1 className="text-3xl font-bold text-neutral-800">Categorias</h1>
            <Text>Classifique as transações por Categorias</Text>
          </div>
          <div>
            <SheetTrigger asChild>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus size={18} color="#fff" /> Nova Categoria
              </Button>
            </SheetTrigger>
          </div>
        </div>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Adicionar Categoria</SheetTitle>
            <SheetDescription>
              Crie uma nova categoria para classificar transações.
            </SheetDescription>
          </SheetHeader>

          {/* Formulário controlado pelo estado local */}
          <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="sheet-demo-name">Descrição</Label>
              <Input
                id="sheet-demo-name"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: Alimentação, Aluguel, Salário..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sheet-demo-username">Finalidade</Label>
              <ComboboxConf value={finalidade} onChange={setFinalidade} />
            </div>
          </div>

          <SheetFooter className="pt-5">
            {/* Desabilita o botão enquanto salva para evitar clique duplicado */}
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSave}
              disabled={isPending}
            >
              Salvar
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
          <h1 className="text-3xl font-bold text-neutral-800">
            Total de Categorias
          </h1>
        </div>
        <div>
          <Text>{`${data?.length ?? 0} categoria(s) cadastrada(s)`}</Text>
        </div>
      </div>

      <MyCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="width-[100px]">Descrição</TableHead>
              <TableHead className="text-right">Finalidade</TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Mapeia as categorias vindas da API e monta as linhas da tabela */}
            {data?.map((categoria) => (
              <TableRow>
                <TableCell className="width-[100px]">
                  {categoria.descricao}
                </TableCell>
                <TableCell className="text-right">
                  {categoria.finalidade}
                </TableCell>
                <TableCell className="flex justify-end">
                  {/* Ação de excluir fica aqui para manter a tabela simples */}
                  <Button
                    variant="ghost"
                    disabled={isDeleting}
                    onClick={() => deleteCategoria(categoria.id)}
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

export default Categoria;
