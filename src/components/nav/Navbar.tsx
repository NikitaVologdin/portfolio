"use client";

import { useEffect, useContext } from "react";
import { MenuContext, ImenuContext } from "@/context/portfolio/MenuContext";
import Logo from "./Logo";
import Nav from "./Nav";
import Burger from "./Burger";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

interface props {
  children: ReactElement;
}

export default function Navbar({ children }: props) {
  const { isMenuShown, setMenuIsShown, toggleMenu } = useContext(
    MenuContext,
  ) as ImenuContext;

  const pathName = usePathname();

  useEffect(() => {
    setMenuIsShown(false);
  }, [setMenuIsShown, pathName]);

  function clickHandler() {
    toggleMenu();
  }
  return (
    <div className="navbar flex justify-between bg-white lg:justify-normal dark:bg-[#121212]">
      <Logo />
      <div
        className={`nav-wrapper ${
          isMenuShown
            ? "translate-y-0 top-[51px] right-0 left-0 bottom-0"
            : "-translate-y-[calc(100vh+51px)] right-0 left-0"
        } absolute transition duration-300 ease-linear w-full lg:static lg:h-auto lg:translate-y-0 bg-white lg:z-0 -z-10 dark:bg-[#121212]`}
      >
        <Nav />
      </div>
      <Burger isMenuShown={isMenuShown} clickHandler={clickHandler} />
    </div>
  );
}
