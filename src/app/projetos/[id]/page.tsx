import { notFound } from "next/navigation";
import Link from "next/link";
import { apiClient } from "@/lib/api/client";
import type { Projeto } from "@/types/api";

type FetchResult =
  | { kind: "ok"; projeto: Projeto }
  | { kind: "notfound" }
  | { kind: "error"; message: string };

async function fetchProjeto(id: number): Promise<FetchResult> {
  try {
    const { data, error, response } = await apiClient.GET(
      "/projetos/{projeto_id}",
      { params: { path: { projeto_id: id } } }
    );
    if (response.status === 404) return { kind: "notfound" };
    if (error || !data) {
      return { kind: "error", message: "Backend respondeu com erro." };
    }
    return { kind: "ok", projeto: data };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro desconhecido ao chamar o backend.";
    return { kind: "error", message };
  }
}

export default async function ProjetoDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parsedId = Number.parseInt(id, 10);

  if (!Number.isFinite(parsedId) || parsedId <= 0) {
    notFound();
  }

  const result = await fetchProjeto(parsedId);

  if (result.kind === "notfound") {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link
        href="/projetos"
        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
      >
        ← voltar para Projetos
      </Link>

      {result.kind === "error" && (
        <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-medium">Backend offline ou inacessível.</p>
          <p className="mt-1">Detalhe: {result.message}</p>
        </div>
      )}

      {result.kind === "ok" && (
        <article className="mt-4">
          <h1 className="text-2xl font-semibold">{result.projeto.nome}</h1>
          <p className="mt-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Estágio: {result.projeto.estagio}
          </p>

          {result.projeto.descricao && (
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              {result.projeto.descricao}
            </p>
          )}

          {result.projeto.proximo_passo && (
            <section className="mt-6">
              <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Próximo passo
              </h2>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                {result.projeto.proximo_passo}
              </p>
            </section>
          )}

          {result.projeto.hipoteses.length > 0 && (
            <section className="mt-6">
              <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Hipóteses ({result.projeto.hipoteses.length})
              </h2>
              <ul className="mt-2 space-y-2">
                {result.projeto.hipoteses.map((hipotese) => (
                  <li
                    key={hipotese.id}
                    className="rounded border border-gray-200 p-3 text-sm dark:border-gray-700"
                  >
                    <p className="font-medium">{hipotese.enunciado}</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Status: {hipotese.status}
                      {hipotese.metrica && ` · Métrica: ${hipotese.metrica}`}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      )}
    </main>
  );
}
