"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface CodeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  components: any[]
}

export function CodeModal({ open, onOpenChange, components }: CodeModalProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const generateCode = () => {
    if (components.length === 0) {
      return "// No hay componentes para generar código\n// Agrega componentes al canvas para ver el código generado"
    }

    const imports = new Set(['React'])
    const componentCode = components.map(component => {
      const { type, props, position } = component
      
      switch (type) {
        case 'button':
          return `    <button
      className="px-4 py-2 rounded-lg transition-all hover:scale-105"
      style={{
        position: 'absolute',
        left: '${position?.x || 0}px',
        top: '${position?.y || 0}px',
        backgroundColor: '${props.colors?.background || '#3b82f6'}',
        color: '${props.colors?.text || '#ffffff'}',
        ${props.effects?.glow?.enabled ? `boxShadow: '0 0 ${props.effects.glow.intensity}px ${props.effects.glow.color}',` : ''}
      }}
    >
      ${props.text || 'Button'}
    </button>`
        
        case 'card':
          return `    <div
      className="p-4 rounded-lg shadow-lg"
      style={{
        position: 'absolute',
        left: '${position?.x || 0}px',
        top: '${position?.y || 0}px',
        backgroundColor: '${props.colors?.background || '#ffffff'}',
        ${props.effects?.glass?.enabled ? `backdropFilter: 'blur(${props.effects.glass.blur}px)',` : ''}
      }}
    >
      <h3 className="font-semibold">${props.title || 'Card Title'}</h3>
      <p className="text-sm text-gray-600">${props.description || 'Card description'}</p>
    </div>`
        
        case 'input':
          return `    <input
      type="text"
      placeholder="${props.placeholder || 'Enter text...'}"
      className="px-3 py-2 border rounded-lg"
      style={{
        position: 'absolute',
        left: '${position?.x || 0}px',
        top: '${position?.y || 0}px',
      }}
    />`
        
        default:
          return `    <div
      className="p-4 border rounded-lg"
      style={{
        position: 'absolute',
        left: '${position?.x || 0}px',
        top: '${position?.y || 0}px',
      }}
    >
      {/* ${type} component */}
    </div>`
      }
    }).join('\n\n')

    return `import React from 'react';

export const GeneratedComponent = () => {
  return (
    <div className="relative w-full h-full">
${componentCode}
    </div>
  );
};

export default GeneratedComponent;`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    toast({
      title: "Código copiado",
      description: "El código ha sido copiado al portapapeles",
      variant: "default",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Código Generado</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="absolute top-2 right-2 z-10 bg-transparent"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>

          <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[60vh] text-sm font-mono">
            <code>{generateCode()}</code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  )
}
