// Tipos do contrato OpenAPI do backend FastAPI (Paris Group Copilot API).
//
// Estes tipos estão hand-written para refletir fielmente os schemas Pydantic
// em api/app/schemas.py e api/app/models.py.
//
// Para REGENERAR automaticamente a partir do backend rodando (recomendado em
// CI/CD e quando o backend evoluir):
//
//   1. Suba o backend:    cd api && uvicorn app.main:app --reload
//                         (ou docker compose up)
//   2. Gere os tipos:     npm run generate:api
//
// A regeneração sobrescreve este arquivo com a saída de `openapi-typescript`
// a partir de `http://localhost:8000/openapi.json`. Não edite manualmente as
// seções regeneráveis quando o backend estiver acessível.

export type EstagioProjeto = "discovery" | "validacao" | "escala" | "pausado";

export type StatusHipotese = "a_testar" | "em_teste" | "validada" | "refutada";

export interface Hipotese {
  id: number;
  projeto_id: number;
  enunciado: string;
  metrica: string;
  status: StatusHipotese;
  aprendizado: string | null;
  created_at: string;
}

export interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  estagio: EstagioProjeto;
  link_fonte: string | null;
  proximo_passo: string | null;
  created_at: string;
  hipoteses: Hipotese[];
}

// Subset do contrato OpenAPI no formato que `openapi-fetch` consome.
// Tipa em compile-time: path, parâmetros, query e resposta de cada endpoint.
export interface paths {
  "/health": {
    get: {
      responses: {
        200: { content: { "application/json": { status: string } } };
      };
    };
  };
  "/projetos": {
    get: {
      responses: {
        200: { content: { "application/json": Projeto[] } };
      };
    };
  };
  "/projetos/{projeto_id}": {
    get: {
      parameters: { path: { projeto_id: number } };
      responses: {
        200: { content: { "application/json": Projeto } };
        404: { content: { "application/json": { detail: string } } };
      };
    };
  };
  "/projetos/{projeto_id}/hipoteses": {
    get: {
      parameters: { path: { projeto_id: number } };
      responses: {
        200: { content: { "application/json": Hipotese[] } };
      };
    };
  };
}
