"use client";

import { useEffect, useContext } from "react";
import { MenuContext, ImenuContext } from "@/context/portfolio/MenuContext";
import Logo from "./Logo";
import Nav from "./Nav";
import Burger from "./Burger";
import { usePathname } from "next/navigation";

interface props {
  children: JSX.Element;
}

export default function Navbar({ children }: props) {
  const { isMenuShown, setMenuIsShown, toggleMenu } = useContext(
    MenuContext
  ) as ImenuContext;

  const pathName = usePathname();

  useEffect(() => {
    setMenuIsShown(false);
  }, [setMenuIsShown, pathName]);

  function clickHandler() {
    toggleMenu();
  }
  return (
    <div className="navbar flex justify-between bg-white lg:justify-normal relative">
      <Logo />
      <div
        className={`nav-wrapper ${
          isMenuShown ? "translate-y-0" : "-translate-y-[calc(100vh+51px)]"
        } absolute top-[51px] right-0 left-0 lg:static transition duration-300 ease-linear w-full h-[calc(100vh-51px)] lg:h-auto lg:translate-y-0 bg-white lg:z-0 -z-10`}
      >
        <Nav />
      </div>
      <Burger isMenuShown={isMenuShown} clickHandler={clickHandler} />
    </div>
  );
}
