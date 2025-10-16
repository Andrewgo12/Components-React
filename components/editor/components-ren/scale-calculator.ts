/**
 * Sistema de escalado proporcional para componentes
 * Calcula factores de escala basados en el tamaño del componente
 * para que TODOS los detalles (textos, bordes, puntos, líneas) se escalen proporcionalmente
 */

interface ScaleFactors {
  fontSize: number
  padding: number
  borderRadius: number
  borderWidth: number
  iconSize: number
  spacing: number
  dotSize: number
  lineWidth: number
  general: number
}

/**
 * Calcula el factor de escala basado en el tamaño del componente
 * @param width - Ancho actual del componente
 * @param height - Alto actual del componente
 * @param baseWidth - Ancho base de referencia (por defecto 300px)
 * @param baseHeight - Alto base de referencia (por defecto 200px)
 * @returns Factores de escala para diferentes propiedades
 */
export function calculateScaleFactors(
  width?: number,
  height?: number,
  baseWidth: number = 300,
  baseHeight: number = 200
): ScaleFactors {
  // Si no hay dimensiones, usar escala 1 (sin cambios)
  if (!width && !height) {
    return {
      fontSize: 1,
      padding: 1,
      borderRadius: 1,
      borderWidth: 1,
      iconSize: 1,
      spacing: 1,
      dotSize: 1,
      lineWidth: 1,
      general: 1
    }
  }

  // Calcular factores de escala individuales
  const widthScale = width ? width / baseWidth : 1
  const heightScale = height ? height / baseHeight : 1

  // Factor de escala general (promedio de ancho y alto)
  const generalScale = (widthScale + heightScale) / 2

  // Limitar el escalado para evitar valores extremos
  const clampedScale = Math.max(0.3, Math.min(3, generalScale))

  return {
    // Tamaño de fuente escala más suavemente (raíz cuadrada para suavizar)
    fontSize: Math.max(0.5, Math.min(2, Math.sqrt(clampedScale))),
    
    // Padding escala proporcionalmente
    padding: clampedScale,
    
    // Border radius escala proporcionalmente
    borderRadius: clampedScale,
    
    // Border width escala más suavemente
    borderWidth: Math.max(0.5, Math.min(2, Math.sqrt(clampedScale))),
    
    // Iconos escalan proporcionalmente
    iconSize: clampedScale,
    
    // Espaciado escala proporcionalmente
    spacing: clampedScale,
    
    // Tamaño de puntos (dots) escala proporcionalmente
    dotSize: clampedScale,
    
    // Ancho de líneas escala más suavemente
    lineWidth: Math.max(0.5, Math.min(2, Math.sqrt(clampedScale))),
    
    // Factor general
    general: clampedScale
  }
}

/**
 * Aplica el factor de escala a un valor
 * @param baseValue - Valor base
 * @param scaleFactor - Factor de escala
 * @returns Valor escalado
 */
export function scaleValue(baseValue: number, scaleFactor: number): number {
  return Math.round(baseValue * scaleFactor)
}

/**
 * Aplica el factor de escala a un valor CSS (con unidad)
 * @param baseValue - Valor base (ej: "16px", "1rem")
 * @param scaleFactor - Factor de escala
 * @returns Valor escalado con unidad
 */
export function scaleCSSValue(baseValue: string | number, scaleFactor: number): string {
  if (typeof baseValue === 'number') {
    return `${scaleValue(baseValue, scaleFactor)}px`
  }

  // Extraer número y unidad
  const match = baseValue.match(/^([\d.]+)(.*)$/)
  if (!match) return baseValue

  const [, numStr = '0', unit = 'px'] = match
  const num = parseFloat(numStr)
  const scaled = scaleValue(num, scaleFactor)

  return `${scaled}${unit}`
}

/**
 * Genera estilos escalados para un componente
 * @param props - Props del componente
 * @param baseStyles - Estilos base
 * @returns Estilos escalados
 */
export function getScaledStyles(props: any, baseStyles: any = {}): any {
  const scales = calculateScaleFactors(props.width, props.height)

  const scaledStyles: any = { ...baseStyles }

  // Escalar fontSize
  if (baseStyles.fontSize || props.fontSize) {
    const fontSizeStr = String(baseStyles.fontSize || props.fontSize || '16')
    const baseFontSize = parseInt(fontSizeStr)
    scaledStyles.fontSize = `${scaleValue(baseFontSize, scales.fontSize)}px`
  }

  // Escalar padding
  if (baseStyles.padding) {
    const paddingStr = String(baseStyles.padding)
    const match = paddingStr.match(/^([\d.]+)px\s+([\d.]+)px$/)
    if (match) {
      const [, py = '0', px = '0'] = match
      scaledStyles.padding = `${scaleValue(parseInt(py), scales.padding)}px ${scaleValue(parseInt(px), scales.padding)}px`
    }
  }

  // Escalar borderRadius
  if (baseStyles.borderRadius || props.borderRadius) {
    const radiusStr = String(baseStyles.borderRadius || props.borderRadius || '0')
    const baseRadius = parseInt(radiusStr)
    scaledStyles.borderRadius = `${scaleValue(baseRadius, scales.borderRadius)}px`
  }

  // Escalar borderWidth
  if (baseStyles.borderWidth || props.borderWidth) {
    const widthStr = String(baseStyles.borderWidth || props.borderWidth || '0')
    const baseWidth = parseInt(widthStr)
    if (baseWidth > 0) {
      scaledStyles.borderWidth = `${scaleValue(baseWidth, scales.borderWidth)}px`
    }
  }

  return scaledStyles
}

/**
 * Calcula el tamaño de un patrón escalado (para fondos)
 * @param baseSize - Tamaño base del patrón
 * @param width - Ancho del componente
 * @param height - Alto del componente
 * @returns Tamaño escalado del patrón
 */
export function getScaledPatternSize(baseSize: number, width?: number, height?: number): number {
  const scales = calculateScaleFactors(width, height)
  return scaleValue(baseSize, scales.spacing)
}

/**
 * Calcula el tamaño de un punto escalado (para bg-dots, bg-polka, etc.)
 * @param baseDotSize - Tamaño base del punto
 * @param width - Ancho del componente
 * @param height - Alto del componente
 * @returns Tamaño escalado del punto
 */
export function getScaledDotSize(baseDotSize: number, width?: number, height?: number): number {
  const scales = calculateScaleFactors(width, height)
  return Math.max(1, scaleValue(baseDotSize, scales.dotSize))
}

/**
 * Calcula el ancho de una línea escalado (para bg-lines, bg-grid, etc.)
 * @param baseLineWidth - Ancho base de la línea
 * @param width - Ancho del componente
 * @param height - Alto del componente
 * @returns Ancho escalado de la línea
 */
export function getScaledLineWidth(baseLineWidth: number, width?: number, height?: number): number {
  const scales = calculateScaleFactors(width, height)
  return Math.max(1, scaleValue(baseLineWidth, scales.lineWidth))
}
