import ClosingFormIcon from "./ClosingFormIcon";

interface props {
  children: React.ReactElement;
  modalCloseHandler: () => void;
}

export default function FormWrapper({ children, modalCloseHandler }: props) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end">
        <button className="" onClick={modalCloseHandler}>
          <ClosingFormIcon className="fill-indigo-900 hover:fill-red-600 cursor-pointer" />
        </button>
      </div>
      <div className="h-full">{children}</div>
    </div>
  );
}
