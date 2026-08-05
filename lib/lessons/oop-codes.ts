/**
 * Códigos iniciais do curso "Orientação a Objetos com Python".
 * stdlib — roda no sandbox ml-base.
 * Chaves únicas por lição (prefixo: oop / oop-h / oop-e).
 */

export const OOP_CODES: Record<string, string> = {
  // ── Lição 1: Classes (hands-on) ────────────────────────────
  'oop-classes': `# Classes, __init__ e métodos
class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo

    def depositar(self, valor):
        self.saldo += valor

c = Conta("Ana", 100)
c.depositar(50)
print(f"saldo: {c.saldo}")
print(f"titular: {c.titular}")`,

  'oop-ex1': `# TODO: classe Conta com depositar e sacar
class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo

    def depositar(self, valor):
        self.saldo += valor

    def sacar(self, valor):
        # TODO: devolva False se valor > saldo; senão subtraia e devolva True
        if valor > self.saldo:
            return False
        self.saldo -= valor
        return True

c = Conta("Ana", 100)
c.depositar(50)
ok = c.sacar(30)
print(f"saldo: {c.saldo}")
print(f"sacar 30: {ok}")`,

  'oop-ex2': `# TODO: classe Produto com desconto
class Produto:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco

    def com_desconto(self, percentual):
        return self.preco * (1 - percentual / 100)

p = Produto("teclado", 120)
print(f"10%: {p.com_desconto(10):.2f}")
print(f"25%: {p.com_desconto(25):.2f}")`,

  'oop-projeto': `# TODO: classe Carrinho com adicionar e total
class Carrinho:
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

  // ── Lição 2: Herança (hands-on) ────────────────────────────
  'oop-heranca': `# Herança e polimorfismo
class Animal:
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

  'oop-h-ex1': `# TODO: Cachorro e Gato herdando de Animal com sons próprios
class Animal:
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

  'oop-h-ex2': `# TODO: Gerente herda de Funcionario e sobrescreve o bônus (20%)
class Funcionario:
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

  'oop-h-projeto': `# TODO: Carro e Moto com descrições específicas
class Veiculo:
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

  // ── Lição 3: Encapsulamento (hands-on) ─────────────────────
  'oop-encapsulamento': `# Encapsulamento e @property
class ContaBancaria:
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
print(f"titular: {c.titular}")
print(f"saldo: R\${c.saldo:.0f}")`,

  'oop-e-ex1': `# TODO: atributo privado __idade com método e_maior
class Cliente:
    def __init__(self, nome, idade):
        self.nome = nome
        self.__idade = idade

    def e_maior(self):
        return self.__idade >= 18

c = Cliente("Ana", 25)
print(f"nome: {c.nome}")
print(f"maior: {c.e_maior()}")`,

  'oop-e-ex2': `# TODO: getter e setter de fahrenheit
class Temperatura:
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

  'oop-e-projeto': `# TODO: conta com saldo protegido por @property
class ContaBancaria:
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
}
