'use client'

import { useEffect, useRef } from 'react'

interface UseEffectsOptions {
  glow?: { enabled: boolean; intensity?: number; color?: string }
  shimmer?: { enabled: boolean; speed?: number }
  ripple?: { enabled: boolean; duration?: number }
  borderBeam?: { enabled: boolean; width?: number; color?: string }
}

export function useLiveEffects(effects: UseEffectsOptions = {}) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Apply glow effect
    if (effects.glow?.enabled) {
      const intensity = effects.glow.intensity || 50
      const color = effects.glow.color || '#3b82f6'
      element.style.boxShadow = `0 0 ${intensity}px ${color}40, 0 0 ${intensity * 2}px ${color}20`
      element.style.filter = `drop-shadow(0 0 ${intensity / 2}px ${color})`
    } else {
      element.style.boxShadow = ''
      element.style.filter = ''
    }

    // Apply shimmer effect
    if (effects.shimmer?.enabled) {
      element.classList.add('relative', 'overflow-hidden')
      
      const shimmerEl = document.createElement('div')
      shimmerEl.className = 'absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent'
      shimmerEl.style.animation = `shimmer ${effects.shimmer.speed || 2}s linear infinite`
      
      element.appendChild(shimmerEl)
      
      return () => {
        if (element.contains(shimmerEl)) {
          element.removeChild(shimmerEl)
        }
      }
    }

    // Apply ripple effect
    if (effects.ripple?.enabled) {
      const handleClick = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        const ripple = document.createElement('div')
        ripple.className = 'absolute rounded-full bg-white/30 pointer-events-none'
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`
        ripple.style.width = '0'
        ripple.style.height = '0'
        ripple.style.animation = `ripple ${effects.ripple?.duration || 600}ms linear`
        
        element.appendChild(ripple)
        
        setTimeout(() => {
          if (element.contains(ripple)) {
            element.removeChild(ripple)
          }
        }, effects.ripple?.duration || 600)
      }
      
      element.addEventListener('click', handleClick)
      
      return () => {
        element.removeEventListener('click', handleClick)
      }
    }
  }, [effects])

  return elementRef
}