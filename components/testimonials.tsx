import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah M.",
    role: "Lost 30 lbs in 6 months",
    content:
      "Evelyne completely changed my relationship with fitness. Her approach is so supportive and encouraging—she made me believe I could achieve things I never thought possible.",
    image: "/woman-portrait-headshot-smiling-professional.jpg",
  },
  {
    name: "Michael T.",
    role: "Marathon finisher",
    content:
      "I came to Evelyne with no athletic background, and she helped me complete my first marathon. Her training programs are challenging but achievable, and she's always there when you need motivation.",
    image: "/man-portrait-headshot-smiling-athletic.jpg",
  },
  {
    name: "Jennifer L.",
    role: "Post-pregnancy fitness",
    content:
      "After having twins, I didn't know where to start. Evelyne created a safe, effective program that helped me regain my strength and confidence. She's not just a trainer—she's a true partner in your journey.",
    image: "/woman-portrait-headshot-smiling-confident.jpg",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-semibold mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Real Stories, Real Results</h2>
          <p className="text-muted-foreground text-lg">
            Don't just take my word for it. Here's what some of my amazing clients have to say about their
            transformation journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="relative">
              <CardContent className="pt-8 pb-6">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />
                <p className="text-muted-foreground leading-relaxed mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
