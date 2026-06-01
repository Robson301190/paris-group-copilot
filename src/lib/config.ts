// Config runtime — carrega variáveis de ambiente, valida obrigatórias e
// falha cedo (start-up time) em produção se algo estiver faltando.
//
// Em desenvolvimento, ausência de variáveis dispara warning com fallback.
// Em produção, ausência dispara `throw` — o app não inicia.
//
// Variáveis sensíveis (DATABASE_URL, REDIS_URL) só são checadas no server.
// No client, Next.js só expõe variáveis com prefixo `NEXT_PUBLIC_`.

export type NodeEnv = "development" | "production" | "test";

export interface AppConfig {
  apiUrl: string;
  databaseUrl: string | undefined;
  redisUrl: string | undefined;
  nodeEnv: NodeEnv;
  isServer: boolean;
}

const DEFAULT_API_URL = "http://localhost:8000";

function loadConfig(): AppConfig {
  const nodeEnv = (process.env.NODE_ENV ?? "development") as NodeEnv;
  const isServer = typeof window === "undefined";

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const databaseUrl = process.env.DATABASE_URL;
  const redisUrl = process.env.REDIS_URL;

  if (nodeEnv === "production") {
    const requiredOnClient: Array<[string, string | undefined]> = [
      ["NEXT_PUBLIC_API_URL", apiUrl],
    ];
    const requiredOnServer: Array<[string, string | undefined]> = [
      ["DATABASE_URL", databaseUrl],
      ["REDIS_URL", redisUrl],
    ];

    const checks = isServer
      ? [...requiredOnClient, ...requiredOnServer]
      : requiredOnClient;

    const missing = checks.filter(([, value]) => !value).map(([name]) => name);

    if (missing.length > 0) {
      throw new Error(
        `[config] Variáveis obrigatórias ausentes em produção ` +
          `(${isServer ? "server" : "client"}): ${missing.join(", ")}. ` +
          `Configure no provedor (Vercel/Railway/etc.) antes do deploy.`
      );
    }
  } else if (!apiUrl) {
    console.warn(
      `[config] NEXT_PUBLIC_API_URL não definida — usando fallback ${DEFAULT_API_URL}. ` +
        `Crie um .env.local a partir de .env.local.example.`
    );
  }

  return {
    apiUrl: apiUrl ?? DEFAULT_API_URL,
    databaseUrl,
    redisUrl,
    nodeEnv,
    isServer,
  };
}

export const config: AppConfig = loadConfig();
