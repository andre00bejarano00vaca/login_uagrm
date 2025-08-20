'use client'
import { Calendar, Home, Inbox, Search, Settings, User, ReceiptText } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"

const items = [
  { 
    title: "Datos Personales",
    url: "/login",
    icon: User
  },
  { 
    title: "Certificados",
    url: "/login",
    icon: ReceiptText
  },
  { 
    title: "Historico",
    url: "/login",
    icon: Home 
  },
  { 
    title: "Avance Academico", 
    url: "#", 
    icon: Inbox 
  },
  { 
    title: "Boleta de Incripcion", 
    url: "#", 
    icon: Calendar 
  },
  { 
    title: "Casos Especiales",
    url: "/login",
    icon: Home 
  },
  { 
    title: "Malla Curricular",
    url: "/login",
    icon: Home 
  },
  { 
    title: "Notas Semestrales",
    url: "/login",
    icon: Home 
  },
  { 
    title: "Consulta de Libros",
    url: "/login",
    icon: Home 
  },
  { 
    title: "Pagos en Caja", 
    url: "#", 
    icon: Search 
  },
  { 
    title: "Bloqueos",
    url: "/login",
    icon: Home 
  },
  { 
    title: "Avance de Contenidos",
    url: "/login",
    icon: Home 
  },
  { 
    title: "Evaluacion Academica",
    url: "/login",
    icon: Home 
  },
  { 
    title: "Fecha de Analisis",
    url: "/login",
    icon: Home 
  },
  { 
    title: "Form. Beca",
    url: "/login",
    icon: Home 
  },
  { 
    title: "Control de Materias",
    url: "/login",
    icon: Home 
  },
  { 
    title: "Cambiar Contraseña",
    url: "/login",
    icon: Home 
  },
  { 
    title: "Settings", 
    url: "#", 
    icon: Settings 
  },
]

export function AppSidebar() {

  const router = useRouter()

  return (
      <Sidebar>
        <SidebarContent className="bg-blue-900 text-blue-100">
          <SidebarGroup>
            <SidebarGroupLabel className="text-blue-200 text-[18px] pb-8 pt-8">Consultas Esdudiantes</SidebarGroupLabel>
            <SidebarGroupContent className="">
              <SidebarMenu className="">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="pb-2">
                    <SidebarMenuButton
                      asChild
                      className="bg-blue-200 text-blue-800 hover:bg-blue-300 transition-colors"
                    >
                      <button
                        onClick={() => router.push(item.url)}
                        className="flex items-center gap-2 p-2 rounded w-full text-left"
                      >
                        <item.icon className="text-blue-800" />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  )
}