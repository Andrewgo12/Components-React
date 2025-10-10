"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Play, Pause, Square, RotateCcw } from "lucide-react"
import { useState } from "react"

interface TimelineModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Keyframe {
  time: number
  scale: number
  opacity: number
  rotate: number
  x: number
}

export function TimelineModal({ open, onOpenChange }: TimelineModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration] = useState(2.5)
  const [keyframes] = useState<Keyframe[]>([
    { time: 0, scale: 1, opacity: 0, rotate: 0, x: 0 },
    { time: 0.25, scale: 1.2, opacity: 0.5, rotate: 0, x: 0 },
    { time: 0.5, scale: 1, opacity: 1, rotate: 180, x: 0 },
    { time: 1, scale: 1, opacity: 1, rotate: 360, x: 100 },
  ])

  const properties = [
    { name: "Scale", color: "bg-blue-500", start: 0, end: 0.4 },
    { name: "Opacity", color: "bg-purple-500", start: 0.2, end: 0.6 },
    { name: "Rotate", color: "bg-green-500", start: 0.4, end: 0.8 },
    { name: "Position", color: "bg-orange-500", start: 0.6, end: 1 },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Timeline de Animaciones</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Controles de reproducción */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button size="icon" variant="outline" onClick={() => setIsPlaying(false)}>
                <Square className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">Duración: {duration}s</div>
          </div>

          {/* Timeline visual */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Propiedades:</Label>
            <div className="border rounded-lg p-4 bg-muted/30 space-y-3">
              {properties.map((prop) => (
                <div key={prop.name} className="flex items-center gap-3">
                  <div className="w-20 text-sm font-medium text-muted-foreground">{prop.name}</div>
                  <div className="flex-1 h-8 bg-background rounded relative">
                    <div
                      className={`absolute h-full ${prop.color} rounded animate-in slide-in-from-left`}
                      style={{
                        left: `${prop.start * 100}%`,
                        width: `${(prop.end - prop.start) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="w-24 text-xs text-muted-foreground">
                    {prop.start}s → {prop.end * duration}s
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keyframes */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Keyframes:</Label>
            <div className="border rounded-lg p-4 bg-muted/30 space-y-2 font-mono text-xs">
              {keyframes.map((kf, index) => (
                <div key={index} className="flex items-center gap-4 text-muted-foreground">
                  <span className="font-semibold text-foreground w-12">{kf.time * 100}%</span>
                  <span>scale: {kf.scale}</span>
                  <span>opacity: {kf.opacity}</span>
                  <span>rotate: {kf.rotate}deg</span>
                  <span>x: {kf.x}px</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vista previa */}
          <div className="border rounded-lg p-8 bg-muted/30 flex items-center justify-center">
            <div
              className={`w-16 h-16 bg-primary rounded-lg ${isPlaying ? "animate-play" : ""}`}
              style={{
                animationDuration: `${duration}s`,
                animationTimingFunction: "linear",
                animationIterationCount: isPlaying ? "infinite" : "1",
              }}
            />
          </div>

          {/* Acciones */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={() => onOpenChange(false)}>Aplicar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
