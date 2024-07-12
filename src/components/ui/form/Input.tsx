import checkIcon from "../../../../public/form/check.svg";
import Image from "next/image";

interface props {
  id: string;
  name: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  disabled?: boolean;
  type?: string;
  accept?: string;
  placeholder?: string;
  multiple?: boolean;
  value: string;
  isTouched: boolean;
  hasError: boolean;
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
  blurHandler: React.FocusEventHandler<HTMLInputElement>;
}

export default function Input({
  id,
  name,
  inputRef,
  disabled = false,
  type = "text",
  multiple,
  accept,
  placeholder = "",
  value,
  isTouched,
  hasError,
  changeHandler,
  blurHandler,
}: props) {
  const isValid = isTouched && !hasError;
  const isInValid = isTouched && hasError;

  return (
    <div className="relative">
      <input
        type={type}
        accept={accept}
        ref={inputRef}
        className={`w-full border ${isTouched ? "" : "border-slate-300"} ${
          isValid ? "border-green-400" : ""
        } ${
          isInValid ? "border-red-400" : ""
        } focus:outline-indigo-700 autofill:bg-white bg-white rounded shadow-sm px-1.5 py-1 text-sm leading-5 disabled:opacity-75} ${
          disabled ? "" : "hover:border-indigo-500"
        }`}
        disabled={disabled}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        multiple={multiple}
      />
      <div
        className={`${
          isValid ? "block" : "hidden"
        } absolute h-full top-0 right-0 flex items-center px-3`}
      >
        <Image src={checkIcon} alt="checked-con"></Image>
      </div>
    </div>
  );
}
