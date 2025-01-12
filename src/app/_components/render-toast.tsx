'use client'

import React from 'react'
import { toast } from 'anni'

const posiblesToasts = [
  {
    label: 'Warning toast ⚠️',
    action: () => toast.warning('Warning Toast ⚠️')
  },
  {
    label: 'Success toast 🚀',
    action: () => toast.success('Success Toast 🚀')
  },
  {
    label: 'Error toast 💥',
    action: () => toast.error('Error Toast 💥')
  },
  {
    label: 'Info toast ℹ️',
    action: () => toast.info('Info Toast ℹ️')
  }
]

const getRandomeToast = () => {
  const randomIndex = Math.floor(Math.random() * posiblesToasts.length)
  return posiblesToasts[randomIndex]
}

export default function RenderToast() {
  const handleToast = () => {
    const randowm = getRandomeToast()
    randowm.action()
  }

  return (
    <div className="pb-3">
      <button
        onClick={handleToast}
        className={
          'hover:scale-105 bg-blue-700 relative z-[100] text-nowrap active:scale-95 transition-transform flex justify-center gap-2 items-center min-w-[250px] font-semibold p-3.5 rounded-2xl shadow-[0_0_15px_#1e3a8a] text-lg'
        }
      >
        Render a toast 🍞
      </button>
    </div>
  )
}
