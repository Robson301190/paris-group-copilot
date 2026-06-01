# Handoff — Paris Group Copilot

**Data:** 2026-06-01
**Autor:** Robson Sganderla
**Para:** equipe / eu-do-futuro / próximo dev que pegar o projeto

---

## Contexto

### O que está feito

- Estrutura inicial da aplicação criada, ambiente configurado e projeto rodando localmente (Next.js no front, FastAPI + Postgres no back via Docker Compose).
- API básica funcionando, com health check em `GET /health` e organização inicial de rotas e arquitetura.
- Páginas `/projeto` e `/hipotese` no front renderizando o enquadramento documental do produto.
- Documentação (`docs/enquadramento.md`), backlog (`TASKS.md`) e template de PR (`.github/pull_request_template.md`) configurados para orientar próximas etapas.

### O que está em andamento

- **TASK-001 — Página de Decisões Técnicas (`/decisoes`)**: scaffold materializado em `src/app/decisoes/page.tsx`, com tipo `Decisao` em `src/types/decisao.ts` e mocks em `src/data/decisoes-mock.ts`. Prompt usado está versionado em `docs/prompts/decisoes-scaffold.md`. Pendente: ajuste de contraste em dark mode, filtros por status, integração com FastAPI e testes.

### Maior risco / hipótese central

A principal incerteza do projeto **não é técnica, é de validação de produto**: precisamos confirmar que o público-alvo (operadoras de Venture Studio coordenando múltiplos MVPs) enxerga valor real na consulta natural a insights consolidados — e que esse uso é recorrente, não pontual. Antes de escalar tecnicamente, é esse comportamento que precisa ser observado.

---

## Decisões pendentes

### Técnica — Escolha do ORM no backend

- **Pergunta:** SQLAlchemy, Prisma ou Drizzle para a camada de persistência do FastAPI?
- **Inclinação atual:** SQLAlchemy, pelo grau de maturidade no ecossistema Python e adoção ampla na comunidade.
- **Por que ainda não bati o martelo:** Falta validar, no contexto específico deste projeto, os requisitos de modelagem (entidades Projeto/Hipótese/Decisão/Métrica), o fluxo de migrações e a produtividade do dia a dia. Decisão só se sustenta depois de um spike pequeno.
- **Impacto no bloqueio:** Trava a TASK-003 (Schema do banco) — sem ORM definido, não tem como gerar a migration inicial.

### Produto — Definição do evento principal de validação

- **Pergunta:** Qual é o evento que melhor indica que a hipótese central está sendo validada?
- **Inclinação atual:** A realização de **consultas naturais ao sistema** — entendida concretamente como **uma interface de chat livre dentro do painel**, onde o usuário faz perguntas em linguagem natural sem depender de filtros estruturados.
- **Por que ainda não bati o martelo:** Preciso observar nos primeiros testes quais comportamentos efetivamente representam valor — consulta isolada pode ser curiosidade, consulta repetida no mesmo projeto provavelmente é uso real. A definição precisa diferenciar "uso experimental" de "uso recorrente".
- **Impacto no bloqueio:** Trava a TASK-002 (Instrumentação da métrica) — sem evento definido, não há o que instrumentar.

---

## Próximos passos

- [ ] **Robson:** Fechar TASK-002 (Instrumentar métrica de validação) — definir o evento principal, escolher a ferramenta de analytics e instrumentar nas rotas críticas. **Prazo: 2026-06-03 (2 dias).**
- [ ] **Robson:** Em seguida, atacar TASK-003 (Schema do banco), começando por um spike rápido comparando SQLAlchemy vs alternativas no contexto real do projeto.
- [ ] **Robson:** Retomar TASK-001 (Página de Decisões Técnicas) depois que o schema estiver definido, para conectar a página com persistência real.

### Por que essa ordem

TASK-002 vem primeiro porque **a definição do evento de validação orienta todas as decisões seguintes** — se descobrirmos que o comportamento de valor não é "consulta natural" mas outro, isso muda inclusive a prioridade técnica. Não faz sentido modelar o banco antes de saber o que precisa ser observado.

---

## Notas para quem pegar isso depois

- Os arquivos de governança (`AGENTS.md`, `CLAUDE.md`, `docs/enquadramento.md`) descrevem o contrato intelectual do produto. Ler antes de propor mudanças de escopo.
- Commits estão saindo com identidade `*.local` no Mac — corrigir com `git config --global user.email` antes do próximo push pra que os commits apareçam linkados no GitHub.
