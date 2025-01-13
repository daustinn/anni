'use client'

import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cn, cva, VariantProps } from '@nanui/utils'
import './styles.css'

export interface ToastDetails {
  id: string
  duration?: number
  className?: string
  style?: React.CSSProperties
  position?:
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
  unstyled?: boolean
}

type ToastDetailsNotJsx = {
  title?: string | React.ReactNode
  description?: string

  action?: () => void
  actionChild?: string
  actionAltText?: string
  actionsProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>

  closeButton?: boolean
  variant?: 'gentle' | 'filled'
}

type ToastDefault = ToastDetails & ToastDetailsNotJsx & { type: 'default' }
type ToastSuccess = ToastDetails & ToastDetailsNotJsx & { type: 'success' }
type ToastError = ToastDetails & ToastDetailsNotJsx & { type: 'error' }
type ToastWarning = ToastDetails & ToastDetailsNotJsx & { type: 'warning' }
type ToastInfo = ToastDetails & ToastDetailsNotJsx & { type: 'info' }
type ToastJsx = ToastDetails & {
  type: 'jsx'
  jsx: React.ReactNode
}

type ToastIdOmited =
  | Omit<ToastDefault, 'id'>
  | Omit<ToastSuccess, 'id'>
  | Omit<ToastError, 'id'>
  | Omit<ToastWarning, 'id'>
  | Omit<ToastInfo, 'id'>
  | Omit<ToastJsx, 'id'>

export type Toast =
  | ToastDefault
  | ToastSuccess
  | ToastError
  | ToastWarning
  | ToastInfo
  | ToastJsx

type Listener = (value: { toast: Toast | null }) => void

export type ToastStateT = {
  toast: Toast | null
}

class ToastState {
  private readonly state: ToastStateT = {
    toast: null
  }

  private listeners: Listener[] = []

  get toast() {
    return this.state.toast
  }

  addToast = (toast: Toast) => {
    this.state.toast = toast
    this.notify()
  }

  distroyToast = () => {
    this.state.toast = null
    this.notify()
  }

  createToast = async (payload: ToastIdOmited) => {
    this.addToast({
      id: crypto.randomUUID(),
      ...payload
    })
  }

  private notify() {
    this.listeners.forEach((listener) => {
      listener(this.state)
    })
  }

