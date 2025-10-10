"use client"

import { useRef, useEffect } from "react"

export function useLiveEffects(effects: any) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return undefined

    // Apply shimmer effect
    if (effects?.shimmer?.enabled) {
      element.classList.add('shimmer-effect')
    } else {
      element.classList.remove('shimmer-effect')
    }

    // Apply ripple effect
    if (effects?.ripple?.enabled) {
      const handleClick = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const ripple = document.createElement('div')
        ripple.className = 'ripple-animation'
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`
        
        element.appendChild(ripple)
        
        setTimeout(() => {
          ripple.remove()
        }, effects.ripple.duration || 600)
      }

      element.addEventListener('click', handleClick)
      return () => element.removeEventListener('click', handleClick)
    }
    return undefined
  }, [effects])

  return elementRef
}