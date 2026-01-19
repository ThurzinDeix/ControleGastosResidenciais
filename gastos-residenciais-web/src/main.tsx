import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App/App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Instância única do React Query para controlar cache, refetch automático e estado das requisições
const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Garante que qualquer hook de dados possa usar o React Query sem precisar criar cliente próprio */}
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
