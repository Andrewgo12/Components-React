// Sistema centralizado de logging seguro
type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  data?: unknown
  timestamp: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private sanitize(input: unknown): string {
    if (typeof input === 'string') {
      return input.replace(/[\r\n\t]/g, ' ').slice(0, 1000)
    }
    return String(input).slice(0, 1000)
  }

  private log(level: LogLevel, message: string, data?: unknown): void {
    if (!this.isDevelopment && level === 'debug') return

    const entry: LogEntry = {
      level,
      message: this.sanitize(message),
      data: data ? this.sanitize(JSON.stringify(data)) : undefined,
      timestamp: new Date().toISOString()
    }

    const logMessage = `[${entry.timestamp}] ${level.toUpperCase()}: ${entry.message}`
    
    switch (level) {
      case 'error':
        // eslint-disable-next-line no-console
        console.error(logMessage, entry.data)
        break
      case 'warn':
        // eslint-disable-next-line no-console
        console.warn(logMessage, entry.data)
        break
      case 'info':
        // eslint-disable-next-line no-console
        console.info(logMessage, entry.data)
        break
      case 'debug':
        // eslint-disable-next-line no-console
        console.debug(logMessage, entry.data)
        break
    }
  }

  debug(message: string, data?: unknown): void {
    this.log('debug', message, data)
  }

  info(message: string, data?: unknown): void {
    this.log('info', message, data)
  }

  warn(message: string, data?: unknown): void {
    this.log('warn', message, data)
  }

  error(message: string, error?: Error | unknown): void {
    this.log('error', message, error instanceof Error ? error.message : error)
  }
}

export const logger = new Logger()