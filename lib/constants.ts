export const COMPONENT_TYPES = [
  'button', 'input', 'card', 'badge', 'marquee', 'typewriter',
  'number-ticker', 'ripple-button', 'glow-card', 'gradient-text',
  'shimmer-button', 'icon-badge', 'dots-bg', 'grid-bg', 'aurora-bg',
  'particles-bg', 'bento-grid', 'login-form', 'pricing-card', 'notification'
] as const

export const KEYBOARD_SHORTCUTS = {
  SAVE: 'ctrl+s',
  DUPLICATE: 'ctrl+d',
  DELETE: 'Delete',
  LOCK: 'ctrl+l',
  HIDE: 'ctrl+h',
  GRID: "ctrl+'",
  RULERS: 'ctrl+r',
} as const

export const CANVAS_CONFIG = {
  DEFAULT_WIDTH: 1200,
  DEFAULT_HEIGHT: 800,
  MIN_ZOOM: 25,
  MAX_ZOOM: 200,
  ZOOM_STEP: 25,
} as const

export const TOAST_CONFIG = {
  LIMIT: 1,
  REMOVE_DELAY: 5000,
} as const