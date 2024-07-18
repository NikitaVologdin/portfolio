"use client";
import DateObject from "react-date-object";
import Card from "../ui/Card";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import Stack from "../Stack";
import SquaredButton from "@/components/ui/SquaredButton";
import { IFetchedProject } from "@/types/Projects";

export default function ProjectCard({
  _id,
  name,
  category,
  github,
  start,
  present,
  end,
  image,
  color,
  skills,
  description,
}: IFetchedProject) {
  const startDate = new DateObject(start);
  let endDate;
  const todayDate = new DateObject();
  let duration = todayDate.toUnix() - startDate.toUnix();
  if (!present) {
    endDate = new DateObject(end);
    duration = endDate.toUnix() - startDate.toUnix();
  }
  const daysAmount = Math.floor(duration / 60 / 60 / 24);
  return (
    <Card color={color} className="flex-col">
      <div className="pb-5">
        <Image
          src={`/projects/${image}`}
          width="40"
          height="40"
          alt="project logo"
        />
      </div>
      <div className="flex justify-between">
        <h5 className="text-xl text-black font-bold tracking-wide">{name}</h5>
        <div className="flex items-center">
          <Link href={github} target="_blank">
            <SquaredButton
              backdropText={github}
              className={"p-[5px] rounded-[10px]"}
            >
              <Image
                alt="github link icon"
                src="/icons/link.svg"
                width={15}
                height={15}
              />
            </SquaredButton>
          </Link>
        </div>
      </div>
      <hr className="my-2.5 border-light-grey" />
      <div className="flex justify-between italic">
        <div>{category}</div>
        <div>{daysAmount} days</div>
      </div>
      <div className="mt-5 mb-8 grow">{description}</div>
      <div className="flex justify-between">
        <Button name={`${startDate.month.name} ${startDate.year}`} />
        <Button
          name={present ? "now" : `${endDate?.month.name} ${endDate?.year}`}
        />
      </div>
      <hr className="my-2.5 border-light-grey" />
      <Stack skills={skills} />
    </Card>
  );
}