import { ReactElement, ReactNode } from "react";

interface props {
  children: ReactElement | ReactNode;
  className?: string;
}

export default function container({ children, className }: props) {
  return (
    <div className={`container h-full mx-auto px-6 py-6 lg:px-24 ${className}`}>
      {children}
    </div>
  );
}
