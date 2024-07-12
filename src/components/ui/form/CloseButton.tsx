interface props {
  modalCloseHandler: () => void;
}

export default function CloseButton({ modalCloseHandler }: props) {
  return (
    <button
      className="border py-1 px-3 text-md border-red-600 rounded text-red-600 hover:text-white hover:bg-red-600"
      onClick={modalCloseHandler}
    >
      Close
    </button>
  );
}
