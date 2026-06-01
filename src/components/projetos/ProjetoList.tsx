import type { Projeto } from "@/types/api";
import { ProjetoCard } from "./ProjetoCard";

export interface ProjetoListProps {
  projetos: Projeto[];
  emptyMessage?: string;
}

export function ProjetoList({
  projetos,
  emptyMessage = "Nenhum projeto cadastrado ainda.",
}: ProjetoListProps) {
  if (projetos.length === 0) {
    return (
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="mt-6 space-y-4">
      {projetos.map((projeto) => (
        <ProjetoCard key={projeto.id} projeto={projeto} />
      ))}
    </ul>
  );
}
