import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageTransition } from "@/components/page-transition"

const courseModules = [
  {
    id: "fundamentals",
    title: "Fundamentals of Procedural Generation",
    description: "Learn the core concepts of procedural generation and how to implement them in Python.",
    image: "/images/fundamentals.jpg",
    lessons: 5,
    duration: "2 hours",
    difficulty: "Beginner",
    category: "basics",
    tags: ["python", "algorithms", "math"],
  },
  {
    id: "celestial-bodies",
    title: "Celestial Body Generation",
    description: "Create stars, planets, and moons with realistic properties and appearances.",
    image: "/images/celestial-bodies.jpg",
    lessons: 7,
    duration: "3 hours",
    difficulty: "Intermediate",
    category: "astronomy",
    tags: ["physics", "astronomy", "3D"],
  },
  {
    id: "terrain",
    title: "Terrain & Atmosphere Simulation",
    description: "Generate realistic planetary surfaces, weather patterns, and atmospheric conditions.",
    image: "/images/terrain.jpg",
    lessons: 6,
    duration: "2.5 hours",
    difficulty: "Intermediate",
    category: "geography",
    tags: ["noise", "geography", "climate"],
  },
  {
    id: "ecosystems",
    title: "Ecosystem & Life Simulation",
    description: "Simulate evolution, ecosystems, and life forms with complex behaviors.",
    image: "/images/ecosystems.jpg",
    lessons: 8,
    duration: "4 hours",
    difficulty: "Advanced",
    category: "biology",
    tags: ["biology", "evolution", "agents"],
  },
  {
    id: "ai-systems",
    title: "AI-Driven Simulation Systems",
    description: "Implement AI to create self-evolving and adapting universe simulations.",
    image: "/images/ai-systems.jpg",
    lessons: 9,
    duration: "5 hours",
    difficulty: "Advanced",
    category: "ai",
    tags: ["ai", "machine-learning", "neural-networks"],
  },
  {
    id: "capstone",
    title: "Capstone Project: Complete Universe",
    description: "Build your own complete universe simulation combining all learned techniques.",
    image: "/images/capstone.jpg",
    lessons: 4,
    duration: "6 hours",
    difficulty: "Expert",
    category: "project",
    tags: ["project", "integration", "optimization"],
  },
]

export default function CoursesPage() {
  return (
    <PageTransition>
      <main className="min-h-screen flex flex-col">
        <NavBar />

        <div className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Course Catalog</h1>
                <p className="text-muted-foreground">
                  Explore our comprehensive curriculum on procedural universe simulation
                </p>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="font-medium">{courseModules.length} Courses Available</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filters sidebar */}
              <div className="w-full lg:w-1/4 space-y-6">
                <div className="bg-card rounded-lg border p-4">
                  <h3 className="font-medium mb-4">Search Courses</h3>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search by keyword..." className="pl-8" />
                  </div>
                </div>

                <div className="bg-card rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Filters</h3>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      Reset
                    </Button>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Difficulty</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="All Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Duration</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Any Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Duration</SelectItem>
                        <SelectItem value="short">Under 2 hours</SelectItem>
                        <SelectItem value="medium">2-4 hours</SelectItem>
                        <SelectItem value="long">4+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Category</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="basics">Basics</SelectItem>
                        <SelectItem value="astronomy">Astronomy</SelectItem>
                        <SelectItem value="geography">Geography</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="ai">AI & Machine Learning</SelectItem>
                        <SelectItem value="project">Projects</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </Button>
                </div>
              </div>

              {/* Course listings */}
              <div className="w-full lg:w-3/4">
                <Tabs defaultValue="all" className="w-full">
                  <div className="flex justify-between items-center mb-6">
                    <TabsList>
                      <TabsTrigger value="all">All Courses</TabsTrigger>
                      <TabsTrigger value="beginner">Beginner</TabsTrigger>
                      <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>

                    <Select defaultValue="newest">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <TabsContent value="all" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {courseModules.map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="beginner" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {courseModules
                        .filter((course) => course.difficulty === "Beginner")
                        .map((course) => (
                          <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="intermediate" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {courseModules
                        .filter((course) => course.difficulty === "Intermediate")
                        .map((course) => (
                          <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {courseModules
                        .filter((course) => course.difficulty === "Advanced" || course.difficulty === "Expert")
                        .map((course) => (
                          <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  )
}

