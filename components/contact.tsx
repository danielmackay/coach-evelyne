"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { contactFormSchema, type ContactFormData } from "@/lib/email/schema"

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors: formErrors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  // Watch message field for character count
  const messageValue = watch("message") || ""

  // Clean up success message timeout on unmount
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [submitted])

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      let responseData
      try {
        responseData = await response.json()
      } catch {
        setError("Server error. Please try again later.")
        return
      }

      if (response.ok && responseData.success) {
        setSubmitted(true)
        reset()
      } else {
        setError(responseData.error || "Failed to send message. Please try again.")
      }
    } catch (err) {
      console.error("Form submission error:", err)
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-semibold mb-2">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg">
            Get in touch for a free consultation. I'd love to hear about your goals and discuss how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
              <div className="space-y-6">
                <Card>
                  <CardContent className="flex items-center gap-4 py-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href={`tel:${siteConfig.contact.phone}`} className="font-medium hover:text-primary transition-colors">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 py-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 py-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{siteConfig.contact.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="p-6 bg-primary/5 rounded-2xl">
              <h4 className="font-semibold mb-2">Free Consultation</h4>
              <p className="text-sm text-muted-foreground">
                Your first consultation is completely free. Let's discuss your goals and create a plan that works for
                you.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6 md:p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6">
                    {error && (
                      <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                        {error}
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Your first name"
                          {...register("firstName")}
                        />
                        {formErrors.firstName && (
                          <p className="text-sm text-destructive">{formErrors.firstName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Your last name"
                          {...register("lastName")}
                        />
                        {formErrors.lastName && (
                          <p className="text-sm text-destructive">{formErrors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        {...register("email")}
                      />
                      {formErrors.email && (
                        <p className="text-sm text-destructive">{formErrors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...register("phone")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="goal">What's your fitness goal?</Label>
                      <Input
                        id="goal"
                        placeholder="e.g., Lose weight, Build muscle, Improve endurance"
                        {...register("goal")}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="message">Message</Label>
                        <span className={`text-xs ${messageValue.length > 1000 ? "text-destructive" : "text-muted-foreground"}`}>
                          {messageValue.length}/1000
                        </span>
                      </div>
                      <Textarea
                        id="message"
                        placeholder="Tell me a bit about yourself and what you're looking to achieve..."
                        rows={4}
                        {...register("message")}
                      />
                      {formErrors.message && (
                        <p className="text-sm text-destructive">{formErrors.message.message}</p>
                      )}
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
