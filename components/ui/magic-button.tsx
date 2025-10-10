'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface MagicButtonProps {
  children: React.ReactNode
  className?: string
  variant?: 'glow' | 'shimmer' | 'ripple' | 'gradient'
  onClick?: () => void
}

export function MagicButton({ 
  children, 
  className, 
  variant = 'glow',
  onClick 
}: MagicButtonProps) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 600)
    onClick?.()
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'glow':
        return 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25 hover:shadow-2xl'
      case 'shimmer':
        return 'bg-gradient-to-r from-gray-900 to-gray-700 relative overflow-hidden'
      case 'ripple':
        return 'bg-gradient-to-r from-indigo-500 to-purple-600 relative overflow-hidden'
      case 'gradient':
        return 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-size-200 hover:bg-pos-100'
      default:
        return 'bg-primary'
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-105 active:scale-95',
        getVariantClasses(),
        className
      )}
    >
      {variant === 'shimmer' && (
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
      
      {variant === 'ripple' && isClicked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-0 h-0 rounded-full bg-white/30 animate-ripple" />
        </div>
      )}
      
      <span className="relative z-10">{children}</span>
    </button>
  )
}