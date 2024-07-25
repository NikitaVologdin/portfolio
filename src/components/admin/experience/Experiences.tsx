"use client";
import { useState, useRef, useEffect, useContext } from "react";
import Nav from "../AdminPageNav";
import Modal from "@/components/ui/Modal";
import FormWrapper from "@/components/ui/form/FormWrapper";
import NewExperienceForm from "./NewExperienceForm";
import { IFetchedExperience } from "@/types/Experience";
import ExperienceItem from "./ExperienceItem";
import { IFetchedSkill } from "@/types/Skills";
import { deleteData, fetchDataOnClient } from "@/lib/utils";
import { NotificationContext } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";

interface props {
  experiences?: IFetchedExperience[];
  skills: IFetchedSkill[];
  path: string;
}

export interface IEditState {
  state: boolean;
  experience?: IFetchedExperience;
}

export default function Experience({ experiences, skills, path }: props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState<IEditState>({ state: false });
  const dialog = useRef<HTMLDialogElement>(null);
  const ctx = useContext(NotificationContext);
  const router = useRouter();

  const modalToggleHandler = () => {
    setModalOpen(!isModalOpen);
    setEdit({ state: false });
  };

  useEffect(() => {
    if (isModalOpen === true && dialog.current) {
      dialog.current.showModal();
    }
    if (isModalOpen === false && dialog.current) {
      dialog.current.close();
    }
  }, [isModalOpen, setModalOpen]);

  const editHandler = async (id: string) => {
    modalToggleHandler();
    const experience = await fetchDataOnClient("experiences", path, id);
    setEdit({ state: true, experience });
  };

  const deleteHandler = async (id: string) => {
    const response = await deleteData("experiences", path, id);
    response
      ?.json()
      .then((info) => {
        ctx.setNotification({
          isActive: true,
          message: info.message,
          status: info.status,
        });
        router.refresh();
      })
      .catch((info) => {
        ctx.setNotification({
          isActive: true,
          message: info.message,
          status: info.status,
        });
      });
  };

  return (
    <>
      {isModalOpen && (
        <Modal ref={dialog} modalToggleHandler={modalToggleHandler}>
          <FormWrapper modalCloseHandler={modalToggleHandler}>
            <NewExperienceForm
              modalCloseHandler={modalToggleHandler}
              skills={skills}
              experience={edit.state ? edit.experience : null}
              setEdit={setEdit}
              path={path}
            />
          </FormWrapper>
        </Modal>
      )}
      <div className="">
        <div className="flex justify-end">
          <Nav
            modalToggleHandler={modalToggleHandler}
            openFormButtonName="New Experience"
          />
        </div>
        <div className="flex flex-col">
          <div>
            {experiences?.map((experience, index) => {
              return (
                <ExperienceItem
                  key={index}
                  experience={experience}
                  editHandler={editHandler}
                  deleteHandler={deleteHandler}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
