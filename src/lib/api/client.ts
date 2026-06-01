// Cliente HTTP tipado em compile-time a partir do contrato OpenAPI do backend.
//
// Divergências entre frontend e backend (rota renomeada, campo removido, tipo
// alterado) viram erro de compilação aqui, não bug em runtime.
//
// Uso típico em Server Component:
//
//   import { apiClient } from "@/lib/api/client";
//   const { data, error } = await apiClient.GET("/projetos");

import createClient from "openapi-fetch";
import type { paths } from "@/types/api";
import { config } from "@/lib/config";

export const apiClient = createClient<paths>({
  baseUrl: config.apiUrl,
});
