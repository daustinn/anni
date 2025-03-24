'use client'

import { Toaster, ToasterProps } from 'anni'
import React from 'react'

type ToastPreferences = {
  theme: ToasterProps['theme']
  position: ToasterProps['position']
  appearance: ToasterProps['appearance']
  type: ToasterProps['type']
}

type UIContextType = {
  toastPreferences: ToastPreferences
  setToastPreferences: React.Dispatch<React.SetStateAction<ToastPreferences>>
}

export const useUI = () => React.useContext(UIContext)
const UIContext = React.createContext<UIContextType>({} as UIContextType)
export const UiProviders = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false)
  const [toastPreferences, setToastPreferences] =
    React.useState<ToastPreferences>({
      theme: 'dark',
      position: 'bottom-right',
      appearance: 'default',
      type: 'multi'
    })

  React.useEffect(() => {
    if (typeof window !== 'undefined') setMounted(true)
  }, [])

  return (
    <UIContext.Provider
      value={{
        toastPreferences,
        setToastPreferences
      }}
    >
      {mounted && (
        <Toaster
          defaultToasts={{
            default: {
              media: '🖌️'
            }
          }}
          defaultDismissButtonProps={{ children: 'Cerrar' }}
          theme={toastPreferences.theme}
          position={toastPreferences.position}
          type={toastPreferences.type}
          appearance={toastPreferences.appearance}
        />
      )}
      {children}
    </UIContext.Provider>
  )
}
