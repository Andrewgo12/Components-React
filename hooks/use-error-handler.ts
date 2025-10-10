'use client'

import { useCallback } from 'react'
import { useToast } from './use-toast'

interface ErrorHandlerOptions {
  showToast?: boolean
  logError?: boolean
  fallbackMessage?: string
}

export function useErrorHandler() {
  const { toast } = useToast()

  const handleError = useCallback((
    error: Error | unknown,
    options: ErrorHandlerOptions = {}
  ) => {
    const {
      showToast = true,
      logError = true,
      fallbackMessage = 'Ha ocurrido un error inesperado'
    } = options

    const errorMessage = error instanceof Error ? error.message : fallbackMessage

    if (logError) {
      console.error('Error handled:', error)
    }

    if (showToast) {
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
    }

    return errorMessage
  }, [toast])

  const withErrorHandling = useCallback(<T extends any[], R>(
    fn: (...args: T) => R | Promise<R>,
    options?: ErrorHandlerOptions
  ) => {
    return async (...args: T): Promise<R | null> => {
      try {
        const result = await fn(...args)
        return result
      } catch (error) {
        handleError(error, options)
        return null
      }
    }
  }, [handleError])

  return { handleError, withErrorHandling }
}