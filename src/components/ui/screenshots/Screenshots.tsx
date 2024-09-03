"use client";

import { useState, useEffect, useRef, SyntheticEvent } from "react";
import Modal from "@/components/ui/Modal";
import ScreenshotViewer from "@/components/ui/screenshots/ScreenshotViewer";
import Image from "next/image";

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
        <Modal
          modalToggleHandler={modalToggleHandler}
          ref={dialog}
          width="w-11/12 md:w-9/12 lg:w-7/12"
        >
          <ScreenshotViewer
            modalToggleHandler={modalToggleHandler}
            screenshot={screenshot}
            previousScreenshot={previousScreenshot}
            nextScreenshot={nextScreenshot}
          />
        </Modal>
      )}
      <div
        className={
          "mt-3 flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-4 lg:grid-cols-4"
        }
      >
        {screenshots.map((item, index) => {
          return (
            <div
              key={index}
              data-attribute={index}
              className={"border rounded p-1 cursor-pointer relative h-36"}
              onClick={showScreenshot}
            >
              <Image
                src={`https://res.cloudinary.com/dojvgjueu/image/upload/v1722225586/${item}.jpg`}
                alt="screenshot"
                fill
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
