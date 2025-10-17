"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useSpring, animated, useTrail, useChain, useSpringRef } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import anime from "animejs"
import { Fade, Slide, Zoom, Bounce } from "react-awesome-reveal"
import AOS from "aos"
import ScrollReveal from "scrollreveal"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { Fade as ReactRevealFade, Bounce as ReactRevealBounce } from "react-reveal"
import Lottie from "lottie-react"
import { useRive } from "@rive-app/react-canvas"
import Typed from "typed.js"
import ReactTypist from "react-typist"
import FlipMove from "react-flip-move"
import AnimateHeight from "react-animate-height"
import Ticker from "react-ticker"
import useAnimations from "react-useanimations"
import Confetti from "react-confetti"
import CountUp from "react-countup"
import AnimatedNumber from "react-animated-number"
import { RandomReveal } from "react-random-reveal"
import TextLoop from "react-text-loop"
import Tilt from "react-parallax-tilt"
import { ReactCursorPosition } from "react-cursor-position"
import { Waypoint } from "react-waypoint"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// GSAP Setup
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Framer Motion Animations
export function FramerFadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

export function FramerStagger({ items }: { items: string[] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }
  
  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
      {items.map((text, index) => (
        <motion.div key={index} variants={item} className="p-3 bg-blue-50 rounded">
          {text}
        </motion.div>
      ))}
    </motion.div>
  )
}

export function FramerParallax({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -200])
  
  return (
    <motion.div style={{ y }}>
      {children}
    </motion.div>
  )
}

export function FramerGestures({ children }: { children: React.ReactNode }) {
  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(() => ({
    rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, zoom: 0, x: 0, y: 0,
    config: { mass: 5, tension: 350, friction: 40 }
  }))

  const bind = useGesture({
    onDrag: ({ active, offset: [x, y] }) => api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1.1 : 1 }),
    onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
    onMove: ({ xy: [px, py], dragging }) => !dragging && api({
      rotateX: (py - window.innerHeight / 2) / 20,
      rotateY: (px - window.innerWidth / 2) / 20,
      scale: 1.1
    }),
    onHover: ({ hovering }) => !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 })
  })

  return (
    <animated.div
      {...bind()}
      style={{
        transform: 'perspective(600px)',
        x, y, scale: scale.to(s => s + zoom), rotateX, rotateY, rotateZ
      }}
      className="cursor-grab active:cursor-grabbing"
    >
      {children}
    </animated.div>
  )
}

// React Spring Animations
export function SpringTrail({ items }: { items: string[] }) {
  const trails = useTrail(items.length, {
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' }
  })

  return (
    <div className="space-y-2">
      {trails.map((style, index) => (
        <animated.div key={index} style={style} className="p-3 bg-green-50 rounded">
          {items[index]}
        </animated.div>
      ))}
    </div>
  )
}

export function SpringCarousel({ items }: { items: React.ReactNode[] }) {
  const [index, setIndex] = useState(0)
  const springRef = useSpringRef()
  
  const { size, ...rest } = useSpring({
    ref: springRef,
    config: { mass: 5, tension: 500, friction: 80 },
    from: { size: '20%', background: 'hotpink' },
    to: { size: index % 2 === 0 ? '100%' : '50%', background: index % 2 === 0 ? 'lightblue' : 'lightgreen' }
  })

  useChain([springRef], [0])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % items.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [items.length])

  return (
    <animated.div style={{ ...rest, width: size, height: size }} className="rounded-lg p-4">
      {items[index]}
    </animated.div>
  )
}

// GSAP Animations
export function GSAPTimeline({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true })
      tl.to(ref.current, { rotation: 360, duration: 2 })
        .to(ref.current, { scale: 1.2, duration: 1 })
        .to(ref.current, { x: 100, duration: 1 })
    }
  }, [])

  return <div ref={ref}>{children}</div>
}

export function GSAPScrollTrigger({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, 
        { opacity: 0, y: 100 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true
          }
        }
      )
    }
  }, [])

  return <div ref={ref}>{children}</div>
}

// Anime.js Animations
export function AnimeSVGDraw({ path }: { path: string }) {
  const ref = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (ref.current) {
      anime({
        targets: ref.current,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: 500,
        direction: 'alternate',
        loop: true
      })
    }
  }, [])

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <path ref={ref} d={path} stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  )
}

