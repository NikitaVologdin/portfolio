import checkIcon from "../../../../public/form/check.svg";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface props {
  id: string;
  name: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  disabled?: boolean;
  accept?: string;
  placeholder?: string;
  multiple?: boolean;
  value: { name: string }[] | File[] | null;
  fetchedImageName?: string;
  isTouched: boolean;
  hasError: boolean;
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
  blurHandler: React.FocusEventHandler<HTMLInputElement>;
}

export default function FileInput({
  id,
  name,
  disabled = false,
  multiple,
  accept,
  value = [],
  fetchedImageName = "",
  isTouched,
  hasError,
  changeHandler,
  blurHandler,
}: props) {
  const isValid = isTouched && !hasError;
  const isInValid = isTouched && hasError;

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fileInputRef.current) {
      let dt = new DataTransfer();
      let file = new File([], fetchedImageName);
      dt.items.add(file);
      fileInputRef.current.files = dt.files;
    }
  }, [fetchedImageName]);

  return (
    <div className="relative">
      <div
        className={`w-full border ${isTouched ? "" : "border-slate-300"} ${
          isValid ? "border-green-400" : ""
        } ${
          isInValid ? "border-red-400" : ""
        } focus:outline-indigo-700 rounded shadow-sm px-1.5 py-1 text-sm leading-5 disabled:opacity-75} hover:border-indigo-500`}
        onClick={() => fileInputRef.current?.showPicker()}
      >
        {value !== null && value?.length > 0
          ? `Selected file: ${value.length && value.map((e) => e.name)}`
          : "Please select a file..."}
      </div>
      <input
        type="file"
        accept={accept}
        ref={fileInputRef}
        disabled={disabled}
        name={name}
        id={id}
        onChange={changeHandler}
        onBlur={blurHandler}
        multiple={multiple}
        style={{ display: "none" }}
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
