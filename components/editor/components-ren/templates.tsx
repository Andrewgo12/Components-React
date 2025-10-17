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
  const styles = {
    ...getEffectStyles(),
    width: props?.width ? `${props.width}px` : undefined,
    height: props?.height ? `${props.height}px` : undefined,
    backgroundColor: props?.backgroundColor,
    color: props?.color,
  }

  switch (type) {
    // 1. Login Form
    case "login-form":
      return (
        <Card className={`w-96 ${getEffectClasses()}`} style={styles}>
          <CardHeader>
            <CardTitle>{props?.title || "Iniciar Sesión"}</CardTitle>
            <CardDescription>Ingresa tus credenciales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Email" type="email" />
            <Input placeholder="Contraseña" type="password" />
            <Button className="w-full">Entrar</Button>
          </CardContent>
        </Card>
      )

    // 2. Signup Form
    case "signup-form":
      return (
        <Card className={`w-96 ${getEffectClasses()}`} style={styles}>
          <CardHeader>
            <CardTitle>Crear Cuenta</CardTitle>
            <CardDescription>Regístrate para comenzar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Nombre completo" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Contraseña" type="password" />
            <Button className="w-full">Registrarse</Button>
          </CardContent>
        </Card>
      )

    // 3. Pricing Card
    case "pricing-card":
      return (
        <Card className={`w-80 ${getEffectClasses()}`} style={styles}>
          <CardHeader>
            <CardTitle>Plan Pro</CardTitle>
            <div className="text-3xl font-bold">$29<span className="text-sm font-normal">/mes</span></div>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Icons.CheckIcon className="w-4 h-4 text-green-500" />
                <span>Acceso ilimitado</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.CheckIcon className="w-4 h-4 text-green-500" />
                <span>Soporte 24/7</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.CheckIcon className="w-4 h-4 text-green-500" />
                <span>Sin anuncios</span>
              </li>
            </ul>
            <Button className="w-full">Suscribirse</Button>
          </CardContent>
        </Card>
      )

    // 4. Profile Card
    case "profile-card":
      return (
        <Card className={`w-sm ${getEffectClasses()}`} style={styles}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <div>
                <h3 className="font-bold text-lg">John Doe</h3>
                <p className="text-sm text-gray-600">Desarrollador Web</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )

    // 5. Stats Card
    case "stats-card":
      return (
        <Card className={`w-64 ${getEffectClasses()}`} style={styles}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Usuarios</p>
                <p className="text-2xl font-bold">12,345</p>
              </div>
              <Icons.UsersIcon className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-xs text-green-600 mt-2">+12% este mes</p>
          </CardContent>
        </Card>
      )

    // 6. Navbar
    case "navbar":
      return (
        <div className={`w-full h-16 bg-white border-b flex items-center px-6 ${getEffectClasses()}`} style={styles}>
          <div className="flex items-center gap-8">
            <div className="font-bold text-xl">Logo</div>
            <nav className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Inicio</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Productos</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contacto</a>
            </nav>
          </div>
        </div>
      )

    // 7. Sidebar
    case "sidebar":
      return (
        <div className={`w-64 h-96 bg-gray-50 border-r p-4 ${getEffectClasses()}`} style={styles}>
          <div className="space-y-2">
            <div className="font-bold mb-4">Menú</div>
            <Button variant="ghost" className="w-full justify-start">
              <Icons.HomeIcon className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icons.UsersIcon className="w-4 h-4 mr-2" />
              Usuarios
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icons.SettingsIcon className="w-4 h-4 mr-2" />
              Configuración
            </Button>
          </div>
        </div>
      )

    // 8. Blog Card
    case "blog-card":
      return (
        <Card className={`w-80 ${getEffectClasses()}`} style={styles}>
          <div className="aspect-video bg-gray-200" />
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2">Título del artículo</h3>
            <p className="text-sm text-gray-600 mb-3">Una breve descripción del contenido del artículo...</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>5 min lectura</span>
              <span>Hace 2 días</span>
            </div>
          </CardContent>
        </Card>
      )

    // 9. Product Card
    case "product-card":
      return (
        <Card className={`w-64 ${getEffectClasses()}`} style={styles}>
          <div className="w-full h-40 bg-gradient-to-br from-green-400 to-blue-500 rounded-t-lg" />
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold">Producto Premium</h3>
            <p className="text-lg font-bold text-green-600">$99.99</p>
            <p className="text-sm text-gray-600">Descripción del producto</p>
            <Button className="w-full">Agregar al carrito</Button>
          </CardContent>
        </Card>
      )

    // 10. Dashboard Widget
    case "dashboard-widget":
      return (
        <Card className={`w-80 ${getEffectClasses()}`} style={styles}>
          <CardHeader>
            <CardTitle>Rendimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CPU</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>RAM</span>
                  <span>72%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )

    // 11. Contact Form
    case "contact-form":
      return (
        <Card className={`w-96 ${getEffectClasses()}`} style={styles}>
          <CardHeader>
            <CardTitle>Contáctanos</CardTitle>
            <CardDescription>Envíanos un mensaje</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Tu nombre" />
            <Input placeholder="Tu email" type="email" />
            <Input placeholder="Asunto" />
            <textarea className="w-full p-2 border rounded-md" rows={4} placeholder="Mensaje" />
            <Button className="w-full">Enviar</Button>
          </CardContent>
        </Card>
      )

    // 12. Newsletter Signup
    case "newsletter-signup":
      return (
        <Card className={`w-96 ${getEffectClasses()}`} style={styles}>
          <CardContent className="p-6">
            <h3 className="font-bold text-xl mb-2">Suscríbete a nuestro newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">Recibe las últimas noticias en tu email</p>
            <div className="flex gap-2">
              <Input placeholder="tu@email.com" type="email" />
              <Button>Suscribirse</Button>
            </div>
          </CardContent>
        </Card>
      )

    // 13. Testimonial Card
    case "testimonial-card":
      return (
        <Card className={`w-80 ${getEffectClasses()}`} style={styles}>
          <CardContent className="p-6">
            <div className="flex mb-3">
              {[1, 2, 3, 4, 5].map(star => (
                <Icons.StarIcon key={star} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-sm mb-4">&quot;Excelente servicio, muy recomendado. La atención al cliente es excepcional.&quot;</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                M
              </div>
              <div>
                <div className="font-semibold">María García</div>
                <div className="text-sm text-gray-600">Cliente satisfecha</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )

    // 14. Feature Card
    case "feature-card":
      return (
        <Card className={`w-72 ${getEffectClasses()}`} style={styles}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icons.SparklesIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Rápido y Eficiente</h3>
            <p className="text-sm text-gray-600">Optimizado para el mejor rendimiento</p>
          </CardContent>
        </Card>
      )

    // 15. Team Member
    case "team-member":
      return (
        <Card className={`w-64 ${getEffectClasses()}`} style={styles}>
          <CardContent className="p-6 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4" />
            <h3 className="font-bold text-lg">Ana Martínez</h3>
            <p className="text-sm text-gray-600 mb-3">CEO & Founder</p>
            <div className="flex justify-center gap-2">
              <Button variant="ghost" size="icon">
                <Icons.GithubIcon className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Icons.TwitterIcon className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Icons.LinkedinIcon className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )

    // 16. Metric Card
    case "metric-card":
      return (
        <Card className={`w-56 ${getEffectClasses()}`} style={styles}>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-1">Ventas Totales</div>
            <div className="text-3xl font-bold mb-2">$45,231</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <Icons.TrendingUpIcon className="w-4 h-4" />
              <span>+20.1%</span>
            </div>
          </CardContent>
        </Card>
      )

    // 17. Chat Message
    case "chat-message":
      return (
        <div className={`w-80 bg-white border rounded-lg p-4 ${getEffectClasses()}`} style={styles}>
          <div className="flex gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              U
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm">¡Hola! ¿Cómo estás?</p>
              </div>
              <div className="text-xs text-gray-500 mt-1">Hace 5 min</div>
            </div>
          </div>
        </div>
      )

    // 18. Social Post
    case "social-post":
      return (
        <Card className={`w-80 ${getEffectClasses()}`} style={styles}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <div className="font-semibold">Ana López</div>
                <div className="text-xs text-gray-500">Hace 2 horas</div>
              </div>
            </div>
            <p className="text-sm mb-4">¡Acabamos de lanzar nuestra nueva funcionalidad! 🚀</p>
            <div className="flex gap-4 text-sm text-gray-500">
              <button className="flex items-center gap-1">
                <Icons.HeartIcon className="w-4 h-4" />
                <span>24</span>
              </button>
              <button className="flex items-center gap-1">
                <Icons.MessageCircleIcon className="w-4 h-4" />
                <span>8</span>
              </button>
              <button className="flex items-center gap-1">
                <Icons.ShareIcon className="w-4 h-4" />
                <span>3</span>
              </button>
            </div>
          </CardContent>
        </Card>
      )

    // 19. Progress Tracker
    case "progress-tracker":
      return (
        <Card className={`w-80 ${getEffectClasses()}`} style={styles}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Progreso del Proyecto</span>
              <span className="text-sm text-gray-600">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
            </div>
            <div className="text-sm text-gray-600">3 de 4 tareas completadas</div>
          </CardContent>
        </Card>
      )

    // 20. Comparison Table
    case "comparison-table":
      return (
        <Card className={`w-96 ${getEffectClasses()}`} style={styles}>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-semibold mb-2">Básico</div>
                <div className="text-2xl font-bold mb-2">$9</div>
                <Button variant="outline" size="sm">Elegir</Button>
              </div>
              <div>
                <div className="font-semibold mb-2">Pro</div>
                <div className="text-2xl font-bold mb-2">$29</div>
                <Button size="sm">Elegir</Button>
              </div>
              <div>
                <div className="font-semibold mb-2">Enterprise</div>
                <div className="text-2xl font-bold mb-2">$99</div>
                <Button variant="outline" size="sm">Elegir</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )

    // 21. Error Page
    case "error-page":
      return (
        <div className={`w-96 text-center p-8 ${getEffectClasses()}`} style={styles}>
          <div className="text-6xl font-bold text-red-500 mb-4">404</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h2>
          <p className="text-gray-600 mb-6">La página que buscas no existe o ha sido movida.</p>
          <Button>Volver al inicio</Button>
        </div>
      )

    // 22. Loading Skeleton
    case "loading-skeleton":
      return (
        <Card className={`w-80 ${getEffectClasses()}`} style={styles}>
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
              </div>
            </div>
          </CardContent>
        </Card>
      )

    // 23. Cart Item
    case "cart-item":
      return (
        <div className={`w-80 bg-white border rounded-lg p-4 ${getEffectClasses()}`} style={styles}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg" />
            <div className="flex-1">
              <h3 className="font-semibold">Producto Example</h3>
              <p className="text-sm text-gray-600">Talla: M, Color: Azul</p>
              <p className="font-bold text-green-600">$29.99</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">-</Button>
              <span>1</span>
              <Button variant="outline" size="sm">+</Button>
            </div>
          </div>
        </div>
      )

    // 24. Notification Toast
    case "notification-toast":
      return (
        <div className={`w-80 bg-white border rounded-lg p-4 shadow-lg ${getEffectClasses()}`} style={styles}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Icons.CheckIcon className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold mb-1">¡Éxito!</div>
              <div className="text-sm text-gray-600">Tu acción se completó correctamente</div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <Icons.XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )

    // 25. Hero Section
    case "hero-section":
      return (
        <div className={`w-full max-w-4xl text-center p-12 ${getEffectClasses()}`} style={styles}>
          <h1 className="text-5xl font-bold mb-4">Bienvenido a nuestro producto</h1>
          <p className="text-xl text-gray-600 mb-8">La mejor solución para tus necesidades</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Comenzar Gratis</Button>
            <Button size="lg" variant="outline">Más información</Button>
          </div>
        </div>
      )

    default:
      return null
  }
}
