/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import { toast } from 'anni'

export const posiblesToasts = [
  'React is a JavaScript library for building user interfaces.',
  'Next.js is a React framework for production.',
  'Vercel combines the best developer experience with an obsessive focus on end-user performance.',
  "Image, Fonts, and Script your application's Core Web Vitals and User Experience."
]

export const posibleTypes = ['default', 'success', 'error', 'warning', 'info']

export default function RenderToast() {
  const handleToast = () => {
    const randomToast =
      posiblesToasts[Math.floor(Math.random() * posiblesToasts.length)]
    const randomType =
      posibleTypes[Math.floor(Math.random() * posibleTypes.length)]
    toast(randomToast, {
      type: randomType
    } as any)
  }

  return (
    <div className="pb-3">
      <button
        onClick={handleToast.bind(null)}
        className="hover:scale-105 text-brown-800 bg-gradient-to-b from-white via-[#fff6eb] to-[#e7e1db] shadow-md shadow-brown-700/30 relative z-[100] text-nowrap active:scale-95 transition-transform flex justify-center gap-2 items-center min-w-[250px] font-semibold p-3.5 rounded-2xl text-lg"
      >
        Render a toast 🔔
      </button>
    </div>
  )
}
