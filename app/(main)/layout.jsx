'use client';

import { AppSidebar } from '@/app/(auth)/login/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function MainLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
