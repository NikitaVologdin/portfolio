import { ReactElement, ReactNode } from "react";

interface props {
  children: ReactElement | ReactNode;
  className?: string;
}

export default function container({ children, className }: props) {
  return (
    <div className={`container h-full mx-auto md:px-5 lg:px-24 ${className}`}>
      {children}
    </div>
  );
}
