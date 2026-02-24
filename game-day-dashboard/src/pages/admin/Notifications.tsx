import { useState } from "react";
import { Trophy, 
  Ticket, 
  ShieldAlert, 
  CreditCard, 
  Settings, 
  CheckCircle2 } from "lucide-react";

type NotificationType = "match" | "order" | "payment" | "security" | "system";

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notificationsData: Notification[] = [
  { id: 1, type: "match", title: "New Match Published", message: "Zambia vs Morocco has been scheduled for 28 March 2026 at Levy Mwanawasa Stadium.", time: "2 hours ago", read: false },
  { id: 2, type: "order", title: "High Ticket Volume Alert", message: "Over 1,200 tickets sold in the last 30 minutes for Zambia vs Tanzania.", time: "4 hours ago", read: false },
  { id: 3, type: "payment", title: "Payment Gateway Warning", message: "3 failed mobile money transactions detected. Please review gateway logs.", time: "Yesterday", read: true },
  { id: 4, type: "security", title: "Suspicious Activity Detected", message: "Multiple login attempts from an unrecognized IP address.", time: "2 days ago", read: true },
  { id: 5, type: "system", title: "System Update Completed", message: "Ticket validation engine updated successfully to v2.4.1.", time: "3 days ago", read: true },
];

const typeStyles: Record<NotificationType, { icon: any; color: string; bg: string }> = {
  match: { icon: Trophy, color: "text-[#0e633d]", bg: "bg-[#0e633d]/10" },
  order: { icon: Ticket, color: "text-[#ef7d00]", bg: "bg-[#ef7d00]/10" },
  payment: { icon: CreditCard, color: "text-yellow-600", bg: "bg-yellow-500/10" },
  security: { icon: ShieldAlert, color: "text-red-600", bg: "bg-red-500/10" },
  system: { icon: Settings, color: "text-slate-600", bg: "bg-slate-500/10" },
};

export default function Notifications() {
  // Initialize state with the mock data
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);

  // FUNCTION: Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // FUNCTION: Mark single notification as read when clicked
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-3xl font-black uppercase italic tracking-tighter text-[#0e633d]">
            SYSTEM <span className="text-[#ef7d00]">NOTIFICATIONS</span>
          </h1>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight mt-1 opacity-80">
            Platform Configuration • System Alert Logs
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Functional Button */}
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-tighter text-slate-600 hover:bg-slate-50 active:scale-95 transition-all shadow-sm group"
          >
            <CheckCircle2 className="h-4 w-4 text-[#0e633d] group-hover:scale-110 transition-transform" />
            Mark all as read
          </button>
        </div>
      </div>

      <div className="space-y-4 w-full">
        {notifications.map((notification) => {
          const config = typeStyles[notification.type];
          const Icon = config.icon;

          return (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`group relative overflow-hidden p-6 rounded-[2rem] border transition-all duration-300 bg-white cursor-pointer ${
                notification.read
                  ? "border-slate-100 opacity-80 shadow-sm"
                  : "border-white shadow-[0_15px_30px_-10px_rgba(14,99,61,0.12)] ring-1 ring-[#0e633d]/5"
              } hover:translate-x-1`}
            >
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-500 ${
                  notification.read ? 'bg-slate-200' : 'bg-[#ef7d00]'
                }`} 
              />

              <div className="flex items-start gap-6">
                <div
                  className={`h-14 w-14 shrink-0 flex items-center justify-center rounded-2xl shadow-inner ${config.bg} rotate-3 group-hover:rotate-0 transition-transform duration-300`}
                >
                  <Icon className={`h-7 w-7 ${config.color}`} />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3
                      className={`font-black text-lg tracking-tighter leading-none mb-1 transition-colors duration-500 ${
                        notification.read ? "text-slate-500" : "text-[#0e633d]"
                      }`}
                    >
                      {notification.title}
                    </h3>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg">
                      {notification.time}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 font-medium leading-relaxed mt-2 tracking-tight opacity-90">
                    {notification.message}
                  </p>
                </div>

                {!notification.read && (
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef7d00] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ef7d00]"></span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}