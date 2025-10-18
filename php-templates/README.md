# Silogtran - Guía de Integración con PHP/PradoFramework

## Descripción

Estos archivos HTML contienen las versiones completas y funcionales del sistema de login de Silogtran, convertidas a HTML/CSS/JavaScript vanilla para facilitar su integración con PHP y PradoFramework.

## Archivos Incluidos

1. **login.html** - Pantalla de inicio de sesión
2. **cost-center-selection.html** - Selección de centro de costo
3. **dashboard.html** - Dashboard principal con sidebar y métricas

## Características

- ✅ HTML/CSS/JavaScript vanilla (sin dependencias de React o Node.js)
- ✅ Diseño completamente responsive (móvil, tablet, escritorio)
- ✅ Formularios compatibles con PHP (action y method configurables)
- ✅ Validación del lado del cliente
- ✅ Estados de carga y mensajes de error
- ✅ Animaciones y transiciones suaves
- ✅ Sidebar colapsable con hover en desktop
- ✅ Todos los estilos usando Tailwind CSS CDN

## Integración con PradoFramework

### 1. Estructura de Archivos

Coloca los archivos HTML en tu estructura de Prado:

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

#### Ejemplo: Login.page

\`\`\`xml
<%@ Title="Silogtran - Iniciar Sesión" %>

<com:TContent ID="Main">
    <!-- Copia el contenido del body de login.html aquí -->
    
    <!-- Reemplaza el form HTML con TForm de Prado -->
    <com:TForm>
        <!-- Inputs -->
        <com:TTextBox 
            ID="Username"
            CssClass="w-full pl-10 sm:pl-12 h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-blue-900 focus:outline-none transition-all text-sm sm:text-base px-4"
            Attributes.placeholder="Ingresa tu usuario"
        />
        
        <com:TTextBox 
            ID="Password"
            TextMode="Password"
            CssClass="w-full pl-10 sm:pl-12 h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-blue-900 focus:outline-none transition-all text-sm sm:text-base px-4"
            Attributes.placeholder="Ingresa tu contraseña"
        />
        
        <!-- Submit Button -->
        <com:TButton 
            ID="LoginButton"
            Text="Iniciar Sesión"
            OnClick="loginUser"
            CssClass="w-full h-11 sm:h-12 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
        />
    </com:TForm>
</com:TContent>
\`\`\`

#### Ejemplo: Login.php

\`\`\`php
<?php
class Login extends TPage
{
    public function loginUser($sender, $param)
    {
        $username = $this->Username->Text;
        $password = $this->Password->Text;
        
        // Validación
        if (empty($username)) {
            // Mostrar error
            return;
        }
        
        if (empty($password)) {
            // Mostrar error
            return;
        }
        
        // Autenticar usuario
        if ($this->authenticateUser($username, $password)) {
            // Guardar en sesión
            $this->Session['username'] = $username;
            
            // Redirigir a selección de centro de costo
            $this->Response->redirect($this->Service->constructUrl('CostCenterSelection'));
        } else {
            // Mostrar error de credenciales inválidas
        }
    }
    
    private function authenticateUser($username, $password)
    {
        // Implementa tu lógica de autenticación aquí
        // Consulta a base de datos, verificación de contraseña, etc.
        return true; // Ejemplo
    }
}
\`\`\`

### 3. Poblar Datos Dinámicamente

#### Ejemplo: Cost Center Selection con datos de BD

\`\`\`php
<?php
class CostCenterSelection extends TPage
{
    public function onLoad($param)
    {
        parent::onLoad($param);
        
        if (!$this->IsPostBack) {
            // Cargar centros de costo desde la base de datos
            $centers = $this->getCostCenters();
            $this->CostCenterDropDown->DataSource = $centers;
            $this->CostCenterDropDown->DataTextField = 'name';
            $this->CostCenterDropDown->DataValueField = 'id';
            $this->CostCenterDropDown->dataBind();
        }
    }
    
    private function getCostCenters()
    {
        // Consulta a base de datos
        $sql = "SELECT id, name, location, users FROM cost_centers WHERE active = 1";
        // Ejecutar query y retornar resultados
        return $results;
    }
    
    public function selectCostCenter($sender, $param)
    {
        $centerId = $this->CostCenterDropDown->SelectedValue;
        
        // Guardar en sesión
        $this->Session['cost_center_id'] = $centerId;
        
        // Redirigir al dashboard
        $this->Response->redirect($this->Service->constructUrl('Dashboard'));
    }
}
\`\`\`

### 4. Dashboard con Datos Dinámicos

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
        
        // Cargar datos del dashboard
        $this->loadDashboardData();
    }
    
    private function loadDashboardData()
    {
        $username = $this->Session['username'];
        $costCenterId = $this->Session['cost_center_id'];
        
        // Obtener estadísticas
        $stats = $this->getStatistics($costCenterId);
        
        // Obtener envíos recientes
        $shipments = $this->getRecentShipments($costCenterId);
        
        // Pasar datos a la vista
        $this->StatsRepeater->DataSource = $stats;
        $this->StatsRepeater->dataBind();
        
        $this->ShipmentsRepeater->DataSource = $shipments;
        $this->ShipmentsRepeater->dataBind();
    }
    
    private function getStatistics($costCenterId)
    {
        // Consultar estadísticas desde la base de datos
        return [
            ['title' => 'Envíos Activos', 'value' => 24, 'change' => '+12%'],
            ['title' => 'Entregas Pendientes', 'value' => 8, 'change' => '-5%'],
            ['title' => 'Alertas', 'value' => 3, 'change' => '+2'],
            ['title' => 'Eficiencia', 'value' => '94%', 'change' => '+3%'],
        ];
    }
    
    private function getRecentShipments($costCenterId)
    {
        // Consultar envíos recientes desde la base de datos
        $sql = "SELECT * FROM shipments WHERE cost_center_id = ? ORDER BY created_at DESC LIMIT 10";
        // Ejecutar query y retornar resultados
        return $results;
    }
}
\`\`\`

### 5. Estilos CSS

Los archivos HTML usan Tailwind CSS CDN. Para producción, considera:

1. **Opción 1: Mantener CDN** (más fácil)
   \`\`\`html
   <script src="https://cdn.tailwindcss.com"></script>
   \`\`\`

2. **Opción 2: Compilar Tailwind localmente** (mejor rendimiento)
   - Instala Tailwind CSS en tu proyecto
   - Compila los estilos necesarios
   - Incluye el archivo CSS compilado

### 6. JavaScript

El JavaScript incluido en los archivos HTML es vanilla y funciona directamente. Puedes:

1. Dejarlo inline en los templates
2. Moverlo a archivos .js separados
3. Integrarlo con el sistema de assets de Prado

### 7. Manejo de Sesiones

\`\`\`php
// En cada página protegida
public function onLoad($param)
{
    parent::onLoad($param);
    
    if (!isset($this->Session['username'])) {
        $this->Response->redirect($this->Service->constructUrl('Login'));
        return;
    }
}

// Logout
public function logout($sender, $param)
{
    $this->Session->destroy();
    $this->Response->redirect($this->Service->constructUrl('Login'));
}
\`\`\`

### 8. Logos Personalizados

Reemplaza las rutas de las imágenes con las de tu empresa:

\`\`\`html
<!-- Logo de la empresa cliente -->
<img src="<?php echo $this->getClientLogoUrl(); ?>" alt="Logo Empresa" />

<!-- Logo de Silogtran -->
<img src="/images/silogtran-logo.png" alt="Silogtran" />
\`\`\`

## Personalización

### Colores

Los colores principales están definidos en las clases de Tailwind:
- Primario: `bg-blue-900`, `text-blue-900`
- Secundario: `bg-orange-500`, `text-orange-500`
- Éxito: `bg-green-500`, `text-green-500`
- Error: `bg-red-500`, `text-red-500`

Para cambiar los colores, puedes:
1. Buscar y reemplazar las clases en los archivos
2. Configurar Tailwind con tus colores personalizados

### Textos

Todos los textos están en español y pueden ser fácilmente modificados o internacionalizados usando el sistema de i18n de Prado.

## Soporte

Para cualquier duda sobre la integración, consulta:
- Documentación de PradoFramework: https://www.pradoframework.net/
- Documentación de Tailwind CSS: https://tailwindcss.com/docs

## Notas Importantes

1. **Seguridad**: Implementa validación del lado del servidor para todos los formularios
2. **Sanitización**: Sanitiza todas las entradas de usuario antes de guardarlas en la base de datos
3. **Autenticación**: Usa hashing seguro para contraseñas (bcrypt, Argon2)
4. **CSRF Protection**: Habilita la protección CSRF de Prado en todos los formularios
5. **SQL Injection**: Usa prepared statements para todas las consultas a la base de datos

## Licencia

© 2025 Colombia Software. Todos los derechos reservados.
