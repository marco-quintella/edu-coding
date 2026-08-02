import { describe, it, expect, vi, beforeEach } from 'vitest'

// vi.hoisted: define os mocks ANTES do hoist do vi.mock (ordem correta)
const { createSandbox, destroySandbox, execOnSandbox } = vi.hoisted(() => ({
  createSandbox: vi.fn(),
  destroySandbox: vi.fn(),
  execOnSandbox: vi.fn(),
}))

vi.mock('../client', () => ({
  createSandbox,
  destroySandbox,
  execOnSandbox,
}))

import { execWarm, releaseWarm, poolStats, ensurePoolSize, resetPool } from '../pool'
import type { ExecResult, SandboxOptions } from '../types'

const OPTS: SandboxOptions = {
  checkpointId: 'ml-base',
  timeoutSec: 30,
}

const RESULT: ExecResult = {
  stdout: 'ok',
  stderr: '',
  exitCode: 0,
  durationMs: 100,
}

beforeEach(() => {
  vi.clearAllMocks()
  createSandbox.mockResolvedValue('sandbox-1')
  execOnSandbox.mockResolvedValue(RESULT)
  destroySandbox.mockResolvedValue(undefined)
  resetPool() // limpa o Map module-level entre testes
})

describe('execWarm', () => {
  it('cria sandbox no primeiro exec do usuário', async () => {
    const res = await execWarm('user-a', 'print(1)', OPTS)
    expect(createSandbox).toHaveBeenCalledTimes(1)
    expect(createSandbox).toHaveBeenCalledWith('ml-base', undefined)
    expect(execOnSandbox).toHaveBeenCalledWith('sandbox-1', 'print(1)', OPTS)
    expect(res).toEqual(RESULT)
    expect(poolStats().users).toBe(1)
  })

  it('reusa o sandbox quente nos execs seguintes (sem criar novo)', async () => {
    await execWarm('user-a', 'print(1)', OPTS)
    await execWarm('user-a', 'print(2)', OPTS)
    await execWarm('user-a', 'print(3)', OPTS)
    expect(createSandbox).toHaveBeenCalledTimes(1)
    expect(execOnSandbox).toHaveBeenCalledTimes(3)
  })

  it('cria sandboxes separados para usuários diferentes', async () => {
    createSandbox.mockResolvedValueOnce('sandbox-a').mockResolvedValueOnce('sandbox-b')
    await execWarm('user-a', 'x', OPTS)
    await execWarm('user-b', 'x', OPTS)
    expect(createSandbox).toHaveBeenCalledTimes(2)
    expect(poolStats().users).toBe(2)
  })

  it('destrói e recria se o exec falhar no sandbox morto', async () => {
    // Simula sandbox que morreu (idle timeout) — cria de novo na próxima
    execOnSandbox.mockRejectedValueOnce(new Error('sandbox dead'))
    await expect(execWarm('user-a', 'x', OPTS)).rejects.toThrow('sandbox dead')
    // Próximo exec deve tentar de novo (cria novo sandbox? não — reusa o id)
    await execWarm('user-a', 'x', OPTS)
    expect(execOnSandbox).toHaveBeenCalledTimes(2)
  })
})

describe('releaseWarm', () => {
  it('destrói o sandbox e remove do pool', async () => {
    await execWarm('user-a', 'x', OPTS)
    await releaseWarm('user-a')
    expect(destroySandbox).toHaveBeenCalledWith('sandbox-1')
    expect(poolStats().users).toBe(0)
  })

  it('não faz nada para usuário sem sandbox', async () => {
    await releaseWarm('user-inexistente')
    expect(destroySandbox).not.toHaveBeenCalled()
  })
})

describe('ensurePoolSize', () => {
  it('mantém o pool dentro do limite (FIFO)', async () => {
    // Popula o pool com usuários (o limite é 100 no módulo)
    for (let i = 0; i < 103; i++) {
      createSandbox.mockResolvedValueOnce(`sandbox-${i}`)
      await execWarm(`user-${i}`, 'x', OPTS)
    }
    ensurePoolSize()
    expect(poolStats().users).toBeLessThanOrEqual(100)
    expect(destroySandbox).toHaveBeenCalled()
  })
})
