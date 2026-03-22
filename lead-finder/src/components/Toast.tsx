'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, createContext, useContext, useCallback, ReactNode } from 'react'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void
  hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

const toastIcons: Record<ToastType, string> = {
  success: '✓',
  error: '!',
  info: 'i',
  warning: '⚠',
}

const toastColors: Record<ToastType, { bg: string; icon: string; text: string }> = {
  success: { bg: 'bg-green-50', icon: 'bg-green-500', text: 'text-green-800' },
  error: { bg: 'bg-red-50', icon: 'bg-red-500', text: 'text-red-800' },
  info: { bg: 'bg-blue-50', icon: 'bg-blue-500', text: 'text-blue-800' },
  warning: { bg: 'bg-yellow-50', icon: 'bg-yellow-500', text: 'text-yellow-800' },
}

function ToastComponent({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const colors = toastColors[toast.type]

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, toast.duration || 4000)
    return () => clearTimeout(timer)
  }, [toast.duration, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      className={`${colors.bg} rounded-2xl shadow-xl border border-white/50 p-4 max-w-sm w-full backdrop-blur-sm`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 ${colors.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <span className="text-white font-bold">{toastIcons[toast.type]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold ${colors.text}`}>{toast.title}</p>
          {toast.message && (
            <p className="text-sm text-gray-600 mt-1">{toast.message}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg hover:bg-black/5 flex items-center justify-center flex-shrink-0 transition-colors"
        >
          <span className="text-gray-400">×</span>
        </button>
      </div>
      {/* Progress bar */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: (toast.duration || 4000) / 1000, ease: 'linear' }}
        className={`h-1 ${colors.icon} rounded-full mt-3 opacity-30`}
      />
    </motion.div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-24 right-4 z-[100] space-y-3">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastComponent
              key={toast.id}
              toast={toast}
              onClose={() => hideToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
