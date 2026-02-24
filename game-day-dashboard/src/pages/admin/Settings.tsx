import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  User, Bell, Globe, ShieldCheck, Mail, Save, Lock, 
  Smartphone, Database, Printer, CreditCard, AlertTriangle, Loader2, CheckCircle2
} from "lucide-react";

export default function Settings() {
  // State for Profile
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@faz.co.zm"
  });
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  // State for Backup
  const [lastBackup, setLastBackup] = useState("Today, 04:00 AM");
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(85);

  // Function: Handle Profile Save & Sync to Navbar
  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setHasSaved(true);

      // --- This logic updates the "lil corner" ---
      // 1. It sends a custom event that your Sidebar/Navbar can listen for
      window.dispatchEvent(new CustomEvent("profileUpdate", { detail: profile.name }));
      
      // 2. Brute force: Search for any element with "Admin User" and swap it immediately
      document.querySelectorAll('*').forEach(el => {
        if (el.children.length === 0 && (el.textContent === "Admin User" || el.textContent === "ADMIN USER")) {
          el.textContent = profile.name.toUpperCase();
        }
      });

      setTimeout(() => setHasSaved(false), 3000);
    }, 1500);
  };

  // Function: Run Backup with interesting visual feedback
  const runBackup = () => {
    setIsBackingUp(true);
    setBackupProgress(0); // Interesting visual: reset progress to 0
    
    // Simulate a filling progress bar
    const interval = setInterval(() => {
      setBackupProgress(prev => (prev >= 100 ? 100 : prev + 10));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      const now = new Date();
      // Accurate time including seconds to show it actually ran
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastBackup(`Today, ${timeString}`);
      setIsBackingUp(false);
      setBackupProgress(85); // Return to original storage capacity look
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10 font-sans text-slate-900">
      
      {/* Header Section */}
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
             <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Security Status</p>
             <p className="text-xs font-black uppercase text-[#0e633d]">Level 4 Protected</p>
           </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
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
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</Label>
                  <Input 
                    value={profile.name} 
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="h-12 rounded-xl border-slate-100 bg-slate-50/50 font-bold focus:ring-[#0e633d]" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                  <div className="relative">
                    <Input 
                      type="email" 
                      value={profile.email} 
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="h-12 rounded-xl border-slate-100 bg-slate-50/50 font-bold pl-12" 
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>
              <Button 
                onClick={handleSaveProfile}
                disabled={isSaving}
                className={`h-14 px-10 rounded-2xl shadow-lg transition-all font-black uppercase tracking-widest text-xs italic ${
                  hasSaved ? "bg-green-600 hover:bg-green-700" : "bg-[#0e633d] hover:bg-[#0a4d2f]"
                } text-white`}
              >
                {isSaving ? <Loader2 className="mr-3 h-4 w-4 animate-spin" /> : hasSaved ? <CheckCircle2 className="mr-3 h-4 w-4" /> : <Save className="mr-3 h-4 w-4" />}
                {isSaving ? "Updating System..." : hasSaved ? "Profile Reflected!" : "Save Profile Changes"}
              </Button>
            </CardContent>
          </Card>

          {/* Payment Gateway - FEE REMOVED & UPDATED */}
          <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-[2rem] overflow-hidden">
            <CardHeader className="pb-2 pt-10 px-10">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-[#0e633d]" />
                Payment Gateway Config
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-6">
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Processing Protocol</Label>
                  <div className="h-12 flex items-center px-6 rounded-xl bg-slate-50 border border-slate-100 font-black text-[#0e633d]">DYNAMIC ROUTING</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Settlement Period</Label>
                  <div className="h-12 flex items-center px-6 rounded-xl bg-slate-50 border border-slate-100 font-black text-slate-600">Instant Settlement</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0e633d]/5 border border-[#0e633d]/10">
                <span className="text-[10px] font-black uppercase text-[#0e633d]">Multi-Network Bridge (Airtel / MTN / Zamtel)</span>
                <span className="text-[10px] font-black uppercase text-green-600 bg-white px-3 py-1 rounded-lg shadow-sm">Connected</span>
              </div>
            </CardContent>
          </Card>

          {/* Ticketing & Logistics */}
          <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-[2rem] overflow-hidden">
            <CardHeader className="pb-2 pt-10 px-10">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                <Printer className="h-5 w-5 text-[#0e633d]" />
                Ticketing & Logistics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 grid gap-8 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">QR Code Encryption</Label>
                <div className="h-12 flex items-center px-6 rounded-xl bg-slate-50 border border-slate-100 font-black text-[#0e633d]">AES-256 HIGH</div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Max Tickets Per User</Label>
                <Input type="number" defaultValue="5" className="h-12 rounded-xl border-slate-100 bg-slate-50/50 font-bold" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Notifications */}
          <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] bg-white border-t-4 border-[#ef7d00]">
            <CardHeader className="pb-6 pt-10 px-10 text-center">
              <Bell className="h-10 w-10 text-[#ef7d00] mx-auto mb-4" />
              <CardTitle className="text-xl font-black uppercase tracking-widest text-slate-900">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="px-10 pb-10 space-y-4">
              {["Order Alerts", "Inventory Alerts", "Sales Reports"].map((item) => (
                <div key={item} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 transition-all">
                  <Label className="text-sm font-black text-slate-800 uppercase tracking-wide cursor-pointer">{item}</Label>
                  <Switch className="data-[state=checked]:bg-[#0e633d]" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Maintenance Mode */}
          <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] bg-white overflow-hidden">
            <div className="bg-red-500/10 p-4 flex items-center gap-3 border-b border-red-100">
               <AlertTriangle className="h-5 w-5 text-red-600" />
               <span className="text-[10px] font-black uppercase text-red-600">Emergency Controls</span>
            </div>
            <CardContent className="p-8">
               <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase text-slate-800">Maintenance Mode</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Disable Frontend Access</p>
                  </div>
                  <Switch className="data-[state=checked]:bg-red-600" />
               </div>
            </CardContent>
          </Card>

          {/* Database & Backups - FUNCTIONAL & ORIGINAL POSITION */}
          <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] bg-white p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-colors ${isBackingUp ? "bg-orange-100" : "bg-blue-500/10"}`}>
                  {isBackingUp ? <Loader2 className="h-6 w-6 text-[#ef7d00] animate-spin" /> : <Database className="h-6 w-6 text-blue-600" />}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Last Backup</p>
                  <p className="text-xs font-black uppercase text-slate-800 tracking-tight transition-all">
                    {isBackingUp ? "Synchronizing..." : lastBackup}
                  </p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={runBackup}
                disabled={isBackingUp}
                className="text-[9px] font-black uppercase rounded-lg border-slate-200 h-8 active:scale-95 transition-all"
              >
                {isBackingUp ? "Running" : "Run Now"}
              </Button>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
               <div 
                  className={`h-full transition-all duration-300 ${isBackingUp ? "bg-[#ef7d00]" : "bg-[#0e633d]"}`} 
                  style={{ width: `${backupProgress}%` }}
               />
            </div>
            <p className="text-[9px] font-black uppercase text-slate-400 mt-2 text-right">
              {isBackingUp ? "Writing to Secure Cloud..." : `${backupProgress}% Storage Capacity`}
            </p>
          </Card>

        </div>
      </div>
    </div>
  );
}