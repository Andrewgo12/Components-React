"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Rocket, Database, Layers, Zap } from "lucide-react"
import { useEffect, useState } from "react"

interface PerformanceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PerformanceModal({ open, onOpenChange }: PerformanceModalProps) {
  const [renderTime, setRenderTime] = useState(12)
  const [memory, setMemory] = useState(45)
  const [components, setComponents] = useState(8)
  const [fps, setFps] = useState(60)
  const [chartData, setChartData] = useState<number[]>([])

  useEffect(() => {
    if (open) {
      // Simular datos de performance en tiempo real
      const interval = setInterval(() => {
        setRenderTime(Math.floor(Math.random() * 20) + 8)
        setMemory(Math.floor(Math.random() * 30) + 40)
        setFps(Math.floor(Math.random() * 10) + 55)
        setChartData((prev) => [...prev.slice(-29), Math.floor(Math.random() * 60) + 30])
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [open])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success"
    if (score >= 60) return "text-warning"
    return "text-destructive"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excelente"
    if (score >= 70) return "Bueno"
    if (score >= 50) return "Normal"
    return "Mejorable"
  }

  const metrics = [
    {
      icon: Rocket,
      label: "Render Time",
      value: `${renderTime}ms`,
      score: Math.max(0, 100 - renderTime * 3),
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Database,
      label: "Memoria Usada",
      value: `${memory}MB`,
      score: Math.max(0, 100 - memory),
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Layers,
      label: "Componentes",
      value: components.toString(),
      score: Math.max(0, 100 - components * 5),
      color: "from-green-500 to-green-600",
    },
    {
      icon: Zap,
      label: "FPS",
      value: `${fps}fps`,
      score: (fps / 60) * 100,
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Monitor de Performance</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Métricas en tiempo real */}
          <div>
            <h3 className="text-sm font-medium mb-3">Métricas en Tiempo Real:</h3>
            <div className="space-y-3">
              {metrics.map((metric) => {
                const IconComponent = metric.icon
                return (
                  <div
                    key={metric.label}
                    className="border rounded-lg p-4 bg-muted/30 animate-in fade-in slide-in-from-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center`}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{metric.label}</p>
                          <p className="text-xs text-muted-foreground">{metric.value}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getScoreColor(metric.score)}>
                        {getScoreLabel(metric.score)}
                      </Badge>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Gráfico de performance */}
          <div>
            <h3 className="text-sm font-medium mb-3">Gráfico de Performance:</h3>
            <div className="border rounded-lg p-4 bg-muted/30 h-48 relative">
              <div className="absolute inset-0 p-4 flex items-end justify-between gap-1">
                {chartData.map((value, index) => (
                  <div
                    key={index}
                    style={{ height: `${value}%` }}
                    className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t"
                  />
                ))}
              </div>
              <div className="absolute top-2 left-4 text-xs text-muted-foreground">60fps</div>
              <div className="absolute top-1/2 left-4 text-xs text-muted-foreground">30fps</div>
              <div className="absolute bottom-2 left-4 text-xs text-muted-foreground">0fps</div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
