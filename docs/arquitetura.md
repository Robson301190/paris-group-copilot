# Arquitetura — Paris Group Copilot

Este documento justifica cada escolha de stack em relação ao modelo de **Venture Studio**: uma operação que cria múltiplos MVPs em paralelo e precisa validar hipóteses rápido, reaproveitar infraestrutura entre produtos e manter tudo enxuto enquanto ainda não há certeza de product-market fit.

Cada decisão é avaliada contra três critérios:

- **Velocidade de MVP** — quão rápido se sai do zero a uma hipótese validada.
- **Reutilização entre produtos do studio** — o quanto a escolha vira template para o próximo MVP.
- **Manutenção simples** — quão pouco custo operacional ela cria enquanto a hipótese ainda está em teste.

O contexto do produto está em [`enquadramento.md`](./enquadramento.md): o Copilot consolida contexto fragmentado de 3 a 5 MVPs e gera pré-briefings antes de reuniões. O núcleo é um **pipeline de contexto** (ingestão → processamento → retrieval → geração), não um CRUD tradicional.

## Visão geral da stack

```
Next.js (App Router)  ──►  FastAPI (api/)  ──►  PostgreSQL
   entrega/UI/SSR          cérebro/pipeline/IA      estado
```

- **FastAPI** = cérebro: ingestão, processamento, retrieval e geração de briefing.
- **Next.js** = entrega: renderização, experiência e orquestração do front, escondendo as chamadas ao backend.
- **PostgreSQL** = estado: projetos, hipóteses e o contexto consolidado entre MVPs.

## PostgreSQL (não SQLite)

O studio opera 3–5 MVPs em paralelo, com a API e workers de ingestão (Notion, WhatsApp) escrevendo ao mesmo tempo. SQLite serializa escritas e trava sob concorrência, quebrando já no 2º produto ou no primeiro worker assíncrono. Além disso, o valor do Copilot depende de **cruzar contexto entre MVPs** — "quais hipóteses sobre onboarding já validamos em qualquer projeto?", "qual o estágio médio dos MVPs ativos?" — o que exige `JOIN`s e agregações que o Postgres faz nativo; com arquivos SQLite espalhados por produto, não se cruza nada sem ETL manual.

- **Velocidade de MVP:** schema criado no startup (sem migrations no MVP); subir Postgres via Docker Compose é um comando.
- **Reutilização:** uma única instância serve todos os produtos do studio — infra compartilhada, não um banco por MVP.
- **Manutenção:** concorrência de escrita resolvida pelo banco, não por locks manuais na aplicação.

O custo de subir um container Postgres se paga já no segundo MVP.

## FastAPI / Python (não Express/Node)

O núcleo do Copilot é um pipeline de contexto (ingestão, sumarização, embeddings, retrieval, geração de briefing), não um servidor de rotas HTTP. O ecossistema de IA — embeddings, libs de processamento de texto, frameworks de orquestração — vive primeiro em Python. Usar FastAPI mantém aplicação e experimentos de IA **no mesmo runtime**, eliminando a ponte Node↔serviço-Python que, no MVP, só adiciona deploy, coordenação e observabilidade cedo demais.

- **Velocidade de MVP:** testar retrieval, chunking, ranking e pipelines assíncronos sem ponte entre runtimes; OpenAPI automático em `/docs` documenta o contrato sem esforço.
- **Reutilização:** o backend FastAPI vira o **esqueleto reutilizável** de todo MVP futuro que toque IA — cada produto herda o padrão ingestão → processamento → retrieval → geração em vez de reinventá-lo.
- **Manutenção:** um único runtime para API + IA; suporte nativo a workloads assíncronos e data-oriented sem arquitetura híbrida.

## Next.js (não SPA pura nem Remix)

O Copilot é **consumo rápido de contexto**, não uma aplicação altamente interativa tipo editor ou dashboard realtime. O que importa é a **primeira renderização** — Mariana abre o briefing minutos antes (ou durante) a reunião, então a tela precisa chegar pronta, não "vazia até carregar". Isso favorece SSR/streaming sobre SPA pura, onde o conteúdo depende de fetch no cliente.

Contra **SPA pura (Vite + React):** Next entrega file-based routing, layouts, loading/error boundaries, SSR/streaming, cache/revalidation e server actions praticamente de graça. Numa SPA pura, metade disso é remontada à mão — tempo de MVP gasto em encanamento.

Contra **Remix:** a decisão é estratégica, não técnica. O ecossistema do Next (templates, exemplos de integração com IA, tooling, conteúdo, pool de contratação) é muito maior — o que pesa num studio que reaproveita boilerplate entre MVPs.

Além disso, o modelo de Server Components encaixa no backend de IA: renderiza o briefing no servidor, faz streaming gradual da resposta do LLM e **esconde as chamadas ao FastAPI no server-side** — chaves e tokens nunca chegam ao cliente, sem precisar de um BFF separado.

- **Velocidade de MVP:** infraestrutura de front (rotas, SSR, cache) pronta desde o `create-next-app`.
- **Reutilização:** o front vira template reutilizável do studio, igual o backend.
- **Manutenção:** fronteira limpa entre cérebro (FastAPI) e entrega (Next); segredos contidos no servidor.

## Resumo

| Componente | Por que não a alternativa | Critério mais decisivo no studio |
|---|---|---|
| **PostgreSQL** | SQLite trava sob escrita concorrente e não cruza dados entre MVPs | Reutilização (contexto cross-MVP) |
| **FastAPI** | Express/Node força ponte com serviços Python de IA | Velocidade de validação (mesmo runtime) |
| **Next.js** | SPA pura remonta infra à mão; Remix tem ecossistema menor | Velocidade de MVP + reutilização de boilerplate |

Nenhuma escolha foi feita por popularidade: cada uma reduz trabalho de infraestrutura no MVP, suporta a natureza de pipeline-de-IA do produto e vira template reaproveitável para os próximos produtos do studio.
