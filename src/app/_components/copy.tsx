'use client'

import React from 'react'
import { toast } from 'anni'
import { Copy } from '@/icons'

export default function CopyButton({ codeBlock }: { codeBlock: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(codeBlock)
    toast.success('Code copied to clipboard 🗒️')
  }
  return (
    <button
      onClick={handleCopy}
      title="Copy to clipboard"
      className="flex z-[1] hover:scale-110 transition-transform ml-auto pl-2 items-center justify-center"
    >
      <Copy />
    </button>
  )
}