export function AnimeStagger({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      anime({
        targets: ref.current.children,
        translateY: [-30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutExpo'
      })
    }
  }, [])

  return (
    <div ref={ref} className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="p-3 bg-purple-50 rounded opacity-0">
          {item}
        </div>
      ))}
    </div>
  )
}

// Text Animations
export function TypedJSText({ strings }: { strings: string[] }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current) {
      const typed = new Typed(ref.current, {
        strings,
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
      })
      return () => typed.destroy()
    }
  }, [strings])

  return <span ref={ref} />
}

export function ReactTypistText({ text }: { text: string }) {
  return (
    <ReactTypist avgTypingDelay={40} stdTypingDelay={10}>
      {text}
    </ReactTypist>
  )
}

export function TextLoopAnimation({ texts }: { texts: string[] }) {
  return (
    <div className="text-2xl font-bold">
      Esto es{" "}
      <TextLoop>
        {texts.map((text, index) => (
          <span key={index} className="text-blue-600">{text}</span>
        ))}
      </TextLoop>
    </div>
  )
}

export function MatrixTextReveal({ text }: { text: string }) {
  return (
    <div className="text-2xl font-mono">
      <RandomReveal isPlaying duration={2} characters={text} />
    </div>
  )
}

// Scroll Animations
export function AOSAnimation({ children, animation = "fade-up" }: { children: React.ReactNode; animation?: string }) {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return <div data-aos={animation}>{children}</div>
}

export function ScrollRevealAnimation({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ScrollReveal().reveal(ref.current, {
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        duration: 1000
      })
    }
  }, [])

  return <div ref={ref}>{children}</div>
}

export function AwesomeRevealFade({ children }: { children: React.ReactNode }) {
  return <Fade cascade damping={0.1}>{children}</Fade>
}

export function AwesomeRevealSlide({ children }: { children: React.ReactNode }) {
  return <Slide direction="up">{children}</Slide>
}

export function WaypointTrigger({ children, onEnter }: { children: React.ReactNode; onEnter: () => void }) {
  return (
    <Waypoint onEnter={onEnter}>
      <div>{children}</div>
    </Waypoint>
  )
}

// Special Effects
export function ConfettiEffect() {
  const [showConfetti, setShowConfetti] = useState(false)

  return (
    <div>
      {showConfetti && <Confetti />}
      <Button onClick={() => setShowConfetti(!showConfetti)}>
        {showConfetti ? "Stop" : "Start"} Confetti
      </Button>
    </div>
  )
}

export function TickerAnimation({ items }: { items: string[] }) {
  return (
    <Ticker>
      {() => (
        <div className="flex space-x-8">
          {items.map((item, index) => (
            <span key={index} className="text-lg font-semibold">{item}</span>
          ))}
        </div>
      )}
    </Ticker>
  )
}

export function ParallaxTiltCard({ children }: { children: React.ReactNode }) {
  return (
    <Tilt
      perspective={1000}
      glareEnable={true}
      glareMaxOpacity={0.45}
      scale={1.02}
    >
      <Card className="w-64 h-40">
        <CardContent className="flex items-center justify-center h-full">
          {children}
        </CardContent>
      </Card>
    </Tilt>
  )
}

// Counters
export function AnimatedCountUp({ end }: { end: number }) {
  return (
    <div className="text-4xl font-bold">
      <CountUp end={end} duration={2} />
    </div>
  )
}

export function AnimatedNumberComponent({ value }: { value: number }) {
  return (
    <div className="text-4xl font-bold">
      <AnimatedNumber
        component="text"
        value={value}
        style={{ transition: '0.8s ease-out', transitionProperty: 'background-color, color, opacity' }}
        duration={1000}
      />
    </div>
  )
}

// Transitions
export function FlipMoveList({ items }: { items: string[] }) {
  return (
    <FlipMove>
      {items.map((item, index) => (
        <div key={item} className="p-3 bg-gray-100 rounded mb-2">
          {item}
        </div>
      ))}
    </FlipMove>
  )
}

export function AnimateHeightComponent({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  return (
    <AnimateHeight duration={500} height={isOpen ? 'auto' : 0}>
      {children}
    </AnimateHeight>
  )
}

// Lottie Animation
export function LottieAnimation({ animationData }: { animationData: any }) {
  return <Lottie animationData={animationData} style={{ width: 200, height: 200 }} />
}

// Rive Animation
export function RiveAnimation({ src }: { src: string }) {
  const { RiveComponent } = useRive({
    src,
    autoplay: true
  })

  return <RiveComponent style={{ width: 200, height: 200 }} />
}