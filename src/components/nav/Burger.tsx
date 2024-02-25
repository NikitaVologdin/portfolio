import { MouseEventHandler, useState } from "react";

interface props {
  isMenuShown: boolean;
  clickHandler: MouseEventHandler;
}

export default function Burger({ isMenuShown, clickHandler }: props) {
  const spanClasses =
    "block bg-slate-950 h-1 w-[39px] rounded transition duration-300 ease-linear origin-left";
  return (
    <div
      className={`burger h-8 w-10 m-2 float-right block lg:hidden flex flex-col justify-between`}
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
