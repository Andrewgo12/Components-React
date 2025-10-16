/**
 * Validation utilities for component properties and user inputs
 * Updated to support 100 total components across 5 categories
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
    // Componentes Básicos (25 total)
    'button', 'input', 'card', 'badge', 'text', 'image', 'checkbox', 'radio', 'toggle', 'slider',
    'avatar', 'textarea', 'select', 'progress', 'alert', 'list', 'table', 'tabs', 'accordion',
    'modal', 'dropdown', 'spinner', 'skeleton', 'tooltip', 'notification',
    
    // Magic UI Components (25 total)
    'glow-button', 'shimmer-button', 'ripple-button', 'magnetic-button', 'loading-button',
    'glass-card', 'fade-card', 'gradient-text', 'typewriter-text', 'glow-text', 'neon-badge',
    'count-badge', 'rotate-icon', 'icon-glow', 'particle-button', 'flip-card', 'hologram-card',
    'number-ticker', 'pulse-badge', 'floating-icon', 'wave-text', 'crystal-button',
    'morphing-card', 'neon-text', 'floating-button',
    
    // Efectos (25 total)
    'effect-glow', 'effect-shimmer', 'effect-neon', 'effect-ripple', 'effect-glass',
    'effect-crystal', 'effect-particle', 'effect-stardust', 'effect-matrix', 'effect-glitch',
    'effect-lightning', 'effect-3d', 'effect-morph', 'effect-wave', 'effect-distortion',
    'effect-fire', 'effect-magnetic', 'effect-lightning-storm', 'effect-plasma-orb',
    'effect-pulse', 'effect-bounce', 'effect-rotate', 'effect-scale', 'effect-slide', 'effect-fade',
    
    // Fondos (25 total)
    'bg-dots', 'bg-grid', 'bg-lines', 'bg-polka', 'bg-mesh', 'bg-aurora', 'bg-waves',
    'bg-stars', 'bg-nebula', 'bg-galaxy', 'bg-matrix', 'bg-circuit', 'bg-glitch',
    'bg-particles', 'bg-rain', 'bg-hexagon', 'bg-circles', 'bg-gradient', 'bg-plasma',
    'bg-rainbow', 'bg-ripple', 'bg-matrix-rain', 'bg-cosmic-dust', 'bg-chevron', 'bg-zigzag',
    
    // Templates (25 total)
    'login-form', 'signup-form', 'pricing-card', 'profile-card', 'stats-card', 'navbar',
    'sidebar', 'blog-card', 'product-card', 'dashboard-widget', 'contact-form',
    'newsletter-signup', 'testimonial-card', 'notification-toast', 'cart-item',
    'hero-section', 'feature-card', 'team-member', 'metric-card', 'chat-message',
    'social-post', 'progress-tracker', 'comparison-table', 'error-page', 'loading-skeleton'
  ]
  return validTypes.includes(type)
}