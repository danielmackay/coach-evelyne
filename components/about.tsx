import { Award, Heart, Target, Users } from "lucide-react"

const highlights = [
  {
    icon: Award,
    title: "Certified Expert",
    description: "NASM certified with specialized training in functional fitness and nutrition.",
  },
  {
    icon: Heart,
    title: "Holistic Approach",
    description: "I focus on the whole person—mind, body, and lifestyle for lasting results.",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Custom programs designed around your specific goals and timeline.",
  },
  {
    icon: Users,
    title: "Supportive Community",
    description: "Join a network of like-minded individuals on their fitness journey.",
  },
]

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
              <img
                src="/female-fitness-trainer-coaching-client-gym-workout.jpg"
                alt="Evelyne coaching a client"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Accent shape */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-primary/20" />
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-primary font-semibold mb-2">About Me</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Your Partner in Health & Fitness</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Hi, I'm Evelyne! For over a decade, I've dedicated my career to helping people discover their strength
                  and transform their lives through fitness.
                </p>
                <p>
                  My journey began when I experienced firsthand how the right guidance can make all the difference. Now,
                  I bring that same passion and personalized attention to every client I work with.
                </p>
                <p>
                  Whether you're just starting out or looking to break through a plateau, I'm here to provide the
                  expertise, motivation, and accountability you need to succeed.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
