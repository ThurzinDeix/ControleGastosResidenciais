import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

export function CardConf() {
  return (
    <div className="flex flex-row justify-between">
      <Card className="w-full max-w-sm my-5 ">
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="">
            <CardTitle>Total de Receitas</CardTitle>
            <CardDescription className="mt-2 text-green-600 font-bold text-3xl">
              R$ 13.560,00
            </CardDescription>
          </div>
          <Button className="bg-neutral-300 hover:bg-neutral-300 mt-4 rounded-full py-0 px-3 w-min text-green-700">
            <TrendingUp />
          </Button>
        </CardHeader>
      </Card>
      <Card className="w-full max-w-sm my-5 ">
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="">
            <CardTitle>Total de Receitas</CardTitle>
            <CardDescription className="mt-2 text-red-600 font-bold text-3xl">
              R$ 13.560,00
            </CardDescription>
          </div>
          <Button className="bg-neutral-300 hover:bg-neutral-300 mt-4 rounded-full py-0 px-3 w-min text-red-700">
            <TrendingDown />
          </Button>
        </CardHeader>
      </Card>
      <Card className="w-full max-w-sm my-5 ">
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="">
            <CardTitle>Total de Receitas</CardTitle>
            <CardDescription className="mt-2 text-green-600 font-bold text-3xl">
              R$ 13.560,00
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
