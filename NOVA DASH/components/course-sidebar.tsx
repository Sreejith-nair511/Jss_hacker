"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { BookOpen, Code, Play, CheckCircle, Circle, ChevronLeft } from "lucide-react"

export function CourseSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  // Course modules data
  const modules = [
    {
      id: "module-1",
      title: "Introduction to Procedural Generation",
      lessons: [
        { id: "lesson-1-1", title: "What is Procedural Generation?", completed: true, type: "learn" },
        { id: "lesson-1-2", title: "History and Applications", completed: true, type: "learn" },
        { id: "lesson-1-3", title: "Setting Up Your Environment", completed: false, type: "code" },
      ],
    },
    {
      id: "module-2",
      title: "Noise Functions",
      lessons: [
        { id: "lesson-2-1", title: "Random Number Generators", completed: true, type: "learn" },
        { id: "lesson-2-2", title: "Understanding Noise Functions", completed: false, type: "learn", current: true },
        { id: "lesson-2-3", title: "Implementing Perlin Noise", completed: false, type: "code" },
        { id: "lesson-2-4", title: "Visualizing Noise", completed: false, type: "visualize" },
      ],
    },
    {
      id: "module-3",
      title: "Terrain Generation",
      lessons: [
        { id: "lesson-3-1", title: "Height Maps", completed: false, type: "learn" },
        { id: "lesson-3-2", title: "Erosion Simulation", completed: false, type: "learn" },
        { id: "lesson-3-3", title: "Terrain Visualization", completed: false, type: "visualize" },
      ],
    },
    {
      id: "module-4",
      title: "Advanced Techniques",
      lessons: [
        { id: "lesson-4-1", title: "Fractal Algorithms", completed: false, type: "learn" },
        { id: "lesson-4-2", title: "Voronoi Diagrams", completed: false, type: "code" },
        { id: "lesson-4-3", title: "L-Systems", completed: false, type: "code" },
      ],
    },
    {
      id: "module-5",
      title: "Final Project",
      lessons: [
        { id: "lesson-5-1", title: "Project Planning", completed: false, type: "learn" },
        { id: "lesson-5-2", title: "Implementation", completed: false, type: "code" },
        { id: "lesson-5-3", title: "Optimization", completed: false, type: "code" },
      ],
    },
  ]

  // Function to get icon based on lesson type
  const getLessonIcon = (type: string) => {
    switch (type) {
      case "learn":
        return <BookOpen className="h-4 w-4" />
      case "code":
        return <Code className="h-4 w-4" />
      case "visualize":
        return <Play className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  if (collapsed) {
    return (
      <Card className="h-[calc(100vh-10rem)] sticky top-20">
        <CardContent className="p-2">
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(false)} className="mb-4 w-full">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="space-y-4">
            {modules.map((module, index) => (
              <div key={module.id} className="flex justify-center">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  {index + 1}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-[calc(100vh-10rem)] sticky top-20">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Course Content</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(true)} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-14rem)]">
          <Accordion type="multiple" defaultValue={["module-2"]} className="px-4">
            {modules.map((module, moduleIndex) => (
              <AccordionItem key={module.id} value={module.id}>
                <AccordionTrigger className="py-3 text-sm hover:no-underline">
                  <span className="flex items-center">
                    <span className="bg-muted w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">
                      {moduleIndex + 1}
                    </span>
                    {module.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8 space-y-1">
                    {module.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href="#"
                        className={`flex items-center py-2 px-3 text-sm rounded-md ${
                          lesson.current ? "bg-primary/10 text-primary" : "hover:bg-muted"
                        }`}
                      >
                        <span className="mr-2">
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                        </span>
                        <span className="mr-2">{getLessonIcon(lesson.type)}</span>
                        {lesson.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

