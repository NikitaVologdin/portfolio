"use client";
import DateObject from "react-date-object";
import Card from "../ui/Card";
import Image from "next/image";
import Button from "../ui/Button";
import { IFetchedEducation } from "@/types/Education";

interface props extends IFetchedEducation {
  className?: "string";
}

export default function EducationCard({
  name,
  university,
  location,
  start,
  present,
  end,
  skills,
  description,
  className,
}: props) {
  const startDate = new DateObject(start);
  let endDate;
  const todayDate = new DateObject();
  let duration = todayDate.toUnix() - startDate.toUnix();
  if (!present) {
    endDate = new DateObject(end);
    duration = endDate.toUnix() - startDate.toUnix();
  }
  const monthAmount = Math.floor(duration / 60 / 60 / 24 / 30);
  return (
    <Card
      color={"#ffffff"}
      className={`flex-col w-full items-stretch ${className}`}
    >
      <div className="">
        <Image
          alt="logo"
          src={"no-img.svg"}
          width="50"
          height="50"
          className=""
        />
      </div>
      <div className="flex flex-col gap-3 mt-6">
        <h5 className="text-xl text-black tracking-wide font-medium">{name}</h5>
        <div>{description}</div>
        <h6 className="text-base">{university}</h6>
        <p className="text-[#3e3e3e] font-extralight text-sm mb-2">
          <span className="capitalize">{location}</span>
          <span> · </span>
          <span>{`${startDate.month.name} ${startDate.year}`}</span>
          <span> · </span>
          <span>{present ? "present" : `${monthAmount} month`}</span>
        </p>
        <div className="flex flex-row gap-2 flex-wrap">
          {skills.map((s, index) => {
            return <Button key={index} name={s.name} />;
          })}
        </div>
      </div>
    </Card>
  );
}
