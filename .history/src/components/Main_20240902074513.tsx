"use client";
import { ReactElement } from "react";

interface props {
  children: ReactElement;
}
export default function Main({ children }: props) {
  return <main className={"flex flex-col grow -z-20 pb-16"}>{children}</main>;
}
