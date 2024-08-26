"use client";

import { useEffect, useContext } from "react";
import { MenuContext, IMenuContext } from "@/context/portfolio/MenuContext";
import Logo from "./Logo";
import Nav from "./Nav";
import Burger from "./Burger";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

interface props {
  children: ReactElement;
}

export default function Navbar({ children }: props) {
  const { isMenuShown, setMenuIsShown, toggleMenu, openMenu, closeMenu } =
    useContext(MenuContext) as IMenuContext;

  const pathName = usePathname();

  useEffect(() => {
    setMenuIsShown(false);
  }, [setMenuIsShown, pathName]);

  function clickHandler() {
    if (isMenuShown) {
      closeMenu();
    }
    if (!isMenuShown) {
      openMenu();
    }
  }

  return (
    <div className="navbar flex justify-between lg:justify-normal dark:bg-[#121212]">
      <Logo />
      <div
        className={`nav-wrapper ${
          isMenuShown
            ? "translate-y-0 top-[51px] right-0 left-0 bottom-0 overflow-hidden"
            : "-translate-y-[calc(100vh+51px)] right-0 left-0"
        } absolute transition duration-300 ease-linear w-full lg:static lg:h-auto lg:translate-y-0 lg:z-0 -z-10`}
      >
        <Nav />
      </div>
      <Burger isMenuShown={isMenuShown} clickHandler={clickHandler} />
    </div>
  );
}
