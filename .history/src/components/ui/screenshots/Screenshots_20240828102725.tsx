"use client";
import { useState, useEffect, useRef, SyntheticEvent } from "react";
import Modal from "@/components/ui/Modal";
import ScreenshotViewer from "@/components/ui/screenshots/ScreenshotViewer";

interface props {
  screenshots?: Array<File>;
}

const data = [
  "screenshot1",
  "screenshot2",
  "screenshot3",
  "screenshot4",
  "screenshot5",
  "screenshot6",
  "screenshot7",
  "screenshot8",
  "screenshot9",
  "screenshot10",
  "screenshot11",
  "screenshot12",
];

export default function Screenshots({}: props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screenshot, setScreenshot] = useState<null | File>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  function modalToggleHandler() {
    setIsModalOpen(!isModalOpen);
  }

  function showScreenshot(event: SyntheticEvent<HTMLDivElement, MouseEvent>) {
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
          <ScreenshotViewer modalToggleHandler={modalToggleHandler}>
            <h3>Hi!</h3>
          </ScreenshotViewer>
        </Modal>
      )}
      <div className={"mt-3 grid grid-cols-4 gap-4"}>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              data-attribute={index}
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
