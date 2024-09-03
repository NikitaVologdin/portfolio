"use client";
import { useState, useEffect, useRef, SyntheticEvent } from "react";
import Modal from "@/components/ui/Modal";
import ScreenshotViewer from "@/components/ui/screenshots/ScreenshotViewer";

interface props {
  screenshots: Array<string>;
}

export default function Screenshots({ screenshots }: props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screenshot, setScreenshot] = useState<null | string>(null);
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);

  function modalToggleHandler() {
    setIsModalOpen(!isModalOpen);
  }

  function showScreenshot(event: SyntheticEvent<HTMLDivElement, MouseEvent>) {
    const index = event.currentTarget.dataset.attribute;
    if (index) {
      setIndex(+index);
      setScreenshot(screenshots[+index]);
    }
    modalToggleHandler();
  }

  function previousScreenshot() {
    setIndex((prev) => {
      const newIndex = prev - 1;
      if (newIndex < 0) {
        return screenshots.length - 1;
      }
      return newIndex;
    });
  }

  function nextScreenshot() {
    setIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex > screenshots.length - 1) {
        return 0;
      }
      return newIndex;
    });
  }

  useEffect(() => {
    setScreenshot(screenshots[index]);
  }, [index, screenshots]);

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
          <ScreenshotViewer
            modalToggleHandler={modalToggleHandler}
            screenshot={screenshot}
            previousScreenshot={previousScreenshot}
            nextScreenshot={nextScreenshot}
          />
        </Modal>
      )}
      <div className={"mt-3 grid grid-cols-4 gap-4"}>
        {screenshots.map((item, index) => {
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
