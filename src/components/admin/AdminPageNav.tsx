import AdminPageNavButton from "../admin/AdminPageNavButton";

interface props {
  modalToggleHandler: () => void;
  openFormButtonName: string;
  canCreateNewUser?: boolean;
}

export default function AdminPageNav({
  modalToggleHandler,
  openFormButtonName,
  canCreateNewUser,
}: props) {
  return (
    <div className="flex items-center gap-5">
      <AdminPageNavButton
        clickHandler={modalToggleHandler}
        name={openFormButtonName}
        disabled={canCreateNewUser}
      />
    </div>
  );
}
