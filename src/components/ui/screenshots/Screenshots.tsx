"use client";
import { useState, useEffect, useRef, SyntheticEvent } from "react";
import Modal from "@/components/ui/Modal";
import ScreenshotViewer from "@/components/ui/screenshots/ScreenshotViewer";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

interface props {
  screenshots: Array<string>;
}

export default function Screenshots({ screenshots }: props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [[index, direction], setIndex] = useState([0, 0]);
  const dialog = useRef<HTMLDialogElement>(null);

  function modalToggleHandler() {
    setIsModalOpen(!isModalOpen);
  }

  function showScreenshot(event: SyntheticEvent<HTMLDivElement, MouseEvent>) {
    const target = event.currentTarget.dataset.attribute;
    if (target) {
      setIndex([+target, 1]);
    }
    modalToggleHandler();
  }

  function switchSlide(newDirection: number) {
    setIndex([index + newDirection, newDirection]);
  }

  useEffect(() => {
    if (index < 0) {
      setIndex([screenshots.length - 1, direction]);
    }

    if (index > screenshots.length - 1) {
      setIndex([0, direction]);
    }
  }, [index, screenshots.length, direction]);

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
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            modalToggleHandler={modalToggleHandler}
            ref={dialog}
            width="w-11/12 md:w-9/12 lg:w-7/12"
          >
            <ScreenshotViewer
              modalToggleHandler={modalToggleHandler}
              screenshot={screenshots[index]}
              switchSlide={switchSlide}
              direction={direction}
            />
          </Modal>
        )}
      </AnimatePresence>
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
