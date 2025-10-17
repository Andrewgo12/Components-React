"use client"

import { motion } from "framer-motion"
import { useSpring, animated, useTrail } from "@react-spring/web"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Staggered Animation
export function StaggeredCards({ items }: { items: string[] }) {
  const trails = useTrail(items.length, {
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    config: { mass: 5, tension: 2000, friction: 200 }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trails.map((style, index) => (
        <animated.div key={index} style={style}>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold">{items[index]}</h3>
            </CardContent>
          </Card>
        </animated.div>
      ))}
    </div>
  )
}

// 3D Tilt Effect
export function TiltCard({ children }: { children: React.ReactNode }) {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }))

  return (
    <animated.div
      className="cursor-pointer"
      onMouseMove={({ clientX, clientY, currentTarget }) => {
        const rect = currentTarget.getBoundingClientRect()
        const x = clientX - rect.left - rect.width / 2
        const y = clientY - rect.top - rect.height / 2
        set({ xys: [x / 10, y / 10, 1.1] })
      }}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{
        transform: props.xys.to(
          (x, y, s) => `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) scale(${s})`
        )
      }}
    >
      {children}
    </animated.div>
  )
}

// Morphing Button
export function MorphButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.button
      className="bg-blue-500 text-white px-6 py-3 rounded-full"
      animate={{
        width: isExpanded ? 200 : 120,
        borderRadius: isExpanded ? 8 : 25
      }}
      transition={{ duration: 0.3 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {isExpanded ? "Expandido!" : "Click me"}
    </motion.button>
  )
}

// Particle Effect
export function ParticleBackground() {
  const particles = Array.from({ length: 50 }, (_, i) => i)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  )
}

// Elastic Drag
export function DraggableCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      drag
      dragElastic={0.2}
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      whileDrag={{ scale: 1.1, rotate: 5 }}
      className="cursor-grab active:cursor-grabbing"
    >
      {children}
    </motion.div>
  )
}

// Wave Animation
export function WaveText({ text }: { text: string }) {
  const letters = text.split("")

  return (
    <div className="flex">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: index * 0.1
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  )
}

// Magnetic Button
export function MagneticButton({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  return (
    <motion.div
      className="relative inline-block"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        setPosition({ x: x * 0.3, y: y * 0.3 })
      }}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Glitch Effect
export function GlitchText({ text }: { text: string }) {
  return (
    <div className="relative">
      <motion.div
        className="text-4xl font-bold"
        animate={{
          x: [0, -2, 2, 0],
          textShadow: [
            "0 0 0 transparent",
            "2px 0 0 #ff0000, -2px 0 0 #00ffff",
            "-2px 0 0 #ff0000, 2px 0 0 #00ffff",
            "0 0 0 transparent"
          ]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 2
        }}
      >
        {text}
      </motion.div>
    </div>
  )
}