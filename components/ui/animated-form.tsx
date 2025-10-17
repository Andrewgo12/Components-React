"use client"

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { Input } from './input'
import { Card, CardContent, CardHeader, CardTitle } from './card'

interface AnimatedFormProps {
  children: React.ReactNode
  className?: string
  animation?: 'slideIn' | 'fadeIn' | 'stagger' | 'bounce'
  onSubmit?: (e: React.FormEvent) => void
}

export function AnimatedForm({ 
  children, 
  className, 
  animation = 'fadeIn',
  onSubmit 
}: AnimatedFormProps) {
  const getAnimationProps = () => {
    switch (animation) {
      case 'slideIn':
        return {
          initial: { x: -50, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          transition: { duration: 0.5 }
        }
      case 'fadeIn':
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 }
        }
      case 'bounce':
        return {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { type: "spring", stiffness: 260, damping: 20 }
        }
      default:
        return {}
    }
  }

  return (
    <motion.form
      className={cn("space-y-4", className)}
      onSubmit={onSubmit}
      {...getAnimationProps()}
    >
      {children}
    </motion.form>
  )
}

export function AnimatedFormField({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedSubmitButton({ 
  children, 
  loading = false,
  ...props 
}: React.ComponentProps<typeof Button> & { loading?: boolean }) {
  return (
    <Button
      animation="scale"
      disabled={loading}
      {...props}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
            Enviando...
          </motion.div>
        ) : (
          <motion.span
            key="submit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}

export function AnimatedLoginForm() {
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <Card animation="fadeIn" className="w-96">
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatedForm animation="stagger" onSubmit={handleSubmit}>
          <AnimatedFormField delay={0.1}>
            <Input animation="glow" placeholder="Email" type="email" />
          </AnimatedFormField>
          <AnimatedFormField delay={0.2}>
            <Input animation="glow" placeholder="Contraseña" type="password" />
          </AnimatedFormField>
          <AnimatedFormField delay={0.3}>
            <AnimatedSubmitButton loading={loading} className="w-full">
              Entrar
            </AnimatedSubmitButton>
          </AnimatedFormField>
        </AnimatedForm>
      </CardContent>
    </Card>
  )
}

export function AnimatedContactForm() {
  const [springs, api] = useSpring(() => ({ scale: 1 }))

  return (
    <animated.div style={springs}>
      <Card animation="slideUp" className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Contáctanos</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatedForm animation="fadeIn">
            <AnimatedFormField delay={0.1}>
              <Input animation="focus" placeholder="Nombre" />
            </AnimatedFormField>
            <AnimatedFormField delay={0.2}>
              <Input animation="focus" placeholder="Email" type="email" />
            </AnimatedFormField>
            <AnimatedFormField delay={0.3}>
              <textarea 
                className="w-full p-3 border rounded-md resize-none"
                placeholder="Mensaje"
                rows={4}
              />
            </AnimatedFormField>
            <AnimatedFormField delay={0.4}>
              <Button animation="magnetic" className="w-full">
                Enviar Mensaje
              </Button>
            </AnimatedFormField>
          </AnimatedForm>
        </CardContent>
      </Card>
    </animated.div>
  )
}