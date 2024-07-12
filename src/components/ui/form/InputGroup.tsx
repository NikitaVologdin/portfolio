"use client";
import { ReactElement } from "react";

interface props {
  children: ReactElement;
  label: string;
  id: string;
  hasError: boolean;
  error: string;
}

export default function InputGroup({
  children,
  label,
  id,
  hasError,
  error,
}: props) {
  const classes = `flex flex-col gap-y-1.5`;
  return (
    <div className={classes}>
      <label
        className={"text-sm text-indigo-900 font-medium"}
        htmlFor={id}
        aria-label={label}
      >
        {label}
      </label>
      {children}
      <div className={`${hasError ? "visible" : "invisible"}`}>
        <p className="text-xs text-rose-500">{error}</p>
      </div>
    </div>
  );
}
