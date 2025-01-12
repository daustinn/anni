'use client'

import React from 'react'
import Highlight from '../../highlight'
import { toast } from 'anni'

export default function Variants() {
  const [currentVariant, setCurrentVariant] =
    React.useState<keyof typeof currentList>('gentle')

  const currentList: {
    [key: string]: {
      title: string | React.ReactNode
      variant: 'filled' | 'gentle'
      codeBlock: string
    }
  } = React.useMemo(() => {
    return {
      gentle: {
        variant: 'gentle',
        title: 'Default  🚀',
        codeBlock: `toast('Default Toast 🚀')`
      },
      filled: {
        variant: 'filled',
        title: 'Filled  🎨',
        codeBlock: `toast('Filled Toast 🎨', { variant: 'filled' })
        
// or
<Toaster defaultVariant="filled" />`
      }
    }
  }, [])

  const handleTypeChange = (type: keyof typeof currentList) => {
    const detail = currentList[type]
    setCurrentVariant(type)
    toast(detail.title, {
      variant: detail.variant
    })
  }

  return (
    <article className="max-w-2xl mx-auto">
      <h2 className="font-semibold text-xl tracking-tight">Variant</h2>
      <p className="dark:text-stone-300/60">
        The <code>variant</code> prop is used to change the appearance of the
        toast.
      </p>
      <div className="pt-5">
        <nav className="flex gap-2 pb-4 flex-wrap">
          {Object.entries(currentList).map(([key]) => (
            <button
              onClick={() => handleTypeChange(key as keyof typeof currentList)}
              key={key}
              className="capitalize shadow-md shadow-black/30 bg-stone-500/10 hover:scale-105 active:scale-95 transition-transform p-2 font-medium text-sm px-3 rounded-xl border border-stone-500/50"
            >
              {key}
            </button>
          ))}
        </nav>
        <Highlight copyButtonTop language="tsx">
          {currentList[currentVariant].codeBlock}
        </Highlight>
      </div>
    </article>
  )
}
