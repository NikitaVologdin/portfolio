import React from "react";
import ClosingFormIcon from "@/components/ui/form/ClosingFormIcon";
import left from "@/../public/arrows/left.svg";
import ArrowToLeftSVG from "./ArrowToLeftSVG";
import right from "@/../public/arrows/right.svg";
import Image from "next/image";

interface props {
  children: React.ReactNode;
  modalToggleHandler: () => void;
}

export default function ScreenshotViewer({
  children,
  modalToggleHandler,
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
            <ArrowToLeftSVG className={"hover:fill-amber-900 fill-slate-950"} />
          </div>
          <div className={"grow h-[180px]"}>screen</div>
          <div>
            <Image src={right} alt={"to left"} height={36} width={36} />
          </div>
        </div>
      </div>
    </div>
  );
}
