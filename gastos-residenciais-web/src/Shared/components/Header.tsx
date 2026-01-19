import { House } from "lucide-react";

function Header() {
  return (
    <div className="w-full bg-white p-4 text-left shadow-md flex align-center gap-4">
      <div className="bg-blue-600 text-white px-3 py-2 rounded-lg flex justify-center items-center">
        <House />
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-950">
          Controle Gastos Residenciais
        </h1>
        <p className="text-sm text-gray-700">
          Gerencie as finanças de sua casa
        </p>
      </div>
    </div>
  );
}

export default Header;
