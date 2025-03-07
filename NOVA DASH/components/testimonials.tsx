import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "GenesisSim transformed how I understand procedural generation. The interactive exercises made complex concepts accessible and fun to learn.",
      name: "Alex Johnson",
      title: "Computer Science Student",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The visualization tools are incredible. Being able to see my code create entire planets and ecosystems in real-time was mind-blowing.",
      name: "Samantha Lee",
      title: "Game Developer",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "As an astronomy enthusiast with basic coding skills, I was worried this would be too advanced. The AI tutor adapted perfectly to my pace.",
      name: "Michael Chen",
      title: "Astronomy Hobbyist",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Student Experiences</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from students who have used GenesisSim to master procedural universe simulation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card">
              <CardHeader>
                <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </CardHeader>
              <CardContent className="text-lg">{testimonial.quote}</CardContent>
              <CardFooter className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

