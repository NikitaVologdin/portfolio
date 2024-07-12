"use client";

import educationCardType from "../../types/educationCardType";
import Card from "../ui/Card";
import Image from "next/image";
import Button from "../ui/Button";

interface props extends educationCardType {
  className?: string;
}

export default function EducationCard({
  course,
  university,
  location,
  duration,
  skills,
  className = "",
  color = "#f1f5f9",
}: props) {
  return (
    <Card
      color={color}
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
        <h5 className="text-xl text-black tracking-wide">{course}</h5>
        <h6 className="text-base">{university}</h6>
        <p className="text-[#3e3e3e] font-extralight text-sm mb-2">
          <span className="capitalize">{location}</span>
          <span> · </span>
          <span>{duration}</span>
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
