import { Outlet, useLocation, NavLink } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Separator } from "@/components/ui/separator";
import { Bell, User } from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "Dashboard";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#f8fafc]">
        <AdminSidebar />
        
        <SidebarInset className="flex flex-col">
          {/* HEADER: Glassmorphism & Depth */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="h-9 w-9 text-[#0e633d] hover:bg-slate-100 transition-colors" />
                <Separator orientation="vertical" className="h-6 bg-slate-200" />
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">FAZ Intelligence</span>
                  <div className="h-1 w-1 rounded-full bg-[#ef7d00]" />
                </div>
                <h1 className="text-sm font-black uppercase italic tracking-tighter text-[#0e633d]">
                  {currentPath === "admin" ? "Console Overview" : currentPath}
                </h1>
              </div>
            </div>

            {/* Top Toolbar */}
            <div className="flex items-center gap-3">
              
              {/* CLICKABLE NOTIFICATION BELL */}
              <NavLink 
                to="/admin/notifications" 
                className={({ isActive }) => `
                  relative p-2 rounded-lg transition-all duration-300 group
                  ${isActive ? 'bg-[#ef7d00]/10 ring-1 ring-[#ef7d00]/20' : 'hover:bg-slate-100'}
                `}
              >
                <Bell className={`h-5 w-5 transition-colors ${location.pathname.includes('notifications') ? 'text-[#ef7d00]' : 'text-slate-600 group-hover:text-[#0e633d]'}`} />
                {/* Notification Badge */}
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#ef7d00] border-2 border-white shadow-sm" />
              </NavLink>

              <Separator orientation="vertical" className="h-6 mx-1" />

              {/* CLICKABLE PROFILE SECTION */}
              <NavLink 
                to="/admin/settings" 
                className="flex items-center gap-3 pl-2 group/profile transition-all duration-300"
              >
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-xs font-black uppercase italic text-[#0e633d] group-hover/profile:text-[#ef7d00] transition-colors">
                    Admin User
                  </span>
                  <span className="text-[9px] font-bold text-[#ef7d00] opacity-0 group-hover/profile:opacity-100 transition-opacity uppercase tracking-tighter">
                    Account Settings
                  </span>
                </div>
                <div className="h-10 w-10 rounded-xl bg-[#0e633d] flex items-center justify-center shadow-lg transform rotate-3 group-hover/profile:rotate-0 group-hover/profile:bg-[#ef7d00] transition-all duration-300">
                  <User className="h-5 w-5 text-white" />
                </div>
              </NavLink>
            </div>
          </header>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 relative overflow-y-auto">
            {/* Architectural Grid Watermark */}
            <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none" 
                 style={{ backgroundImage: `radial-gradient(#0e633d 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
            />
            
            <div className="relative z-10 p-6 lg:p-10 animate-in fade-in duration-500">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}