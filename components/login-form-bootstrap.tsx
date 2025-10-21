"use client"

import type React from "react"
import { useState } from "react"
import { Truck, Lock, User, AlertCircle, Package, Globe, TrendingUp } from "lucide-react"
import Image from "next/image"

interface LoginFormProps {
  onSuccess: (username: string) => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!username.trim()) {
      setError("El usuario es requerido")
      return
    }
    if (!password.trim()) {
      setError("La contraseña es requerida")
      return
    }

    setIsLoading(true)

    // Simulate API call - In production, this would submit to PHP backend
    setTimeout(() => {
      // Mock validation
      if (username && password) {
        onSuccess(username)
      } else {
        setError("Credenciales inválidas")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-vh-100 d-flex flex-column flex-lg-row">
      {/* Left Side - Login Form */}
      <div className="flex-fill d-flex align-items-center justify-content-center p-4 p-sm-5 p-md-4 position-relative overflow-hidden" 
           style={{backgroundColor: 'var(--background-light)'}}>
        {/* Subtle background pattern - removed to avoid visual interference */}
        
        <div className="w-100" style={{maxWidth: '28rem'}}>
          {/* Client Company Logo */}
          <div className="mb-5 d-flex justify-content-center">
            <div className="bg-white rounded-4 px-5 py-4 border-0" 
                 style={{borderColor: 'var(--border-color)', boxShadow: '0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)'}}>
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex align-items-center justify-content-center" 
                     style={{width: '4rem', height: '4rem'}}>
                  <Image 
                    src="/img/corporativo/logo_repremundo.gif" 
                    alt="Repremundo Logo" 
                    width={64} 
                    height={64} 
                    className="img-fluid" 
                    style={{maxWidth: '100%', height: 'auto'}}
                  />
                </div>
                <div>
                  <h1 className="h4 fw-bold mb-1" style={{color: 'var(--text-color)'}}>Repremundo</h1>
                  <p className="mb-0" style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Sistema de Gestión Logística</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-4 p-4 border-0" 
               style={{boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)'}}>
            <div className="mb-4">
              <h2 className="h4 fw-bold mb-2" style={{color: 'var(--text-color)'}}>Bienvenido</h2>
              <p className="mb-0" style={{color: 'var(--text-muted)', fontSize: '0.95rem'}}>
                Ingresa tus credenciales para acceder al sistema
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert alert-danger d-flex align-items-center fade-in mb-4" role="alert">
                  <AlertCircle className="me-2" style={{width: '1.25rem', height: '1.25rem'}} />
                  <div>{error}</div>
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-semibold mb-2" 
                       style={{color: 'var(--text-color)', fontSize: '0.9rem'}}>
                  Usuario
                </label>
                <div className="position-relative">
                  <User className="position-absolute top-50 translate-middle-y ms-4" 
                        style={{width: '1.25rem', height: '1.25rem', color: 'var(--text-muted)'}} />
                  <input
                    type="text"
                    className="form-control ps-5 pe-4 py-2 rounded-3 border-2"
                    id="username"
                    name="username"
                    placeholder="Ingresa tu usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    required
                    style={{
                      borderColor: 'var(--border-color)',
                      backgroundColor: 'var(--background-color)',
                      color: 'var(--text-color)',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold mb-2" 
                       style={{color: 'var(--text-color)', fontSize: '0.9rem'}}>
                  Contraseña
                </label>
                <div className="position-relative">
                  <Lock className="position-absolute top-50 translate-middle-y ms-4" 
                        style={{width: '1.25rem', height: '1.25rem', color: 'var(--text-muted)'}} />
                  <input
                    type="password"
                    className="form-control ps-5 pe-4 py-2 rounded-3 border-2"
                    id="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    style={{
                      borderColor: 'var(--border-color)',
                      backgroundColor: 'var(--background-color)',
                      color: 'var(--text-color)',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end mb-3">
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none fw-medium"
                  onClick={() => alert("Funcionalidad de recuperación de contraseña")}
                  style={{color: 'var(--primary-light)', fontSize: '0.9rem'}}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button
                type="submit"
                className="btn w-100 py-2 fw-semibold rounded-3 border-0 mb-3"
                disabled={isLoading}
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  fontSize: '1rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = 'var(--primary-hover)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = 'var(--primary-color)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
                  }
                }}
              >
                {isLoading ? (
                  <span className="d-flex align-items-center justify-content-center gap-2">
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Iniciando sesión...
                  </span>
                ) : (
                  "Iniciar Sesión"
                )}
              </button>
            </form>

            <div className="pt-3 border-top text-center" 
                 style={{borderColor: 'var(--border-color)'}}>
              <p className="small mb-0" style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>Sistema seguro de gestión logística B2B</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center">
            <p className="small mb-0" style={{color: 'var(--text-muted)', fontSize: '0.8rem'}}>© 2025 Colombia Software. Todos los derechos reservados.</p>
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

          <p className="lead text-white-75 mb-4 lh-base" style={{fontSize: '1.1rem', lineHeight: '1.5'}}>
            El manejo de terceros, el proceso de predespacho, la facturación y la operación nacional en un solo sistema
            de gestión.
          </p>

          {/* Feature Highlights */}
          <div className="row g-3 mb-4">
            <div className="col-4">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3 p-3 border border-white border-opacity-20 h-100">
                <div className="bg-white bg-opacity-20 w-100 rounded-2 d-flex align-items-center justify-content-center mb-2" style={{height: '3rem'}}>
                  <Truck className="text-white" style={{width: '2rem', height: '2rem'}} />
                </div>
                <p className="fw-semibold text-white mb-0" style={{fontSize: '0.85rem'}}>Gestión de Flota</p>
              </div>
            </div>
            <div className="col-4">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3 p-3 border border-white border-opacity-20 h-100">
                <div className="bg-white bg-opacity-20 w-100 rounded-2 d-flex align-items-center justify-content-center mb-2" style={{height: '3rem'}}>
                  <Package className="text-white" style={{width: '2rem', height: '2rem'}} />
                </div>
                <p className="fw-semibold text-white mb-0" style={{fontSize: '0.85rem'}}>Control de Envíos</p>
              </div>
            </div>
            <div className="col-4">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3 p-3 border border-white border-opacity-20 h-100">
                <div className="bg-white bg-opacity-20 w-100 rounded-2 d-flex align-items-center justify-content-center mb-2" style={{height: '3rem'}}>
                  <TrendingUp className="text-white" style={{width: '2rem', height: '2rem'}} />
                </div>
                <p className="fw-semibold text-white mb-0" style={{fontSize: '0.85rem'}}>Análisis en Tiempo Real</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="d-flex align-items-center justify-content-center gap-3">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2 px-3 py-2 border border-white border-opacity-20">
              <p className="fw-semibold text-white mb-0" style={{fontSize: '0.8rem'}}>ISO 9001</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2 px-3 py-2 border border-white border-opacity-20">
              <p className="fw-semibold text-white mb-0" style={{fontSize: '0.8rem'}}>ISO 27001</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2 px-3 py-2 border border-white border-opacity-20 d-flex align-items-center gap-2">
              <Globe className="text-white" style={{width: '1rem', height: '1rem'}} />
              <p className="fw-semibold text-white mb-0" style={{fontSize: '0.8rem'}}>BASC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
