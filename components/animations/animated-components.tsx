"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useSpring, animated } from "@react-spring/web"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"
import Marquee from "react-fast-marquee"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Fade In Animation
export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

// Scale on Hover
export function ScaleOnHover({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  )
}

// Animated Counter
export function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <div ref={ref} className="text-4xl font-bold">
      {inView && <CountUp end={end} duration={duration} />}
    </div>
  )
}

// Spring Animation
export function SpringCard({ children }: { children: React.ReactNode }) {
  const [springs, api] = useSpring(() => ({
    from: { rotateX: 0, rotateY: 0, scale: 1 },
  }))

  return (
    <animated.div
      style={springs}
      onMouseEnter={() => api.start({ rotateY: 5, scale: 1.02 })}
      onMouseLeave={() => api.start({ rotateY: 0, scale: 1 })}
      className="cursor-pointer"
    >
      {children}
    </animated.div>
  )
}

// Marquee Text
export function MarqueeText({ text }: { text: string }) {
  return (
    <Marquee gradient={false} speed={50} className="bg-blue-500 text-white py-2">
      {text}
    </Marquee>
  )
}

// Typewriter Effect
export function TypewriterText({ text, speed = 100 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className="font-mono">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  )
}

// Scroll Reveal
export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}

// Floating Animation
export function FloatingElement({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}