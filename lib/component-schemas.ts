/**
 * Esquemas de propiedades editables por tipo de componente
 * Define todas las propiedades personalizables para cada tipo
 */

export interface PropertySchema {
  key: string
  label: string
  type: 'text' | 'number' | 'color' | 'select' | 'boolean' | 'range' | 'textarea' | 'array' | 'object'
  category?: 'content' | 'style' | 'layout' | 'effects' | 'advanced' | 'data'
  defaultValue?: any
  min?: number
  max?: number
  step?: number
  options?: { value: string; label: string }[]
  subSchema?: PropertySchema[] // Para objetos y arrays
  unit?: string
}

export interface ComponentSchema {
  type: string
  label: string
  properties: PropertySchema[]
}

// Propiedades comunes reutilizables
const commonTextProps: PropertySchema[] = [
  { key: 'text', label: 'Texto', type: 'text', category: 'content', defaultValue: '' },
  { key: 'title', label: 'Título', type: 'text', category: 'content', defaultValue: '' },
  { key: 'description', label: 'Descripción', type: 'textarea', category: 'content', defaultValue: '' },
  { key: 'content', label: 'Contenido', type: 'textarea', category: 'content', defaultValue: '' },
]

const commonDimensions: PropertySchema[] = [
  { key: 'width', label: 'Ancho', type: 'number', category: 'layout', min: 0, max: 2000, unit: 'px' },
  { key: 'height', label: 'Alto', type: 'number', category: 'layout', min: 0, max: 2000, unit: 'px' },
]

const commonColors: PropertySchema[] = [
  { key: 'backgroundColor', label: 'Color de fondo', type: 'color', category: 'style', defaultValue: '#ffffff' },
  { key: 'color', label: 'Color de texto', type: 'color', category: 'style', defaultValue: '#000000' },
  { key: 'borderColor', label: 'Color de borde', type: 'color', category: 'style', defaultValue: '#e5e7eb' },
]

