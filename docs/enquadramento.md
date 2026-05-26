# Enquadramento — Paris Group Copilot

Este documento é o **contrato intelectual do produto**. Qualquer feature, decisão de arquitetura ou priorização daqui pra frente deve ser justificável por ele. Se não é, está fora.

## Contexto

Mariana é fundadora-operadora e head de product/discovery em um Venture Studio, acompanhando simultaneamente 3 a 5 MVPs em estágios diferentes de validação. Ela usa o Copilot principalmente durante revisões semanais, alinhamentos com fundadores e momentos de tomada de decisão rápida sobre hipóteses, métricas e próximos passos. Hoje, o contexto dos MVPs está fragmentado entre Notion, WhatsApp, planilhas e slides, sem um source of truth centralizado, fazendo com que grande parte do estado real dos projetos exista apenas na cabeça dela.

## Dor do Usuário

Mariana perde entre 6 e 10 horas por semana reconstruindo contexto antes e durante reuniões de alinhamento com fundadores, sócios e board, porque o estado real dos 3 a 5 MVPs está fragmentado entre Notion, WhatsApp, planilhas e slides, sem um source of truth centralizado.

A pior parte acontece quando ela é interrompida no meio de uma discussão estratégica por perguntas simples de contexto, precisando parar para "garimpar" decisões, hipóteses e aprendizados em ferramentas diferentes. Mesmo sendo a pessoa que mais conhece os MVPs, ela frequentemente sente que está operando no improviso, com perda de fluidez, confiança e velocidade nas decisões.

## Hipótese de Valor

> **Se** o Copilot gerar automaticamente um pré-briefing antes de cada reunião de alinhamento, consolidando hipóteses validadas, decisões recentes, métricas e próximos passos a partir de Notion, WhatsApp, planilhas e slides, **então** Mariana conseguirá conduzir reuniões com contexto e fluidez sem precisar garimpar informações ou reconstruir mentalmente o estado dos MVPs em tempo real.

Isso funciona porque o problema deixa de ser resolvido sob pressão durante a reunião e passa a ser tratado de forma assíncrona, com o contexto já agregado e organizado antes da conversa acontecer.

## Métrica de Validação

**Métrica principal:** reduzir de 6–10 horas para menos de 2 horas semanais o tempo gasto preparando reuniões e reconstruindo contexto dos MVPs, em até 8 semanas de uso do Copilot.

**Proxy de adoção:** pelo menos 70% das reuniões estratégicas entre Mariana, fundadores e sócios devem utilizar os pré-briefings gerados pelo sistema.

**Como medimos:** self-tracking estruturado da própria Mariana, registrando semanalmente o tempo gasto em preparação de reuniões, busca de contexto e reconstrução manual de informações antes e durante os alinhamentos.

## Fora de Escopo (MVP)

- **Chat on-demand em tempo real durante reuniões:** fica fora do MVP porque exige retrieval altamente confiável sob pressão, aumentando muito o risco técnico e de perda de confiança no sistema.
- **Multi-tenant, login e permissões avançadas:** o MVP será single-tenant e centrado na rotina da Mariana, priorizando velocidade de validação antes de expandir para outros usuários do studio.
- **Escrita de volta nas ferramentas (Notion, planilhas, etc.):** o Copilot apenas lê e consolida contexto no MVP, evitando complexidade operacional e risco de alterar informações críticas.
- **Sugestões estratégicas automáticas ou geração de hipóteses novas:** o objetivo inicial é organizar e sintetizar contexto existente, não substituir a tomada de decisão da Mariana.
- **Aplicativo mobile nativo:** o uso principal acontece no desktop antes de reuniões e alinhamentos, então o MVP prioriza entrega web/assíncrona em vez de experiência mobile.
- **Histórico completo e ingestão retroativa de todos os MVPs:** o MVP focará apenas em contexto recente e operacionalmente relevante, reduzindo custo de ingestão e complexidade inicial.
