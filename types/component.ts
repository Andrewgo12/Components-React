// Interfaces TypeScript estrictas para componentes
export interface ComponentPosition {
  x: number
  y: number
}

export interface ComponentColors {
  background?: string
  text?: string
  border?: string
}

export interface ComponentTypography {
  fontSize?: number
  fontWeight?: number
  fontFamily?: string
  letterSpacing?: number
  lineHeight?: number
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  textDecoration?: 'none' | 'underline' | 'overline' | 'line-through'
  fontStyle?: 'normal' | 'italic' | 'oblique'
}

export interface ComponentLayout {
  width?: string | number
  height?: string | number
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  zIndex?: number
  order?: number
  visible?: boolean
  interactive?: boolean
}

export interface ComponentBorder {
  borderRadius?: number
  borderWidth?: number
  borderColor?: string
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double'
}

export interface ComponentTransform {
  rotate?: number
  scaleX?: number
  scaleY?: number
  skewX?: number
  skewY?: number
  translateX?: number
  translateY?: number
  transformOrigin?: string
}

export interface ComponentFilters {
  blur?: number
  brightness?: number
  contrast?: number
  saturate?: number
  hueRotate?: number
  invert?: number
  sepia?: number
}

export interface ComponentEffects {
  glow?: {
    enabled: boolean
    intensity?: number
    color?: string
  }
  shimmer?: {
    enabled: boolean
    speed?: number
  }
  ripple?: {
    enabled: boolean
    duration?: number
  }
}

export interface ComponentProps extends 
  ComponentTypography,
  ComponentLayout,
  ComponentBorder,
  ComponentTransform,
  ComponentFilters {
  text?: string
  placeholder?: string
  colors?: ComponentColors
  effects?: ComponentEffects
  elementId?: string
  className?: string
  [key: string]: unknown
}

export interface ComponentData {
  id: string
  type: string
  name: string
  props: ComponentProps
  position: ComponentPosition
  locked?: boolean
  hidden?: boolean
}

export interface InspectorProps {
  selectedComponent: ComponentData | null
  onUpdateComponent: (id: string, updates: Partial<ComponentData>) => void
}