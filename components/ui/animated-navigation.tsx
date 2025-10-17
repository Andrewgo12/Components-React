"use client"

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { cn } from '@/lib/utils'
import { Button } from './button'
import * as Icons from '@/components/icons'

interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface AnimatedNavProps {
  items: NavItem[]
  className?: string
  animation?: 'slide' | 'fade' | 'bounce' | 'magnetic'
}

export function AnimatedNavbar({ items, className, animation = 'slide' }: AnimatedNavProps) {
  const [activeItem, setActiveItem] = React.useState(0)

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn("flex items-center space-x-1 p-4 bg-white/80 backdrop-blur-sm border-b", className)}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button
            variant={activeItem === index ? "default" : "ghost"}
            animation={animation}
            onClick={() => setActiveItem(index)}
            className="relative"
          >
            {item.icon && <item.icon className="w-4 h-4 mr-2" />}
            {item.label}
            {activeItem === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary/10 rounded-md"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Button>
        </motion.div>
      ))}
    </motion.nav>
  )
}

export function AnimatedSidebar({ items, className }: AnimatedNavProps) {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <motion.aside
      animate={{ width: isOpen ? 240 : 60 }}
      transition={{ duration: 0.3 }}
      className={cn("bg-gray-50 border-r p-4 h-screen", className)}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4"
      >
        <Icons.MenuIcon />
      </Button>
      
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="ghost"
              className="w-full justify-start"
              animation="scale"
            >
              {item.icon && <item.icon className="w-4 h-4 mr-2" />}
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.aside>
  )
}

export function AnimatedBreadcrumb({ items }: { items: string[] }) {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "hover:text-primary cursor-pointer",
              index === items.length - 1 ? "text-primary font-medium" : "text-muted-foreground"
            )}
          >
            {item}
          </motion.span>
          {index < items.length - 1 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.05 }}
              className="text-muted-foreground"
            >
              /
            </motion.span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export function AnimatedTabs({ tabs }: { tabs: { label: string; content: React.ReactNode }[] }) {
  const [activeTab, setActiveTab] = React.useState(0)

  return (
    <div className="w-full">
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <motion.button
            key={index}
            className={cn(
              "px-4 py-2 text-sm font-medium relative",
              activeTab === index ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab(index)}
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
          >
            {tab.label}
            {activeTab === index && (
              <motion.div
                layoutId="activeTabLine"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-4"
        >
          {tabs[activeTab].content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function AnimatedDropdown({ 
  trigger, 
  items 
}: { 
  trigger: React.ReactNode
  items: { label: string; onClick: () => void }[]
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50"
          >
            {items.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                onClick={() => {
                  item.onClick()
                  setIsOpen(false)
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}