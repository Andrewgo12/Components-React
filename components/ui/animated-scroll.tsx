"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// Scroll Progress Bar
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

// Parallax Container
export function ParallaxContainer({ 
  children, 
  speed = 0.5,
  className 
}: { 
  children: React.ReactNode
  speed?: number
  className?: string 
}) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed])

  return (
    <motion.div style={{ y }} className={cn("relative", className)}>
      {children}
    </motion.div>
  )
}

// Reveal on Scroll
export function RevealOnScroll({ 
  children,
  direction = "up",
  delay = 0
}: { 
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
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
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}

// Sticky Header with Animation
export function StickyHeader({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all"
      animate={{
        backgroundColor: isScrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0)",
        backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
        boxShadow: isScrolled ? "0 4px 6px rgba(0,0,0,0.1)" : "0 0 0 rgba(0,0,0,0)"
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.header>
  )
}

// Infinite Scroll Loader
export function InfiniteScrollLoader({ 
  onLoadMore,
  hasMore = true,
  loading = false
}: {
  onLoadMore: () => void
  hasMore?: boolean
  loading?: boolean
}) {
  const [ref, inView] = useInView({
    threshold: 0.1
  })

  useEffect(() => {
    if (inView && hasMore && !loading) {
      onLoadMore()
    }
  }, [inView, hasMore, loading, onLoadMore])

  return (
    <div ref={ref} className="flex justify-center p-4">
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
        />
      )}
    </div>
  )
}