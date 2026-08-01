#!/bin/sh
# Start script para produção (Railway / Railpack)
# 1. Migrations (sempre)
# 2. Seed (somente quando RUN_SEED=true — disparo manual)
# 3. CLI railway (para sandbox exec) — se não estiver instalado
# 4. Inicia o app (next start — sem standalone)
set -e

echo "[start] rodando migrations..."
npx drizzle-kit migrate || echo "[start] WARN: migrations falharam (tentando seguir)"

if [ "$RUN_SEED" = "true" ]; then
  echo "[start] RUN_SEED=true — rodando seed..."
  tsx scripts/seed-ia-para-devs.ts
fi

echo "[start] garantindo railway CLI..."
command -v railway >/dev/null 2>&1 || npm i -g @railway/cli --silent

echo "[start] iniciando app..."
exec npm run start
