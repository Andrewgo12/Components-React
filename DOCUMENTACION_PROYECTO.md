# 📋 Documentación del Proyecto ComponentesR

## 🏗️ Estructura General del Proyecto

```
ComponentesR/
├── 📁 app/                    # Next.js App Router
├── 📁 components/             # Componentes React
├── 📁 hooks/                  # Hooks personalizados
├── 📁 lib/                    # Utilidades y validaciones
├── 📁 public/                 # Archivos estáticos
├── 📁 styles/                 # Estilos CSS
├── 📁 types/                  # Definiciones TypeScript
└── 📄 Archivos de configuración
```

## 📂 Análisis Detallado por Carpetas

### 🎯 `/app` - Next.js App Router
**Propósito**: Páginas y rutas de la aplicación usando App Router de Next.js 14

#### Archivos principales:
- **`layout.tsx`** - Layout raíz de la aplicación
  - Importa: `GeistSans`, `GeistMono`, `Analytics`, `ErrorBoundary`
  - Carga: `../styles/globals.css`
  - Configura: Fuentes, Analytics de Vercel, Error Boundary global
  
- **`page.tsx`** - Página principal del editor
  - Importa: Todos los componentes del editor, hooks, validaciones
  - Estado: `selectedComponent`, `components`, `zoom`, `showGrid`, `mode`, `history`
  - Funcionalidades: Editor visual completo con drag & drop

#### Rutas adicionales:
- **`/test`** - Página de pruebas
- **`/test-all`** - Página de pruebas completas

### 🧩 `/components` - Componentes React

#### 📝 `/components/editor` - Componentes del Editor
- **`topbar.tsx`** - Barra superior con controles
- **`sidebar.tsx`** - Panel lateral con componentes disponibles
- **`canvas.tsx`** - Área de trabajo principal
- **`inspector.tsx`** - Panel de propiedades
- **`component-renderer.tsx`** - Renderizador de componentes

#### 🎨 `/components/editor/modals` - Modales del Editor
- **`accessibility-modal.tsx`** - Modal de accesibilidad
- **`code-modal.tsx`** - Modal de código generado
- **`export-modal.tsx`** - Modal de exportación
- **`icon-library-modal.tsx`** - Librería de iconos
- **`performance-modal.tsx`** - Análisis de rendimiento
- **`project-modal.tsx`** - Gestión de proyectos
- **`shortcuts-modal.tsx`** - Atajos de teclado
- **`timeline-modal.tsx`** - Timeline de cambios

#### 🎛️ `/components/ui` - Componentes Base UI
**Basados en Radix UI + Tailwind CSS**

Componentes principales:
- **Formularios**: `button.tsx`, `input.tsx`, `form.tsx`, `checkbox.tsx`, `radio-group.tsx`
- **Navegación**: `navigation-menu.tsx`, `menubar.tsx`, `breadcrumb.tsx`
- **Overlays**: `dialog.tsx`, `popover.tsx`, `tooltip.tsx`, `sheet.tsx`
- **Feedback**: `alert.tsx`, `toast.tsx`, `progress.tsx`, `spinner.tsx`
- **Layout**: `card.tsx`, `separator.tsx`, `resizable.tsx`, `sidebar.tsx`
- **Data**: `table.tsx`, `pagination.tsx`, `calendar.tsx`

#### 🔧 Componentes Utilitarios
- **`error-boundary.tsx`** - Manejo de errores React
- **`client-only.tsx`** - Componente solo cliente
- **`theme-provider.tsx`** - Proveedor de temas
- **`icons.tsx`** - Iconos de Lucide React

### 🎣 `/hooks` - Hooks Personalizados
- **`use-error-handler.ts`** - Manejo centralizado de errores
- **`use-live-effects.ts`** - Efectos en tiempo real
- **`use-mobile.ts`** - Detección de dispositivos móviles
- **`use-toast.ts`** - Sistema de notificaciones

### 📚 `/lib` - Utilidades y Librerías
- **`utils.ts`** - Utilidades generales (cn, generateId, formatDate, debounce, throttle)
- **`validation.ts`** - Validaciones de seguridad (XSS, sanitización)
- **`constants.ts`** - Constantes de la aplicación

### 🎨 `/styles` - Estilos
- **`globals.css`** - Estilos globales con CSS custom properties
  - Variables CSS para temas claro/oscuro
  - Configuración de colores con OKLCH
  - Estilos base de Tailwind

### 📝 `/types` - Definiciones TypeScript
- **`index.ts`** - Tipos principales de la aplicación

### 🖼️ `/public` - Archivos Estáticos
- Imágenes placeholder
- Logos del proyecto
- Assets públicos

