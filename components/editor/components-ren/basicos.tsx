"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { EditableText } from "../editable-text"
import * as Icons from "@/components/icons"
import { motion } from "framer-motion"
import { useSpring, animated } from "@react-spring/web"
import CountUp from "react-countup"
import Marquee from "react-fast-marquee"

interface ComponentProps {
  props: any
  getEffectClasses: () => string
  getEffectStyles: () => any
}

// Función para generar estilos de efectos dinámicos
function generateEffectStyles(effects: any) {
  const styles: any = {}
  
  if (effects?.glow?.enabled) {
    const { intensity = 50, color = '#3b82f6', blur = 10, spread = 0 } = effects.glow
    styles.boxShadow = `0 0 ${blur}px ${spread}px ${color}${Math.round(intensity * 2.55).toString(16).padStart(2, '0')}`
  }
  
  if (effects?.filters?.enabled) {
    const filters = []
    if (effects.filters.blur) filters.push(`blur(${effects.filters.blur}px)`)
    if (effects.filters.brightness !== 100) filters.push(`brightness(${effects.filters.brightness / 100})`)
    if (effects.filters.contrast !== 100) filters.push(`contrast(${effects.filters.contrast / 100})`)
    if (effects.filters.saturate !== 100) filters.push(`saturate(${effects.filters.saturate / 100})`)
    if (effects.filters.hueRotate) filters.push(`hue-rotate(${effects.filters.hueRotate}deg)`)
    if (effects.filters.sepia) filters.push(`sepia(${effects.filters.sepia / 100})`)
    if (effects.filters.custom) filters.push(effects.filters.custom)
    
    if (filters.length > 0) {
      styles.filter = filters.join(' ')
    }
  }
  
  if (effects?.transform3d?.enabled) {
    const transforms = []
    if (effects.transform3d.rotateX) transforms.push(`rotateX(${effects.transform3d.rotateX}deg)`)
    if (effects.transform3d.rotateY) transforms.push(`rotateY(${effects.transform3d.rotateY}deg)`)
    if (effects.transform3d.rotateZ) transforms.push(`rotateZ(${effects.transform3d.rotateZ}deg)`)
    
    if (transforms.length > 0) {
      styles.transform = transforms.join(' ')
      styles.transformStyle = 'preserve-3d'
    }
    
    if (effects.transform3d.perspective) {
      styles.perspective = `${effects.transform3d.perspective}px`
    }
  }
  
  return styles
}

