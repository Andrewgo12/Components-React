"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, Check, Download, Code2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CodeExporterProps {
  component: any
  isOpen: boolean
  onClose: () => void
}

export function CodeExporter({ component, isOpen, onClose }: CodeExporterProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  if (!component) return null

  // Generar código React del componente
  const generateReactCode = () => {
    const { type, props = {} } = component
    const lines: string[] = []

    // Imports necesarios
    lines.push(`import { ${getComponentImport(type)} } from "@/components/ui/${getComponentFile(type)}"`)
    if (hasIcons(props)) {
      lines.push(`import * as Icons from "@/components/icons"`)
    }
    lines.push(``)

    // Función del componente
    lines.push(`export function ${toPascalCase(type)}Component() {`)
    lines.push(`  return (`)
    lines.push(generateComponentJSX(type, props, 2))
    lines.push(`  )`)
    lines.push(`}`)

    return lines.join('\n')
  }

  // Generar código HTML puro
  const generateHTMLCode = () => {
    const { type, props = {} } = component
    return generateHTMLElement(type, props)
  }

  // Generar código CSS
  const generateCSSCode = () => {
    const { props = {} } = component
    const styles: string[] = []

    styles.push(`.${component.id} {`)
    
    if (props.colors?.background) {
      styles.push(`  background-color: ${props.colors.background};`)
    }
    if (props.colors?.text) {
      styles.push(`  color: ${props.colors.text};`)
    }
    if (props.fontSize) {
      styles.push(`  font-size: ${props.fontSize}px;`)
    }
    if (props.width) {
      styles.push(`  width: ${props.width}px;`)
    }
    if (props.height) {
      styles.push(`  height: ${props.height}px;`)
    }
    if (props.borderRadius) {
      styles.push(`  border-radius: ${props.borderRadius}px;`)
    }
    if (props.padding) {
      styles.push(`  padding: ${props.padding}px;`)
    }

    styles.push(`}`)

    return styles.join('\n')
  }

  // Generar configuración JSON
  const generateJSONConfig = () => {
    return JSON.stringify(component, null, 2)
  }

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    toast({
      title: "✅ Código copiado",
      description: "El código se ha copiado al portapapeles",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    toast({
      title: "📥 Código descargado",
      description: `Archivo ${filename} descargado`,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Exportar Código: {component.name || component.type}
          </DialogTitle>
          <DialogDescription>
            Copia o descarga el código de tu componente en diferentes formatos
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="react" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="react">React/TSX</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 mt-4">
            <TabsContent value="react" className="mt-0">
              <CodeBlock
                code={generateReactCode()}
                language="tsx"
                onCopy={() => handleCopy(generateReactCode())}
                onDownload={() => handleDownload(generateReactCode(), `${component.type}.tsx`)}
                copied={copied}
              />
            </TabsContent>

            <TabsContent value="html" className="mt-0">
              <CodeBlock
                code={generateHTMLCode()}
                language="html"
                onCopy={() => handleCopy(generateHTMLCode())}
                onDownload={() => handleDownload(generateHTMLCode(), `${component.type}.html`)}
                copied={copied}
              />
            </TabsContent>

            <TabsContent value="css" className="mt-0">
              <CodeBlock
                code={generateCSSCode()}
                language="css"
                onCopy={() => handleCopy(generateCSSCode())}
                onDownload={() => handleDownload(generateCSSCode(), `${component.type}.css`)}
                copied={copied}
              />
            </TabsContent>

            <TabsContent value="json" className="mt-0">
              <CodeBlock
                code={generateJSONConfig()}
                language="json"
                onCopy={() => handleCopy(generateJSONConfig())}
                onDownload={() => handleDownload(generateJSONConfig(), `${component.type}.json`)}
                copied={copied}
              />
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Componente auxiliar para mostrar código
function CodeBlock({ code, language, onCopy, onDownload, copied }: {
  code: string
  language: string
  onCopy: () => void
  onDownload: () => void
  copied: boolean
}) {
  return (
    <div className="relative">
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <Button
          size="sm"
          variant="secondary"
          onClick={onCopy}
          className="h-8"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Copiar
            </>
          )}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={onDownload}
          className="h-8"
        >
          <Download className="w-4 h-4 mr-1" />
          Descargar
        </Button>
      </div>
      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}

// Funciones auxiliares
function getComponentImport(type: string): string {
  const imports: Record<string, string> = {
    'button': 'Button',
    'input': 'Input',
    'card': 'Card, CardHeader, CardTitle, CardDescription, CardContent',
    'badge': 'Badge',
    'text': 'span',
  }
  return imports[type] || 'div'
}

function getComponentFile(type: string): string {
  const files: Record<string, string> = {
    'button': 'button',
    'input': 'input',
    'card': 'card',
    'badge': 'badge',
  }
  return files[type] || type
}

function hasIcons(props: any): boolean {
  return props.showIcon || props.icon
}

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

function generateComponentJSX(type: string, props: any, indent: number = 0): string {
  const spaces = ' '.repeat(indent)
  const lines: string[] = []

  switch (type) {
    case 'button':
      lines.push(`${spaces}<Button`)
      if (props.className) lines.push(`${spaces}  className="${props.className}"`)
      lines.push(`${spaces}  style={{`)
      if (props.colors?.background) lines.push(`${spaces}    backgroundColor: '${props.colors.background}',`)
      if (props.colors?.text) lines.push(`${spaces}    color: '${props.colors.text}',`)
      if (props.fontSize) lines.push(`${spaces}    fontSize: '${props.fontSize}px',`)
      lines.push(`${spaces}  }}`)
      lines.push(`${spaces}>`)
      lines.push(`${spaces}  ${props.text || 'Button'}`)
      lines.push(`${spaces}</Button>`)
      break

    case 'card':
      lines.push(`${spaces}<Card>`)
      lines.push(`${spaces}  <CardHeader>`)
      lines.push(`${spaces}    <CardTitle>${props.title || 'Title'}</CardTitle>`)
      if (props.description) {
        lines.push(`${spaces}    <CardDescription>${props.description}</CardDescription>`)
      }
      lines.push(`${spaces}  </CardHeader>`)
      if (props.content) {
        lines.push(`${spaces}  <CardContent>`)
        lines.push(`${spaces}    ${props.content}`)
        lines.push(`${spaces}  </CardContent>`)
      }
      lines.push(`${spaces}</Card>`)
      break

    default:
      lines.push(`${spaces}<div className="${type}">`)
      lines.push(`${spaces}  {/* ${type} component */}`)
      lines.push(`${spaces}</div>`)
  }

  return lines.join('\n')
}

function generateHTMLElement(type: string, props: any): string {
  const lines: string[] = []

  switch (type) {
    case 'button':
      lines.push(`<button`)
      lines.push(`  class="btn ${props.className || ''}"`)
      lines.push(`  style="`)
      if (props.colors?.background) lines.push(`    background-color: ${props.colors.background};`)
      if (props.colors?.text) lines.push(`    color: ${props.colors.text};`)
      if (props.fontSize) lines.push(`    font-size: ${props.fontSize}px;`)
      lines.push(`  "`)
      lines.push(`>`)
      lines.push(`  ${props.text || 'Button'}`)
      lines.push(`</button>`)
      break

    case 'card':
      lines.push(`<div class="card">`)
      lines.push(`  <div class="card-header">`)
      lines.push(`    <h3 class="card-title">${props.title || 'Title'}</h3>`)
      if (props.description) {
        lines.push(`    <p class="card-description">${props.description}</p>`)
      }
      lines.push(`  </div>`)
      if (props.content) {
        lines.push(`  <div class="card-content">`)
        lines.push(`    ${props.content}`)
        lines.push(`  </div>`)
      }
      lines.push(`</div>`)
      break

    default:
      lines.push(`<div class="${type}">`)
      lines.push(`  <!-- ${type} component -->`)
      lines.push(`</div>`)
  }

  return lines.join('\n')
}
