import Header from "./components/Header";
import TabsConfigurated from "./components/TabsConfigurated";

function Testando() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <TabsConfigurated />
      </main>
    </div>
  );
}

export default Testando;
