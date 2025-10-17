"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

// Parallax Scroll
export function ParallaxSection({ children, speed = 0.5 }: { children: React.ReactNode; speed?: number }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed])

  return (
    <motion.div style={{ y }} className="relative">
      {children}
    </motion.div>
  )
}

// Scroll Progress Bar
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50 origin-left"
      style={{ scaleX }}
    />
  )
}

// Reveal on Scroll with Direction
export function ScrollRevealDirection({ 
  children, 
  direction = "up" 
}: { 
  children: React.ReactNode; 
  direction?: "up" | "down" | "left" | "right" 
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// Sticky Reveal
export function StickyReveal({ children }: { children: React.ReactNode }) {
  const [ref, inView] = useInView({
    threshold: 0.5
  })

  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        ref={ref}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Scale on Scroll
export function ScaleOnScroll({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2])

  return (
    <motion.div style={{ scale }} className="flex items-center justify-center min-h-screen">
      {children}
    </motion.div>
  )
}

// Text Reveal on Scroll
export function TextRevealScroll({ text }: { text: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const words = text.split(" ")

  return (
    <div ref={ref} className="text-4xl font-bold">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

// Fade Through Sections
export function FadeThroughSections({ sections }: { sections: React.ReactNode[] }) {
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const newSection = Math.floor(scrollPosition / windowHeight)
      setCurrentSection(Math.min(newSection, sections.length - 1))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections.length])

  return (
    <div className="relative">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          className="min-h-screen flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSection === index ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {section}
        </motion.div>
      ))}
    </div>
  )
}

// Horizontal Scroll Section
export function HorizontalScrollSection({ children }: { children: React.ReactNode[] }) {
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(children.length - 1) * 100}%`])

  return (
    <div className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">
          {children.map((child, index) => (
            <div key={index} className="min-w-full h-full flex items-center justify-center">
              {child}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}