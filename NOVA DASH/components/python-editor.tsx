"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Copy, Save } from "lucide-react"

interface PythonEditorProps {
  initialCode: string
}

export function PythonEditor({ initialCode }: PythonEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const runCode = () => {
    setIsRunning(true)
    setOutput("Running code...\n")

    // In a real implementation, this would send the code to a Python execution service
    // For now, we'll simulate output
    setTimeout(() => {
      const simulatedOutput = `Star System Generated:
Star Type: Yellow Dwarf
Number of Planets: 5
  Planet 1: 0.85 Earth radii, 0.67 AU
  Planet 2: 1.23 Earth radii, 1.52 AU
  Planet 3: 0.45 Earth radii, 5.20 AU
  Planet 4: 1.89 Earth radii, 9.58 AU
  Planet 5: 0.76 Earth radii, 19.22 AU

Execution completed successfully.`

      setOutput(simulatedOutput)
      setIsRunning(false)
    }, 1500)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">Python Editor</div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={copyCode}>
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button size="sm" onClick={runCode} disabled={isRunning}>
            <Play className="h-4 w-4 mr-1" />
            Run
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-0 overflow-hidden">
          <div className="bg-muted px-4 py-2 border-b text-sm font-medium">Code</div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-[400px] p-4 font-mono text-sm bg-background resize-none focus:outline-none code-editor"
          />
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="bg-muted px-4 py-2 border-b text-sm font-medium">Output</div>
          <pre className="w-full h-[400px] p-4 font-mono text-sm bg-black text-green-400 overflow-auto">
            {output || "// Code output will appear here"}
          </pre>
        </Card>
      </div>
    </div>
  )
}

