import type { Decisao, StatusDecisao } from "@/types/decisao";
import { decisoesMock } from "@/data/decisoes-mock";

const STATUS_BADGE: Record<StatusDecisao, string> = {
  pendente: "bg-yellow-100 text-yellow-800",
  decidida: "bg-green-100 text-green-800",
  revisada: "bg-blue-100 text-blue-800",
};

const STATUS_LABEL: Record<StatusDecisao, string> = {
  pendente: "Pendente",
  decidida: "Decidida",
  revisada: "Revisada",
};

export default function DecisoesPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">Decisões Técnicas</h1>
      <p className="mt-2 text-sm text-gray-600">
        Registro auditável das decisões de arquitetura do projeto e seus estados atuais.
      </p>

      <ul className="mt-6 space-y-4">
        {decisoesMock.map((decisao: Decisao) => (
          <li
            key={decisao.id}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-medium">{decisao.titulo}</h2>
              <span
                className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE[decisao.status]}`}
              >
                {STATUS_LABEL[decisao.status]}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-700">{decisao.contexto}</p>
            <p className="mt-2 text-xs text-gray-500">{decisao.data}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
