import type { Decisao } from "@/types/decisao";

export const decisoesMock: Decisao[] = [
  {
    id: "dec-001",
    titulo: "Escolha do ORM no backend",
    contexto:
      "Avaliar SQLAlchemy, Prisma e Drizzle para o backend FastAPI considerando produtividade, maturidade no ecossistema Python e fluxo de migrações no contexto do projeto.",
    status: "pendente",
    data: "2026-06-01",
  },
  {
    id: "dec-002",
    titulo: "Evento principal de validação da hipótese",
    contexto:
      "Definir qual evento melhor sinaliza uso de valor — consulta natural ao painel, recorrência por projeto ou outro comportamento — antes de instrumentar a métrica em produção.",
    status: "pendente",
    data: "2026-06-01",
  },
  {
    id: "dec-003",
    titulo: "Stack inicial Next.js + FastAPI + Postgres",
    contexto:
      "Adotada combinação Next.js (App Router) no front, FastAPI no back e Postgres via Docker Compose como base do MVP. Justificativa registrada em docs/arquitetura.md.",
    status: "decidida",
    data: "2026-05-28",
  },
];