  subscribe = (listener: Listener) => {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  // functions
  success = (
    title: ToastDetailsNotJsx['title'],
    payload?: Omit<ToastSuccess, 'id' | 'type' | 'title'>
  ) => {
    this.createToast({
      type: 'success',
      title,
      ...payload
    })
  }

  error = (
    title: ToastDetailsNotJsx['title'],
    payload?: Omit<ToastError, 'id' | 'type' | 'title'>
  ) => {
    this.createToast({
      ...payload,
      title,
      type: 'error'
    })
  }

  warning = (
    title: ToastDetailsNotJsx['title'],
    payload?: Omit<ToastWarning, 'id' | 'type' | 'title'>
  ) => {
    this.createToast({
      title,
      type: 'warning',
      ...payload
    })
  }

  info = (
    title: ToastDetailsNotJsx['title'],
    payload?: Omit<ToastInfo, 'id' | 'type' | 'title'>
  ) => {
    this.createToast({
      title,
      type: 'info',
      ...payload
    })
  }

  jsx = (
    jsx:
      | React.ReactNode
      | ((props: { distroy: () => void }) => React.ReactNode),
    payload?: Omit<ToastJsx, 'id' | 'type' | 'jsx'>
  ) => {
    this.createToast({
      type: 'jsx',
      jsx:
        typeof jsx === 'function' ? jsx({ distroy: this.distroyToast }) : jsx,
      ...payload
    })
  }
}

// Instance
const ToastInstance = new ToastState()

// Hook
const useToast = () => {
  const [toast, setToast] = React.useState<Toast | null>(ToastInstance.toast)

  React.useEffect(() => {
    const unsubscribe = ToastInstance.subscribe((state) => {
      setToast(state.toast)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return { toast, distroy: ToastInstance.distroyToast }
}

// bind this to the toast function
const toastFn = (
  title: ToastDetailsNotJsx['title'],
  payload?: Omit<ToastDefault, 'id' | 'type' | 'title'>
) => {
  return ToastInstance.createToast({
    title,
    type: 'default',
    ...payload
  })
}

// Export the toast function and the instance
export const toast = Object.assign(toastFn, {
  success: ToastInstance.success,
  error: ToastInstance.error,
  warning: ToastInstance.warning,
  info: ToastInstance.info,
  jsx: ToastInstance.jsx
})

const DURATION_TOAST = 5000

interface PropsToaster {
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

  defaultTimeDuration?: number
  defaultPosition?: ToastDetails['position']

  defaultVariant?: 'gentle' | 'filled'
}

export const Toaster = ({
  unstyled = false,
  defaultActionAltText = 'esc',
  defaultActionChild = 'Action',
  defaultActionProps = {},
  defaultClassNames = {},
  defaultCloseButton = false,
  defaultCloseButtonProps = {},
  defaultPosition = 'bottom-center',
  defaultVariant = 'gentle',
  defaultTimeDuration = DURATION_TOAST
}: PropsToaster): React.JSX.Element | null => {
  const { toast, distroy } = useToast()

  if (!toast) return null

  return (
    <ToastProvider swipeThreshold={50} swipeDirection="down">
      <ToastViewport
        position={toast.position ?? defaultPosition}
        className={defaultClassNames?.container}
      >
        {toast && (
          <Toast
            key={toast.id}
            data-anni-toast=""
            duration={toast.duration ?? defaultTimeDuration}
            style={toast.style}
            action={toast.type !== 'jsx' && !!toast.action}
            closeButton={
              (toast.type !== 'jsx' && !!toast.closeButton) ||
              defaultCloseButton
            }
            variant={
              toast.type !== 'jsx' ? toast.variant ?? defaultVariant : 'gentle'
            }
            color={
              toast.type === 'default'
                ? 'lime'
                : toast.type === 'success'
                ? 'lime'
                : toast.type === 'error'
                ? 'red'
                : toast.type === 'warning'
                ? 'yellow'
                : toast.type === 'info'
                ? 'cyan'
                : 'lime'
            }
            unstyled={unstyled || toast.unstyled}
            className={cn(defaultClassNames?.toast, toast.className)}
            onOpenChange={(v) => v === false && distroy()}
          >
            {toast.type === 'jsx' ? (
              toast.jsx
            ) : (
              <>
                <div>
                  {React.isValidElement(toast.title) ? (
                    toast.title
                  ) : (
                    <ToastTitle>{toast.title}</ToastTitle>
                  )}
                  {toast.description && (
                    <ToastDescription>{toast.description}</ToastDescription>
                  )}
                </div>
                {toast.action && (
                  <ToastAction
                    {...defaultActionProps}
                    {...toast.actionsProps}
                    className={cn(
                      defaultActionProps?.className,
                      toast.actionsProps?.className
                    )}
                    onClick={toast.action}
                    style={{
                      ...defaultActionProps.style,
                      ...toast.actionsProps?.style
                    }}
                    altText={
                      toast.actionAltText ?? defaultActionAltText ?? 'esc'
                    }
                  >
                    {toast.actionChild ?? defaultActionChild ?? 'Action'}
                  </ToastAction>
                )}
                {(defaultCloseButton || toast.closeButton) && (
                  <ToastClose {...defaultCloseButtonProps} onClick={distroy} />
                )}
              </>
            )}
          </Toast>
        )}
      </ToastViewport>
    </ToastProvider>
  )
}

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> & {
    position?: ToastDetails['position']
  }
>(({ className, position, ...props }, forwardRef) => (
  <ToastPrimitives.Viewport
    {...props}
    style={{
      ...props.style,
      zIndex: 9999,
      position: 'fixed',
      width: '100%',
      pointerEvents: 'none'
    }}
    ref={forwardRef}
    className={cn(
      'flex outline-none max-h-screen p-5 right-0 mx-auto',
      position?.includes('top') && 'top-0 bottom-auto',
      position?.includes('bottom') && 'bottom-0 top-auto',
      position?.includes('left') && ' justify-start',
      position?.includes('right') && ' justify-end',
      position?.includes('center') && ' justify-center',
      className
    )}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants> & {
      unstyled?: boolean
    }
>(
  (
    { className, unstyled, variant, action, closeButton, color, ...props },
    forwardRef
  ) => {
    return (
      <ToastPrimitives.Root
        {...props}
        ref={forwardRef}
        type="foreground"
        style={{
          ...props.style,
          position: 'relative',
          outline: 'none',
          pointerEvents: 'auto'
        }}
        className={
          !unstyled
            ? toastVariants({
                variant,
                color,
                className,
                action,
                closeButton
              })
            : className
        }
      />
    )
  }
)
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, forwardRef) => (
  <ToastPrimitives.Action
    {...props}
    ref={forwardRef}
    style={{
      ...props.style,
      outline: 'none'
    }}
    className={cn(
      'rounded-xl hover:scale-105 transition-transform active:scale-100 ml-4 p-2 px-4 bg-black text-white',
      className
    )}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, forwardRef) => (
  <ToastPrimitives.Close
    {...props}
    ref={forwardRef}
    style={{
      ...props.style,
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    className={cn(
      'bg-black/30 hover:scale-110 transition-transform active:scale-100 ml-2 text-black p-2 rounded-full aspect-square',
      className
    )}
  >
    <X size={15} />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn(className, 'font-medium')}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, forwardRef) => (
  <ToastPrimitives.Description
    ref={forwardRef}
    className={cn('block text-sm text-black', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

const toastVariants = cva(
  'border-2 border-black items-center flex text-[15px] rounded-[18px] max-w-[400px]',
  {
    variants: {
      color: {
        lime: 'bg-lime-100 text-black',
        red: 'bg-red-100 text-black',
        cyan: 'bg-cyan-100 text-black',
        yellow: 'bg-yellow-100 text-black'
      },
      variant: {
        gentle: 'drop-shadow-[0px_5px_6px_rgba(0,0,0,.2)]',
        filled: ''
      },
      action: {
        true: '',
        false: ''
      },
      closeButton: {
        true: '',
        false: ''
      },
      description: {
        true: 'text-left',
        false: ''
      }
    },
    compoundVariants: [
      {
        action: false,
        closeButton: false,
        className: 'p-4'
      },
      {
        action: true,
        closeButton: false,
        className: 'p-2 pl-3'
      },
      {
        action: false,
        closeButton: true,
        className: 'p-3 pl-3'
      },
      {
        action: true,
        closeButton: true,
        className: 'p-2 pl-3'
      },

      // color + variant
      {
        color: 'lime',
        variant: 'gentle',
        className: 'bg-lime-100 text-black'
      },
      {
        color: 'lime',
        variant: 'filled',
        className:
          'bg-lime-400 text-black drop-shadow-[0px_5px_6px_rgba(108,153,35,.3)]'
      },

      {
        color: 'red',
        variant: 'gentle',
        className: 'bg-rose-100 text-black'
      },
      {
        color: 'red',
        variant: 'filled',
        className:
          'bg-rose-600 text-black drop-shadow-[0px_5px_6px_rgba(185,28,28,.3)]'
      },

      {
        color: 'cyan',
        variant: 'gentle',
        className: 'bg-cyan-100 text-black'
      },
      {
        color: 'cyan',
        variant: 'filled',
        className:
          'bg-cyan-400 text-black drop-shadow-[0px_5px_6px_rgba(0,122,255,.3)]'
      },

      {
        color: 'yellow',
        variant: 'gentle',
        className: 'bg-yellow-100 text-black'
      },
      {
        color: 'yellow',
        variant: 'filled',
        className:
          'bg-yellow-400 text-black drop-shadow-[0px_5px_6px_rgba(198,162,16,.3)]'
      }
    ],
    defaultVariants: {
      color: 'lime',
      variant: 'gentle',
      description: false,
      action: false,
      closeButton: false
    }
  }
)

type IconProps = React.ComponentPropsWithoutRef<'svg'> & { size?: number }

export const X = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, ...props }, forwardRef) => {
    return (
      <svg
        {...props}
        ref={forwardRef}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4L20 20M20 4L4 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    )
  }
)
X.displayName = 'XIcon'
