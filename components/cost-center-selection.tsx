"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, LogOut, ArrowRight, Truck, MapPin, Users, Package } from "lucide-react"

interface CostCenterSelectionProps {
  username: string
  onSelect: (center: string) => void
  onLogout: () => void
}

// Mock data - In production, this would come from the backend
const COST_CENTERS = [
  { id: "cc-001", name: "Centro de Distribución Norte", location: "Bogotá", users: 45 },
  { id: "cc-002", name: "Centro de Distribución Sur", location: "Cali", users: 32 },
  { id: "cc-003", name: "Centro de Distribución Este", location: "Medellín", users: 28 },
  { id: "cc-004", name: "Centro de Distribución Oeste", location: "Barranquilla", users: 21 },
  { id: "cc-005", name: "Almacén Central", location: "Bogotá", users: 67 },
]

export default function CostCenterSelection({ username, onSelect, onLogout }: CostCenterSelectionProps) {
  const [selectedCenter, setSelectedCenter] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = () => {
    if (!selectedCenter) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const center = COST_CENTERS.find((c) => c.id === selectedCenter)
      if (center) {
        onSelect(center.name)
      }
      setIsLoading(false)
    }, 500)
  }

  const selectedCenterData = COST_CENTERS.find((c) => c.id === selectedCenter)

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left duration-700">
          {/* Client Logo */}
          <div className="flex justify-center">
            <div className="bg-card border-2 border-border px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl shadow-lg">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-primary/10 p-2 md:p-2.5 rounded-lg">
                  <Truck className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg md:text-xl font-bold text-foreground">Logo Empresa</h1>
                  <p className="text-xs text-muted-foreground">Nombre de la Empresa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-primary">Sesión Activa</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Bienvenido, {username}</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Selecciona tu centro de operaciones</p>
          </div>

          {/* Form */}
          <div className="space-y-5 md:space-y-6">
            <div className="space-y-3">
              <Label htmlFor="cost-center" className="text-sm sm:text-base font-semibold">
                Centro de Costo
              </Label>
              <Select value={selectedCenter} onValueChange={setSelectedCenter}>
                <SelectTrigger
                  id="cost-center"
                  className="h-12 sm:h-14 text-sm sm:text-base border-2 hover:border-primary transition-colors"
                >
                  <SelectValue placeholder="Selecciona un centro de costo" />
                </SelectTrigger>
                <SelectContent>
                  {COST_CENTERS.map((center) => (
                    <SelectItem key={center.id} value={center.id} className="py-3">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium text-sm sm:text-base">{center.name}</div>
                          <div className="text-xs text-muted-foreground">{center.location}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCenterData && (
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 p-4 sm:p-5 rounded-xl space-y-3 animate-in fade-in slide-in-from-bottom duration-500">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  Información del Centro
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{selectedCenterData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{selectedCenterData.users} usuarios</span>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleContinue}
                disabled={!selectedCenter || isLoading}
                className="w-full h-12 sm:h-14 text-sm sm:text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Cargando...
                  </div>
                ) : (
                  <>
                    Continuar al Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={onLogout}
                className="w-full h-11 sm:h-12 text-sm sm:text-base border-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors bg-transparent"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>
          </div>

          {/* Powered by Silogtran */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground pt-4">
            <span>Powered by</span>
            <span className="font-semibold text-foreground">Silogtran</span>
            <span className="text-xs">by Colombia Software</span>
          </div>
        </div>
      </div>

      {/* Right Side - Branding & Info */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb] p-8 xl:p-12 items-center justify-center relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-lg space-y-12 animate-in fade-in slide-in-from-right duration-700">
          {/* Silogtran Logo */}
          <div className="text-center space-y-4">
            <div className="inline-block">
              <img src="/silogtran-logo.png" alt="Silogtran" className="h-20 xl:h-24 w-auto drop-shadow-2xl" />
            </div>
            <p className="text-white/90 text-base xl:text-lg leading-relaxed">
              Sistema integral de gestión logística para el control total de tus operaciones
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-5 xl:gap-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 xl:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Building2 className="h-5 w-5 xl:h-6 xl:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base xl:text-lg mb-1">Múltiples Centros</h3>
                  <p className="text-white/80 text-xs xl:text-sm leading-relaxed">
                    Gestiona operaciones desde diferentes ubicaciones de forma centralizada
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 xl:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Package className="h-5 w-5 xl:h-6 xl:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base xl:text-lg mb-1">Control Total</h3>
                  <p className="text-white/80 text-xs xl:text-sm leading-relaxed">
                    Seguimiento en tiempo real de inventarios, envíos y operaciones
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 xl:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Users className="h-5 w-5 xl:h-6 xl:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base xl:text-lg mb-1">Gestión de Equipos</h3>
                  <p className="text-white/80 text-xs xl:text-sm leading-relaxed">
                    Administra usuarios y permisos por centro de costo
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl xl:text-3xl font-bold text-white mb-1">5+</div>
              <div className="text-white/70 text-xs xl:text-sm">Centros</div>
            </div>
            <div className="text-center">
              <div className="text-2xl xl:text-3xl font-bold text-white mb-1">193</div>
              <div className="text-white/70 text-xs xl:text-sm">Usuarios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl xl:text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-white/70 text-xs xl:text-sm">Soporte</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
