import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Code, Atom, Rocket, Zap, Layers, Database } from "lucide-react"

export function CourseOverview() {
  const modules = [
    {
      id: 1,
      title: "Fundamentals of Procedural Generation",
      description: "Learn the core concepts of procedural generation and how to implement them in Python.",
      icon: <Code className="h-10 w-10 text-primary" />,
      lessons: 5,
      duration: "2 hours",
      difficulty: "Beginner",
      path: "/courses/fundamentals",
    },
    {
      id: 2,
      title: "Celestial Body Generation",
      description: "Create stars, planets, and moons with realistic properties and appearances.",
      icon: <Atom className="h-10 w-10 text-primary" />,
      lessons: 7,
      duration: "3 hours",
      difficulty: "Intermediate",
      path: "/courses/celestial-bodies",
    },
    {
      id: 3,
      title: "Terrain & Atmosphere Simulation",
      description: "Generate realistic planetary surfaces, weather patterns, and atmospheric conditions.",
      icon: <Layers className="h-10 w-10 text-primary" />,
      lessons: 6,
      duration: "2.5 hours",
      difficulty: "Intermediate",
      path: "/courses/terrain",
    },
    {
      id: 4,
      title: "Ecosystem & Life Simulation",
      description: "Simulate evolution, ecosystems, and life forms with complex behaviors.",
      icon: <Database className="h-10 w-10 text-primary" />,
      lessons: 8,
      duration: "4 hours",
      difficulty: "Advanced",
      path: "/courses/ecosystems",
    },
    {
      id: 5,
      title: "AI-Driven Simulation Systems",
      description: "Implement AI to create self-evolving and adapting universe simulations.",
      icon: <Zap className="h-10 w-10 text-primary" />,
      lessons: 9,
      duration: "5 hours",
      difficulty: "Advanced",
      path: "/courses/ai-systems",
    },
    {
      id: 6,
      title: "Capstone Project: Complete Universe",
      description: "Build your own complete universe simulation combining all learned techniques.",
      icon: <Rocket className="h-10 w-10 text-primary" />,
      lessons: 4,
      duration: "6 hours",
      difficulty: "Expert",
      path: "/courses/capstone",
    },
  ]

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Curriculum</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our structured learning path takes you from basic concepts to creating complete universe simulations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card key={module.id} className="overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="mb-2">{module.icon}</div>
                <CardTitle className="text-xl">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    {module.lessons} Lessons
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {module.duration}
                  </Badge>
                  <Badge
                    variant={
                      module.difficulty === "Beginner"
                        ? "secondary"
                        : module.difficulty === "Intermediate"
                          ? "default"
                          : module.difficulty === "Advanced"
                            ? "destructive"
                            : "outline"
                    }
                  >
                    {module.difficulty}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={module.path} className="w-full">
                  <Button variant="outline" className="w-full justify-between">
                    View Module
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/courses">
            <Button variant="default" size="lg">
              View Full Curriculum
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

