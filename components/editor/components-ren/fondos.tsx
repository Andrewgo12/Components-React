"use client"

import * as Icons from "@/components/icons"

interface ComponentProps {
  props: any
  getEffectClasses: () => string
  getEffectStyles: () => any
}

export function renderBackgroundComponents(type: string, { props, getEffectClasses, getEffectStyles }: ComponentProps) {
  const w = props?.width
  const h = props?.height
  switch (type) {
    // Patrones básicos
    case "bg-dots":
      return (
        <div className={`w-96 h-64 rounded-3xl relative overflow-hidden border-2 border-blue-200 shadow-2xl ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #3b82f6 2px, transparent 2px)',
              backgroundSize: '24px 24px',
              backgroundColor: '#f8fafc'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-indigo-500/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 border border-blue-300">
                <Icons.GridIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Patrón de Puntos</h3>
              <p className="text-gray-600 text-sm">Diseño minimalista con puntos uniformes</p>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-blue-200 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm font-medium text-gray-700">Espaciado: 24px</span>
            </div>
          </div>
        </div>
      )

    case "bg-grid":
      return (
        <div
          className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`}
          style={{
            ...getEffectStyles(),
            backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            backgroundColor: '#f8fafc',
            width: w ? `${w}px` : undefined,
            height: h ? `${h}px` : undefined,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-600 bg-white/80 px-2 py-1 rounded">
            Grid Pattern
          </div>
        </div>
      )

    case "bg-lines":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          backgroundImage: 'repeating-linear-gradient(45deg, #e74c3c, #e74c3c 2px, transparent 2px, transparent 10px)',
          backgroundColor: '#ecf0f1',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-800 bg-white/80 px-2 py-1 rounded">
            Lines
          </div>
        </div>
      )

    case "bg-polka":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          backgroundImage: 'radial-gradient(circle, #ec4899 3px, transparent 3px)',
          backgroundSize: '25px 25px',
          backgroundColor: '#fdf2f8',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-800 bg-white/80 px-2 py-1 rounded">
            Polka Dots
          </div>
        </div>
      )

    case "bg-mesh":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          backgroundImage: 'linear-gradient(45deg, #ff6b6b 25%, transparent 25%), linear-gradient(-45deg, #4ecdc4 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #45b7d1 75%), linear-gradient(-45deg, transparent 75%, #96ceb4 75%)',
          backgroundSize: '20px 20px',
          backgroundColor: '#f8f9fa',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-800 bg-white/80 px-2 py-1 rounded">
            Mesh Pattern
          </div>
        </div>
      )

    // Efectos naturales
    case "bg-aurora":
      return (
        <div className={`w-96 h-64 rounded-3xl relative overflow-hidden border-2 border-purple-400/30 shadow-2xl ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          backgroundColor: '#0f0b2f',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 opacity-80" style={{
            animation: 'aurora-wave 4s ease-in-out infinite alternate'
          }} />
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 via-transparent to-purple-600/30" style={{
            animation: 'aurora-shift 6s ease-in-out infinite alternate-reverse'
          }} />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 border border-purple-400/50" style={{
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)'
              }}>
                <Icons.SparklesIcon className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Aurora Boreal</h3>
              <p className="text-purple-200 text-sm">Luces del norte mágicas</p>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-purple-900/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-purple-400/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-purple-200">Intensidad: Máxima</span>
            </div>
          </div>
        </div>
      )

    case "bg-waves":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600">
            <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-blue-800 to-transparent animate-pulse" />
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Waves
          </div>
        </div>
      )

    // Efectos espaciales y cósmicos
    case "bg-stars":
      return (
        <div className={`w-96 h-64 rounded-3xl relative overflow-hidden border-2 border-indigo-400/30 bg-gradient-to-b from-indigo-900 via-purple-900 to-black shadow-2xl ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => {
              const size = Math.random() * 3 + 1
              const brightness = Math.random() * 0.8 + 0.2
              return (
                <div
                  key={i}
                  className="absolute rounded-full animate-pulse"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${Math.random() * 95}%`,
                    top: `${Math.random() * 95}%`,
                    backgroundColor: ['#fbbf24', '#f59e0b', '#ffffff', '#e5e7eb'][Math.floor(Math.random() * 4)],
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                    opacity: brightness,
                    boxShadow: `0 0 ${size * 2}px currentColor`
                  }}
                />
              )
            })}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/20 to-purple-900/30" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 border border-yellow-400/50" style={{
                boxShadow: '0 0 30px rgba(251, 191, 36, 0.4)'
              }}>
                <Icons.StarIcon className="w-8 h-8 text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Campo Estelar</h3>
              <p className="text-yellow-200 text-sm">50 estrellas brillantes</p>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-indigo-900/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-indigo-400/50">
            <div className="flex items-center gap-2">
              <Icons.StarIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-indigo-200">Constelación activa</span>
            </div>
          </div>
        </div>
      )

    case "bg-nebula":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-black ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-pink-600/40 to-blue-600/40 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/30 via-transparent to-purple-500/30" />
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/60 rounded-full blur-sm animate-pulse"
                style={{
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 80}%`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-pink-200 bg-black/50 px-2 py-1 rounded">
            Nebula
          </div>
        </div>
      )

    case "bg-galaxy":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-gradient-to-br from-indigo-900 to-black ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
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
          <div className="absolute bottom-2 left-2 text-xs font-medium text-yellow-200 bg-black/50 px-2 py-1 rounded">
            Galaxy
          </div>
        </div>
      )

    // Efectos tecnológicos
    case "bg-matrix":
      return (
        <div className={`w-96 h-64 rounded-3xl relative overflow-hidden border-2 border-green-500/30 bg-black shadow-2xl ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          boxShadow: '0 0 40px rgba(34, 197, 94, 0.3)',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0 font-mono text-green-400 text-sm overflow-hidden leading-tight">
            {[...Array(20)].map((_, col) => (
              <div key={col} className="absolute animate-pulse" style={{
                left: `${col * 5}%`,
                top: 0,
                animationDelay: `${col * 0.1}s`,
                animationDuration: '1.5s'
              }}>
                {[...Array(25)].map((_, row) => (
                  <div key={row} className="mb-0.5" style={{
                    color: Math.random() > 0.8 ? '#22c55e' : Math.random() > 0.6 ? '#16a34a' : '#15803d',
                    textShadow: '0 0 5px currentColor',
                    opacity: Math.max(0.3, 1 - (row * 0.03))
                  }}>
                    {String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 border border-green-500/50" style={{
                boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)'
              }}>
                <Icons.CodeIcon className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-2" style={{
                textShadow: '0 0 15px #22c55e'
              }}>Matrix Digital</h3>
              <p className="text-green-300 text-sm">Código en cascada infinita</p>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-green-900/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-green-500/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-200">Flujo: 1.21 GB/s</span>
            </div>
          </div>
        </div>
      )

    case "bg-circuit":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-gray-900 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div key={i}>
                <div
                  className="absolute w-px h-8 bg-green-400/60"
                  style={{
                    left: `${(i % 5) * 20 + 10}%`,
                    top: `${Math.floor(i / 5) * 25}%`
                  }}
                />
                <div
                  className="absolute w-8 h-px bg-green-400/60"
                  style={{
                    left: `${(i % 5) * 20 + 6}%`,
                    top: `${Math.floor(i / 5) * 25 + 10}%`
                  }}
                />
                <div
                  className="absolute w-2 h-2 bg-green-400 rounded-full"
                  style={{
                    left: `${(i % 5) * 20 + 9}%`,
                    top: `${Math.floor(i / 5) * 25 + 9}%`
                  }}
                />
              </div>
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-green-400 bg-black/80 px-2 py-1 rounded">
            Circuit
          </div>
        </div>
      )

    case "bg-glitch":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-black ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-red-500 opacity-60 animate-pulse"
                style={{
                  width: `${Math.random() * 100}%`,
                  height: '2px',
                  left: 0,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-cyan-400 opacity-40 animate-pulse"
                style={{
                  width: `${Math.random() * 80}%`,
                  height: '1px',
                  left: `${Math.random() * 20}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-cyan-400 bg-black/80 px-2 py-1 rounded">
            Glitch
          </div>
        </div>
      )

    // Efectos de partículas
    case "bg-particles":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-black ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Particles
          </div>
        </div>
      )

    case "bg-rain":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-gradient-to-b from-gray-600 to-gray-800 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute w-px bg-blue-300 animate-pulse"
                style={{
                  height: `${10 + Math.random() * 20}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: 0.6 + Math.random() * 0.4
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Rain
          </div>
        </div>
      )

    // Efectos geométricos
    case "bg-hexagon":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-yellow-400 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-8 h-8 bg-orange-500/40 transform rotate-45"
                style={{
                  left: `${(i % 4) * 25 + 10}%`,
                  top: `${Math.floor(i / 4) * 25 + 10}%`,
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-800 bg-white/80 px-2 py-1 rounded">
            Hexagon
          </div>
        </div>
      )

    case "bg-circles":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-indigo-900 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border-2 border-purple-400/30"
                style={{
                  width: `${20 + i * 10}px`,
                  height: `${20 + i * 10}px`,
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 80}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Circles
          </div>
        </div>
      )

    // Efectos de gradientes y colores
    case "bg-gradient":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Gradient
          </div>
        </div>
      )

    case "bg-plasma":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          background: 'radial-gradient(circle at 20% 50%, #ff006e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8338ec 0%, transparent 50%), radial-gradient(circle at 40% 80%, #3a86ff 0%, transparent 50%)',
          backgroundColor: '#000',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-pink-500/20 to-transparent animate-pulse" />
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Plasma
          </div>
        </div>
      )

    case "bg-rainbow":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          background: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
          backgroundSize: '400% 400%',
          animation: 'rainbow 3s ease-in-out infinite',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Rainbow
          </div>
        </div>
      )

    // 25 fondos total
    case "bg-ripple":
      return (
        <div className={`w-80 h-56 rounded-xl relative overflow-hidden border-2 border-cyan-200 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute border-3 border-white/40 rounded-full animate-ping"
                style={{
                  width: `${(i + 1) * 60}px`,
                  height: `${(i + 1) * 60}px`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${i * 0.6}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
            <div className="font-bold text-cyan-800">Efecto Ripple</div>
            <div className="text-xs text-cyan-600">Ondas expansivas</div>
          </div>
        </div>
      )

    case "bg-matrix-rain":
      return (
        <div className={`w-80 h-56 rounded-xl relative overflow-hidden bg-black border-2 border-green-500 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0">
            {[...Array(12)].map((_, col) => (
              <div key={col} className="absolute font-mono text-green-400 text-sm animate-pulse" style={{
                left: `${col * 8}%`,
                top: 0,
                animationDelay: `${col * 0.2}s`
              }}>
                {[...Array(20)].map((_, row) => (
                  <div key={row} className="opacity-70" style={{
                    marginBottom: '2px',
                    opacity: Math.max(0.1, 1 - (row * 0.05))
                  }}>
                    {Math.random() > 0.5 ? '1' : '0'}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-4 bg-green-900/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-green-500">
            <div className="font-bold text-green-400">Matrix Rain</div>
            <div className="text-xs text-green-300">Código digital</div>
          </div>
        </div>
      )

    case "bg-cosmic-dust":
      return (
        <div className={`w-80 h-56 rounded-xl relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-black border-2 border-purple-400 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: Math.random() * 0.8 + 0.2
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 animate-pulse" />
          </div>
          <div className="absolute bottom-4 left-4 bg-purple-900/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-purple-400">
            <div className="font-bold text-purple-200">Polvo Cósmico</div>
            <div className="text-xs text-purple-300">Galaxia infinita</div>
          </div>
        </div>
      )

    case "bg-chevron":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          backgroundImage: 'repeating-linear-gradient(45deg, #8b5cf6, #8b5cf6 10px, #a855f7 10px, #a855f7 20px)',
          backgroundColor: '#f3e8ff',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-purple-600/80 px-2 py-1 rounded">
            Chevron
          </div>
        </div>
      )

    case "bg-zigzag":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          backgroundImage: 'linear-gradient(135deg, #84cc16 25%, transparent 25%), linear-gradient(225deg, #84cc16 25%, transparent 25%), linear-gradient(45deg, #84cc16 25%, transparent 25%), linear-gradient(315deg, #84cc16 25%, #a3e635 25%)',
          backgroundSize: '20px 20px',
          backgroundColor: '#ecfccb',
          width: w ? `${w}px` : undefined,
          height: h ? `${h}px` : undefined,
        }}>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-800 bg-white/80 px-2 py-1 rounded">
            Zigzag
          </div>
        </div>
      )

    default:
      return null
  }
}