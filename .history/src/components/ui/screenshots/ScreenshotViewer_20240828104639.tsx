import React from "react";
import ClosingFormIcon from "@/components/ui/form/ClosingFormIcon";
import ArrowToLeftSVG from "./ArrowToLeftSVG";
import ArrowToRightSVG from "./ArrowToRightSVG";

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
          <div className={"grow h-[180px]"}>screen</div>
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
