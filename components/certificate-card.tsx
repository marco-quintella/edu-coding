'use client'

import { useState } from 'react'
import { Check, LinkSimple, LinkedinLogo, TwitterLogo } from '@phosphor-icons/react/dist/ssr'

interface CertificateCardProps {
  displayName: string
  courseTitle: string
  phaseTitle: string | null
  issuedAt: Date
  token: string
}

/**
 * Certificado compartilhável — página pública com design do sistema.
 * Botões: copiar link, LinkedIn, X.
 */
export function CertificateCard({
  displayName,
  courseTitle,
  phaseTitle,
  issuedAt,
}: CertificateCardProps) {
  const [copied, setCopied] = useState(false)
  // URL só é conhecida no client — lazy init pós-mount (hydration-safe:
  // server renderiza vazio, client preenche no primeiro render)
  const [url, setUrl] = useState('')
  if (typeof window !== 'undefined' && !url) {
    setUrl(window.location.href)
  }

  const shareText = `Concluí ${phaseTitle ?? 'o curso'} em ${courseTitle} — Edu Coding 🎓`

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard bloqueado — nada crítico
    }
  }

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`

  const issued = new Date(issuedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="overflow-hidden rounded-[16px] border border-line bg-surface shadow-card">
      {/* Faixa superior */}
      <div className="bg-accent-strong px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-white dark:bg-accent dark:text-zinc-950">
        Edu Coding
      </div>

      {/* Corpo do certificado */}
      <div className="px-8 py-10 text-center">
        <p className="text-[13px] font-medium uppercase tracking-widest text-ink-muted">
          Certificado de conclusão
        </p>
        <p className="mt-6 text-[clamp(1.6rem,4vw,2.4rem)] font-black leading-tight tracking-tight">
          {displayName}
        </p>
        <p className="mx-auto mt-4 max-w-[42ch] text-[15px] leading-relaxed text-ink-secondary">
          concluiu com êxito{' '}
          <strong className="text-ink">{phaseTitle ?? 'o curso completo'}</strong>
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          {courseTitle} · {issued}
        </p>

        <div className="mx-auto mt-8 h-px max-w-[320px] bg-line-strong" />

        {/* Verificação */}
        <p className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-strong">
          <Check size={13} weight="bold" />
          Certificado verificado
        </p>

        {/* Compartilhar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={copyLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-[13px] font-bold text-ink transition-colors hover:bg-background-hover"
          >
            {copied ? <Check size={15} weight="bold" /> : <LinkSimple size={15} />}
            {copied ? 'Link copiado!' : 'Copiar link'}
          </button>
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0A66C2] px-4 py-2 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
          >
            <LinkedinLogo size={15} weight="fill" />
            LinkedIn
          </a>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#000000] px-4 py-2 text-[13px] font-bold text-white transition-opacity hover:opacity-80 dark:bg-zinc-800"
          >
            <TwitterLogo size={15} weight="fill" />
            X
          </a>
        </div>
      </div>
    </div>
  )
}
