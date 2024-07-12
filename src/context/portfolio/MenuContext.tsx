"use client";
import {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  ReactNode,
} from "react";

export interface ImenuContext {
  isMenuShown: boolean;
  setMenuIsShown: Dispatch<SetStateAction<boolean>>;
  toggleMenu: () => void;
}

interface props {
  children: ReactNode;
}

export const MenuContext = createContext<ImenuContext>({
  isMenuShown: false,
  setMenuIsShown: () => {},
  toggleMenu: () => {},
});
export default function MenuContextProvider({ children }: props) {
  const [isMenuShown, setMenuIsShown] = useState(false);

  function toggleMenu() {
    setMenuIsShown(!isMenuShown);
  }

  return (
    <MenuContext.Provider value={{ isMenuShown, setMenuIsShown, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
}
