"use client"

import { useState, useCallback } from "react"

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

interface ToastState {
  toasts: Toast[]
}

const initialState: ToastState = {
  toasts: [],
}

let toastState = initialState
const listeners: Array<(state: ToastState) => void> = []

const notify = () => {
  listeners.forEach((listener) => listener(toastState))
}

export const useToast = () => {
  const [state, setState] = useState(toastState)

  const subscribe = useCallback((listener: (state: ToastState) => void) => {
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  const toast = useCallback(({ ...props }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      id,
      duration: 5000,
      ...props,
    }

    toastState = {
      ...toastState,
      toasts: [...toastState.toasts, newToast],
    }

    notify()

    // Auto remove after duration
    setTimeout(() => {
      toastState = {
        ...toastState,
        toasts: toastState.toasts.filter((t) => t.id !== id),
      }
      notify()
    }, newToast.duration)

    return id
  }, [])

  const dismiss = useCallback((toastId: string) => {
    toastState = {
      ...toastState,
      toasts: toastState.toasts.filter((t) => t.id !== toastId),
    }
    notify()
  }, [])

  // Subscribe to state changes
  useState(() => {
    const unsubscribe = subscribe(setState)
    return unsubscribe
  })

  return {
    toasts: state.toasts,
    toast,
    dismiss,
  }
}
