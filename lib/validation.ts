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
    // Basic Components - Core UI
    'button', 'input', 'card', 'badge', 'text', 'image', 'checkbox', 'radio', 'toggle', 'slider', 'avatar', 'divider',
    'textarea', 'select', 'progress', 'alert', 'tooltip', 'breadcrumb', 'pagination', 'tabs',
    
    // Basic Components - Form Elements
    'form', 'fieldset', 'label', 'input-number', 'input-email', 'input-password', 'input-search', 'input-url',
    'input-tel', 'input-date', 'input-time', 'input-file', 'input-range', 'input-color', 'datalist', 'optgroup',
    'option', 'button-submit', 'button-reset', 'button-button',
    
    // Basic Components - Layout Elements
    'container', 'grid', 'flexbox', 'section', 'article', 'aside', 'header', 'main', 'nav',
    
    // Basic Components - Typography
    'heading-1', 'heading-2', 'heading-3', 'paragraph', 'blockquote', 'code-block', 'inline-code',
    'emphasis', 'strong', 'small', 'mark', 'del', 'ins', 'sub', 'sup',
    
    // Basic Components - Media & Interactive
    'video', 'audio', 'iframe', 'canvas', 'svg', 'map', 'embed', 'object', 'picture', 'figure',
    
    // Basic Components - Additional UI Elements
    'list', 'table', 'accordion', 'modal', 'dropdown', 'popover', 'stepper', 'rating', 'calendar', 'timeline',
    
    // Magic UI Components - Animated Buttons
    'glow-button', 'shimmer-button', 'ripple-button', 'magnetic-button', 'liquid-button', 'morphing-button',
    'elastic-button', 'neon-button', 'gradient-border-button', 'loading-button', 'success-button', 'danger-button',
    'warning-button', 'info-button', 'ghost-button', 'outline-button', 'link-button', 'icon-button',
    'fab-button', 'toggle-button', 'split-button', 'dropdown-button',
    
    // Magic UI Components - Animated Cards
    'glass-card', 'animated-card', 'floating-button', 'pulse-badge', 'bounce-card', 'slide-text',
    'rotate-icon', 'scale-button', 'fade-card', 'flip-card', 'glow-text', 'particle-button',
    'hover-card', 'tilt-card', 'expand-card', 'parallax-card', 'reveal-card',
    
    // Magic UI Components - Animated Text
    'gradient-text', 'neon-badge', 'typewriter-text', 'marquee-text', 'number-ticker',
    'text-reveal', 'text-scramble', 'text-wave', 'text-typing', 'text-glitch',
    
    // Magic UI Components - Animated Badges & Icons
    'badge-pulse', 'badge-bounce', 'badge-spin', 'icon-float', 'icon-rotate',
    
    // Magic UI Components - Interactive Elements
    'interactive-card', 'hover-reveal', 'click-effect', 'drag-element', 'swipe-card',
    
    // Background Components - Geometric Patterns
    'bg-dots', 'bg-grid', 'bg-mesh', 'bg-lines', 'bg-chevron', 'bg-diamond', 'bg-zigzag', 'bg-cross', 'bg-polka',
    
    // Background Components - Organic Patterns
    'bg-circles', 'bg-hexagon', 'bg-triangles', 'bg-organic-1', 'bg-organic-2',
    
    // Background Components - Digital & Tech
    'bg-matrix', 'bg-noise', 'bg-circuit', 'bg-binary', 'bg-glitch',
    
    // Background Components - Animated Effects
    'bg-aurora', 'bg-particles', 'bg-waves', 'bg-gradient', 'bg-stars', 'bg-plasma',
    'bg-ripple', 'bg-spiral', 'bg-fractal', 'bg-cellular', 'bg-lightning',
    
    // Background Components - Artistic & Abstract
    'bg-abstract-1', 'bg-abstract-2', 'bg-watercolor', 'bg-marble', 'bg-cosmic',
    
    // Template Components - Authentication & Forms
    'login-form', 'signup-form', 'contact-form', 'newsletter', 'search-bar',
    
    // Template Components - E-commerce & Business
    'pricing-card', 'product-card', 'testimonial', 'feature-card', 'team-card',
    
    // Template Components - Content & Media
    'blog-card', 'gallery-card', 'timeline-card', 'faq-card', 'notification',
    
    // Template Components - Navigation & Layout
    'navigation', 'footer', 'hero-section',
    
    // Template Components - Dashboard & Analytics
    'profile-card', 'stats-card', 'metric-card', 'progress-card', 'activity-feed',
    'chart-widget', 'notification-center',
    
    // Effects - Visual Effects
    'effect-glow', 'effect-shimmer', 'effect-gradient', 'effect-shadow', 'effect-blur',
    
    // Effects - Motion Effects
    'effect-pulse', 'effect-bounce', 'effect-rotate', 'effect-scale', 'effect-slide', 'effect-fade',
    
    // Effects - Transform Effects
    'effect-flip', 'effect-morph', 'effect-magnetic', 'effect-liquid', 'effect-elastic',
    
    // Effects - Particle Effects
    'effect-particle', 'effect-wave', 'effect-lightning',
    
    // Effects - Advanced Effects
    'effect-glass', 'effect-neon', 'effect-ripple', 'effect-hologram', 'effect-distortion', 'effect-chromatic',
    'effect-3d', 'effect-parallax', 'effect-tilt', 'effect-perspective', 'effect-matrix',
    'effect-cyberpunk', 'effect-retro', 'effect-vaporwave', 'effect-synthwave', 'effect-quantum',
    
    // New Effects - Particle & Advanced
    'effect-chispas', 'effect-magia', 'effect-cosmico', 'effect-nebulosa', 'effect-polvo-estelar',
    'effect-meteoro', 'effect-cometa', 'effect-wave', 'effect-lightning', 'effect-distorsion',
    'effect-glitch', 'effect-ruido', 'effect-estatica', 'effect-interferencia', 'effect-cromatico',
    'effect-aberracion', 'effect-vineta', 'effect-bloom', 'effect-destello', 'effect-rayos-divinos',
    'effect-volumetrico', 'effect-subsuperficie', 'effect-causticas', 'effect-refraccion',
    'effect-reflexion', 'effect-iridiscencia', 'effect-opalescencia'
  ]
  return validTypes.includes(type)
}