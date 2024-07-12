import AdminPageNavButton from "../admin/AdminPageNavButton";

interface props {
  modalToggleHandler: () => void;
  openFormButtonName: string;
}

export default function AdminPageNav({
  modalToggleHandler,
  openFormButtonName,
}: props) {
  return (
    <div className="flex items-center gap-5">
      <AdminPageNavButton
        clickHandler={modalToggleHandler}
        name={openFormButtonName}
      />
    </div>
  );
}
