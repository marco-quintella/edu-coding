#!/bin/sh
# Start script para produção (Railway / Railpack)
# 1. Migrations (sempre)
# 2. CLI railway (para sandbox exec) — se não estiver instalado
# 3. Copia static + public para o standalone (o Next standalone não inclui)
# 4. Roda o server standalone (funciona com output: standalone)
set -e

echo "[start] rodando migrations..."
npx drizzle-kit migrate || echo "[start] WARN: migrations falharam (tentando seguir)"

echo "[start] garantindo railway CLI..."
command -v railway >/dev/null 2>&1 || npm i -g @railway/cli --silent

echo "[start] preparando standalone..."
STANDALONE_DIR=".next/standalone"
STATIC_SRC=".next/static"
PUBLIC_SRC="public"

if [ -d "$STANDALONE_DIR" ]; then
  # Copia .next/static → .next/standalone/.next/static
  if [ -d "$STATIC_SRC" ] && [ ! -d "$STANDALONE_DIR/.next/static" ]; then
    echo "[start] copiando $STATIC_SRC → $STANDALONE_DIR/.next/static"
    mkdir -p "$STANDALONE_DIR/.next"
    cp -r "$STATIC_SRC" "$STANDALONE_DIR/.next/static"
  fi
  # Copia public → .next/standalone/public
  if [ -d "$PUBLIC_SRC" ] && [ ! -d "$STANDALONE_DIR/public" ]; then
    echo "[start] copiando $PUBLIC_SRC → $STANDALONE_DIR/public"
    cp -r "$PUBLIC_SRC" "$STANDALONE_DIR/public"
  fi
  # Copia content (MDX lições) — o fs.readFile precisa delas em runtime
  if [ -d "content" ] && [ ! -d "$STANDALONE_DIR/content" ]; then
    echo "[start] copiando content → $STANDALONE_DIR/content"
    cp -r content "$STANDALONE_DIR/content"
  fi
  echo "[start] iniciando server standalone..."
  exec node "$STANDALONE_DIR/server.js"
else
  echo "[start] WARN: standalone não encontrado, usando next start..."
  exec npm run start
fi
