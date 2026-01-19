import { Button } from "../Shared/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
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
import CardConf from "../Shared/components/CardConf";
import ComboboxTransacoes from "../Shared/components/ComboBox/ComboTransacoes";
import ComboPessoa from "../Shared/components/ComboBox/ComboPessoa";
import ComboCategoria from "../Shared/components/ComboBox/ComboCategoria";
import useGetTransacoes from "../Shared/hooks/useGetTransacoes";
import useGetTransacoesTotais from "../Shared/hooks/useGetTransacoesGerais";
import useCreateTransacao from "../Shared/hooks/useCreateTransacao";
import { useState } from "react";
import { DatePicker } from "../Shared/components/DatePicker";
import useDeleteTransacao from "../Shared/hooks/useDeleteTransacao";

type Pessoa = {
  id: number;
  nome: string;
  idade: number;
};

function Transacoes() {
  // Hook responsável por criar uma nova transação
  const { mutate, isPending } = useCreateTransacao();

  // Estados do formulário
  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [tipo, setTipo] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [open, setOpen] = useState(false);

  // Hook para excluir transação
  const { mutate: deleteTransacao, isPending: isDeleting } =
    useDeleteTransacao();

  // Regra simples: menor de idade não pode criar receita
  const maiorDeIdade = pessoa ? pessoa.idade >= 18 : false;

  function handleSave() {
    // Garante que todos os campos obrigatórios foram preenchidos
    if (!descricao || !tipo || !valor || !categoriaId || !pessoa || !date)
      return;

    const payload = {
      valor: Number(valor),
      data: date.toISOString(),
      tipo,
      descricao,
      categoriaId: Number(categoriaId),
      pessoaId: pessoa.id,
    };

    mutate(payload, {
      onSuccess: () => {
        // Limpa o formulário e fecha o drawer após salvar
        setDescricao("");
        setValor("");
        setTipo("");
        setCategoriaId("");
        setPessoa(null);
        setDate(undefined);
        setOpen(false);
      },
    });
  }

  // Busca lista de transações e totais gerais
  const { data, isLoading, isError } = useGetTransacoes();
  const {
    data: totais,
    isLoading: totaisLoading,
    isError: totaisError,
  } = useGetTransacoesTotais();

  if (isLoading || totaisLoading)
    return <div className="mx-7">Carregando Transações...</div>;
  if (isError || totaisError)
    return <div className="mx-7">Erro ao carregar Transações</div>;

  return (
    <div className="mx-7">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800">Transações</h1>
            <Text>Gerencie as transações da residência</Text>
          </div>

          <SheetTrigger asChild>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus size={18} /> Nova Transação
            </Button>
          </SheetTrigger>
        </div>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Adicionar Transação</SheetTitle>
            <SheetDescription>Cadastre uma nova transação.</SheetDescription>
          </SheetHeader>

          <div className="grid gap-6 px-4 mt-4">
            <div className="grid gap-2">
              <Label>Pessoa</Label>
              <ComboPessoa value={pessoa} onChange={setPessoa} />
            </div>

            <div className="grid gap-2">
              <Label>Tipo</Label>
              <ComboboxTransacoes
                value={tipo}
                onChange={setTipo}
                onlyDespesa={!maiorDeIdade}
              />
            </div>

            <div className="grid gap-2">
              <Label>Categoria</Label>
              <ComboCategoria
                value={categoriaId}
                onChange={setCategoriaId}
                tipo={tipo}
              />
            </div>

            <div className="grid gap-2">
              <Label>Descrição</Label>
              <Input
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Valor</Label>
              <Input
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <DatePicker date={date} onChange={setDate} />
            </div>
          </div>

          <SheetFooter className="pt-5">
            <Button onClick={handleSave} disabled={isPending}>
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Fechar</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Card de resumo financeiro */}
      <CardConf
        totalReceita={totais?.[0]?.totalReceita ?? 0}
        totalDespesa={totais?.[0]?.totalDespesa ?? 0}
        saldo={totais?.[0]?.saldo ?? 0}
      />

      <MyCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Pessoa</TableHead>
              <TableHead className="text-right">Categoria</TableHead>
              <TableHead className="text-right">Data</TableHead>
              <TableHead className="text-right">Tipo</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* map percorre a lista de transações e monta cada linha da tabela */}
            {data?.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.descricao}</TableCell>
                <TableCell className="text-right">{t.pessoaNome}</TableCell>
                <TableCell className="text-right">
                  {t.categoriaDescricao}
                </TableCell>
                <TableCell className="text-right">
                  {new Date(t.data).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell className="text-right">{t.tipo}</TableCell>
                <TableCell className="text-right">R$ {t.valor},00</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    disabled={isDeleting}
                    onClick={() => deleteTransacao(t.id)}
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

export default Transacoes;
