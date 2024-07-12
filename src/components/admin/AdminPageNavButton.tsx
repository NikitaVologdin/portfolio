import { MouseEventHandler } from "react";

interface props {
  clickHandler: MouseEventHandler<HTMLButtonElement>;
  name: string;
}

export default function AdminPageNavButton({ clickHandler, name }: props) {
  return (
    <button
      onClick={clickHandler}
      className="box-border px-2 py-1 border border-indigo-900 rounded text-sm hover:text-white hover:bg-indigo-900"
    >
      {name}
    </button>
  );
}
