// Motor de estilos mejorado para aplicar cambios inmediatos
export function generateStyles(props: any) {
  const style: React.CSSProperties = {}
  const classNames: string[] = []

  // Aplicar estilos de tipografía inmediatamente
  if (props.fontSize) style.fontSize = `${props.fontSize}px`
  if (props.fontWeight) style.fontWeight = props.fontWeight
  if (props.fontFamily) style.fontFamily = props.fontFamily
  if (props.letterSpacing) style.letterSpacing = `${props.letterSpacing}px`
  if (props.lineHeight) style.lineHeight = props.lineHeight
  if (props.textAlign) style.textAlign = props.textAlign
  if (props.textTransform) style.textTransform = props.textTransform
  if (props.textDecoration) style.textDecoration = props.textDecoration
  if (props.fontStyle) style.fontStyle = props.fontStyle

  // Colores
  if (props.color) style.color = props.color
  if (props.backgroundColor) style.backgroundColor = props.backgroundColor
  if (props.opacity !== undefined) style.opacity = props.opacity

  // Layout
  if (props.width) style.width = props.width
  if (props.height) style.height = props.height
  if (props.position) style.position = props.position
  if (props.zIndex !== undefined) style.zIndex = props.zIndex

  // Bordes
  if (props.borderRadius) style.borderRadius = `${props.borderRadius}px`
  if (props.borderWidth) style.borderWidth = `${props.borderWidth}px`
  if (props.borderColor) style.borderColor = props.borderColor
  if (props.borderStyle) style.borderStyle = props.borderStyle

  // Transformaciones
  const transforms = []
  if (props.rotate) transforms.push(`rotate(${props.rotate}deg)`)
  if (props.scaleX !== undefined || props.scaleY !== undefined) {
    transforms.push(`scale(${props.scaleX || 1}, ${props.scaleY || 1})`)
  }
  if (transforms.length > 0) {
    style.transform = transforms.join(' ')
  }

  // Filtros
  const filters = []
  if (props.blur) filters.push(`blur(${props.blur}px)`)
  if (props.brightness !== undefined && props.brightness !== 100) {
    filters.push(`brightness(${props.brightness}%)`)
  }
  if (filters.length > 0) {
    style.filter = filters.join(' ')
  }

  // Visibilidad
  if (props.visible === false) style.display = 'none'
  if (props.interactive === false) style.pointerEvents = 'none'

  return {
    style,
    className: classNames.join(' ')
  }
}