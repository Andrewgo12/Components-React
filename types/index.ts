export interface ComponentProps {
  id: string
  type: string
  name: string
  props: Record<string, any>
  position: { x: number; y: number }
  locked: boolean
  hidden: boolean
}

export interface EditorState {
  components: ComponentProps[]
  selectedComponent: ComponentProps | null
  zoom: number
  showGrid: boolean
  showRulers: boolean
  mode: 'design' | 'preview'
}

export interface EffectConfig {
  enabled: boolean
  [key: string]: any
}

export interface ComponentEffects {
  glow?: EffectConfig & {
    intensity?: number
    color?: string
  }
  shimmer?: EffectConfig & {
    speed?: number
  }
  ripple?: EffectConfig & {
    duration?: number
  }
  gradient?: EffectConfig & {
    type?: 'linear' | 'radial' | 'conic'
    color1?: string
    color2?: string
  }
  borderBeam?: EffectConfig & {
    width?: number
    color?: string
  }
  glass?: EffectConfig & {
    blur?: number
    opacity?: number
  }
  transform3d?: EffectConfig & {
    rotateX?: number
    rotateY?: number
    perspective?: number
  }
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}