'use client'

import React from 'react'
import Highlight from '../../highlight'
import { toast } from 'anni'

export default function Positions() {
  const [current, setCurrent] =
    React.useState<keyof typeof positionList>('top left')

  const positionList: {
    [key: string]: {
      title: string | React.ReactNode
      codeBlock: string
      position:
        | 'top-left'
        | 'top-right'
        | 'top-center'
        | 'bottom-left'
        | 'bottom-right'
        | 'bottom-center'
    }
  } = React.useMemo(() => {
    return {
      'top left': {
        title: 'Right Top 🔥',
        codeBlock: `toast('Right top toast 🚀', {
    position: 'top-left'
})`,
        position: 'top-left'
      },
      'top center': {
        title: 'Center Top 🔥',
        codeBlock: `toast('Right top toast 🚀', {
    position: 'top-center'
})`,
        position: 'top-center'
      },
      'top right': {
        title: 'Right Top 🔥',
        codeBlock: `toast('Right top toast 🚀', {
    position: 'top-right'
})`,
        position: 'top-right'
      },
      'bottom left': {
        title: 'Left Bottom 🔥',
        codeBlock: `toast('Left bottom toast 🚀', {
    position: 'bottom-left'
})`,
        position: 'bottom-left'
      },
      'bottom center': {
        title: 'Center Bottom 🔥',
        codeBlock: `toast('Center bottom toast 🚀', {
    position: 'bottom-center'
})`,
        position: 'bottom-center'
      },
      'bottom right': {
        title: 'Right Bottom 🔥',
        codeBlock: `toast('Right bottom toast 🚀', {
    position: 'bottom-right'
})`,
        position: 'bottom-right'
      }
    }
  }, [])

  const handlePositionChange = (type: keyof typeof positionList) => {
    const detail = positionList[type]
    setCurrent(type)
    toast(detail.title, {
      position: detail.position
    })
  }

  return (
    <article className="max-w-2xl mx-auto">
      <h2 className="font-semibold text-xl tracking-tight">Positions</h2>
      <p className="dark:text-stone-300/60">
        The <code>position</code> prop is used to change the position of the
        toast.
      </p>
      <div className="pt-5">
        <nav className="flex gap-2 pb-4 flex-wrap">
          {Object.entries(positionList).map(([key]) => (
            <button
              onClick={() =>
                handlePositionChange(key as keyof typeof positionList)
              }
              key={key}
              className="capitalize shadow-md shadow-black/30 bg-stone-500/10 hover:scale-105 active:scale-95 transition-transform p-2 font-medium text-sm px-3 rounded-xl border border-stone-500/50"
            >
              {key}
            </button>
          ))}
        </nav>
        <Highlight copyButtonTop language="tsx">
          {positionList[current].codeBlock}
        </Highlight>
      </div>
    </article>
  )
}
