"use client";

interface props {
  children: JSX.Element;
}
export default function Main({ children }: props) {
  return <main className={"flex flex-col grow -z-20"}>{children}</main>;
}
