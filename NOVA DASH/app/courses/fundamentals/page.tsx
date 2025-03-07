import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PythonEditor } from "@/components/python-editor"
import { SimulationViewer } from "@/components/simulation-viewer"
import { CourseSidebar } from "@/components/course-sidebar"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, Code, Play, CheckCircle2 } from "lucide-react"

export default function FundamentalsPage() {
  // Course content
  const courseContent = {
    title: "Fundamentals of Procedural Generation",
    description: "Learn the core concepts of procedural generation and how to implement them in Python",
    progress: 25,
    currentLesson: 2,
    totalLessons: 5,
    objectives: [
      "Understand the principles of procedural content generation",
      "Learn how to use random number generators effectively",
      "Master basic noise functions like Perlin and Simplex noise",
      "Implement your first procedural generator in Python",
    ],
    prerequisites: [
      "Basic Python knowledge",
      "Understanding of basic mathematics (algebra, trigonometry)",
      "Familiarity with programming concepts",
    ],
  }

  // Python code example for this lesson
  const noiseGeneratorCode = `import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap

def generate_perlin_noise(width, height, scale=10.0, octaves=6, persistence=0.5, lacunarity=2.0, seed=None):
    """Generate a 2D Perlin noise array"""
    if seed is not None:
        np.random.seed(seed)
        
    # Create an empty noise array
    noise = np.zeros((height, width))
    
    # Generate Perlin noise by summing octaves
    max_amplitude = 0
    amplitude = 1.0
    frequency = 1.0
    
    for i in range(octaves):
        # Generate random gradient vectors
        grid = np.random.rand(int(height/scale*frequency)+1, int(width/scale*frequency)+1) * 2 - 1
        
        # For each pixel, compute the dot product between the gradient vectors and distance vectors
        for y in range(height):
            for x in range(width):
                # Compute grid cell coordinates
                grid_y = int(y / scale * frequency)
                grid_x = int(x / scale * frequency)
                
                # Compute local coordinates within the grid cell (0 to 1)
                local_y = (y / scale * frequency) - grid_y
                local_x = (x / scale * frequency) - grid_x
                
                # Get gradients from grid
                g00 = grid[grid_y, grid_x]
                g01 = grid[grid_y, grid_x+1]
                g10 = grid[grid_y+1, grid_x]
                g11 = grid[grid_y+1, grid_x+1]
                
                # Compute dot products
                v00 = g00 * local_x + g00 * local_y
                v01 = g01 * (local_x - 1) + g01 * local_y
                v10 = g10 * local_x + g10 * (local_y - 1)
                v11 = g11 * (local_x - 1) + g11 * (local_y - 1)
                
                # Bilinear interpolation
                wx = local_x * local_x * (3 - 2 * local_x)
                wy = local_y * local_y * (3 - 2 * local_y)
                
                vx0 = v00 + wx * (v01 - v00)
                vx1 = v10 + wx * (v11 - v10)
                value = vx0 + wy * (vx1 - vx0)
                
                # Add noise value to the result
                noise[y, x] += value * amplitude
        
        # Update parameters for next octave
        max_amplitude += amplitude
        amplitude *= persistence
        frequency *= lacunarity
    
    # Normalize noise to range [-1, 1]
    noise = noise / max_amplitude
    
    return noise

# Generate noise with different parameters
width, height = 256, 256
noise1 = generate_perlin_noise(width, height, scale=20.0, seed=42)
noise2 = generate_perlin_noise(width, height, scale=10.0, seed=42)
noise3 = generate_perlin_noise(width, height, scale=5.0, seed=42)

# Create a custom colormap for terrain-like visualization
colors = [(0, 0, 0.5), (0, 0, 1), (0, 0.5, 1), (0, 1, 0), (0.5, 1, 0), 
          (1, 1, 0), (1, 0.5, 0), (1, 0, 0), (0.5, 0, 0)]
terrain_cmap = LinearSegmentedColormap.from_list('terrain', colors)

# Plot the noise
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

axes[0].imshow(noise1, cmap=terrain_cmap)
axes[0].set_title('Large Scale (Mountains)')
axes[0].axis('off')

axes[1].imshow(noise2, cmap=terrain_cmap)
axes[1].set_title('Medium Scale (Hills)')
axes[1].axis('off')

axes[2].imshow(noise3, cmap=terrain_cmap)
axes[2].set_title('Small Scale (Details)')
axes[2].axis('off')

plt.tight_layout()
plt.show()

print("Perlin noise generation complete!")
print("These noise patterns can be used to create terrain, clouds, textures, and more.")
print("Try experimenting with different parameters to see how they affect the output.")
`

  return (
    <main className="min-h-screen flex flex-col">
      <NavBar />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-20 lg:self-start">
            <CourseSidebar />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{courseContent.title}</h1>
                  <p className="text-muted-foreground">{courseContent.description}</p>
                </div>
                <Badge className="w-fit" variant="outline">
                  Lesson {courseContent.currentLesson} of {courseContent.totalLessons}
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{courseContent.progress}%</span>
                  </div>
                  <Progress value={courseContent.progress} className="h-2" />
                </div>
                <Button variant="outline" size="sm" className="whitespace-nowrap">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mark as Complete
                </Button>
              </div>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Lesson 2: Understanding Noise Functions</CardTitle>
                <CardDescription>
                  Learn how to use Perlin and Simplex noise to create natural-looking procedural content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <h3>What are Noise Functions?</h3>
                  <p>
                    Noise functions are mathematical algorithms that generate pseudo-random patterns with
                    natural-looking properties. Unlike pure randomness, noise functions create smooth, continuous values
                    that can be used to simulate natural phenomena like terrain, clouds, and textures.
                  </p>

                  <h4>Key Noise Functions:</h4>
                  <ul>
                    <li>
                      <strong>Perlin Noise</strong> - Developed by Ken Perlin in 1983, this gradient noise function
                      creates smooth, natural-looking patterns.
                    </li>
                    <li>
                      <strong>Simplex Noise</strong> - An improved version of Perlin noise that addresses some of its
                      limitations, particularly in higher dimensions.
                    </li>
                    <li>
                      <strong>Value Noise</strong> - A simpler form of noise that interpolates between random values at
                      grid points.
                    </li>
                    <li>
                      <strong>Worley Noise (Cellular Noise)</strong> - Creates patterns based on the distance to feature
                      points, useful for textures like cells or cracks.
                    </li>
                  </ul>

                  <h3>Learning Objectives</h3>
                  <ul>
                    {courseContent.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>

                  <h3>Prerequisites</h3>
                  <ul>
                    {courseContent.prerequisites.map((prerequisite, index) => (
                      <li key={index}>{prerequisite}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="learn">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="learn">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Learn
                </TabsTrigger>
                <TabsTrigger value="code">
                  <Code className="h-4 w-4 mr-2" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="visualize">
                  <Play className="h-4 w-4 mr-2" />
                  Visualize
                </TabsTrigger>
              </TabsList>

              <TabsContent value="learn" className="p-4 border rounded-md mt-2">
                <h3 className="text-xl font-bold mb-4">Understanding Perlin Noise</h3>
                <p className="mb-4">
                  Perlin noise is a type of gradient noise developed by Ken Perlin in 1983. It's widely used in computer
                  graphics to produce natural-looking textures and terrain.
                </p>

                <h4 className="text-lg font-semibold mb-2">How Perlin Noise Works:</h4>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li>A grid of random gradient vectors is generated</li>
                  <li>
                    For each point, the dot product is calculated between the gradient vectors at the corners of the
                    cell and the distance vectors
                  </li>
                  <li>These values are interpolated to produce a smooth value at the point</li>
                  <li>Multiple octaves (layers) of noise can be combined to add detail</li>
                </ol>

                <h4 className="text-lg font-semibold mb-2">Key Parameters:</h4>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    <strong>Scale</strong> - Controls the zoom level of the noise
                  </li>
                  <li>
                    <strong>Octaves</strong> - Number of layers of noise to combine
                  </li>
                  <li>
                    <strong>Persistence</strong> - How much each octave contributes to the final result
                  </li>
                  <li>
                    <strong>Lacunarity</strong> - How much detail is added at each octave
                  </li>
                  <li>
                    <strong>Seed</strong> - Value to initialize the random number generator for reproducible results
                  </li>
                </ul>

                <div className="bg-muted p-4 rounded-md mb-4">
                  <h4 className="font-semibold mb-2">Pro Tip:</h4>
                  <p>
                    When using noise functions for terrain generation, try combining multiple noise functions at
                    different scales. Use larger scale noise for major terrain features like mountains and valleys, and
                    smaller scale noise for details like rocks and texture.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="code" className="mt-2">
                <PythonEditor initialCode={noiseGeneratorCode} />
              </TabsContent>

              <TabsContent value="visualize" className="mt-2">
                <SimulationViewer />
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-6">
              <Link href="/courses/introduction">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Lesson
                </Button>
              </Link>
              <Link href="/courses/fundamentals/lesson-3">
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

