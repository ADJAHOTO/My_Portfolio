import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface SkillBadgeProps {
  name: string
  icon: ReactNode
}

export function SkillBadge({ name, icon }: SkillBadgeProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:border-primary/50">
      <CardContent className="flex items-center justify-center gap-2 p-4">
        <span className="text-primary">{icon}</span>
        <span className="font-medium">{name}</span>
      </CardContent>
    </Card>
  )
}
