"use client";
import {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  ReactNode,
} from "react";

export interface IMenuContext {
  isMenuShown: boolean;
  setMenuIsShown: Dispatch<SetStateAction<boolean>>;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
}

interface props {
  children: ReactNode;
}

export const MenuContext = createContext<IMenuContext>({
  isMenuShown: false,
  setMenuIsShown: () => {},
  toggleMenu: () => {},
  openMenu: () => {},
  closeMenu: () => {},
});
export default function MenuContextProvider({ children }: props) {
  const [isMenuShown, setMenuIsShown] = useState(false);

  function toggleMenu() {
    setMenuIsShown(!isMenuShown);
  }

  function openMenu() {
    setMenuIsShown(true);

    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  }

  function closeMenu() {
    setMenuIsShown(false);

    document.body.style.overflow = "unset";
  }

  return (
    <MenuContext.Provider
      value={{ isMenuShown, setMenuIsShown, toggleMenu, openMenu, closeMenu }}
    >
      {children}
    </MenuContext.Provider>
  );
}
