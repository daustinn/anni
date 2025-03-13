/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
'use client'

import './styles.css'
export * from './state'
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

const DURATION_TOAST = 5000

interface ToasterProps {
  unstyled?: boolean

  defaultActionProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  defaultActionAltText?: string
  defaultActionChild?: string

  defaultCloseButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  defaultCloseButton?: boolean

  defaultClassNames?: {
    container?: string
    toast?: string
  }

  defaultStyles?: {
    container?: React.CSSProperties
    toast?: React.CSSProperties
  }

  defaultTimeDuration?: number
  position?: ToastPosition

  offset?: number

  defaultVariant?: 'gentle' | 'filled'

  defaultIcons?: {
    success?: React.ReactNode
    error?: React.ReactNode
    warning?: React.ReactNode
    info?: React.ReactNode
  }

  theme?: 'dark' | 'light'
  appearance?: 'brand' | 'invert'

  gap?: number
}

type ContextToasterT = ToasterProps & {
  toasts: Toast[]
  distroy: (id: string) => void
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
    defaultCloseButton = false,
    defaultCloseButtonProps = {},
    position = 'bottom-center',
    defaultVariant = 'gentle',
    defaultTimeDuration = DURATION_TOAST,
    offset = 20,
    defaultIcons = DEFAULT_ICONS,
    theme = 'dark',
    appearance = 'brand',
    gap = 15,
    defaultStyles = {}
  } = props
  const [toasts, setToasts] = React.useState<Toast[]>(ToastInstance.toasts)

  React.useEffect(() => {
    const unsubscribe = ToastInstance.subscribe((state) =>
      setToasts(state.toasts)
    )
    return () => unsubscribe()
  }, [])

  const distroy = (id: string) => {
    ToastInstance.removeToast(id)
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const positions = React.useMemo(
    () =>
      ({
        'top-left': {
          swipeDirection: 'left',
          top: 0,
          justify: 'start'
        },
        'top-right': {
          swipeDirection: 'right',
          top: 0,
          justify: 'end'
        },
        'top-center': {
          swipeDirection: 'up',
          top: 0,
          justify: 'center'
        },
        'bottom-left': {
          swipeDirection: 'left',
          bottom: 0,
          justify: 'start'
        },
        'bottom-right': {
          swipeDirection: 'right',
          bottom: 0,
          justify: 'end'
        },
        'bottom-center': {
          swipeDirection: 'down',
          bottom: 0,
          justify: 'center'
        }
      }[position]),
    [position]
  )

  return (
    <ContextToaster.Provider
      value={{
        toasts,
        unstyled,
        defaultActionAltText,
        defaultActionChild,
        defaultActionProps,
        defaultClassNames,
        defaultCloseButton,
        defaultCloseButtonProps,
        position,
        defaultVariant,
        defaultTimeDuration,
        distroy,
        defaultIcons,
        appearance,
        gap,
        defaultStyles
      }}
    >
      <ToastPrimitives.ToastProvider
        swipeDirection={positions ? (positions.swipeDirection as any) : 'down'}
        swipeThreshold={30}
      >
        <div
          style={{
            padding: offset + 'px',
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: positions ? positions.bottom : undefined,
            top: positions ? positions.top : undefined,
            display: 'flex',
            pointerEvents: 'none',
            justifyContent: positions ? positions.justify : undefined,
            ...defaultStyles.container
          }}
          data-anni-container
          data-anni-theme={theme}
          data-anni-appearance={appearance}
        >
          <ToastPrimitives.Viewport asChild>
            <div
              data-anni-viewport
              style={{
                position: 'relative',
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: gap + 'px'
              }}
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
    defaultCloseButton,
    distroy,
    defaultActionProps,
    defaultActionAltText,
    defaultActionChild,
    defaultCloseButtonProps,
    defaultIcons,
    defaultStyles,
    defaultClassNames
  } = React.useContext(ContextToaster)

  const duration = toast.duration ?? defaultTimeDuration

  const hasActions = !!toast.action || toast.closeButton || defaultCloseButton

  const handleClosed = () => {
    setTimeout(() => {
      distroy(toast.id)
    }, 1000)
  }

  const children =
    typeof toast.child === 'function'
      ? toast.child({ dismiss: () => distroy(toast.id) })
      : toast.child

  const childIsJsx = React.isValidElement(children)

  const Icon = React.useMemo(() => {
    return toast.icon
      ? toast.icon
      : defaultIcons
      ? defaultIcons[toast.type as keyof typeof defaultIcons]
      : null
  }, [defaultIcons, toast.icon])

  return (
    <ToastPrimitives.Root
      type="background"
      duration={duration}
      onOpenChange={(v) => v === false && handleClosed()}
      asChild
    >
      <div
        data-anni-toast=""
        data-anni-type={toast.type}
        style={{
          display: 'flex',
          zIndex: 1,
          width: '100%',
          pointerEvents: 'auto',
          alignItems: 'center',
          gap: '0.75rem',
          ...defaultStyles.toast,
          ...toast.style
        }}
        className={
          `${defaultClassNames.toast} ${toast.className}`.trim() || undefined
        }
      >
        {childIsJsx ? (
          children
        ) : (
          <>
            {Icon && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
                data-anni-icon=""
              >
                {Icon && Icon}
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
                      className={`${defaultActionProps?.className} ${toast.actionsProps?.className}`}
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
                  {(defaultCloseButton || toast.closeButton) && (
                    <ToastPrimitives.Close
                      {...defaultCloseButtonProps}
                      data-anni-close=""
                      style={{
                        ...defaultCloseButtonProps?.style,
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      className={defaultCloseButtonProps?.className}
                    >
                      {defaultCloseButtonProps?.children ?? 'Close'}
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

type IconProps = React.ComponentPropsWithoutRef<'svg'> & { size?: number }

export const Warning = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, ...props }, forwardRef) => {
    return (
      <svg
        {...props}
        ref={forwardRef}
        width={size}
        height={size}
        viewBox="0 0 215 215"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="107.5"
          cy="107.5"
          r="107.5"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <circle
          cx="108"
          cy="108"
          r="80"
          stroke="currentColor"
          strokeWidth="16"
        />
        <path
          d="M153.809 120.239L123.77 66.2481C119.734 58.9837 114.149 55 108 55C101.852 55 96.2661 58.9837 92.2297 66.2481L62.1912 120.239C58.3895 127.128 57.967 133.737 61.0178 138.939C64.0686 144.141 70.0763 147 77.9614 147H138.039C145.924 147 151.931 144.141 154.982 138.939C158.033 133.737 157.611 127.082 153.809 120.239ZM104.48 87.8069C104.48 85.8854 106.076 84.2919 108 84.2919C109.924 84.2919 111.52 85.8854 111.52 87.8069V111.24C111.52 113.162 109.924 114.755 108 114.755C106.076 114.755 104.48 113.162 104.48 111.24V87.8069ZM111.332 128.628C111.098 128.816 110.863 129.003 110.628 129.191C110.347 129.378 110.065 129.519 109.784 129.612C109.502 129.753 109.22 129.847 108.892 129.894C108.61 129.94 108.282 129.987 108 129.987C107.718 129.987 107.39 129.94 107.061 129.894C106.78 129.847 106.498 129.753 106.217 129.612C105.935 129.519 105.653 129.378 105.372 129.191C105.137 129.003 104.902 128.816 104.668 128.628C103.823 127.738 103.307 126.519 103.307 125.301C103.307 124.082 103.823 122.863 104.668 121.973C104.902 121.786 105.137 121.598 105.372 121.411C105.653 121.223 105.935 121.083 106.217 120.989C106.498 120.848 106.78 120.754 107.061 120.708C107.672 120.567 108.329 120.567 108.892 120.708C109.22 120.754 109.502 120.848 109.784 120.989C110.065 121.083 110.347 121.223 110.628 121.411C110.863 121.598 111.098 121.786 111.332 121.973C112.177 122.863 112.694 124.082 112.694 125.301C112.694 126.519 112.177 127.738 111.332 128.628Z"
          fill="white"
        />
      </svg>
    )
  }
)
Warning.displayName = 'WarningIcon'

const Check = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, ...props }, forwardRef) => {
    return (
      <svg
        ref={forwardRef}
        width={size}
        height={size}
        {...props}
        viewBox="0 0 215 215"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="107.5"
          cy="107.5"
          r="107.5"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <circle
          cx="108"
          cy="108"
          r="80"
          stroke="currentColor"
          strokeWidth="16"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M151.524 76.453C154.825 79.7237 154.825 85.0264 151.524 88.2971L100.797 138.547C97.4948 141.818 92.1417 141.818 88.84 138.547L63.4763 113.422C60.1746 110.151 60.1746 104.849 63.4763 101.578C66.778 98.3074 72.1311 98.3074 75.4329 101.578L94.8183 120.781L139.567 76.453C142.869 73.1823 148.222 73.1823 151.524 76.453Z"
          fill="white"
        />
      </svg>
    )
  }
)
Check.displayName = 'CheckIcon'

export const Info = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, ...props }, forwardRef) => {
    return (
      <svg
        ref={forwardRef}
        width={size}
        height={size}
        {...props}
        viewBox="0 0 215 215"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="107.5"
          cy="107.5"
          r="107.5"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <circle
          cx="108"
          cy="108"
          r="80"
          stroke="currentColor"
          strokeWidth="16"
        />
        <path
          d="M108 91.24C102.256 91.24 97.6 95.8962 97.6 101.64V145.84C97.6 151.584 102.256 156.24 108 156.24C113.744 156.24 118.4 151.584 118.4 145.84V101.64C118.4 95.8962 113.744 91.24 108 91.24Z"
          fill="white"
        />
        <path
          d="M108 59C100.943 59 95 64.9435 95 72C95 79.0565 100.943 85 108 85C115.057 85 121 79.0565 121 72C121 64.9435 115.057 59 108 59Z"
          fill="white"
        />
      </svg>
    )
  }
)
Info.displayName = 'InfoIcon'

