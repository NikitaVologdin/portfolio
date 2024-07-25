"use client";
import { useState, useRef, useEffect, useContext } from "react";
import Nav from "../AdminPageNav";
import Modal from "@/components/ui/Modal";
import FormWrapper from "@/components/ui/form/FormWrapper";
import NewProjectForm from "./NewProjectForm";
import { IFetchedProject } from "@/types/Projects";
import ProjectItem from "./ProjectItem";
import { IFetchedSkill } from "@/types/Skills";
import { deleteData, fetchDataOnClient } from "@/lib/utils";
import { NotificationContext } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";

interface props {
  projects: IFetchedProject[];
  skills: IFetchedSkill[];
  path: string;
}

export interface IEditState {
  state: boolean;
  project?: IFetchedProject;
}

export default function Projects({ projects, skills, path }: props) {
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
    const project = await fetchDataOnClient("projects", path, id);
    setEdit({ state: true, project });
  };

  const deleteHandler = async (id: string) => {
    const response = await deleteData("projects", path, id);
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
            <NewProjectForm
              modalCloseHandler={modalToggleHandler}
              skills={skills}
              project={edit.state ? edit.project : null}
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
            openFormButtonName="New Propject"
          />
        </div>
        <div className="flex flex-col">
          <div>
            {projects.map((project, index) => {
              return (
                <ProjectItem
                  key={index}
                  project={project}
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
