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

function Pessoa() {
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
          <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="sheet-demo-name">Nome</Label>
              <Input
                id="sheet-demo-name"
                defaultValue=""
                placeholder="Digite o nome completo"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sheet-demo-username">Idade</Label>
              <Input
                id="sheet-demo-username"
                type="number"
                defaultValue=""
                placeholder="Digite a idade"
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

      <div className="mt-5 bg-white px-7 py-4 flex flex-col rounded-lg border-2">
        <div className="flex items-center gap-3">
          <Users color="#0040ff" />
          <Title>Total Pessoas</Title>
        </div>
        <div>
          <Text>idddd pessoa(s) cadastrada(s)</Text>
        </div>
      </div>
      <MyCard>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nome</TableHead>
              <TableHead className="text-right">Idade</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell className="text-right">Paid</TableCell>
              <TableCell className="text-right">Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </MyCard>
    </div>
  );
}

export default Pessoa;
