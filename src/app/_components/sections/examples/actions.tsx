'use client'

import { toast } from 'anni'
import React from 'react'
import Highlight from '../../highlight'

export default function Actions() {
  const [current, setCurrent] =
    React.useState<keyof typeof actionList>('Simple action')

  const actionList: {
    [key: string]: {
      codeBlock: string
      toast: () => void
    }
  } = React.useMemo(() => {
    return {
      'Simple action': {
        toast: () =>
          toast('With action button 🌐', {
            action: () => {}
          }),
        codeBlock: `toast('With action button 🌐', {
  action: () => {}
})`
      },
      'Action child': {
        toast: () =>
          toast('With action button 🌐', {
            actionChild: 'Custom action text',
            action: () => {}
          }),
        codeBlock: `toast('With action button 🌐', {
  actionChild: 'Custom action text',
  action: () => {}
})`
      },
      'Thread action': {
        toast: () =>
          toast('With action button 🌐', {
            actionChild: 'Threads',
            action: () => toast.warning('First toast action clicked ⚠️')
          }),
        codeBlock: `toast('With action button 🌐', {
  actionChild: 'Threads',
  action: () => toast.warning('First toast action clicked ⚠️')
})`
      }
    }
  }, [])

  const handleTypeChange = (type: keyof typeof actionList) => {
    const detail = actionList[type]
    setCurrent(type)
    detail.toast()
  }

  return (
    <article>
      <h2 className="font-bold text-base tracking-tight">Action</h2>
      <p className="dark:text-stone-black text-sm">
        Anni, you have several types of notifications and they are very easy to
        execute.
      </p>
      <div className="pt-5">
        <nav className="flex gap-2 pb-4 flex-wrap">
          {Object.entries(actionList).map(([key]) => (
            <button
              onClick={() => handleTypeChange(key as keyof typeof actionList)}
              key={key}
              className="capitalize text-sm bg-black text-lime-50 hover:scale-105 active:scale-95 transition-transform p-2 font-medium px-3 rounded-xl"
            >
              {key}
            </button>
          ))}
        </nav>
        <Highlight copyButtonTop language="tsx">
          {actionList[current].codeBlock}
        </Highlight>
      </div>
    </article>
  )
}
