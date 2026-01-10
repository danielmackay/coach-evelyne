import { Dumbbell, Salad, Users, Video, Calendar, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: Dumbbell,
    title: "1-on-1 Personal Training",
    description:
      "Customized workout sessions tailored to your goals, fitness level, and schedule. Get hands-on guidance and real-time feedback.",
    features: ["Personalized workout plans", "Form correction", "Progress tracking"],
  },
  {
    icon: Video,
    title: "Online Coaching",
    description:
      "Train from anywhere with virtual sessions and custom programming. Perfect for busy schedules or remote clients.",
    features: ["Video call sessions", "Custom workout app", "24/7 messaging support"],
  },
  {
    icon: Salad,
    title: "Nutrition Coaching",
    description:
      "Fuel your body right with personalized meal plans and nutrition strategies that complement your training.",
    features: ["Meal planning", "Macro tracking guidance", "Sustainable eating habits"],
  },
  {
    icon: Users,
    title: "Small Group Training",
    description:
      "Train with a small group of like-minded individuals. Enjoy the energy of group workouts with personalized attention.",
    features: ["Max 6 participants", "Community support", "Cost-effective option"],
  },
  {
    icon: Calendar,
    title: "Program Design",
    description:
      "Get a complete workout program designed for your goals. Perfect for self-motivated individuals who prefer training independently.",
    features: ["4-12 week programs", "Exercise video library", "Weekly check-ins"],
  },
  {
    icon: TrendingUp,
    title: "Transformation Packages",
    description: "Comprehensive packages combining training, nutrition, and lifestyle coaching for maximum results.",
    features: ["Full body transformation", "Lifestyle coaching", "Accountability system"],
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-semibold mb-2">Services</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Programs Designed for Your Success</h2>
          <p className="text-muted-foreground text-lg">
            Choose the training option that fits your lifestyle and goals. Every program is customized to help you
            achieve lasting results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50"
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="#contact">Get Your Free Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
