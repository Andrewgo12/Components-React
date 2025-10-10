"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileCode, Folder, File } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { downloadFile } from "@/lib/utils"

interface ExportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  components: any[]
}

export function ExportModal({ open, onOpenChange, components }: ExportModalProps) {
  const [framework, setFramework] = useState("react-tsx")
  const [options, setOptions] = useState({
    typescript: true,
    packageJson: true,
    readme: true,
    tsconfig: true,
    examples: true,
  })
  const { toast } = useToast()

  const generateComponentCode = (component: any) => {
    const { type, props, name } = component
    
    return `import React from 'react';

interface ${name}Props {
  className?: string;
  onClick?: () => void;
}

export const ${name}: React.FC<${name}Props> = ({ className, onClick }) => {
  return (
    <${type === 'button' ? 'button' : 'div'}
      className={\`${type === 'button' ? 'px-4 py-2 rounded-lg transition-all hover:scale-105' : 'p-4 rounded-lg'} \${className}\`}
      ${type === 'button' ? 'onClick={onClick}' : ''}
      style={{
        backgroundColor: '${props.colors?.background || '#3b82f6'}',
        color: '${props.colors?.text || '#ffffff'}',
      }}
    >
      ${props.text || props.title || 'Component'}
    </${type === 'button' ? 'button' : 'div'}>
  );
};

export default ${name};`
  }

  const generatePackageJson = () => {
    return JSON.stringify({
      name: 'my-components',
      version: '1.0.0',
      description: 'Generated components from ComponentsR',
      main: 'index.js',
      types: 'index.d.ts',
      scripts: {
        build: 'tsc',
        dev: 'tsc --watch'
      },
      peerDependencies: {
        react: '^18.0.0',
        'react-dom': '^18.0.0'
      },
      devDependencies: {
        '@types/react': '^18.0.0',
        '@types/react-dom': '^18.0.0',
        typescript: '^5.0.0'
      }
    }, null, 2)
  }

  const handleExport = () => {
    if (components.length === 0) {
      toast({
        title: 'Error',
        description: 'No hay componentes para exportar',
        variant: 'destructive'
      })
      return
    }

    try {
      // Generate main component file
      const mainComponent = components[0]
      const componentCode = generateComponentCode(mainComponent)
      downloadFile(componentCode, `${mainComponent.name}.tsx`, 'text/typescript')

      // Generate package.json if selected
      if (options.packageJson) {
        setTimeout(() => {
          downloadFile(generatePackageJson(), 'package.json', 'application/json')
        }, 100)
      }

      // Generate README if selected
      if (options.readme) {
        const readme = `# ${mainComponent.name}\n\nGenerated component from ComponentsR\n\n## Usage\n\n\`\`\`tsx\nimport { ${mainComponent.name} } from './${mainComponent.name}';\n\nfunction App() {\n  return <${mainComponent.name} />;\n}\n\`\`\``
        setTimeout(() => {
          downloadFile(readme, 'README.md', 'text/markdown')
        }, 200)
      }

      toast({
        title: '✅ Exportación completa',
        description: `${components.length} componente${components.length !== 1 ? 's' : ''} exportado${components.length !== 1 ? 's' : ''}`,
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo exportar el componente',
        variant: 'destructive'
      })
    }
  }

  const frameworks = [
    { id: "react-tsx", name: "React TSX" },
    { id: "react-jsx", name: "React JSX" },
    { id: "vue3", name: "Vue 3" },
    { id: "angular", name: "Angular" },
    { id: "svelte", name: "Svelte" },
  ]

  const fileStructure = [
    { name: "PrimaryButton/", type: "folder", indent: 0 },
    { name: "PrimaryButton.tsx", type: "file", indent: 1 },
    { name: "index.ts", type: "file", indent: 1 },
    { name: "package.json", type: "file", indent: 1 },
    { name: "README.md", type: "file", indent: 1 },
    { name: "tsconfig.json", type: "file", indent: 1 },
    { name: "examples/", type: "folder", indent: 1 },
    { name: "basic-usage.tsx", type: "file", indent: 2 },
  ]

  const toggleOption = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Exportar Componente</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selección de framework */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Framework:</Label>
            <div className="flex flex-wrap gap-2">
              {frameworks.map((fw) => (
                <Badge
                  key={fw.id}
                  variant={framework === fw.id ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => setFramework(fw.id)}
                >
                  {fw.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Opciones de exportación */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Opciones de Exportación:</Label>
            <div className="border rounded-lg p-4 bg-muted/30 space-y-3">
              {Object.entries(options).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={() => toggleOption(key as keyof typeof options)}
                  />
                  <Label htmlFor={key} className="text-sm cursor-pointer">
                    {key === "typescript" && "Incluir TypeScript"}
                    {key === "packageJson" && "Generar package.json"}
                    {key === "readme" && "Incluir README.md"}
                    {key === "tsconfig" && "Generar tsconfig.json"}
                    {key === "examples" && "Incluir ejemplos de uso"}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Estructura del paquete */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Estructura del Paquete:</Label>
            <ScrollArea className="border rounded-lg p-4 bg-muted/30 h-48">
              <div className="space-y-1 font-mono text-sm">
                {fileStructure.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 animate-in fade-in slide-in-from-left"
                    style={{ paddingLeft: `${item.indent * 20}px` }}
                  >
                    {item.type === "folder" ? (
                      <Folder className="w-4 h-4 text-primary" />
                    ) : (
                      <File className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className={item.type === "folder" ? "font-semibold" : "text-muted-foreground"}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Información adicional */}
          <div className="border rounded-lg p-4 bg-primary/5">
            <div className="flex items-start gap-3">
              <FileCode className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">Componentes a exportar: {components.length}</p>
                <p className="text-xs text-muted-foreground">
                  Se generará un paquete completo con todos los archivos necesarios para usar tus componentes en
                  producción.
                </p>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleExport} className="gradient-primary text-white">
              Exportar {components.length} Componente{components.length !== 1 ? 's' : ''}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
