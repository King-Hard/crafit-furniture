import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminHeader() {
  return (
    <header className="flex items-center justify-between border-b px-2 py-4 ">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="ml-2"/>
        <h1 className="font-medium text-muted-foreground font-sans uppercase tracking-wide">Admin</h1> 
      </div>
    </header>
  );
}
