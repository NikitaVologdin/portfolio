"use client";
import InputGroup from "@/components/ui/form/InputGroup";
import Input from "@/components/ui/form/Input";
import TextArea from "@/components/ui/form/TextArea";
import useInput from "@/hooks/use-input";
import SubmitButton from "@/components/ui/form/SubmitButton";
import { SyntheticEvent, useEffect, useContext } from "react";
import { NotificationContext } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";
import { IFetchedDeveloper } from "@/types/Developer";
import { nameValidator, descriptionValidator } from "@/lib/validators";
import { useState } from "react";

interface props {
  developer: IFetchedDeveloper;
  path: string;
}

export default function IntroForm({ developer, path }: props) {
  const notificationCTX = useContext(NotificationContext);
  const router = useRouter();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const {
    value: nameValue,
    setValue: setNameValue,
    isTouched: nameIsTouched,
    setIsTouched: setNameIsTouched,
    hasError: nameHasError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(nameValidator);
  const {
    value: descriptionValue,
    setValue: setDescriptionValue,
    isTouched: descriptionIsTouched,
    setIsTouched: setDescriptionIsTouched,
    hasError: descriptionHasError,
    changeHandler: descriptionChangeHandler,
    blurHandler: descriptionBlurHandler,
    reset: descriptionReset,
  } = useInput(descriptionValidator);

  useEffect(() => {
    if (developer) {
      setNameValue(developer.name);
      setDescriptionValue(developer.description);

      setNameIsTouched(true);
      setDescriptionIsTouched(true);
    }
  }, [
    developer,
    setNameValue,
    setNameIsTouched,
    setDescriptionValue,
    setDescriptionIsTouched,
  ]);

  const isFormValid =
    !nameHasError &&
    nameIsTouched &&
    !descriptionHasError &&
    descriptionIsTouched;

  async function submitHandler(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) {
    event.preventDefault();
    if (isFormValid) {
      setIsFormSubmitting(true);
      const response = await fetch("https://" + path + "/api/hero", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: developer._id,
          name: nameValue,
          description: descriptionValue,
        }),
      });
      response
        .json()
        .then((info) => {
          notificationCTX.setNotification({
            status: info.status,
            message: info.message,
            isActive: true,
          });
          setIsFormSubmitting(false);
        })
        .catch((e) => {
          console.log(e);
          notificationCTX.setNotification({
            status: e.status,
            message: e.message,
            isActive: true,
          });
        });
    } else {
      return;
    }
  }

  return (
    <div className="h-full w-full flex items-center">
      <form className={"grow flex flex-col gap-2.5"} onSubmit={submitHandler}>
        <InputGroup
          label="Name, LastName"
          id="name"
          error="Invalid name"
          hasError={nameHasError}
        >
          <Input
            id="name"
            name="name"
            value={nameValue}
            isTouched={nameIsTouched}
            hasError={nameHasError}
            changeHandler={nameChangeHandler}
            blurHandler={nameBlurHandler}
          />
        </InputGroup>
        <InputGroup
          label="Intro text"
          id="description"
          error="Invalid intro"
          hasError={descriptionHasError}
        >
          <TextArea
            id="description"
            name="description"
            value={descriptionValue}
            isTouched={descriptionIsTouched}
            hasError={descriptionHasError}
            rows={5}
            cols={7}
            changeHandler={descriptionChangeHandler}
            blurHandler={descriptionBlurHandler}
          />
        </InputGroup>
        <div className="control flex gap-3">
          <SubmitButton
            name="Submit"
            isSubmitting={isFormSubmitting}
            isFormValid={isFormValid}
          />
        </div>
      </form>
    </div>
  );
}
