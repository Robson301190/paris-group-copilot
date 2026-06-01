import { apiClient } from "@/lib/api/client";
import type { Projeto } from "@/types/api";
import { ProjetoList } from "@/components/projetos/ProjetoList";

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

      {result.kind === "ok" && <ProjetoList projetos={result.projetos} />}
    </main>
  );
}
