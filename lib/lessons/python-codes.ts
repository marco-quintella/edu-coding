/**
 * Códigos iniciais do curso "Python para Devs".
 * Formato igual ao initial-codes.ts do IA para Devs.
 */
import { INITIAL_CODES as IA_CODES } from './initial-codes'

export const PYTHON_CODES: Record<string, string> = {
  // ── Lição 1: Fundamentos ───────────────────────────────────
  'python-ex1': `peso = 70.0
altura = 1.75

# TODO: calcule o IMC = peso / altura² e classifique
# <18.5 magro | <25 normal | <30 sobrepeso | >=30 obeso
imc = 0
classificacao = ""

print(f"IMC = {imc:.2f} ({classificacao})")`,

  'python-ex2': `soma = 0

# TODO: some apenas os números PARES de 1 a 10
# Dica: use range(1, 11) e o operador % 2

print(f"soma dos pares = {soma}")`,

  'python-projeto': `def validar(senha):
    faltas = []
    # TODO: exige mínimo 8 chars, 1 maiúscula, 1 número
    # use len(), any(c.isupper() for c in senha), any(c.isdigit() ...)
    return faltas

senha = "abcdefgh"  # 8 chars, mas sem maiúscula nem número
print(f"faltam: {validar(senha)}")`,
}

/** Código inicial combinado (IA + Python). */
export function getCourseInitialCode(lessonSlug: string): string {
  return PYTHON_CODES[lessonSlug] ?? IA_CODES[lessonSlug] ?? ''
}
