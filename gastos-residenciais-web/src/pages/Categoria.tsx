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
import ComboboxConf from "../components/ComboboxConf";

function Pessoa() {
  return (
    <div className="mx-7">
      <Sheet>
        <div className="flex justify-between items-center">
          <div>
            <Title>Categorias</Title>
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
          <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="sheet-demo-name">Descrição</Label>
              <Input
                id="sheet-demo-name"
                defaultValue=""
                placeholder="Ex: Alimentação, Aluguel, Salário..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sheet-demo-username">Finalidade</Label>
              <ComboboxConf />
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

      <div className="mt-5 bg-white px-7 py-4 flex flex-col rounded-lg border-2">
        <div className="flex items-center gap-3">
          <Users color="#0040ff" />
          <Title>Total de Categorias</Title>
        </div>
        <div>
          <Text>idddd categoria(s) cadastrada(s)</Text>
        </div>
      </div>
      <MyCard>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead className="absolute right-0">Finalidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell className="text-right">Paid</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </MyCard>
    </div>
  );
}

export default Pessoa;
