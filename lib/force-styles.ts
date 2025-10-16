// Sistema para forzar aplicación de estilos en tiempo real
export function forceApplyStyles(element: HTMLElement, props: any) {
  if (!element || !props) return

  // Aplicar estilos inmediatamente al DOM
  requestAnimationFrame(() => {
    // Tipografía
    if (props.fontSize) element.style.fontSize = `${props.fontSize}px`
    if (props.fontWeight) element.style.fontWeight = String(props.fontWeight)
    if (props.fontFamily) element.style.fontFamily = props.fontFamily
    if (props.letterSpacing) element.style.letterSpacing = `${props.letterSpacing}px`
    if (props.lineHeight) element.style.lineHeight = String(props.lineHeight)
    if (props.textAlign) element.style.textAlign = props.textAlign
    if (props.textTransform) element.style.textTransform = props.textTransform
    if (props.textDecoration) element.style.textDecoration = props.textDecoration
    if (props.fontStyle) element.style.fontStyle = props.fontStyle

    // Colores
    if (props.color) element.style.color = props.color
    if (props.backgroundColor) element.style.backgroundColor = props.backgroundColor
    if (props.opacity !== undefined) element.style.opacity = String(props.opacity)

    // Layout
    if (props.width) element.style.width = props.width
    if (props.height) element.style.height = props.height
    if (props.position) element.style.position = props.position
    if (props.zIndex !== undefined) element.style.zIndex = String(props.zIndex)
    if (props.order !== undefined) element.style.order = String(props.order)

    // Bordes
    if (props.borderRadius) element.style.borderRadius = `${props.borderRadius}px`
    if (props.borderWidth) element.style.borderWidth = `${props.borderWidth}px`
    if (props.borderColor) element.style.borderColor = props.borderColor
    if (props.borderStyle) element.style.borderStyle = props.borderStyle

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
    if (transforms.length > 0) {
      element.style.transform = transforms.join(' ')
    }
    if (props.transformOrigin) element.style.transformOrigin = props.transformOrigin

    // Filtros
    const filters = []
    if (props.blur) filters.push(`blur(${props.blur}px)`)
    if (props.brightness !== undefined && props.brightness !== 100) {
      filters.push(`brightness(${props.brightness}%)`)
    }
    if (props.contrast !== undefined && props.contrast !== 100) {
      filters.push(`contrast(${props.contrast}%)`)
    }
    if (props.saturate !== undefined && props.saturate !== 100) {
      filters.push(`saturate(${props.saturate}%)`)
    }
    if (props.hueRotate) filters.push(`hue-rotate(${props.hueRotate}deg)`)
    if (props.invert) filters.push(`invert(${props.invert}%)`)
    if (props.sepia) filters.push(`sepia(${props.sepia}%)`)
    if (filters.length > 0) {
      element.style.filter = filters.join(' ')
    }

    // Visibilidad
    if (props.visible === false) {
      element.style.display = 'none'
    } else if (props.visible === true && element.style.display === 'none') {
      element.style.display = ''
    }

    // Interactividad
    if (props.interactive === false) {
      element.style.pointerEvents = 'none'
    } else if (props.interactive === true) {
      element.style.pointerEvents = ''
    }

    // Forzar repaint
    element.style.transform = element.style.transform || 'translateZ(0)'
  })
}