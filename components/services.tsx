import { Dumbbell, Users, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: Dumbbell,
    title: "Personal Training",
    description:
      "One-on-one training sessions tailored to your goals and fitness level. Train at the gym, your home, or outdoors in Coolum and the Sunshine Coast.",
    features: ["Customized workout programs", "In-person coaching", "Flexible training locations"],
  },
  {
    icon: Users,
    title: "Group Training",
    description:
      "Small group sessions with personalized attention. Train with friends or join a supportive group focused on similar goals.",
    features: ["Small group sizes", "Shared motivation", "Cost-effective training"],
  },
  {
    icon: Target,
    title: "Specialist Programs",
    description:
      "Targeted programs focusing on strength building, mobility improvement, women's health, gymnastics movements, longevity training, and specialized support for clients over 40.",
    features: ["Strength & mobility focus", "Women's health programs", "40+ longevity training"],
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-semibold mb-2">Services</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Training That Fits Your Goals</h2>
          <p className="text-muted-foreground text-lg">
            Choose the training option that works best for you. All programs are personalized and designed to help you build strength, improve movement, and achieve lasting results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
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
