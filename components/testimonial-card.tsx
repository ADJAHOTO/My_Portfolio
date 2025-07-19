"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  position: string
  avatar: string
  index: number
}

export function TestimonialCard({ quote, author, position, avatar, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card className="h-full overflow-hidden border-primary/20 bg-background/80 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
        <CardContent className="p-6">
          <div className="mb-4 text-primary">
            <Quote className="h-8 w-8 opacity-50" />
          </div>
          <p className="mb-6 text-muted-foreground">{quote}</p>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={avatar || "/placeholder.svg"}
                alt={author}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold">{author}</h4>
              <p className="text-sm text-muted-foreground">{position}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
