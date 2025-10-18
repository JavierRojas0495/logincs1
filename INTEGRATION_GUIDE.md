# Guía de Integración con PHP y PradoFramework

## Descripción General

Este proyecto contiene tres templates HTML/CSS/JavaScript vanilla que pueden integrarse fácilmente en tu aplicación PHP con PradoFramework:

1. **login.html** - Pantalla de inicio de sesión
2. **cost-center-selection.html** - Selección de centro de costo
3. **dashboard.html** - Panel principal del sistema

## Estructura de Archivos

\`\`\`
templates/
├── login.html
├── cost-center-selection.html
├── dashboard.html
└── INTEGRATION_GUIDE.md
\`\`\`

## Integración con PradoFramework

### 1. Convertir HTML a Templates de Prado

Los archivos HTML pueden convertirse a templates `.tpl` de Prado. Ejemplo:

**Antes (HTML):**
\`\`\`html
<form id="loginForm" action="/login.php" method="POST">
  <input type="text" id="username" name="username" required />
  <button type="submit">Iniciar Sesión</button>
</form>
\`\`\`

**Después (Prado Template):**
\`\`\`html
<com:TForm>
  <com:TTextBox ID="Username" CssClass="input-focus w-full px-4 py-3..." />
  <com:TButton Text="Iniciar Sesión" OnClick="handleLogin" CssClass="w-full bg-gradient..." />
</com:TForm>
\`\`\`

### 2. Integrar Tailwind CSS

Agrega Tailwind CSS a tu layout principal de Prado:

\`\`\`html
<!-- En tu archivo de layout principal -->
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
\`\`\`

O instala Tailwind localmente:

\`\`\`bash
npm install -D tailwindcss
npx tailwindcss init
\`\`\`

### 3. Manejo de Sesiones

Reemplaza los placeholders de JavaScript con variables PHP:

**JavaScript (placeholder):**
\`\`\`javascript
const userName = 'Usuario';
\`\`\`

**PHP en Template:**
\`\`\`php
<script>
  const userName = '<?php echo $_SESSION['username']; ?>';
  const costCenter = '<?php echo $_SESSION['cost_center_name']; ?>';
</script>
\`\`\`

### 4. Formularios y Validación

#### Login Form (login.html)

**Atributos del formulario:**
- `action="/login.php"` - Cambia a tu controlador de Prado
- `method="POST"` - Mantener
- Campos: `username`, `password`, `remember`

**Ejemplo de integración en Prado:**

\`\`\`php
// En tu Page class
class LoginPage extends TPage {
    public function handleLogin($sender, $param) {
        $username = $this->Username->Text;
        $password = $this->Password->Text;
        
        // Tu lógica de autenticación aquí
        if ($this->authenticateUser($username, $password)) {
            $_SESSION['username'] = $username;
            $this->Response->redirect('cost-center-selection.php');
        } else {
            // Mostrar error
        }
    }
}
\`\`\`

#### Cost Center Selection (cost-center-selection.html)

**Atributos del formulario:**
- `action="/select-cost-center.php"` - Cambia a tu controlador
- Campo: `cost_center`

**Ejemplo con datos dinámicos:**

\`\`\`php
// Generar opciones del dropdown desde PHP
<select id="costCenter" name="cost_center">
  <option value="">Selecciona un centro de costo</option>
  <?php foreach ($costCenters as $cc): ?>
    <option value="<?php echo $cc['id']; ?>">
      <?php echo $cc['name']; ?>
    </option>
  <?php endforeach; ?>
</select>
\`\`\`

### 5. Dashboard (dashboard.html)

El dashboard es completamente estático y puede poblarse con datos de PHP:

**Ejemplo de estadísticas:**

\`\`\`php
<div class="bg-white rounded-xl shadow-md p-6">
  <p class="text-gray-600 text-sm mb-1">Envíos Activos</p>
  <p class="text-3xl font-bold text-gray-900">
    <?php echo $stats['active_shipments']; ?>
  </p>
</div>
\`\`\`

**Ejemplo de tabla de envíos:**

\`\`\`php
<tbody>
  <?php foreach ($recentShipments as $shipment): ?>
    <tr>
      <td><?php echo $shipment['id']; ?></td>
      <td><?php echo $shipment['destination']; ?></td>
      <td><?php echo $shipment['date']; ?></td>
      <td>
        <span class="px-3 py-1 rounded-full bg-green-100 text-green-800">
          <?php echo $shipment['status']; ?>
        </span>
      </td>
    </tr>
  <?php endforeach; ?>
</tbody>
\`\`\`

### 6. JavaScript Vanilla

Todo el JavaScript es vanilla (sin dependencias) y funciona directamente:

- **Toggle password visibility** - Funciona sin cambios
- **Form validation** - Funciona sin cambios
- **Sidebar toggle** - Funciona sin cambios
- **Dropdown change events** - Funciona sin cambios

Puedes mantener el JavaScript tal cual o moverlo a archivos externos:

\`\`\`html
<script src="/js/login.js"></script>
\`\`\`

### 7. Logos Personalizados

Reemplaza los placeholders de logos con imágenes reales:

**Logo de la empresa cliente:**
\`\`\`html
<!-- Reemplazar esto: -->
<div class="w-40 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg">
  <span class="text-white font-bold text-xl">LOGO</span>
</div>

<!-- Con esto: -->
<img src="/images/client-logo.png" alt="Logo Empresa" class="w-40 h-20 object-contain" />
\`\`\`

**Logo de Silogtran:**
\`\`\`html
<img src="/images/silogtran-logo.png" alt="Silogtran" class="w-16 h-16" />
\`\`\`

### 8. Responsive Design

Todo el diseño es completamente responsive usando breakpoints de Tailwind:

- `sm:` - 640px y superior (tablets pequeñas)
- `md:` - 768px y superior (tablets)
- `lg:` - 1024px y superior (laptops)
- `xl:` - 1280px y superior (desktops)

No necesitas hacer cambios adicionales para responsive.

### 9. Estilos Personalizados

Los estilos personalizados están en las etiquetas `<style>` de cada archivo:

- Gradientes
- Animaciones
- Efectos glass
- Transiciones

Puedes moverlos a un archivo CSS externo:

\`\`\`css
/* styles/custom.css */
.gradient-bg {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%);
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
\`\`\`

### 10. Checklist de Integración

- [ ] Copiar archivos HTML a tu directorio de templates de Prado
- [ ] Agregar Tailwind CSS y Font Awesome a tu layout
- [ ] Convertir formularios HTML a componentes de Prado (TForm, TTextBox, etc.)
- [ ] Reemplazar placeholders de JavaScript con variables PHP de sesión
- [ ] Configurar rutas de formularios (action attributes)
- [ ] Agregar lógica de autenticación en controladores
- [ ] Poblar dropdowns con datos de base de datos
- [ ] Reemplazar logos placeholder con imágenes reales
- [ ] Poblar dashboard con datos reales de PHP
- [ ] Probar en diferentes dispositivos (responsive)

## Ventajas de esta Implementación

✅ **Sin dependencias de React/Node.js** - Todo es HTML/CSS/JS vanilla
✅ **Fácil integración con PHP** - Formularios estándar con action/method
✅ **Totalmente responsive** - Funciona en móviles, tablets y desktop
✅ **Diseño moderno** - Gradientes, sombras, animaciones suaves
✅ **Validación incluida** - JavaScript para validación del lado del cliente
✅ **Compatible con Prado** - Estructura lista para componentes de Prado

## Soporte

Si tienes preguntas sobre la integración, revisa:
1. Documentación de PradoFramework: https://www.pradoframework.net/
2. Documentación de Tailwind CSS: https://tailwindcss.com/docs
3. Los comentarios en el código de cada archivo HTML

## Próximos Pasos

1. Prueba cada template en tu navegador abriendo los archivos HTML directamente
2. Identifica qué partes necesitas modificar para tu caso de uso específico
3. Comienza la integración con el login.html (el más simple)
4. Continúa con cost-center-selection.html
5. Finaliza con dashboard.html (el más complejo)
