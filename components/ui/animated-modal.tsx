"use client"

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import * as Icons from '@/components/icons'

interface AnimatedModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  animation?: 'scale' | 'slide' | 'fade' | 'bounce' | 'blur'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function AnimatedModal({ 
  isOpen, 
  onClose, 
  children, 
  title,
  animation = 'scale',
  size = 'md'
}: AnimatedModalProps) {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }

  const getAnimationProps = () => {
    switch (animation) {
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 }
        }
      case 'slide':
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 50 }
        }
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        }
      case 'bounce':
        return {
          initial: { opacity: 0, scale: 0.3 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.3 },
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }
      case 'blur':
        return {
          initial: { opacity: 0, filter: 'blur(10px)' },
          animate: { opacity: 1, filter: 'blur(0px)' },
          exit: { opacity: 0, filter: 'blur(10px)' }
        }
      default:
        return {}
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              className={cn("w-full", sizeClasses[size])}
              {...getAnimationProps()}
              transition={{ duration: 0.3 }}
            >
              <Card>
                {title && (
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      animation="scale"
                    >
                      <Icons.XIcon />
                    </Button>
                  </CardHeader>
                )}
                <CardContent>
                  {children}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export function AnimatedDrawer({ 
  isOpen, 
  onClose, 
  children, 
  side = 'right' 
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
}) {
  const getSlideProps = () => {
    switch (side) {
      case 'left':
        return { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } }
      case 'right':
        return { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } }
      case 'top':
        return { initial: { y: '-100%' }, animate: { y: 0 }, exit: { y: '-100%' } }
      case 'bottom':
        return { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }
    }
  }

  const getSizeClasses = () => {
    switch (side) {
      case 'left':
      case 'right':
        return 'w-80 h-full'
      case 'top':
      case 'bottom':
        return 'w-full h-80'
    }
  }

  const getPositionClasses = () => {
    switch (side) {
      case 'left':
        return 'left-0 top-0'
      case 'right':
        return 'right-0 top-0'
      case 'top':
        return 'top-0 left-0'
      case 'bottom':
        return 'bottom-0 left-0'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            className={cn(
              "fixed bg-white shadow-lg z-50",
              getSizeClasses(),
              getPositionClasses()
            )}
            {...getSlideProps()}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4 h-full overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Drawer</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  animation="scale"
                >
                  <Icons.XIcon />
                </Button>
              </div>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function AnimatedToast({ 
  message, 
  type = 'info',
  isVisible,
  onClose 
}: {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  isVisible: boolean
  onClose: () => void
}) {
  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white'
  }

  const typeIcons = {
    success: Icons.CheckIcon,
    error: Icons.XIcon,
    warning: Icons.AlertTriangleIcon,
    info: Icons.InfoIcon
  }

  const Icon = typeIcons[type]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-center gap-3 min-w-80",
            typeStyles[type]
          )}
        >
          <Icon className="w-5 h-5" />
          <span className="flex-1">{message}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-current hover:bg-white/20"
          >
            <Icons.XIcon className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function AnimatedPopover({ 
  trigger, 
  children, 
  placement = 'bottom' 
}: {
  trigger: React.ReactNode
  children: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  const getPlacementProps = () => {
    switch (placement) {
      case 'top':
        return { 
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          className: 'bottom-full mb-2'
        }
      case 'bottom':
        return { 
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          className: 'top-full mt-2'
        }
      case 'left':
        return { 
          initial: { opacity: 0, x: 10 },
          animate: { opacity: 1, x: 0 },
          className: 'right-full mr-2'
        }
      case 'right':
        return { 
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          className: 'left-full ml-2'
        }
    }
  }

  const placementProps = getPlacementProps()

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={placementProps.initial}
            animate={placementProps.animate}
            exit={placementProps.initial}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute z-50 bg-white border rounded-lg shadow-lg p-4 min-w-48",
              placementProps.className
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}