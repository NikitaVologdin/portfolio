"use client";
import { useRef, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NotificationContext } from "@/context/NotificationContext";
import InputGroup from "@/components/ui/form/InputGroup";
import Input from "@/components/ui/form/Input";
import useInput from "@/hooks/use-input";
import SubmitButton from "@/components/ui/form/SubmitButton";
import { SyntheticEvent } from "react";
import AdminPageNav from "@/components/admin/AdminPageNav";
import Modal from "@/components/ui/Modal";
import FormWrapper from "@/components/ui/form/FormWrapper";
import NewUserForm from "@/components/admin/auth/NewUserForm";

interface props {
  path: string;
  canCreateNewUser: boolean;
}

export default function Auth({ path, canCreateNewUser }: props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const ctx = useContext(NotificationContext);
  const router = useRouter();

  const modalToggleHandler = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isModalOpen === true && dialog.current) {
      dialog.current.showModal();
    }
    if (isModalOpen === false && dialog.current) {
      dialog.current.close();
    }
  }, [isModalOpen, setModalOpen]);

  const validator = () => {
    return true;
  };
  const {
    value: loginValue,
    isTouched: loginIsTouched,
    hasError: loginHasError,
    changeHandler: loginChangeHandler,
    blurHandler: loginBlurHandler,
  } = useInput(validator);
  const {
    value: passwordValue,
    isTouched: passwordIsTouched,
    hasError: passwordHasError,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput(validator);

  async function submitHandler(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch(`https://${path}/api/login`, {
      method: "POST",
      body: formData,
    });
    response
      .json()
      .then((info) => {
        router.refresh();
        ctx.setNotification({
          isActive: true,
          status: info.status,
          message: info.message,
        });
      })
      .catch((e) => {
        console.log(e);
        ctx.setNotification({
          isActive: true,
          status: e.status,
          message: e.message,
        });
      });
  }

  return (
    <div className="h-full">
      {isModalOpen && (
        <Modal ref={dialog} modalToggleHandler={modalToggleHandler}>
          <FormWrapper modalCloseHandler={modalToggleHandler}>
            <NewUserForm modalCloseHandler={modalToggleHandler} path={path} />
          </FormWrapper>
        </Modal>
      )}
      <div className="flex justify-end">
        <AdminPageNav
          modalToggleHandler={modalToggleHandler}
          openFormButtonName="New User"
          canCreateNewUser={canCreateNewUser}
        />
      </div>
      <div className="h-full flex justify-center items-center -mt-10">
        <form className="flex flex-col gap-3" onSubmit={submitHandler}>
          <InputGroup label="Login" id="login" hasError={false} error="">
            <Input
              id="login"
              name="login"
              value={loginValue}
              isTouched={loginIsTouched}
              hasError={loginHasError}
              changeHandler={loginChangeHandler}
              blurHandler={loginBlurHandler}
            />
          </InputGroup>
          <InputGroup label="Password" id="password" hasError={false} error="">
            <Input
              id="password"
              name="password"
              type="password"
              value={passwordValue}
              isTouched={passwordIsTouched}
              hasError={passwordHasError}
              changeHandler={passwordChangeHandler}
              blurHandler={passwordBlurHandler}
            />
          </InputGroup>
          <div className="mt-1">
            <SubmitButton
              name="Login"
              isFormValid={true}
              isSubmitting={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