const commonTypography: PropertySchema[] = [
  { key: 'fontSize', label: 'Tamaño de fuente', type: 'range', category: 'style', min: 8, max: 72, defaultValue: 16, unit: 'px' },
  { key: 'fontWeight', label: 'Grosor de fuente', type: 'select', category: 'style', options: [
    { value: '300', label: 'Ligera' },
    { value: '400', label: 'Normal' },
    { value: '500', label: 'Media' },
    { value: '600', label: 'Semi-negrita' },
    { value: '700', label: 'Negrita' },
    { value: '800', label: 'Extra-negrita' },
  ], defaultValue: '400' },
  { key: 'fontFamily', label: 'Familia de fuente', type: 'select', category: 'style', options: [
    { value: 'Inter, system-ui, sans-serif', label: 'Inter' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Courier New, monospace', label: 'Courier' },
    { value: 'Arial, sans-serif', label: 'Arial' },
  ], defaultValue: 'Inter, system-ui, sans-serif' },
  { key: 'letterSpacing', label: 'Espaciado de letras', type: 'range', category: 'style', min: -2, max: 10, step: 0.1, unit: 'px' },
  { key: 'lineHeight', label: 'Altura de línea', type: 'range', category: 'style', min: 0.8, max: 3, step: 0.1, defaultValue: 1.5 },
  { key: 'textAlign', label: 'Alineación', type: 'select', category: 'style', options: [
    { value: 'left', label: 'Izquierda' },
    { value: 'center', label: 'Centro' },
    { value: 'right', label: 'Derecha' },
    { value: 'justify', label: 'Justificado' },
  ] },
]

const commonSpacing: PropertySchema[] = [
  { key: 'paddingX', label: 'Padding horizontal', type: 'range', category: 'layout', min: 0, max: 100, defaultValue: 16, unit: 'px' },
  { key: 'paddingY', label: 'Padding vertical', type: 'range', category: 'layout', min: 0, max: 100, defaultValue: 12, unit: 'px' },
  { key: 'marginX', label: 'Margin horizontal', type: 'range', category: 'layout', min: 0, max: 100, unit: 'px' },
  { key: 'marginY', label: 'Margin vertical', type: 'range', category: 'layout', min: 0, max: 100, unit: 'px' },
]

const commonBorder: PropertySchema[] = [
  { key: 'borderRadius', label: 'Radio de borde', type: 'range', category: 'layout', min: 0, max: 100, defaultValue: 8, unit: 'px' },
  { key: 'borderWidth', label: 'Grosor de borde', type: 'range', category: 'layout', min: 0, max: 20, defaultValue: 0, unit: 'px' },
]

const commonEffects: PropertySchema[] = [
  { key: 'opacity', label: 'Opacidad', type: 'range', category: 'style', min: 0, max: 1, step: 0.01, defaultValue: 1 },
  { key: 'scale', label: 'Escala', type: 'range', category: 'effects', min: 0.1, max: 3, step: 0.05, defaultValue: 1 },
  { key: 'shadow', label: 'Sombra', type: 'boolean', category: 'effects', defaultValue: false },
]

const commonAnimation: PropertySchema[] = [
  { key: 'animationDuration', label: 'Duración de animación', type: 'range', category: 'effects', min: 0, max: 2000, step: 50, defaultValue: 300, unit: 'ms' },
  { key: 'animationEasing', label: 'Suavizado', type: 'select', category: 'effects', options: [
    { value: 'linear', label: 'Lineal' },
    { value: 'ease', label: 'Suave' },
    { value: 'ease-in', label: 'Entrada suave' },
    { value: 'ease-out', label: 'Salida suave' },
    { value: 'ease-in-out', label: 'Entrada-salida suave' },
  ], defaultValue: 'ease' },
]

const commonState: PropertySchema[] = [
  { key: 'simulateState', label: 'Estado simulado', type: 'select', category: 'advanced', options: [
    { value: 'default', label: 'Default' },
    { value: 'hover', label: 'Hover' },
    { value: 'active', label: 'Active' },
    { value: 'focus', label: 'Focus' },
    { value: 'disabled', label: 'Disabled' },
  ], defaultValue: 'default' },
  { key: 'focusRingColor', label: 'Color de anillo de foco', type: 'color', category: 'advanced', defaultValue: '#3b82f6' },
  { key: 'error', label: 'Estado de error', type: 'boolean', category: 'advanced', defaultValue: false },
  { key: 'errorColor', label: 'Color de error', type: 'color', category: 'advanced', defaultValue: '#ef4444' },
]

const hoverEffects: PropertySchema[] = [
  { key: 'hoverBackgroundColor', label: 'Color de fondo (hover)', type: 'color', category: 'effects' },
  { key: 'hoverScale', label: 'Escala (hover)', type: 'range', category: 'effects', min: 0.5, max: 2, step: 0.05, defaultValue: 1.05 },
]

// Efectos avanzados
const advancedEffects: PropertySchema[] = [
  {
    key: 'effects.glow',
    label: 'Efecto Glow',
    type: 'object',
    category: 'effects',
    subSchema: [
      { key: 'enabled', label: 'Activado', type: 'boolean', defaultValue: false },
      { key: 'intensity', label: 'Intensidad', type: 'range', min: 0, max: 100, defaultValue: 50 },
      { key: 'color', label: 'Color', type: 'color', defaultValue: '#3b82f6' },
      { key: 'blur', label: 'Difuminado', type: 'range', min: 0, max: 50, defaultValue: 10, unit: 'px' },
    ]
  },
  {
    key: 'effects.shimmer',
    label: 'Efecto Shimmer',
    type: 'object',
    category: 'effects',
    subSchema: [
      { key: 'enabled', label: 'Activado', type: 'boolean', defaultValue: false },
      { key: 'speed', label: 'Velocidad', type: 'range', min: 0.5, max: 5, step: 0.5, defaultValue: 2, unit: 's' },
      { key: 'angle', label: 'Ángulo', type: 'range', min: 0, max: 360, defaultValue: 45, unit: '°' },
      { key: 'width', label: 'Ancho', type: 'range', min: 10, max: 100, defaultValue: 50, unit: '%' },
      { key: 'color', label: 'Color', type: 'color', defaultValue: '#ffffff' },
    ]
  },
  {
    key: 'effects.glass',
    label: 'Efecto Glass',
    type: 'object',
    category: 'effects',
    subSchema: [
      { key: 'enabled', label: 'Activado', type: 'boolean', defaultValue: false },
      { key: 'blur', label: 'Difuminado', type: 'range', min: 0, max: 30, defaultValue: 10, unit: 'px' },
      { key: 'opacity', label: 'Opacidad', type: 'range', min: 0, max: 100, defaultValue: 80, unit: '%' },
    ]
  },
  {
    key: 'effects.particles',
    label: 'Efecto Partículas',
    type: 'object',
    category: 'effects',
    subSchema: [
      { key: 'enabled', label: 'Activado', type: 'boolean', defaultValue: false },
      { key: 'count', label: 'Cantidad', type: 'range', min: 5, max: 50, defaultValue: 20 },
      { key: 'size', label: 'Tamaño', type: 'range', min: 1, max: 10, defaultValue: 2, unit: 'px' },
      { key: 'speed', label: 'Velocidad', type: 'range', min: 0.5, max: 3, step: 0.1, defaultValue: 1 },
      { key: 'color', label: 'Color', type: 'color', defaultValue: '#ffffff' },
      { key: 'type', label: 'Tipo', type: 'select', options: [
        { value: 'dots', label: 'Puntos' },
        { value: 'squares', label: 'Cuadrados' },
      ], defaultValue: 'dots' },
    ]
  },
  {
    key: 'effects.gradient',
    label: 'Gradiente Animado',
    type: 'object',
    category: 'effects',
    subSchema: [
      { key: 'enabled', label: 'Activado', type: 'boolean', defaultValue: false },
      { key: 'type', label: 'Tipo', type: 'select', options: [
        { value: 'linear', label: 'Lineal' },
        { value: 'radial', label: 'Radial' },
      ], defaultValue: 'linear' },
      { key: 'direction', label: 'Dirección', type: 'range', min: 0, max: 360, defaultValue: 45, unit: '°' },
      { key: 'color1', label: 'Color 1', type: 'color', defaultValue: '#3b82f6' },
      { key: 'color2', label: 'Color 2', type: 'color', defaultValue: '#8b5cf6' },
      { key: 'color3', label: 'Color 3', type: 'color', defaultValue: '#ec4899' },
      { key: 'speed', label: 'Velocidad', type: 'range', min: 1, max: 10, defaultValue: 3, unit: 's' },
    ]
  },
  {
    key: 'effects.filters',
    label: 'Filtros CSS',
    type: 'object',
    category: 'effects',
    subSchema: [
      { key: 'enabled', label: 'Activado', type: 'boolean', defaultValue: false },
      { key: 'blur', label: 'Difuminado', type: 'range', min: 0, max: 20, defaultValue: 0, unit: 'px' },
      { key: 'brightness', label: 'Brillo', type: 'range', min: 0, max: 200, defaultValue: 100, unit: '%' },
      { key: 'contrast', label: 'Contraste', type: 'range', min: 0, max: 200, defaultValue: 100, unit: '%' },
      { key: 'saturate', label: 'Saturación', type: 'range', min: 0, max: 200, defaultValue: 100, unit: '%' },
      { key: 'hueRotate', label: 'Rotación de tono', type: 'range', min: 0, max: 360, defaultValue: 0, unit: '°' },
      { key: 'sepia', label: 'Sepia', type: 'range', min: 0, max: 100, defaultValue: 0, unit: '%' },
    ]
  },
  {
    key: 'effects.transform3d',
    label: 'Transformación 3D',
    type: 'object',
    category: 'effects',
    subSchema: [
      { key: 'enabled', label: 'Activado', type: 'boolean', defaultValue: false },
      { key: 'perspective', label: 'Perspectiva', type: 'range', min: 100, max: 2000, defaultValue: 1000, unit: 'px' },
      { key: 'rotateX', label: 'Rotación X', type: 'range', min: -180, max: 180, defaultValue: 0, unit: '°' },
      { key: 'rotateY', label: 'Rotación Y', type: 'range', min: -180, max: 180, defaultValue: 0, unit: '°' },
      { key: 'rotateZ', label: 'Rotación Z', type: 'range', min: -180, max: 180, defaultValue: 0, unit: '°' },
    ]
  },
]

// Schemas por tipo de componente
export const componentSchemas: ComponentSchema[] = [
  // Componentes básicos
  {
    type: 'button',
    label: 'Botón',
    properties: [
      ...commonTextProps.filter(p => p.key === 'text'),
      ...commonDimensions,
      ...commonColors,
      ...commonTypography,
      ...commonSpacing,
      ...commonBorder,
      ...commonEffects,
      ...commonAnimation,
      ...commonState,
      ...hoverEffects,
      ...advancedEffects,
      { key: 'showIcon', label: 'Mostrar icono', type: 'boolean', category: 'content', defaultValue: false },
      { key: 'actionType', label: 'Tipo de acción', type: 'select', category: 'advanced', options: [
        { value: 'none', label: 'Ninguna' },
        { value: 'url', label: 'Abrir URL' },
        { value: 'copy', label: 'Copiar texto' },
        { value: 'submit', label: 'Enviar formulario' },
      ], defaultValue: 'none' },
      { key: 'actionValue', label: 'Valor de acción', type: 'text', category: 'advanced' },
    ]
  },
  {
    type: 'card',
    label: 'Tarjeta',
    properties: [
      ...commonTextProps,
      ...commonDimensions,
      ...commonColors,
      ...commonTypography,
      ...commonBorder,
      ...commonEffects,
      ...commonState,
      ...advancedEffects,
    ]
  },
  {
    type: 'input',
    label: 'Campo de entrada',
    properties: [
      { key: 'placeholder', label: 'Placeholder', type: 'text', category: 'content', defaultValue: 'Ingresa texto...' },
      { key: 'helperText', label: 'Texto de ayuda', type: 'text', category: 'content' },
      { key: 'errorMessage', label: 'Mensaje de error', type: 'text', category: 'content' },
      { key: 'inputType', label: 'Tipo de input', type: 'select', category: 'content', options: [
        { value: 'text', label: 'Texto' },
        { value: 'email', label: 'Email' },
        { value: 'password', label: 'Contraseña' },
        { value: 'number', label: 'Número' },
        { value: 'tel', label: 'Teléfono' },
        { value: 'url', label: 'URL' },
      ], defaultValue: 'text' },
      ...commonDimensions,
      ...commonColors,
      ...commonTypography,
      ...commonSpacing,
      ...commonBorder,
      ...commonEffects,
      ...commonState,
      ...advancedEffects,
      { key: 'showIcon', label: 'Mostrar icono', type: 'boolean', category: 'content', defaultValue: false },
    ]
  },
  {
    type: 'badge',
    label: 'Badge',
    properties: [
      ...commonTextProps.filter(p => p.key === 'text'),
      ...commonColors,
      ...commonTypography.filter(p => ['fontSize', 'fontWeight', 'fontFamily'].includes(p.key)),
      ...commonBorder,
      ...commonEffects,
      ...commonState,
      ...advancedEffects,
    ]
  },
  {
    type: 'text',
    label: 'Texto',
    properties: [
      ...commonTextProps.filter(p => p.key === 'text'),
      ...commonColors.filter(p => p.key === 'color'),
      ...commonTypography,
      ...commonEffects,
      { key: 'textTransform', label: 'Transformación', type: 'select', category: 'style', options: [
        { value: 'none', label: 'Ninguna' },
        { value: 'uppercase', label: 'Mayúsculas' },
        { value: 'lowercase', label: 'Minúsculas' },
        { value: 'capitalize', label: 'Capitalizar' },
      ] },
      { key: 'textDecoration', label: 'Decoración', type: 'select', category: 'style', options: [
        { value: 'none', label: 'Ninguna' },
        { value: 'underline', label: 'Subrayado' },
        { value: 'line-through', label: 'Tachado' },
      ] },
      { key: 'fontStyle', label: 'Estilo', type: 'select', category: 'style', options: [
        { value: 'normal', label: 'Normal' },
        { value: 'italic', label: 'Itálica' },
      ] },
    ]
  },
  // Componentes Magic UI
  {
    type: 'glow-button',
    label: 'Botón Glow',
    properties: [
      ...commonTextProps.filter(p => p.key === 'text'),
      ...commonDimensions,
      ...commonState,
      ...advancedEffects,
    ]
  },
  {
    type: 'glass-card',
    label: 'Tarjeta Glass',
    properties: [
      ...commonTextProps,
      ...commonDimensions,
      ...commonState,
      ...advancedEffects,
    ]
  },
  {
    type: 'gradient-text',
    label: 'Texto Gradiente',
    properties: [
      ...commonTextProps.filter(p => p.key === 'text'),
      ...commonDimensions,
      ...commonTypography,
      ...commonState,
    ]
  },
  // Efectos
  {
    type: 'effect-glow',
    label: 'Efecto Glow',
    properties: [
      ...commonDimensions,
      ...commonState,
    ]
  },
  {
    type: 'effect-shimmer',
    label: 'Efecto Shimmer',
    properties: [
      ...commonDimensions,
      ...commonState,
    ]
  },
  {
    type: 'effect-neon',
    label: 'Efecto Neón',
    properties: [
      ...commonDimensions,
      ...commonState,
    ]
  },
  // Fondos
  {
    type: 'bg-dots',
    label: 'Fondo de Puntos',
    properties: [
      ...commonDimensions,
      ...commonState,
    ]
  },
  {
    type: 'bg-aurora',
    label: 'Fondo Aurora',
    properties: [
      ...commonDimensions,
      ...commonState,
    ]
  },
  {
    type: 'bg-stars',
    label: 'Fondo Estrellas',
    properties: [
      ...commonDimensions,
      ...commonState,
    ]
  },
  // Templates
  {
    type: 'login-form',
    label: 'Formulario de Login',
    properties: [
      ...commonDimensions,
      ...commonState,
      ...advancedEffects,
    ]
  },
  {
    type: 'pricing-card',
    label: 'Tarjeta de Precio',
    properties: [
      ...commonTextProps,
      { key: 'price', label: 'Precio', type: 'text', category: 'content', defaultValue: '$29' },
      { key: 'badgeText', label: 'Texto del badge', type: 'text', category: 'content', defaultValue: 'MÁS POPULAR' },
      ...commonDimensions,
      ...commonState,
      ...advancedEffects,
    ]
  },
]

// Función helper para obtener el schema de un tipo
export function getSchemaForType(type: string): ComponentSchema | undefined {
  return componentSchemas.find(s => s.type === type)
}

// Función helper para obtener el valor por defecto de una propiedad
export function getDefaultValue(schema: PropertySchema): any {
  if (schema.defaultValue !== undefined) return schema.defaultValue
  
  switch (schema.type) {
    case 'text':
    case 'textarea':
      return ''
    case 'number':
    case 'range':
      return schema.min || 0
    case 'color':
      return '#000000'
    case 'boolean':
      return false
    case 'select':
      return schema.options?.[0]?.value || ''
    case 'array':
      return []
    case 'object':
      return {}
    default:
      return null
  }
}
