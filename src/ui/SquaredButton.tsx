import { useState } from "react";

interface props {
  index?: number;
  children: JSX.Element;
  backdropText?: string;
}

export default function SquaredButton({
  index,
  backdropText,
  children,
}: props) {
  return (
    <div
      className={
        "relative p-[10px] border border-light-grey rounded-lg hover:border-[#8e8e8e] hover:after:absolute hover:after:inline-block hover:after:absolute hover:after:w-max hover:after:-bottom-7 hover:after:left-3.5 hover:after:bg-[#e1e1e1] hover:after:py-1 hover:after:px-2.5 hover:after:border hover:after:border-[#e1e1e1] hover:after:rounded-2xl hover:after:text-sm hover:after:z-10 hover:after:content-[attr(data-help)]"
      }
      key={index}
      data-help={backdropText}
    >
      {children}
    </div>
  );
}
