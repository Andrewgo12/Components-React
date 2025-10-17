import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        animated: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700',
        ripple: 'bg-blue-500 text-white relative overflow-hidden',
        magnetic: 'bg-purple-500 text-white hover:bg-purple-600',
        glow: 'bg-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/50',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  animation,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    animation?: 'scale' | 'bounce' | 'pulse' | 'magnetic' | 'ripple'
  }) {
  const Comp = asChild ? Slot : 'button'
  const [springs, api] = useSpring(() => ({ scale: 1, x: 0, y: 0 }))

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (animation === 'magnetic') {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      api({ x: x * 0.3, y: y * 0.3, scale: 1.05 })
    }
  }

  const handleMouseLeave = () => {
    if (animation === 'magnetic') {
      api({ x: 0, y: 0, scale: 1 })
    }
  }

  const getAnimationProps = () => {
    switch (animation) {
      case 'scale':
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { type: "spring", stiffness: 400, damping: 17 }
        }
      case 'bounce':
        return {
          whileHover: { y: -2 },
          whileTap: { y: 0 },
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }
      case 'pulse':
        return {
          animate: { scale: [1, 1.02, 1] },
          transition: { duration: 2, repeat: Infinity }
        }
      default:
        return {}
    }
  }

  if (animation === 'magnetic') {
    return (
      <animated.button
        style={springs}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    )
  }

  if (animation && animation !== 'ripple') {
    return (
      <motion.button
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...getAnimationProps()}
        {...props}
      />
    )
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
