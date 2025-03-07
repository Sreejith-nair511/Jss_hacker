"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Layers, Sliders, Eye, Download } from "lucide-react"

export function PlaygroundControls() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [speed, setSpeed] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [elevation, setElevation] = useState(45)

  const togglePlay = () => setIsPlaying(!isPlaying)
  const resetSimulation = () => {
    setIsPlaying(false)
    setZoom(1)
    setSpeed(1)
    setRotation(0)
    setElevation(45)
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Controls</h3>
          <Button variant="outline" size="sm" onClick={resetSimulation}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="flex justify-center space-x-2">
          <Button variant={isPlaying ? "default" : "outline"} size="sm" onClick={togglePlay} className="w-24">
            {isPlaying ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Play
              </>
            )}
          </Button>

          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <Tabs defaultValue="camera">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="camera">Camera</TabsTrigger>
            <TabsTrigger value="layers">Layers</TabsTrigger>
            <TabsTrigger value="params">Parameters</TabsTrigger>
          </TabsList>

          <TabsContent value="camera" className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Zoom</Label>
                <span className="text-sm">{zoom.toFixed(1)}x</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Slider
                  value={[zoom]}
                  min={0.5}
                  max={3}
                  step={0.1}
                  onValueChange={(value) => setZoom(value[0])}
                  className="flex-1"
                />
                <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(3, zoom + 0.1))}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Rotation</Label>
                <span className="text-sm">{rotation}°</span>
              </div>
              <Slider value={[rotation]} min={0} max={360} step={1} onValueChange={(value) => setRotation(value[0])} />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Elevation</Label>
                <span className="text-sm">{elevation}°</span>
              </div>
              <Slider value={[elevation]} min={0} max={90} step={1} onValueChange={(value) => setElevation(value[0])} />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Animation Speed</Label>
                <span className="text-sm">{speed.toFixed(1)}x</span>
              </div>
              <Slider value={[speed]} min={0.1} max={3} step={0.1} onValueChange={(value) => setSpeed(value[0])} />
            </div>
          </TabsContent>

          <TabsContent value="layers" className="pt-2">
            <Accordion type="multiple" defaultValue={["terrain", "water"]}>
              <AccordionItem value="terrain">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center">
                    <Layers className="mr-2 h-4 w-4" />
                    Terrain
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-terrain">Visible</Label>
                      <Switch id="show-terrain" defaultChecked />
                    </div>
                    <div>
                      <Label className="mb-1 block">Opacity</Label>
                      <Slider defaultValue={[100]} max={100} step={1} />
                    </div>
                    <div>
                      <Label className="mb-1 block">Height Scale</Label>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="water">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Water
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-water">Visible</Label>
                      <Switch id="show-water" defaultChecked />
                    </div>
                    <div>
                      <Label className="mb-1 block">Opacity</Label>
                      <Slider defaultValue={[80]} max={100} step={1} />
                    </div>
                    <div>
                      <Label className="mb-1 block">Water Level</Label>
                      <Slider defaultValue={[30]} max={100} step={1} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="water-animation">Animation</Label>
                      <Switch id="water-animation" defaultChecked />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="vegetation">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M17 14V2" />
                      <path d="M9 18.12 3 14v-4l6-3.09" />
                      <path d="M9 18.12 15 14v-4l-6-3.09" />
                      <path d="M13 14V9" />
                      <path d="M17 14V9" />
                      <path d="M21 14V9" />
                      <path d="M9 18.12V22" />
                    </svg>
                    Vegetation
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-vegetation">Visible</Label>
                      <Switch id="show-vegetation" defaultChecked />
                    </div>
                    <div>
                      <Label className="mb-1 block">Density</Label>
                      <Slider defaultValue={[60]} max={100} step={1} />
                    </div>
                    <div>
                      <Label className="mb-1 block">Variety</Label>
                      <Slider defaultValue={[70]} max={100} step={1} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="params" className="space-y-4 pt-2">
            <div>
              <Label htmlFor="seed" className="mb-1 block">
                Random Seed
              </Label>
              <div className="flex space-x-2">
                <Input id="seed" type="number" defaultValue="42" />
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </Button>
              </div>
            </div>

            <div>
              <Label className="mb-1 block">Noise Scale</Label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>

            <div>
              <Label className="mb-1 block">Octaves</Label>
              <Slider defaultValue={[6]} min={1} max={12} step={1} />
            </div>

            <div>
              <Label className="mb-1 block">Persistence</Label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>

            <div>
              <Label className="mb-1 block">Lacunarity</Label>
              <Slider defaultValue={[20]} min={10} max={40} step={1} />
            </div>

            <Button className="w-full mt-2">
              <Sliders className="mr-2 h-4 w-4" />
              Apply Parameters
            </Button>
          </TabsContent>
        </Tabs>

        <div className="border rounded-md p-3 bg-muted/30">
          <h4 className="font-medium mb-2 flex items-center">
            <Eye className="mr-2 h-4 w-4" />
            Simulation Stats
          </h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Resolution:</span>
              <span>512 x 512</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frame Rate:</span>
              <span>60 FPS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Render Time:</span>
              <span>124 ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Memory Usage:</span>
              <span>256 MB</span>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

