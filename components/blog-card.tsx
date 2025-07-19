"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  category: string
  imageUrl: string
  slug: string
  index: number
}

export function BlogCard({ title, excerpt, date, category, imageUrl, slug, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card className="group h-full overflow-hidden border-primary/20 bg-background/80 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            width={500}
            height={300}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <CardContent className="p-6">
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
            <Badge variant="secondary" className="border-primary/10 bg-primary/5">
              {category}
            </Badge>
          </div>
          <h3 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground">{excerpt}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Link href={slug} className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            Lire article
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
