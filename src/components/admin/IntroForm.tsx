"use client";
import InputGroup from "../ui/form/InputGroup";
import Input from "../ui/form/Input";
import TextArea from "../ui/form/TextArea";
import useInput from "../../hooks/use-input";
import SubmitButton from "../ui/form/SubmitButton";
import { SyntheticEvent, useEffect, useContext } from "react";
import { NotificationContext } from "@/context/NotificationContext";
import { updateData } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { IDeveloper } from "@/models/developer";

interface props {
  developer: IDeveloper;
}

export default function IntroForm({ developer }: props) {
  const notificationCTX = useContext(NotificationContext);
  const router = useRouter();

  const nameValidator = (value: string): boolean => {
    return value.trim().length >= 2;
  };
  const descriptionValidator = (value: string): boolean => {
    return value.trim().length >= 5;
  };

  const {
    value: nameValue,
    setValue: setNameValue,
    isTouched: nameIsTouched,
    hasError: nameHasError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(nameValidator);
  const {
    value: descriptionValue,
    setValue: setDescriptionValue,
    isTouched: descriptionIsTouched,
    hasError: descriptionHasError,
    changeHandler: descriptionChangeHandler,
    blurHandler: descriptionBlurHandler,
    reset: descriptionReset,
  } = useInput(descriptionValidator);

  useEffect(() => {
    if (developer) {
      setNameValue(developer.name);
      setDescriptionValue(developer.description);
    }
  }, [developer, setNameValue, setDescriptionValue]);

  const resetInputs = () => {
    nameReset();
    descriptionReset();
  };

  async function submitHandler(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) {
    event.preventDefault();
    if (!nameHasError && !descriptionHasError) {
      const response = updateData(event.currentTarget, developer._id, "hero")
        .then((info) => {
          notificationCTX.setNotification({
            status: info.status,
            message: info.message,
            isActive: true,
          });
          resetInputs();
          router.refresh();
        })
        .catch((e) => {
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
          <SubmitButton name="Submit" />
        </div>
      </form>
    </div>
  );
}
