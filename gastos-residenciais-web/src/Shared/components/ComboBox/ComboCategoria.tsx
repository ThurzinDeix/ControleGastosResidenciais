"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "../../../lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import useGetCategoria from "../../hooks/useGetCategoria";

type Categoria = {
  id: number;
  descricao: string;
  finalidade: string;
};

type ComboCategoriaProps = {
  value: string;
  onChange: (value: string) => void;
  tipo: string;
};

export function ComboCategoria({ value, onChange, tipo }: ComboCategoriaProps) {
  // Controla abertura do combobox
  const [open, setOpen] = React.useState(false);

  // Busca categorias da API
  const { data, isLoading, isError } = useGetCategoria();

  if (isLoading) return <div>Carregando categorias...</div>;
  if (isError) return <div>Erro ao carregar categorias</div>;

  // Filtra categorias conforme o tipo (Receita ou Despesa)
  const categoriasFiltradas =
    data?.filter(
      (c: Categoria) => c.finalidade === tipo || c.finalidade === "Ambas",
    ) ?? [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
          disabled={!tipo}
        >
          {/* Mostra a categoria selecionada ou o texto padrão */}
          {value
            ? categoriasFiltradas.find((c) => c.id.toString() === value)
                ?.descricao
            : "Selecione a categoria..."}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command>
          <CommandList>
            {/* Aparece quando não tem nenhuma categoria válida */}
            <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>

            <CommandGroup>
              {/* map percorre as categorias filtradas e monta as opções */}
              {categoriasFiltradas.map((categoria: Categoria) => (
                <CommandItem
                  key={categoria.id}
                  value={categoria.descricao}
                  onSelect={() => {
                    // Envia o id da categoria para o componente pai
                    onChange(categoria.id.toString());
                    // Fecha o combobox após selecionar
                    setOpen(false);
                  }}
                >
                  {categoria.descricao}
                  {/* Check aparece apenas na categoria selecionada */}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === categoria.id.toString()
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ComboCategoria;
