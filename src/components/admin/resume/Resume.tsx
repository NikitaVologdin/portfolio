"use client";
import { useState, useRef, useEffect, useContext } from "react";
import Nav from "../AdminPageNav";
import Modal from "@/components/ui/Modal";
import FormWrapper from "@/components/ui/form/FormWrapper";
import NewResumeForm from "./NewResumeForm";
import { IFetchedResume } from "@/types/Resume";
import ResumeItem from "./ResumeItem";
import { deleteData, fetchDataOnClient } from "@/lib/utils";
import { NotificationContext } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";

interface props {
  resume: IFetchedResume[];
  path: string;
}

export interface IEditState {
  state: boolean;
  resume?: IFetchedResume;
}

export default function Resume({ resume, path }: props) {
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
    const resume = await fetchDataOnClient("resume", path, id);
    setEdit({ state: true, resume });
  };

  const deleteHandler = async (id: string) => {
    const response = await deleteData("resume", path, id);
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
            <NewResumeForm
              modalCloseHandler={modalToggleHandler}
              resume={edit.state ? edit.resume : null}
              setEdit={setEdit}
              path={path}
            />
          </FormWrapper>
        </Modal>
      )}
      <div className="">
        <div className="py-8 flex justify-end">
          <Nav
            modalToggleHandler={modalToggleHandler}
            openFormButtonName="New Resume"
          />
        </div>
        <div className="flex flex-col">
          <div>
            {resume.map((resume, index) => {
              return (
                <ResumeItem
                  key={index}
                  resume={resume}
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
