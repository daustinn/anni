'use client'

import './styles.css'
import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { type Toast, ToastInstance } from './state'

type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'

const DEFAULT_DURATION_TOAST = 5000
const DEFAULT_GAP = 15
const DEFAULT_OFFSET = 20
const DEFAULT_POSITION: ToastPosition = 'bottom-center'

export interface ToasterProps {
  unstyled?: boolean
  defaultActionProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  defaultActionAltText?: string
  defaultActionChild?: string
  defaultDismissButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  defaultDismissButton?: boolean
  defaultClassNames?: {
    toaster?: string
    toast?: string
    viewport?: string
  }
  defaultToasts?: Partial<
    Record<
      Toast['type'],
      React.HTMLAttributes<HTMLDivElement> & {
        media?: React.ReactNode
      }
    >
  >
  defaultStyles?: {
    toaster?: React.CSSProperties
    toast?: React.CSSProperties
    viewport?: React.CSSProperties
  }
  defaultTimeDuration?: number
  position?: ToastPosition
  type?: 'single' | 'multi'
  offset?: number
  theme?: 'dark' | 'light' | 'default'
  appearance?: 'default' | 'invert'
  gap?: number
  swipeThreshold?: number
}

type ContextToasterT = ToasterProps & {
  toasts: Toast[]
  destroy: (id: string) => void
  heights: Record<string, number>
  setHeights: React.Dispatch<
    React.SetStateAction<{
      [id: string]: number
    }>
  >
}
const ContextToaster = React.createContext<ContextToasterT>(
  {} as ContextToasterT
)

