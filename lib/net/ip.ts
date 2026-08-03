import type { NextRequest } from 'next/server'

/**
 * Extrai o IP do cliente (via headers de proxy — Railway/Cloudflare).
 * Fallback: 'unknown' (conexão local sem proxy).
 */
export function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  const real = req.headers.get('x-real-ip')
  if (real) return real.trim()
  return 'unknown'
}
