import type { Periodo } from "../../hooks/useRelatorioData";
import { Button } from "../ui/button";
import { cn } from "../../../lib/utils";

interface PeriodFilterProps {
  value: Periodo;
  onChange: (value: Periodo) => void;
}

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  // Opções de período que o usuário pode escolher
  const periods: { label: string; value: Periodo }[] = [
    { label: "Último mês", value: "UltimoMes" },
    { label: "Últimos 3 meses", value: "Ultimos3Meses" },
    { label: "Total", value: "Total" },
  ];

  return (
    <div className="flex gap-2">
      {/* map cria um botão para cada período */}
      {periods.map((period) => (
        <Button
          key={period.value}
          variant={value === period.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(period.value)}
          className={cn(
            "transition-colors",
            // Quando está selecionado, desativa o clique para evitar refetch desnecessário
            value === period.value && "pointer-events-none",
          )}
        >
          {period.label}
        </Button>
      ))}
    </div>
  );
}
