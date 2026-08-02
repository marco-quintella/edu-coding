import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/mdx-components'
import { transformerCopyButton } from '@rehype-pretty/transformers'

/**
 * Renderiza MDX com syntax highlighting via rehype-pretty-code (Shiki).
 * Tema: "github-dark-dimmed" — escuro consistente com o fundo #0e1116
 * dos blocos de código do design system.
 */

// Import dinâmico não é necessário no RSC; rehype-pretty-code é ESM.
// (next-mdx-remote/rsc lida com plugins ESM nativamente.)
import rehypePrettyCode from 'rehype-pretty-code'

const prettyCodeOptions = {
  theme: 'github-dark-dimmed',
  keepBackground: false,
  transformers: [transformerCopyButton()],
}

export async function renderMdx(source: string) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  )
}
