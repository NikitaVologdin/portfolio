"use client";
import { createContext, useState } from "react";

interface props {
  children: JSX.Element[];
  value: any;
}

export const context = createContext({
  isMenuShown: false,
  setMenuIsShown: () => {},
  toggleMenu: () => {},
});

export default function ContextProvider({ children, value }: props) {
  const [isMenuShown, setMenuIsShown] = useState(false);

  function toggleMenu() {
    return setMenuIsShown(!isMenuShown);
  }

  return (
    <context.Provider value={{ isMenuShown, setMenuIsShown, toggleMenu }}>
      {children}
    </context.Provider>
  );
}
