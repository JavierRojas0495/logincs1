"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Truck,
  Package,
  AlertTriangle,
  TrendingUp,
  LogOut,
  Menu,
  Home,
  BarChart3,
  Settings,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Bell,
  Search,
  Calendar,
  Globe,
  FileText,
  Wrench,
  DollarSign,
  ClipboardList,
  BookOpen,
  Box,
  ChevronLeft,
  ChevronRight,
  Shield,
  User,
  RefreshCw,
  Activity,
} from "lucide-react"

interface DashboardProps {
  username: string
  costCenter: string
  onLogout: () => void
}

// Navigation items
const NAV_ITEMS = [
  { 
    section: "PANEL PRINCIPAL",
    items: [
      { icon: Home, label: "Dashboard", active: true, badge: null },
      { icon: Clock, label: "Historial", active: false, badge: { text: "2", color: "orange" } },
    ]
  },
  { 
    section: "MÓDULOS",
    items: [
      { icon: BookOpen, label: "Basicos", active: false, badge: null, submenu: [
        "Actividad Economica", "Analista", "Autorizacion", "Banco", "Barrio", "Cargo", 
        "Carroceria", "CausaModulo", "Ciudad", "Clase Vehiculo", "Color", "Empaque", "Empresa"
      ]},
      { icon: CheckCircle2, label: "Calidad", active: false, badge: null, submenu: [
        "ActividadesCalidad", "Auditoria", "Hallazgo", "MapaProceso", "MotivoHallazgo", 
        "PlanAuditoria", "ProgramaAuditoria", "Proyecto", "QuejasSugerencias"
      ]},
      { icon: DollarSign, label: "Contable", active: false, badge: null, submenu: [
        "ActivoFijo", "CierreContableSistema", "CierreContableMensual", "ClaseCuenta", 
        "ConfiguracionCuentaInforme", "ConsultaContable", "Cuenta", "GrupoCuenta", "MediosMageneticos"
      ]},
      { icon: Truck, label: "Despacho", active: false, badge: null, submenu: [
        "AgendaComercial", "AtencionCliente", "BloqueoManifiesto", "CheckList", "Comodato", 
        "Cotizacion", "Cubicaje", "CumplimientoManifiesto", "EntregaContenedor", "Enturnamiento"
      ]},
      { icon: BarChart3, label: "Financiero", active: false, badge: null, submenu: [
        "Caja", "CajaGeneral", "Cartera", "Carteratransportador", "Causacion", "CierreModulo", 
        "Comprobanteegreso", "Comprobanteingreso", "Comprobanteretencionrecepcion", "Factura"
      ]},
      { icon: Users, label: "Gerencia", active: false, badge: null, submenu: [
        "Informes"
      ]},
      { icon: TrendingUp, label: "Indicador", active: false, badge: null, submenu: [
        "Ind", "Indicadorescliente"
      ]},
      { icon: Globe, label: "Internacional", active: false, badge: null, submenu: [
        "CartaporteCarretera", "CumplidoCartaPorte", "DeclaracionTransitoAduanero", "ManifiestoCargaInternacional"
      ]},
      { icon: Package, label: "Inventario", active: false, badge: null, submenu: [
        "Articulo", "Bodega", "Estructura", "Indicadores", "inventariocedi", "Movimiento", 
        "MovimientoInventario", "Solicitudalistamiento", "Ubicacion", "Vin", "Zona"
      ]},
      { icon: Settings, label: "Maestros", active: false, badge: null, submenu: [
        "Aduana", "Agencia", "Api", "Aseguradora", "AuditorioEnvioCorreo", "BloqueoCliente", 
        "BloqueoTercero", "BloqueoVehiculo", "Buque", "Capacitacion", "CentroCosto", 
        "ClasificacionFlota", "CLiente", "Consignatario", "Contenedor"
      ]},
      { icon: Wrench, label: "Mantenimiento", active: false, badge: null, submenu: [
        "Caracteristica", "ClaseTarea", "Componente", "ConceptoCostoEquipo", "CostoEquipo", 
        "CostoEquiPolote", "CostoFijoEquipo", "OrdenServicio", "OrdenDeTrabajo", "Sistema", "Tarea"
      ]},
      { icon: FileText, label: "Niif", active: false, badge: null, submenu: [
        "CierreContableniif", "ClaseCuentaNiff", "ConceptoNiif", "ConfiguracionCuentaInformeNiif", 
        "ConsultaContableNiif", "CuentaNiif", "GrupoCuentaNiif"
      ]}
    ]
  }
]

