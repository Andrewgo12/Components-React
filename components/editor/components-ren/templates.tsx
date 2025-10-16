"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { EditableText } from "../editable-text"
import * as Icons from "@/components/icons"
import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer"

interface ComponentProps {
  props: any
  getEffectClasses: () => string
  getEffectStyles: () => any
}

// Componentes con estado y modales/sub‑modales
function LoginFormTemplate({ getEffectClasses, getEffectStyles, props }: { getEffectClasses: () => string; getEffectStyles: () => any; props: any }) {
  const [forgotOpen, setForgotOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [email, setEmail] = useState("")

  return (
    <div className={`w-[450px] ${getEffectClasses()}`} style={{
      ...getEffectStyles(),
      width: props?.width ? `${props.width}px` : undefined,
      height: props?.height ? `${props.height}px` : undefined,
    }}>
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Icons.LockIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Bienvenido de vuelta</h2>
              <p className="text-blue-100 text-sm">Accede a tu cuenta premium</p>
            </div>
          </div>
        </div>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Correo electrónico</label>
              <Input
                placeholder="tu@empresa.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-gray-50/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Contraseña</label>
              <Input
                placeholder="••••••••"
                type="password"
                className="h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-gray-50/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-gray-600">Recordarme</span>
            </label>

            <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
              <DialogTrigger asChild>
                <button className="text-blue-600 hover:text-blue-700 font-medium">¿Olvidaste tu contraseña?</button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Restablecer contraseña</DialogTitle>
                  <DialogDescription>
                    Ingresa tu correo para enviarte instrucciones de restablecimiento.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-2">
                  <Input placeholder="tu@empresa.com" type="email" defaultValue={email} />
                </div>
                <DialogFooter>
                  <Button onClick={() => setForgotOpen(false)}>Enviar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg">
            Iniciar sesión
          </Button>

          <div className="text-center text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
              <DialogTrigger asChild>
                <button className="text-blue-600 hover:text-blue-700 font-medium">Regístrate aquí</button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear cuenta</DialogTitle>
                  <DialogDescription>Completa los datos para registrarte.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-2">
                  <Input placeholder="Nombre completo" />
                  <Input placeholder="Email" type="email" defaultValue={email} />
                  <Input placeholder="Contraseña" type="password" />
                </div>
                <DialogFooter>
                  <Button onClick={() => setRegisterOpen(false)}>Registrarse</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SignupFormTemplate({ getEffectClasses, getEffectStyles, props }: { getEffectClasses: () => string; getEffectStyles: () => any; props: any }) {
  const [termsOpen, setTermsOpen] = useState(false)

  return (
    <Card className={`w-96 ${getEffectClasses()}`} style={{
      ...getEffectStyles(),
      width: props?.width ? `${props.width}px` : undefined,
      height: props?.height ? `${props.height}px` : undefined,
    }}>
      <CardHeader>
        <CardTitle>Crear Cuenta</CardTitle>
        <CardDescription>Regístrate para comenzar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Nombre completo" />
        <Input placeholder="Email" type="email" />
        <Input placeholder="Contraseña" type="password" />
        <div className="text-xs text-muted-foreground">
          Al registrarte aceptas nuestros {" "}
          <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
            <DialogTrigger asChild>
              <button className="text-blue-600 hover:text-blue-700">Términos y condiciones</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Términos y condiciones</DialogTitle>
                <DialogDescription>Resumen de los principales términos.</DialogDescription>
              </DialogHeader>
              <div className="space-y-2 text-sm max-h-60 overflow-y-auto">
                <p>1. Uso permitido de la plataforma.</p>
                <p>2. Política de privacidad y tratamiento de datos.</p>
                <p>3. Limitación de responsabilidad.</p>
              </div>
              <DialogFooter>
                <Button onClick={() => setTermsOpen(false)}>Aceptar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Button className="w-full">Registrarse</Button>
      </CardContent>
    </Card>
  )
}

// Templates adicionales con modales y sub‑modales únicos
function PricingCardTemplate({ getEffectClasses, getEffectStyles, props }: { getEffectClasses: () => string; getEffectStyles: () => any; props: any }) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState(false)

  return (
    <div className={`w-96 ${getEffectClasses()}`} style={{
      ...getEffectStyles(),
      width: props?.width ? `${props.width}px` : undefined,
      height: props?.height ? `${props.height}px` : undefined,
    }}>
      <Card className="bg-white/95 backdrop-blur-sm border-2 border-purple-200 shadow-2xl rounded-3xl overflow-hidden group">
        <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 p-8 text-white relative">
          <div className="absolute top-4 right-4">
            <Badge className="bg-orange-500 text-white border-0 px-3 py-1 rounded-full text-xs font-bold">
              <EditableText
                value={props?.badgeText || "MÁS POPULAR"}
                onUpdate={(newText) => props?.onUpdateText?.(newText)}
                placeholder="Badge"
              >
                {props?.badgeText || "MÁS POPULAR"}
              </EditableText>
            </Badge>
          </div>
          <div className="mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4">
              <Icons.CrownIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              <EditableText
                value={props?.title || "Plan Professional"}
                onUpdate={(newTitle) => props?.onUpdateTitle?.(newTitle)}
                placeholder="Título del plan"
              >
                {props?.title || "Plan Professional"}
              </EditableText>
            </h3>
            <p className="text-purple-100 text-sm">
              <EditableText
                value={props?.description || "Perfecto para equipos en crecimiento"}
                onUpdate={(newDesc) => props?.onUpdateDescription?.(newDesc)}
                placeholder="Descripción"
              >
                {props?.description || "Perfecto para equipos en crecimiento"}
              </EditableText>
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold">
              <EditableText
                value={props?.price || "$29"}
                onUpdate={(newPrice) => props?.onUpdateContent?.(newPrice)}
                placeholder="Precio"
              >
                {props?.price || "$29"}
              </EditableText>
            </span>
            <span className="text-purple-200 text-lg">/mes</span>
          </div>
          <p className="text-purple-100 text-sm mt-2">Facturado anualmente</p>
        </div>
        <CardContent className="p-8">
          <ul className="space-y-4 mb-8">
            {["Usuarios ilimitados","Soporte prioritario 24/7","Almacenamiento de 1TB","Integraciones avanzadas","Analytics en tiempo real","API completa"].map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Icons.CheckIcon className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </li>
            ))}
          </ul>
          <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
            <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg group-hover:shadow-xl transition-all" onClick={() => setDetailsOpen(true)}>
              Ver detalles del plan
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Detalles del plan Professional</DialogTitle>
                <DialogDescription>Incluye lo necesario para equipos en crecimiento.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <p>• Usuarios ilimitados con control de roles.</p>
                <p>• Integraciones avanzadas (Zapier, Slack, etc.).</p>
                <p>• SLA de soporte 24/7.</p>
              </div>
              <div className="pt-2">
                <Dialog open={faqOpen} onOpenChange={setFaqOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Ver preguntas frecuentes</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Preguntas frecuentes</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 text-sm">
                      <p>¿Puedo cancelar cuando quiera? Sí, en cualquier momento.</p>
                      <p>¿Hay prueba gratuita? 30 días sin costo.</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <DialogFooter>
                <Button onClick={() => setDetailsOpen(false)}>Elegir este plan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <p className="text-center text-xs text-gray-500 mt-4">30 días gratis • Cancela cuando quieras</p>
        </CardContent>
      </Card>
    </div>
  )
}

function ProductCardTemplate({ getEffectClasses, getEffectStyles, props }: { getEffectClasses: () => string; getEffectStyles: () => any; props: any }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [shippingOpen, setShippingOpen] = useState(false)
  const [qty, setQty] = useState(1)

  return (
    <Card className={`w-64 ${getEffectClasses()}`} style={{
      ...getEffectStyles(),
      width: props?.width ? `${props.width}px` : undefined,
      height: props?.height ? `${props.height}px` : undefined,
    }}>
      <div className="w-full h-40 bg-gradient-to-br from-green-400 to-blue-500 rounded-t-lg" />
      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold">Producto Premium</h3>
        <p className="text-lg font-bold text-green-600">$99.99</p>
        <p className="text-sm text-gray-600">Descripción del producto</p>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button className="w-full" onClick={() => setDrawerOpen(true)}>Agregar al carrito</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Agregar al carrito</DrawerTitle>
              <DrawerDescription>Selecciona la cantidad y revisa detalles.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setQty(Math.max(1, qty - 1))}>-</Button>
                <span className="w-8 text-center">{qty}</span>
                <Button variant="outline" size="sm" onClick={() => setQty(qty + 1)}>+</Button>
              </div>
              <Dialog open={shippingOpen} onOpenChange={setShippingOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Ver envíos y devoluciones</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Envíos y devoluciones</DialogTitle>
                  </DialogHeader>
                  <div className="text-sm space-y-2">
                    <p>• Envío estándar 3-5 días.</p>
                    <p>• Devoluciones en 30 días.</p>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setShippingOpen(false)}>Entendido</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <DrawerFooter>
              <Button onClick={() => setDrawerOpen(false)}>Confirmar</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardContent>
    </Card>
  )
}

