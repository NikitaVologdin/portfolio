import Image from "next/image";
import checkIcon from "../../../../public/form/check.svg";

interface props {
  id: string;
  name: string;
  value: string;
  isTouched: boolean;
  hasError: boolean;
  rows: number;
  cols: number;
  changeHandler: React.ChangeEventHandler<HTMLTextAreaElement>;
  blurHandler: React.FocusEventHandler<HTMLTextAreaElement>;
}

export default function TextArea({
  id,
  name,
  value,
  isTouched,
  hasError,
  rows,
  cols,
  changeHandler,
  blurHandler,
}: props) {
  const isValid = isTouched && !hasError;
  const isInValid = isTouched && hasError;
  return (
    <div className="relative">
      <textarea
        className={`w-full border ${isTouched ? "" : "border-slate-300"} ${
          isValid ? "border-green-400" : ""
        } ${
          isInValid ? "border-red-400" : ""
        } focus:border-indigo-700 focus:outline-indigo-700 rounded shadow-sm px-1.5 py-1 text-sm leading-5 hover:border-indigo-500`}
        id={id}
        name={name}
        value={value}
        rows={rows}
        cols={cols}
        onChange={changeHandler}
        onBlur={blurHandler}
      ></textarea>
      <div
        className={`${
          isValid ? "block" : "hidden"
        } absolute h-full top-0 right-0 flex items-end px-3 py-4`}
      >
        <Image src={checkIcon} alt="checked-con"></Image>
      </div>
    </div>
  );
}