export const Toaster = (props: ToasterProps) => {
  const {
    unstyled = false,
    defaultActionAltText = 'esc',
    defaultActionChild = 'Action',
    defaultActionProps = {},
    defaultClassNames = {},
    defaultDismissButton = false,
    defaultDismissButtonProps = {},
    position = DEFAULT_POSITION,
    defaultTimeDuration = DEFAULT_DURATION_TOAST,
    offset = DEFAULT_OFFSET,
    theme = 'default',
    defaultToasts = {},
    appearance = 'default',
    gap = DEFAULT_GAP,
    type = 'multi',
    defaultStyles = {},
    swipeThreshold = 20
  } = props
  const [toasts, setToasts] = React.useState<Toast[]>(ToastInstance.toasts)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const [heights, setHeights] = React.useState<{
    [id: string]: number
  }>({})

  const preferredTheme = usePreferredTheme()

  React.useEffect(() => {
    const unsubscribe = ToastInstance.subscribe((state) =>
      setToasts(state.toasts)
    )
    return () => unsubscribe()
  }, [])

  const destroy = React.useCallback((id: string) => {
    ToastInstance.removeToast(id)
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const positionConfig = React.useMemo(() => {
    return {
      'top-left': { swipeDirection: 'left', top: 0, justify: 'start' },
      'top-right': { swipeDirection: 'right', top: 0, justify: 'end' },
      'top-center': { swipeDirection: 'up', top: 0, justify: 'center' },
      'bottom-left': { swipeDirection: 'left', bottom: 0, justify: 'start' },
      'bottom-right': { swipeDirection: 'right', bottom: 0, justify: 'end' },
      'bottom-center': { swipeDirection: 'down', bottom: 0, justify: 'center' }
    }[position]
  }, [position])

  if (!mounted) return null
  return (
    <ContextToaster.Provider
      value={{
        toasts,
        unstyled,
        defaultActionAltText,
        defaultActionChild,
        defaultActionProps,
        defaultClassNames,
        defaultDismissButton,
        defaultDismissButtonProps,
        position,
        defaultToasts,
        defaultTimeDuration,
        destroy,
        appearance,
        gap,
        defaultStyles,
        heights,
        type,
        setHeights,
        theme
      }}
    >
      <ToastPrimitives.ToastProvider
        swipeDirection={
          (positionConfig.swipeDirection as ToastPrimitives.ToastProviderProps['swipeDirection']) ??
          'down'
        }
        swipeThreshold={swipeThreshold}
        duration={defaultTimeDuration}
      >
        <div
          style={{
            ...defaultStyles.toaster,
            padding: offset + 'px',
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: positionConfig ? positionConfig.bottom : undefined,
            top: positionConfig ? positionConfig.top : undefined,
            display: 'flex',
            pointerEvents: 'none',
            justifyContent: positionConfig ? positionConfig.justify : undefined
          }}
          data-anni-toaster=""
          data-anni-invert={appearance === 'invert' ? '' : undefined}
          data-anni-default={appearance === 'default' ? '' : undefined}
          data-anni-dark={
            theme === 'dark' ||
            (theme === 'default' && preferredTheme === 'dark')
              ? ''
              : undefined
          }
          data-anni-light={
            theme === 'light' ||
            (theme === 'default' && preferredTheme === 'light')
              ? ''
              : undefined
          }
          className={defaultClassNames.toaster}
        >
          <ToastPrimitives.Viewport asChild>
            <div
              data-anni-viewport
              style={{
                ...defaultStyles.viewport,
                position: 'relative',
                pointerEvents: 'none'
              }}
              className={defaultClassNames.viewport}
            >
              {toasts.map((toast, i) => (
                <ToastComponent key={toast.id} index={i} {...toast} />
              ))}
            </div>
          </ToastPrimitives.Viewport>
        </div>
      </ToastPrimitives.ToastProvider>
    </ContextToaster.Provider>
  )
}

export const ToastComponent = (
  toast: Toast & {
    index: number
  }
) => {
  const {
    defaultTimeDuration,
    defaultDismissButton,
    destroy,
    defaultActionProps,
    defaultActionAltText,
    defaultActionChild,
    defaultDismissButtonProps,
    defaultToasts,
    defaultStyles,
    defaultClassNames,
    setHeights,
    heights,
    toasts,
    position,
    gap = DEFAULT_GAP,
    type
  } = React.useContext(ContextToaster)

  const duration = toast.duration ?? defaultTimeDuration
  const toastRef = React.useRef<HTMLDivElement>(null)
  const hiddenActionCloseRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (toastRef.current) {
      setHeights((prev) => {
        if (!prev[toast.id]) {
          return {
            ...prev,
            [toast.id]: toastRef?.current?.clientHeight
          }
        }
        return prev
      })
    }
  }, [toastRef.current])

  const hasActions =
    !!toast.action || toast.dismissButton || defaultDismissButton

  const handleClose = () => {
    setHeights((prev) => ({
      ...prev,
      [toast.id]: -gap
    }))

    setTimeout(() => {
      destroy(toast.id)
    }, 1000)
  }

  const children =
    typeof toast.child === 'function'
      ? toast.child({
          dismiss: () => hiddenActionCloseRef.current?.click()
        })
      : toast.child

  const childIsJsx = React.isValidElement(children) && toast.type === 'default'

  const {
    media: defaultMedia = DEFAULT_MEDIA[
      toast.type as keyof typeof DEFAULT_MEDIA
    ],
    ...defaultAtributes
  } = React.useMemo(() => {
    return defaultToasts?.[toast.type] ?? {}
  }, [defaultToasts, toast.type])

  const Media = React.useMemo(() => {
    return toast.media ? toast.media : defaultMedia ?? null
  }, [defaultMedia, toast.media])

  const height = heights[toast.id]

  const offsetTopBottom = React.useMemo(() => {
    if (toast.index === toasts.length - 1) return 0
    let totalOffset = 0
    for (let i = toast.index + 1; i < toasts.length; i++) {
      totalOffset += (heights[toasts[i].id] || 0) + gap
    }
    return totalOffset
  }, [toast.index, gap, heights, toasts.length])

  const isSingle = React.useMemo(() => type === 'single', [type])

  const isVisible = React.useMemo(() => {
    return isSingle ? toast.index === toasts.length - 1 : true
  }, [toast.index, toasts.length])

  React.useEffect(() => {
    if (!isVisible) destroy(toast.id)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <ToastPrimitives.Root
      type="background"
      duration={duration}
      onOpenChange={(v) => v === false && handleClose()}
      asChild
    >
      <div
        ref={toastRef}
        {...defaultAtributes}
        data-anni-toast=""
        data-anni-type={toast.type}
        style={
          {
            display: 'flex',
            zIndex: 1,
            width: '100%',
            pointerEvents: 'auto',
            alignItems: 'center',
            gap: '0.8rem',
            position: 'absolute',
            overflow: 'hidden',
            '--toast-height': height ? height + 'px' : 'auto',
            top: position?.includes('top') ? offsetTopBottom : undefined,
            bottom: position?.includes('bottom') ? offsetTopBottom : undefined,
            ...defaultStyles?.toast,
            ...defaultAtributes.style,
            ...toast.style
          } as React.CSSProperties
        }
        className={cn(
          defaultClassNames?.toast,
          defaultAtributes.className,
          toast.className
        )}
      >
        <ToastPrimitives.Close asChild ref={hiddenActionCloseRef}>
          <span
            data-anni-close=""
            style={{
              display: 'none',
              pointerEvents: 'none',
              position: 'absolute'
            }}
          />
        </ToastPrimitives.Close>
        {childIsJsx ? (
          children
        ) : (
          <>
            {Media && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
                data-anni-media=""
              >
                {Media}
              </div>
            )}

            <div data-anni-content="">
              {children}
              {hasActions && (
                <div
                  data-anni-actions=""
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginLeft: 'auto',
                    float: 'inline-end',
                    justifyContent: 'flex-end'
                  }}
                >
                  {toast.action && (
                    <ToastPrimitives.Action
                      {...defaultActionProps}
                      {...toast.actionsProps}
                      data-anni-action=""
                      className={`${defaultActionProps?.className ?? ''} ${
                        toast.actionsProps?.className ?? ''
                      }`}
                      onClick={toast.action}
                      style={{
                        ...defaultActionProps?.style,
                        ...toast.actionsProps?.style
                      }}
                      altText={
                        toast.actionAltText ?? defaultActionAltText ?? 'esc'
                      }
                    >
                      {toast.actionChild ?? defaultActionChild ?? 'Action'}
                    </ToastPrimitives.Action>
                  )}
                  {(defaultDismissButton || toast.dismissButton) && (
                    <ToastPrimitives.Close
                      {...defaultDismissButtonProps}
                      data-anni-dismiss=""
                      style={{
                        ...defaultDismissButtonProps?.style,
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      className={defaultDismissButtonProps?.className}
                    >
                      {toast.dismissChild ??
                        defaultDismissButtonProps?.children ??
                        'Close'}
                    </ToastPrimitives.Close>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </ToastPrimitives.Root>
  )
}

export const ImageMedia = React.forwardRef<
  HTMLImageElement,
  React.ComponentPropsWithoutRef<'img'> & { size?: number }
>(({ size = 20, ...props }, ref) => {
  return (
    <img
      ref={ref}
      {...props}
      width={size}
      height={size}
      referrerPolicy="no-referrer"
      alt="Icon"
    />
  )
})

ImageMedia.displayName = 'ImageMedia'

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number }

export const Success = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, ...props }, forwardRef) => {
    return (
      <svg
        {...props}
        ref={forwardRef}
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H40V40H0V0Z" fill="url(#pattern0_66_59)" />
        <defs>
          <pattern
            id="pattern0_66_59"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use href="#image0_66_59" transform="scale(0.025)" />
          </pattern>
          <image
            id="image0_66_59"
            width="40"
            height="40"
            preserveAspectRatio="none"
            href="data:image/png;base64,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"
          />
        </defs>
      </svg>
    )
  }
)
Success.displayName = 'SuccessIcon'

export const Info = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, ...props }, forwardRef) => {
    return (
      <svg
        {...props}
        ref={forwardRef}
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" fill="url(#pattern0_66_60)" />
        <defs>
          <pattern
            id="pattern0_66_60"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use href="#image0_66_60" transform="scale(0.025)" />
          </pattern>
          <image
            id="image0_66_60"
            width="40"
            height="40"
            preserveAspectRatio="none"
            href="data:image/png;base64,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"
          />
        </defs>
      </svg>
    )
  }
)
Info.displayName = 'InfoIcon'

export const Error = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, ...props }, forwardRef) => {
    return (
      <svg
        {...props}
        ref={forwardRef}
        width={size}
        height={size}
        viewBox="0 0 40 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="35" fill="url(#pattern0_66_61)" />
        <defs>
          <pattern
            id="pattern0_66_61"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use href="#image0_66_61" transform="scale(0.025 0.0285714)" />
          </pattern>
          <image
            id="image0_66_61"
            width="40"
            height="35"
            preserveAspectRatio="none"
            href="data:image/png;base64,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"
          />
        </defs>
      </svg>
    )
  }
)
Error.displayName = 'ErrorIcon'

export const Warning = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, ...props }, forwardRef) => {
    return (
      <svg
        {...props}
        ref={forwardRef}
        width={size}
        height={size}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="30" height="30" fill="url(#pattern0_66_63)" />
        <defs>
          <pattern
            id="pattern0_66_63"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use href="#image0_66_63" transform="scale(0.0333333)" />
          </pattern>
          <image
            id="image0_66_63"
            width="30"
            height="30"
            preserveAspectRatio="none"
            href="data:image/png;base64,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"
          />
        </defs>
      </svg>
    )
  }
)
Warning.displayName = 'WarningIcon'

const DEFAULT_MEDIA = {
  success: <Success size={23} />,
  info: <Info size={23} />,
  warning: <Warning size={23} />,
  error: <Error size={25} />,
  default: null
}

const cn = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ')

type Theme = 'dark' | 'light'

export const getPreferredTheme = (): Theme => {
  return typeof window === 'undefined'
    ? 'light'
    : window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const usePreferredTheme = (): Theme => {
  const [theme, setTheme] = React.useState<Theme>(getPreferredTheme)

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (event: MediaQueryListEvent) =>
      setTheme(event.matches ? 'dark' : 'light')

    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  return theme
}
