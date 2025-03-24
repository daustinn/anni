'use client'

import React from 'react'
import { toast } from 'anni'
import Highlight from '@/ui/components/highlight'
import { useUI } from './providers'

export default function Theming() {
  const { setToastPreferences, toastPreferences } = useUI()
  return (
    <section className="text-black grid grid-cols-2 space-y-0 gap-x-4 items-start font-sans max-w-2xl mx-auto w-full px-4 py-5">
      <h2 className="text-left col-span-2 font-bold tracking-tighter text-xl">
        Theme and Appearance
      </h2>
      <div>
        <p className="pb-1">Dark mode</p>
        <Highlight
          className={
            toastPreferences.theme === 'dark'
              ? 'outline-3 outline-offset-2 outline-oasis-700/50'
              : ''
          }
          code={`<Toaster theme="dark"/>
//...
toast('Dark mode', {
  media: '🌚'
})`}
          language="tsx"
          actionChild="Change theme"
          info="Change the theme of the Toast"
          action={() => {
            setToastPreferences((prev) => ({ ...prev, theme: 'dark' }))
            toast('Dark mode', {
              media: '🌚'
            })
          }}
        />
      </div>
      <div>
        <p className="pb-1">Light mode</p>
        <Highlight
          className={
            toastPreferences.theme === 'light'
              ? 'outline-3 outline-offset-2 outline-oasis-700/50'
              : ''
          }
          code={`<Toaster theme="light"/>
//...
toast('Light mode', {
  media: '🌞'
})`}
          language="tsx"
          actionChild="Change theme"
          info="Change the theme of the Toast"
          action={() => {
            setToastPreferences((prev) => ({ ...prev, theme: 'light' }))
            toast('Light mode', {
              media: '🌞'
            })
          }}
        />
      </div>
      <div className="col-span-2">
        <p className="pb-px px-1 pt-5">
          If the appearance is invert and the theme is dark, the toast will
          appear light, and vice versa.
        </p>
        <Highlight
          code={`<Toaster appearance="${toastPreferences.appearance}"/>
//...
toast('Toggle appearance', {
  media: '🌆'
})`}
          language="tsx"
          actionChild="Toggle appearance"
          info="Change the appearance of the Toast"
          action={() => {
            setToastPreferences((prev) => ({
              ...prev,
              appearance: prev.appearance === 'invert' ? 'default' : 'invert'
            }))
            toast('Toggle appearance', {
              media: '🌆'
            })
          }}
        />
      </div>
    </section>
  )
}
