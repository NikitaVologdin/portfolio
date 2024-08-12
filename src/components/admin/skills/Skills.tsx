"use client";
import { useState, useRef, useEffect, useContext } from "react";
import Nav from "../AdminPageNav";
import Modal from "../../ui/Modal";
import FormWrapper from "../../../components/ui/form/FormWrapper";
import NewSkillForm from "../skills/NewSkillForm";
import SkillsGroup from "./SkillsGroup";
import SkillItem from "./SkillItem";
import { fetchDataOnClient, deleteData } from "@/lib/utils";
import { NotificationContext } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";
import { IFetchedSkill, IFetchedSkillsGroup } from "@/types/Skills";

interface props {
  groups: IFetchedSkillsGroup[];
  path: string;
}

export interface IEditState {
  state: boolean;
  skill?: IFetchedSkill;
}

export default function Skills({ groups, path }: props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState<IEditState>({ state: false });
  const dialog = useRef<HTMLDialogElement>(null);
  const ctx = useContext(NotificationContext);
  const router = useRouter();

  const modalToggleHandler = () => {
    setModalOpen(!isModalOpen);
    setEdit({ state: false });
  };

  const editSkillHandler = async (skillId: string) => {
    modalToggleHandler();
    const skill = await fetchDataOnClient("skills", path, skillId);
    setEdit({ state: true, skill });
  };

  const deleteSkillHandler = async (skillId: string) => {
    const response = await deleteData("skills", path, skillId);
    response
      ?.json()
      .then((info) => {
        router.refresh();
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
    <div className="skills">
      <div className="flex justify-end">
        {isModalOpen && (
          <Modal ref={dialog} modalToggleHandler={modalToggleHandler}>
            <FormWrapper modalCloseHandler={modalToggleHandler}>
              <NewSkillForm
                modalCloseHandler={modalToggleHandler}
                groups={groups}
                skill={edit.state ? edit.skill : null}
                setEdit={setEdit}
                path={path}
              />
            </FormWrapper>
          </Modal>
        )}
        <Nav
          modalToggleHandler={modalToggleHandler}
          openFormButtonName="New Skill"
        />
      </div>
      <div className="flex flex-col">
        {groups.map((group: IFetchedSkillsGroup, index) => {
          return (
            <SkillsGroup name={group.name} key={index}>
              {group.skills.map((skill, index) => {
                const last = group.skills.length === index + 1;
                return (
                  <SkillItem
                    key={index}
                    skill={skill}
                    last={last}
                    editSkillHandler={editSkillHandler}
                    deleteSkillHandler={deleteSkillHandler}
                  />
                );
              })}
            </SkillsGroup>
          );
        })}
      </div>
    </div>
  );
}
