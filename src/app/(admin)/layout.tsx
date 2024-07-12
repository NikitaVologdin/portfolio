import "./globals.css";
import AdminNav from "../../components/admin/AdminNav";
import NotificationContextProvider from "../../context/NotificationContext";
import Notification from "../../components/notification/Notification";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-full">
      <body className="h-full">
        <AdminNav />
        <main className="h-full flex flex-col relative w-3/4 items-center float-right">
          <NotificationContextProvider>
            <Notification />
            {children}
          </NotificationContextProvider>
        </main>
      </body>
    </html>
  );
}

// CONTEXT PROVIDER NAPISAN NEPRAVILNO.
