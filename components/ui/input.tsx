import * as React from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'

import { cn } from '@/lib/utils'

function Input({ 
  className, 
  type, 
  animation,
  ...props 
}: React.ComponentProps<'input'> & {
  animation?: 'focus' | 'glow' | 'shake' | 'bounce' | 'float'
}) {
  const [springs, api] = useSpring(() => ({ x: 0, scale: 1 }))
  
  const handleFocus = () => {
    if (animation === 'bounce') api({ scale: 1.02 })
  }
  
  const handleBlur = () => {
    if (animation === 'bounce') api({ scale: 1 })
  }
  
  const handleInvalid = () => {
    if (animation === 'shake') {
      api({ x: 5 })
      setTimeout(() => api({ x: -5 }), 100)
      setTimeout(() => api({ x: 0 }), 200)
    }
  }

  const getAnimationProps = () => {
    switch (animation) {
      case 'focus':
        return {
          whileFocus: { scale: 1.02, borderColor: "#3b82f6" },
          transition: { duration: 0.2 }
        }
      case 'glow':
        return {
          whileFocus: { 
            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)",
            borderColor: "#3b82f6"
          },
          transition: { duration: 0.2 }
        }
      default:
        return {}
    }
  }

  if (animation === 'shake' || animation === 'bounce') {
    return (
      <animated.input
        type={type}
        data-slot="input"
        style={springs}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInvalid={handleInvalid}
        {...props}
      />
    )
  }

  if (animation) {
    return (
      <motion.input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...getAnimationProps()}
        {...props}
      />
    )
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