export const Error = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, ...props }, forwardRef) => {
    return (
      <svg
        ref={forwardRef}
        width={size}
        height={size}
        {...props}
        viewBox="0 0 215 215"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="107.5"
          cy="107.5"
          r="107.5"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <circle
          cx="108"
          cy="108"
          r="80"
          stroke="currentColor"
          strokeWidth="16"
        />
        <path
          d="M145.099 135.491C146.354 136.859 147.035 138.664 146.999 140.526C146.963 142.389 146.213 144.165 144.906 145.483C143.599 146.801 141.837 147.558 139.988 147.595C138.14 147.633 136.348 146.948 134.99 145.684L107.7 118.186L80.4104 145.684C79.7563 146.397 78.9661 146.97 78.0871 147.367C77.2081 147.765 76.2584 147.98 75.295 147.999C74.3316 148.018 73.3744 147.84 72.4807 147.477C71.587 147.114 70.7753 146.573 70.0942 145.886C69.4131 145.2 68.8766 144.381 68.517 143.48C68.1574 142.58 67.9821 141.615 68.0014 140.644C68.0208 139.674 68.2346 138.717 68.6299 137.831C69.0252 136.946 69.5938 136.15 70.3018 135.491L97.5916 107.993L70.3018 80.5087C69.5938 79.85 69.0252 79.0541 68.6299 78.1687C68.2346 77.2832 68.0208 76.3264 68.0014 75.3557C67.9821 74.385 68.1574 73.4203 68.517 72.5196C68.8766 71.6188 69.4131 70.8005 70.0942 70.1137C70.7753 69.4269 71.587 68.8858 72.4807 68.5228C73.3744 68.1599 74.3316 67.9825 75.295 68.0014C76.2584 68.0202 77.2081 68.235 78.0871 68.6327C78.9661 69.0304 79.7563 69.6028 80.4104 70.3158L107.7 97.8071L134.99 70.3088C136.348 69.0451 138.14 68.3602 139.988 68.3977C141.837 68.4352 143.599 69.1921 144.906 70.5099C146.213 71.8277 146.963 73.604 146.999 75.4667C147.035 77.3293 146.354 79.1337 145.099 80.5017L117.809 107.993L145.099 135.491Z"
          fill="white"
        />
      </svg>
    )
  }
)
Error.displayName = 'ErrorIcon'

const DEFAULT_ICONS = {
  success: <Check size={23} />,
  info: <Info size={23} />,
  warning: <Warning size={23} />,
  error: <Error size={23} />,
  default: <Info size={23} />
}