function ContactFormTemplate({ getEffectClasses, getEffectStyles, props }: { getEffectClasses: () => string; getEffectStyles: () => any; props: any }) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  return (
    <Card className={`w-96 ${getEffectClasses()}`} style={{
      ...getEffectStyles(),
      width: props?.width ? `${props.width}px` : undefined,
      height: props?.height ? `${props.height}px` : undefined,
    }}>
      <CardHeader>
        <CardTitle>Contáctanos</CardTitle>
        <CardDescription>Envíanos un mensaje</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Tu nombre" />
        <Input placeholder="Tu email" type="email" />
        <textarea className="w-full p-2 border rounded-lg resize-none h-24" placeholder="Tu mensaje..." />
        <div className="text-xs text-muted-foreground">
          Al enviar aceptas nuestra {" "}
          <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
            <DialogTrigger asChild>
              <button className="text-blue-600 hover:text-blue-700">Política de privacidad</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Política de privacidad</DialogTitle>
              </DialogHeader>
              <div className="text-sm space-y-2 max-h-60 overflow-y-auto">
                <p>Tratamos tus datos únicamente para responder tus consultas.</p>
                <p>Puedes solicitar la eliminación de tus datos en cualquier momento.</p>
              </div>
              <DialogFooter>
                <Button onClick={() => setPrivacyOpen(false)}>Cerrar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <Button onClick={() => setConfirmOpen(true)} className="w-full">Enviar mensaje</Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mensaje enviado</DialogTitle>
              <DialogDescription>Gracias por contactarnos. Te responderemos pronto.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setConfirmOpen(false)}>Cerrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