// Stats data
const STATS = [
  {
    title: "Manifiestos",
    value: "0",
    change: "+15%",
    trend: "up",
    icon: FileText,
    color: "blue",
    progress: 75,
  },
  {
    title: "Listar Manifiestos",
    value: "0",
    change: "+8%",
    trend: "up",
    icon: ClipboardList,
    color: "green",
    progress: 60,
  },
  {
    title: "Solicitud de Transporte",
    value: "8",
    change: "+12%",
    trend: "up",
    icon: Truck,
    color: "orange",
    progress: 85,
  },
  {
    title: "Eficiencia",
    value: "95%",
    change: "-0%",
    trend: "neutral",
    icon: TrendingUp,
    color: "blue",
    progress: 95,
  },
]

export default function Dashboard({ username, costCenter, onLogout }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({})
  
  // Notificaciones
  const notifications = [
    { id: 1, message: "Se actualizó la Remesa #R2025001", time: "Hace 5 min", type: "update" },
    { id: 2, message: "Se creó el Manifiesto #M2025002", time: "Hace 15 min", type: "create" },
    { id: 3, message: "Se confirmó el Manifiesto #M2025001", time: "Hace 1 hora", type: "confirm" },
    { id: 4, message: "Se debe actualizar los documentos soportes #D2025003", time: "Hace 2 horas", type: "warning" }
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleSubmenu = (label: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  return (
    <div className="min-vh-100 d-flex" style={{backgroundColor: 'var(--background-light)'}}>
      {/* Sidebar */}
      <aside className={`transition-all position-fixed top-0 start-0 h-100 sidebar-custom ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
             style={{zIndex: 1050, width: sidebarOpen ? '18rem' : '4rem'}}>
        <div className="d-flex flex-column h-100">
          {/* Navigation */}
          <nav className="flex-fill overflow-auto" style={{
            paddingTop: '3rem',
            paddingLeft: sidebarOpen ? '0.75rem' : '0.5rem',
            paddingRight: sidebarOpen ? '0.75rem' : '0.5rem',
            paddingBottom: '0.75rem'
          }}>
            {NAV_ITEMS.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-4">
                {sidebarOpen && (
                  <h6 className="small fw-bold text-white-50 mb-3 px-3">{section.section}</h6>
                )}
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className={sidebarOpen ? "mb-1" : "mb-2"}>
                    <button
                      className={`w-100 d-flex align-items-center rounded-3 border-0 transition-all ${
                        item.active
                          ? "text-white shadow"
                          : "text-dark"
                      } ${sidebarOpen ? 'gap-3 px-3 py-3' : 'justify-content-center px-2 py-3'}`}
                      style={item.active ? 
                        {backgroundColor: 'var(--primary-color)'} : 
                        {backgroundColor: 'white', color: 'var(--text-color)'}
                      }
                      title={sidebarOpen ? item.label : item.label}
                      onClick={() => item.submenu && sidebarOpen ? toggleSubmenu(item.label) : undefined}
                    >
                      <item.icon className="flex-shrink-0" style={{
                        width: '1.25rem', 
                        height: '1.25rem',
                        color: item.active ? 'white' : 'var(--primary-color)'
                      }} />
                      {sidebarOpen && (
                        <>
                          <span className="fw-medium small flex-fill" style={{
                            color: item.active ? 'white' : 'var(--text-color)'
                          }}>{item.label}</span>
                          {item.badge && (
                            <span className="badge px-2 py-1" 
                                  style={{
                                    fontSize: '0.7rem',
                                    backgroundColor: item.badge.color === 'orange' ? '#f59e0b' : '#3b82f6',
                                    color: 'white'
                                  }}>
                              {item.badge.text}
                            </span>
                          )}
                          {item.submenu && (
                            <ChevronRight 
                              className="flex-shrink-0" 
                              style={{
                                width: '1rem', 
                                height: '1rem',
                                color: item.active ? 'white' : 'var(--text-muted)',
                                transform: expandedMenus[item.label] ? 'rotate(90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease'
                              }} 
                            />
                          )}
                          {item.active && !item.submenu && (
                            <div className="rounded-circle bg-white" style={{width: '0.5rem', height: '0.5rem'}}></div>
                          )}
                        </>
                      )}
                    </button>
                    
                    {/* Submenu */}
                    {item.submenu && sidebarOpen && expandedMenus[item.label] && (
                      <div className="ms-4 mt-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <button
                            key={subIndex}
                            className="w-100 d-flex align-items-center gap-2 px-3 py-2 rounded-2 border-0 mb-1 transition-all text-start"
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              color: 'rgba(255, 255, 255, 0.8)',
                              fontSize: '0.8rem'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            <div className="rounded-circle" style={{
                              width: '0.25rem', 
                              height: '0.25rem', 
                              backgroundColor: 'rgba(255, 255, 255, 0.6)'
                            }}></div>
                            <span className="small">{subItem}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </nav>

          {/* Footer Section */}
          <div className="p-3 border-top border-secondary border-opacity-50">
            <div className="rounded-3 p-3 border" style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)'}}>
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center flex-shrink-0" 
                     style={{width: '2.5rem', height: '2.5rem'}}>
                  <Image 
                    src="/img/corporativo/silogtran_logo.png" 
                    alt="Silogtran Logo" 
                    width={40} 
                    height={40} 
                    className="img-fluid" 
                    style={{maxWidth: '100%', height: 'auto'}}
                  />
                </div>
                {sidebarOpen && (
                  <div className="flex-fill min-w-0">
                    <p className="small fw-semibold text-white mb-1">Silogtran</p>
                    <p className="small text-white-50 mb-0" style={{fontSize: '0.7rem', lineHeight: '1.2'}}>
                      Desarrollado por Colombia Software
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-fill" style={{marginLeft: sidebarOpen ? '18rem' : '4rem', transition: 'margin-left 0.3s ease'}}>
        {/* Header */}
        <header className="sticky-top backdrop-blur-xl border-bottom shadow-sm" 
                style={{zIndex: 40, backgroundColor: 'var(--background-color)', borderColor: 'var(--border-color)'}}>
          <div className="d-flex align-items-center justify-content-between px-4 py-3">
            <div className="d-flex align-items-center gap-3">
              {/* Toggle Button */}
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleSidebar}
              >
                {sidebarOpen ? <ChevronLeft style={{width: '1.25rem', height: '1.25rem'}} /> : <ChevronRight style={{width: '1.25rem', height: '1.25rem'}} />}
              </button>
              
              {/* Company Logo and Info */}
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center" style={{width: '3rem', height: '3rem'}}>
                  <Image 
                    src="/img/corporativo/logo_repremundo.gif" 
                    alt="Repremundo Logo" 
                    width={48} 
                    height={48} 
                    className="img-fluid" 
                    style={{maxWidth: '100%', height: 'auto'}}
                  />
                </div>
                <div>
                  <h2 className="h6 fw-bold mb-0" style={{color: 'var(--text-color)'}}>Repremundo</h2>
                  <p className="small mb-0" style={{color: 'var(--text-muted)'}}>Silogtran</p>
                </div>
              </div>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              {/* Notifications Dropdown */}
              <div className="dropdown">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary position-relative" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <Bell style={{width: '1.25rem', height: '1.25rem'}} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                        style={{width: '0.5rem', height: '0.5rem', fontSize: '0.7rem'}}>
                    {notifications.length}
                  </span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow" style={{minWidth: '320px', maxWidth: '400px'}}>
                  <li>
                    <h6 className="dropdown-header d-flex align-items-center justify-content-between">
                      <span>Notificaciones</span>
                      <span className="badge bg-primary rounded-pill">{notifications.length}</span>
                    </h6>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  {notifications.map((notification) => (
                    <li key={notification.id}>
                      <div className="dropdown-item-text p-3">
                        <div className="d-flex align-items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className={`rounded-circle d-flex align-items-center justify-content-center`}
                                 style={{
                                   width: '2rem', 
                                   height: '2rem',
                                   backgroundColor: notification.type === 'warning' ? 'var(--warning-color)' : 
                                                  notification.type === 'confirm' ? 'var(--success-color)' :
                                                  notification.type === 'create' ? 'var(--info-color)' : 'var(--primary-color)'
                                 }}>
                              {notification.type === 'update' && <TrendingUp style={{width: '1rem', height: '1rem', color: 'white'}} />}
                              {notification.type === 'create' && <FileText style={{width: '1rem', height: '1rem', color: 'white'}} />}
                              {notification.type === 'confirm' && <CheckCircle2 style={{width: '1rem', height: '1rem', color: 'white'}} />}
                              {notification.type === 'warning' && <AlertTriangle style={{width: '1rem', height: '1rem', color: 'white'}} />}
                            </div>
                          </div>
                          <div className="flex-fill">
                            <p className="small mb-1 fw-medium" style={{color: 'var(--text-color)'}}>
                              {notification.message}
                            </p>
                            <p className="small mb-0" style={{color: 'var(--text-muted)'}}>
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-center fw-medium" type="button">
                      Ver todas las notificaciones
                    </button>
                  </li>
                </ul>
              </div>

              {/* User Profile Dropdown */}
              <div className="dropdown">
                <button 
                  className="btn d-flex align-items-center gap-3 p-3 rounded-3 border-0 transition-all" 
                  type="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                  style={{
                    backgroundColor: 'var(--background-light)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-color)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    minWidth: '200px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--card-bg)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.borderColor = 'var(--primary-color)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--background-light)'
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'var(--border-color)'
                  }}
                >
                  <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" 
                       style={{width: '2.5rem', height: '2.5rem', backgroundColor: 'var(--primary-color)'}}>
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <div className="d-none d-md-block text-start flex-fill">
                    <p className="small fw-semibold mb-1" style={{color: 'var(--text-color)'}}>{username}</p>
                    <p className="small mb-0" style={{color: 'var(--text-muted)'}}>{costCenter}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <ChevronRight style={{width: '1rem', height: '1rem', color: 'var(--text-muted)'}} />
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow" style={{minWidth: '200px'}}>
                  <li>
                    <h6 className="dropdown-header">Opciones de Usuario</h6>
                  </li>
                  <li>
                    <button className="dropdown-item d-flex align-items-center gap-2" type="button">
                      <Settings style={{width: '1rem', height: '1rem'}} />
                      Configuración
                    </button>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item d-flex align-items-center gap-2 text-danger" 
                      type="button"
                      onClick={onLogout}
                    >
                      <LogOut style={{width: '1rem', height: '1rem'}} />
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4">
          {/* Welcome Banner */}
          <div className="mb-4 p-4 rounded-3 position-relative overflow-hidden" 
               style={{backgroundColor: 'var(--primary-color)', minHeight: '12rem'}}>
            <div className="position-absolute top-0 end-0 opacity-25">
              <Truck style={{width: '8rem', height: '8rem', color: 'white'}} />
            </div>
            
            <div className="position-relative">
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill" 
                     style={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                  <User style={{width: '1rem', height: '1rem', color: 'white'}} />
                  <span className="small text-white">Usuario Autenticado</span>
                </div>
              </div>
              
              <h1 className="h2 fw-bold text-white mb-2">¡Bienvenido, {username}!</h1>
              <p className="text-white-75 mb-4">Sistema de Logística de Transporte de Mercancías</p>
              
              <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-3">
                <div className="d-flex align-items-center gap-2">
                  <Clock style={{width: '1rem', height: '1rem', color: 'rgba(255, 255, 255, 0.8)'}} />
                  <span className="small text-white-75">Último acceso: {new Date().toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Shield style={{width: '1rem', height: '1rem', color: 'rgba(255, 255, 255, 0.8)'}} />
                  <span className="small text-white-75">Sesión segura activa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row g-3 g-sm-4 mb-4">
            {STATS.map((stat) => (
              <div key={stat.title} className="col-12 col-sm-6 col-lg-3">
                <div className="p-4 rounded-3" 
                     style={{backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)', transition: 'all 0.3s ease'}}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'translateY(-2px)'
                       e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'translateY(0)'
                       e.currentTarget.style.boxShadow = 'var(--shadow)'
                     }}>
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="p-3 rounded-3" 
                         style={{backgroundColor: stat.color === 'blue' ? 'rgba(59, 130, 246, 0.1)' : 
                                          stat.color === 'green' ? 'rgba(16, 185, 129, 0.1)' : 
                                          'rgba(245, 158, 11, 0.1)'}}>
                      <stat.icon style={{
                        width: '1.5rem', 
                        height: '1.5rem', 
                        color: stat.color === 'blue' ? 'var(--primary-color)' : 
                               stat.color === 'green' ? 'var(--success-color)' : 
                               'var(--warning-color)'
                      }} />
                    </div>
                    <span className="badge border-0 fw-semibold px-2 py-1" 
                          style={{
                            backgroundColor: stat.trend === 'up' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                            color: stat.trend === 'up' ? 'var(--success-color)' : 'var(--text-muted)',
                            borderRadius: '0.5rem'
                          }}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="mb-3">
                    <p className="h4 fw-bold mb-1" style={{color: 'var(--text-color)'}}>{stat.value}</p>
                    <p className="small fw-medium mb-0" style={{color: 'var(--text-muted)'}}>{stat.title}</p>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-100 rounded-pill overflow-hidden" 
                       style={{height: '0.5rem', backgroundColor: 'var(--background-light)'}}>
                    <div
                      className="h-100 transition-all rounded-pill"
                      style={{ 
                        width: `${stat.progress}%`, 
                        backgroundColor: stat.color === 'blue' ? 'var(--primary-color)' : 
                                        stat.color === 'green' ? 'var(--success-color)' : 
                                        'var(--warning-color)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="row g-4">
            {/* Activity Summary */}
            <div className="col-12 col-lg-6">
              <div className="p-4 rounded-3" 
                   style={{backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)'}}>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="p-2 rounded-3" style={{backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
                    <Activity style={{width: '1.25rem', height: '1.25rem', color: 'var(--primary-color)'}} />
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-1" style={{color: 'var(--text-color)'}}>Resumen de Actividad</h3>
                    <p className="small mb-0" style={{color: 'var(--text-muted)'}}>Estado actual del sistema de manifiestos</p>
                  </div>
                </div>
                <button className="btn btn-sm d-flex align-items-center gap-2" 
                        style={{backgroundColor: 'var(--primary-color)', color: 'white', border: 'none'}}>
                  <RefreshCw style={{width: '1rem', height: '1rem'}} />
                  Actualizar
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="col-12 col-lg-6">
              <div className="p-4 rounded-3" 
                   style={{backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)'}}>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="p-2 rounded-3 position-relative" style={{backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
                    <Bell style={{width: '1.25rem', height: '1.25rem', color: 'var(--primary-color)'}} />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                          style={{width: '0.5rem', height: '0.5rem', fontSize: '0.7rem'}}>3</span>
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-1" style={{color: 'var(--text-color)'}}>Notificaciones</h3>
                    <p className="small mb-0" style={{color: 'var(--text-muted)'}}>Actividad reciente</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 p-3 rounded-3" 
                     style={{backgroundColor: 'var(--background-light)'}}>
                  <div className="p-2 rounded-3" style={{backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
                    <FileText style={{width: '1rem', height: '1rem', color: 'var(--primary-color)'}} />
                  </div>
                  <span className="small" style={{color: 'var(--text-color)'}}>Nuevo manifiesto creado</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}