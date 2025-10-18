# Silogtran - Bootstrap Version

Esta es la versión completa del sistema Silogtran convertida a Bootstrap 5, usando solo HTML, CSS y JavaScript vanilla.

## Archivos Incluidos

- `login.html` - Página de inicio de sesión
- `cost-center-selection.html` - Selección de centro de costo
- `dashboard.html` - Panel de control principal

## Características

- **Bootstrap 5.3** - Framework CSS moderno y responsive
- **HTML5 Semántico** - Estructura limpia y accesible
- **CSS Personalizado** - Animaciones y estilos adicionales
- **JavaScript Vanilla** - Sin dependencias adicionales
- **Totalmente Responsive** - Funciona en móviles, tablets y escritorio
- **Compatible con PHP** - Formularios estándar listos para integración

## Integración con PHP/PradoFramework

### 1. Formularios

Los formularios usan atributos estándar `action` y `method`:

\`\`\`html
<form id="loginForm" action="login.php" method="POST">
    <input type="text" name="username" class="form-control" required />
    <input type="password" name="password" class="form-control" required />
    <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
</form>
\`\`\`

### 2. Componentes de Prado

Convierte los inputs HTML a componentes TTextBox de Prado:

\`\`\`php
<com:TTextBox 
    ID="Username" 
    CssClass="form-control form-control-lg input-with-icon rounded-3"
    Attributes.placeholder="Ingresa tu usuario"
/>
\`\`\`

### 3. Validación del Lado del Servidor

\`\`\`php
public function loginButtonClicked($sender, $param) {
    $username = $this->Username->Text;
    $password = $this->Password->Text;
    
    if ($this->validateCredentials($username, $password)) {
        $this->Session['username'] = $username;
        $this->Response->redirect('cost-center-selection.php');
    } else {
        $this->ErrorMessage->Text = 'Credenciales inválidas';
        $this->ErrorMessage->Visible = true;
    }
}
\`\`\`

### 4. Datos Dinámicos

Usa PHP para poblar el menú lateral y datos del dashboard:

\`\`\`php
<!-- Sidebar Navigation -->
<?php
$menuItems = [
    ['icon' => 'home', 'label' => 'Dashboard', 'active' => true],
    ['icon' => 'file', 'label' => 'Basicos', 'active' => false],
    ['icon' => 'book', 'label' => 'Contable', 'active' => false],
    // ... más items
];

foreach ($menuItems as $item): ?>
    <button class="nav-item <?= $item['active'] ? 'active' : '' ?>">
        <!-- Icon SVG -->
        <span class="sidebar-text"><?= $item['label'] ?></span>
    </button>
<?php endforeach; ?>
\`\`\`

## Personalización

### Colores

Modifica las variables de Bootstrap en un archivo CSS personalizado:

\`\`\`css
:root {
    --bs-primary: #0d6efd;
    --bs-secondary: #6c757d;
    --bs-success: #198754;
    --bs-danger: #dc3545;
    --bs-warning: #ffc107;
    --bs-info: #0dcaf0;
}
\`\`\`

### Logos

Reemplaza las imágenes de logos:

\`\`\`html
<!-- Logo de la empresa cliente -->
<img src="ruta/al/logo-empresa.png" alt="Logo Empresa" />

<!-- Logo de Silogtran -->
<img src="ruta/al/silogtran-logo.png" alt="Silogtran" />
\`\`\`

## Soporte

Para más información sobre Bootstrap 5, visita: https://getbootstrap.com/docs/5.3/
