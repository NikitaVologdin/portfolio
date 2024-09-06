"use client";
import React from "react";
import ClosingFormIcon from "@/components/ui/form/ClosingFormIcon";
import ArrowToLeftSVG from "./ToLeftSVG";
import ArrowToRightSVG from "./ToRightSVG";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

interface props {
  modalToggleHandler: () => void;
  screenshot: string | null;
  switchSlide: (direction: number) => void;
  direction: number;
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export default function ScreenshotViewer({
  modalToggleHandler,
  screenshot,
  switchSlide,
  direction,
}: props) {
  return (
    <div className={"flex flex-col grow"}>
      <div className={"flex justify-end shrink"}>
        <button onClick={modalToggleHandler} className="cursor-pointer">
          <ClosingFormIcon className={"fill-indigo-900 hover:fill-red-600"} />
        </button>
      </div>
      <div className={"grow"}>
        <div className={"h-full flex grow items-center justify-between"}>
          <div
            className="cursor-pointer"
            onClick={() => {
              switchSlide(-1);
            }}
          >
            <ArrowToLeftSVG
              className={"hover:fill-amber-900 fill-slate-950"}
              height="35px"
              width="35px"
            />
          </div>
          <motion.div className={"grow h-[320px] md:m-4 md:mb-10 relative"}>
            <motion.img
              src={`https://res.cloudinary.com/dojvgjueu/image/upload/v1722225586/${screenshot}.jpg`}
              key={screenshot}
              alt="screenshot"
              custom={direction}
              variants={variants}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              initial="enter"
              animate="center"
              exit="exit"
            />
          </motion.div>
          <div className="cursor-pointer" onClick={() => switchSlide(1)}>
            <ArrowToRightSVG
              className={"hover:fill-amber-900 fill-slate-950"}
              height="35px"
              width="35px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
