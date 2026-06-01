import { apiClient } from "@/lib/api/client";
import type { Projeto } from "@/types/api";

type FetchResult =
  | { kind: "ok"; projetos: Projeto[] }
  | { kind: "error"; message: string };

async function fetchProjetos(): Promise<FetchResult> {
  try {
    const { data, error } = await apiClient.GET("/projetos", {});
    if (error) {
      return { kind: "error", message: "Backend respondeu com erro." };
    }
    return { kind: "ok", projetos: data ?? [] };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro desconhecido ao chamar o backend.";
    return { kind: "error", message };
  }
}

const ESTAGIO_BADGE: Record<Projeto["estagio"], string> = {
  discovery: "bg-amber-100 text-amber-900",
  validacao: "bg-blue-100 text-blue-900",
  escala: "bg-emerald-100 text-emerald-900",
  pausado: "bg-zinc-200 text-zinc-700",
};

export default async function ProjetosPage() {
  const result = await fetchProjetos();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">Projetos</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Lista consumida do FastAPI via cliente OpenAPI tipado em compile-time.
      </p>

      {result.kind === "error" && (
        <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-medium">Backend offline ou inacessível.</p>
          <p className="mt-1">Detalhe: {result.message}</p>
          <p className="mt-3 text-xs">
            Para subir o backend:{" "}
            <code className="rounded bg-amber-100 px-1.5 py-0.5">
              cd api && uvicorn app.main:app --reload
            </code>{" "}
            ou{" "}
            <code className="rounded bg-amber-100 px-1.5 py-0.5">
              docker compose up
            </code>{" "}
            na raiz do projeto.
          </p>
        </div>
      )}

      {result.kind === "ok" && result.projetos.length === 0 && (
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Nenhum projeto cadastrado ainda. Use{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 dark:bg-gray-800">
            POST /projetos
          </code>{" "}
          no backend para criar o primeiro.
        </p>
      )}

      {result.kind === "ok" && result.projetos.length > 0 && (
        <ul className="mt-6 space-y-4">
          {result.projetos.map((projeto) => (
            <li
              key={projeto.id}
              className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
            >
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
          ))}
        </ul>
      )}
    </main>
  );
}
