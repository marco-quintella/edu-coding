import type { MDXComponents } from 'mdx/types'
import { SandboxRunner } from './sandbox-runner'

/**
 * MDX components registered globally. Pass `components={mdxComponents}` to
 * every `<MDXRemote source={...} />` instance.
 */
export const mdxComponents: MDXComponents = {
  SandboxRunner,
}
