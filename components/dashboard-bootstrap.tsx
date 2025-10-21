"use client"

import { useState } from "react"
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
} from "lucide-react"

interface DashboardProps {
  username: string
  costCenter: string
  onLogout: () => void
}

// Mock data
const STATS = [
  {
    title: "Envíos Activos",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Truck,
    color: "text-primary",
    bgColor: "bg-primary bg-opacity-10",
  },
  {
    title: "Entregas Pendientes",
    value: "8",
    change: "-5%",
    trend: "down",
    icon: Package,
    color: "text-warning",
    bgColor: "bg-warning bg-opacity-10",
  },
  {
    title: "Alertas",
    value: "3",
    change: "+2",
    trend: "up",
    icon: AlertTriangle,
    color: "text-danger",
    bgColor: "bg-danger bg-opacity-10",
  },
  {
    title: "Eficiencia",
    value: "94%",
    change: "+3%",
    trend: "up",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success bg-opacity-10",
  },
]

const RECENT_SHIPMENTS = [
  {
    id: "ENV-2025-001",
    origin: "Ciudad de México",
    destination: "Guadalajara",
    status: "En tránsito",
    eta: "2 horas",
    statusColor: "bg-primary",
    progress: 65,
  },
  {
    id: "ENV-2025-002",
    origin: "Monterrey",
    destination: "Tijuana",
    status: "Entregado",
    eta: "Completado",
    statusColor: "bg-success",
    progress: 100,
  },
  {
    id: "ENV-2025-003",
    origin: "Puebla",
    destination: "Cancún",
    status: "Retrasado",
    eta: "5 horas",
    statusColor: "bg-danger",
    progress: 45,
  },
  {
    id: "ENV-2025-004",
    origin: "Querétaro",
    destination: "Mérida",
    status: "En tránsito",
    eta: "3 horas",
    statusColor: "bg-primary",
    progress: 80,
  },
]

const NAV_ITEMS = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: ClipboardList, label: "Basicos", active: false },
  { icon: BookOpen, label: "Contable", active: false },
  { icon: Truck, label: "Despacho", active: false },
  { icon: DollarSign, label: "Financiero", active: false },
  { icon: Globe, label: "Internacional", active: false },
  { icon: Box, label: "Inventario", active: false },
  { icon: Users, label: "Maestros", active: false },
  { icon: Wrench, label: "Mantenimiento", active: false },
  { icon: FileText, label: "Niif", active: false },
  { icon: ClipboardList, label: "Requerimiento", active: false },
  { icon: Settings, label: "Rodamiento", active: false },
]

const QUICK_ACTIONS = [
  { icon: Package, label: "Nueva Orden", color: "bg-primary" },
  { icon: Truck, label: "Despacho", color: "bg-warning" },
  { icon: FileText, label: "Manifiesto", color: "bg-success" },
  { icon: BarChart3, label: "Reportes", color: "bg-info" },
]

