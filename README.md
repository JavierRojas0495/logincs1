# Silogtran - Sistema de Gestión Logística

Sistema integral de gestión logística desarrollado con Next.js y Bootstrap para el control total de operaciones de transporte.

## 🚀 Características

- **Autenticación de usuarios** con validación de credenciales
- **Selección de centro de costo** para operaciones multi-sede
- **Dashboard interactivo** con estadísticas en tiempo real
- **Seguimiento de envíos** con estados y progreso
- **Sistema de alertas** para notificaciones importantes
- **Diseño responsive** optimizado para móviles y desktop
- **Tema personalizable** con variables CSS

## 🛠️ Tecnologías Utilizadas

- **Next.js 15.2.4** - Framework de React con App Router
- **React 19** - Biblioteca de UI
- **TypeScript 5** - Tipado estático
- **Bootstrap 5.3.8** - Framework CSS
- **Lucide React** - Iconografía
- **CSS Variables + OKLCH** - Sistema de temas personalizado
- **PostCSS + Autoprefixer** - Procesamiento CSS

## 📦 Dependencias

### Dependencias Principales:
- `next` - Framework de React
- `react` - Biblioteca de UI
- `react-dom` - Renderizado de React
- `bootstrap` - Framework CSS
- `@popperjs/core` - Para componentes Bootstrap
- `lucide-react` - Iconografía

### Dependencias de Desarrollo:
- `typescript` - Tipado estático
- `@types/*` - Tipos de TypeScript
- `postcss` - Procesador CSS
- `autoprefixer` - Prefijos CSS automáticos

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Navegador web moderno

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd logincs1
```

### 2. Instalar dependencias
```bash
npm install
# o
yarn install
```

### 3. Ejecutar en modo desarrollo
```bash
npm run dev
# o
yarn dev
```

### 4. Abrir en el navegador
Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📁 Estructura del Proyecto

```
logincs1/
├── app/                    # Páginas y layout de Next.js
│   ├── globals.css        # Estilos globales con Bootstrap
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React con Bootstrap
│   ├── login-form-bootstrap.tsx
│   ├── cost-center-selection-bootstrap.tsx
│   └── dashboard-bootstrap.tsx
├── lib/                   # Utilidades
│   └── utils.ts
├── public/               # Archivos estáticos
│   ├── silogtran-logo.png
│   └── img/corporativo/  # Logos corporativos
├── package.json          # Dependencias del proyecto
└── README.md             # Documentación
```

## 🎨 Personalización de Temas

El proyecto utiliza variables CSS para personalización fácil:

```css
:root {
  --primary-color: #1e40af;      /* Color principal */
  --secondary-color: #f59e0b;    /* Color secundario */
  --success-color: #10b981;      /* Color de éxito */
  --danger-color: #ef4444;       /* Color de peligro */
  --background-color: #ffffff;   /* Color de fondo */
  --text-color: #1e293b;         /* Color de texto */
}
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter de código

## 📱 Funcionalidades

### 1. Login
- Formulario de autenticación con validación
- Campos de usuario y contraseña
- Manejo de errores y estados de carga
- Diseño responsive con animaciones

### 2. Selección de Centro de Costo
- Dropdown con centros disponibles
- Información detallada del centro seleccionado
- Validación de selección requerida
- Integración con datos mock

### 3. Dashboard
- Estadísticas en tiempo real
- Navegación lateral colapsible
- Seguimiento de envíos con barras de progreso
- Sistema de alertas y notificaciones
- Acciones rápidas para operaciones comunes

## 🎯 Próximas Mejoras

- [ ] Integración con backend PHP
- [ ] Autenticación real con JWT
- [ ] Base de datos para centros de costo
- [ ] Sistema de notificaciones push
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)
- [ ] PWA (Progressive Web App)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

Desarrollado por **Colombia Software** para **Silogtran**.

---

**Nota**: Este proyecto ha sido migrado de Tailwind CSS a Bootstrap manteniendo todas las funcionalidades originales y mejorando la compatibilidad y mantenibilidad del código.
