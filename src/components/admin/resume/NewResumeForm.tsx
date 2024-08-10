"use client";
import InputGroup from "../../ui/form/InputGroup";
import Input from "../../ui/form/Input";
import FileInput from "../../ui/form/FileInput";
import SubmitButton from "../../ui/form/SubmitButton";
import useInput from "../../../hooks/use-input";
import useFileInput from "../../../hooks/use-fileInput";
import CloseButton from "@/components/ui/form/CloseButton";
import { imageUploadValidator, nameValidator } from "@/lib/validators";
import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { NotificationContext } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";
import { IFetchedResume } from "@/types/Resume";
import { IEditState } from "./Resume";

interface props {
  modalCloseHandler: () => void;
  resume?: IFetchedResume | null;
  setEdit: ({}: IEditState) => void;
  path: string;
}

export default function NewProjectForm({
  modalCloseHandler,
  resume,
  path,
}: props) {
  const ctx = useContext(NotificationContext);
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
  } = useInput(nameValidator);

  const {
    value: fileUploadValue,
    setValue: setFileUploadValue,
    isTouched: fileUploadIsTouched,
    setIsTouched: setFileUploadIsTouched,
    valueIsValid: fileUploadIsValid,
    hasError: fileUploadHasError,
    setHasError: setFileUploadHasError,
    changeHandler: fileUploadChangeHandler,
    blurHandler: fileUploadBlurHandler,
  } = useFileInput(() => true);

  useEffect(() => {
    if (fileUploadIsValid && fileUploadIsTouched) {
      setFileUploadHasError(false);
    }
    if (!fileUploadIsValid && fileUploadIsTouched) {
      setFileUploadHasError(true);
    }
  }, [fileUploadIsValid, setFileUploadHasError, fileUploadIsTouched]);

  useEffect(() => {
    if (resume) {
      setNameValue(resume.name);
      setFileUploadValue([{ name: resume.file }]);
      setNameIsTouched(true);
      setFileUploadIsTouched(true);
    }
  }, [
    resume,
    setNameValue,
    setNameIsTouched,
    setFileUploadValue,
    setFileUploadIsTouched,
  ]);
  const isFormValid = !nameHasError && !fileUploadHasError;
  async function submitHandler(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) {
    event.preventDefault();
    setIsFormSubmitting(true);
    if (isFormValid) {
      const formData = new FormData(event.currentTarget);
      if (resume) {
        formData.append("_id", resume._id);
      }
      const response = await fetch("https://" + path + "/api/resume", {
        method: resume ? "PUT" : "POST",
        body: formData,
      });
      response
        .json()
        .then((info) => {
          setIsFormSubmitting(false);
          modalCloseHandler();
          ctx.setNotification({
            isActive: true,
            status: info.status,
            message: info.message,
          });
        })
        .catch((e) => {
          setIsFormSubmitting(false);
          modalCloseHandler();
          ctx.setNotification({
            isActive: true,
            status: e.status,
            message: e.message,
          });
        });
    }
  }

  return (
    <form
      className="h-full grow flex flex-col gap-2.5"
      onSubmit={submitHandler}
    >
      <InputGroup
        label="Resume name"
        id="resumeName"
        hasError={nameHasError}
        error="Invalid name"
      >
        <Input
          id="resumeName"
          name="name"
          value={nameValue}
          isTouched={nameIsTouched}
          hasError={nameHasError}
          changeHandler={nameChangeHandler}
          blurHandler={nameBlurHandler}
        />
      </InputGroup>
      <InputGroup
        label="Resume file"
        id="resumeFle"
        hasError={fileUploadHasError}
        error="File is not valid"
      >
        <FileInput
          id="resumeFile"
          name="file"
          value={fileUploadValue}
          fetchedImageName={resume?.file}
          isTouched={fileUploadIsTouched}
          hasError={fileUploadHasError}
          changeHandler={fileUploadChangeHandler}
          blurHandler={fileUploadBlurHandler}
        />
      </InputGroup>
      <div className="control flex gap-3">
        <SubmitButton
          name={resume ? "Edit" : "Submit"}
          isFormValid={isFormValid}
          isSubmitting={isFormSubmitting}
        />
        <CloseButton modalCloseHandler={modalCloseHandler} />
      </div>
    </form>
  );
}
