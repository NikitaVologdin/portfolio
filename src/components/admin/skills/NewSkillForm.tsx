"use client";

import InputGroup from "../../ui/form/InputGroup";
import Input from "../../ui/form/Input";
import FileInput from "../../ui/form/FileInput";
import TextArea from "../../ui/form/TextArea";
import Select from "../../ui/form/Select";
import useInput from "../../../hooks/use-input";
import useFileInput from "../../../hooks/use-fileInput";
import SubmitButton from "../../ui/form/SubmitButton";
import CloseButton from "@/components/ui/form/CloseButton";
import { useEffect, useState, SyntheticEvent, useContext } from "react";
import { NotificationContext } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";
import { IEditState } from "./Skills";
import { IFetchedSkill, IFetchedSkillsGroup } from "@/types/Skills";
import {
  imageUploadValidator,
  nameValidator,
  colorValidator,
  descriptionValidator,
} from "@/lib/validators";

interface props {
  modalCloseHandler: () => void;
  groups: IFetchedSkillsGroup[];
  skill?: IFetchedSkill | null;
  setEdit: ({}: IEditState) => void;
  path: string;
}

export default function SkillsForm({
  modalCloseHandler,
  groups,
  skill,
  setEdit,
  path,
}: props) {
  const router = useRouter();
  const ctx = useContext(NotificationContext);

  const [newSkillInputDisabled, setNewSkillInputDisabled] = useState(true);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const {
    value: skillNameValue,
    setValue: setSkillNameValue,
    isTouched: skillNameIsTouched,
    setIsTouched: setSkillNameIstouched,
    hasError: skillNameHasError,
    changeHandler: skillNameChangeHandler,
    blurHandler: skillNameBlurHandler,
  } = useInput(nameValidator);

  const {
    value: skillGroupValue,
    setValue: setSkillGroupValue,
    isTouched: skillGroupIsTouched,
    setIsTouched: setSkillGroupIstouched,
    hasError: skillGroupHasError,
    changeHandler: skillGroupChangeHandler,
    blurHandler: skillGroupBlurHandler,
  } = useInput(nameValidator);

  const {
    value: newSkillsGroupValue,
    isTouched: newSkillsGroupIsTouched,
    setIsTouched: setNewSkillGroupIsTouched,
    hasError: newSkillsGroupHasError,
    setHasError: setNewSkillHasError,
    changeHandler: newSkillsGroupChangeHandler,
    blurHandler: newSkillsGroupBlurHandler,
    reset: newSkillGroupValueReset,
  } = useInput(nameValidator);

  const {
    value: skillImageUploadValue,
    setValue: setSkillImageUploadValue,
    valueIsValid: skillImageUploadIsValid,
    isTouched: skillImageUploadIsTouched,
    setIsTouched: setSkillImageUploadIsTouched,
    hasError: skillImageUploadHasError,
    setHasError: skillImageUploadSetHasError,
    changeHandler: skillImageUploadChangeHandler,
    blurHandler: skillImageUploadBlurHandler,
  } = useFileInput(imageUploadValidator);

  useEffect(() => {
    if (skillImageUploadIsValid && skillImageUploadIsTouched) {
      skillImageUploadSetHasError(false);
    }
    if (!skillImageUploadIsValid && skillImageUploadIsTouched) {
      skillImageUploadSetHasError(true);
    }
  }, [
    skillImageUploadIsValid,
    skillImageUploadSetHasError,
    skillImageUploadIsTouched,
  ]);

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
    value: skillDescriptionValue,
    setValue: setSkillDescriptionValue,
    isTouched: skillDescriptionIsTouched,
    setIsTouched: setSkillDescriptionIsTouched,
    hasError: skillDescriptionHasError,
    changeHandler: skillDescriptionChangeHandler,
    blurHandler: skillDescriptionBlurHandler,
  } = useInput(descriptionValidator);

  useEffect(() => {
    if (skillGroupValue === "New group") {
      setNewSkillInputDisabled(false);
    }
    if (skillGroupValue !== "New group") {
      setNewSkillInputDisabled(true);
      setNewSkillGroupIsTouched(false);
      setNewSkillHasError(false);
      newSkillGroupValueReset();
    }
  }, [
    skillGroupValue,
    newSkillGroupValueReset,
    newSkillsGroupHasError,
    setNewSkillGroupIsTouched,
    setNewSkillHasError,
  ]);

  useEffect(() => {
    if (skill) {
      setSkillNameValue(skill.name);
      setSkillGroupValue(skill.group.name);
      setSkillImageUploadValue([{ name: skill.image }]);
      setColorValue(skill.color);
      setSkillDescriptionValue(skill.description);

      setSkillNameIstouched(true);
      setSkillGroupIstouched(true);
      setColorIsTouched(true);
      setSkillImageUploadIsTouched(true);
      setSkillDescriptionIsTouched(true);
    }
  }, [
    skill,
    setSkillNameValue,
    setSkillGroupValue,
    setColorValue,
    setSkillDescriptionValue,
    setSkillImageUploadValue,
    setSkillNameIstouched,
    setSkillGroupIstouched,
    setSkillImageUploadIsTouched,
    setSkillDescriptionIsTouched,
    setColorIsTouched,
  ]);

  const isFormValid =
    !skillNameHasError &&
    skillNameIsTouched &&
    !skillGroupHasError &&
    skillGroupIsTouched &&
    !newSkillsGroupHasError &&
    !skillImageUploadHasError &&
    skillImageUploadIsTouched &&
    !colorHasError &&
    colorIsTouched &&
    !skillDescriptionHasError;
  skillDescriptionIsTouched;

  async function submitHandler(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) {
    event.preventDefault();
    setIsFormSubmitting(true);
    if (isFormValid) {
      const formData = new FormData(event.currentTarget);
      if (skill) {
        formData.append("_id", skill._id);
        formData.set("group", skill.group._id);
      }
      const response = await fetch("https://" + path + "/api/skills", {
        method: skill ? "PUT" : "POST",
        body: formData,
      });
      response
        .json()
        .then((info) => {
          setIsFormSubmitting(false);
          router.refresh();
          modalCloseHandler();
          ctx.setNotification({
            isActive: true,
            status: info.status,
            message: info.message,
          });
          setEdit({ state: false });
        })
        .catch((info) => {
          setIsFormSubmitting(false);
          modalCloseHandler();
          ctx.setNotification({
            isActive: true,
            status: info.status,
            message: info.message,
          });
          setEdit({ state: false });
        });
    }
  }

  return (
    <div className="h-full w-full flex items-center">
      <form className={"grow flex flex-col gap-2.5"} onSubmit={submitHandler}>
        <InputGroup
          label="Skill name"
          id="skillName"
          hasError={skillNameHasError}
          error="Invalid name"
        >
          <Input
            id="skillName"
            name="name"
            value={skillNameValue}
            isTouched={skillNameIsTouched}
            hasError={skillNameHasError}
            changeHandler={skillNameChangeHandler}
            blurHandler={skillNameBlurHandler}
          />
        </InputGroup>
        <InputGroup
          label="Skill group"
          id="skillGroup"
          hasError={skillGroupHasError}
          error="Must choose a skill group"
        >
          <Select
            id="skillGroup"
            name="group"
            value={skillGroupValue}
            isTouched={skillGroupIsTouched}
            hasError={skillGroupHasError}
            changeHandler={skillGroupChangeHandler}
            blurHandler={skillGroupBlurHandler}
            groups={groups}
          />
        </InputGroup>
        <InputGroup
          label="New skills group"
          id="newSkillGroup"
          hasError={newSkillsGroupHasError}
          error="Invalid group name"
        >
          <Input
            id="newSkillGroup"
            name="newSkillGroup"
            disabled={newSkillInputDisabled}
            value={newSkillsGroupValue}
            hasError={newSkillsGroupHasError}
            isTouched={newSkillsGroupIsTouched}
            changeHandler={newSkillsGroupChangeHandler}
            blurHandler={newSkillsGroupBlurHandler}
          />
        </InputGroup>
        <InputGroup
          label="Skill Image"
          id="skillImage"
          hasError={skillImageUploadHasError}
          error="Must choose .svg"
        >
          <FileInput
            name="image"
            accept=".svg"
            id="skillImage"
            value={skillImageUploadValue}
            fetchedImageName={skill?.image}
            multiple={false}
            isTouched={skillImageUploadIsTouched}
            hasError={skillImageUploadHasError}
            changeHandler={skillImageUploadChangeHandler}
            blurHandler={skillImageUploadBlurHandler}
          />
        </InputGroup>
        <InputGroup
          label="Skill color"
          id="skillColor"
          hasError={colorHasError}
          error="Invalid color code"
        >
          <Input
            id="skillColor"
            name="color"
            value={colorValue}
            hasError={colorHasError}
            isTouched={colorIsTouched}
            changeHandler={colorChangeHandler}
            blurHandler={colorBlurHandler}
          />
        </InputGroup>
        <InputGroup
          label="Skill description"
          id="skillDescription"
          hasError={skillDescriptionHasError}
          error="Description is not valid"
        >
          <TextArea
            id="skillDescription"
            name="description"
            value={skillDescriptionValue}
            rows={5}
            cols={7}
            isTouched={skillDescriptionIsTouched}
            hasError={skillDescriptionHasError}
            changeHandler={skillDescriptionChangeHandler}
            blurHandler={skillDescriptionBlurHandler}
          />
        </InputGroup>
        <div className="form__control flex gap-3">
          <SubmitButton
            name={skill ? "Edit" : "Submit"}
            isFormValid={isFormValid}
            isSubmitting={isFormSubmitting}
          />
          <CloseButton modalCloseHandler={modalCloseHandler} />
        </div>
      </form>
    </div>
  );
}
