# Solução — Configurando Ambiente e Primeiro Handoff

**Lição:** Configurando Ambiente e Primeiro Handoff no AsyncMe (Módulo 2)
**Autor:** Robson Sganderla
**Data:** 2026-06-01

Este arquivo consolida as evidências da solução. Cada seção aponta para o artefato versionado correspondente no repositório.

---

## Nota sobre adaptação de ferramentas

Este aluno realizou o exercício em **máquina nova**, sem acesso aos CLIs proprietários do curso (Tasknotes CLI e plataforma AsyncMe). Para preservar 100% do objetivo pedagógico — o ciclo **setup → rastreamento → handoff** — foram adotados equivalentes locais, versionados no próprio repositório:

| Ferramenta original | Equivalente adotado | Localização |
|---|---|---|
| Tasknotes CLI (`tn list`) | Arquivo `TASKS.md` com checklist, status visual e responsável | Raiz do repo |
| AsyncMe (handoff) | Arquivo `HANDOFF.md` com Contexto / Decisões Pendentes / Próximos Passos | Raiz do repo |

A estrutura interna de ambos preserva os campos e diferenciação exigidos pelos critérios de aceitação (status diferenciado, subtasks com `[x]`/`[ ]`, 3 seções obrigatórias no handoff).

---

## 1. Repositório GitHub padronizado

**Repositório:** https://github.com/Robson301190/paris-group-copilot
**Verificação:**

```
.gitignore                                ← Next.js + macOS + VS Code padrão
README.md                                 ← Descrição, stack, instruções de rodar, link para docs
.github/pull_request_template.md          ← Template com Contexto, Mudanças, Estado das hipóteses,
                                            Como testar, Decisões pendentes, Checklist
```

Verificação via `ls -la .github/` e `cat .github/pull_request_template.md` no working tree.

---

## 2. Rastreamento de tarefas (equivalente a `tn list`)

Conteúdo de `TASKS.md` apresentado em formato de listagem com status diferenciado:

```
$ cat TASKS.md   # Equivalente local ao "tn list"

ID         STATUS         RESPONSÁVEL   TÍTULO
─────────────────────────────────────────────────────────────────────────────
TASK-001   in-progress    Robson        Página de Decisões Técnicas
  [x] done       — Definir estrutura de dados da decisão (id, título, status, contexto, data)
  [x] done       — Gerar scaffold inicial da página /decisoes com Claude Code
                   (prompt versionado em docs/prompts/decisoes-scaffold.md)
  [ ] pendente   — Ajustar contraste de textos secundários em dark mode
  [ ] pendente   — Componente de listagem com filtros por status
  [ ] pendente   — Integração com backend FastAPI (endpoint GET /decisoes)
  [ ] pendente   — Testes de renderização da listagem

TASK-002   todo           Robson        Instrumentar métrica de validação da hipótese
  [ ] pendente   — Definir qual é o evento principal a medir
  [ ] pendente   — Escolher ferramenta de analytics (PostHog, Plausible, log próprio)
  [ ] pendente   — Instrumentar evento nas rotas críticas
  [ ] pendente   — Documentar como ler a métrica no docs/enquadramento.md

TASK-003   todo           Robson        Schema do banco para projetos e MVPs
  [ ] pendente   — Definir entidades centrais (Projeto, Hipótese, Decisão, Métrica)
  [ ] pendente   — Escolher ORM/query builder (SQLAlchemy, Prisma, Drizzle)
  [ ] pendente   — Criar migration inicial com as 4 entidades
  [ ] pendente   — Seed mínimo (1 projeto, 1 hipótese, 2 decisões)
─────────────────────────────────────────────────────────────────────────────
Total: 3 tarefas | 1 in-progress, 2 todo | 2 subtasks concluídas, 13 pendentes
```

Atende aos critérios:

- **Exatamente 3 tarefas** ✓
- **Pelo menos uma com subtask `done`** ✓ (TASK-001 tem 2 subtasks done)
- **Status diferenciado entre concluídas e pendentes** ✓ (`[x]` vs `[ ]`, refletindo progresso real da feature de Decisões Técnicas)

Arquivo-fonte completo: [`TASKS.md`](./TASKS.md)

---

## 3. Handoff de estado (equivalente a AsyncMe)

Arquivo-fonte completo: [`HANDOFF.md`](./HANDOFF.md)

