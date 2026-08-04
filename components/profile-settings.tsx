'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from '@phosphor-icons/react/dist/ssr'

/**
 * Configuração do perfil público (opt-in).
 * - username (slug do perfil)
 * - bio curta
 * - toggle público/privado
 */
export function ProfileSettings() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/profile')
      .then((r) => r.json())
      .then((d) => {
        setUsername(d.username ?? '')
        setBio(d.bio ?? '')
        setIsPublic(d.public ?? false)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function save() {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, bio, public: isPublic }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage({ type: 'err', text: data.message ?? 'Erro ao salvar.' })
        return
      }
      setMessage({ type: 'ok', text: 'Perfil salvo!' })
      router.refresh()
    } catch {
      setMessage({ type: 'err', text: 'Erro de conexão.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-ink-muted">Carregando…</p>
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight">Perfil público</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Um perfil compartilhável com seu progresso e certificados. Nada é
          exibido até você ativar.
        </p>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-bold text-ink">Nome de usuário</span>
        <div className="flex items-center gap-1 rounded-[12px] border border-line-strong bg-surface px-3 focus-within:border-accent">
          <span className="font-mono text-sm text-ink-muted">/u/</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="marco-dev"
            className="w-full bg-transparent py-2 font-mono text-sm text-ink outline-none"
          />
        </div>
        <span className="mt-1 block text-[11px] text-ink-muted">
          Letras minúsculas, números, _ e - (3-30 caracteres)
        </span>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-bold text-ink">Bio</span>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Dev backend aprendendo IA na prática…"
          rows={3}
          maxLength={200}
          className="w-full rounded-[12px] border border-line-strong bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent"
        />
        <span className="mt-1 block text-right text-[11px] text-ink-muted">{bio.length}/200</span>
      </label>

      <button
        onClick={() => setIsPublic(!isPublic)}
        className="flex w-full items-center justify-between rounded-[12px] border border-line bg-surface-2 px-4 py-3 text-left transition-colors hover:bg-background-hover"
      >
        <span>
          <span className="block text-sm font-bold text-ink">
            Perfil público {isPublic && <Check size={14} className="inline text-accent" weight="bold" />}
          </span>
          <span className="block text-xs text-ink-muted">
            {isPublic
              ? 'Qualquer pessoa com o link pode ver seu progresso e certificados.'
              : 'Visível só para você. Ative para compartilhar.'}
          </span>
        </span>
        <span
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
            isPublic ? 'bg-accent' : 'bg-line-strong'
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
              isPublic ? 'left-[22px]' : 'left-0.5'
            }`}
          />
        </span>
      </button>

      {isPublic && username && (
        <a
          href={`/u/${username}`}
          className="block rounded-[12px] border border-accent/30 bg-accent-soft px-4 py-3 text-center text-sm font-bold text-accent-strong hover:underline"
        >
          Ver meu perfil → /u/{username}
        </a>
      )}

      {message && (
        <p
          className={`text-sm font-semibold ${
            message.type === 'ok' ? 'text-accent-strong' : 'text-danger'
          }`}
        >
          {message.text}
        </p>
      )}

      <button
        onClick={save}
        disabled={saving}
        className="w-full rounded-full bg-accent-strong py-3 text-[15px] font-bold text-white transition-all hover:bg-accent-deep active:scale-[0.98] disabled:opacity-50 dark:bg-accent dark:text-zinc-950"
      >
        {saving ? 'Salvando…' : 'Salvar perfil'}
      </button>
    </div>
  )
}
