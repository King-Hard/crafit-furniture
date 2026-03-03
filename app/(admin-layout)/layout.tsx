import AdminHeader from "@/components/admin-compo/admin-header";
import AdminSidebar from "@/components/admin-compo/sidebar-admin";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <SidebarProvider>
      <AdminSidebar/>
      <SidebarInset>
        <AdminHeader/>
          <main className="flex-1 p-5 overflow-y-auto scroll-smooth hide-scrollbar">
            {children}
          </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
