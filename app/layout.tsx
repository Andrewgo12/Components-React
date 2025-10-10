import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ErrorBoundary } from '@/components/error-boundary'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'ComponentesR - Editor de Componentes React',
  description: 'Editor visual avanzado para crear y personalizar componentes React con efectos modernos y animaciones',
  generator: 'ComponentesR',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
