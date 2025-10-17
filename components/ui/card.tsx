import * as React from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'

import { cn } from '@/lib/utils'

function Card({ 
  className, 
  animation,
  ...props 
}: React.ComponentProps<'div'> & {
  animation?: 'fadeIn' | 'slideUp' | 'scale' | 'tilt' | 'hover' | 'glow'
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [springs, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { mass: 5, tension: 350, friction: 40 }
  }))

  const handleMouseMove = (e: React.MouseEvent) => {
    if (animation === 'tilt') {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      api({
        rotateY: x / 10,
        rotateX: -y / 10,
        scale: 1.02
      })
    }
  }

  const handleMouseLeave = () => {
    if (animation === 'tilt') {
      api({ rotateX: 0, rotateY: 0, scale: 1 })
    }
  }

  const getAnimationProps = () => {
    switch (animation) {
      case 'fadeIn':
        return {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.6 }
        }
      case 'slideUp':
        return {
          initial: { opacity: 0, y: 50 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
          transition: { duration: 0.8 }
        }
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 },
          transition: { duration: 0.6 }
        }
      case 'hover':
        return {
          whileHover: { y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
          transition: { duration: 0.2 }
        }
      case 'glow':
        return {
          whileHover: { 
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            borderColor: "rgb(59, 130, 246)"
          },
          transition: { duration: 0.3 }
        }
      default:
        return {}
    }
  }

  if (animation === 'tilt') {
    return (
      <animated.div
        ref={ref}
        style={{
          transform: springs.rotateX.to(
            (x) => `perspective(600px) rotateX(${x}deg) rotateY(${springs.rotateY.get()}deg) scale(${springs.scale.get()})`
          )
        }}
        data-slot="card"
        className={cn(
          'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm cursor-pointer',
          className,
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    )
  }

  if (animation && animation !== 'tilt') {
    return (
      <motion.div
        ref={ref}
        data-slot="card"
        className={cn(
          'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
          className,
        )}
        {...getAnimationProps()}
        {...props}
      />
    )
  }

  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
