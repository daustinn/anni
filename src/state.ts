import * as React from 'react'

type ToastChild = string | React.ReactNode

export interface ToastDetails {
  id: string
  duration?: number
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean

  child?: ((_: { dismiss: () => void }) => ToastChild) | ToastChild
  media?: React.ReactNode
  action?: () => void
  actionChild?: string
  actionAltText?: string
  actionsProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>

  dismissButton?: boolean
}

type ToastDefault = ToastDetails & { type: 'default' }
type ToastSuccess = ToastDetails & { type: 'success' }
type ToastError = ToastDetails & { type: 'error' }
type ToastWarning = ToastDetails & { type: 'warning' }
type ToastInfo = ToastDetails & { type: 'info' }

type ToastIdOmited =
  | Omit<ToastDefault, 'id'>
  | Omit<ToastSuccess, 'id'>
  | Omit<ToastError, 'id'>
  | Omit<ToastWarning, 'id'>
  | Omit<ToastInfo, 'id'>

export type Toast =
  | ToastDefault
  | ToastSuccess
  | ToastError
  | ToastWarning
  | ToastInfo

type Listener = (value: { toasts: Toast[] }) => void

export type ToastStateT = {
  toasts: Toast | null
}

class ToastState {
  private readonly state: { toasts: Toast[] } = {
    toasts: []
  }
  private listeners: Listener[] = []

  get toasts() {
    return this.state.toasts
  }

  addToast = (toast: Toast) => {
    this.state.toasts = [...this.state.toasts, toast]
    this.notify()
  }

  removeToast = (id: string) => {
    this.state.toasts = this.state.toasts.filter((toast) => toast.id !== id)
    this.notify()
  }

  createToast = (payload: ToastIdOmited) => {
    this.addToast({ id: crypto.randomUUID(), ...payload })
  }

  private notify() {
    this.listeners.forEach((listener) => {
      return listener(this.state)
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
    child: ToastDetails['child'],
    payload?: Omit<ToastSuccess, 'id' | 'type' | 'child'>
  ) => {
    this.createToast({ type: 'success', child, ...payload })
  }

  error = (
    child: ToastDetails['child'],
    payload?: Omit<ToastError, 'id' | 'type' | 'child'>
  ) => {
    this.createToast({ child, type: 'error', ...payload })
  }

  warning = (
    child: ToastDetails['child'],
    payload?: Omit<ToastWarning, 'id' | 'type' | 'child'>
  ) => {
    this.createToast({ child, type: 'warning', ...payload })
  }

  info = (
    child: ToastDetails['child'],
    payload?: Omit<ToastInfo, 'id' | 'type' | 'child'>
  ) => {
    this.createToast({ child, type: 'info', ...payload })
  }
}

// Instance
export const ToastInstance = new ToastState()

// bind this to the toast function
const toastFn = (
  child: ToastDetails['child'],
  payload?: Omit<ToastDefault, 'id' | 'child'>
) => {
  return ToastInstance.createToast({ child, type: 'default', ...payload })
}

// Export the toast function and the instance
export const toast = Object.assign(toastFn, {
  success: ToastInstance.success,
  error: ToastInstance.error,
  warning: ToastInstance.warning,
  info: ToastInstance.info
})
