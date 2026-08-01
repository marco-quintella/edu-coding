export interface ExecResult {
  stdout: string
  stderr: string
  exitCode: number
  durationMs: number
}

export interface SandboxOptions {
  checkpointId: string
  env?: Record<string, string>
  timeoutSec?: number
  pythonPath?: string
}
