"use client";

import { Check, ChevronDown } from "lucide-react";

import { cn } from "../../../lib/utils";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onlyDespesa?: boolean;
};

export default function ComboboxTransacoes({
  value,
  onChange,
  onlyDespesa = false,
}: Props) {
  // Define quais tipos podem aparecer no combobox
  const tipos = onlyDespesa ? ["Despesa"] : ["Despesa", "Receita"];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {/* Mostra o tipo selecionado ou o texto padrão */}
          {value || "Selecione o tipo..."}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {/* map cria cada opção baseada no array de tipos */}
              {tipos.map((tipoItem) => (
                <CommandItem
                  key={tipoItem}
                  value={tipoItem}
                  onSelect={() => {
                    // Envia o tipo escolhido para o componente pai
                    onChange(tipoItem);
                  }}
                >
                  {tipoItem}
                  {/* Check aparece apenas no tipo selecionado */}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === tipoItem ? "opacity-100" : "opacity-0",
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
