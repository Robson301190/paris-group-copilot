# Paris Group Copilot

Copiloto de venture studio para discovery e execução de MVPs com IA. Atende operadoras de Venture Studio que coordenam múltiplos MVPs em paralelo e precisam consolidar hipóteses, métricas e próximas decisões em um único painel consultável por linguagem natural.

## Documentação

- **[Enquadramento do Problema](./docs/enquadramento.md)** — contrato intelectual do produto: persona, dor, hipótese de valor, métrica de validação e fora de escopo.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- Tailwind CSS
- ESLint

## Desenvolvimento Local

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

Rotas iniciais:

- `/` — landing
- `/projeto` — visão geral do projeto
- `/hipotese` — enquadramento do problema e hipótese mensurável
