import type { PropsWithChildren } from 'react'

/**
 * This is a generic content view that wraps all of the non-map content.
 */
export default function GenericContentView({ children }: PropsWithChildren) {
  return (
    <div className="bg-background absolute top-0 right-0 left-0 z-1100 min-h-screen">
      <div className="container mx-auto mt-22 px-10">{children}</div>
    </div>
  )
}
