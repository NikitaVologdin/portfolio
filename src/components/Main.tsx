"use client";
import { useContext } from "react";
import { context } from "../context/ContextProvider";

interface props {
  children: JSX.Element;
}
export default function Main({ children }: props) {
  const { isMenuShown } = useContext(context);

  return (
    <main
      className={`${
        isMenuShown ? "hidden" : "block"
      } flex flex-col grow pt-6 px-6 pb-6 md:pb-20 md:px-0 md:pt-12`}
    >
      {children}
    </main>
  );
}
