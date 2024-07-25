import "./globals.css";
import AdminNav from "@/components/admin/AdminNav";
import NotificationContextProvider from "@/context/NotificationContext";
import Notification from "@/components/notification/Notification";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row h-full">
      <header className="w-1/4">
        <AdminNav />
      </header>
      <main className="h-full flex relative w-3/4 items-center justify-center">
        <NotificationContextProvider>
          <Notification />
          {children}
        </NotificationContextProvider>
      </main>
    </div>
  );
}
