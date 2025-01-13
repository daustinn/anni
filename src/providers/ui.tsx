'use client'

import React from 'react'

type Props = {
  children: React.ReactNode
}

type UiContextType = {
  openExamples: boolean
  setOpenExamples: (open: boolean) => void
}

export const UiContext = React.createContext<UiContextType>({} as UiContextType)

export default function UiProvider({ children }: Props) {
  const [openExamples, setOpenExamples] = React.useState(false)
  return (
    <UiContext.Provider
      value={{
        openExamples,
        setOpenExamples
      }}
    >
      {children}
    </UiContext.Provider>
  )
}
