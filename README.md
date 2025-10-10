# ComponentesR - Editor de Componentes React

Un editor visual avanzado para crear y personalizar componentes React con efectos modernos y animaciones.

## 🚀 Características

- **Editor Visual**: Interfaz drag & drop para crear componentes
- **Efectos Modernos**: Glow, Shimmer, Ripple, Glass Morphism, y más
- **Validación de Seguridad**: Protección contra XSS y sanitización de inputs
- **Manejo de Errores**: Sistema robusto de error boundaries y logging
- **TypeScript Strict**: Configuración estricta para mejor calidad de código
- **Optimización de Rendimiento**: Hooks optimizados y reducción de re-renders

## 🛠️ Tecnologías

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Radix UI** - Componentes accesibles
- **React Hook Form** - Manejo de formularios
- **Lucide React** - Iconos

## 📦 Instalación

```bash
npm install
npm run dev
```

## 🔒 Seguridad

- Sanitización de valores CSS para prevenir XSS
- Validación de inputs de usuario
- Error boundaries para captura de errores
- Configuración ESLint estricta

## 🎨 Componentes Disponibles

- **Básicos**: Button, Input, Card, Badge
- **Animados**: Marquee, Typewriter, Number Ticker
- **Efectos**: Ripple Button, Glow Card, Shimmer Button
- **Fondos**: Dots, Grid, Aurora, Particles
- **Layouts**: Bento Grid, Login Form, Pricing Card

## 📁 Estructura del Proyecto

```
├── app/                 # Páginas de Next.js
├── components/          # Componentes React
│   ├── ui/             # Componentes base
│   └── editor/         # Componentes del editor
├── hooks/              # Hooks personalizados
├── lib/                # Utilidades y validaciones
└── types/              # Definiciones de tipos
```

## 🧪 Calidad de Código

- **ESLint**: Configuración estricta
- **TypeScript**: Modo strict habilitado
- **Error Handling**: Sistema centralizado
- **Validación**: Sanitización de inputs

## 🚀 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construcción
npm run start        # Producción
npm run lint         # Linting
npm run type-check   # Verificación de tipos
```

## 📝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver archivo LICENSE para detalles.