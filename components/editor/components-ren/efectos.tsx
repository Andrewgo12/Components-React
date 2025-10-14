"use client"

import * as Icons from "@/components/icons"

interface ComponentProps {
  props: any
  getEffectClasses: () => string
  getEffectStyles: () => any
}

export function renderEffectComponents(type: string, { props: _props, getEffectClasses, getEffectStyles }: ComponentProps) {
  switch (type) {
    // Efectos básicos de luz y brillo
    case "effect-glow":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          boxShadow: '0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)'
        }}>
          <span className="text-white font-bold text-lg">Glow Effect</span>
        </div>
      )

    case "effect-shimmer":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-gray-800 to-gray-600 rounded-lg relative overflow-hidden flex items-center justify-center ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          <span className="text-white font-bold text-lg relative z-10">Shimmer</span>
        </div>
      )

    case "effect-neon":
      return (
        <div className={`w-48 h-32 bg-black rounded-lg flex items-center justify-center ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          boxShadow: '0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 60px #ff00ff'
        }}>
          <span className="font-bold text-lg" style={{
            color: '#ff00ff',
            textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff'
          }}>Neon Glow</span>
        </div>
      )

    case "effect-bloom":
      return (
        <div className={`w-48 h-32 bg-white rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          filter: 'brightness(1.5) contrast(1.2)',
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.8)'
        }}>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/50 to-white/50" />
          <div className="absolute inset-0 flex items-center justify-center text-gray-800 font-bold text-lg">
            BLOOM
          </div>
        </div>
      )

    case "effect-laser":
      return (
        <div className={`w-48 h-32 bg-black rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0">
            <div
              className="absolute bg-red-500 animate-pulse"
              style={{
                width: '2px',
                height: '100%',
                left: '30%',
                boxShadow: '0 0 20px #ef4444'
              }}
            />
            <div
              className="absolute bg-cyan-400 animate-pulse"
              style={{
                width: '1px',
                height: '80%',
                left: '70%',
                top: '10%',
                animationDelay: '0.5s',
                boxShadow: '0 0 15px #22d3ee'
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
            LASER
          </div>
        </div>
      )

    // Efectos de movimiento
    case "effect-ripple":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg relative overflow-hidden flex items-center justify-center ${getEffectClasses()}`} style={getEffectStyles()}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute border-2 border-white/50 rounded-full animate-ping"
              style={{
                width: `${(i + 1) * 30}px`,
                height: `${(i + 1) * 30}px`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
          <span className="text-white font-bold text-lg relative z-10">Ripple</span>
        </div>
      )

    case "effect-pulse":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center animate-pulse ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="w-4 h-4 bg-white rounded-full animate-ping mr-3" />
          <span className="text-white font-bold text-lg">Pulse Beat</span>
        </div>
      )

    case "effect-bounce":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center animate-bounce ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.MousePointerIcon className="w-6 h-6 text-white mr-2" />
          <span className="text-white font-bold text-lg">Bounce</span>
        </div>
      )

    case "effect-rotate":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.LoaderIcon className="w-8 h-8 text-white animate-spin mr-3" />
          <span className="text-white font-bold text-lg">Rotate</span>
        </div>
      )

    case "effect-scale":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300 ${getEffectClasses()}`} style={getEffectStyles()}>
          <span className="text-white font-bold text-lg">Scale Hover</span>
        </div>
      )

    case "effect-fade":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-gray-600 to-slate-700 rounded-lg flex items-center justify-center hover:opacity-50 transition-opacity duration-500 ${getEffectClasses()}`} style={getEffectStyles()}>
          <span className="text-white font-bold text-lg">Fade Out</span>
        </div>
      )

    case "effect-slide":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="h-full flex items-center justify-center transform hover:translate-x-2 transition-transform duration-300">
            <span className="text-white font-bold text-lg">Slide →</span>
          </div>
        </div>
      )

    case "effect-swing":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          animation: 'swing 2s ease-in-out infinite',
          transformOrigin: 'top center'
        }}>
          <Icons.BellIcon className="w-6 h-6 text-white mr-2" />
          <span className="text-white font-bold text-lg">Swing</span>
        </div>
      )

    // Efectos de vidrio y transparencia
    case "effect-glass":
      return (
        <div className={`w-48 h-32 relative rounded-lg overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600" />
          <div className="absolute inset-0 backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Glass Morph</span>
          </div>
        </div>
      )

    case "effect-frost":
      return (
        <div className={`w-48 h-32 relative rounded-lg overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-cyan-300" />
          <div className="absolute inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center">
            <span className="text-blue-800 font-bold text-lg">Frost</span>
          </div>
        </div>
      )

    case "effect-crystal":
      return (
        <div className={`w-48 h-32 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
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
        <div className={`w-48 h-32 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg relative overflow-hidden flex items-center justify-center ${getEffectClasses()}`} style={getEffectStyles()}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-ping"
              style={{
                left: `${20 + (i % 4) * 25}%`,
                top: `${20 + Math.floor(i / 4) * 25}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
          <span className="text-white font-bold text-lg relative z-10">Particles</span>
        </div>
      )

    case "effect-sparks":
      return (
        <div className={`w-48 h-32 bg-gradient-to-br from-orange-600 to-red-700 rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1.5}s`,
                  boxShadow: '0 0 4px #fbbf24'
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-yellow-200 font-bold text-lg">
            SPARKS
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
        <div className={`w-48 h-32 bg-black rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 font-mono text-green-400 text-xs">
            {[...Array(8)].map((_, col) => (
              <div key={col} className="absolute animate-pulse" style={{left: `${col * 12.5}%`}}>
                {[...Array(10)].map((_, row) => (
                  <div key={row} style={{marginBottom: '2px'}}>
                    {Math.random() > 0.5 ? '1' : '0'}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-green-400 font-bold text-lg">
            Matrix
          </div>
        </div>
      )

    case "effect-cyberpunk":
      return (
        <div className={`w-48 h-32 bg-black rounded-lg relative overflow-hidden border-2 border-cyan-500 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)'
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center text-cyan-400 font-bold text-lg">
            CYBER
          </div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
        </div>
      )

    case "effect-hologram":
      return (
        <div className={`w-48 h-32 relative rounded-lg overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg" style={{
              textShadow: '0 0 10px rgba(255,255,255,0.8)'
            }}>Hologram</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent transform skew-y-12 animate-pulse" />
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
            <Icons.ZapIcon
              key={i}
              className="absolute text-white animate-pulse"
              style={{
                width: '16px',
                height: '16px',
                left: `${25 + i * 20}%`,
                top: `${30 + (i % 2) * 30}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
          <span className="text-white font-bold text-lg relative z-10">Lightning</span>
        </div>
      )

    case "effect-plasma":
      return (
        <div className={`w-48 h-32 bg-black rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 30% 40%, #ff006e 0%, transparent 50%), radial-gradient(circle at 70% 60%, #8338ec 0%, transparent 50%)',
            animation: 'plasma 2s ease-in-out infinite alternate'
          }} />
          <div className="absolute inset-0 flex items-center justify-center text-pink-300 font-bold text-lg">
            PLASMA
          </div>
        </div>
      )

    case "effect-energy":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/60 rounded-full animate-pulse"
                style={{
                  width: `${4 + Math.random() * 8}px`,
                  height: `${4 + Math.random() * 8}px`,
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
            ENERGY
          </div>
        </div>
      )

    // Efectos de transformación
    case "effect-3d":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center transform hover:rotateY-12 transition-transform duration-300 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          transformStyle: 'preserve-3d'
        }}>
          <span className="text-white font-bold text-lg">3D Effect</span>
        </div>
      )

    case "effect-tilt":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center transform hover:rotate-6 hover:scale-105 transition-all duration-300 ${getEffectClasses()}`} style={getEffectStyles()}>
          <span className="text-white font-bold text-lg">Tilt Effect</span>
        </div>
      )

    case "effect-flip":
      return (
        <div className={`w-48 h-32 perspective-1000 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="relative w-full h-full transform-style-preserve-3d hover:rotate-y-180 transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center backface-hidden">
              <span className="text-white font-bold text-lg">Flip Me</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center backface-hidden rotate-y-180">
              <span className="text-white font-bold text-lg">Flipped!</span>
            </div>
          </div>
        </div>
      )

    case "effect-morph":
      return (
        <div className={`w-48 h-32 rounded-lg flex items-center justify-center transition-all duration-1000 hover:rounded-full ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
        }}>
          <span className="text-white font-bold text-lg">Morph Shape</span>
        </div>
      )

    // Efectos de ondas y fluidos
    case "effect-wave":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg relative overflow-hidden flex items-center justify-center ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-blue-700 to-transparent animate-pulse" />
          <Icons.WavesIcon className="w-6 h-6 text-white mr-2" />
          <span className="text-white font-bold text-lg">Wave Motion</span>
        </div>
      )

    case "effect-liquid":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg relative overflow-hidden flex items-center justify-center ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/20 rounded-full animate-pulse"
                style={{
                  width: `${20 + i * 10}px`,
                  height: `${20 + i * 10}px`,
                  left: `${20 + i * 15}%`,
                  top: `${30 + Math.sin(i) * 20}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
          <span className="text-white font-bold text-lg relative z-10">Liquid</span>
        </div>
      )

    case "effect-flow":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/30 rounded-full"
                style={{
                  width: '60px',
                  height: '8px',
                  left: `${-20 + i * 30}%`,
                  top: `${20 + i * 20}%`,
                  animation: `flow 3s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
            FLOW
          </div>
        </div>
      )

    // Efectos de distorsión
    case "effect-distortion":
      return (
        <div className={`w-48 h-32 relative rounded-lg overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent transform skew-x-12" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg transform -skew-x-6">Distortion</span>
          </div>
        </div>
      )

    case "effect-chromatic":
      return (
        <div className={`w-48 h-32 bg-black rounded-lg flex items-center justify-center relative ${getEffectClasses()}`} style={getEffectStyles()}>
          <span className="text-white font-bold text-lg relative">
            Chromatic
            <span className="absolute inset-0 text-red-500 transform translate-x-0.5">Chromatic</span>
            <span className="absolute inset-0 text-blue-500 transform -translate-x-0.5">Chromatic</span>
          </span>
        </div>
      )

    case "effect-aberration":
      return (
        <div className={`w-48 h-32 bg-black rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <span className="absolute text-red-500 font-bold text-lg transform translate-x-2 translate-y-1">ABERRATION</span>
              <span className="absolute text-cyan-500 font-bold text-lg transform -translate-x-2 -translate-y-1">ABERRATION</span>
              <span className="text-white font-bold text-lg">ABERRATION</span>
            </div>
          </div>
        </div>
      )

    // Efectos de fuego y elementos
    case "effect-fire":
      return (
        <div className={`w-48 h-32 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
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

    case "effect-ice":
      return (
        <div className={`w-48 h-32 bg-gradient-to-b from-cyan-200 to-blue-400 rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/60 transform rotate-45"
                style={{
                  width: `${2 + Math.random() * 4}px`,
                  height: `${10 + Math.random() * 20}px`,
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-blue-800 font-bold text-lg">
            ICE
          </div>
        </div>
      )

    case "effect-smoke":
      return (
        <div className={`w-48 h-32 bg-gradient-to-t from-gray-700 to-gray-400 rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gray-300/40 rounded-full blur-sm animate-pulse"
                style={{
                  width: `${15 + Math.random() * 25}px`,
                  height: `${15 + Math.random() * 25}px`,
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 80}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
            SMOKE
          </div>
        </div>
      )

    // Efectos magnéticos y físicos
    case "effect-magnetic":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center transform hover:scale-110 hover:rotate-2 transition-all duration-300 cursor-pointer ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.MagnetIcon className="w-6 h-6 text-white mr-2" />
          <span className="text-white font-bold text-lg">Magnetic</span>
        </div>
      )

    case "effect-elastic":
      return (
        <div className={`w-48 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center transform hover:scale-125 active:scale-90 transition-transform duration-200 ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.ZapIcon className="w-6 h-6 text-white mr-2" />
          <span className="text-white font-bold text-lg">Elastic</span>
        </div>
      )

    case "effect-gravity":
      return (
        <div className={`w-48 h-32 bg-gradient-to-b from-purple-500 to-indigo-700 rounded-lg relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 50}%`,
                  animation: `fall 2s ease-in infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
            GRAVITY
          </div>
        </div>
      )

    // Más efectos hasta llegar a 100...
    default:
      return null
  }
}