import React from "react";

export default function Heading({
  children,
  style,
}: {
  children: string;
  style?: string;
}) {
  return (
    <h1
      className={`text-4xl md:text-6xl text-black font-bold my-1.5 text-center tracking-heading-wider ${style}`}
    >
      {children}
    </h1>
  );
}
