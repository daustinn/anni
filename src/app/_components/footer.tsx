'use client'

import { CloseSidebar, DaustinnSignature } from '@/icons'
import { UiContext } from '@/providers/ui'
import React from 'react'

export default function Footer() {
  const ctxui = React.useContext(UiContext)

  return (
    <footer className="pt-0 flex w-full">
      <div className="border-t px-7 gap-4 w-full flex items-center border-stone-800">
        <button onClick={ctxui.setOpenExamples.bind(null, false)}>
          <CloseSidebar />
        </button>
        <p className="max-w-[200px] flex-grow text-stone-300 text-sm">
          By{' '}
          <a
            href="https://daustinn.com"
            className="hover:underline text-orange-200"
            target="_blank"
            rel="noreferrer"
          >
            Daustinn
          </a>
        </p>
        <div className="ml-auto text-stone-500">
          <DaustinnSignature size={80} />
        </div>
      </div>
    </footer>
  )
}
