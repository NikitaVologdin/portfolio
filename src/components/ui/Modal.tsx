import { createPortal } from "react-dom";
import { ForwardedRef, forwardRef, RefObject } from "react";

interface props {
  children: React.ReactElement;
  modalToggleHandler: () => void;
}

const Modal = forwardRef(function Modal(
  { children, modalToggleHandler }: props,
  ref: ForwardedRef<HTMLDialogElement>,
) {
  return createPortal(
    <dialog
      ref={ref}
      className="py-5 px-8 w-2/5 h-4/5 bg-white rounded backdrop:bg-slate-900/75"
      onClose={modalToggleHandler}
    >
      <div className="overflow-scroll ">{children}</div>
    </dialog>,
    document.body,
  );
});

export default Modal;
