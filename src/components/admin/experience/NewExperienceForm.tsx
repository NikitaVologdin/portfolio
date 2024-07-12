"use client";
import InputGroup from "@/components/ui/form/InputGroup";
import Input from "@/components/ui/form/Input";
import FileInput from "@/components/ui/form/FileInput";
import TextArea from "@/components/ui/form/TextArea";
import SubmitButton from "@/components/ui/form/SubmitButton";
import useInput from "@/hooks/use-input";
import useFileInput from "@/hooks/use-fileInput";
import CloseButton from "@/components/ui/form/CloseButton";
import {
  imageUploadValidator,
  nameValidator,
  dateValidator,
  colorValidator,
  descriptionValidator,
} from "@/lib/validators";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { NotificationContext } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";
import { IFetchedSkill } from "@/types/Skills";
import useCheckboxes from "@/hooks/use-checkboxes";
import { IFetchedExperience } from "@/types/Experience";
import { IEditState } from "./Experiences";

interface props {
  modalCloseHandler: () => void;
  skills: IFetchedSkill[];
  experience?: IFetchedExperience | null;
  setEdit: ({}: IEditState) => void;
}

export default function NewProjectForm({
  modalCloseHandler,
  skills,
  experience,
}: props) {
  const ctx = useContext(NotificationContext);
  const router = useRouter();

  const [presentCheckbox, setPresentCheckbox] = useState(false);
  function checkBoxHandler() {
    setPresentCheckbox(!presentCheckbox);
  }

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
    value: imageUploadValue,
    setValue: setImageUploadValue,
    isTouched: imageUploadIsTouched,
    setIsTouched: setImageUploadIsTouched,
    hasError: imageUploadHasError,
    setHasError: setImageUploadHasError,
    changeHandler: imageUploadChangeHandler,
    blurHandler: imageUploadBlurHandler,
  } = useFileInput(imageUploadValidator);

  const {
    value: startDateValue,
    setValue: setStartDateValue,
    isTouched: startDateIsTouched,
    setIsTouched: setStartDateIsTouched,
    hasError: startDateHasError,
    changeHandler: startDateChangeHandler,
    blurHandler: startDateBlurHandler,
  } = useInput(dateValidator);

  const {
    value: endDateValue,
    setValue: setEndDateValue,
    isTouched: endDateIsTouched,
    setIsTouched: setEndDateIsTouched,
    hasError: endDateHasError,
    changeHandler: endDateChangeHandler,
    blurHandler: endDateBlurHandler,
  } = useInput(dateValidator);

  const {
    value: colorValue,
    setValue: setColorValue,
    isTouched: colorIsTouched,
    setIsTouched: setColorIsTouched,
    hasError: colorHasError,
    changeHandler: colorChangeHandler,
    blurHandler: colorBlurHandler,
  } = useInput(colorValidator);

  const {
    selectedChecks,
    setSelectedChecks,
    setIsTouched: setSelectedChecksAreTouched,
    isValid: areSelectedChecksValid,
    hasError: checksHaveError,
    changeHandler: checksChangeHandler,
  } = useCheckboxes<string>();

  const {
    value: descriptionValue,
    setValue: setDescriptionValue,
    isTouched: descriptionIsTouched,
    setIsTouched: setDescriptionIsTouched,
    hasError: descriptionHasError,
    changeHandler: descriptionChangeHandler,
    blurHandler: descriptionBlurHandler,
  } = useInput(descriptionValidator);

  useEffect(() => {
    if (experience) {
      setNameValue(experience.name);
      setStartDateValue(experience.start);
      setEndDateValue(experience.end);
      setImageUploadValue([{ name: experience.image }]);
      setColorValue(experience.color);
      setPresentCheckbox(experience.present);
      setSelectedChecks(experience.skills.map((s) => s._id));
      setDescriptionValue(experience.description);
      setNameIsTouched(true);
      setStartDateIsTouched(true);
      setEndDateIsTouched(true);
      setImageUploadIsTouched(true);
      setColorIsTouched(true);
      setSelectedChecksAreTouched(true);
      setDescriptionIsTouched(true);
    }
  }, [
    experience,
    setNameValue,
    setNameIsTouched,
    setStartDateValue,
    setPresentCheckbox,
    setStartDateIsTouched,
    setEndDateValue,
    setEndDateIsTouched,
    setImageUploadValue,
    setImageUploadIsTouched,
    setColorValue,
    setColorIsTouched,
    setSelectedChecks,
    setSelectedChecksAreTouched,
    setDescriptionValue,
    setDescriptionIsTouched,
  ]);

  const isFormValid =
    !nameHasError &&
    !startDateHasError &&
    !endDateHasError &&
    !imageUploadHasError &&
    !colorHasError &&
    !checksHaveError &&
    !descriptionHasError;

  async function submitHandler(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) {
    event.preventDefault();
    if (isFormValid) {
      const formData = new FormData(event.currentTarget);
      skills.forEach((skill) => {
        formData.delete(skill.name);
      });
      formData.append("skills", JSON.stringify(selectedChecks));
      if (presentCheckbox) {
        formData.append("present", "on");
      } else {
        formData.append("present", "off");
      }
      if (experience) {
        formData.append("_id", experience._id);
      }
      const response = await fetch("http://localhost:3000/api/experiences", {
        method: experience ? "PUT" : "POST",
        body: formData,
      });
      response
        .json()
        .then((info) => {
          modalCloseHandler();
          ctx.setNotification({
            isActive: true,
            status: info.status,
            message: info.message,
          });
          router.refresh();
        })
        .catch((e) => {
          console.log(e);
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
        label="Title"
        id="name"
        hasError={nameHasError}
        error="Invalid title"
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
        label="Start date of the employment"
        id="startDate"
        hasError={startDateHasError}
        error="Invalid date"
      >
        <Input
          id="startDate"
          name="start"
          type="date"
          value={startDateValue}
          isTouched={startDateIsTouched}
          hasError={startDateHasError}
          changeHandler={startDateChangeHandler}
          blurHandler={startDateBlurHandler}
        />
      </InputGroup>
      <InputGroup label="Present" id="present" hasError={false} error="">
        <div className="flex content-center justify-between">
          <label htmlFor="">Present employment ?</label>
          <input
            id="present"
            name="present"
            type="checkbox"
            className="px-5"
            checked={presentCheckbox}
            onChange={checkBoxHandler}
          />
        </div>
      </InputGroup>
      <InputGroup
        label="End date of the employment"
        id="endDate"
        hasError={endDateHasError}
        error="Invalid date"
      >
        <Input
          id="endDate"
          name="end"
          type="date"
          value={endDateValue}
          isTouched={endDateIsTouched}
          hasError={endDateHasError}
          changeHandler={endDateChangeHandler}
          blurHandler={endDateBlurHandler}
          disabled={presentCheckbox}
        />
      </InputGroup>
      <InputGroup
        label="image"
        id="image"
        hasError={imageUploadHasError}
        error="Image is not valid"
      >
        <FileInput
          id="image"
          name="image"
          value={imageUploadValue}
          fetchedImageName={experience?.image}
          isTouched={imageUploadIsTouched}
          hasError={imageUploadHasError}
          changeHandler={imageUploadChangeHandler}
          blurHandler={imageUploadBlurHandler}
        />
      </InputGroup>
      <InputGroup
        label="Experience color"
        id="color"
        hasError={colorHasError}
        error="Invalid color code"
      >
        <Input
          id="color"
          name="color"
          value={colorValue}
          hasError={colorHasError}
          isTouched={colorIsTouched}
          changeHandler={colorChangeHandler}
          blurHandler={colorBlurHandler}
        />
      </InputGroup>
      <InputGroup
        label="Skills"
        id="skills"
        hasError={checksHaveError}
        error="Select skills"
      >
        <div className="grid grid-cols-3 gap-x-10">
          {skills.map((skill, index) => {
            return (
              <div key={index} className="flex content-center justify-between">
                <label htmlFor={skill.name}>{skill.name}</label>
                <input
                  id={skill.name}
                  name={skill.name}
                  type="checkbox"
                  className="px-5"
                  checked={selectedChecks.includes(skill._id)}
                  onChange={() => checksChangeHandler(skill._id)}
                />
              </div>
            );
          })}
        </div>
      </InputGroup>
      <InputGroup
        label="description"
        id="description"
        hasError={descriptionHasError}
        error="Description is not valid"
      >
        <TextArea
          id="description"
          name="description"
          value={descriptionValue}
          rows={5}
          cols={7}
          isTouched={descriptionIsTouched}
          hasError={descriptionHasError}
          changeHandler={descriptionChangeHandler}
          blurHandler={descriptionBlurHandler}
        />
      </InputGroup>
      <div className="control flex gap-3">
        <SubmitButton
          name={experience ? "Edit" : "Submit"}
          disabled={!isFormValid}
        />
        <CloseButton modalCloseHandler={modalCloseHandler} />
      </div>
    </form>
  );
}
