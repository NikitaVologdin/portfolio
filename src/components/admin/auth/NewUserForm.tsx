"use client";
import InputGroup from "@/components/ui/form/InputGroup";
import Input from "@/components/ui/form/Input";
import SubmitButton from "@/components/ui/form/SubmitButton";
import useInput from "@/hooks/use-input";
import CloseButton from "@/components/ui/form/CloseButton";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { NotificationContext } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";

interface props {
  modalCloseHandler: () => void;
  path: string;
}

export default function NewProjectForm({ modalCloseHandler, path }: props) {
  const ctx = useContext(NotificationContext);
  const router = useRouter();

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

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
  const {
    value: emailValue,
    isTouched: emailIsTouched,
    hasError: emailHasError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput(validator);

  const isFormValid = true;

  async function submitHandler(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) {
    event.preventDefault();
    setIsFormSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const response = await fetch(`https://${path}/api/sign-up`, {
      method: "POST",
      body: formData,
    });
    response
      .json()
      .then((info) => {
        modalCloseHandler();
        router.refresh();
        ctx.setNotification({
          isActive: true,
          status: info.status,
          message: info.message,
        });
      })
      .catch((e) => {
        console.log(e);
        modalCloseHandler();
        ctx.setNotification({
          isActive: true,
          status: e.status,
          message: e.message,
        });
      })
      .finally(() => {
        setIsFormSubmitting(false);
      });
  }

  return (
    <form
      className="h-full grow flex flex-col gap-2.5"
      onSubmit={submitHandler}
    >
      <InputGroup label="Login" id="login" hasError={loginHasError} error={""}>
        <Input
          id="Login"
          name="login"
          value={loginValue}
          isTouched={loginIsTouched}
          hasError={loginHasError}
          changeHandler={loginChangeHandler}
          blurHandler={loginBlurHandler}
        />
      </InputGroup>
      <InputGroup
        label="Password"
        id="passwornd"
        hasError={passwordHasError}
        error={""}
      >
        <Input
          id="password"
          name="password"
          value={passwordValue}
          isTouched={passwordIsTouched}
          hasError={passwordHasError}
          changeHandler={passwordChangeHandler}
          blurHandler={passwordBlurHandler}
        />
      </InputGroup>
      <InputGroup label="Email" id="email" hasError={emailHasError} error={""}>
        <Input
          id="email"
          name="email"
          value={emailValue}
          isTouched={emailIsTouched}
          hasError={emailHasError}
          changeHandler={emailChangeHandler}
          blurHandler={emailBlurHandler}
        />
      </InputGroup>
      <div className="control flex gap-3">
        <SubmitButton
          name={"Sign up"}
          isFormValid={isFormValid}
          isSubmitting={isFormSubmitting}
        />
        <CloseButton modalCloseHandler={modalCloseHandler} />
      </div>
    </form>
  );
}
