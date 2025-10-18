# Silogtran - Sistema de Gestión Logística
## Versión HTML/CSS/JavaScript Vanilla

Este paquete contiene la versión completa del sistema Silogtran convertida a HTML, CSS y JavaScript vanilla puro, lista para integrar con PHP y PradoFramework.

## Archivos Incluidos

1. **login.html** - Página de inicio de sesión
2. **cost-center-selection.html** - Selección de centro de costo
3. **dashboard.html** - Panel de control principal

## Características

- ✅ **100% HTML/CSS/JavaScript vanilla** - Sin dependencias de React, Vue o frameworks
- ✅ **Tailwind CSS via CDN** - Estilos modernos sin compilación
- ✅ **Diseño responsive completo** - Funciona en móviles, tablets y escritorio
- ✅ **Animaciones suaves** - Transiciones y efectos visuales
- ✅ **Formularios estándar** - Compatible con PHP backend
- ✅ **SessionStorage** - Manejo de sesión del lado del cliente
- ✅ **Sidebar con hover** - Menú lateral que se expande al pasar el mouse

## Integración con PHP/PradoFramework

### 1. Estructura de Archivos

Coloca los archivos HTML en tu directorio de templates de Prado:

\`\`\`
protected/
  pages/
    Login.php
    Login.page
    CostCenterSelection.php
    CostCenterSelection.page
    Dashboard.php
    Dashboard.page
\`\`\`

### 2. Convertir HTML a Templates de Prado

Ejemplo de conversión del login:

**Login.page (Template de Prado):**

\`\`\`xml
<%@ Title="Silogtran - Iniciar Sesión" %>

<com:TContent ID="Main">
    <!-- Copia el contenido del body de login.html aquí -->
    
    <!-- Reemplaza el formulario HTML con componentes de Prado -->
    <com:TForm>
        <div class="space-y-4 md:space-y-5">
            <!-- Error Alert -->
            <com:TPanel ID="ErrorPanel" Visible="false" CssClass="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <com:TLabel ID="ErrorMessage" CssClass="text-sm text-red-800" />
            </com:TPanel>

            <!-- Username Field -->
            <div class="space-y-2">
                <label for="username" class="block text-sm font-medium text-gray-700">Usuario</label>
                <div class="relative group">
                    <svg class="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400">...</svg>
                    <com:TTextBox 
                        ID="UsernameInput"
                        CssClass="w-full pl-10 sm:pl-12 h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-blue-600"
                        Attributes.placeholder="Ingresa tu usuario"
                    />
                </div>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                <div class="relative group">
                    <svg class="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400">...</svg>
                    <com:TTextBox 
                        ID="PasswordInput"
                        TextMode="Password"
                        CssClass="w-full pl-10 sm:pl-12 h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-blue-600"
                        Attributes.placeholder="Ingresa tu contraseña"
                    />
                </div>
            </div>

            <!-- Submit Button -->
            <com:TButton
                ID="LoginButton"
                Text="Iniciar Sesión"
                OnClick="loginUser"
                CssClass="w-full h-11 sm:h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            />
        </div>
    </com:TForm>
</com:TContent>
\`\`\`

**Login.php (Lógica del servidor):**

\`\`\`php
<?php
class Login extends TPage
{
    public function loginUser($sender, $param)
    {
        $username = $this->UsernameInput->Text;
        $password = $this->PasswordInput->Text;
        
        // Validación
        if (empty($username) || empty($password)) {
            $this->ErrorPanel->Visible = true;
            $this->ErrorMessage->Text = 'Usuario y contraseña son requeridos';
            return;
        }
        
        // Autenticación (reemplaza con tu lógica)
        $user = $this->authenticateUser($username, $password);
        
        if ($user) {
            // Guardar en sesión
            $this->Session['username'] = $username;
            $this->Session['user_id'] = $user->id;
            
            // Redirigir a selección de centro de costo
            $this->Response->redirect($this->Service->constructUrl('CostCenterSelection'));
        } else {
            $this->ErrorPanel->Visible = true;
            $this->ErrorMessage->Text = 'Credenciales inválidas';
        }
    }
    
    private function authenticateUser($username, $password)
    {
        // Implementa tu lógica de autenticación aquí
        // Ejemplo con base de datos:
        $sql = "SELECT * FROM users WHERE username = ? AND password = ?";
        // Usa password_verify() para contraseñas hasheadas
        return $this->db->query($sql, [$username, password_hash($password, PASSWORD_DEFAULT)]);
    }
}
?>
\`\`\`

### 3. Manejo de Sesiones

Reemplaza `sessionStorage` con sesiones de PHP:

**JavaScript (cliente):**
\`\`\`javascript
// Antes (sessionStorage)
sessionStorage.setItem('username', username);

// Después (PHP session - no necesitas JavaScript)
// La sesión se maneja en el servidor
\`\`\`

**PHP (servidor):**
\`\`\`php
// Guardar en sesión
$this->Session['username'] = $username;
$this->Session['cost_center'] = $centerName;

// Leer de sesión
$username = $this->Session['username'];
$costCenter = $this->Session['cost_center'];

// Verificar autenticación
if (!isset($this->Session['username'])) {
    $this->Response->redirect($this->Service->constructUrl('Login'));
}
\`\`\`

### 4. Poblar Datos Dinámicamente

**Dashboard con datos de PHP:**

\`\`\`php
<?php
class Dashboard extends TPage
{
    public function onLoad($param)
    {
        parent::onLoad($param);
        
        // Verificar autenticación
        if (!isset($this->Session['username'])) {
            $this->Response->redirect($this->Service->constructUrl('Login'));
            return;
        }
        
        // Cargar datos del usuario
        $username = $this->Session['username'];
        $costCenter = $this->Session['cost_center'];
        
        // Cargar estadísticas
        $stats = $this->getStatistics();
        $this->StatsRepeater->DataSource = $stats;
        $this->StatsRepeater->dataBind();
        
        // Cargar envíos recientes
        $shipments = $this->getRecentShipments();
        $this->ShipmentsRepeater->DataSource = $shipments;
        $this->ShipmentsRepeater->dataBind();
    }
    
    private function getStatistics()
    {
        // Consulta a la base de datos
        $sql = "SELECT 
                    COUNT(*) as active_shipments,
                    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
                    SUM(CASE WHEN status = 'alert' THEN 1 ELSE 0 END) as alerts
                FROM shipments 
                WHERE cost_center_id = ?";
        
        return $this->db->query($sql, [$this->Session['cost_center_id']]);
    }
    
    private function getRecentShipments()
    {
        $sql = "SELECT * FROM shipments 
                WHERE cost_center_id = ? 
                ORDER BY created_at DESC 
                LIMIT 10";
        
        return $this->db->query($sql, [$this->Session['cost_center_id']]);
    }
}
?>
\`\`\`

### 5. Menú de Navegación Dinámico

**Dashboard.page:**

\`\`\`xml
<com:TRepeater ID="NavRepeater">
    <prop:ItemTemplate>
        <button 
            onclick="setActiveNav(this)" 
            class="nav-item w-full flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl transition-all duration-200 text-slate-300 hover:bg-white/5 hover:text-white"
            title="<%# $this->Data['label'] %>"
        >
            <svg class="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0">
                <%# $this->Data['icon'] %>
            </svg>
            <span class="font-medium text-xs lg:text-sm whitespace-nowrap sidebar-text">
                <%# $this->Data['label'] %>
            </span>
        </button>
    </prop:ItemTemplate>
</com:TRepeater>
\`\`\`

**Dashboard.php:**

\`\`\`php
public function onLoad($param)
{
    parent::onLoad($param);
    
    // Definir opciones del menú
    $navItems = [
        ['label' => 'Dashboard', 'icon' => '<path d="..."/>', 'url' => 'Dashboard'],
        ['label' => 'Basicos', 'icon' => '<path d="..."/>', 'url' => 'Basicos'],
        ['label' => 'Contable', 'icon' => '<path d="..."/>', 'url' => 'Contable'],
        // ... más opciones
    ];
    
    $this->NavRepeater->DataSource = $navItems;
    $this->NavRepeater->dataBind();
}
\`\`\`

## Personalización

### Cambiar Colores

Edita las clases de Tailwind en los archivos HTML:

\`\`\`html
<!-- Color primario (azul) a verde -->
<!-- Antes: bg-blue-600 -->
<button class="bg-green-600 hover:bg-green-700">

<!-- Cambiar gradientes -->
<!-- Antes: from-blue-700 via-blue-600 to-blue-700 -->
<div class="bg-gradient-to-br from-green-700 via-green-600 to-green-700">
\`\`\`

### Cambiar Logo de la Empresa

Reemplaza el placeholder del logo con tu imagen:

\`\`\`html
<!-- En login.html, cost-center-selection.html y dashboard.html -->
<div class="flex items-center gap-2 sm:gap-3 md:gap-4">
    <div class="bg-blue-500/10 p-2 md:p-3 rounded-lg md:rounded-xl">
        <!-- Reemplaza el SVG con tu logo -->
        <img src="/ruta/a/tu/logo.png" alt="Logo Empresa" class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
    </div>
    <div>
        <h1 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Nombre de tu Empresa</h1>
        <p class="text-xs sm:text-sm text-gray-600">Descripción</p>
    </div>
</div>
\`\`\`

### Agregar Logo de Silogtran

Coloca tu logo de Silogtran en la carpeta public:

\`\`\`html
<!-- En el lado derecho del login -->
<img src="/ruta/a/silogtran-logo.png" alt="Silogtran" class="h-28 w-auto drop-shadow-2xl" />
\`\`\`

## Notas Importantes

1. **Tailwind CSS**: Los archivos usan Tailwind via CDN. Para producción, considera compilar Tailwind localmente para mejor rendimiento.

2. **Iconos SVG**: Los iconos están inline como SVG. Puedes reemplazarlos con una librería de iconos si prefieres.

3. **Validación**: La validación actual es del lado del cliente. Asegúrate de implementar validación robusta en el servidor con PHP.

4. **Seguridad**: 
   - Usa `password_hash()` y `password_verify()` para contraseñas
   - Implementa protección CSRF en formularios de Prado
   - Sanitiza todas las entradas del usuario
   - Usa prepared statements para consultas SQL

5. **SessionStorage**: El código usa `sessionStorage` para demo. En producción, usa sesiones de PHP del lado del servidor.

## Soporte

Para más información sobre PradoFramework, visita: https://github.com/pradosoft/prado

## Licencia

© 2025 Colombia Software. Todos los derechos reservados.
