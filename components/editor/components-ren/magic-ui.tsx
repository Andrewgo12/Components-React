"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import * as Icons from "@/components/icons"

interface ComponentProps {
  props: any
  getEffectClasses: () => string
  getEffectStyles: () => any
}

export function renderMagicUIComponents(type: string, { props, getEffectClasses, getEffectStyles }: ComponentProps) {
  switch (type) {
    // Botones animados
    case "glow-button":
      return (
        <Button
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
          className={`relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 transition-all duration-300 ${getEffectClasses()}`}
          style={getEffectStyles()}
        >
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative z-10">{props.text || "Shimmer Button"}</span>
        </Button>
      )

    case "ripple-button":
      return (
        <Button className={`relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg transform hover:scale-105 transition-all duration-300 ${getEffectClasses()}`} style={getEffectStyles()}>
          <span className="relative z-10 flex items-center gap-2">
            <Icons.WavesIcon className="w-4 h-4" />
            {props.text || "Ripple Effect"}
          </span>
          <div className="absolute inset-0 bg-white/30 rounded-full scale-0 group-active:scale-150 transition-transform duration-500" />
        </Button>
      )

    case "magnetic-button":
      return (
        <Button className={`relative bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.MagnetIcon className="w-4 h-4 mr-2" />
          {props.text || "Magnetic"}
        </Button>
      )

    case "liquid-button":
      return (
        <Button className={`relative overflow-hidden bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative z-10 flex items-center gap-2">
            <Icons.WavesIcon className="w-4 h-4" />
            {props.text || "Liquid"}
          </span>
        </Button>
      )

    case "morphing-button":
      return (
        <Button className={`bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-500 hover:to-pink-500 rounded-full hover:rounded-lg transition-all duration-500 ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.ShuffleIcon className="w-4 h-4 mr-2" />
          {props.text || "Morph"}
        </Button>
      )

    case "elastic-button":
      return (
        <Button className={`bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 transform hover:scale-110 active:scale-95 transition-transform duration-200 ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.ZapIcon className="w-4 h-4 mr-2" />
          {props.text || "Elastic"}
        </Button>
      )

    case "neon-button":
      return (
        <Button className={`bg-black border-2 border-purple-500 text-purple-400 hover:text-white hover:bg-purple-500/20 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
        }}>
          <Icons.ZapIcon className="w-4 h-4 mr-2" />
          {props.text || "Neon"}
        </Button>
      )

    case "gradient-border-button":
      return (
        <div className={`p-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg ${getEffectClasses()}`} style={getEffectStyles()}>
          <Button className="bg-white text-gray-900 hover:bg-gray-50 w-full">
            <Icons.SparklesIcon className="w-4 h-4 mr-2" />
            {props.text || "Gradient Border"}
          </Button>
        </div>
      )

    case "loading-button":
      return (
        <Button className={`bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
          {props.text || "Loading..."}
        </Button>
      )

    // Cards animadas
    case "glass-card":
      return (
        <Card
          className={`backdrop-blur-md bg-white/10 border border-white/20 shadow-xl ${getEffectClasses()}`}
          style={{
            ...getEffectStyles(),
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <CardContent className="p-6">
            <h3 className="text-white font-semibold">{props.title || "Glass Card"}</h3>
            <p className="text-white/70">{props.description || "Efecto glass morphism"}</p>
          </CardContent>
        </Card>
      )

    case "bounce-card":
      return (
        <Card className={`w-48 bg-gradient-to-br from-orange-400 to-red-500 text-white border-0 shadow-xl animate-bounce ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-6 text-center">
            <Icons.ZapIcon className="w-12 h-12 mx-auto mb-3" />
            <h3 className="font-bold text-lg">Bounce!</h3>
            <p className="text-sm opacity-80">Efecto rebote</p>
          </CardContent>
        </Card>
      )

    case "animated-card":
      return (
        <Card className={`w-64 bg-gradient-to-br from-violet-500 to-purple-600 text-white border-0 shadow-2xl transform hover:rotate-1 transition-all duration-500 ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-spin">
                <Icons.SparklesIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Card Animada</h3>
                <p className="text-white/70 text-sm">Con efectos únicos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case "hover-card":
      return (
        <Card className={`w-64 bg-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-6">
            <Icons.MousePointerIcon className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Hover Card</h3>
            <p className="text-sm text-gray-600">Card que se eleva al hacer hover</p>
          </CardContent>
        </Card>
      )

    case "tilt-card":
      return (
        <Card className={`w-64 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl transform hover:rotate-3 hover:scale-105 transition-all duration-300 ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-6">
            <Icons.RotateCcwIcon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-2">Tilt Card</h3>
            <p className="text-sm opacity-90">Card con efecto de inclinación</p>
          </CardContent>
        </Card>
      )

    case "expand-card":
      return (
        <Card className={`w-48 h-32 bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:w-64 hover:h-40 transition-all duration-500 overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-4 h-full flex flex-col justify-center">
            <Icons.ExpandIcon className="w-6 h-6 mb-2" />
            <h3 className="font-semibold text-sm">Expand Card</h3>
            <p className="text-xs opacity-90">Se expande al hover</p>
          </CardContent>
        </Card>
      )

    case "parallax-card":
      return (
        <Card className={`w-64 h-40 bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl overflow-hidden relative ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 transform hover:scale-110 transition-transform duration-700" />
          <CardContent className="p-6 relative z-10">
            <Icons.LayersIcon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-2">Parallax Card</h3>
            <p className="text-sm opacity-90">Efecto parallax en el fondo</p>
          </CardContent>
        </Card>
      )

    case "reveal-card":
      return (
        <Card className={`w-64 h-40 bg-gray-800 text-white shadow-xl overflow-hidden relative group ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <CardContent className="p-6 relative z-10">
            <Icons.EyeIcon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-2">Reveal Card</h3>
            <p className="text-sm opacity-90">Revela contenido al hover</p>
          </CardContent>
        </Card>
      )

    case "fade-card":
      return (
        <Card className={`w-56 bg-gradient-to-br from-gray-600 to-slate-700 text-white border-0 shadow-xl hover:opacity-50 transition-opacity duration-500 ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-6">
            <Icons.CircleIcon className="w-8 h-8 mb-3 opacity-70" />
            <h3 className="font-semibold">Fade Effect</h3>
            <p className="text-sm opacity-80">Hover para desvanecer</p>
          </CardContent>
        </Card>
      )

    // Texto animado
    case "gradient-text":
      return (
        <h2
          className={`text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ${getEffectClasses()}`}
          style={getEffectStyles()}
        >
          {props.text || "Texto Gradiente"}
        </h2>
      )

    case "typewriter-text":
      return (
        <div className={`bg-black text-green-400 p-4 rounded-lg font-mono border-2 border-green-500/30 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs">Terminal</span>
          </div>
          <p className="text-sm">
            {props.text || "$ echo 'Hello World'"}<span className="animate-pulse">|</span>
          </p>
        </div>
      )

    case "glow-text":
      return (
        <div className={`p-6 bg-black rounded-lg ${getEffectClasses()}`} style={getEffectStyles()}>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 filter drop-shadow-lg">
            {props.text || "Glow Text"}
          </h2>
          <div className="mt-2 text-pink-400 text-sm opacity-70">Texto con brillo</div>
        </div>
      )

    case "marquee-text":
      return (
        <div className={`w-64 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="flex items-center gap-2">
            <Icons.MoveIcon className="w-4 h-4 animate-bounce" />
            <div className="whitespace-nowrap animate-pulse font-semibold">
              {props.text || "✨ Texto en movimiento ✨"}
            </div>
          </div>
        </div>
      )

    case "slide-text":
      return (
        <div className={`w-64 bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-4 rounded-lg overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="transform hover:translate-x-2 transition-transform duration-300">
            <Icons.FileTextIcon className="w-5 h-5 mb-2" />
            <p className="font-semibold">{props.text || "Texto deslizante"}</p>
            <p className="text-sm opacity-80">Hover para deslizar →</p>
          </div>
        </div>
      )

    // Badges y elementos pequeños
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

    case "pulse-badge":
      return (
        <Badge className={`bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 px-4 py-2 animate-pulse shadow-lg ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            <span>{props.text || "LIVE"}</span>
          </div>
        </Badge>
      )

    case "notification-badge":
      return (
        <div className={`relative inline-block ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.BellIcon className="w-8 h-8 text-gray-600" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            3
          </span>
        </div>
      )

    case "status-badge":
      return (
        <div className={`flex items-center gap-2 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
          <span className="text-sm text-gray-700">{props.text || "Online"}</span>
        </div>
      )

    case "progress-badge":
      return (
        <div className={`bg-blue-100 px-3 py-1 rounded-full ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-blue-700">{props.text || "Loading..."}</span>
          </div>
        </div>
      )

    case "count-badge":
      return (
        <Badge className={`bg-gradient-to-r from-orange-500 to-red-500 text-white animate-bounce ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.StarIcon className="w-3 h-3 mr-1" />
          {props.count || "99+"}
        </Badge>
      )

    // Iconos animados
    case "rotate-icon":
      return (
        <div className={`w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.LoaderIcon className="w-8 h-8 text-white animate-spin" />
        </div>
      )

    case "floating-button":
      return (
        <Button className={`fixed-like relative bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-full w-16 h-16 shadow-2xl animate-bounce ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.MousePointerIcon className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
        </Button>
      )

    case "icon-spin":
      return (
        <div className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.LoaderIcon className="w-8 h-8 text-white animate-spin" />
        </div>
      )

    case "icon-bounce":
      return (
        <div className={`w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center animate-bounce ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.ZapIcon className="w-8 h-8 text-white" />
        </div>
      )

    case "icon-pulse":
      return (
        <div className={`w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.HeartIcon className="w-8 h-8 text-white" />
        </div>
      )

    case "icon-glow":
      return (
        <div className={`w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)'
        }}>
          <Icons.StarIcon className="w-8 h-8 text-white" />
        </div>
      )

    // Elementos interactivos
    case "particle-button":
      return (
        <Button className={`relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <span className="relative z-10 flex items-center gap-2">
            <Icons.SparklesIcon className="w-4 h-4" />
            {props.text || "Particles"}
          </span>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-ping"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </Button>
      )

    case "scale-button":
      return (
        <Button className={`bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transform hover:scale-110 transition-all duration-300 shadow-lg ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.MousePointerIcon className="w-4 h-4 mr-2" />
          {props.text || "Scale Effect"}
        </Button>
      )

    case "number-ticker":
      return (
        <div className={`bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-xl shadow-xl ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="flex items-center justify-between">
            <Icons.ChartIcon className="w-8 h-8 opacity-70" />
            <div className="text-right">
              <div className="text-3xl font-bold animate-pulse">
                {props.number || "1,234"}
              </div>
              <div className="text-sm opacity-80">Contador</div>
            </div>
          </div>
        </div>
      )

    case "wave-button":
      return (
        <Button className={`relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative z-10 flex items-center gap-2">
            <Icons.WavesIcon className="w-4 h-4" />
            {props.text || "Wave"}
          </span>
        </Button>
      )

    case "glitch-button":
      return (
        <Button className={`relative bg-black text-white border-2 border-red-500 ${getEffectClasses()}`} style={getEffectStyles()}>
          <span className="relative">
            {props.text || "Glitch"}
            <span className="absolute inset-0 text-red-500 animate-pulse transform translate-x-0.5">Glitch</span>
            <span className="absolute inset-0 text-cyan-500 animate-pulse transform -translate-x-0.5">Glitch</span>
          </span>
        </Button>
      )

    case "crystal-button":
      return (
        <Button className={`bg-gradient-to-r from-cyan-300 to-blue-400 text-white ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
        }}>
          <Icons.SparklesIcon className="w-4 h-4 mr-2" />
          {props.text || "Crystal"}
        </Button>
      )

    case "plasma-button":
      return (
        <Button className={`bg-gradient-to-r from-pink-500 to-purple-600 text-white ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.ZapIcon className="w-4 h-4 mr-2" />
          {props.text || "Plasma"}
        </Button>
      )

    case "aurora-button":
      return (
        <Button className={`bg-gradient-to-r from-green-400 to-teal-500 text-white ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.SparklesIcon className="w-4 h-4 mr-2" />
          {props.text || "Aurora"}
        </Button>
      )

    case "meteor-button":
      return (
        <Button className={`bg-gradient-to-r from-orange-400 to-red-500 text-white ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.StarIcon className="w-4 h-4 mr-2" />
          {props.text || "Meteor"}
        </Button>
      )

    case "quantum-button":
      return (
        <Button className={`bg-gradient-to-r from-violet-500 to-purple-600 text-white ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.SparklesIcon className="w-4 h-4 mr-2" />
          {props.text || "Quantum"}
        </Button>
      )

    case "flip-card":
      return (
        <div className={`w-64 h-40 perspective-1000 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="relative w-full h-full transform-style-preserve-3d hover:rotate-y-180 transition-transform duration-700">
            <Card className="absolute inset-0 bg-blue-500 text-white backface-hidden">
              <CardContent className="p-6 flex items-center justify-center h-full">
                <span className="font-bold">Frente</span>
              </CardContent>
            </Card>
            <Card className="absolute inset-0 bg-purple-500 text-white backface-hidden rotate-y-180">
              <CardContent className="p-6 flex items-center justify-center h-full">
                <span className="font-bold">Reverso</span>
              </CardContent>
            </Card>
          </div>
        </div>
      )

    case "slide-card":
      return (
        <Card className={`w-64 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl transform hover:translate-x-2 transition-transform duration-300 ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-6">
            <Icons.MoveIcon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-2">Slide Card</h3>
            <p className="text-sm opacity-90">Se desliza al hacer hover</p>
          </CardContent>
        </Card>
      )

    case "rotate-card":
      return (
        <Card className={`w-64 bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-xl transform hover:rotate-6 transition-transform duration-300 ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-6">
            <Icons.LoaderIcon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-2">Rotate Card</h3>
            <p className="text-sm opacity-90">Rota al hacer hover</p>
          </CardContent>
        </Card>
      )

    case "magnetic-card":
      return (
        <Card className={`w-64 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl transform hover:scale-105 hover:rotate-1 transition-all duration-300 cursor-pointer ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-6">
            <Icons.MagnetIcon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-2">Magnetic Card</h3>
            <p className="text-sm opacity-90">Efecto magnético</p>
          </CardContent>
        </Card>
      )

    case "liquid-card":
      return (
        <Card className={`w-64 bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-xl overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000" />
          <CardContent className="p-6 relative z-10">
            <Icons.WavesIcon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-2">Liquid Card</h3>
            <p className="text-sm opacity-90">Efecto líquido</p>
          </CardContent>
        </Card>
      )

    case "neon-card":
      return (
        <Card className={`w-64 bg-black border-2 border-pink-500 text-pink-400 shadow-xl ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)'
        }}>
          <CardContent className="p-6">
            <Icons.ZapIcon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-2">Neon Card</h3>
            <p className="text-sm opacity-90">Efecto neón</p>
          </CardContent>
        </Card>
      )

    case "hologram-card":
      return (
        <Card className={`w-64 bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-xl relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse" />
          <CardContent className="p-6 relative z-10">
            <Icons.SparklesIcon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-2">Hologram Card</h3>
            <p className="text-sm opacity-90">Efecto holograma</p>
          </CardContent>
        </Card>
      )

    case "crystal-card":
      return (
        <Card className={`w-64 bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-xl ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-6">
            <Icons.SparklesIcon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-2">Crystal Card</h3>
            <p className="text-sm opacity-90">Efecto cristal</p>
          </CardContent>
        </Card>
      )

    case "plasma-card":
      return (
        <Card className={`w-64 bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-xl ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-6">
            <Icons.ZapIcon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-2">Plasma Card</h3>
            <p className="text-sm opacity-90">Efecto plasma</p>
          </CardContent>
        </Card>
      )

    case "aurora-card":
      return (
        <Card className={`w-64 bg-gradient-to-r from-purple-400 to-violet-500 text-white shadow-xl ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-6">
            <Icons.SparklesIcon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-2">Aurora Card</h3>
            <p className="text-sm opacity-90">Efecto aurora</p>
          </CardContent>
        </Card>
      )

    default:
      return null
  }
}