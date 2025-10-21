"use client"

import { useState } from "react"
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
    <div className="min-vh-100 d-flex flex-column flex-lg-row" style={{backgroundColor: 'var(--background-color)'}}>
      {/* Left Side - Form */}
      <div className="flex-fill d-flex align-items-center justify-content-center p-4 p-sm-5 p-md-4 p-lg-5">
        <div className="w-100 slide-in-left" style={{maxWidth: '28rem'}}>
          {/* Client Logo */}
          <div className="d-flex justify-content-center mb-4">
            <div className="custom-card px-4 py-3 px-sm-4 py-sm-3 px-md-4 py-md-4 border-2">
              <div className="d-flex align-items-center gap-3">
                <div className="p-2 p-md-3 rounded-3" style={{background: 'var(--primary-color)', opacity: 0.1}}>
                  <Truck className="text-primary" style={{width: '2rem', height: '2rem'}} />
                </div>
                <div>
                  <h1 className="h6 h5-md fw-bold mb-0">Logo Empresa</h1>
                  <p className="small text-muted mb-0">Nombre de la Empresa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Header */}
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-3" style={{background: 'var(--primary-color)', opacity: 0.1}}>
              <div className="rounded-circle bg-success" style={{width: '0.5rem', height: '0.5rem'}}></div>
              <span className="small fw-medium text-primary">Sesión Activa</span>
            </div>
            <h2 className="h3 h2-md fw-bold mb-2">Bienvenido, {username}</h2>
            <p className="text-muted mb-0">Selecciona tu centro de operaciones</p>
          </div>

          {/* Form */}
          <div>
            <div className="mb-4">
              <label htmlFor="cost-center" className="form-label fw-semibold">
                Centro de Costo
              </label>
              <select 
                className="form-select form-select-lg border-2" 
                id="cost-center"
                value={selectedCenter} 
                onChange={(e) => setSelectedCenter(e.target.value)}
                style={{borderColor: 'var(--border-color)'}}
              >
                <option value="">Selecciona un centro de costo</option>
                {COST_CENTERS.map((center) => (
                  <option key={center.id} value={center.id}>
                    {center.name} - {center.location}
                  </option>
                ))}
              </select>
            </div>

            {selectedCenterData && (
              <div className="mb-4 p-4 rounded-3 border-2 slide-in-left" 
                   style={{background: 'linear-gradient(135deg, var(--primary-color), var(--primary-hover))', opacity: 0.05, borderColor: 'var(--primary-color)', opacity: 0.2}}>
                <h4 className="h6 fw-semibold mb-3 d-flex align-items-center gap-2">
                  <Building2 className="text-primary" style={{width: '1rem', height: '1rem'}} />
                  Información del Centro
                </h4>
                <div className="row g-3">
                  <div className="col-6">
                    <div className="d-flex align-items-center gap-2 small">
                      <MapPin className="text-muted" style={{width: '1rem', height: '1rem'}} />
                      <span className="text-muted">{selectedCenterData.location}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center gap-2 small">
                      <Users className="text-muted" style={{width: '1rem', height: '1rem'}} />
                      <span className="text-muted">{selectedCenterData.users} usuarios</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="d-grid gap-3">
              <button
                type="button"
                onClick={handleContinue}
                disabled={!selectedCenter || isLoading}
                className="btn btn-primary-custom py-3 fw-semibold"
              >
                {isLoading ? (
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Cargando...
                  </div>
                ) : (
                  <>
                    Continuar al Dashboard
                    <ArrowRight className="ms-2" style={{width: '1.25rem', height: '1.25rem'}} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onLogout}
                className="btn btn-outline-danger py-3 border-2"
              >
                <LogOut className="me-2" style={{width: '1rem', height: '1rem'}} />
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Powered by Silogtran */}
          <div className="d-flex align-items-center justify-content-center gap-2 small text-muted mt-4 pt-4">
            <span>Powered by</span>
            <span className="fw-semibold">Silogtran</span>
            <span className="small">by Colombia Software</span>
          </div>
        </div>
      </div>

      {/* Right Side - Branding & Info */}
      <div className="d-none d-lg-flex flex-fill p-4 p-xl-5 align-items-center justify-content-center position-relative overflow-hidden" 
           style={{background: 'linear-gradient(135deg, #1e3a8a, #1e40af, #2563eb)'}}>
        {/* Animated Background Pattern */}
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
          <div className="position-absolute top-0 start-0 rounded-circle bg-white" 
               style={{width: '24rem', height: '24rem', filter: 'blur(3rem)'}}></div>
          <div className="position-absolute bottom-0 end-0 rounded-circle bg-white" 
               style={{width: '24rem', height: '24rem', filter: 'blur(3rem)'}}></div>
        </div>

        <div className="position-relative slide-in-right" style={{maxWidth: '32rem'}}>
          {/* Silogtran Logo */}
          <div className="text-center mb-5">
            <div className="d-inline-block">
              <img src="/img/corporativo/silogtran_logo.png" alt="Silogtran" className="img-fluid" style={{height: '5rem', width: 'auto'}} />
            </div>
            <p className="text-white-75 lead mt-3">
              Sistema integral de gestión logística para el control total de tus operaciones
            </p>
          </div>

          {/* Features Grid */}
          <div className="d-grid gap-4">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-3 p-4 p-xl-5">
              <div className="d-flex align-items-start gap-3">
                <div className="bg-white bg-opacity-20 p-3 rounded-3">
                  <Building2 className="text-white" style={{width: '1.5rem', height: '1.5rem'}} />
                </div>
                <div>
                  <h3 className="h6 fw-semibold text-white mb-2">Múltiples Centros</h3>
                  <p className="small text-white-75 mb-0">
                    Gestiona operaciones desde diferentes ubicaciones de forma centralizada
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-3 p-4 p-xl-5">
              <div className="d-flex align-items-start gap-3">
                <div className="bg-white bg-opacity-20 p-3 rounded-3">
                  <Package className="text-white" style={{width: '1.5rem', height: '1.5rem'}} />
                </div>
                <div>
                  <h3 className="h6 fw-semibold text-white mb-2">Control Total</h3>
                  <p className="small text-white-75 mb-0">
                    Seguimiento en tiempo real de inventarios, envíos y operaciones
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-3 p-4 p-xl-5">
              <div className="d-flex align-items-start gap-3">
                <div className="bg-white bg-opacity-20 p-3 rounded-3">
                  <Users className="text-white" style={{width: '1.5rem', height: '1.5rem'}} />
                </div>
                <div>
                  <h3 className="h6 fw-semibold text-white mb-2">Gestión de Equipos</h3>
                  <p className="small text-white-75 mb-0">
                    Administra usuarios y permisos por centro de costo
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="row g-4 mt-5 pt-4 border-top border-white border-opacity-20">
            <div className="col-4 text-center">
              <div className="h3 h2-xl fw-bold text-white mb-1">5+</div>
              <div className="small text-white-75">Centros</div>
            </div>
            <div className="col-4 text-center">
              <div className="h3 h2-xl fw-bold text-white mb-1">193</div>
              <div className="small text-white-75">Usuarios</div>
            </div>
            <div className="col-4 text-center">
              <div className="h3 h2-xl fw-bold text-white mb-1">24/7</div>
              <div className="small text-white-75">Soporte</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
