import { 
  LayoutDashboard, 
  Trophy,
  Ticket, 
  BarChart3, 
  Settings, 
  ExternalLink, 
  ChevronRight, 
  Bell } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel,
  SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarHeader, SidebarFooter, SidebarSeparator,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Matches", url: "/admin/matches", icon: Trophy },
  { title: "Orders", url: "/admin/orders", icon: Ticket },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
  { title: "Notifications", url: "/admin/notifications", icon: Bell },
];

export function AdminSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200 bg-white shadow-xl">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          {/* THE LOGO UPGRADE - Stronger Shadow & FAZ Green Ring */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_8px_16px_-6px_rgba(14,99,61,0.2)] ring-1 ring-[#0e633d]/10">
            <img 
              src="https://res.cloudinary.com/dceqpo559/image/upload/v1769602379/faz_logo_cl3wx5.png" 
              alt="FAZ Logo" 
              className="h-9 w-9 object-contain"
            />
          </div>
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="font-black text-lg leading-none tracking-tighter text-[#0e633d] italic uppercase">
              FAZ <span className="text-[#ef7d00]">Admin</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-1">
              Management Console
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} className="p-0 h-auto">
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group/link relative overflow-hidden"
                    
                      activeClassName="bg-[#0e633d] text-white shadow-[0_10px_20px_-5px_rgba(14,99,61,0.3)]"
                    >
                      {/* Active Indicator Bar */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ef7d00] opacity-0 group-[.active]:opacity-100" />
                      
                      <item.icon className="h-5 w-5 shrink-0 transition-transform group-hover/link:scale-110 group-[.active]:text-[#ef7d00]" />
                      <span className="text-sm font-bold tracking-tight uppercase italic group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                      
                      <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover/link:opacity-100 group-[.active]:opacity-0 transition-all group-data-[collapsible=icon]:hidden" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {/* Support/Live Site Card - Bottom */}
        <div className="group-data-[collapsible=icon]:hidden p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-4">
            <p className="text-[10px] font-black text-[#0e633d] uppercase italic mb-2">System Status</p>
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-slate-600">All Systems Operational</span>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}