"use client"

import * as React from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { cn } from '@/lib/utils'

export interface AnimatedInputProps extends React.ComponentProps<'input'> {
  animation?: 'focus' | 'float' | 'glow' | 'shake' | 'bounce'
  label?: string
}

const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ className, type, animation, label, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    const [springs, api] = useSpring(() => ({ x: 0, scale: 1 }))

    const handleFocus = () => {
      setIsFocused(true)
      if (animation === 'bounce') {
        api({ scale: 1.02 })
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(e.target.value.length > 0)
      if (animation === 'bounce') {
        api({ scale: 1 })
      }
    }

    const handleInvalid = () => {
      if (animation === 'shake') {
        api({ x: 10 })
        setTimeout(() => api({ x: -10 }), 100)
        setTimeout(() => api({ x: 5 }), 200)
        setTimeout(() => api({ x: 0 }), 300)
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
              boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
              borderColor: "#3b82f6"
            },
            transition: { duration: 0.2 }
          }
        default:
          return {}
      }
    }

    if (animation === 'float' && label) {
      return (
        <div className="relative">
          <motion.input
            ref={ref}
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pt-6",
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onInvalid={handleInvalid}
            {...getAnimationProps()}
            {...props}
          />
          <motion.label
            className="absolute left-3 text-muted-foreground pointer-events-none"
            animate={{
              y: isFocused || hasValue ? -8 : 8,
              scale: isFocused || hasValue ? 0.85 : 1,
              color: isFocused ? "#3b82f6" : "#6b7280"
            }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        </div>
      )
    }

    if (animation === 'shake' || animation === 'bounce') {
      return (
        <animated.input
          ref={ref}
          type={type}
          style={springs}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInvalid={handleInvalid}
          {...props}
        />
      )
    }

    return (
      <motion.input
        ref={ref}
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInvalid={handleInvalid}
        {...getAnimationProps()}
        {...props}
      />
    )
  }
)

AnimatedInput.displayName = "AnimatedInput"

export { AnimatedInput }