function NavbarTemplate({ getEffectClasses, getEffectStyles, props }: { getEffectClasses: () => string; getEffectStyles: () => any; props: any }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <nav className={`w-full bg-white border-b p-4 ${getEffectClasses()}`} style={{
      ...getEffectStyles(),
      width: props?.width ? `${props.width}px` : undefined,
      height: props?.height ? `${props.height}px` : undefined,
    }}>
      <div className="flex items-center justify-between">
        <div className="font-bold text-xl">Logo</div>
        <div className="hidden md:flex gap-6">
          <a href="#" className="hover:text-blue-600">Inicio</a>
          <a href="#" className="hover:text-blue-600">Productos</a>
          <a href="#" className="hover:text-blue-600">Contacto</a>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
            <Button size="sm" variant="outline" onClick={() => setLoginOpen(true)}>Ingresar</Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Iniciar sesión</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Email" type="email" />
                <Input placeholder="Contraseña" type="password" />
              </div>
              <DialogFooter>
                <Button onClick={() => setLoginOpen(false)}>Entrar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden" onClick={() => setMenuOpen(true)}>
                <Icons.MenuIcon className="w-4 h-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Menú</DrawerTitle>
                <DrawerDescription>Navegación rápida</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 space-y-2">
                <a href="#" className="block">Inicio</a>
                <a href="#" className="block">Productos</a>
                <a href="#" className="block">Contacto</a>
              </div>
              <DrawerFooter>
                <Button onClick={() => setMenuOpen(false)}>Cerrar</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </nav>
  )
}

