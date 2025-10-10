"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { useLiveEffects } from "@/hooks/use-live-effects"
import * as Icons from "@/components/icons"

interface ComponentRendererProps {
  component: any
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  mode: "design" | "preview"
}

export function ComponentRenderer({
  component,
  isSelected,
  onSelect,
  onDelete,
  mode,
}: ComponentRendererProps) {
  const { type, props, effects = {} } = component
  const effectsRef = useLiveEffects(effects)

  const getEffectStyles = () => {
    const styles: any = {}

    if (effects.glow?.enabled) {
      const intensity = effects.glow.intensity || 50
      const color = effects.glow.color || '#3b82f6'
      styles.boxShadow = `0 0 ${intensity}px ${color}40, 0 0 ${intensity * 2}px ${color}20`
      styles.filter = `drop-shadow(0 0 ${intensity / 2}px ${color})`
    }

    if (effects.glass?.enabled) {
      const blur = effects.glass.blur || 10
      const opacity = (effects.glass.opacity || 80) / 100
      styles.backdropFilter = `blur(${blur}px)`
      styles.backgroundColor = `rgba(255, 255, 255, ${opacity * 0.1})`
      styles.border = '1px solid rgba(255, 255, 255, 0.2)'
    }

    if (effects.transform3d?.enabled) {
      const rotateX = effects.transform3d.rotateX || 0
      const rotateY = effects.transform3d.rotateY || 0
      const perspective = effects.transform3d.perspective || 1000
      styles.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      styles.transformStyle = 'preserve-3d'
    }

    if (effects.gradient?.enabled) {
      const color1 = effects.gradient.color1 || '#3b82f6'
      const color2 = effects.gradient.color2 || '#8b5cf6'
      const type = effects.gradient.type || 'linear'
      
      if (type === 'linear') {
        styles.background = `linear-gradient(135deg, ${color1}, ${color2})`
      } else if (type === 'radial') {
        styles.background = `radial-gradient(circle, ${color1}, ${color2})`
      } else if (type === 'conic') {
        styles.background = `conic-gradient(${color1}, ${color2}, ${color1})`
      }
    }

    return styles
  }

  const getEffectClasses = () => {
    const classes: string[] = []

    if (effects.shimmer?.enabled) {
      classes.push('relative overflow-hidden')
    }
    if (effects.ripple?.enabled) {
      classes.push('relative overflow-hidden cursor-pointer')
    }
    if (effects.borderBeam?.enabled) {
      classes.push('relative')
    }

    return classes.join(' ')
  }

  const renderEffectOverlays = () => {
    const overlays = []

    if (effects.shimmer?.enabled) {
      overlays.push(
        <div
          key="shimmer"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ 
            animation: `shimmer ${effects.shimmer.speed || 2}s linear infinite`,
            animationDelay: '0s'
          }}
        />
      )
    }

    if (effects.borderBeam?.enabled) {
      const width = effects.borderBeam.width || 2
      const color = effects.borderBeam.color || '#3b82f6'
      overlays.push(
        <div
          key="border-beam"
          className="absolute inset-0 rounded-inherit pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            padding: `${width}px`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            animation: 'border-beam 2s linear infinite'
          }}
        />
      )
    }

    return overlays
  }

  const renderComponent = () => {
    switch (type) {
      case "button":
        return (
          <Button
            ref={effectsRef as any}
            className={`rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all ${getEffectClasses()}`}
            style={{
              ...getEffectStyles(),
              backgroundColor: props.colors?.background || "#3b82f6",
              color: props.colors?.text || "#ffffff",
            }}
          >
            {props.text || "Button"}
          </Button>
        )

      case "input":
        return (
          <Input
            className={`border-2 focus:border-blue-500 transition-colors ${getEffectClasses()}`}
            placeholder={props.placeholder || "Ingresa texto..."}
            style={getEffectStyles()}
          />
        )

      case "card":
        return (
          <Card
            ref={effectsRef as any}
            className={`shadow-lg hover:shadow-xl transition-shadow ${getEffectClasses()}`}
            style={getEffectStyles()}
          >
            <CardHeader>
              <CardTitle>{props.title || "Título de la tarjeta"}</CardTitle>
              <CardDescription>{props.description || "Descripción de la tarjeta"}</CardDescription>
            </CardHeader>
          </Card>
        )

      case "badge":
        return (
          <Badge className={`rounded-full px-3 py-1 ${getEffectClasses()}`} style={getEffectStyles()}>
            <Icons.StarIcon className="w-3 h-3 mr-1" />
            {props.text || "Badge"}
          </Badge>
        )

      case "text":
        return (
          <p
            className={`text-base ${getEffectClasses()}`}
            style={{
              ...getEffectStyles(),
              fontSize: `${props.fontSize || 16}px`,
              color: props.color || "#000000",
            }}
          >
            {props.text || "Texto de ejemplo"}
          </p>
        )

      case "image":
        return (
          <div
            className={`w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center ${getEffectClasses()}`}
            style={getEffectStyles()}
          >
            <Icons.ImageIcon className="w-12 h-12 text-white/50" />
          </div>
        )

      case "checkbox":
        return (
          <label className={`flex items-center gap-2 cursor-pointer ${getEffectClasses()}`} style={getEffectStyles()}>
            <input type="checkbox" className="w-4 h-4 rounded border-2" />
            <span>{props.label || "Checkbox"}</span>
          </label>
        )

      case "radio":
        return (
          <label className={`flex items-center gap-2 cursor-pointer ${getEffectClasses()}`} style={getEffectStyles()}>
            <input type="radio" className="w-4 h-4" />
            <span>{props.label || "Radio"}</span>
          </label>
        )

      case "toggle":
        return (
          <button
            className={`w-12 h-6 rounded-full bg-gray-300 relative transition-colors hover:bg-gray-400 ${getEffectClasses()}`}
            style={getEffectStyles()}
          >
            <div className="w-5 h-5 rounded-full bg-white absolute left-0.5 top-0.5 transition-transform" />
          </button>
        )

      case "slider":
        return (
          <input
            type="range"
            className={`w-full ${getEffectClasses()}`}
            style={getEffectStyles()}
            min="0"
            max="100"
            defaultValue="50"
          />
        )

      case "avatar":
        return (
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold ${getEffectClasses()}`}
            style={getEffectStyles()}
          >
            {props.initials || "AB"}
          </div>
        )

      case "divider":
        return <div className={`h-px bg-gray-300 w-full ${getEffectClasses()}`} style={getEffectStyles()} />

      case "login-form":
        return (
          <Card className={`w-full max-w-md ${getEffectClasses()}`} style={getEffectStyles()}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Icons.LockIcon className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Bienvenido</CardTitle>
              <CardDescription>Ingresa tus credenciales para continuar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Icons.MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input className="pl-10" placeholder="Email" type="email" />
              </div>
              <div className="relative">
                <Icons.LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input className="pl-10" placeholder="Contraseña" type="password" />
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500">Iniciar Sesión</Button>
            </CardContent>
          </Card>
        )

      case "pricing-card":
        return (
          <Card className={`w-full max-w-sm relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-bl-full opacity-10" />
            <CardHeader>
              <Badge className="w-fit mb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                Popular
              </Badge>
              <CardTitle className="text-4xl font-bold">$29</CardTitle>
              <CardDescription className="text-base">por mes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <Icons.CheckIcon className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm">Característica {i}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500">Comenzar Ahora</Button>
            </CardContent>
          </Card>
        )

      case "notification":
        return (
          <div
            className={`p-4 rounded-lg bg-white dark:bg-card border-l-4 border-l-blue-500 shadow-xl max-w-sm animate-in slide-in-from-right ${getEffectClasses()}`}
            style={getEffectStyles()}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Icons.InfoIcon className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{props.title || "Notificación"}</h4>
                <p className="text-sm text-muted-foreground">{props.message || "Mensaje de notificación"}</p>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <Icons.XIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )

      // Magic UI Components
      case "glow-button":
        return (
          <Button
            ref={effectsRef as any}
            className={`relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25 hover:shadow-2xl transition-all duration-300 ${getEffectClasses()}`}
            style={{
              ...getEffectStyles(),
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)'
            }}
          >
            {props.text || "Glow Button"}
          </Button>
        )

      case "shimmer-button":
        return (
          <Button
            ref={effectsRef as any}
            className={`relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 transition-all duration-300 ${getEffectClasses()}`}
            style={getEffectStyles()}
          >
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10">{props.text || "Shimmer Button"}</span>
          </Button>
        )

      case "glass-card":
        return (
          <Card
            ref={effectsRef as any}
            className={`backdrop-blur-md bg-white/10 border border-white/20 shadow-xl ${getEffectClasses()}`}
            style={{
              ...getEffectStyles(),
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            <CardHeader>
              <CardTitle className="text-white">{props.title || "Glass Card"}</CardTitle>
              <CardDescription className="text-white/70">{props.description || "Efecto glass morphism"}</CardDescription>
            </CardHeader>
          </Card>
        )

      case "gradient-text":
        return (
          <h2
            className={`text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ${getEffectClasses()}`}
            style={getEffectStyles()}
          >
            {props.text || "Texto Gradiente"}
          </h2>
        )

      case "neon-badge":
        return (
          <Badge
            className={`bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 shadow-lg ${getEffectClasses()}`}
            style={{
              ...getEffectStyles(),
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)'
            }}
          >
            <Icons.ZapIcon className="w-3 h-3 mr-1" />
            {props.text || "Neon Badge"}
          </Badge>
        )

      // Background Components
      case "bg-dots":
        return (
          <div
            className={`w-full h-32 rounded-lg relative overflow-hidden ${getEffectClasses()}`}
            style={{
              ...getEffectStyles(),
              backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
          </div>
        )

      case "bg-grid":
        return (
          <div
            className={`w-full h-32 rounded-lg relative overflow-hidden ${getEffectClasses()}`}
            style={{
              ...getEffectStyles(),
              backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
          </div>
        )

      case "bg-aurora":
        return (
          <div
            className={`w-full h-32 rounded-lg relative overflow-hidden ${getEffectClasses()}`}
            style={getEffectStyles()}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-70 animate-gradient-shift" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent" />
          </div>
        )

      // Template Components
      case "signup-form":
        return (
          <Card className={`w-full max-w-md ${getEffectClasses()}`} style={getEffectStyles()}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
              <CardDescription>Completa los datos para registrarte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Nombre completo" />
              <Input placeholder="Email" type="email" />
              <Input placeholder="Contraseña" type="password" />
              <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500">Registrarse</Button>
            </CardContent>
          </Card>
        )

      case "profile-card":
        return (
          <Card className={`w-full max-w-sm ${getEffectClasses()}`} style={getEffectStyles()}>
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <CardTitle>John Doe</CardTitle>
              <CardDescription>Desarrollador Frontend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-2">
                <Button size="sm" variant="outline">Seguir</Button>
                <Button size="sm">Mensaje</Button>
              </div>
            </CardContent>
          </Card>
        )

      case "stats-card":
        return (
          <Card className={`w-full max-w-sm ${getEffectClasses()}`} style={getEffectStyles()}>
            <CardHeader>
              <CardTitle className="text-lg">Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Usuarios</span>
                <span className="text-2xl font-bold text-blue-500">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ventas</span>
                <span className="text-2xl font-bold text-green-500">$12,345</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Conversión</span>
                <span className="text-2xl font-bold text-purple-500">23.5%</span>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return (
          <div className={`p-4 rounded-lg border border-dashed ${getEffectClasses()}`} style={getEffectStyles()}>
            <p className="text-sm text-muted-foreground">Componente: {type}</p>
          </div>
        )
    }
  }

  return (
    <TooltipProvider>
      <div
        className={`relative group animate-in fade-in zoom-in ${mode === "design" ? "cursor-pointer" : ""} ${getEffectClasses()}`}
        onClick={mode === "design" ? onSelect : undefined}
      >
        {renderEffectOverlays()}
        {mode === "design" && isSelected && (
          <div
            className="absolute -inset-2 border-2 border-primary rounded-lg pointer-events-none animate-in fade-in"
            style={{
              boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.1)",
            }}
          />
        )}

        {mode === "design" && isSelected && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
                className="absolute -top-3 -right-3 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10 animate-in zoom-in"
              >
                <Icons.Trash2Icon className="w-3 h-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Eliminar componente</p>
            </TooltipContent>
          </Tooltip>
        )}

        {renderComponent()}
      </div>
    </TooltipProvider>
  )
}
