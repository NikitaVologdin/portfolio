"use client";

import { useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import { context } from "../../context/ContextProvider";
import Logo from "./Logo";
import Nav from "./Nav";
import Burger from "./Burger";

interface props {
  children: JSX.Element;
}

export default function Navbar({ children }: props) {
  const { isMenuShown, setMenuIsShown, toggleMenu } = useContext(context);

  const pathName = usePathname();

  useEffect(() => {
    setMenuIsShown(false);
  }, [pathName, setMenuIsShown]);

  function clickHandler() {
    toggleMenu();
  }

  return (
    <div className="flex justify-between lg:justify-normal">
      <Logo />
      <div
        className={`nav absolute top-[51px] bottom-[0px] lg:static ${
          isMenuShown ? "translate-y-0" : "-translate-y-[calc(200%)]"
        } lg:translate-y-0 transition-transform duration-300 w-full bg-white z-20`}
      >
        <Nav />
      </div>
      <Burger isMenuShown={isMenuShown} clickHandler={clickHandler} />
    </div>
  );
}
