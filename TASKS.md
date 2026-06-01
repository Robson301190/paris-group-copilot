# Tasks — Paris Group Copilot

> Última atualização: 2026-06-01
> Rastreamento adaptado (substituto local do Tasknotes CLI).

---

## 🔄 Em andamento

### TASK-001 — Página de Decisões Técnicas

**Status:** in-progress
**Responsável:** Robson
**Descrição:** Página `/decisoes` que lista as decisões de arquitetura do projeto com status (pendente, decidida, revisada). Conecta com o desafio do Módulo 2 e cria registro auditável das escolhas técnicas do MVP.

Subtasks:

- [x] Definir estrutura de dados da decisão (id, título, status, contexto, data)
- [x] Gerar scaffold inicial da página `/decisoes` com Claude Code
- [ ] Componente de listagem com filtros por status
- [ ] Integração com backend FastAPI (endpoint `GET /decisoes`)
- [ ] Testes de renderização da listagem

---

## 📋 To-do

### TASK-002 — Instrumentar métrica de validação da hipótese

**Status:** todo
**Responsável:** Robson
**Descrição:** O `docs/enquadramento.md` define hipótese e métrica de validação, mas nada está instrumentado em runtime. Sem evento medido, a hipótese fica como achismo. Esta tarefa fecha esse gap.

Subtasks:

- [ ] Definir qual é o evento principal a medir (ex: "consulta a painel em linguagem natural")
- [ ] Escolher ferramenta de analytics (PostHog, Plausible, ou log próprio em Postgres)
- [ ] Instrumentar evento nas rotas críticas (`/projeto`, `/hipotese`)
- [ ] Documentar como ler a métrica no `docs/enquadramento.md`

---

### TASK-003 — Schema do banco para projetos e MVPs

**Status:** todo
**Responsável:** Robson
**Descrição:** O Postgres já está rodando via Docker Compose, mas o backend FastAPI ainda não tem nenhum schema definido. Sem isso, nenhuma rota consulta dado real. Esta tarefa estabelece a fundação de persistência.

Subtasks:

- [ ] Definir entidades centrais (Projeto, Hipótese, Decisão, Métrica)
- [ ] Escolher ORM/query builder (SQLAlchemy, Prisma, Drizzle)
- [ ] Criar migration inicial com as 4 entidades
- [ ] Seed mínimo (1 projeto de exemplo, 1 hipótese, 2 decisões)

---

## ✅ Concluídas

_(Nenhuma tarefa concluída ainda. Mover para cá quando todas as subtasks estiverem `[x]`.)_
