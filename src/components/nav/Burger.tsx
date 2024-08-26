import { MouseEventHandler, useState } from "react";
import { useTheme } from "next-themes";

interface props {
  isMenuShown: boolean;
  clickHandler: MouseEventHandler;
}

export default function Burger({ isMenuShown, clickHandler }: props) {
  const spanClasses = `bg-[#121212] block h-1 w-[39px] rounded transition duration-300 ease-linear origin-left dark:invert`;

  return (
    <div
      className={`burger h-8 w-10 m-2 float-right lg:hidden flex flex-col justify-between`}
      id="burger"
      onClick={clickHandler}
    >
      <span
        className={`${spanClasses} ${isMenuShown ? "rotate-45" : ""}`}
      ></span>
      <span
        className={`${spanClasses} ${
          isMenuShown ? "opacity-0" : "opacity-100"
        }`}
      ></span>
      <span
        className={`${spanClasses} ${isMenuShown ? "-rotate-45" : ""}`}
      ></span>
    </div>
  );
}
