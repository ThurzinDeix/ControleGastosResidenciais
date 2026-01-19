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

const Categoryes = [
  { value: "Despesa", label: "Despesas" },
  { value: "Receita", label: "Receitas" },
  { value: "Ambas", label: "Ambas" },
];

type ComboboxConfProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ComboboxConf({ value, onChange }: ComboboxConfProps) {
  // Controla se o popover do combobox está aberto ou fechado
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Botão que abre o combobox */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full text-neutral-700"
        >
          {/* Mostra o valor selecionado ou o texto padrão */}
          {value
            ? Categoryes.find((category) => category.value === value)?.label
            : "Selecione a finalidade..."}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command>
          <CommandList>
            {/* Mensagem quando não encontra nada */}
            <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>

            <CommandGroup>
              {/* map percorre as opções e cria cada item do combobox */}
              {Categoryes.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={() => {
                    // Atualiza o valor no componente pai
                    onChange(category.value);
                    // Após selecionar, fecha o combobox
                    setOpen(false);
                  }}
                >
                  {category.label}
                  {/* Check aparece apenas na opção selecionada */}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category.value ? "opacity-100" : "opacity-0",
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

export default ComboboxConf;
