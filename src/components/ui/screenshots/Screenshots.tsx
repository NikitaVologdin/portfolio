"use client";
import { useState, useEffect, useRef } from "react";
import Modal from "@/components/ui/Modal";
import ScreenShotsWrapper from "@/components/ui/screenshots/ScreenShotsWrapper";

interface props {
  screenshots?: Array<File>;
}

const data = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
];

export default function Screenshots({}: props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  function modalToggleHandler() {
    setIsModalOpen(!isModalOpen);
  }

  function showScreenshot() {
    console.log(isModalOpen);
    modalToggleHandler();
  }

  useEffect(() => {
    if (isModalOpen && dialog.current) {
      dialog.current.showModal();
    }
    if (!isModalOpen && dialog.current) {
      dialog.current.close();
    }
  }, [isModalOpen, setIsModalOpen]);

  return (
    <div className="screenshots flex flex-col mt-5">
      <h5 className={"dark:invert py-3 font-semibold"}>Screenshots:</h5>
      {isModalOpen && (
        <Modal modalToggleHandler={modalToggleHandler} ref={dialog}>
          <ScreenShotsWrapper>
            <h3>Hi!</h3>
          </ScreenShotsWrapper>
        </Modal>
      )}
      <div className={"mt-3 grid grid-cols-4 gap-4"}>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className={"border rounded p-1 cursor-pointer"}
              onClick={showScreenshot}
            >
              item.data
            </div>
          );
        })}
      </div>
    </div>
  );
}
