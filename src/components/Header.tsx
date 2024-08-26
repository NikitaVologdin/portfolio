import { ReactElement } from "react";

interface props {
  children: ReactElement;
}
export default function Header({ children }: props) {
  return (
    <header className="border-b-1 border-light-grey dark:border-b-zinc-800">
      {children}
    </header>
  );
}