## ⚙️ Archivos de Configuración

### 📦 `package.json`
**Dependencias principales**:
- **Framework**: Next.js 15.2.4, React 19
- **UI**: Radix UI components, Tailwind CSS 4.1.9
- **Tipado**: TypeScript 5, tipos estrictos
- **Herramientas**: ESLint, PostCSS, Geist fonts
- **Analytics**: Vercel Analytics

**Scripts disponibles**:
```bash
npm run dev          # Desarrollo
npm run build        # Construcción
npm run start        # Producción
npm run lint         # Linting
npm run type-check   # Verificación de tipos
```

### 🎯 `next.config.mjs`
- ESLint y TypeScript estrictos habilitados
- Optimización de imágenes deshabilitada
- Optimización de imports para Lucide React y Radix UI
- Eliminación de console.log en producción
- React Strict Mode habilitado

### 🎨 `tailwind.config.ts`
- Modo oscuro por clase
- Configuración de colores con CSS custom properties
- Animaciones personalizadas (shimmer, glow, ripple, etc.)
- Configuración de contenedor responsivo

### 📋 `tsconfig.json`
**Configuración TypeScript estricta**:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `exactOptionalPropertyTypes: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- `noUncheckedIndexedAccess: true`

## 🔄 Flujo de Importaciones

### Importaciones principales en `app/layout.tsx`:
```typescript
import { GeistSans } from 'geist/font/sans'           // Fuente principal
import { GeistMono } from 'geist/font/mono'           // Fuente monospace
import { Analytics } from '@vercel/analytics/next'    // Analytics
import { ErrorBoundary } from '@/components/error-boundary'  // Error handling
import '../styles/globals.css'                        // Estilos globales
```

### Importaciones principales en `app/page.tsx`:
```typescript
// Componentes del editor
import { Topbar } from "@/components/editor/topbar"
import { Sidebar } from "@/components/editor/sidebar"
import { Canvas } from "@/components/editor/canvas"
import { Inspector } from "@/components/editor/inspector"

// UI y utilidades
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { validateComponentType } from "@/lib/validation"
```

## 🛡️ Características de Seguridad

### Validaciones implementadas:
- **XSS Prevention**: Sanitización de inputs en `lib/validation.ts`
- **Type Safety**: TypeScript estricto con validaciones de tipos
- **Error Boundaries**: Captura de errores React
- **Input Validation**: Validación de colores, posiciones, IDs

### Manejo de errores:
- Error Boundary global en layout
- Hook personalizado `use-error-handler`
- Logging centralizado de errores
- Fallbacks para componentes

## 🎯 Funcionalidades Principales

### Editor Visual:
- **Drag & Drop**: Arrastrar componentes al canvas
- **Propiedades**: Inspector de propiedades en tiempo real
- **Zoom**: Control de zoom del canvas
- **Grid**: Rejilla de alineación
- **Modos**: Diseño y vista previa

### Componentes Disponibles:
- **Básicos**: Button, Input, Card, Badge
- **Animados**: Marquee, Typewriter, Number Ticker
- **Efectos**: Ripple, Glow, Shimmer, Glass Morphism
- **Fondos**: Dots, Grid, Aurora, Particles
- **Layouts**: Bento Grid, Forms, Cards

### Controles:
- **Teclado**: Atajos para duplicar, eliminar, alinear
- **Historia**: Undo/Redo con historial de cambios
- **Autoguardado**: Guardado automático en localStorage
- **Exportación**: Código React generado

## 🚨 Problemas Identificados

### Error actual en `styles/globals.css`:
- **Problema**: Tailwind no reconoce la clase `border-border`
- **Causa**: Configuración incorrecta de CSS custom properties
- **Solución**: Usar `@apply` correctamente o definir las clases

### Errores de TypeScript:
- **`error-boundary.tsx`**: Parámetros no utilizados en `componentDidCatch`
- **`slider.tsx`**: Tipos incompatibles con `exactOptionalPropertyTypes`

### Estructura de archivos:
- **Problema**: `app/layout.tsx` importa `../styles/globals.css` pero el error indica que busca `app/globals.css`
- **Solución**: Verificar la ruta correcta o mover el archivo

## 📋 Próximos Pasos Recomendados

1. **Arreglar errores de CSS**: Corregir `styles/globals.css`
2. **Resolver errores TypeScript**: Limpiar parámetros no utilizados
3. **Verificar rutas**: Asegurar que las importaciones sean correctas
4. **Optimizar rendimiento**: Revisar re-renders innecesarios
5. **Mejorar accesibilidad**: Implementar ARIA labels
6. **Documentar componentes**: Agregar JSDoc a componentes principales