function HeroSectionTemplate({ getEffectClasses, getEffectStyles, props }: { getEffectClasses: () => string; getEffectStyles: () => any; props: any }) {
  const [demoOpen, setDemoOpen] = useState(false)
  const [scheduleOpen, setScheduleOpen] = useState(false)

  return (
    <div className={`w-full min-h-[600px] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden ${getEffectClasses()}`} style={{
      ...getEffectStyles(),
      width: props?.width ? `${props.width}px` : undefined,
      height: props?.height ? `${props.height}px` : undefined,
    }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 animate-pulse" />
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute bg-white/10 rounded-full animate-pulse" style={{ width: `${Math.random() * 100 + 50}px`, height: `${Math.random() * 100 + 50}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${3 + Math.random() * 4}s` }} />
        ))}
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-[600px] px-8">
        <div className="text-center max-w-4xl">
          <div className="mb-8">
            <Badge className="bg-white/20 text-white border-0 px-4 py-2 rounded-full text-sm font-semibold mb-6">🎆 Nuevo: IA integrada disponible</Badge>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">El futuro de la<br /><span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">productividad</span></h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">Revoluciona tu flujo de trabajo con nuestra plataforma de última generación. Más rápido, más inteligente, más poderoso.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
              <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 font-bold px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 transition-all" onClick={() => setDemoOpen(true)}>
                <Icons.SparklesIcon className="w-5 h-5 mr-2" />
                Comenzar gratis
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Demo en vivo</DialogTitle>
                </DialogHeader>
                <div className="aspect-video w-full bg-black/20 flex items-center justify-center rounded-lg">Video/iframe de demo</div>
                <div className="pt-2">
                  <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Agendar una demo</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Agenda una demo</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        <Input placeholder="Nombre" />
                        <Input placeholder="Email" type="email" />
                      </div>
                      <DialogFooter>
                        <Button onClick={() => setScheduleOpen(false)}>Enviar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </DialogContent>
            </Dialog>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-2xl backdrop-blur-sm">
              <Icons.PlayIcon className="w-5 h-5 mr-2" />
              Ver demo en vivo
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-300">
            <div className="flex items-center gap-2"><Icons.CheckIcon className="w-4 h-4 text-green-400" /><span>Sin tarjeta de crédito</span></div>
            <div className="flex items-center gap-2"><Icons.CheckIcon className="w-4 h-4 text-green-400" /><span>Configuración en 2 minutos</span></div>
            <div className="flex items-center gap-2"><Icons.CheckIcon className="w-4 h-4 text-green-400" /><span>Soporte 24/7</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NotificationToastTemplate({ getEffectClasses, getEffectStyles, props }: { getEffectClasses: () => string; getEffectStyles: () => any; props: any }) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  return (
    <div className={`w-80 bg-white border border-green-200 rounded-lg shadow-lg p-4 ${getEffectClasses()}`} style={{
      ...getEffectStyles(),
      width: props?.width ? `${props.width}px` : undefined,
      height: props?.height ? `${props.height}px` : undefined,
    }}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <Icons.CheckIcon className="w-4 h-4 text-green-600" />
        </div>
        <div className="flex-1">
          <div className="font-semibold">¡Éxito!</div>
          <div className="text-sm text-gray-600">Operación completada correctamente</div>
        </div>
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogTrigger asChild>
            <button className="text-gray-400 hover:text-gray-600">Ver detalles</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalles de la operación</DialogTitle>
            </DialogHeader>
            <div className="text-sm space-y-2">
              <p>Se realizó la acción con ID #12345.</p>
              <p>Tiempo de ejecución: 120ms.</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setDetailsOpen(false)}>Cerrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export function renderTemplateComponents(type: string, { props, getEffectClasses, getEffectStyles }: ComponentProps) {
  switch (type) {
    // Plantillas de login y auth
    case "login-form":
      return (
        <LoginFormTemplate getEffectClasses={getEffectClasses} getEffectStyles={getEffectStyles} props={props} />
      )

    case "signup-form":
      return (
        <SignupFormTemplate getEffectClasses={getEffectClasses} getEffectStyles={getEffectStyles} props={props} />
      )

    // Plantillas de pricing
    case "pricing-card":
      return (
        <PricingCardTemplate getEffectClasses={getEffectClasses} getEffectStyles={getEffectStyles} props={props} />
      )

    // Plantillas de perfil
    case "profile-card":
      return (
        <Card className={`w-80 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                JD
              </div>
              <div>
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-sm text-gray-600">Desarrollador Frontend</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm">Seguir</Button>
              <Button variant="outline" size="sm">Mensaje</Button>
            </div>
          </CardContent>
        </Card>
      )

    // Plantillas de estadísticas
    case "stats-card":
      return (
        <Card className={`w-64 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Ventas Totales</span>
              <Icons.TrendingUpIcon className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">$12,345</div>
            <div className="text-sm text-green-600">+12% vs mes anterior</div>
          </CardContent>
        </Card>
      )

    // Plantillas de navegación
    case "navbar":
      return (
        <NavbarTemplate getEffectClasses={getEffectClasses} getEffectStyles={getEffectStyles} props={props} />
      )

    case "sidebar":
      return (
        <div className={`w-64 h-96 bg-gray-50 border-r p-4 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-blue-100 text-blue-700 rounded">
              <Icons.HomeIcon className="w-4 h-4" />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <Icons.UsersIcon className="w-4 h-4" />
              <span>Usuarios</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <Icons.SettingsIcon className="w-4 h-4" />
              <span>Configuración</span>
            </div>
          </div>
        </div>
      )

    // Plantillas de contenido
    case "blog-card":
      return (
        <Card className={`w-80 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
          <div className="w-full h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg" />
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Título del Artículo</h3>
            <p className="text-sm text-gray-600 mb-4">Descripción breve del contenido del artículo...</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Hace 2 días</span>
              <Button variant="outline" size="sm">Leer más</Button>
            </div>
          </CardContent>
        </Card>
      )

    case "product-card":
      return (
        <ProductCardTemplate getEffectClasses={getEffectClasses} getEffectStyles={getEffectStyles} props={props} />
      )

    // Plantillas de dashboard
    case "dashboard-widget":
      return (
        <Card className={`w-72 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.ChartIcon className="w-5 h-5" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">1,234</div>
                <div className="text-sm text-gray-600">Visitantes</div>
              </div>
              <div>
                <div className="text-2xl font-bold">567</div>
                <div className="text-sm text-gray-600">Conversiones</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )

    // Plantillas de formularios
    case "contact-form":
      return (
        <ContactFormTemplate getEffectClasses={getEffectClasses} getEffectStyles={getEffectStyles} props={props} />
      )

    case "newsletter-signup":
      return (
        <Card className={`w-80 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Suscríbete al Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">Recibe las últimas noticias</p>
            <div className="flex gap-2">
              <Input placeholder="tu@email.com" className="flex-1" />
              <Button>Suscribir</Button>
            </div>
          </CardContent>
        </Card>
      )

    // Plantillas de testimonios
    case "testimonial-card":
      return (
        <Card className={`w-80 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
          <CardContent className="p-6">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Icons.StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-4">&quot;Excelente servicio, muy recomendado para todos.&quot;</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
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

    // Plantillas de notificaciones
    case "notification-toast":
      return (
        <NotificationToastTemplate getEffectClasses={getEffectClasses} getEffectStyles={getEffectStyles} props={props} />
      )

    // Plantillas de e-commerce
    case "cart-item":
      return (
        <div className={`w-80 bg-white border rounded-lg p-4 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
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

    // Plantillas de landing page
    case "hero-section":
      return (
        <HeroSectionTemplate getEffectClasses={getEffectClasses} getEffectStyles={getEffectStyles} props={props} />
      )

    case "feature-card":
      return (
        <Card className={`w-72 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icons.ZapIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Rápido y Eficiente</h3>
            <p className="text-sm text-gray-600">Optimizado para máximo rendimiento</p>
          </CardContent>
        </Card>
      )

    // Plantillas de team
    case "team-member":
      return (
        <Card className={`w-64 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
              JS
            </div>
            <h3 className="font-semibold mb-1">Jane Smith</h3>
            <p className="text-sm text-gray-600 mb-4">CEO & Fundadora</p>
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm">
                <Icons.TwitterIcon className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Icons.LinkedinIcon className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )

    // Plantillas de métricas
    case "metric-card":
      return (
        <Card className={`w-48 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Icons.UsersIcon className="w-8 h-8 text-blue-500" />
              <Badge variant="secondary">+5%</Badge>
            </div>
            <div className="text-2xl font-bold">2,543</div>
            <div className="text-sm text-gray-600">Usuarios Activos</div>
          </CardContent>
        </Card>
      )

    // Plantillas de chat
    case "chat-message":
      return (
        <div className={`w-80 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
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

    // Plantillas de social
    case "social-post":
      return (
        <Card className={`w-80 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
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

    // Plantillas de progress
    case "progress-tracker":
      return (
        <Card className={`w-80 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
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

    // Plantillas de comparison
    case "comparison-table":
      return (
        <Card className={`w-96 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
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

    case "error-page":
      return (
        <div className={`w-96 text-center p-8 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
          <div className="text-6xl font-bold text-red-500 mb-4">404</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h2>
          <p className="text-gray-600 mb-6">La página que buscas no existe o ha sido movida.</p>
          <Button>Volver al inicio</Button>
        </div>
      )

    case "loading-skeleton":
      return (
        <Card className={`w-80 ${getEffectClasses()}`} style={{
          ...getEffectStyles(),
          width: props?.width ? `${props.width}px` : undefined,
          height: props?.height ? `${props.height}px` : undefined,
        }}>
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

    default:
      return null
  }
}