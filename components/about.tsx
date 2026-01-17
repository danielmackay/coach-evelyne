import { Award, Heart, Target, Users } from "lucide-react"

const highlights = [
  {
    icon: Award,
    title: "Fully Qualified",
    description: "Certificate III & IV in Fitness with up-to-date knowledge and training methods.",
  },
  {
    icon: Heart,
    title: "Personalized Attention",
    description: "Dedicated focus on each client with customized programs for your unique needs.",
  },
  {
    icon: Target,
    title: "Specialized Focus",
    description: "Expert training in strength, mobility, women's health, gymnastics, and longevity.",
  },
  {
    icon: Users,
    title: "40+ Specialist",
    description: "Passionate about helping clients over 40 build strength and move better.",
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Your Partner in Strength & Movement</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Hi, I'm Evelyne! I'm a qualified personal trainer with Certificate III and IV in Fitness, and I'm passionate about helping people discover their strength and move better every day.
                </p>
                <p>
                  My approach is simple: personalized training that focuses on what matters most to you. Whether you're looking to build strength, improve mobility, focus on women's health, explore gymnastics movements, or train for longevity (especially if you're over 40), I'm here to guide you every step of the way.
                </p>
                <p>
                  I offer in-person training throughout Coolum and the Sunshine Coast—at the gym, your home, or outdoors. With a smaller client base, you'll get my full attention and a program designed specifically for your goals and lifestyle.
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
