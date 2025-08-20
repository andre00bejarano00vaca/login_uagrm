'use client';

import { AppSidebar } from '@/app/(auth)/login/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import HeaderUagrm from '@/components/HeaderUagrm';

export default function MainLayout({ children }) {
  return (
    <SidebarProvider>
      {/* Sidebar a la izquierda */}
      <AppSidebar />

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header UAGRM siempre arriba */}
        {/* Header UAGRM siempre arriba (sticky) */}
<div className="sticky top-0 z-50 print:static">
  <HeaderUagrm />
</div>


        {/* Contenido de la página */}
        <main className="flex-1 p-4">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
