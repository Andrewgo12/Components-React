// Sistema de animaciones dinámicas para componentes editables

export const animationPresets = {
  pulse: {
    keyframes: `
      @keyframes dynamic-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `,
    animation: 'dynamic-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  },
  bounce: {
    keyframes: `
      @keyframes dynamic-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-25%); }
      }
    `,
    animation: 'dynamic-bounce 1s infinite'
  },
  spin: {
    keyframes: `
      @keyframes dynamic-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `,
    animation: 'dynamic-spin 1s linear infinite'
  },
  ping: {
    keyframes: `
      @keyframes dynamic-ping {
        75%, 100% { transform: scale(2); opacity: 0; }
      }
    `,
    animation: 'dynamic-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
  },
  float: {
    keyframes: `
      @keyframes dynamic-float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
    `,
    animation: 'dynamic-float 3s ease-in-out infinite'
  },
  shake: {
    keyframes: `
      @keyframes dynamic-shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
      }
    `,
    animation: 'dynamic-shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both'
  },
  shimmer: {
    keyframes: `
      @keyframes dynamic-shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `,
    animation: 'dynamic-shimmer 2s ease-in-out infinite'
  },
  gradientShift: {
    keyframes: `
      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
    `,
    animation: 'gradient-shift 3s ease infinite'
  }
}

export function injectAnimationStyles() {
  if (typeof document === 'undefined') return

  const styleId = 'dynamic-animations'
  let styleElement = document.getElementById(styleId)
  
  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = styleId
    document.head.appendChild(styleElement)
  }

  const allKeyframes = Object.values(animationPresets)
    .map(preset => preset.keyframes)
    .join('\n')

  styleElement.textContent = allKeyframes
}

export function getAnimationStyle(type: string, speed: number = 1) {
  const preset = animationPresets[type as keyof typeof animationPresets]
  if (!preset) return {}

  return {
    animation: preset.animation.replace(/(\d+(?:\.\d+)?)s/, `${speed}s`)
  }
}

export function generateEffectClasses(effects: any) {
  const classes = []
  
  if (effects?.animation?.enabled) {
    const animationType = effects.animation.type || 'pulse'
    classes.push(`animate-${animationType}`)
  }
  
  if (effects?.hover?.enabled) {
    classes.push('transition-all', 'duration-300', 'hover:scale-105')
  }
  
  return classes.join(' ')
}