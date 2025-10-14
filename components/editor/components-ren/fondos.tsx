"use client"

import * as Icons from "@/components/icons"

interface ComponentProps {
  props: any
  getEffectClasses: () => string
  getEffectStyles: () => any
}

export function renderBackgroundComponents(type: string, { props, getEffectClasses, getEffectStyles }: ComponentProps) {
  switch (type) {
    // Patrones básicos
    case "bg-dots":
      return (
        <div
          className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`}
          style={{
            ...getEffectStyles(),
            backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            backgroundColor: '#f8fafc'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-600 bg-white/80 px-2 py-1 rounded">
            Dots Pattern
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
            backgroundColor: '#f8fafc'
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
          backgroundColor: '#ecf0f1'
        }}>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-800 bg-white/80 px-2 py-1 rounded">
            Lines
          </div>
        </div>
      )

    case "bg-chevron":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          backgroundImage: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #fbbf24 10px, #fbbf24 20px)',
          backgroundColor: '#fef3c7'
        }}>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-800 bg-white/80 px-2 py-1 rounded">
            Chevron
          </div>
        </div>
      )

    case "bg-zigzag":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          backgroundImage: 'linear-gradient(135deg, #667eea 25%, transparent 25%), linear-gradient(225deg, #667eea 25%, transparent 25%), linear-gradient(45deg, #764ba2 25%, transparent 25%), linear-gradient(315deg, #764ba2 25%, transparent 25%)',
          backgroundSize: '20px 20px',
          backgroundColor: '#f8fafc'
        }}>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-800 bg-white/80 px-2 py-1 rounded">
            Zigzag
          </div>
        </div>
      )

    case "bg-cross":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          backgroundImage: 'radial-gradient(circle, #3b82f6 2px, transparent 2px), radial-gradient(circle, #8b5cf6 1px, transparent 1px)',
          backgroundSize: '30px 30px, 15px 15px',
          backgroundColor: '#f1f5f9'
        }}>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-800 bg-white/80 px-2 py-1 rounded">
            Cross
          </div>
        </div>
      )

    case "bg-polka":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          backgroundImage: 'radial-gradient(circle, #ec4899 3px, transparent 3px)',
          backgroundSize: '25px 25px',
          backgroundColor: '#fdf2f8'
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
          backgroundColor: '#f8f9fa'
        }}>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-800 bg-white/80 px-2 py-1 rounded">
            Mesh Pattern
          </div>
        </div>
      )

    // Efectos naturales
    case "bg-aurora":
      return (
        <div
          className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`}
          style={{
            ...getEffectStyles(),
            backgroundColor: '#1e1b4b'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-70 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Aurora Effect
          </div>
        </div>
      )

    case "bg-waves":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600">
            <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-blue-800 to-transparent animate-pulse" />
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Waves
          </div>
        </div>
      )

    case "bg-watercolor":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          background: 'radial-gradient(ellipse at top left, rgba(255, 107, 107, 0.3), transparent 50%), radial-gradient(ellipse at top right, rgba(78, 205, 196, 0.3), transparent 50%), radial-gradient(ellipse at bottom, rgba(69, 183, 209, 0.3), transparent 50%)'
        }}>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-800 bg-white/80 px-2 py-1 rounded">
            Watercolor
          </div>
        </div>
      )

    case "bg-marble":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          background: 'linear-gradient(45deg, #f8f9fa 25%, transparent 25%), linear-gradient(-45deg, #e9ecef 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #dee2e6 75%), linear-gradient(-45deg, transparent 75%, #ced4da 75%)',
          backgroundSize: '20px 20px'
        }}>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-300/50" />
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-800 bg-white/80 px-2 py-1 rounded">
            Marble
          </div>
        </div>
      )

    // Efectos espaciales y cósmicos
    case "bg-stars":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-gradient-to-b from-purple-900 to-black ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <Icons.StarIcon
                key={i}
                className="absolute w-3 h-3 text-yellow-300 animate-pulse"
                style={{
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Stars
          </div>
        </div>
      )

    case "bg-cosmic":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-gradient-to-br from-purple-900 via-blue-900 to-black ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  width: `${Math.random() * 3}px`,
                  height: `${Math.random() * 3}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Cosmic
          </div>
        </div>
      )

    case "bg-nebula":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-black ${getEffectClasses()}`} style={getEffectStyles()}>
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
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-gradient-to-br from-indigo-900 to-black ${getEffectClasses()}`} style={getEffectStyles()}>
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
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-black ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 font-mono text-green-400 text-xs overflow-hidden">
            {[...Array(8)].map((_, col) => (
              <div key={col} className="absolute animate-pulse" style={{ left: `${col * 12.5}%`, top: 0 }}>
                {[...Array(15)].map((_, row) => (
                  <div key={row} className="opacity-70" style={{ marginBottom: '2px' }}>
                    {Math.random() > 0.5 ? '1' : '0'}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-green-400 bg-black/80 px-2 py-1 rounded">
            Matrix
          </div>
        </div>
      )

    case "bg-circuit":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-gray-900 ${getEffectClasses()}`} style={getEffectStyles()}>
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

    case "bg-binary":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-black ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 font-mono text-green-400 text-xs overflow-hidden">
            {[...Array(12)].map((_, row) => (
              <div key={row} className="flex" style={{ marginBottom: '4px' }}>
                {[...Array(32)].map((_, col) => (
                  <span key={col} className="opacity-70">
                    {Math.random() > 0.5 ? '1' : '0'}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-green-400 bg-black/80 px-2 py-1 rounded">
            Binary
          </div>
        </div>
      )

    case "bg-glitch":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-black ${getEffectClasses()}`} style={getEffectStyles()}>
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
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-black ${getEffectClasses()}`} style={getEffectStyles()}>
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

    case "bg-snow":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-gradient-to-b from-gray-200 to-white ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: 0.7 + Math.random() * 0.3
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-600 bg-white/80 px-2 py-1 rounded">
            Snow
          </div>
        </div>
      )

    case "bg-rain":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-gradient-to-b from-gray-600 to-gray-800 ${getEffectClasses()}`} style={getEffectStyles()}>
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
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-yellow-400 ${getEffectClasses()}`} style={getEffectStyles()}>
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

    case "bg-triangles":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-teal-500 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-cyan-300/60"
                style={{
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Triangles
          </div>
        </div>
      )

    case "bg-circles":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-indigo-900 ${getEffectClasses()}`} style={getEffectStyles()}>
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

    case "bg-diamond":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-rose-500 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-pink-300/60 transform rotate-45"
                style={{
                  left: `${(i % 5) * 20 + 10}%`,
                  top: `${Math.floor(i / 5) * 25 + 10}%`
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Diamond
          </div>
        </div>
      )

    // Efectos de gradientes y colores
    case "bg-gradient":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 ${getEffectClasses()}`} style={getEffectStyles()}>
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
          backgroundColor: '#000'
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
          animation: 'rainbow 3s ease-in-out infinite'
        }}>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Rainbow
          </div>
        </div>
      )

    // Efectos animados
    case "bg-ripple":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-cyan-500 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute border-2 border-white/30 rounded-full animate-ping"
                style={{
                  width: `${(i + 1) * 40}px`,
                  height: `${(i + 1) * 40}px`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Ripple
          </div>
        </div>
      )

    case "bg-spiral":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-gradient-to-br from-violet-600 to-purple-800 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-pink-400/50 rounded-full animate-spin" style={{ borderTopColor: '#ec4899' }} />
            <div className="absolute w-24 h-24 border-4 border-purple-400/50 rounded-full animate-spin" style={{ borderTopColor: '#a855f7', animationDirection: 'reverse' }} />
            <div className="absolute w-16 h-16 border-4 border-indigo-400/50 rounded-full animate-spin" style={{ borderTopColor: '#6366f1' }} />
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Spiral
          </div>
        </div>
      )

    case "bg-noise":
      return (
        <div className={`w-64 h-48 rounded-lg relative overflow-hidden border bg-gray-800 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 opacity-30">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-px bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random()
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
            Noise
          </div>
        </div>
      )

    // Más fondos hasta llegar a 100...
    default:
      return null
  }
}