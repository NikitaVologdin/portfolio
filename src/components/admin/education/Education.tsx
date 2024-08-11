"use client";
import { useState, useRef, useEffect, useContext } from "react";
import Nav from "../AdminPageNav";
import Modal from "../../ui/Modal";
import FormWrapper from "../../../components/ui/form/FormWrapper";
import NewEducationForm from "../education/NewEducationForm";
import EducationItem from "./EducationItem";
import { fetchDataOnClient, deleteData } from "@/lib/utils";
import { NotificationContext } from "@/context/NotificationContext";
import { IFetchedSkill } from "@/types/Skills";
import { IFetchedEducation } from "@/types/Education";

interface props {
  education: IFetchedEducation[];
  skills: IFetchedSkill[];
  path: string;
}

export interface IEditState {
  state: boolean;
  education?: IFetchedEducation;
}

export default function Education({ education, skills, path }: props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState<IEditState>({ state: false });
  const dialog = useRef<HTMLDialogElement>(null);
  const ctx = useContext(NotificationContext);

  const modalToggleHandler = () => {
    setModalOpen(!isModalOpen);
    setEdit({ state: false });
  };

  const editHandler = async (skillId: string) => {
    modalToggleHandler();
    const education = await fetchDataOnClient("education", path, skillId);
    setEdit({ state: true, education });
  };

  const deleteHandler = async (skillId: string) => {
    const response = await deleteData("education", path, skillId);
    response
      ?.json()
      .then((info) => {
        ctx.setNotification({
          isActive: true,
          message: info.message,
          status: info.status,
        });
      })
      .catch((info) => {
        ctx.setNotification({
          isActive: true,
          message: info.message,
          status: info.status,
        });
      });
  };

  useEffect(() => {
    if (isModalOpen === true && dialog.current) {
      dialog.current.showModal();
    }
    if (isModalOpen === false && dialog.current) {
      dialog.current.close();
    }
  }, [isModalOpen, setModalOpen]);

  return (
    <div className="education">
      <div className="flex justify-end">
        {isModalOpen && (
          <Modal ref={dialog} modalToggleHandler={modalToggleHandler}>
            <FormWrapper modalCloseHandler={modalToggleHandler}>
              <NewEducationForm
                modalCloseHandler={modalToggleHandler}
                education={edit.state ? edit.education : null}
                skills={skills}
                setEdit={setEdit}
                path={path}
              />
            </FormWrapper>
          </Modal>
        )}
        <Nav
          modalToggleHandler={modalToggleHandler}
          openFormButtonName="New Education"
        />
      </div>
      <div className="flex flex-col">
        {education.map((education: IFetchedEducation, index) => {
          return (
            <EducationItem
              education={education}
              key={index}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
            />
          );
        })}
      </div>
    </div>
  );
}
