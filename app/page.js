<<<<<<< HEAD
import { redirect } from "next/navigation"

export default function Home() {
  redirect("/login")
=======
"use client"

import { useState } from "react"
import { Eye, EyeOff, User, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    userCode: "",
    password: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt:", formData)
    // Aquí implementarías la lógica de autenticación
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Logo and background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center p-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            {/* University Logo */}
            <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                  <div className="text-white font-bold text-xs">UAGRM</div>
                </div>
              </div>
            </div>
            {/* UAGRM Text Logo */}
            <div className="text-left">
              <div className="text-4xl font-bold">
                <span className="text-blue-900">U</span>
                <span className="text-red-600">A</span>
                <span className="text-blue-900">G</span>
              </div>
              <div className="text-2xl font-bold text-blue-900">RM</div>
              <div className="text-xs text-gray-600 mt-1">UNIVERSIDAD AUTÓNOMA "GABRIEL RENÉ MORENO"</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-white shadow-2xl">
          <CardHeader className="text-center pb-6">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                    <div className="text-white font-bold text-xs">UAGRM</div>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">
                  <span className="text-blue-900">U</span>
                  <span className="text-red-600">A</span>
                  <span className="text-blue-900">G</span>
                  <span className="text-red-600">RM</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-900 rounded-full"></div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700">Universidad Autónoma Gabriel René Moreno</div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Iniciar sesión</h1>
            <p className="text-gray-600 text-sm">Bienvenido de nuevo. Por favor, ingresa tus credenciales</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Code Field */}
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    name="userCode"
                    placeholder="Código de usuario"
                    value={formData.userCode}
                    onChange={handleInputChange}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold text-base"
              >
                INICIAR SESIÓN
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-500">© 2025 UAGRM.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
>>>>>>> a27ee59a141a89a10c15441552fef35c680f6313
}
