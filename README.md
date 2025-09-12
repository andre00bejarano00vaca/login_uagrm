# 📚 UAGRM - Sistema Académico (Frontend)

Este proyecto corresponde al **rediseño del frontend** del Sistema Académico de la **Universidad Autónoma Gabriel René Moreno (UAGRM)**.  
Fue desarrollado con **Next.js 15**, **React**, **TailwindCSS** y **GraphQL**.

---

## 🚀 Características principales

- ✨ **Interfaz moderna** con Tailwind CSS.  
- 🔑 **Login** con autenticación vía GraphQL.  
- 👤 **Perfil de estudiante** con secciones de datos personales, contacto, ubicación y académicos.  
- 🖼️ Visualización de foto de perfil ampliada y opción de impresión en PDF.  
- 🧭 **Layout principal** con sidebar, header institucional y navegación.  
- 🛠️ Configuración con **tipografías Geist** y favicons institucionales.  
- 🗂️ Integración con **Jira** y repositorio GitHub para gestión del proyecto.

---

## 📦 Instalación

Clona este repositorio:

```bash
git clone https://github.com/tu-usuario/uagrm-sistema-academico.git
cd uagrm-sistema-academico
Instala las dependencias:

bash
Copiar código
npm install
# o
yarn install
⚙️ Configuración
Crea un archivo .env.local en la raíz del proyecto con las siguientes variables:

env
Copiar código
# URL del backend GraphQL 
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://tu-backend.com/graphql

Registro: 218110001

Contraseña: 1234

▶️ Ejecución en desarrollo
bash
Copiar código
npm run dev
# o
yarn dev
El proyecto se abrirá en:
👉 http://localhost:3000

📦 Build y despliegue
Para generar la versión optimizada de producción:

bash
Copiar código
npm run build
npm run start
Esto compilará el proyecto y lo dejará listo para desplegar en cualquier servicio compatible con Next.js (Vercel, Netlify, servidor propio, etc.).

📂 Estructura del proyecto
bash
Copiar código
app/
 ├─ (auth)/login/      # Pantalla de login
 ├─ profile/           # Pantalla de perfil
 ├─ layout.tsx         # Layout principal
components/
 ├─ HeaderUagrm.tsx    # Header institucional
 └─ ui/sidebar.tsx     # Sidebar de navegación
lib/
 ├─ graphqlClient.ts   # Cliente GraphQL
public/
 ├─ logo/              # Favicons y logos
 └─ ImagenPerfilPrueba # Imagen de prueba para perfil
🛠️ Tecnologías usadas
Next.js 15

React 18

Tailwind CSS

GraphQL

Lucide Icons

👨‍💻 Desarrollo
Este sistema fue desarrollado como parte de las tareas de apoyo en DTIC - UAGRM,
incluyendo rediseño del frontend, integración con GraphQL y documentación para despliegue y mantenimiento.
