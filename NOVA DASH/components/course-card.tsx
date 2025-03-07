import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, BookOpen, ArrowRight, Star } from "lucide-react"

interface CourseProps {
  course: {
    id: string
    title: string
    description: string
    image: string
    lessons: number
    duration: string
    difficulty: string
    category: string
    tags: string[]
  }
}

export function CourseCard({ course }: CourseProps) {
  // Function to determine badge color based on difficulty
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "Intermediate":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "Advanced":
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
      case "Expert":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className={`absolute top-3 right-3 ${getDifficultyColor(course.difficulty)}`}>{course.difficulty}</Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{course.title}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <p className="text-muted-foreground line-clamp-2">{course.description}</p>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <BookOpen className="mr-1 h-4 w-4" />
            {course.lessons} lessons
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {course.duration}
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto pt-4">
        <Link href={`/courses/${course.id}`} className="w-full">
          <Button className="w-full justify-between">
            View Course
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

