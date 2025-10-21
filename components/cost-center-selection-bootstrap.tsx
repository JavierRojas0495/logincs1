"use client"

import { useState } from "react"
import { Building2, LogOut, ArrowRight, Truck, MapPin, Users, Package } from "lucide-react"
import Image from "next/image"

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
                <Image 
                  src="/img/corporativo/logo_repremundo.gif" 
                  alt="Repremundo Logo" 
                  width={64} 
                  height={64} 
                  className="img-fluid" 
                  style={{maxWidth: '100%', height: 'auto'}}
                />
                <div>
                  <h1 className="h6 h5-md fw-bold mb-0">Repremundo</h1>
                  <p className="small text-muted mb-0">Sistema de Gestión Logística</p>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Header */}
          <div className="text-center mb-4">
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
                   style={{background: 'rgba(59, 130, 246, 0.08)', borderColor: 'var(--primary-color)', borderWidth: '2px'}}>
                <h4 className="h6 fw-semibold mb-3 d-flex align-items-center gap-2" style={{color: 'var(--primary-color)'}}>
                  <Building2 style={{width: '1rem', height: '1rem', color: 'var(--primary-color)'}} />
                  Información del Centro
                </h4>
                <div className="row g-3">
                  <div className="col-6">
                    <div className="d-flex align-items-center gap-2 small">
                      <MapPin style={{width: '1rem', height: '1rem', color: 'var(--text-muted)'}} />
                      <span style={{color: 'var(--text-color)'}}>{selectedCenterData.location}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center gap-2 small">
                      <Users style={{width: '1rem', height: '1rem', color: 'var(--text-muted)'}} />
                      <span style={{color: 'var(--text-color)'}}>{selectedCenterData.users} usuarios</span>
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
      <div className="d-none d-lg-flex flex-fill p-4 p-xl-5 align-items-start justify-content-center position-relative overflow-hidden"
           style={{background: 'var(--promo-bg)', paddingTop: '3rem'}}>
        {/* Subtle background elements */}
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <div className="position-absolute rounded-circle"
               style={{top: '10%', left: '10%', width: '20rem', height: '20rem', background: 'rgba(255,255,255,0.03)', filter: 'blur(4rem)'}}></div>
          <div className="position-absolute rounded-circle" 
               style={{bottom: '10%', right: '10%', width: '25rem', height: '25rem', background: 'rgba(255,255,255,0.02)', filter: 'blur(4rem)'}}></div>
        </div>

        <div className="position-relative text-center" style={{maxWidth: '34rem', marginTop: '1rem'}}>
          {/* Silogtran Logo */}
          <div className="mb-3 d-flex justify-content-center">
            <div className="position-relative">
              <Image 
                src="/img/corporativo/silogtran_logo.png" 
                alt="Silogtran" 
                width={200} 
                height={80} 
                className="drop-shadow-2xl img-fluid" 
                style={{maxWidth: '100%', height: 'auto'}}
              />
            </div>
          </div>

          {/* Value Proposition */}
          <h2 className="h2 fw-bold text-white mb-3 lh-sm" style={{fontSize: '1.8rem', lineHeight: '1.3'}}>
            Integra la información básica con la operación de transporte
          </h2>

          {/* System Messages Banner */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-4 p-4 mb-4 border border-white border-opacity-20">
            <div className="text-center">
              <h4 className="fw-bold text-white mb-3" style={{fontSize: '1.1rem'}}>
                📢 Mensajes del Sistema
              </h4>
              <div className="bg-white bg-opacity-5 rounded-3 p-3 border border-white border-opacity-10">
                <p className="mb-2" style={{fontSize: '0.95rem', lineHeight: '1.4', color: '#000000'}}>
                  <strong>Selecciona tu centro de operaciones</strong>
                </p>
                <p className="text-white-75 mb-0" style={{fontSize: '0.85rem', lineHeight: '1.3'}}>
                  Elige el centro de costo correspondiente para acceder a las funcionalidades específicas de tu área de trabajo.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="d-flex align-items-center justify-content-center">
            <Image 
              src="/img/corporativo/logos_icontec.png" 
              alt="Certificaciones Icontec" 
              width={200} 
              height={80} 
              className="img-fluid" 
              style={{maxWidth: '100%', height: 'auto'}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
