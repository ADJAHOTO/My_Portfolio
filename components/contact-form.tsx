"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message envoyé !",
        description: "Merci pour votre message. Je vous répondrai dans les plus brefs délais.",
      })
      // Reset form
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  const formControls = [
    { id: "name", label: "Nom", type: "text", value: formState.name, required: true },
    { id: "email", label: "Email", type: "email", value: formState.email, required: true },
    { id: "subject", label: "Sujet", type: "text", value: formState.subject, required: true },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {formControls.map((control, index) => (
          <motion.div
            key={control.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="space-y-2"
          >
            <Label htmlFor={control.id} className="text-sm font-medium">
              {control.label}
            </Label>
            <div className="relative">
              <Input
                id={control.id}
                name={control.id}
                type={control.type}
                placeholder={`Votre ${control.label.toLowerCase()}`}
                value={control.value}
                onChange={handleChange}
                required={control.required}
                className="border-primary/20 bg-background/50 backdrop-blur-md focus-visible:ring-primary/50"
              />
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-primary origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: control.value ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="space-y-2"
      >
        <Label htmlFor="message" className="text-sm font-medium">
          Message
        </Label>
        <div className="relative">
          <Textarea
            id="message"
            name="message"
            placeholder="Votre message"
            value={formState.message}
            onChange={handleChange}
            required
            className="min-h-[150px] border-primary/20 bg-background/50 backdrop-blur-md focus-visible:ring-primary/50"
          />
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] w-full bg-primary origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: formState.message ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full overflow-hidden bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
        >
          <motion.span
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="h-5 w-5 border-2 border-t-transparent border-white rounded-full"
            />
          ) : (
            <>
              Envoyer
              <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </motion.div>
    </form>
  )
}
