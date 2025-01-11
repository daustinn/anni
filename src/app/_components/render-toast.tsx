'use client'

import React from 'react'
import { toast } from 'anni'
export default function RenderToast() {
  const notify = () =>
    toast('Success Toast 🚀', {
      actionChild: 'Go to info toast',
      action: () => toast.info('Info Toast 🚀')
    })

  return (
    <div className="pb-3">
      <button
        onClick={notify}
        className="hover:scale-105 active:scale-100 transition-transform flex justify-center gap-2 items-center w-[250px] text-black font-semibold p-4 rounded-2xl bg-gradient-to-l shadow-md from-lime-200 via-violet-200 to-blue-200 border-2 border-black"
      >
        Render a toast
      </button>
    </div>
  )
}
