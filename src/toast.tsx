/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
'use client'

import './styles.css'
import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { type Toast, ToastInstance } from './state'
import usePreferredTheme from './utils'

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
const DEFAULT_MEDIA_URLS = {
  success: 'https://cdn.daustinn.com/anni/10887804.webp',
  info: 'https://cdn.daustinn.com/anni/7915043.webp',
  warning: 'https://cdn.daustinn.com/anni/81669499.webp',
  error: 'https://cdn.daustinn.com/anni/5220289.webp'
}

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
  distroy: (id: string) => void
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

  const distroy = React.useCallback((id: string) => {
    ToastInstance.removeToast(id)
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const positions = React.useMemo(() => {
    return {
      'top-left': { swipeDirection: 'left', top: 0, justify: 'start' },
      'top-right': { swipeDirection: 'right', top: 0, justify: 'end' },
      'top-center': { swipeDirection: 'up', top: 0, justify: 'center' },
      'bottom-left': { swipeDirection: 'left', bottom: 0, justify: 'start' },
      'bottom-right': { swipeDirection: 'right', bottom: 0, justify: 'end' },
      'bottom-center': { swipeDirection: 'down', bottom: 0, justify: 'center' }
    }[position]
  }, [position])

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
        distroy,
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
        swipeDirection={positions ? (positions.swipeDirection as any) : 'down'}
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
            bottom: positions ? positions.bottom : undefined,
            top: positions ? positions.top : undefined,
            display: 'flex',
            pointerEvents: 'none',
            justifyContent: positions ? positions.justify : undefined
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
          className={cn(defaultClassNames.toaster)}
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
    distroy,
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
    gap,
    type
  } = React.useContext(ContextToaster)

  const duration = toast.duration ?? defaultTimeDuration
  const toastRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (toastRef.current) {
      setHeights((prev) => {
        if (!prev[toast.id]) {
          return {
            ...prev,
            [toast.id]: toastRef.current.clientHeight
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
      distroy(toast.id)
    }, 1000)
  }

  const children =
    typeof toast.child === 'function'
      ? toast.child({ dismiss: () => distroy(toast.id) })
      : toast.child

  const childIsJsx = React.isValidElement(children) && toast.type === 'default'

  const {
    media: defaultMedia = DEFAULT_MEDIA[toast.type],
    ...defaultAtributes
  } = React.useMemo(() => {
    return defaultToasts[toast.type] ?? {}
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
    if (!isVisible) distroy(toast.id)
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
            gap: '0.75rem',
            position: 'absolute',
            overflow: 'hidden',
            '--toast-height': height ? height + 'px' : 'auto',
            top: position.includes('top') ? offsetTopBottom : undefined,
            bottom: position.includes('bottom') ? offsetTopBottom : undefined,
            ...defaultStyles.toast,
            ...defaultAtributes.style,
            ...toast.style
          } as React.CSSProperties
        }
        className={cn(
          defaultClassNames.toast,
          defaultAtributes.className,
          toast.className
        )}
      >
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
                {Media && Media}
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
                      {defaultDismissButtonProps?.children ?? 'Close'}
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
      loading="lazy"
      alt="Icon"
    />
  )
})

ImageMedia.displayName = 'ImageMedia'

const DEFAULT_MEDIA = {
  success: <ImageMedia size={23} src={DEFAULT_MEDIA_URLS.success} />,
  info: <ImageMedia size={23} src={DEFAULT_MEDIA_URLS.info} />,
  warning: <ImageMedia size={23} src={DEFAULT_MEDIA_URLS.warning} />,
  error: <ImageMedia size={25} src={DEFAULT_MEDIA_URLS.error} />,
  default: <ImageMedia size={23} src={DEFAULT_MEDIA_URLS.info} />
}

const cn = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ')