export function renderBasicComponents(type: string, { props, getEffectClasses, getEffectStyles }: ComponentProps) {
  const isDesign = props?.mode === 'design'
  const effectsCache = (renderBasicComponents as any)._effectsCache || new WeakMap<object, any>()
  ;(renderBasicComponents as any)._effectsCache = effectsCache
  const getMemoEffectStyles = (eff: any) => {
    if (!eff || typeof eff !== 'object') return generateEffectStyles(eff)
    const cached = effectsCache.get(eff)
    if (cached) return cached
    const val = generateEffectStyles(eff)
    effectsCache.set(eff, val)
    return val
  }
  switch (type) {
    // Componentes básicos principales
    case "button":
      const effectStyles = getMemoEffectStyles(props.effects)
      return (
        <Button
          id={props.elementId}
          className={`relative overflow-hidden group ${props.className || ''} ${getEffectClasses()}`}
          animation={props.animation || 'scale'}
          variant={props.variant || 'animated'}
          style={{
            ...getEffectStyles(),
            ...effectStyles,
            width: '100%',
            height: '100%',
            backgroundColor: props.backgroundColor || 'var(--color-primary)',
            color: props.color || 'var(--color-primary-foreground)',
            fontSize: props.fontSize ? `${props.fontSize}px` : '16px',
            fontWeight: props.fontWeight || '600',
            fontFamily: props.fontFamily || 'Inter, system-ui, sans-serif',
            padding: `${props.paddingY || 12}px ${props.paddingX || 32}px`,
            borderRadius: props.borderRadius ? `${props.borderRadius}px` : '12px',
            border: props.borderWidth ? `${props.borderWidth}px solid ${props.borderColor || 'transparent'}` : 'none',
            boxShadow: effectStyles.boxShadow || (props.shadow ? '0 4px 14px 0 rgba(0, 0, 0, 0.1)' : 'none'),
            transform: effectStyles.transform || (props.scale ? `scale(${props.scale})` : 'scale(1)'),
            opacity: props.opacity !== undefined ? props.opacity : 1,
            transition: isDesign ? 'all 120ms ease' : `all ${props.animationDuration || 300}ms ${props.animationEasing || 'ease'}`,
            display: props.visible === false ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          disabled={props.disabled}
          title={props.title}
        >
          {/* Efecto Shimmer */}
          {!isDesign && props.effects?.shimmer?.enabled && (
            <span 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform"
              style={{
                animationDuration: `${props.effects.shimmer.speed || 2}s`,
                transform: `skewX(${props.effects.shimmer.angle || 45}deg)`,
                width: `${props.effects.shimmer.width || 50}%`,
                backgroundColor: props.effects.shimmer.color || '#ffffff',
              }}
            />
          )}
          
          {/* Efecto de Gradiente Animado */}
          {!isDesign && props.effects?.gradient?.enabled && (
            <div 
              className="absolute inset-0 opacity-80"
              style={{
                background: props.effects.gradient.type === 'radial' 
                  ? `radial-gradient(circle, ${props.effects.gradient.color1 || '#3b82f6'}, ${props.effects.gradient.color2 || '#8b5cf6'}, ${props.effects.gradient.color3 || '#ec4899'})`
                  : `linear-gradient(${props.effects.gradient.direction || 45}deg, ${props.effects.gradient.color1 || '#3b82f6'}, ${props.effects.gradient.color2 || '#8b5cf6'}, ${props.effects.gradient.color3 || '#ec4899'})`,
                animation: `gradient-shift ${props.effects.gradient.speed || 3}s ease-in-out infinite`,
              }}
            />
          )}
          
          {/* Partículas */}
          {!isDesign && props.effects?.particles?.enabled && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(Math.min(props.effects.particles.count || 20, 50))].map((_, i) => {
                const size = props.effects.particles.size || 2
                const speed = props.effects.particles.speed || 1
                // Deterministic pseudo-random placement based on index
                const left = (i * 37) % 100
                const top = (i * 53) % 100
                const delay = (i % 20) / 10 // 0s .. 1.9s
                const duration = Math.max(0.4, 2 / speed)
                return (
                  <div
                    key={i}
                    className="absolute animate-pulse"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: props.effects.particles.color || '#ffffff',
                      left: `${left}%`,
                      top: `${top}%`,
                      borderRadius: props.effects.particles.type === 'dots' ? '50%' : '0',
                      animationDelay: `${delay}s`,
                      animationDuration: `${duration}s`,
                    }}
                  />
                )
              })}
            </div>
          )}
          
          <span className="relative z-10 flex items-center gap-2">
            {props.showIcon && <Icons.SparklesIcon className="w-4 h-4" />}
            <EditableText
              value={props.text || "Botón"}
              onUpdate={(newText) => {
                if (props.onUpdateText) {
                  props.onUpdateText(newText)
                }
              }}
              placeholder="Texto del botón"
              elementId={`${props.elementId || 'btn'}-text`}
            >
              {props.text || "Botón"}
            </EditableText>
          </span>
        </Button>
      )

    case "input":
      const inputEffectStyles = getMemoEffectStyles(props.effects)
      return (
        <div 
          className={`relative ${props.className || ''} ${getEffectClasses()}`} 
          style={{
            ...getEffectStyles(),
            width: props.width ? `${props.width}px` : '320px',
            display: props.visible === false ? 'none' : 'block',
          }}
        >
          <div className="relative">
            <Input
              id={props.elementId}
              className={`w-full transition-all ${isDesign ? 'duration-100' : 'duration-300'}`}
              placeholder={props.placeholder || "Ingresa texto..."}
              type={props.inputType || "text"}
              disabled={props.disabled}
              title={props.title}
              alt={props.alt}
              animation={props.animation || 'glow'}
              style={{
                ...inputEffectStyles,
                fontSize: props.fontSize ? `${props.fontSize}px` : '16px',
                fontWeight: props.fontWeight || '400',
                fontFamily: props.fontFamily || 'Inter, system-ui, sans-serif',
                borderRadius: props.borderRadius ? `${props.borderRadius}px` : '8px',
                backgroundColor: props.backgroundColor || 'var(--color-card)',
                color: props.color || 'var(--color-foreground)',
                borderColor: props.borderColor || 'var(--color-border)',
                padding: `${props.paddingY || 12}px ${props.showIcon ? props.paddingX + 40 || 56 : props.paddingX || 16}px`,
                height: props.height ? `${props.height}px` : '48px',
                boxShadow: inputEffectStyles.boxShadow || (props.shadow ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none'),
                opacity: props.opacity !== undefined ? props.opacity : 1,
                display: props.visible === false ? 'none' : 'block',
              }}
            />
            
            {/* Efecto Shimmer para Input */}
            {!isDesign && props.effects?.shimmer?.enabled && (
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-pulse pointer-events-none"
                style={{
                  animationDuration: `${props.effects.shimmer.speed || 2}s`,
                  borderRadius: props.borderRadius ? `${props.borderRadius}px` : '8px',
                }}
              />
            )}
            
            {props.showIcon && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Icons.SearchIcon className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </div>
          
          {props.helperText && (
            <div className="mt-2 text-xs text-gray-500 font-medium">
              {props.helperText}
            </div>
          )}
        </div>
      )

    case "card":
      return (
        <Card
          className={`w-96 bg-white/90 backdrop-blur-sm border-0 shadow-xl ${isDesign ? '' : 'hover:shadow-2xl hover:scale-[1.02]'} transition-all ${isDesign ? 'duration-150' : 'duration-500'} rounded-3xl overflow-hidden group ${getEffectClasses()}`}
          animation={props.animation || 'hover'}
          style={{
            ...getEffectStyles(),
            backgroundColor: props.backgroundColor,
            borderRadius: props.borderRadius ? `${props.borderRadius}px` : undefined,
            borderWidth: props.borderWidth ? `${props.borderWidth}px` : undefined,
            borderColor: props.borderColor,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-60" />
          <CardHeader className="relative z-10 pb-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Icons.StarIcon className="w-6 h-6 text-white" />
                </div>
                <EditableText
                  value={props.title || "Tarjeta Premium"}
                  onUpdate={(newTitle) => {
                    if (props.onUpdateTitle) {
                      props.onUpdateTitle(newTitle)
                    }
                  }}
                  placeholder="Título de la tarjeta"
                  elementId={`${props.elementId || 'card'}-title`}
                >
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" style={{
                    fontSize: props.fontSize ? `${props.fontSize}px` : undefined,
                    fontWeight: props.fontWeight || '700',
                    fontFamily: props.fontFamily || 'Inter, system-ui, sans-serif',
                    color: props.color,
                  }}>{props.title || "Tarjeta Premium"}</CardTitle>
                </EditableText>
                <EditableText
                  value={props.description || "Una experiencia completamente nueva con diseño moderno y funcionalidad avanzada."}
                  onUpdate={(newDesc) => {
                    if (props.onUpdateDescription) {
                      props.onUpdateDescription(newDesc)
                    }
                  }}
                  multiline
                  placeholder="Descripción de la tarjeta"
                  elementId={`${props.elementId || 'card'}-description`}
                >
                  <CardDescription className="text-gray-600 leading-relaxed">{props.description || "Una experiencia completamente nueva con diseño moderno y funcionalidad avanzada."}</CardDescription>
                </EditableText>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10 pt-0">
            <div className="flex items-center gap-4">
              <EditableText
                value="Explorar"
                onUpdate={(newText) => props.onUpdateText?.(newText)}
                placeholder="Texto del botón"
                elementId={`${props.elementId || 'card'}-button`}
              >
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-xl px-6">
                  Explorar
                </Button>
              </EditableText>
              <EditableText
                value="Actualizado recientemente"
                onUpdate={(newText) => props.onUpdateContent?.(newText)}
                placeholder="Texto de estado"
                elementId={`${props.elementId || 'card'}-status`}
              >
                <span className="text-sm text-gray-500 font-medium">Actualizado recientemente</span>
              </EditableText>
            </div>
          </CardContent>
        </Card>
      )

    case "badge":
      return (
        <div className={`inline-flex items-center gap-2 ${getEffectClasses()}`} style={getEffectStyles()}>
          <Badge 
            className="relative px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 overflow-hidden group" 
            animation={props.animation || 'pulse'}
            style={{
              fontSize: props.fontSize ? `${props.fontSize}px` : '14px',
              fontWeight: props.fontWeight || '600',
              fontFamily: props.fontFamily || 'Inter, system-ui, sans-serif',
              color: props.color,
              backgroundColor: props.backgroundColor,
              borderRadius: props.borderRadius ? `${props.borderRadius}px` : undefined,
            }}
          >
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            <Icons.CrownIcon className="w-4 h-4 relative z-10" />
            <span className="relative z-10">{props.text || "Premium"}</span>
          </Badge>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        </div>
      )

    case "text":
      return (
        <div className={`max-w-2xl ${getEffectClasses()}`} style={getEffectStyles()}>
          <p
            className="text-lg leading-relaxed bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent font-medium"
            style={{
              fontSize: props.fontSize ? `${props.fontSize}px` : '18px',
              color: props.color || undefined,
              fontWeight: props.fontWeight || '500',
              fontFamily: props.fontFamily || 'Inter, system-ui, sans-serif',
              letterSpacing: props.letterSpacing ? `${props.letterSpacing}px` : '0.025em',
              lineHeight: props.lineHeight || '1.7',
              textAlign: props.textAlign || 'left',
              textTransform: props.textTransform,
              textDecoration: props.textDecoration,
              fontStyle: props.fontStyle,
            }}
          >
            {props.text || "Descubre una nueva forma de crear experiencias digitales excepcionales con nuestro editor avanzado de componentes React."}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-1 h-1 bg-blue-500 rounded-full" />
            <span className="text-sm text-gray-500 font-medium">Texto optimizado para legibilidad</span>
          </div>
        </div>
      )

    case "image":
      return (
        <div className={`w-80 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
            <div className="w-full h-64 bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icons.ImageIcon className="w-10 h-10 text-white" />
                </div>
                <p className="text-white font-semibold text-lg">Imagen Premium</p>
                <p className="text-white/80 text-sm mt-1">Resolución 4K disponible</p>
              </div>
              <div className="absolute top-4 right-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3">
                <p className="font-semibold text-gray-900 text-sm">Imagen de alta calidad</p>
                <p className="text-gray-600 text-xs mt-1">Optimizada para web</p>
              </div>
            </div>
          </div>
        </div>
      )

    case "checkbox":
      return (
        <div className={`w-80 ${getEffectClasses()}`} style={getEffectStyles()}>
          <label className="flex items-start gap-4 cursor-pointer p-6 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300 rounded-2xl transition-all duration-300 hover:shadow-lg group">
            <div className="relative mt-0.5">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-lg peer-checked:bg-gradient-to-br peer-checked:from-blue-500 peer-checked:to-purple-600 peer-checked:border-transparent transition-all duration-300 shadow-sm">
                <Icons.CheckIcon className="w-4 h-4 text-white absolute top-0.5 left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-blue-500/20 scale-0 peer-checked:scale-100 transition-transform duration-300" />
            </div>
            <div className="flex-1">
              <span className="text-gray-900 font-semibold text-lg group-hover:text-blue-700 transition-colors">{props.label || "Acepto los términos y condiciones"}</span>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">Al marcar esta casilla, confirmas que has leído y aceptas nuestros términos de servicio y política de privacidad.</p>
              <div className="flex items-center gap-2 mt-3">
                <Icons.ShieldCheckIcon className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600 font-medium">Protección de datos garantizada</span>
              </div>
            </div>
          </label>
        </div>
      )

    case "radio":
      return (
        <div className={`w-96 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-6 shadow-xl ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Selecciona tu plan preferido</h3>
            <p className="text-gray-600 text-sm">Elige la opción que mejor se adapte a tus necesidades</p>
          </div>
          <div className="space-y-3">
            {[
              { name: "Plan Básico", desc: "Perfecto para empezar", price: "$9/mes", popular: false },
              { name: "Plan Pro", desc: "Más funciones y soporte", price: "$29/mes", popular: true },
              { name: "Plan Enterprise", desc: "Solución completa", price: "$99/mes", popular: false }
            ].map((option, i) => (
              <label key={i} className={`relative flex items-center gap-4 cursor-pointer p-4 border-2 rounded-2xl transition-all duration-300 hover:shadow-md group ${
                i === 1 ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-blue-300 bg-white/50'
              }`}>
                <div className="relative">
                  <input type="radio" name="radio-group" className="peer sr-only" defaultChecked={i === 1} />
                  <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full peer-checked:border-blue-500 transition-all duration-300">
                    <div className="w-3 h-3 bg-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-0 peer-checked:scale-100 transition-transform duration-200" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{option.name}</span>
                    {option.popular && <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full border-0">Popular</Badge>}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{option.desc}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900">{option.price}</div>
                  <div className="text-xs text-gray-500">por usuario</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )

    case "toggle":
      return (
        <div className={`w-96 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="space-y-6">
            {[
              { title: "Notificaciones push", desc: "Recibe alertas en tiempo real", enabled: true, icon: Icons.BellIcon },
              { title: "Modo oscuro", desc: "Interfaz optimizada para poca luz", enabled: false, icon: Icons.MoonIcon },
              { title: "Sincronización automática", desc: "Mantener datos actualizados", enabled: true, icon: Icons.RefreshCwIcon }
            ].map((setting, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <setting.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{setting.title}</h4>
                    <p className="text-gray-600 text-sm">{setting.desc}</p>
                  </div>
                </div>
                <button className={`relative w-16 h-9 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-lg ${
                  setting.enabled ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-300'
                }`}>
                  <div className={`w-7 h-7 bg-white rounded-full shadow-md absolute top-1 transition-all duration-300 ${
                    setting.enabled ? 'left-8' : 'left-1'
                  }`} />
                  {setting.enabled && <Icons.CheckIcon className="w-4 h-4 text-white absolute top-2.5 left-2" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )

    case "slider":
      return (
        <div className={`w-96 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-xl ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Control de Audio</h3>
              <p className="text-gray-600">Ajusta el volumen a tu preferencia</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icons.VolumeXIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900">Volumen Principal</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">75%</div>
                  <div className="text-xs text-gray-500">Nivel óptimo</div>
                </div>
              </div>
              
              <div className="relative px-2">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full relative transition-all duration-300" style={{ width: '75%' }}>
                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  </div>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-4 border-green-500 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform" style={{ left: '75%', marginLeft: '-12px' }} />
              </div>
              
              <div className="flex justify-between text-sm text-gray-500 px-2">
                <span className="flex items-center gap-1">
                  <Icons.Volume1Icon className="w-4 h-4" />
                  Bajo
                </span>
                <span className="flex items-center gap-1">
                  <Icons.Volume2Icon className="w-4 h-4" />
                  Alto
                </span>
              </div>
            </div>
          </div>
        </div>
      )

    case "avatar":
      return (
        <div className={`w-80 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-6 shadow-xl ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 flex items-center justify-center text-white font-bold text-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300">
                {props.initials || "AD"}
              </div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 border-4 border-white rounded-full shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-gray-900">Ana Delgado</h3>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full border-0">
                  <Icons.CrownIcon className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-600 font-medium">En línea ahora</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Icons.MapPinIcon className="w-4 h-4" />
                  <span>Madrid, España</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icons.ClockIcon className="w-4 h-4" />
                  <span>UTC+1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    case "textarea":
      return (
        <div className={`w-96 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-6 shadow-xl">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Comparte tu feedback</h3>
              <p className="text-gray-600 text-sm">Tu opinión es muy importante para nosotros</p>
            </div>
            <div className="relative">
              <textarea
                className="w-full h-32 p-4 bg-gray-50/80 border-2 border-gray-200 rounded-2xl resize-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-gray-900 placeholder:text-gray-400 font-medium"
                placeholder="Escribe tu mensaje aquí... ¿Qué te parece nuestra plataforma?"
                defaultValue="Me encanta la nueva interfaz, es muy intuitiva y fácil de usar. Las animaciones son suaves y el diseño es moderno."
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <span className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-full font-medium">127/500</span>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Icons.SmileIcon className="w-4 h-4" />
                <span>Usa emojis para expresarte mejor</span>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 rounded-xl px-6">
                Enviar
              </Button>
            </div>
          </div>
        </div>
      )

    case "select":
      return (
        <div className={`w-80 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Elige tu país</h3>
              <p className="text-gray-600 text-sm">Selecciona tu ubicación para personalizar la experiencia</p>
            </div>
            <div className="relative">
              <select className="w-full h-14 px-4 pr-12 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-white/80 backdrop-blur-sm appearance-none cursor-pointer transition-all duration-300 text-gray-900 font-medium shadow-sm hover:shadow-md">
                <option value="">Selecciona tu país...</option>
                <option value="es">🇪🇸 España</option>
                <option value="mx">🇲🇽 México</option>
                <option value="ar">🇦🇷 Argentina</option>
                <option value="co">🇨🇴 Colombia</option>
                <option value="pe">🇵🇪 Perú</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Icons.ChevronDownIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
              <Icons.GlobeIcon className="w-4 h-4" />
              <span>Tu selección nos ayuda a ofrecerte contenido relevante</span>
            </div>
          </div>
        </div>
      )

    case "progress":
      return (
        <div className={`w-96 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-xl ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Icons.DownloadIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Descargando archivo</h3>
              <p className="text-gray-600">ComponentesR-v2.1.0.zip</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Progreso de descarga</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">68%</div>
                  <div className="text-xs text-gray-500">Completado</div>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 h-4 rounded-full transition-all duration-500 relative" style={{ width: '68%' }}>
                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                    <div className="absolute right-0 top-0 w-2 h-full bg-white/50 animate-pulse" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Icons.HardDriveIcon className="w-4 h-4" />
                  <span>2.1 MB de 3.1 MB</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Icons.ZapIcon className="w-4 h-4" />
                  <span>1.2 MB/s</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Icons.ClockIcon className="w-4 h-4" />
                <span>Tiempo restante: ~30 segundos</span>
              </div>
            </div>
          </div>
        </div>
      )

    case "alert":
      return (
        <div className={`w-96 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-8 border-red-500 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Icons.AlertTriangleIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Error de validación detectado</h3>
                  <p className="text-red-800 leading-relaxed mb-4">Hemos encontrado algunos problemas en los datos ingresados. Por favor revisa los campos marcados en rojo y corrige la información.</p>
                  <div className="flex items-center gap-3">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white border-0 rounded-xl px-4">
                      Revisar campos
                    </Button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Ver detalles
                    </button>
                  </div>
                </div>
                <button className="text-red-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-100 transition-colors">
                  <Icons.XIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-red-500 to-orange-500" />
          </div>
        </div>
      )

    case "list":
      return (
        <div className={`w-96 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-2xl overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                <Icons.CheckSquareIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Lista de tareas del proyecto</h3>
                <p className="text-blue-100 text-sm">3 de 4 tareas completadas</p>
              </div>
            </div>
          </div>
          <div className="p-2">
            {[
              { text: "Revisar documentación técnica", completed: true, priority: "high", time: "2h" },
              { text: "Implementar nuevas funciones", completed: true, priority: "high", time: "4h" },
              { text: "Realizar pruebas unitarias", completed: true, priority: "medium", time: "3h" },
              { text: "Desplegar a producción", completed: false, priority: "high", time: "1h" }
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-4 p-4 m-2 rounded-2xl transition-all duration-300 hover:shadow-md group ${
                item.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300'
              }`}>
                <div className="relative">
                  <input type="checkbox" defaultChecked={item.completed} className="peer sr-only" />
                  <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 ${
                    item.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 group-hover:border-blue-500'
                  }`}>
                    {item.completed && <Icons.CheckIcon className="w-4 h-4 text-white absolute top-0.5 left-0.5" />}
                  </div>
                </div>
                <div className="flex-1">
                  <span className={`font-medium transition-colors ${
                    item.completed ? 'line-through text-gray-500' : 'text-gray-900 group-hover:text-blue-700'
                  }`}>
                    {item.text}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={`text-xs px-2 py-1 rounded-full border-0 ${
                      item.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.priority === 'high' ? 'Alta' : 'Media'}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Icons.ClockIcon className="w-3 h-3" />
                      {item.time}
                    </span>
                  </div>
                </div>
                {item.completed && (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Icons.CheckIcon className="w-4 h-4 text-green-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Progreso total</span>
              <span className="text-sm font-semibold text-gray-900">75% completado</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
        </div>
      )

    case "table":
      return (
        <div className={`w-[500px] bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-2xl overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Equipo de desarrollo</h3>
                <p className="text-indigo-100 text-sm">Miembros activos del proyecto</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                <Icons.UsersIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Miembro</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Rol</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: "Ana García", email: "ana@company.com", role: "Tech Lead", status: "Activo", color: "green", avatar: "AG" },
                  { name: "Carlos López", email: "carlos@company.com", role: "Frontend Dev", status: "Ausente", color: "yellow", avatar: "CL" },
                  { name: "María Rodríguez", email: "maria@company.com", role: "UI Designer", status: "En línea", color: "green", avatar: "MR" }
                ].map((user, i) => (
                  <tr key={i} className="hover:bg-blue-50/50 transition-colors duration-200 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                            {user.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            user.color === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                          }`} />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border-0 font-medium">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`border-0 font-medium ${
                        user.color === 'green' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          user.color === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors">
                        Ver perfil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50/80 px-6 py-4 border-t">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Mostrando 3 de 12 miembros</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Anterior
                </button>
                <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      )

    case "tabs":
      return (
        <div className={`w-[500px] ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex bg-gradient-to-r from-gray-50 to-blue-50 p-2">
              <button className="flex-1 px-6 py-4 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
                <Icons.HomeIcon className="w-5 h-5 inline mr-3" />
                Dashboard
              </button>
              <button className="flex-1 px-6 py-4 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-white/50 rounded-2xl transition-all duration-300 mx-1">
                <Icons.SettingsIcon className="w-5 h-5 inline mr-3" />
                Configuración
              </button>
              <button className="flex-1 px-6 py-4 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-white/50 rounded-2xl transition-all duration-300">
                <Icons.UserIcon className="w-5 h-5 inline mr-3" />
                Mi Perfil
              </button>
            </div>
            <div className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Panel de control principal</h3>
                <p className="text-gray-600 leading-relaxed">Bienvenido a tu dashboard personalizado. Desde aquí puedes gestionar todas las configuraciones de tu cuenta y monitorear la actividad del sistema.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center">
                      <Icons.BellIcon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Notificaciones</h4>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Alertas por email</span>
                    <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-2xl border border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-2xl flex items-center justify-center">
                      <Icons.MoonIcon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Tema</h4>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Modo oscuro</span>
                    <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-2xl px-8 py-3 font-semibold">
                  Guardar cambios
                </Button>
                <button className="text-gray-600 hover:text-gray-800 font-medium">
                  Restablecer
                </button>
              </div>
            </div>
          </div>
        </div>
      )

    // Componentes básicos adicionales (25 total)
    case "accordion":
      return (
        <div className={`w-[500px] bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-2xl overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Preguntas frecuentes</h3>
            <p className="text-emerald-100 text-sm">Encuentra respuestas a las dudas más comunes</p>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="p-6">
              <button className="w-full flex items-center justify-between text-left group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                    <Icons.CrownIcon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors text-lg">¿Qué incluye el plan premium?</span>
                </div>
                <Icons.ChevronDownIcon className="w-6 h-6 text-gray-400 group-hover:text-emerald-600 transition-all duration-300 group-hover:rotate-180" />
              </button>
              <div className="mt-6 ml-14">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    El plan premium incluye acceso completo a todas las funciones avanzadas, soporte prioritario 24/7, almacenamiento ilimitado y herramientas de colaboración en tiempo real.
                  </p>
                  <div className="flex items-center gap-2">
                    <Icons.CheckIcon className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-emerald-700 font-medium">Incluye 30 días de prueba gratuita</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <button className="w-full flex items-center justify-between text-left group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Icons.RefreshCwIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-lg">¿Puedo cancelar en cualquier momento?</span>
                </div>
                <Icons.ChevronRightIcon className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </button>
            </div>
            <div className="p-6">
              <button className="w-full flex items-center justify-between text-left group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Icons.ShieldCheckIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors text-lg">¿Mis datos están seguros?</span>
                </div>
                <Icons.ChevronRightIcon className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      )

    case "modal":
      return (
        <div className={`w-full h-96 relative ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-lg w-full transform scale-100 transition-all duration-500 border border-white/20">
              <div className="relative overflow-hidden rounded-t-3xl">
                <div className="bg-gradient-to-r from-red-500 to-orange-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Icons.AlertTriangleIcon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Acción irreversible</h3>
                        <p className="text-red-100 text-sm">Confirma tu decisión</p>
                      </div>
                    </div>
                    <button className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors">
                      <Icons.XIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    ¿Estás completamente seguro de que deseas eliminar este elemento? 
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-red-800">
                      <Icons.AlertCircleIcon className="w-5 h-5" />
                      <span className="font-semibold text-sm">Esta acción no se puede deshacer y todos los datos asociados se perderán permanentemente.</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 py-3 rounded-2xl border-2 border-gray-300 hover:border-gray-400 font-semibold">
                    Cancelar
                  </Button>
                  <Button className="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white border-0 rounded-2xl font-semibold shadow-lg">
                    Sí, eliminar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    case "dropdown":
      return (
        <div className={`w-80 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Icons.UserIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">Ana Delgado</div>
                  <div className="text-blue-100 text-sm">ana.delgado@company.com</div>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Mi cuenta</div>
              <button className="w-full px-4 py-3 text-left hover:bg-blue-50 rounded-2xl flex items-center gap-4 transition-all duration-300 group mb-1">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icons.UserIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">Mi perfil</div>
                  <div className="text-xs text-gray-500">Ver y editar información personal</div>
                </div>
                <Icons.ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </button>
              <button className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-2xl flex items-center gap-4 transition-all duration-300 group mb-1">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icons.SettingsIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">Configuración</div>
                  <div className="text-xs text-gray-500">Preferencias y ajustes</div>
                </div>
                <Icons.ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>
              <button className="w-full px-4 py-3 text-left hover:bg-green-50 rounded-2xl flex items-center gap-4 transition-all duration-300 group">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icons.HelpCircleIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">Ayuda y soporte</div>
                  <div className="text-xs text-gray-500">Centro de ayuda</div>
                </div>
                <Icons.ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </button>
            </div>
            <div className="border-t border-gray-100 p-3">
              <button className="w-full px-4 py-3 text-left hover:bg-red-50 rounded-2xl flex items-center gap-4 text-red-600 transition-all duration-300 group">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icons.LogOutIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold group-hover:text-red-700 transition-colors">Cerrar sesión</div>
                  <div className="text-xs text-red-400">Salir de la aplicación</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )

    case "spinner":
      return (
        <div className={`w-96 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-xl ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-purple-600 rounded-full animate-spin" />
              <div className="absolute inset-2 border-4 border-transparent border-t-purple-500 border-l-blue-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">Procesando solicitud</h3>
              <p className="text-gray-600 leading-relaxed">Estamos preparando tu contenido personalizado. Este proceso puede tomar unos segundos.</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Icons.ClockIcon className="w-4 h-4" />
                <span>Tiempo estimado: 15-30 segundos</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <Icons.ShieldCheckIcon className="w-5 h-5" />
                <span className="font-medium text-sm">Conexión segura establecida</span>
              </div>
            </div>
          </div>
        </div>
      )

    case "skeleton":
      return (
        <div className={`w-96 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-6 shadow-xl ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="animate-pulse space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse rounded-3xl" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="relative overflow-hidden">
                  <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse" />
                </div>
                <div className="relative overflow-hidden">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative overflow-hidden">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse" />
              </div>
              <div className="relative overflow-hidden">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-5/6" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse" />
              </div>
              <div className="relative overflow-hidden">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-4/6" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative overflow-hidden">
                <div className="h-10 bg-gradient-to-r from-blue-200 to-blue-300 rounded-2xl w-24" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse" />
              </div>
              <div className="relative overflow-hidden">
                <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl w-20" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse" />
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>Cargando contenido...</span>
            </div>
          </div>
        </div>
      )

    case "tooltip":
      return (
        <div className={`w-96 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-xl ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="text-center space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Información interactiva</h3>
            <p className="text-gray-600">Pasa el cursor sobre los elementos para ver más detalles</p>
            <div className="flex items-center justify-center gap-6">
              <div className="group relative">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-2xl px-8 py-3 font-semibold shadow-lg">
                  Botón principal
                </Button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-4 py-3 bg-gray-900/95 backdrop-blur-sm text-white text-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-2xl border border-white/10">
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-gray-900" />
                  <div className="flex items-center gap-2">
                    <Icons.SparklesIcon className="w-4 h-4" />
                    <span className="font-medium">Acción principal del formulario</span>
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center cursor-help shadow-lg hover:scale-110 transition-transform">
                  <Icons.InfoIcon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-4 py-3 bg-emerald-900/95 backdrop-blur-sm text-white text-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-2xl border border-emerald-400/20">
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-emerald-900" />
                  <div className="space-y-1">
                    <div className="font-semibold">Centro de ayuda</div>
                    <div className="text-emerald-200 text-xs">Haz clic para obtener asistencia</div>
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center cursor-help shadow-lg hover:scale-110 transition-transform">
                  <Icons.AlertTriangleIcon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-4 py-3 bg-red-900/95 backdrop-blur-sm text-white text-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-2xl border border-red-400/20">
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-red-900" />
                  <div className="space-y-1">
                    <div className="font-semibold flex items-center gap-2">
                      <Icons.AlertCircleIcon className="w-4 h-4" />
                      Advertencia importante
                    </div>
                    <div className="text-red-200 text-xs">Revisa antes de continuar</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    case "notification":
      return (
        <div className={`w-[450px] bg-white/95 backdrop-blur-sm border-l-8 border-green-500 rounded-r-3xl shadow-2xl overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50" />
            <div className="relative p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Icons.CheckIcon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-bold text-gray-900">¡Operación completada!</h4>
                    <Badge className="bg-green-100 text-green-800 border-0 text-xs px-2 py-1 rounded-full">
                      Éxito
                    </Badge>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Todos los cambios se han guardado correctamente en el sistema. La sincronización se completó sin errores.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <button className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold hover:bg-green-50 px-3 py-2 rounded-xl transition-colors">
                      <Icons.ExternalLinkIcon className="w-4 h-4" />
                      Ver detalles
                    </button>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Icons.ClockIcon className="w-4 h-4" />
                      <span>Hace 2 minutos</span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <Icons.XIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />
          </div>
        </div>
      )

    default:
      return null
  }
}