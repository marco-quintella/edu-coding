'use client'

import { useEffect, useRef, useState } from 'react'
import { ChatCircleDots, PaperPlaneTilt, X } from '@phosphor-icons/react/dist/ssr'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatDoubtProps {
  lessonTitle: string
  /** Conteúdo da lição (markdown bruto) — passado pelo server component */
  lessonContent: string
}

/**
 * Chat de dúvidas contextual — modal flutuante no canto da lição.
 * Perguntas são respondidas com contexto da lição (OpenRouter free).
 */
export function ChatDoubt({ lessonTitle, lessonContent }: ChatDoubtProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, pending])

  async function send() {
    const question = input.trim()
    if (!question || pending) return
    setInput('')
    setPending(true)
    const next = [...messages, { role: 'user' as const, content: question }]
    setMessages(next)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonTitle,
          lessonContent,
          question,
          history: messages.slice(-6),
        }),
      })
      const data = await res.json()
      setMessages([...next, { role: 'assistant', content: data.answer ?? '💡 Sem resposta.' }])
    } catch {
      setMessages([
        ...next,
        { role: 'assistant', content: '💡 Erro de conexão. Tente de novo.' },
      ])
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-accent-strong px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-accent-deep active:scale-[0.97] dark:bg-accent dark:text-zinc-950 dark:hover:bg-accent-strong"
        aria-label="Tirar dúvida"
      >
        <ChatCircleDots size={18} weight="fill" />
        Tirar dúvida
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <div className="flex h-[540px] w-full max-w-md flex-col overflow-hidden rounded-[16px] border border-line bg-surface shadow-card">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line bg-surface-2 px-4 py-3">
              <div>
                <p className="text-sm font-bold text-ink">Tirar dúvida</p>
                <p className="text-[11px] text-ink-muted">Tutor com contexto da lição</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-ink-muted transition-colors hover:bg-background-hover hover:text-ink"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Mensagens */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <p className="mt-8 text-center text-sm text-ink-muted">
                  Pergunte sobre <strong className="text-ink">{lessonTitle}</strong> —{' '}
                  conceitos, dúvidas de código, por quês.
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-[12px] px-3 py-2 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'ml-auto bg-accent-strong text-white dark:bg-accent dark:text-zinc-950'
                      : 'border border-line bg-surface-2 text-ink-secondary'
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {pending && (
                <div className="max-w-[85%] rounded-[12px] border border-line bg-surface-2 px-3 py-2 text-sm text-ink-muted">
                  Pensando<span className="animate-pulse">…</span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-line bg-surface-2 p-3">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Ex: por que normalizar antes do K-Means?"
                  className="min-w-0 flex-1 rounded-[12px] border border-line-strong bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent"
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || pending}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-all hover:bg-accent-strong active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-accent dark:text-zinc-950"
                  aria-label="Enviar"
                >
                  <PaperPlaneTilt size={16} weight="fill" />
                </button>
              </div>
              <p className="mt-1.5 text-[10px] text-ink-muted">
                Respostas geradas por IA — podem conter imprecisões.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
