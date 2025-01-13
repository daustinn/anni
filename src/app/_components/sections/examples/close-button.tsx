'use client'

import React from 'react'
import Highlight from '../../highlight'
import { toast } from 'anni'

export default function CloseButton() {
  return (
    <article>
      <h2 className="font-bold text-base tracking-tight">With close button</h2>
      <p className="dark:text-stone-black text-sm">
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
            className="capitalize text-sm bg-black text-lime-50 hover:scale-105 active:scale-95 transition-transform p-2 font-medium px-3 rounded-xl"
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
