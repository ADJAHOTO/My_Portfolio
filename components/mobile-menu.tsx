"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface MobileMenuProps {
  activeSection: string
  navItems: { name: string; href: string }[]
  onClose: () => void
}

export function MobileMenu({ activeSection, navItems, onClose }: MobileMenuProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="fixed inset-0 z-40 flex items-center justify-center bg-background/95 backdrop-blur-lg"
    >
      <nav className="flex flex-col items-center gap-6">
        {navItems.map((item) => (
          <motion.div key={item.name} variants={itemVariants}>
            <Link
              href={item.href}
              onClick={onClose}
              className={`text-xl font-bold transition-colors ${
                activeSection === item.href.substring(1) ? "text-primary" : "text-foreground/80 hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  )
}
