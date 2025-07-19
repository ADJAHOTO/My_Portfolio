"use client"

import { motion } from "framer-motion"

interface TimelineItemProps {
  year: string
  title: string
  company: string
  description: string
}

export function TimelineItem({ year, title, company, description }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative pl-8"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

      {/* Timeline dot */}
      <div className="absolute left-[-4px] top-1 h-2 w-2 rounded-full bg-primary" />

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{year}</span>
          <h4 className="text-lg font-bold">{title}</h4>
          <span className="text-muted-foreground">• {company}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}
