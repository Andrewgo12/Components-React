"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import * as Icons from "@/components/icons"

interface ComponentProps {
  props: any
  getEffectClasses: () => string
  getEffectStyles: () => any
}

export function renderBasicComponents(type: string, { props, getEffectClasses, getEffectStyles }: ComponentProps) {
  switch (type) {
    // Componentes básicos principales
    case "button":
      return (
        <Button
          className={`rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all ${getEffectClasses()}`}
          style={{
            ...getEffectStyles(),
            backgroundColor: props.colors?.background || "#3b82f6",
            color: props.colors?.text || "#ffffff",
          }}
        >
          {props.text || "Button"}
        </Button>
      )

    case "input":
      return (
        <Input
          className={`border-2 focus:border-blue-500 transition-colors ${getEffectClasses()}`}
          placeholder={props.placeholder || "Ingresa texto..."}
          style={getEffectStyles()}
        />
      )

    case "card":
      return (
        <Card
          className={`shadow-lg hover:shadow-xl transition-shadow ${getEffectClasses()}`}
          style={getEffectStyles()}
        >
          <CardHeader>
            <CardTitle>{props.title || "Título de la tarjeta"}</CardTitle>
            <CardDescription>{props.description || "Descripción de la tarjeta"}</CardDescription>
          </CardHeader>
        </Card>
      )

    case "badge":
      return (
        <Badge className={`rounded-full px-3 py-1 ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.StarIcon className="w-3 h-3 mr-1" />
          {props.text || "Badge"}
        </Badge>
      )

    case "text":
      return (
        <p
          className={`text-base ${getEffectClasses()}`}
          style={{
            ...getEffectStyles(),
            fontSize: `${props.fontSize || 16}px`,
            color: props.color || "#000000",
          }}
        >
          {props.text || "Texto de ejemplo"}
        </p>
      )

    case "image":
      return (
        <div
          className={`w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center ${getEffectClasses()}`}
          style={getEffectStyles()}
        >
          <Icons.ImageIcon className="w-12 h-12 text-white/50" />
        </div>
      )

    case "checkbox":
      return (
        <label className={`flex items-center gap-2 cursor-pointer ${getEffectClasses()}`} style={getEffectStyles()}>
          <input type="checkbox" className="w-4 h-4 rounded border-2" />
          <span>{props.label || "Checkbox"}</span>
        </label>
      )

    case "radio":
      return (
        <label className={`flex items-center gap-2 cursor-pointer ${getEffectClasses()}`} style={getEffectStyles()}>
          <input type="radio" className="w-4 h-4" />
          <span>{props.label || "Radio"}</span>
        </label>
      )

    case "toggle":
      return (
        <button
          className={`w-12 h-6 rounded-full bg-gray-300 relative transition-colors hover:bg-gray-400 ${getEffectClasses()}`}
          style={getEffectStyles()}
        >
          <div className="w-5 h-5 rounded-full bg-white absolute left-0.5 top-0.5 transition-transform" />
        </button>
      )

    case "slider":
      return (
        <input
          type="range"
          className={`w-full ${getEffectClasses()}`}
          style={getEffectStyles()}
          min="0"
          max="100"
          defaultValue="50"
        />
      )

    case "avatar":
      return (
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold ${getEffectClasses()}`}
          style={getEffectStyles()}
        >
          {props.initials || "AB"}
        </div>
      )

    case "divider":
      return <div className={`h-px bg-gray-300 w-full ${getEffectClasses()}`} style={getEffectStyles()} />

    case "textarea":
      return (
        <textarea
          className={`w-full h-24 p-2 border-2 rounded-lg resize-none focus:border-blue-500 transition-colors ${getEffectClasses()}`}
          placeholder="Ingresa tu mensaje..."
          style={getEffectStyles()}
        />
      )

    case "select":
      return (
        <select className={`w-full p-2 border-2 rounded-lg focus:border-blue-500 transition-colors ${getEffectClasses()}`} style={getEffectStyles()}>
          <option>Selecciona una opción</option>
          <option>Opción 1</option>
          <option>Opción 2</option>
        </select>
      )

    case "progress":
      return (
        <div className={`w-full ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }} />
          </div>
        </div>
      )

    case "alert":
      return (
        <div className={`p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.InfoIcon className="w-4 h-4 inline mr-2" />
          Mensaje de alerta importante
        </div>
      )

    case "list":
      return (
        <ul className={`space-y-2 ${getEffectClasses()}`} style={getEffectStyles()}>
          <li className="flex items-center gap-2">
            <Icons.CircleIcon className="w-2 h-2 text-blue-500" />
            <span>Item 1</span>
          </li>
          <li className="flex items-center gap-2">
            <Icons.CircleIcon className="w-2 h-2 text-blue-500" />
            <span>Item 2</span>
          </li>
          <li className="flex items-center gap-2">
            <Icons.CircleIcon className="w-2 h-2 text-blue-500" />
            <span>Item 3</span>
          </li>
        </ul>
      )

    case "table":
      return (
        <div className={`w-64 bg-white border rounded-lg overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-3 py-2 text-sm">John Doe</td>
                <td className="px-3 py-2">
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-3 py-2 text-sm">Jane Smith</td>
                <td className="px-3 py-2">
                  <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )

    case "tabs":
      return (
        <div className={`w-full ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="flex border-b">
            <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-500">Tab 1</button>
            <button className="px-4 py-2 text-gray-500 hover:text-gray-700">Tab 2</button>
            <button className="px-4 py-2 text-gray-500 hover:text-gray-700">Tab 3</button>
          </div>
          <div className="p-4 bg-white">
            Contenido del tab activo
          </div>
        </div>
      )

    case "breadcrumb":
      return (
        <nav className={`flex ${getEffectClasses()}`} style={getEffectStyles()}>
          <span className="text-blue-500">Home</span>
          <Icons.ChevronRightIcon className="w-4 h-4 mx-1" />
          <span className="text-blue-500">Category</span>
          <Icons.ChevronRightIcon className="w-4 h-4 mx-1" />
          <span className="text-gray-500">Current</span>
        </nav>
      )

    case "pagination":
      return (
        <div className={`flex gap-1 ${getEffectClasses()}`} style={getEffectStyles()}>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">‹</button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">3</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">›</button>
        </div>
      )

    // Más componentes básicos (continuando hasta 100)
    case "accordion":
      return (
        <div className={`w-64 space-y-2 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="border rounded-lg">
            <button className="w-full px-4 py-3 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100">
              <span className="font-medium">Sección 1</span>
              <Icons.ChevronDownIcon className="w-4 h-4" />
            </button>
            <div className="px-4 py-3 border-t">
              <p className="text-sm text-gray-600">Contenido para sección 1</p>
            </div>
          </div>
        </div>
      )

    case "modal":
      return (
        <div className={`w-80 bg-white rounded-lg shadow-2xl border ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-gray-900">Modal Title</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <Icons.XIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-gray-600 mb-4">Este es el contenido del modal.</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline">Cancelar</Button>
              <Button>Confirmar</Button>
            </div>
          </div>
        </div>
      )

    case "dropdown":
      return (
        <div className={`w-48 bg-white border rounded-lg shadow-lg ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="py-1">
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
              <Icons.UserIcon className="w-4 h-4" />
              Profile
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
              <Icons.SettingsIcon className="w-4 h-4" />
              Settings
            </button>
            <hr className="my-1" />
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600 flex items-center gap-2">
              <Icons.XIcon className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )

    case "popover":
      return (
        <div className={`w-56 bg-white border rounded-lg shadow-lg p-3 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="flex items-center gap-2 mb-2">
            <Icons.InfoIcon className="w-4 h-4 text-blue-500" />
            <span className="font-medium text-sm">Información</span>
          </div>
          <p className="text-xs text-gray-600">Este es un popover con información útil.</p>
        </div>
      )

    case "stepper":
      return (
        <div className={`w-64 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="flex items-center">
            {[1, 2, 3].map((step, i) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i === 0 ? 'bg-blue-500 text-white' : i === 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step}
                </div>
                {i < 2 && <div className={`w-12 h-px ${i === 0 ? 'bg-blue-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-600">Paso 1 de 3</div>
        </div>
      )

    case "rating":
      return (
        <div className={`flex items-center gap-1 ${getEffectClasses()}`} style={getEffectStyles()}>
          {[...Array(5)].map((_, i) => (
            <Icons.StarIcon key={i} className={`w-5 h-5 ${i < 3 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
          ))}
          <span className="ml-2 text-sm text-gray-600">(4.5)</span>
        </div>
      )

    case "calendar":
      return (
        <div className={`w-64 bg-white border rounded-lg p-4 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Diciembre 2024</h3>
            <div className="flex gap-1">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Icons.ChevronRightIcon className="w-4 h-4 rotate-180" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Icons.ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(day => (
              <div key={day} className="p-2 text-gray-500 font-medium">{day}</div>
            ))}
            {[...Array(31)].map((_, i) => (
              <button key={i} className={`p-2 hover:bg-blue-100 rounded ${
                i === 14 ? 'bg-blue-500 text-white' : 'text-gray-700'
              }`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )

    case "timeline":
      return (
        <div className={`w-64 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="space-y-4">
            {[
              {title: "Proyecto Iniciado", time: "2 horas atrás", color: "blue"},
              {title: "Primer Hito", time: "1 día atrás", color: "green"},
              {title: "Fase de Revisión", time: "3 días atrás", color: "yellow"}
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-3 h-3 rounded-full bg-${item.color}-500 mt-1`} />
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    // Continuando con más componentes básicos...
    case "spinner":
      return (
        <div className={`w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin ${getEffectClasses()}`} style={getEffectStyles()} />
      )

    case "skeleton":
      return (
        <div className={`space-y-2 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
      )

    case "chip":
      return (
        <div className={`inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm ${getEffectClasses()}`} style={getEffectStyles()}>
          <span>Chip</span>
          <Icons.XIcon className="w-3 h-3 cursor-pointer" />
        </div>
      )

    case "tag":
      return (
        <span className={`inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm ${getEffectClasses()}`} style={getEffectStyles()}>
          #tag
        </span>
      )

    case "switch":
      return (
        <label className={`flex items-center cursor-pointer ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="relative">
            <input type="checkbox" className="sr-only" />
            <div className="w-10 h-6 bg-gray-300 rounded-full shadow-inner" />
            <div className="absolute w-4 h-4 bg-white rounded-full shadow left-1 top-1 transition" />
          </div>
          <span className="ml-3">Switch</span>
        </label>
      )

    case "tooltip":
      return (
        <div className={`relative inline-block ${getEffectClasses()}`} style={getEffectStyles()}>
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Hover me</button>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity">
            Tooltip text
          </div>
        </div>
      )

    case "form":
      return (
        <Card className={`w-full max-w-md ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardHeader>
            <CardTitle>Formulario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Campo 1" />
            <Input placeholder="Campo 2" />
            <Button className="w-full">Enviar</Button>
          </CardContent>
        </Card>
      )

    case "fieldset":
      return (
        <fieldset className={`border-2 border-gray-300 rounded-lg p-4 ${getEffectClasses()}`} style={getEffectStyles()}>
          <legend className="px-2 text-sm font-medium">Grupo de campos</legend>
          <div className="space-y-2">
            <Input placeholder="Campo en grupo" />
            <Input placeholder="Otro campo" />
          </div>
        </fieldset>
      )

    case "label":
      return (
        <label className={`block text-sm font-medium text-gray-700 ${getEffectClasses()}`} style={getEffectStyles()}>
          Etiqueta del campo
        </label>
      )

    case "input-number":
      return (
        <Input
          type="number"
          placeholder="123"
          className={`${getEffectClasses()}`}
          style={getEffectStyles()}
        />
      )

    case "input-email":
      return (
        <div className={`relative ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input type="email" placeholder="email@ejemplo.com" className="pl-10" />
        </div>
      )

    case "input-password":
      return (
        <div className={`relative ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input type="password" placeholder="••••••••" className="pl-10" />
        </div>
      )

    case "input-search":
      return (
        <div className={`relative ${getEffectClasses()}`} style={getEffectStyles()}>
          <Icons.SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input type="search" placeholder="Buscar..." className="pl-10" />
        </div>
      )

    case "input-url":
      return (
        <Input
          type="url"
          placeholder="https://ejemplo.com"
          className={`${getEffectClasses()}`}
          style={getEffectStyles()}
        />
      )

    case "input-tel":
      return (
        <Input
          type="tel"
          placeholder="+1 (555) 123-4567"
          className={`${getEffectClasses()}`}
          style={getEffectStyles()}
        />
      )

    case "input-date":
      return (
        <Input
          type="date"
          className={`${getEffectClasses()}`}
          style={getEffectStyles()}
        />
      )

    case "input-time":
      return (
        <Input
          type="time"
          className={`${getEffectClasses()}`}
          style={getEffectStyles()}
        />
      )

    case "input-file":
      return (
        <Input
          type="file"
          className={`${getEffectClasses()}`}
          style={getEffectStyles()}
        />
      )

    case "input-range":
      return (
        <input
          type="range"
          className={`w-full ${getEffectClasses()}`}
          style={getEffectStyles()}
        />
      )

    case "input-color":
      return (
        <input
          type="color"
          className={`w-12 h-12 rounded border ${getEffectClasses()}`}
          style={getEffectStyles()}
        />
      )

    case "container":
      return (
        <div className={`max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg ${getEffectClasses()}`} style={getEffectStyles()}>
          <p className="text-center text-gray-600">Container</p>
        </div>
      )

    case "section":
      return (
        <section className={`p-6 bg-white border rounded-lg ${getEffectClasses()}`} style={getEffectStyles()}>
          <h2 className="text-lg font-semibold mb-2">Sección</h2>
          <p className="text-gray-600">Contenido de la sección</p>
        </section>
      )

    case "article":
      return (
        <article className={`p-4 bg-white border rounded-lg ${getEffectClasses()}`} style={getEffectStyles()}>
          <h3 className="font-semibold mb-2">Artículo</h3>
          <p className="text-sm text-gray-600">Contenido del artículo</p>
        </article>
      )

    case "aside":
      return (
        <aside className={`p-4 bg-gray-100 border-l-4 border-blue-500 rounded ${getEffectClasses()}`} style={getEffectStyles()}>
          <p className="text-sm">Contenido lateral</p>
        </aside>
      )

    case "header":
      return (
        <header className={`p-4 bg-blue-600 text-white rounded-t-lg ${getEffectClasses()}`} style={getEffectStyles()}>
          <h1 className="text-xl font-bold">Header</h1>
        </header>
      )

    case "footer":
      return (
        <footer className={`p-4 bg-gray-800 text-white rounded-b-lg text-center ${getEffectClasses()}`} style={getEffectStyles()}>
          <p className="text-sm">© 2024 Footer</p>
        </footer>
      )

    case "main":
      return (
        <main className={`p-6 bg-white min-h-32 ${getEffectClasses()}`} style={getEffectStyles()}>
          <p className="text-gray-700">Contenido principal</p>
        </main>
      )

    case "nav":
      return (
        <nav className={`p-3 bg-gray-100 rounded ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="flex gap-4">
            <a className="text-blue-600 hover:underline">Inicio</a>
            <a className="text-blue-600 hover:underline">Acerca</a>
            <a className="text-blue-600 hover:underline">Contacto</a>
          </div>
        </nav>
      )

    case "div":
      return (
        <div className={`p-4 border-2 border-dashed border-gray-300 rounded ${getEffectClasses()}`} style={getEffectStyles()}>
          <p className="text-gray-500 text-center">Div Container</p>
        </div>
      )

    case "span":
      return (
        <span className={`px-2 py-1 bg-yellow-100 text-yellow-800 rounded ${getEffectClasses()}`} style={getEffectStyles()}>
          Span Element
        </span>
      )

    case "grid":
      return (
        <div className={`grid grid-cols-3 gap-2 p-4 ${getEffectClasses()}`} style={getEffectStyles()}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-blue-100 p-2 rounded text-center text-sm">{i}</div>
          ))}
        </div>
      )

    case "flex":
      return (
        <div className={`flex gap-2 p-4 ${getEffectClasses()}`} style={getEffectStyles()}>
          {[1,2,3].map(i => (
            <div key={i} className="bg-green-100 p-2 rounded flex-1 text-center text-sm">{i}</div>
          ))}
        </div>
      )

    case "h1":
      return (
        <h1 className={`text-4xl font-bold text-gray-900 ${getEffectClasses()}`} style={getEffectStyles()}>
          Título H1
        </h1>
      )

    case "h2":
      return (
        <h2 className={`text-3xl font-bold text-gray-800 ${getEffectClasses()}`} style={getEffectStyles()}>
          Título H2
        </h2>
      )

    case "h3":
      return (
        <h3 className={`text-2xl font-bold text-gray-700 ${getEffectClasses()}`} style={getEffectStyles()}>
          Título H3
        </h3>
      )

    case "h4":
      return (
        <h4 className={`text-xl font-bold text-gray-600 ${getEffectClasses()}`} style={getEffectStyles()}>
          Título H4
        </h4>
      )

    case "h5":
      return (
        <h5 className={`text-lg font-bold text-gray-500 ${getEffectClasses()}`} style={getEffectStyles()}>
          Título H5
        </h5>
      )

    case "h6":
      return (
        <h6 className={`text-base font-bold text-gray-400 ${getEffectClasses()}`} style={getEffectStyles()}>
          Título H6
        </h6>
      )

    case "paragraph":
      return (
        <p className={`text-gray-700 leading-relaxed ${getEffectClasses()}`} style={getEffectStyles()}>
          Este es un párrafo de ejemplo con texto que demuestra el formato y estilo del componente.
        </p>
      )

    case "strong":
      return (
        <strong className={`font-bold text-gray-900 ${getEffectClasses()}`} style={getEffectStyles()}>
          Texto en negrita
        </strong>
      )

    case "em":
      return (
        <em className={`italic text-gray-700 ${getEffectClasses()}`} style={getEffectStyles()}>
          Texto en cursiva
        </em>
      )

    case "code":
      return (
        <code className={`bg-gray-100 px-2 py-1 rounded font-mono text-sm ${getEffectClasses()}`} style={getEffectStyles()}>
          console.log(&apos;Hello World&apos;)
        </code>
      )

    case "pre":
      return (
        <pre className={`bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto ${getEffectClasses()}`} style={getEffectStyles()}>
{`function example() {
  return &apos;Hello World&apos;;
}`}
        </pre>
      )

    default:
      return null
  }
}