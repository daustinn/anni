'use client'

import React from 'react'
import { toast } from 'anni'
import Highlight from '@/ui/components/highlight'
import { useUI } from './providers'

const positions = {
  'top-left': {
    code: '<Toaster position="top-left" />'
  },
  'top-right': {
    code: '<Toaster position="top-right" />'
  },
  'top-center': {
    code: '<Toaster position="top-center" />'
  },
  'bottom-left': {
    code: '<Toaster position="bottom-left" />'
  },
  'bottom-right': {
    code: '<Toaster position="bottom-right" />'
  },
  'bottom-center': {
    code: '<Toaster position="bottom-center" />'
  }
}

export default function PositionsExample() {
  const { setToastPreferences, toastPreferences } = useUI()

  const toastCode = React.useMemo(
    () => positions[toastPreferences.position as keyof typeof positions].code,
    [toastPreferences.position]
  )

  return (
    <section className="text-black font-sans max-w-2xl mx-auto w-ful px-4 py-5">
      <h2 className="text-left font-bold tracking-tighter text-xl">
        Positions
      </h2>
      <p className="pb-1">Choose where to show your notifications.</p>
      <div className="flex flex-wrap gap-2 bg-brown-500/5 rounded-lg p-2">
        {Object.entries(positions).map(([key]) => (
          <button
            key={key}
            data-active={toastPreferences.position === key ? '' : undefined}
            className=" text-sm font-semibold capitalize shadow-[0_2px_2px_rgba(0,0,0,.3)] bg-gradient-to-b from-white via-oasis-50 to-brown-50 text-brown-800 px-4 py-2 rounded-lg"
            onClick={() => {
              toast.warning('Position changed to ' + key)
              setToastPreferences({
                ...toastPreferences,
                position: key as keyof typeof positions
              })
            }}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="pt-2">
        <Highlight code={toastCode} language="tsx" copyButtonTop />
      </div>
    </section>
  )
}
