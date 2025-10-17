"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FadeIn,
  ScaleOnHover,
  AnimatedCounter,
  SpringCard,
  MarqueeText,
  TypewriterText,
  ScrollReveal,
  FloatingElement,
  StaggeredCards,
  TiltCard,
  MorphButton,
  DraggableCard,
  WaveText,
  MagneticButton,
  GlitchText,
  ScrollRevealDirection,
  TextRevealScroll,
  FramerFadeIn,
  FramerStagger,
  SpringTrail,
  GSAPTimeline,
  AnimeSVGDraw,
  TypedJSText,
  AOSAnimation,
  AwesomeRevealFade,
  ConfettiEffect,
  ParallaxTiltCard,
  AnimatedCountUp,
  FlipMoveList,
  TickerAnimation
} from "@/components/animations"

export default function AnimationsPage() {
  const sampleItems = [
    "Animación 1",
    "Animación 2", 
    "Animación 3",
    "Animación 4"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <GlitchText text="Animaciones" />
            </h1>
            <TypewriterText 
              text="Framer Motion y React Spring" 
              speed={50}
            />
          </div>
        </FadeIn>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Básicas</TabsTrigger>
            <TabsTrigger value="advanced">Avanzadas</TabsTrigger>
            <TabsTrigger value="interactive">Interactivas</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-8">
            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle>Animaciones Básicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Fade In</h3>
                    <FadeIn delay={0.2}>
                      <Card className="p-4 bg-blue-50">
                        <p>Contenido con fade in</p>
                      </Card>
                    </FadeIn>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Scale on Hover</h3>
                    <ScaleOnHover>
                      <Button>Hover aquí</Button>
                    </ScaleOnHover>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Contador</h3>
                    <div className="flex gap-8">
                      <div className="text-center">
                        <AnimatedCounter end={1234} />
                        <p className="text-sm text-gray-600">Usuarios</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Flotante</h3>
                    <FloatingElement>
                      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        Float
                      </div>
                    </FloatingElement>
                  </div>

                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle>Marquee</CardTitle>
                </CardHeader>
                <CardContent>
                  <MarqueeText text="🚀 Texto en movimiento • Perfecto para anuncios • " />
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-8">
            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle>Avanzadas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Cards Escalonadas</h3>
                    <StaggeredCards items={sampleItems} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">3D Tilt</h3>
                    <TiltCard>
                      <Card className="w-64 h-40 bg-gradient-to-br from-purple-500 to-pink-500">
                        <CardContent className="flex items-center justify-center h-full">
                          <p className="text-white font-bold">Mueve el mouse</p>
                        </CardContent>
                      </Card>
                    </TiltCard>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Morphing</h3>
                    <MorphButton />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Wave Text</h3>
                    <div className="text-2xl font-bold text-blue-600">
                      <WaveText text="WAVE" />
                    </div>
                  </div>

                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>

          <TabsContent value="interactive" className="space-y-8">
            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle>Interactivas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Spring Card</h3>
                    <SpringCard>
                      <Card className="w-64 h-32 bg-gradient-to-br from-green-400 to-blue-500">
                        <CardContent className="flex items-center justify-center h-full">
                          <p className="text-white font-bold">Hover 3D</p>
                        </CardContent>
                      </Card>
                    </SpringCard>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Magnético</h3>
                    <MagneticButton>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Magnético
                      </Button>
                    </MagneticButton>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Arrastrable</h3>
                    <DraggableCard>
                      <Card className="w-48 h-32 bg-gradient-to-br from-orange-400 to-red-500 cursor-grab">
                        <CardContent className="flex items-center justify-center h-full">
                          <p className="text-white font-bold">Arrástra</p>
                        </CardContent>
                      </Card>
                    </DraggableCard>
                  </div>

                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}