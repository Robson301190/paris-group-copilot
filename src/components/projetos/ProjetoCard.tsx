import type { Projeto } from "@/types/api";

export interface ProjetoCardProps {
  projeto: Projeto;
}

const ESTAGIO_BADGE: Record<Projeto["estagio"], string> = {
  discovery: "bg-amber-100 text-amber-900",
  validacao: "bg-blue-100 text-blue-900",
  escala: "bg-emerald-100 text-emerald-900",
  pausado: "bg-zinc-200 text-zinc-700",
};

export function ProjetoCard({ projeto }: ProjetoCardProps) {
  return (
    <li className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-medium">{projeto.nome}</h2>
        <span
          className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${ESTAGIO_BADGE[projeto.estagio]}`}
        >
          {projeto.estagio}
        </span>
      </div>
      {projeto.descricao && (
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          {projeto.descricao}
        </p>
      )}
      {projeto.proximo_passo && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Próximo passo: {projeto.proximo_passo}
        </p>
      )}
    </li>
  );
}
