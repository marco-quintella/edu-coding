'use client'

interface PlotGalleryProps {
  plots: string[]
}

/**
 * Renderiza os gráficos matplotlib capturados pelo sandbox (PNG base64).
 * Cada plot vira uma imagem com borda arredondada no estilo do design system.
 */
export function PlotGallery({ plots }: PlotGalleryProps) {
  if (!plots || plots.length === 0) return null

  return (
    <div className="mt-3 grid gap-3">
      {plots.map((b64, i) => (
        <figure
          key={i}
          className="overflow-hidden rounded-[12px] border border-line bg-white p-2 dark:bg-[#0e1116]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${b64}`}
            alt={`Gráfico ${i + 1} gerado pelo seu código`}
            className="h-auto w-full rounded-[8px]"
            loading="lazy"
          />
        </figure>
      ))}
    </div>
  )
}
