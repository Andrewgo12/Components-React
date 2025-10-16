// Manejador global de errores
import { logger } from './logger'

export interface AppError extends Error {
  code?: string
  context?: Record<string, unknown>
}

export class ComponentError extends Error implements AppError {
  code: string
  context?: Record<string, unknown>

  constructor(message: string, code: string, context?: Record<string, unknown>) {
    super(message)
    this.name = 'ComponentError'
    this.code = code
    if (context) {
      this.context = context
    }
  }
}

export class ValidationError extends Error implements AppError {
  code = 'VALIDATION_ERROR'
  context?: Record<string, unknown>

  constructor(message: string, context?: Record<string, unknown>) {
    super(message)
    this.name = 'ValidationError'
    if (context) {
      this.context = context
    }
  }
}

export function handleError(error: Error | AppError, context?: string): void {
  const errorContext = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    context,
    ...(('context' in error) ? error.context : {})
  }

  logger.error(`Error in ${context || 'unknown context'}`, errorContext)
}

export function withErrorBoundary<T extends (...args: any[]) => any>(
  fn: T,
  context: string
): T {
  return ((...args: Parameters<T>) => {
    try {
      const result = fn(...args)
      if (result instanceof Promise) {
        return result.catch((error) => {
          handleError(error, context)
          throw error
        })
      }
      return result
    } catch (error) {
      handleError(error as Error, context)
      throw error
    }
  }) as T
}

export function safeExecute<T>(
  fn: () => T,
  fallback: T,
  context: string
): T {
  try {
    return fn()
  } catch (error) {
    handleError(error as Error, context)
    return fallback
  }
}