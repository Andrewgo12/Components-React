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

export function renderTemplateComponents(type: string, { props, getEffectClasses, getEffectStyles }: ComponentProps) {
  switch (type) {
    case "login-form":
      return (
        <Card className={`w-full max-w-md ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Icons.LockIcon className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Bienvenido</CardTitle>
            <CardDescription>Ingresa tus credenciales para continuar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Icons.MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input className="pl-10" placeholder="Email" type="email" />
            </div>
            <div className="relative">
              <Icons.LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input className="pl-10" placeholder="Contraseña" type="password" />
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500">Iniciar Sesión</Button>
          </CardContent>
        </Card>
      )

    case "pricing-card":
      return (
        <Card className={`w-full max-w-sm relative overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-bl-full opacity-10" />
          <CardHeader>
            <Badge className="w-fit mb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
              Popular
            </Badge>
            <CardTitle className="text-4xl font-bold">$29</CardTitle>
            <CardDescription className="text-base">por mes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Icons.CheckIcon className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm">Característica {i}</span>
                </div>
              ))}
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500">Comenzar Ahora</Button>
          </CardContent>
        </Card>
      )

    case "profile-card":
      return (
        <Card className={`w-full max-w-sm ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Desarrollador Frontend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-2">
              <Button size="sm" variant="outline">Seguir</Button>
              <Button size="sm">Mensaje</Button>
            </div>
          </CardContent>
        </Card>
      )

    case "stats-card":
      return (
        <Card className={`w-full max-w-sm ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardHeader>
            <CardTitle className="text-lg">Estadísticas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Usuarios</span>
              <span className="text-2xl font-bold text-blue-500">1,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Ventas</span>
              <span className="text-2xl font-bold text-green-500">$12,345</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Conversión</span>
              <span className="text-2xl font-bold text-purple-500">23.5%</span>
            </div>
          </CardContent>
        </Card>
      )

    case "notification":
      return (
        <div
          className={`p-4 rounded-lg bg-white dark:bg-card border-l-4 border-l-blue-500 shadow-xl max-w-sm animate-in slide-in-from-right ${getEffectClasses()}`}
          style={getEffectStyles()}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Icons.InfoIcon className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">{props.title || "Notificación"}</h4>
              <p className="text-sm text-muted-foreground">{props.message || "Mensaje de notificación"}</p>
            </div>
            <button className="text-muted-foreground hover:text-foreground">
              <Icons.XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )

    case "hero-section":
      return (
        <Card className={`w-full max-w-4xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-12 text-center relative">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Transforma tu
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Experiencia Digital
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Descubre la próxima generación de herramientas que revolucionarán 
                la forma en que trabajas y creas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8">
                  Comenzar Gratis
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Ver Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case "contact-form":
      return (
        <Card className={`w-full max-w-md ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardHeader>
            <CardTitle>Contacto</CardTitle>
            <CardDescription>Envíanos un mensaje</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Nombre" />
            <Input placeholder="Email" type="email" />
            <textarea className="w-full p-2 border rounded" placeholder="Mensaje" rows={3} />
            <Button className="w-full">Enviar</Button>
          </CardContent>
        </Card>
      )

    case "testimonial":
      return (
        <Card className={`w-full max-w-md bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200 ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-6">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Icons.StarIcon key={i} className="w-4 h-4 text-yellow-500 fill-current" />
              ))}
            </div>
            <blockquote className="text-gray-700 mb-4 italic">
              `Este producto ha transformado completamente mi flujo de trabajo. Altamente recomendado.`
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <p className="font-semibold text-gray-900">John Doe</p>
                <p className="text-sm text-gray-600">CEO, TechCorp</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case "signup-form":
      return (
        <Card className={`w-full max-w-md ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
            <CardDescription>Completa los datos para registrarte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Nombre completo" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Contraseña" type="password" />
            <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500">Registrarse</Button>
          </CardContent>
        </Card>
      )

    case "newsletter":
      return (
        <Card className={`w-full max-w-sm ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardHeader className="text-center">
            <Icons.MailIcon className="w-12 h-12 mx-auto mb-2 text-blue-500" />
            <CardTitle>Newsletter</CardTitle>
            <CardDescription>Suscríbete para recibir noticias</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="tu@email.com" type="email" />
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500">Suscribirse</Button>
          </CardContent>
        </Card>
      )

    case "feature-card":
      return (
        <Card className={`w-full max-w-sm bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-200 ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icons.SparklesIcon className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="mb-2 text-gray-900">Característica Premium</CardTitle>
            <CardDescription className="text-gray-600 mb-4">
              Funcionalidad avanzada que mejora tu productividad al máximo nivel.
            </CardDescription>
            <Button variant="outline" className="border-emerald-500 text-emerald-700 hover:bg-emerald-50">
              Explorar
            </Button>
          </CardContent>
        </Card>
      )

    case "team-card":
      return (
        <Card className={`w-full max-w-xs bg-gradient-to-br from-indigo-50 to-purple-100 border-indigo-200 ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
              AM
            </div>
            <CardTitle className="text-lg mb-1">Ana Martínez</CardTitle>
            <p className="text-indigo-600 font-medium mb-2">Diseñadora UX</p>
            <CardDescription className="text-gray-600 text-sm mb-4">
              Especialista en experiencia de usuario con 5+ años de experiencia.
            </CardDescription>
            <div className="flex justify-center gap-2">
              <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                <Icons.MailIcon className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                <Icons.UserIcon className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )

    case "blog-card":
      return (
        <Card className={`w-full max-w-sm bg-white shadow-lg hover:shadow-xl transition-shadow ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-lg flex items-center justify-center">
            <Icons.FileTextIcon className="w-16 h-16 text-white/70" />
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-100 text-blue-800 text-xs">Tecnología</Badge>
              <span className="text-xs text-gray-500">5 min lectura</span>
            </div>
            <CardTitle className="mb-2 text-gray-900">Guía Completa de React</CardTitle>
            <CardDescription className="text-gray-600 mb-4">
              Aprende los conceptos fundamentales y avanzados de React en esta guía completa.
            </CardDescription>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full" />
                <span className="text-sm text-gray-600">Por Admin</span>
              </div>
              <span className="text-xs text-gray-500">Hace 2 días</span>
            </div>
          </CardContent>
        </Card>
      )

    case "product-card":
      return (
        <Card className={`w-full max-w-sm bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105 ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="relative">
            <div className="w-full h-56 bg-gradient-to-br from-pink-400 to-red-500 rounded-t-lg flex items-center justify-center">
              <Icons.SquareIcon className="w-20 h-20 text-white/70" />
            </div>
            <Badge className="absolute top-3 right-3 bg-red-500 text-white">-20%</Badge>
          </div>
          <CardContent className="p-6">
            <CardTitle className="mb-2 text-gray-900">Producto Premium</CardTitle>
            <CardDescription className="text-gray-600 mb-4">
              Producto de alta calidad con características excepcionales.
            </CardDescription>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Icons.StarIcon key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
                <span className="text-sm text-gray-600 ml-1">(4.8)</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">$99</span>
                <span className="text-sm text-gray-500 line-through ml-1">$124</span>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-pink-500 to-red-500">Agregar al Carrito</Button>
          </CardContent>
        </Card>
      )

    case "gallery-card":
      return (
        <Card className={`w-full max-w-sm bg-white shadow-lg ${getEffectClasses()}`} style={getEffectStyles()}>
          <div className="grid grid-cols-2 gap-1 p-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`${i === 0 ? 'col-span-2 h-32' : 'h-20'} bg-gradient-to-br from-cyan-400 to-blue-500 rounded flex items-center justify-center`}>
                <Icons.ImageIcon className="w-8 h-8 text-white/70" />
              </div>
            ))}
          </div>
          <CardContent className="p-4">
            <CardTitle className="mb-2">Galería de Fotos</CardTitle>
            <CardDescription className="mb-3">Colección de imágenes destacadas del proyecto.</CardDescription>
            <Button variant="outline" className="w-full">Ver Galería Completa</Button>
          </CardContent>
        </Card>
      )

    case "timeline-card":
      return (
        <Card className={`w-full max-w-md bg-white shadow-lg ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.ChevronRightIcon className="w-5 h-5 text-blue-500" />
              Timeline del Proyecto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { phase: 'Planificación', status: 'completed', date: 'Ene 2024' },
              { phase: 'Desarrollo', status: 'current', date: 'Feb 2024' },
              { phase: 'Testing', status: 'pending', date: 'Mar 2024' },
              { phase: 'Lanzamiento', status: 'pending', date: 'Abr 2024' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  item.status === 'completed' ? 'bg-green-500' :
                  item.status === 'current' ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.phase}</p>
                  <p className="text-sm text-gray-600">{item.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )

    case "faq-card":
      return (
        <Card className={`w-full max-w-md bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-200 ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Icons.InfoIcon className="w-6 h-6 text-amber-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">¿Cómo funciona el producto?</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Nuestro producto utiliza tecnología avanzada para proporcionar una experiencia 
                  intuitiva y eficiente. Simplemente sigue los pasos de configuración inicial.
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-amber-500 text-amber-700 hover:bg-amber-50">
              Ver más preguntas
            </Button>
          </CardContent>
        </Card>
      )

    case "search-bar":
      return (
        <Card className={`w-full max-w-lg bg-white shadow-lg ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-4">
            <div className="relative">
              <Icons.SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                className="pl-10 pr-20 h-12 text-lg border-2 border-gray-200 focus:border-blue-500" 
                placeholder="Buscar productos, servicios..."
              />
              <Button className="absolute right-1 top-1/2 -translate-y-1/2 h-10 bg-gradient-to-r from-blue-500 to-purple-500">
                Buscar
              </Button>
            </div>
            <div className="flex gap-2 mt-3">
              {['Popular', 'Reciente', 'Tendencia'].map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-gray-100">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )

    case "navigation":
      return (
        <Card className={`w-full max-w-4xl bg-white shadow-lg ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Icons.LayersIcon className="w-8 h-8 text-blue-500" />
                  <span className="font-bold text-xl text-gray-900">Brand</span>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                  {['Inicio', 'Productos', 'Servicios', 'Contacto'].map((item) => (
                    <a key={item} className="text-gray-700 hover:text-blue-500 font-medium transition-colors">
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">Iniciar Sesión</Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500">Registrarse</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case "footer":
      return (
        <Card className={`w-full max-w-4xl bg-gray-900 text-white ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icons.LayersIcon className="w-6 h-6 text-blue-400" />
                  <span className="font-bold text-lg">Brand</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Creando experiencias digitales excepcionales desde 2020.
                </p>
              </div>
              {[
                { title: 'Producto', items: ['Características', 'Precios', 'API'] },
                { title: 'Empresa', items: ['Sobre nosotros', 'Carreras', 'Blog'] },
                { title: 'Soporte', items: ['Ayuda', 'Contacto', 'FAQ'] }
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item}>
                        <a className="text-gray-400 hover:text-white text-sm transition-colors">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 mt-8 pt-6 flex items-center justify-between">
              <p className="text-gray-400 text-sm">© 2024 Brand. Todos los derechos reservados.</p>
              <div className="flex gap-4">
                {[Icons.MailIcon, Icons.UserIcon, Icons.StarIcon].map((Icon, i) => (
                  <Icon key={i} className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case "task-card":
      return (
        <Card className={`w-full max-w-sm bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-green-800">Tareas Pendientes</h3>
              <Badge className="bg-green-500 text-white">3</Badge>
            </div>
            <div className="space-y-3">
              {[
                { task: 'Revisar código', done: true },
                { task: 'Actualizar documentación', done: false },
                { task: 'Preparar presentación', done: false }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    item.done ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}>
                    {item.done && <Icons.CheckIcon className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-sm ${
                    item.done ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )

    case "calendar-widget":
      return (
        <Card className={`w-full max-w-xs bg-white border-2 border-gray-200 ${getEffectClasses()}`} style={getEffectStyles()}>
          <CardHeader className="bg-red-500 text-white text-center py-3">
            <h3 className="font-bold">Diciembre 2024</h3>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
              {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(day => (
                <div key={day} className="font-semibold text-gray-600 p-1">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {Array.from({length: 31}, (_, i) => (
                <div key={i} className={`p-1 hover:bg-red-100 rounded ${
                  i === 14 ? 'bg-red-500 text-white' : 'text-gray-700'
                }`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )

    default:
      return null
  }
}