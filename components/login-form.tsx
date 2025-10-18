"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-secondary/5 rounded-full blur-3xl" />

        <div className="w-full max-w-md relative z-10">
          {/* Client Company Logo */}
          <div className="mb-6 md:mb-8 flex justify-center">
            <div className="bg-card border border-border rounded-xl md:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 shadow-lg">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="bg-primary/10 p-2 md:p-3 rounded-lg md:rounded-xl">
                  <Truck className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">Logo Empresa</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">Nombre de la Empresa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-card border border-border rounded-2xl md:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8">
            <div className="mb-5 md:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Bienvenido</h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Ingresa tus credenciales para acceder al sistema
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              {error && (
                <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Usuario
                </Label>
                <div className="relative group">
                  <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Ingresa tu usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 sm:pl-12 h-11 sm:h-12 rounded-xl border-2 transition-all focus:border-primary text-sm sm:text-base"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 sm:pl-12 h-11 sm:h-12 rounded-xl border-2 transition-all focus:border-primary text-sm sm:text-base"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-xs sm:text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  onClick={() => alert("Funcionalidad de recuperación de contraseña")}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-11 sm:h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Iniciando sesión...
                  </span>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>

            <div className="mt-5 md:mt-6 pt-5 md:pt-6 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">Sistema seguro de gestión logística B2B</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 md:mt-6 text-center text-xs text-muted-foreground">
            <p>© 2025 Colombia Software. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Branding & Info */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-primary/95 to-primary/90 p-8 xl:p-12 items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-lg text-center">
          {/* Silogtran Logo */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <Image src="/silogtran-logo.png" alt="Silogtran" width={280} height={120} className="drop-shadow-2xl" />
              <div className="mt-3 text-primary-foreground/90 text-sm font-medium">by Colombia Software</div>
            </div>
          </div>

          {/* Value Proposition */}
          <h2 className="text-3xl xl:text-4xl font-bold text-primary-foreground mb-6 text-balance">
            Integra la información básica con la operación de transporte
          </h2>

          <p className="text-base xl:text-lg text-primary-foreground/90 mb-12 leading-relaxed text-pretty">
            El manejo de terceros, el proceso de predespacho, la facturación y la operación nacional en un solo sistema
            de gestión.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-3 gap-4 xl:gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 xl:p-6 border border-white/20">
              <div className="bg-white/20 w-12 h-12 xl:w-14 xl:h-14 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 xl:h-7 xl:w-7 text-primary-foreground" />
              </div>
              <p className="text-xs xl:text-sm font-semibold text-primary-foreground">Gestión de Flota</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 xl:p-6 border border-white/20">
              <div className="bg-white/20 w-12 h-12 xl:w-14 xl:h-14 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Package className="h-6 w-6 xl:h-7 xl:w-7 text-primary-foreground" />
              </div>
              <p className="text-xs xl:text-sm font-semibold text-primary-foreground">Control de Envíos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 xl:p-6 border border-white/20">
              <div className="bg-white/20 w-12 h-12 xl:w-14 xl:h-14 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 xl:h-7 xl:w-7 text-primary-foreground" />
              </div>
              <p className="text-xs xl:text-sm font-semibold text-primary-foreground">Análisis en Tiempo Real</p>
            </div>
          </div>

          {/* Certifications */}
          <div className="flex items-center justify-center gap-3 xl:gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 xl:px-4 border border-white/20">
              <p className="text-xs font-semibold text-primary-foreground">ISO 9001</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 xl:px-4 border border-white/20">
              <p className="text-xs font-semibold text-primary-foreground">ISO 27001</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 xl:px-4 border border-white/20">
              <Globe className="h-4 w-4 text-primary-foreground inline mr-1" />
              <p className="text-xs font-semibold text-primary-foreground inline">BASC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
