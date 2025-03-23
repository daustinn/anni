import * as React from 'react'

type Theme = 'dark' | 'light'

export const getPreferredTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const usePreferredTheme = (): Theme => {
  const [theme, setTheme] = React.useState<Theme>(getPreferredTheme)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (event: MediaQueryListEvent) =>
      setTheme(event.matches ? 'dark' : 'light')

    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  return theme
}

export default usePreferredTheme
