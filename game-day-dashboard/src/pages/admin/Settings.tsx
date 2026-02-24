import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Bell, 
  Globe, 
  ShieldCheck, 
  Mail, 
  Save, 
  Lock,
  Zap
} from "lucide-react";

export default function Settings() {
  return (
    /* Changed max-w-5xl to max-w-7xl and added lg:p-10 to match the other pages */
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10 font-sans text-slate-900">
      
      {/* Header Section - Matches Fixtures & Dashboard alignment */}
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter leading-none text-[#0e633d]">
            SYSTEM <span className="text-[#ef7d00]">SETTINGS</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest mt-2 text-[10px]">
            Admin Management Console • Platform Configuration
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border-2 border-slate-100 shadow-sm">
           <ShieldCheck className="h-8 w-8 text-[#0e633d]" />
           <div>
           </div>
        </div>
      </header>

      {/* Main Content Grid - Wrapped in max-w-7xl to maintain consistency */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Admin Profile & Regional */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Admin Profile */}
          <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white">
            <div className="h-2 bg-[#0e633d] w-full" />
            <CardHeader className="pb-4 pt-10 px-10">
              <CardTitle className="text-xl font-black uppercase tracking-widest text-slate-800 flex items-center gap-3">
                <User className="h-6 w-6 text-[#ef7d00]" />
                Admin Profile Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 p-10">
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Full Name
                  </Label>
                  <Input 
                    defaultValue="Admin User" 
                    className="h-12 rounded-xl border-slate-100 bg-slate-50/50 font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input 
                      type="email" 
                      defaultValue="admin@faz.co.zm" 
                      className="h-12 rounded-xl border-slate-100 bg-slate-50/50 font-bold pl-12"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>
              
              <Button className="h-14 px-10 bg-[#0e633d] hover:bg-[#0a4d2f] text-white rounded-2xl shadow-lg transition-all font-black uppercase tracking-widest text-xs italic">
                <Save className="mr-3 h-4 w-4" /> Save Profile Changes
              </Button>
            </CardContent>
          </Card>

          {/* Regional Settings */}
          <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-[2rem] overflow-hidden">
            <CardHeader className="pb-2 pt-10 px-10">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                <Globe className="h-5 w-5 text-[#0e633d]" />
                Regional Defaults
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-8 sm:grid-cols-2 p-10">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Default Currency
                </Label>
                <div className="h-12 flex items-center px-6 rounded-xl bg-slate-50 border border-slate-100 font-black text-[#0e633d]">
                  ZMW (K)
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  System Timezone
                </Label>
                <div className="h-12 flex items-center px-6 rounded-xl bg-slate-50 border border-slate-100 font-black text-slate-600">
                  Africa/Lusaka
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right Column: Notifications */}
        <div className="lg:col-span-5">
          <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] bg-white border-t-4 border-[#ef7d00]">
            <CardHeader className="pb-6 pt-10 px-10 text-center">
              <Bell className="h-10 w-10 text-[#ef7d00] mx-auto mb-4" />
              <CardTitle className="text-xl font-black uppercase tracking-widest text-slate-900">
                Notifications
              </CardTitle>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
                System Alert Configuration
              </p>
            </CardHeader>

            <CardContent className="px-10 pb-10 space-y-4">
              {["Order Alerts", "Inventory Alerts", "Sales Reports"].map((item) => (
                <div key={item} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#0e633d]/20 transition-all">
                  <div>
                    <Label className="text-sm font-black text-slate-800 cursor-pointer uppercase tracking-wide">
                      {item}
                    </Label>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#0e633d]">
                      Email Notification
                    </p>
                  </div>
                  <Switch className="scale-110 data-[state=checked]:bg-[#0e633d]" />
                </div>
              ))}

              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50/80">
                  <Zap className="h-5 w-5 text-[#ef7d00] mt-1 shrink-0" />
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-wide leading-relaxed">
                    Push notifications are active for this administrative session.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}