import { Button } from "../components/ui/button";
import { Plus, Users } from "lucide-react";
import Title from "../components/Title";
import Text from "../components/Text";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "../components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "../components/ui/sheet";
import MyCard from "../components/MyCard";
import { Label } from "@radix-ui/themes/components/context-menu";
import { Input } from "../components/ui/input";
import CardConf from "../components/CardConf";
import ComboboxTransacoes from "../components/ComboTransacoes";
import ComboPessoa from "../components/ComboPessoa";
import ComboCategoria from "../components/ComboCategoria";

function Transacoes() {
  return (
    <div className="mx-7">
      <Sheet>
        <div className="flex justify-between items-center">
          <div>
            <Title>Pessoas</Title>
            <Text>Gerencie os membros da residência</Text>
          </div>
          <div>
            <SheetTrigger asChild>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus size={18} color="#fff" /> Nova Transação
              </Button>
            </SheetTrigger>
          </div>
        </div>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Adicionar Transação</SheetTitle>
            <SheetDescription>Cadastre uma nova Transação.</SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="sheet-demo-name">Pessoa</Label>
              <ComboPessoa />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sheet-demo-username">Tipo</Label>
              <ComboboxTransacoes />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sheet-demo-username">Categoria</Label>
              <ComboCategoria />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sheet-demo-username">Descrição</Label>
              <Input
                id="sheet-demo-name"
                defaultValue=""
                placeholder="Ex: Compra, Supermercado, combustível..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sheet-demo-username">Valor</Label>
              <Input
                id="sheet-demo-username"
                type="number"
                defaultValue=""
                placeholder="0,00"
              />
            </div>
          </div>
          <SheetFooter className="pt-5">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Salvar
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Fechar</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <>
        <CardConf />
      </>

      <MyCard>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Descrição</TableHead>
              <TableHead className="text-right">Pessoa</TableHead>
              <TableHead className="text-right">Categoria</TableHead>
              <TableHead className="text-right">Tipo</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Salário</TableCell>
              <TableCell className="text-right">João José Silva</TableCell>
              <TableCell className="text-right">Salário</TableCell>
              <TableCell className="text-right">Receita</TableCell>
              <TableCell className="text-right">$1.750,00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </MyCard>
    </div>
  );
}

export default Transacoes;
