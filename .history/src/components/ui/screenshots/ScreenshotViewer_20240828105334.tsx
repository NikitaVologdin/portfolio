import React from "react";
import ClosingFormIcon from "@/components/ui/form/ClosingFormIcon";
import ArrowToLeftSVG from "./ArrowToLeftSVG";
import ArrowToRightSVG from "./ArrowToRightSVG";
import Image from "next/image";

interface props {
  children: React.ReactNode;
  modalToggleHandler: () => void;
  screenshot: File | null;
}

export default function ScreenshotViewer({
  children,
  modalToggleHandler,
  screenshot,
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
          <div className="cursor-pointer">
            <ArrowToLeftSVG
              className={"hover:fill-amber-900 fill-slate-950"}
              height="35px"
              width="35px"
            />
          </div>
          <div className={"grow h-[220px] m-3"}>
            {/* <Image src={screenshot} height="120" width="120" alt="screenshot" /> */}
            <div className="h-[220px] w-full bg-slate-400"></div>
          </div>
          <div>
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
