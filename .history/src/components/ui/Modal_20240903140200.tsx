import { createPortal } from "react-dom";
import { ForwardedRef, forwardRef } from "react";

interface props {
  children: React.ReactElement;
  modalToggleHandler: () => void;
}

const Modal = forwardRef(function Modal(
  { children, modalToggleHandler }: props,
  ref: ForwardedRef<HTMLDialogElement>
) {
  function clickHandler(event: React.MouseEvent<HTMLDialogElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      modalToggleHandler();
    }
  }

  return createPortal(
    <dialog
      ref={ref}
      className="py-5 px-8 bg-white rounded backdrop:bg-slate-900/75"
      onClose={modalToggleHandler}
      onClick={clickHandler}
    >
      <div className="overflow-scroll">{children}</div>
    </dialog>,
    document.body
  );
});

export default Modal;
