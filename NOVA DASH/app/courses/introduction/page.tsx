import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { PythonEditor } from "@/components/python-editor"
import { SimulationViewer } from "@/components/simulation-viewer"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, Code, Play } from "lucide-react"

export default function IntroductionPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <NavBar />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Course Navigation</CardTitle>
                <CardDescription>Introduction to GenesisSim</CardDescription>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Button variant="default" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Introduction
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Code className="mr-2 h-4 w-4" />
                    Python Basics
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Play className="mr-2 h-4 w-4" />
                    First Simulation
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome to GenesisSim</CardTitle>
                <CardDescription>Learn the fundamentals of procedural universe simulation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Welcome to GenesisSim, where you'll learn how to create entire universes using Python and procedural
                    generation techniques. This course will take you from basic concepts to advanced simulation systems.
                  </p>
                  <h3>What You'll Learn</h3>
                  <ul>
                    <li>Fundamentals of procedural generation in Python</li>
                    <li>Techniques for creating realistic celestial bodies</li>
                    <li>Methods for simulating terrain, atmospheres, and ecosystems</li>
                    <li>AI-driven approaches to create evolving simulations</li>
                  </ul>
                  <h3>Prerequisites</h3>
                  <p>
                    Basic knowledge of Python programming is recommended but not required. We'll cover the essentials as
                    we go.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="learn">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="learn">Learn</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="visualize">Visualize</TabsTrigger>
              </TabsList>

              <TabsContent value="learn" className="p-4 border rounded-md mt-2">
                <h3 className="text-xl font-bold mb-4">Introduction to Procedural Generation</h3>
                <p className="mb-4">
                  Procedural generation is a method of creating data algorithmically rather than manually. In the
                  context of universe simulation, it allows us to create vast, detailed worlds without having to design
                  each element by hand.
                </p>
                <p className="mb-4">The key principles of procedural generation include:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Randomness and seed values</li>
                  <li>Noise functions (Perlin, Simplex, etc.)</li>
                  <li>Fractal algorithms</li>
                  <li>Rule-based systems</li>
                </ul>
                <p>
                  In this course, we'll explore how these principles can be applied to create everything from star
                  systems to living ecosystems.
                </p>
              </TabsContent>

              <TabsContent value="code" className="mt-2">
                <PythonEditor
                  initialCode={`# Your first procedural generation code
import random
import math

def generate_star_system(seed=None):
    """Generate a simple procedural star system"""
    if seed:
        random.seed(seed)
    
    # Generate a star
    star = {
        "type": random.choice(["Red Dwarf", "Yellow Dwarf", "Blue Giant", "White Dwarf"]),
        "radius": random.uniform(0.1, 10),  # Solar radii
        "temperature": random.uniform(3000, 30000),  # Kelvin
        "planets": []
    }
    
    # Generate planets
    num_planets = random.randint(0, 8)
    for i in range(num_planets):
        planet = {
            "name": f"Planet {i+1}",
            "radius": random.uniform(0.1, 2),  # Earth radii
            "distance": random.uniform(0.4, 40),  # AU
            "has_atmosphere": random.random() > 0.5
        }
        star["planets"].append(planet)
    
    return star

# Try it with different seeds
system1 = generate_star_system(42)
print("Star System Generated:")
print(f"Star Type: {system1['type']}")
print(f"Number of Planets: {len(system1['planets'])}")
for i, planet in enumerate(system1["planets"]):
    print(f"  Planet {i+1}: {planet['radius']:.2f} Earth radii, {planet['distance']:.2f} AU")
`}
                />
              </TabsContent>

              <TabsContent value="visualize" className="mt-2">
                <SimulationViewer />
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-6">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Lesson
              </Button>
              <Link href="/courses/fundamentals">
                <Button>
                  Next Lesson
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

