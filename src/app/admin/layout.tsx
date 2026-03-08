import { requireAdmin } from "@/lib/admin-guard";
import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminNotificationBell from "@/components/admin/admin-notification-bell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="h-14 border-b border-stone-300 flex items-center justify-between px-6 bg-background sticky top-0 z-30">
          <p className="text-[10px] tracking-[0.5em] uppercase text-stone-600">
            Admin
          </p>
          <AdminNotificationBell />
        </div>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}