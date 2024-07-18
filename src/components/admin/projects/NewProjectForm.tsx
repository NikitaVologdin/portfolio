"use client";
import InputGroup from "../../ui/form/InputGroup";
import Input from "../../ui/form/Input";
import FileInput from "../../ui/form/FileInput";
import TextArea from "../../ui/form/TextArea";
import SubmitButton from "../../ui/form/SubmitButton";
import useInput from "../../../hooks/use-input";
import useFileInput from "../../../hooks/use-fileInput";
import CloseButton from "@/components/ui/form/CloseButton";
import {
  imageUploadValidator,
  nameValidator,
  gitHubLinkValidator,
  dateValidator,
  colorValidator,
  descriptionValidator,
} from "@/lib/validators";
import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { NotificationContext } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";
import { IFetchedSkill } from "@/types/Skills";
import useCheckboxes from "@/hooks/use-checkboxes";
import { IFetchedProject } from "@/types/Projects";
import { IEditState } from "./Projects";

interface props {
  modalCloseHandler: () => void;
  skills: IFetchedSkill[];
  project?: IFetchedProject | null;
  setEdit: ({}: IEditState) => void;
}

export default function NewProjectForm({
  modalCloseHandler,
  skills,
  project,
}: props) {
  const ctx = useContext(NotificationContext);
  const router = useRouter();

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
    valueIsValid: imageUploadIsValid,
    hasError: imageUploadHasError,
    setHasError: setImageUploadHasError,
    changeHandler: imageUploadChangeHandler,
    blurHandler: imageUploadBlurHandler,
  } = useFileInput(imageUploadValidator);

  const {
    value: categoryValue,
    setValue: setCategoryValue,
    isTouched: categoryIsTouched,
    setIsTouched: setCategoryIsTouched,
    hasError: categoryHasError,
    changeHandler: categoryChangeHandler,
    blurHandler: categoryBlurHandler,
  } = useInput(nameValidator);

  useEffect(() => {
    if (imageUploadIsValid && imageUploadIsTouched) {
      setImageUploadHasError(false);
    }
    if (!imageUploadIsValid && imageUploadIsTouched) {
      setImageUploadHasError(true);
    }
  }, [imageUploadIsValid, setImageUploadHasError, imageUploadIsTouched]);

  const {
    value: gitHubLinkValue,
    setValue: setGitHubLinkValue,
    isTouched: gitHubLinkIsTouched,
    setIsTouched: setGitHubLinkIsTouched,
    hasError: gitHubLinkHasError,
    changeHandler: gitHubLinkChangeHandler,
    blurHandler: gitHubLinkBlurHandler,
  } = useInput(gitHubLinkValidator);

  const {
    value: startDateValue,
    setValue: setStartDateValue,
    isTouched: startDateIsTouched,
    setIsTouched: setStartDateIsTouched,
    hasError: startDateHasError,
    changeHandler: startDateChangeHandler,
    blurHandler: startDateBlurHandler,
  } = useInput(dateValidator);

  const [presentCheckbox, setPresentCheckbox] = useState(false);
  function checkBoxHandler() {
    setPresentCheckbox(!presentCheckbox);
  }

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
    if (project) {
      setNameValue(project.name);
      setGitHubLinkValue(project.github);
      setStartDateValue(project.start);
      setEndDateValue(project.end);
      setImageUploadValue([{ name: project.image }]);
      setCategoryValue(project.category);
      setColorValue(project.color);
      setSelectedChecks(project.skills.map((s) => s._id));
      setDescriptionValue(project.description);

      setNameIsTouched(true);
      setGitHubLinkIsTouched(true);
      setStartDateIsTouched(true);
      setPresentCheckbox(project.present);
      setEndDateIsTouched(true);
      setImageUploadIsTouched(true);
      setCategoryIsTouched(true);
      setColorIsTouched(true);
      setSelectedChecksAreTouched(true);
      setDescriptionIsTouched(true);
    }
  }, [
    project,
    setNameValue,
    setNameIsTouched,
    setGitHubLinkValue,
    setGitHubLinkIsTouched,
    setCategoryValue,
    setCategoryIsTouched,
    setStartDateValue,
    setStartDateIsTouched,
    setPresentCheckbox,
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
    !gitHubLinkHasError &&
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
      if (project) {
        formData.append("_id", project._id);
      }
      formData.append("skills", JSON.stringify(selectedChecks));
      if (presentCheckbox) {
        formData.append("present", "on");
      } else {
        formData.append("present", "off");
      }
      const response = await fetch("http://localhost:3000/api/projects", {
        method: project ? "PUT" : "POST",
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
        label="Project name"
        id="projectName"
        hasError={nameHasError}
        error="Invalid name"
      >
        <Input
          id="projectName"
          name="name"
          value={nameValue}
          isTouched={nameIsTouched}
          hasError={nameHasError}
          changeHandler={nameChangeHandler}
          blurHandler={nameBlurHandler}
        />
      </InputGroup>
      <InputGroup
        label="Github link"
        id="gitHubLink"
        hasError={gitHubLinkHasError}
        error="Invalid github link"
      >
        <Input
          id="gitHubLink"
          name="github"
          value={gitHubLinkValue}
          isTouched={gitHubLinkIsTouched}
          hasError={gitHubLinkHasError}
          changeHandler={gitHubLinkChangeHandler}
          blurHandler={gitHubLinkBlurHandler}
        />
      </InputGroup>
      <InputGroup
        label="Start of the project"
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
          <label htmlFor="">In development ?</label>
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
        label="End of the project"
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
        label="Project Image"
        id="projectImage"
        hasError={imageUploadHasError}
        error="Image is not valid"
      >
        <FileInput
          id="projectImage"
          name="image"
          value={imageUploadValue}
          fetchedImageName={project?.image}
          isTouched={imageUploadIsTouched}
          hasError={imageUploadHasError}
          changeHandler={imageUploadChangeHandler}
          blurHandler={imageUploadBlurHandler}
        />
      </InputGroup>
      <InputGroup
        label="Category name"
        id="categoryName"
        hasError={categoryHasError}
        error="Invalid category name"
      >
        <Input
          id="categoryName"
          name="category"
          value={categoryValue}
          isTouched={categoryIsTouched}
          hasError={categoryHasError}
          changeHandler={categoryChangeHandler}
          blurHandler={categoryBlurHandler}
        />
      </InputGroup>
      <InputGroup
        label="Project color"
        id="projectColor"
        hasError={colorHasError}
        error="Invalid color code"
      >
        <Input
          id="projectColor"
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
          name={project ? "Edit" : "Submit"}
          disabled={!isFormValid}
        />
        <CloseButton modalCloseHandler={modalCloseHandler} />
      </div>
    </form>
  );
}
