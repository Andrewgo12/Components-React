"use client"

import * as Icons from "@/components/icons"

interface ComponentProps {
  props: any
  getEffectClasses: () => string
  getEffectStyles: () => any
}

export function renderEffectComponents(type: string, { props: _props, getEffectClasses, getEffectStyles }: ComponentProps) {
  const w = _props?.width
  const h = _props?.height
  switch (type) {
    // Efectos básicos de luz y brillo
    case "effect-glow":
      return (
        <div className={`w-80 h-48 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl relative overflow-hidden ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          boxShadow: '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(139, 92, 246, 0.6), 0 0 120px rgba(99, 102, 241, 0.4)',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <Icons.ZapIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Efecto Glow</h3>
              <p className="text-blue-100 text-sm">Resplandor luminoso avanzado</p>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-xl">
            <span className="text-white text-xs font-medium">Intensidad: Alta</span>
          </div>
        </div>
      )

    case "effect-shimmer":
      return (
        <div className={`w-80 h-48 bg-gradient-to-br from-slate-800 via-gray-700 to-zinc-800 rounded-3xl relative overflow-hidden ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" style={{
            animation: 'shimmer 2s ease-in-out infinite'
          }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-silver-400 to-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <Icons.SparklesIcon className="w-8 h-8 text-gray-800" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Efecto Shimmer</h3>
              <p className="text-gray-300 text-sm">Brillo metálico deslizante</p>
            </div>
          </div>
          <div className="absolute top-4 right-4 w-3 h-3 bg-silver-400 rounded-full animate-pulse" />
        </div>
      )

    case "effect-neon":
      return (
        <div className={`w-80 h-48 bg-black rounded-3xl relative overflow-hidden ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          boxShadow: '0 0 30px #ff00ff, 0 0 60px #ff00ff, 0 0 90px #ff00ff, inset 0 0 20px rgba(255, 0, 255, 0.1)',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0 border-2 border-pink-500 rounded-3xl" style={{
            boxShadow: 'inset 0 0 20px #ff00ff'
          }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500/20 border-2 border-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{
                boxShadow: '0 0 20px #ff00ff'
              }}>
                <Icons.ZapIcon className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{
                color: '#ff00ff',
                textShadow: '0 0 15px #ff00ff, 0 0 30px #ff00ff, 0 0 45px #ff00ff'
              }}>Neón Cyberpunk</h3>
              <p className="text-pink-300 text-sm" style={{
                textShadow: '0 0 10px #ff00ff'
              }}>Resplandor futurista</p>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-pink-500/20 backdrop-blur-sm px-3 py-2 rounded-xl border border-pink-500/50">
            <span className="text-pink-300 text-xs font-medium">Voltaje: 220V</span>
          </div>
        </div>
      )

    // Efectos de movimiento
    case "effect-ripple":
      return (
        <div className={`w-80 h-48 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 rounded-3xl relative overflow-hidden ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute border-4 border-white/40 rounded-full animate-ping"
                style={{
                  width: `${(i + 1) * 60}px`,
                  height: `${(i + 1) * 60}px`,
                  animationDelay: `${i * 0.6}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <Icons.WavesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Efecto Ripple</h3>
              <p className="text-teal-100 text-sm">Ondas expansivas</p>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-teal-500/30 backdrop-blur-sm px-3 py-2 rounded-xl">
            <span className="text-white text-xs font-medium">Frecuencia: 2Hz</span>
          </div>
        </div>
      )

    // Efectos de vidrio y transparencia
    case "effect-glass":
      return (
        <div className={`w-80 h-48 relative rounded-3xl overflow-hidden ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600" />
          <div className="absolute inset-0 backdrop-blur-xl bg-white/15 border-2 border-white/30 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                  <Icons.CircleIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Glass Morphism</h3>
                <p className="text-white/80 text-sm">Efecto cristal translúcido</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/20">
            <span className="text-white text-xs font-medium">Opacidad: 15%</span>
          </div>
        </div>
      )

    case "effect-crystal":
      return (
        <div className={`w-48 h-32 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/20 transform rotate-45"
                style={{
                  width: `${10 + Math.random() * 20}px`,
                  height: '2px',
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 80}%`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-purple-200 font-bold text-lg">
            CRYSTAL
          </div>
        </div>
      )

    // Efectos de partículas
    case "effect-particle":
      return (
        <div className={`w-80 h-48 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl relative overflow-hidden ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-ping"
                style={{
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                  backgroundColor: ['#ffffff', '#a855f7', '#8b5cf6', '#7c3aed'][Math.floor(Math.random() * 4)],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                  boxShadow: '0 0 6px currentColor'
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <Icons.SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Sistema de Partículas</h3>
              <p className="text-purple-200 text-sm">25 partículas activas</p>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 bg-purple-500/30 backdrop-blur-sm px-3 py-2 rounded-xl">
            <span className="text-white text-xs font-medium">FPS: 60</span>
          </div>
        </div>
      )

    case "effect-stardust":
      return (
        <div className={`w-48 h-32 bg-gradient-to-br from-indigo-900 to-black rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-yellow-200 rounded-full animate-pulse"
                style={{
                  width: `${0.5 + Math.random() * 1.5}px`,
                  height: `${0.5 + Math.random() * 1.5}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  boxShadow: '0 0 2px #fef08a'
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-yellow-200 font-bold text-lg">
            STARDUST
          </div>
        </div>
      )

    // Efectos tecnológicos
    case "effect-matrix":
      return (
        <div className={`w-80 h-48 bg-black rounded-3xl relative overflow-hidden border-2 border-green-500/30 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)'
        }}>
          <div className="absolute inset-0 font-mono text-green-400 text-xs leading-tight">
            {[...Array(15)].map((_, col) => (
              <div key={col} className="absolute animate-pulse" style={{
                left: `${col * 6.67}%`,
                animationDelay: `${col * 0.1}s`,
                animationDuration: '1.5s'
              }}>
                {[...Array(20)].map((_, row) => (
                  <div key={row} className="mb-0.5" style={{
                    color: Math.random() > 0.7 ? '#22c55e' : '#16a34a',
                    textShadow: '0 0 5px currentColor'
                  }}>
                    {String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-green-500/20 border-2 border-green-500 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{
                boxShadow: '0 0 20px #22c55e'
              }}>
                <Icons.CodeIcon className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-2" style={{
                textShadow: '0 0 15px #22c55e'
              }}>Matrix Code</h3>
              <p className="text-green-300 text-sm">Flujo de datos digital</p>
            </div>
          </div>
        </div>
      )

    case "effect-glitch":
      return (
        <div className={`w-48 h-32 bg-black rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg relative">
              GLITCH
              <span className="absolute inset-0 text-red-500 animate-pulse transform translate-x-0.5">GLITCH</span>
              <span className="absolute inset-0 text-cyan-500 animate-pulse transform -translate-x-0.5">GLITCH</span>
            </span>
          </div>
        </div>
      )

    // Efectos de energía
    case "effect-lightning":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-yellow-400 to-purple-600 rounded-lg relative overflow-hidden flex items-center justify-center ${getEffectClasses()}`} style={getEffectStyles()}>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${25 + i * 20}%`,
                top: `${30 + (i % 2) * 30}%`,
                animationDelay: `${i * 0.3}s`
              }}
            >
              <Icons.ZapIcon className="w-4 h-4 text-white" />
            </div>
          ))}
          <span className="text-white font-bold text-lg relative z-10">Lightning</span>
        </div>
      )

    // Efectos de transformación
    case "effect-3d":
      return (
        <div className={`w-80 h-48 relative ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          perspective: '1000px',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-3xl transform hover:rotateY-12 hover:rotateX-6 transition-all duration-500 shadow-2xl" style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 40px rgba(168, 85, 247, 0.4)'
          }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 rounded-3xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center transform translate-z-12">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                  <Icons.ExpandIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Efecto 3D</h3>
                <p className="text-pink-100 text-sm">Transformación tridimensional</p>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-xl">
              <span className="text-white text-xs font-medium">Profundidad: 12px</span>
            </div>
          </div>
        </div>
      )

    case "effect-morph":
      return (
        <div className={`w-48 h-32 rounded-lg flex items-center justify-center transition-all duration-1000 hover:rounded-full ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <span className="text-white font-bold text-lg">Morph Shape</span>
        </div>
      )

    // Efectos de ondas y fluidos
    case "effect-wave":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg relative overflow-hidden flex items-center justify-center ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-blue-700 to-transparent animate-pulse" />
          <Icons.WavesIcon className="w-6 h-6 text-white mr-2" />
          <span className="text-white font-bold text-lg">Wave Motion</span>
        </div>
      )

    // Efectos de distorsión
    case "effect-distortion":
      return (
        <div className={`w-48 h-32 relative rounded-lg overflow-hidden ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent transform skew-x-12" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg transform -skew-x-6">Distortion</span>
          </div>
        </div>
      )

    // Efectos de fuego y elementos
    case "effect-fire":
      return (
        <div className={`w-48 h-32 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-orange-300/60 rounded-full animate-pulse"
                style={{
                  width: `${8 + Math.random() * 16}px`,
                  height: `${8 + Math.random() * 16}px`,
                  left: `${Math.random() * 80}%`,
                  bottom: `${Math.random() * 40}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
            FIRE
          </div>
        </div>
      )

    // Efectos magnéticos y físicos
    case "effect-magnetic":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center transform hover:scale-110 hover:rotate-2 transition-all duration-300 cursor-pointer ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <Icons.MagnetIcon className="w-6 h-6 text-white mr-2" />
          <span className="text-white font-bold text-lg">Magnetic</span>
        </div>
      )

    // 25 efectos total

    case "effect-lightning-storm":
      return (
        <div className={`w-48 h-32 bg-gradient-to-b from-gray-800 to-black rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <div
                  className="absolute animate-pulse"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: '10%',
                    width: '2px',
                    height: '70%',
                    background: 'linear-gradient(to bottom, #fbbf24, #3b82f6, transparent)',
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: '0.1s',
                    boxShadow: '0 0 10px #fbbf24'
                  }}
                />
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-4 bg-yellow-900/80 backdrop-blur-sm px-3 py-2 rounded-lg">
            <div className="font-bold text-yellow-200">Tormenta Eléctrica</div>
            <div className="text-xs text-yellow-300">Rayos y truenos</div>
          </div>
        </div>
      )

    case "effect-plasma-orb":
      return (
        <div className={`w-80 h-56 bg-black rounded-xl relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full" style={{
                background: 'radial-gradient(circle at 30% 30%, #ff006e 0%, #8338ec 50%, #3a86ff 100%)',
                animation: 'plasma-pulse 2s ease-in-out infinite alternate'
              }} />
              <div className="absolute inset-0 rounded-full" style={{
                background: 'radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                animation: 'plasma-rotate 4s linear infinite'
              }} />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-pink-900/80 backdrop-blur-sm px-3 py-2 rounded-lg">
            <div className="font-bold text-pink-200">Orbe de Plasma</div>
            <div className="text-xs text-pink-300">Energía pura</div>
          </div>
        </div>
      )

    case "effect-pulse":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg relative overflow-hidden flex items-center justify-center ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 bg-red-400 animate-pulse opacity-50" />
          <span className="text-white font-bold text-lg relative z-10">Pulse Effect</span>
        </div>
      )

    case "effect-bounce":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center animate-bounce ${getEffectClasses()}`} style={getEffectStyles()}>
          <span className="text-white font-bold text-lg">Bounce Effect</span>
        </div>
      )

    case "effect-rotate":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center animate-spin ${getEffectClasses()}`} style={getEffectStyles()}>
          <span className="text-white font-bold text-lg">Rotate Effect</span>
        </div>
      )

    case "effect-scale":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform ${getEffectClasses()}`} style={getEffectStyles()}>
          <span className="text-white font-bold text-lg">Scale Effect</span>
        </div>
      )

    case "effect-slide":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center hover:translate-x-2 transition-transform ${getEffectClasses()}`} style={getEffectStyles()}>
          <span className="text-white font-bold text-lg">Slide Effect</span>
        </div>
      )

    case "effect-fade":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-gray-500 to-zinc-500 rounded-lg flex items-center justify-center hover:opacity-50 transition-opacity ${getEffectClasses()}`} style={getEffectStyles()}>
          <span className="text-white font-bold text-lg">Fade Effect</span>
        </div>
      )

    default:
      return null
  }
}