export default function Dashboard({ username, costCenter, onLogout }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-vh-100" style={{background: 'linear-gradient(135deg, #f8fafc, #dbeafe, #f8fafc)'}}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none" 
             style={{zIndex: 1040}} 
             onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`position-fixed top-0 start-0 h-100 sidebar-custom transition-all ${sidebarOpen ? 'translate-x-0' : 'translate-x-100 d-lg-block'} d-lg-block`}
             style={{width: '18rem', zIndex: 1050}}>
        <div className="d-flex flex-column h-100">
          <div className="p-4 border-bottom border-secondary border-opacity-50">
            {/* Client Logo */}
            <div className="d-flex align-items-center gap-3 bg-white bg-opacity-5 backdrop-blur-sm p-3 rounded-3 border border-white border-opacity-10">
              <div className="bg-gradient-to-br from-primary to-primary p-2 rounded-3 shadow">
                <Truck className="text-white" style={{width: '1.5rem', height: '1.5rem'}} />
              </div>
              <div>
                <h2 className="h6 fw-bold text-white mb-0">Logo Empresa</h2>
                <p className="small text-white-50 mb-0">Nombre de la Empresa</p>
              </div>
            </div>

            {/* Silogtran Badge */}
            <div className="d-flex align-items-center justify-content-center gap-2 py-2">
              <span className="small text-white-50">Powered by</span>
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-3 py-1 rounded-3 shadow">
                <p className="small fw-bold text-white mb-0">Silogtran</p>
              </div>
            </div>
          </div>

          <nav className="flex-fill p-3 overflow-auto">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                className={`w-100 d-flex align-items-center gap-3 px-3 py-3 rounded-3 border-0 mb-1 transition-all ${
                  item.active
                    ? "bg-gradient-to-r from-primary to-primary text-white shadow"
                    : "text-white-75 hover-bg-white hover-bg-opacity-5 hover-text-white"
                }`}
                title={item.label}
              >
                <item.icon className="flex-shrink-0" style={{width: '1.25rem', height: '1.25rem'}} />
                <span className="fw-medium small">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-3 border-top border-secondary border-opacity-50">
            <div className="bg-gradient-to-br from-primary bg-opacity-10 to-info bg-opacity-10 backdrop-blur-sm rounded-3 p-3 border border-white border-opacity-10">
              <div className="d-flex align-items-center gap-3">
                <div className="w-100 rounded-circle bg-gradient-to-br from-primary to-info d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0" 
                     style={{width: '2.5rem', height: '2.5rem'}}>
                  {username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-fill min-w-0">
                  <p className="small fw-semibold text-white mb-0 text-truncate">{username}</p>
                  <p className="small text-white-50 mb-0 text-truncate">{costCenter}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="ms-lg-5" style={{marginLeft: '18rem'}}>
        {/* Header */}
        <header className="sticky-top bg-white bg-opacity-80 backdrop-blur-xl border-bottom border-light shadow-sm" style={{zIndex: 40}}>
          <div className="d-flex align-items-center justify-content-between px-4 py-3">
            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                className="btn btn-outline-secondary d-lg-none"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu style={{width: '1.25rem', height: '1.25rem'}} />
              </button>
              <div>
                <h1 className="h5 fw-bold mb-0" style={{background: 'linear-gradient(90deg, #1e293b, #475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                  Dashboard
                </h1>
                <p className="small text-muted d-none d-sm-block mb-0">Bienvenido de nuevo, {username}</p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="d-none d-md-flex align-items-center gap-2 px-3 py-2 bg-light rounded-3">
                <Search className="text-muted" style={{width: '1rem', height: '1rem'}} />
                <input
                  type="text"
                  className="form-control form-control-sm border-0 bg-transparent"
                  placeholder="Buscar..."
                  style={{width: '12rem'}}
                />
              </div>

              {/* Notifications */}
              <button type="button" className="btn btn-outline-secondary position-relative">
                <Bell style={{width: '1.25rem', height: '1.25rem'}} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{width: '0.5rem', height: '0.5rem'}}></span>
              </button>

              <div className="d-none d-xl-flex align-items-center gap-2 px-3 py-2 bg-gradient-to-r from-pink-50 to-rose-50 rounded-3 border border-pink-200">
                <span className="small text-muted">Powered by</span>
                <span className="small fw-bold" style={{background: 'linear-gradient(90deg, #ec4899, #f43f5e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                  Silogtran
                </span>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="btn btn-outline-secondary d-flex align-items-center gap-2"
              >
                <LogOut style={{width: '1rem', height: '1rem'}} />
                <span className="d-none d-sm-inline">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </header>

        <main className="p-4">
          {/* Quick Actions */}
          <div className="row g-3 g-sm-4 mb-4">
            {QUICK_ACTIONS.map((action) => (
              <div key={action.label} className="col-6 col-sm-3">
                <button className="w-100 d-flex flex-column align-items-center gap-2 p-4 custom-card border-0 text-decoration-none">
                  <div className={`${action.color} p-3 rounded-3 shadow`}>
                    <action.icon className="text-white" style={{width: '1.5rem', height: '1.5rem'}} />
                  </div>
                  <span className="small fw-semibold text-dark">{action.label}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="row g-3 g-sm-4 mb-4">
            {STATS.map((stat) => (
              <div key={stat.title} className="col-12 col-sm-6 col-lg-3">
                <div className="custom-card p-4">
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className={`${stat.bgColor} p-3 rounded-3`}>
                      <stat.icon className={`${stat.color}`} style={{width: '1.5rem', height: '1.5rem'}} />
                    </div>
                    <span className={`badge ${stat.bgColor} ${stat.color} border-0 fw-semibold`}>
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="small text-muted fw-medium mb-1">{stat.title}</p>
                    <p className="h4 fw-bold text-dark mb-0">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Shipments */}
          <div className="custom-card mb-4">
            <div className="border-bottom border-light p-4">
              <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-3">
                <div>
                  <h3 className="h6 fw-bold text-dark mb-1">Últimos Movimientos</h3>
                  <p className="small text-muted mb-0">
                    Seguimiento en tiempo real de tus envíos más recientes
                  </p>
                </div>
                <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2">
                  <Calendar style={{width: '1rem', height: '1rem'}} />
                  Hoy
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="d-grid gap-3">
                {RECENT_SHIPMENTS.map((shipment) => (
                  <div
                    key={shipment.id}
                    className="p-4 border border-light rounded-3 custom-card"
                  >
                    <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-3 mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className={`rounded-circle ${shipment.statusColor} shadow flex-shrink-0`} 
                             style={{width: '0.75rem', height: '0.75rem'}}></div>
                        <div className="min-w-0">
                          <p className="fw-semibold text-dark mb-1">{shipment.id}</p>
                          <div className="d-flex align-items-center gap-2 small text-muted">
                            <MapPin style={{width: '0.875rem', height: '0.875rem'}} />
                            <span className="text-truncate">
                              {shipment.origin} → {shipment.destination}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-3">
                        <div className="text-start text-sm-end">
                          <p className="small fw-semibold text-dark mb-1">{shipment.status}</p>
                          <div className="d-flex align-items-center gap-1 small text-muted">
                            <Clock style={{width: '0.875rem', height: '0.875rem'}} />
                            <span>{shipment.eta}</span>
                          </div>
                        </div>
                        {shipment.status === "Entregado" ? (
                          <CheckCircle2 className="text-success flex-shrink-0" style={{width: '1.5rem', height: '1.5rem'}} />
                        ) : shipment.status === "Retrasado" ? (
                          <XCircle className="text-danger flex-shrink-0" style={{width: '1.5rem', height: '1.5rem'}} />
                        ) : (
                          <Truck className="text-primary flex-shrink-0" style={{width: '1.5rem', height: '1.5rem'}} />
                        )}
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-100 bg-light rounded-pill overflow-hidden" style={{height: '0.5rem'}}>
                      <div
                        className={`h-100 ${shipment.statusColor} transition-all rounded-pill`}
                        style={{ width: `${shipment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="row g-4">
            {/* Deliveries Today */}
            <div className="col-12 col-lg-4">
              <div className="custom-card">
                <div className="border-bottom border-light p-4">
                  <h3 className="h6 fw-bold text-dark d-flex align-items-center gap-2 mb-1">
                    <Package className="text-primary" style={{width: '1.25rem', height: '1.25rem'}} />
                    Entregas de Hoy
                  </h3>
                  <p className="small text-muted mb-0">Resumen de entregas programadas</p>
                </div>
                <div className="p-4">
                  <div className="d-grid gap-3">
                    <div className="d-flex align-items-center justify-content-between p-3 bg-success bg-opacity-10 rounded-3 border border-success border-opacity-20">
                      <span className="small fw-medium text-dark">Completadas</span>
                      <span className="h5 fw-bold text-success mb-0">12</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between p-3 bg-primary bg-opacity-10 rounded-3 border border-primary border-opacity-20">
                      <span className="small fw-medium text-dark">Pendientes</span>
                      <span className="h5 fw-bold text-primary mb-0">8</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between p-3 bg-danger bg-opacity-10 rounded-3 border border-danger border-opacity-20">
                      <span className="small fw-medium text-dark">Retrasadas</span>
                      <span className="h5 fw-bold text-danger mb-0">3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Alerts */}
            <div className="col-12 col-lg-8">
              <div className="custom-card">
                <div className="border-bottom border-light p-4">
                  <h3 className="h6 fw-bold text-dark d-flex align-items-center gap-2 mb-1">
                    <AlertTriangle className="text-warning" style={{width: '1.25rem', height: '1.25rem'}} />
                    Alertas del Sistema
                  </h3>
                  <p className="small text-muted mb-0">Notificaciones importantes</p>
                </div>
                <div className="p-4">
                  <div className="d-grid gap-3">
                    <div className="d-flex align-items-start gap-3 p-3 bg-danger bg-opacity-10 rounded-3 border border-danger border-opacity-20">
                      <div className="bg-danger p-2 rounded-3 flex-shrink-0">
                        <AlertTriangle className="text-white" style={{width: '1.25rem', height: '1.25rem'}} />
                      </div>
                      <div className="flex-fill min-w-0">
                        <p className="small fw-semibold text-dark mb-1">Retraso en ruta ENV-2025-003</p>
                        <p className="small text-muted mb-0">Condiciones climáticas adversas detectadas</p>
                      </div>
                      <span className="small text-muted flex-shrink-0">15 min</span>
                    </div>
                    <div className="d-flex align-items-start gap-3 p-3 bg-primary bg-opacity-10 rounded-3 border border-primary border-opacity-20">
                      <div className="bg-primary p-2 rounded-3 flex-shrink-0">
                        <Package className="text-white" style={{width: '1.25rem', height: '1.25rem'}} />
                      </div>
                      <div className="flex-fill min-w-0">
                        <p className="small fw-semibold text-dark mb-1">Nuevo pedido recibido</p>
                        <p className="small text-muted mb-0">Cliente: Distribuidora del Norte - 5 paquetes</p>
                      </div>
                      <span className="small text-muted flex-shrink-0">1 hora</span>
                    </div>
                    <div className="d-flex align-items-start gap-3 p-3 bg-success bg-opacity-10 rounded-3 border border-success border-opacity-20">
                      <div className="bg-success p-2 rounded-3 flex-shrink-0">
                        <CheckCircle2 className="text-white" style={{width: '1.25rem', height: '1.25rem'}} />
                      </div>
                      <div className="flex-fill min-w-0">
                        <p className="small fw-semibold text-dark mb-1">Entrega completada exitosamente</p>
                        <p className="small text-muted mb-0">ENV-2025-002 - Cliente satisfecho</p>
                      </div>
                      <span className="small text-muted flex-shrink-0">2 horas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
