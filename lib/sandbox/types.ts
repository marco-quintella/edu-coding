export interface ExecResult {
  stdout: string
  stderr: string
  exitCode: number
  durationMs: number
  /** Plots matplotlib capturados (PNG em base64, sem prefixo data:) */
  plots?: string[]
}

export interface SandboxOptions {
  checkpointId: string
  env?: Record<string, string>
  timeoutSec?: number
  pythonPath?: string
  /** 'python' (padrão) ou 'node' — muda o binário e o wrapper */
  runtime?: 'python' | 'node'
}
