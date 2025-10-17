import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  animation,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { 
    asChild?: boolean
    animation?: 'pulse' | 'bounce' | 'scale' | 'glow'
  }) {
  const Comp = asChild ? Slot : 'span'

  const getAnimationProps = () => {
    switch (animation) {
      case 'pulse':
        return {
          animate: { scale: [1, 1.05, 1] },
          transition: { duration: 2, repeat: Infinity }
        }
      case 'bounce':
        return {
          whileHover: { y: -2 },
          transition: { type: "spring", stiffness: 400 }
        }
      case 'scale':
        return {
          whileHover: { scale: 1.1 },
          transition: { duration: 0.2 }
        }
      case 'glow':
        return {
          whileHover: { boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" },
          transition: { duration: 0.2 }
        }
      default:
        return {}
    }
  }

  if (animation) {
    return (
      <motion.span
        data-slot="badge"
        className={cn(badgeVariants({ variant }), className)}
        {...getAnimationProps()}
        {...props}
      />
    )
  }

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
