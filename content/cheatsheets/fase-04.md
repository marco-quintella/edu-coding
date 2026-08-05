---
title: Fase 04 — Multimídia (Vídeo, Áudio, Texto)
---

# Fase 04 — Análise de Vídeo, Áudio e Texto

## Pipeline multimodal (áudio)

```python
áudio → transcrição (Whisper) → texto → análise (sentimento, entidades)
```

- **Whisper** (OpenAI): referência em speech-to-text, multilíngue
- **Diarização**: identificar quem falou e quando

## Texto estruturado

```python
# TF-IDF + Naive Bayes = classificação de texto
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

model = MultinomialNB().fit(X_tfidf, y)
```

## Amazon Textract

```python
# OCR que entende ESTRUTURA (não só texto achatado)
# - Tabelas com células preservadas
# - Formulários com chave-valor (nome: Maria, CPF: ...)
# Pipeline: extrair → estruturar (JSON) → calcular/validar
```

- **OCR tradicional**: texto corrido
- **Textract**: blocos organizados → automatiza notas fiscais, KYC

## Decisão rápida

| Tarefa | Serviço |
|---|---|
| Transcrever áudio | Whisper / Speech-to-Text |
| Texto em imagem | OCR / Computer Vision |
| Documento estruturado (nota fiscal) | Textract / Document Intelligence |
| Sentimento em texto | Text Analytics / Comprehend |
