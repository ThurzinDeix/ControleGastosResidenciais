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
import usePessoaData from "../../hooks/useGetPessoa";

type Pessoa = {
  id: number;
  nome: string;
  idade: number;
};

type ComboPessoaProps = {
  value: Pessoa | null;
  onChange: (pessoa: Pessoa) => void;
};

export function ComboPessoa({ value, onChange }: ComboPessoaProps) {
  // Controla abertura do combobox
  const [open, setOpen] = React.useState(false);

  // Busca pessoas da API
  const { data, isLoading, isError } = usePessoaData();

  if (isLoading) return <div>Carregando pessoas...</div>;
  if (isError) return <div>Erro ao carregar pessoas</div>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {/* Mostra a pessoa selecionada ou o texto padrão */}
          {value ? value.nome : "Selecione a pessoa..."}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command>
          <CommandList>
            {/* Aparece quando não tem nenhuma pessoa */}
            <CommandEmpty>Nenhuma pessoa encontrada.</CommandEmpty>

            <CommandGroup>
              {/* map percorre as pessoas e cria cada opção */}
              {data?.map((pessoa: Pessoa) => (
                <CommandItem
                  key={pessoa.id}
                  value={pessoa.nome}
                  onSelect={() => {
                    // Envia a pessoa inteira para o componente pai
                    onChange(pessoa);
                    // Fecha o combobox após selecionar
                    setOpen(false);
                  }}
                >
                  {pessoa.nome}
                  {/* Check aparece apenas na pessoa selecionada */}
                  <Check
                    className={cn(
                      "ml-auto",
                      value?.id === pessoa.id ? "opacity-100" : "opacity-0",
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

export default ComboPessoa;
