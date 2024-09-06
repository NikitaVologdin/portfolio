import { createPortal } from "react-dom";
import { ForwardedRef, forwardRef } from "react";
import { motion, useIsPresent } from "framer-motion";

interface props {
  children: React.ReactElement;
  modalToggleHandler: () => void;
  width?: string;
}

const Modal = forwardRef(function Modal(
  { children, modalToggleHandler, width = "w-5/12" }: props,
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
    <motion.dialog
      ref={ref}
      className={`pb-3 md:py-5 md:px-8 bg-white rounded backdrop:bg-slate-900/75 ${width}`}
      onClose={modalToggleHandler}
      onClick={clickHandler}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="overflow-scroll">{children}</div>
    </motion.dialog>,
    document.body
  );
});

export default Modal;
