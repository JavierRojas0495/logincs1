"use client"

import { useState } from "react"
import LoginForm from "@/components/login-form-bootstrap"
import CostCenterSelection from "@/components/cost-center-selection-bootstrap"
import Dashboard from "@/components/dashboard-bootstrap"

export default function Home() {
  const [step, setStep] = useState<"login" | "cost-center" | "dashboard">("login")
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [costCenter, setCostCenter] = useState<string | null>(null)

  const handleLoginSuccess = (username: string) => {
    setUser({ username })
    setStep("cost-center")
  }

  const handleCostCenterSelect = (center: string) => {
    setCostCenter(center)
    setStep("dashboard")
  }

  const handleLogout = () => {
    setUser(null)
    setCostCenter(null)
    setStep("login")
  }

  return (
    <main className="min-vh-100">
      {step === "login" && <LoginForm onSuccess={handleLoginSuccess} />}
      {step === "cost-center" && user && (
        <CostCenterSelection username={user.username} onSelect={handleCostCenterSelect} onLogout={handleLogout} />
      )}
      {step === "dashboard" && user && costCenter && (
        <Dashboard username={user.username} costCenter={costCenter} onLogout={handleLogout} />
      )}
    </main>
  )
}
