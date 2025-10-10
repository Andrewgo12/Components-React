/**
 * Validation utilities for component properties and user inputs
 */

export const validateColor = (color: string): boolean => {
  if (typeof color !== 'string') return false
  const validColorRegex = /^(#[0-9a-fA-F]{3,8}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)|[a-zA-Z]+)$/
  return validColorRegex.test(color.trim())
}

export const sanitizeString = (input: string, maxLength = 100): string => {
  if (typeof input !== 'string') return ''
  return input.trim().slice(0, maxLength).replace(/[<>]/g, '')
}

export const validateComponentId = (id: string): boolean => {
  return typeof id === 'string' && /^[a-zA-Z0-9-_]+$/.test(id)
}

export const validatePosition = (position: { x: number; y: number }): boolean => {
  return (
    typeof position === 'object' &&
    typeof position.x === 'number' &&
    typeof position.y === 'number' &&
    !isNaN(position.x) &&
    !isNaN(position.y)
  )
}

export const validateComponentType = (type: string): boolean => {
  const validTypes = [
    'button', 'input', 'card', 'badge', 'marquee', 'typewriter',
    'number-ticker', 'ripple-button', 'glow-card', 'gradient-text',
    'shimmer-button', 'icon-badge', 'dots-bg', 'grid-bg', 'aurora-bg',
    'particles-bg', 'bento-grid', 'login-form', 'pricing-card', 'notification'
  ]
  return validTypes.includes(type)
}