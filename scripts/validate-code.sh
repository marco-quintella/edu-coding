#!/usr/bin/env bash
# Valida outputs de exercícios Python no venv local (mesma versão do sandbox).
# Uso: ./scripts/validate-code.sh <arquivo.py> [args...]
set -euo pipefail
env -u PYTHONPATH /tmp/edu-validate/bin/python "$@"
