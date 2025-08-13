"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {children}
      </div>
    </div>
  )
}

interface DialogContentProps {
  className?: string
  children: React.ReactNode
}

export function DialogContent({ className, children }: DialogContentProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {children}
    </div>
  )
}

interface DialogHeaderProps {
  className?: string
  children: React.ReactNode
  onClose?: () => void
}

export function DialogHeader({ className, children, onClose }: DialogHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800", className)}>
      <div className="flex-1">
        {children}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

interface DialogTitleProps {
  className?: string
  children: React.ReactNode
}

export function DialogTitle({ className, children }: DialogTitleProps) {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  )
}

interface DialogBodyProps {
  className?: string
  children: React.ReactNode
}

export function DialogBody({ className, children }: DialogBodyProps) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-6", className)}>
      {children}
    </div>
  )
}

interface DialogFooterProps {
  className?: string
  children: React.ReactNode
}

export function DialogFooter({ className, children }: DialogFooterProps) {
  return (
    <div className={cn("flex items-center justify-end gap-2 p-6 border-t border-gray-200 dark:border-gray-800", className)}>
      {children}
    </div>
  )
}