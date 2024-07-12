"use client";

import technologyType from "../../types/technologyType";
import Card from "../ui/Card";
import SquaredButton from "../ui/SquaredButton";
import Stack from "../Stack";
import Image from "next/image";

interface props {
  company: string;
  location: string;
  contract: string;
  position: string;
  description: string;
  stack: technologyType[];
  className?: string;
  color?: string;
}

export default function ExperienceCard({
  company,
  location,
  contract,
  position,
  description,
  stack,
  className,
  color = "#f1f5f9",
}: props) {
  return (
    <Card
      color={color}
      className={`w-full flex-col md:flex-row items-stretch ${className}`}
    >
      <div className="mb-4 md:mb-0">
        <Image
          alt="logo"
          src={"no-img.svg"}
          width="75"
          height="75"
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-3 md:ml-6">
        <h5 className="text-xl text-black font-bold tracking-wide">
          {position}
        </h5>
        <div className="flex flex-row gap-2">
          <SquaredButton backdropText={`Company: ${company}`}>
            <Image
              src="icons/town.svg"
              alt="company icon"
              width="14"
              height="14"
              className=""
            />
          </SquaredButton>
          <SquaredButton backdropText={`Location: ${location}`}>
            <Image
              src="icons/location.svg"
              alt="location icon"
              width="14"
              height="14"
            />
          </SquaredButton>
          <SquaredButton backdropText={`Contract: ${contract}`}>
            <Image
              src="icons/hour-glasses.svg"
              alt="contract icon"
              width="14"
              height="14"
            />
          </SquaredButton>
        </div>
        <div className="text-[#3e3e3e] text-sm font-extralight">
          February 2024 - Present · 2 days
        </div>
        <div className="text-base">{description}</div>
        <Stack stack={stack} />
      </div>
    </Card>
  );
}
