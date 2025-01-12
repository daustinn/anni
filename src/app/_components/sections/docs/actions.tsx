'use client'

import { toast } from 'anni'
import React from 'react'
import Highlight from '../../highlight'

export default function Actions() {
  const [currentAction, setCurrentAction] =
    React.useState<keyof typeof actionList>('Simple action')

  const actionList: {
    [key: string]: {
      title: string | React.ReactNode
      codeBlock: string
      actionChild?: string
      action?: () => void
    }
  } = React.useMemo(() => {
    return {
      'Simple action': {
        title: 'With action button 🌐',
        action: () => {},
        codeBlock: `toast('With action button 🌐', {
    action: () => {}
})`
      },
      'Action child': {
        title: 'With action button 🌐',
        actionChild: 'Custom action text',
        action: () => {},
        codeBlock: `toast('With action button 🌐', {
    actionChild: 'Custom action text',
    action: () => {}
})`
      },
      'Thread action': {
        title: 'With action button 🌐',
        actionChild: 'Thread',
        action: () => toast.warning('First toast action clicked ⚠️'),
        codeBlock: `toast('With action button 🌐', {
    actionChild: 'Threads',
    action: () => toast.warning('First toast action clicked ⚠️')
})`
      }
    }
  }, [])

  const handleTypeChange = (type: keyof typeof actionList) => {
    const detail = actionList[type]
    setCurrentAction(type)
    toast(detail.title, {
      action: detail.action || undefined,
      actionChild: detail.actionChild || undefined
    })
  }

  return (
    <article className="max-w-2xl mx-auto">
      <h2 className="font-semibold text-xl tracking-tight">Action</h2>
      <p className="dark:text-stone-300/60">
        Anni, you have several types of notifications and they are very easy to
        execute.
      </p>
      <div className="pt-5">
        <nav className="flex gap-2 pb-4 flex-wrap">
          {Object.entries(actionList).map(([key]) => (
            <button
              onClick={() => handleTypeChange(key as keyof typeof actionList)}
              key={key}
              className="capitalize shadow-md shadow-black/30 bg-stone-500/10 hover:scale-105 active:scale-95 transition-transform p-2 font-medium text-sm px-3 rounded-xl border border-stone-500/50"
            >
              {key}
            </button>
          ))}
        </nav>
        <Highlight copyButtonTop language="tsx">
          {actionList[currentAction].codeBlock}
        </Highlight>
      </div>
    </article>
  )
}
