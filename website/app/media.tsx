'use client'

import React from 'react'
import { toast } from 'anni'
import Highlight from '@/ui/components/highlight'

export default function MediaExample() {
  return (
    <section className="text-black grid grid-cols-2 gap-x-4 items-start font-sans max-w-2xl mx-auto w-full px-4 py-5">
      <h2 className="text-left col-span-2 font-bold tracking-tighter text-xl">
        Media
      </h2>
      <div>
        <p className="pb-1">Add an emoji</p>
        <Highlight
          code={`toast('Media string', {
  media: '🦄'
})`}
          language="tsx"
          actionChild="Render toast"
          info="Add an emoji"
          action={() =>
            toast('Media string', {
              media: '🦄'
            })
          }
        />
      </div>
      <div>
        <p className="pb-1">Add a react component</p>
        <Highlight
          code={`toast('Media jsx', {
  media: <div>🖋️</div>
})`}
          language="tsx"
          copyButtonTop
          actionChild="Render toast"
          info="Add a react component"
          action={() =>
            toast('Media jsx', {
              media: <div>🖋️</div>
            })
          }
        />
      </div>
      <div className="col-span-2">
        <p className="pb-1 pt-3">
          Or you can also add it for each type from the Toaster component,
          remember that the Media sent in the function is prioritized.
        </p>
        <Highlight
          code={`<Toaster
  defaultToasts={{
    default: { media: '🚀' },
    error: { media: '🚫' },
    info: { media: 'ℹ️' },
    success: { media: '✅' },
  }}
/>`}
          language="tsx"
          copyButtonTop
        />
      </div>
    </section>
  )
}
