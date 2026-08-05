---
title: Fase 05 — Privacidade, Segurança e Anomalias
---

# Fase 05 — LGPD, Anomalias e Cloud

## LGPD (checklist rápido)

- [ ] **Minimização**: colete só o necessário (menos dados = menos risco)
- [ ] **Base legal** documentada para cada finalidade
- [ ] **Pseudonimização/anonimização** antes de treinar
- [ ] Logs com **IDs opacos** (hash), nunca email/CPF
- [ ] **Retenção definida** (TTL) para inputs e outputs
- [ ] Direito de **exclusão** sob demanda
- [ ] Incidente → notificação **ANPD em 72h**

```python
# Logs sem dados pessoais — hash irreversível
import hashlib
id_opaco = hashlib.sha256(email.encode()).hexdigest()[:12]
```

> ⚠️ Pseudonimização ≠ anonimização (hash pode ser revertido por dicionário)

## Detecção de anomalias

```python
# Estatístico (1D, dados normais)
z = np.abs((dados - media) / desvio)
anomalias = dados[z > 3]   # cuidado: falha com poucos dados

# Isolation Forest (multidimensional, default)
from sklearn.ensemble import IsolationForest
model = IsolationForest(contamination=0.03, random_state=42)
labels = model.fit_predict(X)   # 1 = normal, -1 = anômalo
```

- **contamination**: fração esperada de anômalos (trade-off)
- **Concept drift**: o "normal" muda → re-treinar

## API pronta vs modelo próprio

| Situação | Escolha |
|---|---|
| Tarefa genérica + volume baixo | API pronta (Cognitive Services) |
| Domínio específico (jargão) | Modelo próprio |
| Dados SENSÍVEIS | Modelo próprio (obrigatório) |

> Sensibilidade sobrepõe genericidade — prontuário médico não sai para API cloud.

## Azure Cognitive Services (mapa)

| Família | Serviços |
|---|---|
| Vision | Computer Vision, Face, OCR |
| Speech | Speech-to-Text, TTS |
| Language | Text Analytics, LUIS |
| Search | Cognitive Search (RAG) |
| Decision | Anomaly Detector |
