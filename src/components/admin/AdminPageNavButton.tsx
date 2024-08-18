import { MouseEventHandler } from "react";

interface props {
  clickHandler: MouseEventHandler<HTMLButtonElement>;
  name: string;
  disabled?: boolean;
}

export default function AdminPageNavButton({
  clickHandler,
  name,
  disabled,
}: props) {
  const hoverClasses = "hover:text-white hover:bg-indigo-900";
  const disabledClasses =
    "disabled:border-gray-700 disabled:text-gray-700 disabled:opacity-50";
  const activeClasses = "border-indigo-900 text-indigo-900";
  return (
    <button
      onClick={clickHandler}
      className={`box-border px-2 py-1 border border-indigo-900 rounded text-sm ${hoverClasses} ${disabledClasses} `}
      disabled={disabled}
    >
      {name}
    </button>
  );
}
