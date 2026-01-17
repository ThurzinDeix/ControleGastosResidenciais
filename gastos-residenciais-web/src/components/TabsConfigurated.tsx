import { Users, Tags, CircleDollarSign, ChartColumn } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Pessoas from "../pages/Pessoa";
import Categoria from "../pages/Categoria";
import Transacoes from "../pages/Transacoes";

function TabsConfigurated() {
  return (
    <Tabs defaultValue="people" className=" flex flex-col mx-auto mt-5 mx-10">
      <TabsList>
        <div className="bg-gray-200 px-1 py-1 rounded-lg flex gap-4">
          <TabsTrigger value="people">
            <Users color="#404040" /> <p className="mx-2">Pessoas</p>
          </TabsTrigger>
          <TabsTrigger value="category">
            <Tags color="#404040" /> <p className="mx-2">Categorias</p>
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <CircleDollarSign color="#404040" />
            <p className="mx-2">Transações</p>
          </TabsTrigger>
          <TabsTrigger value="reports">
            <ChartColumn color="#404040" /> <p className="mx-2">Relatórios</p>
          </TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="people">
        <Pessoas />
      </TabsContent>
      <TabsContent value="category">
        <Categoria />
      </TabsContent>
      <TabsContent value="transactions">
        <Transacoes />
      </TabsContent>
      <TabsContent value="reports"></TabsContent>
    </Tabs>
  );
}

export default TabsConfigurated;
