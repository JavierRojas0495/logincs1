"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { useState } from "react"

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
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Entregas Pendientes",
    value: "8",
    change: "-5%",
    trend: "down",
    icon: Package,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Alertas",
    value: "3",
    change: "+2",
    trend: "up",
    icon: AlertTriangle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    title: "Eficiencia",
    value: "94%",
    change: "+3%",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
]

const RECENT_SHIPMENTS = [
  {
    id: "ENV-2025-001",
    origin: "Ciudad de México",
    destination: "Guadalajara",
    status: "En tránsito",
    eta: "2 horas",
    statusColor: "bg-blue-500",
    progress: 65,
  },
  {
    id: "ENV-2025-002",
    origin: "Monterrey",
    destination: "Tijuana",
    status: "Entregado",
    eta: "Completado",
    statusColor: "bg-green-500",
    progress: 100,
  },
  {
    id: "ENV-2025-003",
    origin: "Puebla",
    destination: "Cancún",
    status: "Retrasado",
    eta: "5 horas",
    statusColor: "bg-red-500",
    progress: 45,
  },
  {
    id: "ENV-2025-004",
    origin: "Querétaro",
    destination: "Mérida",
    status: "En tránsito",
    eta: "3 horas",
    statusColor: "bg-blue-500",
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
  { icon: Package, label: "Nueva Orden", color: "bg-blue-500" },
  { icon: Truck, label: "Despacho", color: "bg-orange-500" },
  { icon: FileText, label: "Manifiesto", color: "bg-green-500" },
  { icon: BarChart3, label: "Reportes", color: "bg-purple-500" },
]

export default function Dashboard({ username, costCenter, onLogout }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 transition-all duration-300 z-50 shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } w-72 lg:w-20 lg:hover:w-72`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 lg:p-6 border-b border-slate-700/50 space-y-3 lg:space-y-4">
            {/* Client Logo */}
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3 lg:p-4 rounded-xl border border-white/10 lg:group-hover:justify-start justify-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 lg:p-2.5 rounded-lg shadow-lg flex-shrink-0">
                <Truck className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <div className="overflow-hidden lg:hidden lg:group-hover:block">
                <h2 className="text-sm lg:text-base font-bold text-white whitespace-nowrap">Logo Empresa</h2>
                <p className="text-xs text-slate-400 whitespace-nowrap">Nombre de la Empresa</p>
              </div>
            </div>

            {/* Silogtran Badge */}
            <div className="flex items-center justify-center gap-2 py-2 lg:hidden lg:group-hover:flex">
              <span className="text-xs text-slate-500">Powered by</span>
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-2 lg:px-3 py-1 rounded-md shadow-lg">
                <p className="text-xs font-bold text-white">Silogtran</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 lg:p-4 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl transition-all duration-200 ${
                  item.active
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                } lg:justify-center lg:group-hover:justify-start`}
                title={item.label}
              >
                <item.icon className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                <span className="font-medium text-xs lg:text-sm whitespace-nowrap lg:hidden lg:group-hover:inline">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="p-3 lg:p-4 border-t border-slate-700/50">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-white/10">
              <div className="flex items-center gap-3 lg:flex-col lg:group-hover:flex-row">
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0 lg:hidden lg:group-hover:block">
                  <p className="text-xs lg:text-sm font-semibold text-white truncate">{username}</p>
                  <p className="text-xs text-slate-400 truncate">{costCenter}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:ml-20">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-slate-100"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 hidden sm:block">Bienvenido de nuevo, {username}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-100 rounded-lg">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400 w-32 sm:w-48"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative hover:bg-slate-100">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200/50">
                <span className="text-xs text-slate-600">Powered by</span>
                <span className="text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  Silogtran
                </span>
              </div>

              <Button
                variant="outline"
                onClick={onLogout}
                size="sm"
                className="gap-2 bg-white hover:bg-slate-50 border-slate-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 group"
              >
                <div
                  className={`${action.color} p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <action.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-700">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {STATS.map((stat) => (
              <Card key={stat.title} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className={`${stat.bgColor} p-2.5 sm:p-3 rounded-lg sm:rounded-xl`}>
                      <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${stat.bgColor} ${stat.color} border-0 font-semibold text-xs`}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">{stat.title}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Shipments */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-slate-900 text-base sm:text-lg">Últimos Movimientos</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Seguimiento en tiempo real de tus envíos más recientes
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent w-full sm:w-auto">
                  <Calendar className="h-4 w-4" />
                  Hoy
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {RECENT_SHIPMENTS.map((shipment) => (
                  <div
                    key={shipment.id}
                    className="p-4 sm:p-5 border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`w-3 h-3 rounded-full ${shipment.statusColor} shadow-lg flex-shrink-0`} />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 text-sm sm:text-base">{shipment.id}</p>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 mt-1">
                            <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                            <span className="truncate">
                              {shipment.origin} → {shipment.destination}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                        <div className="text-left sm:text-right">
                          <p className="text-xs sm:text-sm font-semibold text-slate-900">{shipment.status}</p>
                          <div className="flex items-center gap-1 text-xs text-slate-600 mt-1">
                            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            <span>{shipment.eta}</span>
                          </div>
                        </div>
                        {shipment.status === "Entregado" ? (
                          <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" />
                        ) : shipment.status === "Retrasado" ? (
                          <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 flex-shrink-0" />
                        ) : (
                          <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${shipment.statusColor} transition-all duration-500 rounded-full`}
                        style={{ width: `${shipment.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Deliveries Today */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 p-4 sm:p-6">
                <CardTitle className="text-slate-900 flex items-center gap-2 text-base sm:text-lg">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                  Entregas de Hoy
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Resumen de entregas programadas</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-green-50 rounded-xl border border-green-200">
                    <span className="text-xs sm:text-sm font-medium text-slate-700">Completadas</span>
                    <span className="text-xl sm:text-2xl font-bold text-green-600">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <span className="text-xs sm:text-sm font-medium text-slate-700">Pendientes</span>
                    <span className="text-xl sm:text-2xl font-bold text-blue-600">8</span>
                  </div>
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-red-50 rounded-xl border border-red-200">
                    <span className="text-xs sm:text-sm font-medium text-slate-700">Retrasadas</span>
                    <span className="text-xl sm:text-2xl font-bold text-red-600">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card className="border-slate-200 shadow-sm lg:col-span-2">
              <CardHeader className="border-b border-slate-100 p-4 sm:p-6">
                <CardTitle className="text-slate-900 flex items-center gap-2 text-base sm:text-lg">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                  Alertas del Sistema
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Notificaciones importantes</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="bg-red-500 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">Retraso en ruta ENV-2025-003</p>
                      <p className="text-xs text-slate-600">Condiciones climáticas adversas detectadas</p>
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">15 min</span>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="bg-blue-500 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                      <Package className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">Nuevo pedido recibido</p>
                      <p className="text-xs text-slate-600">Cliente: Distribuidora del Norte - 5 paquetes</p>
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">1 hora</span>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="bg-green-500 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">Entrega completada exitosamente</p>
                      <p className="text-xs text-slate-600">ENV-2025-002 - Cliente satisfecho</p>
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">2 horas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
