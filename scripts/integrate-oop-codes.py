"""Integra OOP_CODES no initial-codes + teste + soluções."""
# 1. initial-codes.ts
src = open('lib/lessons/initial-codes.ts').read()
src = src.replace("import { REGEX_CODES } from './regex-codes'", "import { REGEX_CODES } from './regex-codes'\nimport { OOP_CODES } from './oop-codes'")
src = src.replace("    REGEX_CODES[lessonSlug] ??", "    REGEX_CODES[lessonSlug] ??\n    OOP_CODES[lessonSlug] ??")
open('lib/lessons/initial-codes.ts', 'w').write(src)
print("initial-codes integrado")

# 2. teste
t = open('lib/lessons/__tests__/initial-codes.test.ts').read()
t = t.replace("import { REGEX_CODES } from '../regex-codes'", "import { REGEX_CODES } from '../regex-codes'\nimport { OOP_CODES } from '../oop-codes'")
t = t.replace("  'regex-a-projeto',\n]", "  'regex-a-projeto',\n  // Curso OOP Python\n  'oop-classes',\n  'oop-ex1',\n  'oop-ex2',\n  'oop-projeto',\n  'oop-heranca',\n  'oop-h-ex1',\n  'oop-h-ex2',\n  'oop-h-projeto',\n  'oop-encapsulamento',\n  'oop-e-ex1',\n  'oop-e-ex2',\n  'oop-e-projeto',\n]")
t = t.replace("""    // Códigos do curso Regex começam com import
    for (const [slug, code] of Object.entries(REGEX_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }""",
"""    // Códigos do curso Regex começam com import
    for (const [slug, code] of Object.entries(REGEX_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é import em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#)/)
    }
    // Códigos do curso OOP começam com comentário ou class
    for (const [slug, code] of Object.entries(OOP_CODES)) {
      const firstLine = code.split('\\n').find((l) => l.trim() !== '')
      expect(
        firstLine,
        `primeira linha não é comentário/class em ${slug}: ${firstLine}`,
      ).toMatch(/^(import |from |#|class |def )/)
    }""")
open('lib/lessons/__tests__/initial-codes.test.ts', 'w').write(t)
print("teste atualizado")

# 3. soluções
s = open('lib/lessons/solutions.ts').read()
oop_solutions = '''
  // ── Curso OOP Python ───────────────────────────────────────
  'oop-ex1': {
    explanation:
      'sacar devolve False se valor > saldo; senão subtrai e devolve True. 100+50-30 = 120.',
    code: `class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo

    def depositar(self, valor):
        self.saldo += valor

    def sacar(self, valor):
        if valor > self.saldo:
            return False
        self.saldo -= valor
        return True

c = Conta("Ana", 100)
c.depositar(50)
ok = c.sacar(30)
print(f"saldo: {c.saldo}")
print(f"sacar 30: {ok}")`,
  },
  'oop-ex2': {
    explanation:
      'com_desconto aplica a fórmula preco * (1 - p/100). 120 com 10% = 108, com 25% = 90.',
    code: `class Produto:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco

    def com_desconto(self, percentual):
        return self.preco * (1 - percentual / 100)

p = Produto("teclado", 120)
print(f"10%: {p.com_desconto(10):.2f}")
print(f"25%: {p.com_desconto(25):.2f}")`,
  },
  'oop-projeto': {
    explanation:
      'self.itens é lista; adicionar faz append de dict; total soma com generator. 120+60 = 180.',
    code: `class Carrinho:
    def __init__(self):
        self.itens = []

    def adicionar(self, nome, preco):
        self.itens.append({"nome": nome, "preco": preco})

    def total(self):
        return sum(i["preco"] for i in self.itens)

car = Carrinho()
car.adicionar("teclado", 120)
car.adicionar("mouse", 60)
print(f"itens: {len(car.itens)}")
print(f"total: R\${car.total():.0f}")`,
  },
  'oop-h-ex1': {
    explanation:
      'Herança: Cachorro(Animal) herda __init__ e nome; override de falar() dá o som próprio. Polimorfismo no loop.',
    code: `class Animal:
    def __init__(self, nome):
        self.nome = nome

    def falar(self):
        return "..."

class Cachorro(Animal):
    def falar(self):
        return "au au!"

class Gato(Animal):
    def falar(self):
        return "miau!"

animais = [Cachorro("Rex"), Gato("Mimi")]
for a in animais:
    print(f"{a.nome}: {a.falar()}")`,
  },
  'oop-h-ex2': {
    explanation:
      'Override: Gerente redefine bonus() para 20%. 5000 * 0.2 = 1000 (vs 10% do funcionário).',
    code: `class Funcionario:
    def __init__(self, nome, salario):
        self.nome = nome
        self.salario = salario

    def bonus(self):
        return self.salario * 0.10

class Gerente(Funcionario):
    def bonus(self):
        return self.salario * 0.20

f = Funcionario("Ana", 3000)
g = Gerente("Bob", 5000)
print(f"funcionario: R\${f.bonus():.0f}")
print(f"gerente: R\${g.bonus():.0f}")`,
  },
  'oop-h-projeto': {
    explanation:
      'Cada subclasse sobrescreve descricao() — o mesmo método se comporta diferente por tipo (polimorfismo).',
    code: `class Veiculo:
    def __init__(self, marca):
        self.marca = marca

    def descricao(self):
        return f"veiculo {self.marca}"

class Carro(Veiculo):
    def descricao(self):
        return f"carro {self.marca}"

class Moto(Veiculo):
    def descricao(self):
        return f"moto {self.marca}"

for v in [Carro("Toyota"), Moto("Honda")]:
    print(v.descricao())`,
  },
  'oop-e-ex1': {
    explanation:
      'self.__idade é privado (name mangling: _Cliente__idade). Só os métodos da classe acessam.',
    code: `class Cliente:
    def __init__(self, nome, idade):
        self.nome = nome
        self.__idade = idade

    def e_maior(self):
        return self.__idade >= 18

c = Cliente("Ana", 25)
print(f"nome: {c.nome}")
print(f"maior: {c.e_maior()}")`,
  },
  'oop-e-ex2': {
    explanation:
      'Getter @property calcula F de C; setter converte de volta. (100-32)*5/9 = 37.8.',
    code: `class Temperatura:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def fahrenheit(self):
        return self.celsius * 9 / 5 + 32

    @fahrenheit.setter
    def fahrenheit(self, valor):
        self.celsius = (valor - 32) * 5 / 9

t = Temperatura(25)
print(f"25C = {t.fahrenheit:.1f}F")
t.fahrenheit = 100
print(f"100F = {t.celsius:.1f}C")`,
  },
  'oop-e-projeto': {
    explanation:
      'Saldo protegido: __saldo só muda por depositar(); @property expõe leitura. 1000+500 = 1500.',
    code: `class ContaBancaria:
    def __init__(self, titular):
        self.titular = titular
        self.__saldo = 0

    def depositar(self, valor):
        self.__saldo += valor

    @property
    def saldo(self):
        return self.__saldo

c = ContaBancaria("Ana")
c.depositar(1000)
c.depositar(500)
print(f"titular: {c.titular}")
print(f"saldo: R\${c.saldo:.0f}")`,
  },
}
'''
idx = s.rindex('}\n\n/** Busca a solução')
s = s[:idx] + oop_solutions + s[idx:]
open('lib/lessons/solutions.ts', 'w').write(s)
print("soluções OOP adicionadas")
