'use client'

import React from 'react'
import Highlight from '../../highlight'
import { toast } from 'anni'

export default function CloseButton() {
  return (
    <article className="max-w-2xl mx-auto">
      <h2 className="font-semibold text-xl tracking-tight">
        With close button
      </h2>
      <p className="dark:text-stone-300/60">
        You can add a close button to the toast by setting the{' '}
        <code>closeButton</code> option to <code>true</code>.
      </p>
      <div className="pt-5">
        <nav className="flex gap-2 pb-4 flex-wrap">
          <button
            onClick={() =>
              toast('With close button 🚀', {
                closeButton: true
              })
            }
            className="capitalize shadow-md shadow-black/30 bg-stone-500/10 hover:scale-105 active:scale-95 transition-transform p-2 font-medium text-sm px-3 rounded-xl border border-stone-500/50"
          >
            With close button
          </button>
        </nav>
        <Highlight copyButtonTop language="tsx">
          {`toast('Default Toast 🚀', {
    closeButton: true
})

// or
<Toaster defaultCloseButton />`}
        </Highlight>
      </div>
    </article>
  )
}
