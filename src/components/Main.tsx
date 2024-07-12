"use client";

interface props {
  children: JSX.Element;
}
export default function Main({ children }: props) {
  return (
    <main
      className={
        "flex flex-col grow pt-6 px-6 pb-6 md:pb-20 md:px-0 md:pt-12 -z-20"
      }
    >
      {children}
    </main>
  );
}
