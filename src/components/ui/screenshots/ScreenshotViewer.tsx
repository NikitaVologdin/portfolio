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
  nextScreenshot: () => void;
  previousScreenshot: () => void;
}

export default function ScreenshotViewer({
  modalToggleHandler,
  screenshot,
  previousScreenshot,
  nextScreenshot,
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
          <div className="cursor-pointer" onClick={previousScreenshot}>
            <ArrowToLeftSVG
              className={"hover:fill-amber-900 fill-slate-950"}
              height="35px"
              width="35px"
            />
          </div>
          <motion.div
            className={"grow h-[320px] md:m-4 md:mb-10 relative"}
            // initial={{ x: 100 }}
            // animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={`https://res.cloudinary.com/dojvgjueu/image/upload/v1722225586/${screenshot}.jpg`}
              key={screenshot}
              alt="screenshot"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
          <div className="cursor-pointer" onClick={nextScreenshot}>
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
