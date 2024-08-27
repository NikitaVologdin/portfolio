import React from "react";
import ClosingFormIcon from "@/components/ui/form/ClosingFormIcon";

interface props {
  children: React.ReactNode;
}

export default function ScreenShotsWrapper({ children }: props) {
  return (
    <div className={"flex flex-col "}>
      <div className={"flex justify-end shrink"}>
        <ClosingFormIcon className={"fill-indigo-900 hover:fill-red-600"} />
      </div>
      <div className={"grow"}></div>
    </div>
  );
}
