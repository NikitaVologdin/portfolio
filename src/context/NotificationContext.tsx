"use client";
import {
  createContext,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

interface props {
  children: React.ReactNode;
}

export interface InotificationContext {
  notification: Inotification;
  setNotification: Dispatch<SetStateAction<Inotification>>;
}

export interface Inotification {
  message: string;
  status: null | number;
  isActive: boolean;
}

export const NotificationContext = createContext<InotificationContext>({
  setNotification: () => {},
  notification: { message: "", status: null, isActive: false },
});

export default function NotificationProvider({ children }: props) {
  const [notification, setNotification] = useState<Inotification>({
    status: null,
    message: "",
    isActive: false,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNotification({ isActive: false, message: "", status: null });
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [notification, setNotification]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
