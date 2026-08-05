---
title: Fase 03 — LLMs (Prompts, CoT, LangChain)
---

# Fase 03 — LLMs: Prompts, CoT e LangChain

## Os 4 pilares do prompt

1. **Papel** — "Você é um professor de ML"
2. **Contexto** — dados relevantes da tarefa
3. **Tarefa específica** — o que fazer, sem ambiguidade
4. **Formato da saída** — "responda em JSON com chave resposta"

## Chain of Thought

```
"Resolva passo a passo" → modelo raciocina antes da resposta final
```

- Divide problema multi-passo em etapas (menos erro)
- Custa mais tokens

## Segurança

- **Prompt injection**: input do usuário tentando sequestrar o prompt do sistema → tratar input como DADO, nunca instrução
- **BYOK**: chave do aluno transfere responsabilidade (LGPD)

## LangChain

```python
# Chain: cada etapa recebe a saída da anterior
chain = prompt | model | parser | formatador
```

- **Chain**: composição de funções
- **Agent**: LLM decide quais ferramentas chamar em loop
- **RAG**: buscar em dados próprios (vetores) → injetar no prompt
  - Use quando a resposta depende de dados privados/atualizados

## Decisão rápida

| Precisa | Use |
|---|---|
| Dados próprios/atualizados | RAG |
| Ferramentas/loops de decisão | Agent |
| Raciocínio multi-passo | CoT |
| Saída estruturada | Prompt com formato + parser |
