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
  const w = props?.width
  const h = props?.height
  switch (type) {
    // Botones animados
    case "glow-button":
      return (
        <div className={`relative w-80 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-6 shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Botón Glow Premium</h3>
              <p className="text-gray-600 text-sm">Efecto de resplandor avanzado con animaciones</p>
            </div>
            <div className="flex justify-center">
              <Button
                className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 hover:from-cyan-600 hover:via-blue-700 hover:to-indigo-800 text-white font-bold px-10 py-4 rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-110 group"
                style={{
                  boxShadow: '0 0 40px rgba(6, 182, 212, 0.6), 0 0 80px rgba(59, 130, 246, 0.4), 0 0 120px rgba(99, 102, 241, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.3)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Icons.SparklesIcon className="w-6 h-6 inline mr-3 relative z-10" />
                <span className="relative z-10 text-lg">{props.text || "Activar Glow"}</span>
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              <span>Intensidad máxima</span>
            </div>
          </div>
        </div>
      )

    case "shimmer-button":
      return (
        <div className={`relative ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <Button className="relative overflow-hidden bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-semibold px-6 py-3 rounded-lg border border-slate-600 transition-all duration-300">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" style={{
              animation: 'shimmer 2s ease-in-out infinite'
            }} />
            <Icons.ZapIcon className="w-4 h-4 inline mr-2 relative z-10" />
            <span className="relative z-10">{props.text || "Shimmer Effect"}</span>
          </Button>
          <style jsx>{`
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}</style>
        </div>
      )

    case "ripple-button":
      return (
        <div className={`relative ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <Button className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium px-6 py-3 rounded-full shadow-lg transition-all duration-300 group">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border-2 border-white/40 rounded-full animate-ping"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
            <Icons.WavesIcon className="w-4 h-4 inline mr-2 relative z-10" />
            <span className="relative z-10">{props.text || "Ripple Waves"}</span>
          </Button>
        </div>
      )

    case "magnetic-button":
      return (
        <Button className={`relative bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <Icons.MagnetIcon className="w-4 h-4 mr-2" />
          {props.text || "Magnetic"}
        </Button>
      )

    case "loading-button":
      return (
        <Button className={`bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <Icons.LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
          {props.text || "Loading..."}
        </Button>
      )

    // Cards animadas
    case "glass-card":
      return (
        <div className={`relative w-96 h-64 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-red-500 to-orange-600 rounded-3xl opacity-70 animate-pulse" />
          <Card
            className="relative backdrop-blur-2xl bg-white/15 border-2 border-white/30 shadow-2xl rounded-3xl h-full overflow-hidden"
            style={{
              backdropFilter: 'blur(20px)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.05))'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
            <CardContent className="p-8 h-full flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-xl">
                  <Icons.CircleIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-2xl mb-1">{props.title || "Glass Morphism Pro"}</h3>
                  <p className="text-white/80 text-sm">{props.description || "Efecto de cristal avanzado con blur"}</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Icons.SparklesIcon className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Características Premium</span>
                </div>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Blur dinámico 20px</li>
                  <li>• Transparencia adaptativa</li>
                  <li>• Bordes luminosos</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )

    case "fade-card":
      return (
        <Card className={`w-56 bg-gradient-to-br from-gray-600 to-slate-700 text-white border-0 shadow-xl hover:opacity-50 transition-opacity duration-500 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
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
          style={{
            ...getEffectStyles(),
            width: w ? `${w}px` : undefined,
            height: h ? `${h}px` : undefined,
          }}
        >
          {props.text || "Texto Gradiente"}
        </h2>
      )

    case "typewriter-text":
      return (
        <div className={`bg-black text-green-400 p-4 rounded-lg font-mono border-2 border-green-500/30 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
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
        <div className={`p-6 bg-black rounded-lg ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 filter drop-shadow-lg">
            {props.text || "Glow Text"}
          </h2>
          <div className="mt-2 text-pink-400 text-sm opacity-70">Texto con brillo</div>
        </div>
      )

    // Badges y elementos pequeños
    case "neon-badge":
      return (
        <Badge
          className={`bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 shadow-lg ${getEffectClasses()}`}
          style={{
            ...getEffectStyles(),
            boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)',
            width: w ? `${w}px` : undefined,
            height: h ? `${h}px` : undefined,
          }}
        >
          <Icons.ZapIcon className="w-3 h-3 mr-1" />
          {props.text || "Neon Badge"}
        </Badge>
      )

    case "count-badge":
      return (
        <Badge className={`bg-gradient-to-r from-orange-500 to-red-500 text-white animate-bounce ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <Icons.StarIcon className="w-3 h-3 mr-1" />
          {props.count || "99+"}
        </Badge>
      )

    // Iconos animados
    case "rotate-icon":
      return (
        <div className={`w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <Icons.LoaderIcon className="w-8 h-8 text-white animate-spin" />
        </div>
      )

    case "icon-glow":
      return (
        <div className={`w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <Icons.StarIcon className="w-8 h-8 text-white" />
        </div>
      )

    // Elementos interactivos
    case "particle-button":
      return (
        <Button className={`relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl overflow-hidden ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
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

    // 25 componentes Magic UI total
    case "flip-card":
      return (
        <div className={`w-96 h-56 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          perspective: '1200px',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="relative w-full h-full transition-transform duration-1000 cursor-pointer hover:rotate-y-180 group" style={{
            transformStyle: 'preserve-3d'
          }}>
            {/* Cara frontal */}
            <Card className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700 text-white rounded-3xl shadow-2xl overflow-hidden" style={{
              backfaceVisibility: 'hidden'
            }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20" />
              <CardContent className="p-8 h-full flex flex-col justify-center items-center relative z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 shadow-2xl border border-white/30">
                  <Icons.CreditCardIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-2xl mb-2">Tarjeta Premium Elite</h3>
                <p className="text-white/80 text-sm text-center mb-4">Acceso exclusivo a funciones avanzadas</p>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                  <span className="text-xs font-medium">Hover para revelar detalles</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Cara trasera */}
            <Card className="absolute inset-0 bg-gradient-to-br from-pink-600 via-red-600 to-orange-600 text-white rounded-3xl shadow-2xl overflow-hidden" style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20" />
              <CardContent className="p-8 h-full flex flex-col justify-center relative z-10">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-4">$99<span className="text-lg">/mes</span></div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <Icons.CheckIcon className="w-5 h-5 text-green-300" />
                      <span className="text-sm">Acceso completo a la plataforma</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icons.CheckIcon className="w-5 h-5 text-green-300" />
                      <span className="text-sm">Soporte prioritario 24/7</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icons.CheckIcon className="w-5 h-5 text-green-300" />
                      <span className="text-sm">Recursos ilimitados</span>
                    </div>
                  </div>
                  <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl px-6 py-2 backdrop-blur-sm">
                    Suscribirse ahora
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )

    case "hologram-card":
      return (
        <Card className={`w-72 bg-black border border-cyan-500 shadow-2xl relative overflow-hidden ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" style={{
            animation: 'scan 3s ease-in-out infinite'
          }} />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 border-2 border-cyan-400 rounded-full flex items-center justify-center">
                <Icons.SparklesIcon className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-cyan-400">HOLOGRAMA</h3>
                <p className="text-cyan-300 text-sm">Proyección 3D</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-2 bg-cyan-500/30 rounded animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
              ))}
            </div>
          </CardContent>
        </Card>
      )

    case "number-ticker":
      return (
        <div className={`bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-xl shadow-xl ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
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

    case "pulse-badge":
      return (
        <Badge className={`bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 px-4 py-2 animate-pulse shadow-lg ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            <span>{props.text || "LIVE"}</span>
          </div>
        </Badge>
      )

    case "floating-icon":
      return (
        <div className={`w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <Icons.HeartIcon className="w-8 h-8 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
        </div>
      )

    case "wave-text":
      return (
        <div className={`w-64 bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-4 rounded-lg overflow-hidden ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="transform hover:translate-x-2 transition-transform duration-300">
            <Icons.WavesIcon className="w-5 h-5 mb-2" />
            <p className="font-semibold">{props.text || "Texto ondulante"}</p>
            <p className="text-sm opacity-80">Hover para deslizar →</p>
          </div>
        </div>
      )

    case "crystal-button":
      return (
        <Button className={`bg-gradient-to-r from-cyan-300 to-blue-400 text-white ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <Icons.SparklesIcon className="w-4 h-4 mr-2" />
          {props.text || "Crystal"}
        </Button>
      )

    case "morphing-card":
      return (
        <Card className={`w-48 h-32 bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:w-64 hover:h-40 transition-all duration-500 overflow-hidden ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <CardContent className="p-4 h-full flex flex-col justify-center">
            <Icons.ExpandIcon className="w-6 h-6 mb-2" />
            <h3 className="font-semibold text-sm">Morph Card</h3>
            <p className="text-xs opacity-90">Se expande al hover</p>
          </CardContent>
        </Card>
      )

    case "neon-text":
      return (
        <div className={`p-6 bg-black rounded-lg ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <h2 className="text-4xl font-bold text-pink-500 mb-2" style={{
            textShadow: '0 0 10px rgba(236, 72, 153, 0.8), 0 0 20px rgba(236, 72, 153, 0.6)'
          }}>
            {props.text || "NEON"}
          </h2>
          <div className="text-pink-400 text-sm">Texto neón brillante</div>
        </div>
      )

    case "floating-button":
      return (
        <div className={`relative ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-2xl animate-bounce">
            <Icons.MousePointerIcon className="w-4 h-4 mr-2" />
            {props.text || "Floating"}
          </Button>
          {props.hasNotification && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          )}
        </div>
      )

    default:
      return null
  }
}