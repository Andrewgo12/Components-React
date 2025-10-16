// Generador de estilos dinámicos para aplicar cambios del inspector inmediatamente
export function generateDynamicStyles(props: any): React.CSSProperties {
  const styles: React.CSSProperties = {}

  // Tipografía
  if (props.fontFamily) styles.fontFamily = props.fontFamily
  if (props.fontSize) styles.fontSize = `${props.fontSize}px`
  if (props.fontWeight) styles.fontWeight = props.fontWeight
  if (props.letterSpacing) styles.letterSpacing = `${props.letterSpacing}px`
  if (props.lineHeight) styles.lineHeight = props.lineHeight
  if (props.textAlign) styles.textAlign = props.textAlign
  if (props.textTransform) styles.textTransform = props.textTransform
  if (props.textDecoration) styles.textDecoration = props.textDecoration
  if (props.fontStyle) styles.fontStyle = props.fontStyle
  if (props.textIndent) styles.textIndent = `${props.textIndent}px`

  // Sombra de texto
  if (props.textShadowX || props.textShadowY || props.textShadowBlur) {
    const x = props.textShadowX || 0
    const y = props.textShadowY || 0
    const blur = props.textShadowBlur || 0
    const color = props.textShadowColor || '#000000'
    styles.textShadow = `${x}px ${y}px ${blur}px ${color}`
  }

  // Colores
  if (props.color) styles.color = props.color
  if (props.backgroundColor) styles.backgroundColor = props.backgroundColor
  if (props.opacity !== undefined) styles.opacity = props.opacity

  // Layout y tamaño
  if (props.width) styles.width = props.width
  if (props.height) styles.height = props.height
  if (props.minWidth) styles.minWidth = props.minWidth
  if (props.maxWidth) styles.maxWidth = props.maxWidth
  if (props.minHeight) styles.minHeight = props.minHeight
  if (props.maxHeight) styles.maxHeight = props.maxHeight
  if (props.position) styles.position = props.position
  if (props.top) styles.top = props.top
  if (props.right) styles.right = props.right
  if (props.bottom) styles.bottom = props.bottom
  if (props.left) styles.left = props.left
  if (props.zIndex !== undefined) styles.zIndex = props.zIndex
  if (props.order !== undefined) styles.order = props.order
  if (props.overflow) styles.overflow = props.overflow

  // Margin y Padding
  if (props.marginTop) styles.marginTop = props.marginTop
  if (props.marginRight) styles.marginRight = props.marginRight
  if (props.marginBottom) styles.marginBottom = props.marginBottom
  if (props.marginLeft) styles.marginLeft = props.marginLeft
  if (props.paddingTop) styles.paddingTop = props.paddingTop
  if (props.paddingRight) styles.paddingRight = props.paddingRight
  if (props.paddingBottom) styles.paddingBottom = props.paddingBottom
  if (props.paddingLeft) styles.paddingLeft = props.paddingLeft

  // Bordes
  if (props.borderRadius) styles.borderRadius = `${props.borderRadius}px`
  if (props.borderWidth) styles.borderWidth = `${props.borderWidth}px`
  if (props.borderColor) styles.borderColor = props.borderColor
  if (props.borderStyle) styles.borderStyle = props.borderStyle
  
  // Bordes individuales
  if (props.borderTopLeftRadius) styles.borderTopLeftRadius = props.borderTopLeftRadius
  if (props.borderTopRightRadius) styles.borderTopRightRadius = props.borderTopRightRadius
  if (props.borderBottomLeftRadius) styles.borderBottomLeftRadius = props.borderBottomLeftRadius
  if (props.borderBottomRightRadius) styles.borderBottomRightRadius = props.borderBottomRightRadius

  // Box Shadow
  if (props.boxShadow?.enabled) {
    const { x = 0, y = 0, blur = 0, spread = 0, color = '#000000', inset = false } = props.boxShadow
    styles.boxShadow = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${color}`
  }

  // Outline
  if (props.outline?.enabled) {
    const { width = 2, style = 'solid', color = '#3b82f6', offset = 0 } = props.outline
    styles.outline = `${width}px ${style} ${color}`
    styles.outlineOffset = `${offset}px`
  }

  // Transformaciones
  const transforms = []
  if (props.rotate) transforms.push(`rotate(${props.rotate}deg)`)
  if (props.scaleX !== undefined || props.scaleY !== undefined) {
    transforms.push(`scale(${props.scaleX || 1}, ${props.scaleY || 1})`)
  }
  if (props.skewX) transforms.push(`skewX(${props.skewX}deg)`)
  if (props.skewY) transforms.push(`skewY(${props.skewY}deg)`)
  if (props.translateX || props.translateY) {
    transforms.push(`translate(${props.translateX || 0}px, ${props.translateY || 0}px)`)
  }

  // Transformaciones 3D
  if (props.transform3D?.enabled) {
    const { perspective = 1000, rotateX = 0, rotateY = 0, rotateZ = 0, translateZ = 0 } = props.transform3D
    styles.perspective = `${perspective}px`
    if (rotateX) transforms.push(`rotateX(${rotateX}deg)`)
    if (rotateY) transforms.push(`rotateY(${rotateY}deg)`)
    if (rotateZ) transforms.push(`rotateZ(${rotateZ}deg)`)
    if (translateZ) transforms.push(`translateZ(${translateZ}px)`)
  }

  if (transforms.length > 0) {
    styles.transform = transforms.join(' ')
  }

  if (props.transformOrigin) styles.transformOrigin = props.transformOrigin

  // Filtros
  const filters = []
  if (props.blur) filters.push(`blur(${props.blur}px)`)
  if (props.brightness !== undefined && props.brightness !== 100) filters.push(`brightness(${props.brightness}%)`)
  if (props.contrast !== undefined && props.contrast !== 100) filters.push(`contrast(${props.contrast}%)`)
  if (props.saturate !== undefined && props.saturate !== 100) filters.push(`saturate(${props.saturate}%)`)
  if (props.hueRotate) filters.push(`hue-rotate(${props.hueRotate}deg)`)
  if (props.invert) filters.push(`invert(${props.invert}%)`)
  if (props.sepia) filters.push(`sepia(${props.sepia}%)`)

  // Drop Shadow
  if (props.dropShadow?.enabled) {
    const { x = 0, y = 0, blur = 0, color = '#000000' } = props.dropShadow
    filters.push(`drop-shadow(${x}px ${y}px ${blur}px ${color})`)
  }

  if (filters.length > 0) {
    styles.filter = filters.join(' ')
  }

  // Backdrop Filter
  if (props.backdropFilter?.enabled) {
    const backdropFilters = []
    const { blur = 0, brightness = 100, saturate = 100 } = props.backdropFilter
    if (blur) backdropFilters.push(`blur(${blur}px)`)
    if (brightness !== 100) backdropFilters.push(`brightness(${brightness}%)`)
    if (saturate !== 100) backdropFilters.push(`saturate(${saturate}%)`)
    if (backdropFilters.length > 0) {
      styles.backdropFilter = backdropFilters.join(' ')
    }
  }

  // Mix Blend Mode
  if (props.mixBlendMode && props.mixBlendMode !== 'normal') {
    styles.mixBlendMode = props.mixBlendMode
  }

  // Gradiente de fondo
  if (props.backgroundGradient?.enabled) {
    const { direction = 'to-r', colorStart = '#3b82f6', colorEnd = '#8b5cf6' } = props.backgroundGradient
    const directionMap: Record<string, string> = {
      'to-r': 'to right',
      'to-l': 'to left',
      'to-b': 'to bottom',
      'to-t': 'to top',
      'to-br': 'to bottom right',
      'to-bl': 'to bottom left',
      'to-tr': 'to top right',
      'to-tl': 'to top left'
    }
    styles.background = `linear-gradient(${directionMap[direction] || direction}, ${colorStart}, ${colorEnd})`
  }

  // Imagen de fondo
  if (props.backgroundImage?.enabled && props.backgroundImage?.url) {
    const { url, size = 'cover', position = 'center', repeat = 'no-repeat' } = props.backgroundImage
    styles.backgroundImage = `url(${url})`
    styles.backgroundSize = size
    styles.backgroundPosition = position
    styles.backgroundRepeat = repeat
  }

  // Flexbox
  if (props.display === 'flex' || props.display === 'inline-flex') {
    styles.display = props.display
    if (props.flexDirection) styles.flexDirection = props.flexDirection
    if (props.flexWrap) styles.flexWrap = props.flexWrap
    if (props.justifyContent) styles.justifyContent = props.justifyContent
    if (props.alignItems) styles.alignItems = props.alignItems
    if (props.gap) styles.gap = `${props.gap}px`
    if (props.flexGrow) styles.flexGrow = props.flexGrow
    if (props.flexShrink) styles.flexShrink = props.flexShrink
    if (props.flexBasis) styles.flexBasis = props.flexBasis
  }

  // Grid
  if (props.display === 'grid' || props.display === 'inline-grid') {
    styles.display = props.display
    if (props.gridTemplateColumns) styles.gridTemplateColumns = props.gridTemplateColumns
    if (props.gridTemplateRows) styles.gridTemplateRows = props.gridTemplateRows
    if (props.gridGap) styles.gap = `${props.gridGap}px`
    if (props.gridAutoFlow) styles.gridAutoFlow = props.gridAutoFlow
    if (props.placeItems) styles.placeItems = props.placeItems
  }

  // Visibilidad
  if (props.visible === false) styles.display = 'none'
  if (props.interactive === false) styles.pointerEvents = 'none'

  // Optimización de rendimiento
  if (props.gpuAcceleration) styles.willChange = 'transform'
  if (props.willChange && props.willChange !== 'auto') styles.willChange = props.willChange

  return styles
}

// Generar clases CSS dinámicas
export function generateDynamicClasses(props: any): string {
  const classes = []
  
  if (props.className) classes.push(props.className)
  if (props.customClasses) classes.push(props.customClasses)
  
  return classes.join(' ')
}

// Generar atributos dinámicos
export function generateDynamicAttributes(props: any): Record<string, any> {
  const attributes: Record<string, any> = {}
  
  if (props.elementId) attributes.id = props.elementId
  if (props.ariaLabel) attributes['aria-label'] = props.ariaLabel
  if (props.ariaRole) attributes.role = props.ariaRole
  if (props.tabIndex !== undefined) attributes.tabIndex = props.tabIndex
  if (props.alt) attributes.alt = props.alt
  
  return attributes
}