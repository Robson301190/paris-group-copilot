# Prompt — Scaffold inicial da página de Decisões Técnicas

**Data:** 2026-06-01
**Autor:** Robson Sganderla
**Contexto:** TASK-001, subtasks "Definir estrutura de dados" e "Scaffold inicial"

---

## Prompt enviado ao Claude Code

> Gere o scaffold mínimo da página `/decisoes` no Paris Group Copilot.
>
> **Stack do projeto (já em uso, não introduza novas dependências):**
> - Next.js 14+ com App Router
> - TypeScript
> - Tailwind CSS
> - Estrutura de páginas em `src/app/<rota>/page.tsx`
>
> **Escopo (faça apenas isto):**
> 1. Crie `src/app/decisoes/page.tsx` — componente de servidor que renderiza uma lista de decisões.
> 2. Crie `src/types/decisao.ts` — tipo TypeScript `Decisao` com os campos: `id` (string), `titulo` (string), `contexto` (string), `status` ("pendente" | "decidida" | "revisada"), `data` (string ISO).
> 3. Crie `src/data/decisoes-mock.ts` — array de 3 decisões mock para renderização inicial.
> 4. Na página, renderize título, lista das decisões (cada item com título, status visual via badge colorido com Tailwind, contexto e data) e um cabeçalho explicando o propósito da página em 1 linha.
>
> **Critérios de aceitação:**
> - A página compila sem erro de TypeScript.
> - Visualmente legível, com badges de status diferenciadas (cores Tailwind: amarelo=pendente, verde=decidida, azul=revisada).
> - O tipo `Decisao` é importado da pasta `types/`, e os mocks de `data/`.
> - Nenhum estado client-side, nenhum `"use client"` — apenas renderização estática.
>
> **NÃO faça:**
> - NÃO crie endpoint FastAPI, migration, ou qualquer integração com backend.
> - NÃO crie filtros, formulários ou interação client-side.
> - NÃO instale dependências novas.
> - NÃO modifique arquivos fora dos três caminhos listados.
> - NÃO escreva testes.

---

## Resultado gerado

Três arquivos criados, todos dentro dos limites do prompt:

- `src/types/decisao.ts` — define `Decisao` e o subtipo `StatusDecisao`.
- `src/data/decisoes-mock.ts` — array com 3 decisões reais e relevantes ao projeto (ORM, evento de validação, stack inicial).
- `src/app/decisoes/page.tsx` — componente de servidor (sem `"use client"`), renderiza cabeçalho, lista, badges de status.

### Decisões da execução

- **Mocks com conteúdo real, não placeholder:** as 3 decisões refletem as discussões reais do handoff (ORM pendente, evento de validação pendente, stack já decidida). Isso facilita revisão visual e dá continuidade narrativa quando o backend entrar.
- **Mapas `STATUS_BADGE` e `STATUS_LABEL` fora do componente:** evita lookup em tempo de render e centraliza a regra de cor/rótulo por status. Se um dia entrar um quarto status, muda em um lugar só.
- **Layout minimalista (`max-w-3xl`, espaçamento Tailwind 4):** alinhado ao estilo simples das páginas `/projeto` e `/hipotese` já existentes.

### Pontos abertos para revisão do autor

- Cor das badges segue o critério literal do prompt (amarelo/verde/azul). Se a paleta do design system evoluir, esse mapa é o ponto único de mudança.
- A página não tem ainda nenhum link de navegação entrando ou saindo. Adicionar entrada no menu/landing fica como subtask futura, fora do escopo deste scaffold.

---

## Revisão do autor — Aceito / Ajustado / Rejeitado

Decisões tomadas pelo Claude Code que não estavam **literalmente** no prompt e como o autor revisou cada uma:

### ✅ Aceito sem modificação

- **Mocks com conteúdo real, refletindo decisões do projeto** (ORM pendente, evento de validação pendente, stack já decidida).
  Justificativa: dá continuidade narrativa — abrir `/decisoes` mostra o estado real, não dummy data. Acelera o feedback visual e prepara o terreno para o backend.
- **Mapas `STATUS_BADGE` e `STATUS_LABEL` como `Record<StatusDecisao, string>` fora do componente.**
  Justificativa: centralização da regra de cor/rótulo. Quando entrar um quarto status (ex: "revogada"), muda em um lugar só. Tradeoff de complexidade aceitável para 3 itens.
- **Layout minimalista (`max-w-3xl`, `space-y-4`, padding com Tailwind).**
  Justificativa: alinha com o estilo enxuto das páginas `/projeto` e `/hipotese` já existentes no repo. Coerência visual sem trabalho extra.
- **`data` mantido como `string` ISO, sem conversão para `Date`.**
  Justificativa: literal ao prompt. Formatação amigável vira requisito separado quando o produto precisar.

### ⚠️ Ajustado após render visual

- **Contraste dos textos secundários em dark mode.**
  No render real, `text-gray-600/700` ficou com legibilidade reduzida sobre fundo escuro do sistema. Não bloqueia aceite do scaffold, mas vira nova subtask na TASK-001 do `TASKS.md` para iteração próxima (mover para tons claros como `text-gray-300/400` quando dark mode for tratado oficialmente).

### ❌ Rejeitado (nada por enquanto)

Nenhuma decisão do Claude Code foi rejeitada nesta iteração. Critério: tudo que foi gerado respeitou os limites do prompt (sem dependências novas, sem backend, sem filtros, sem testes, sem `"use client"`).

### Critérios de aceitação do prompt — verificação final

| Critério | Status |
|---|---|
| Página compila sem erro de TypeScript | ✅ Confirmado via `npm run dev` |
| Visualmente legível com badges diferenciadas (amarelo/verde/azul) | ✅ Confirmado via render em `http://localhost:3000/decisoes` |
| Tipo `Decisao` importado de `types/`, mocks de `data/` | ✅ Confirmado no código |
| Nenhum `"use client"`, apenas renderização estática | ✅ Confirmado no código |
| Nada fora dos 3 caminhos listados foi modificado | ✅ Confirmado no `git status` |