Estrutura conforme critérios:

- **Contexto** — estado atual (Next.js + FastAPI + Postgres rodando, health check em `GET /health`, páginas `/projeto`, `/hipotese` e `/decisoes` renderizando), trabalho em andamento (TASK-001 com scaffold materializado), e hipótese central em validação.
- **Decisões pendentes** — duas decisões explicitamente registradas:
  - **Técnica:** Escolha do ORM no backend (inclinação SQLAlchemy, bloqueando TASK-003)
  - **Produto:** Definição do evento principal de validação (consulta natural = chat livre no painel, bloqueando TASK-002)
- **Próximos passos** — três passos no formato `[Nome]: [ação] até [data]`, começando por TASK-002 até 2026-06-03.

---

## 4. Uso do Claude Code para scaffold

### Prompt enviado

Prompt completo e versionado em [`docs/prompts/decisoes-scaffold.md`](./docs/prompts/decisoes-scaffold.md). Continha **critérios de aceitação explícitos** (página compila, badges diferenciadas, sem `"use client"`, importações dos paths corretos) e **limites explícitos do tipo "NÃO faça"** (sem backend, sem filtros, sem testes, sem dependências novas).

### Arquivos gerados

| Arquivo | Conteúdo |
|---|---|
| `src/types/decisao.ts` | Tipo `Decisao` + união `StatusDecisao` |
| `src/data/decisoes-mock.ts` | Array de 3 decisões mock com conteúdo real |
| `src/app/decisoes/page.tsx` | Componente de servidor renderizando lista com badges |

### O que aceitei do scaffold

- **Mocks com conteúdo real do projeto**, não placeholder genérico. Justificativa: continuidade narrativa entre o handoff e a página renderizada.
- **Estrutura `Record<StatusDecisao, string>` para mapas de cor/rótulo das badges.** Justificativa: ponto único de mudança quando um novo status for adicionado.
- **Layout minimalista alinhado às páginas `/projeto` e `/hipotese` existentes.** Justificativa: coerência visual sem custo extra.
- **`data` mantido como `string` ISO, sem conversão para `Date`.** Justificativa: literal ao escopo do prompt.

### O que ajustei após o render visual

- **Contraste em dark mode:** após rodar `npm run dev` e abrir a página, notei que `text-gray-600/700` perde legibilidade sobre o fundo escuro do sistema. Não bloqueei o aceite, mas registrei como nova subtask em `TASKS.md` (TASK-001 → "Ajustar contraste de textos secundários em dark mode"). É o tipo de achado que só aparece com revisão visual real, não na revisão estática do diff.

### O que rejeitei

Nenhuma decisão do Claude Code foi rejeitada nesta iteração. Critério: tudo que foi gerado respeitou os limites do prompt — sem dependências novas, sem backend, sem filtros, sem testes, sem `"use client"`. Quando o prompt é específico, a rejeição cai a quase zero.

### Verificação dos critérios de aceitação do prompt

| Critério | Como foi verificado |
|---|---|
| Compila sem erro de TypeScript | `npm run dev` rodou sem warning bloqueante |
| Badges visualmente diferenciadas (amarelo/verde/azul) | Render confirmado em `http://localhost:3000/decisoes` |
| Importações de `types/` e `data/` corretas | Inspeção do código |
| Sem `"use client"`, apenas renderização estática | Inspeção do código |
| Sem modificação fora dos 3 caminhos | `git status` confirmou |

Detalhamento completo em [`docs/prompts/decisoes-scaffold.md`](./docs/prompts/decisoes-scaffold.md), seção "Revisão do autor — Aceito / Ajustado / Rejeitado".

---

## 5. Histórico de commits — evidência do ciclo

```
2bea70f  docs: atualiza TASKS e HANDOFF após materialização do scaffold de /decisoes
bd28fa8  docs: versiona prompt usado para gerar scaffold de /decisoes
17696a5  feat(decisoes): scaffold inicial da página de Decisões Técnicas
8fcca81  docs: adiciona HANDOFF.md com contexto, decisões pendentes e próximos passos
569c4b6  chore: adiciona TASKS.md para rastreamento local (substituto do Tasknotes)
c2525ce  chore: adiciona template de pull request
```

Cada commit corresponde a uma etapa do ciclo de execução colaborativa.
