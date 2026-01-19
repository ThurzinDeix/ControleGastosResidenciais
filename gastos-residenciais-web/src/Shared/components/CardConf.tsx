import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

interface CardConfProps {
  totalReceita: number;
  totalDespesa: number;
  saldo: number;
}

export function CardConf({ totalDespesa, totalReceita, saldo }: CardConfProps) {
  return (
    <div className="flex flex-row justify-between">
      {/* Card de receitas */}
      <Card className="w-full max-w-sm my-5">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Total de Receitas</CardTitle>
            {/* Mostra o valor formatado em real */}
            <CardDescription className="mt-2 text-green-600 font-bold text-3xl">
              R${" "}
              {totalReceita.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </CardDescription>
          </div>

          {/* Botão só visual, usado como ícone */}
          <Button className="bg-neutral-300 hover:bg-neutral-300 mt-4 rounded-full py-0 px-3 w-min text-green-700">
            <TrendingUp />
          </Button>
        </CardHeader>
      </Card>

      {/* Card de despesas */}
      <Card className="w-full max-w-sm my-5">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Total de Despesas</CardTitle>
            {/* Mostra o valor formatado em real */}
            <CardDescription className="mt-2 text-red-600 font-bold text-3xl">
              R${" "}
              {totalDespesa.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </CardDescription>
          </div>

          <Button className="bg-neutral-300 hover:bg-neutral-300 mt-4 rounded-full py-0 px-3 w-min text-red-700">
            <TrendingDown />
          </Button>
        </CardHeader>
      </Card>

      {/* Card de saldo final */}
      <Card className="w-full max-w-sm my-5">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Saldo</CardTitle>
            {/* Mostra o saldo final já formatado */}
            <CardDescription className="mt-2 text-green-600 font-bold text-3xl">
              R$ {saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </CardDescription>
          </div>

          <Button className="bg-neutral-300 hover:bg-neutral-300 mt-4 rounded-full py-0 px-3 w-min text-blue-600">
            <Wallet />
          </Button>
        </CardHeader>
      </Card>
    </div>
  );
}

export default CardConf;
