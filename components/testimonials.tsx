import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-semibold mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Client Success Stories</h2>
          <p className="text-muted-foreground text-lg">
            As I build my coaching practice, I'm excited to share success stories from clients I'm working with. Check back soon to see their progress!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardContent className="py-16 px-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                I'm currently working with amazing clients on their strength, mobility, and wellness goals. Their testimonials will be featured here soon!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
