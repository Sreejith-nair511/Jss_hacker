import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, BookOpen, Cpu, Users, Zap, BarChart } from "lucide-react"

export function FeatureHighlights() {
  const features = [
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "Interactive Python Coding",
      description: "Write and execute Python code directly in your browser with real-time feedback and visualization.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Structured Learning Path",
      description:
        "Follow a carefully designed curriculum that builds your skills progressively from basics to advanced concepts.",
    },
    {
      icon: <Cpu className="h-10 w-10 text-primary" />,
      title: "AI-Assisted Learning",
      description: "Get personalized guidance and hints from our AI tutor that adapts to your learning style and pace.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Real-time Visualization",
      description: "See your code come to life with stunning visualizations of your procedurally generated universes.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Community Collaboration",
      description: "Share your creations, collaborate with other learners, and get inspired by the community showcase.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: "Progress Tracking",
      description: "Track your learning journey with detailed progress metrics and skill assessments.",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform combines interactive coding, visualization, and AI-assisted learning to provide a comprehensive
            learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border bg-card text-card-foreground">
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

