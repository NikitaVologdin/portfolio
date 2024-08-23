import { ReactElement } from "react";

interface props {
  children: ReactElement;
  backdropText?: string;
  className?: string;
}

export default function SquaredButton({
  backdropText,
  children,
  className,
}: props) {
  return (
    <div
      className={`relative p-[10px] border border-light-grey rounded-lg hover:border-[#8e8e8e] hover:after:absolute hover:after:inline-block hover:after:absolute hover:after:w-max hover:after:-bottom-7 hover:after:-right-20 hover:after:bg-[#e1e1e1] hover:after:py-1 hover:after:px-2.5 hover:after:border hover:after:border-[#e1e1e1] hover:after:rounded-2xl hover:after:text-sm hover:after:z-10 hover:after:content-[attr(data-help)]
      ${className}`}
      data-help={backdropText}
    >
      {children}
    </div>
  );
}
