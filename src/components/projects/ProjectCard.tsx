"use client";

import projectCardType from "../../types/projectCardType";
import linkSvg from "../../../public/icons/link.svg";
import Card from "../ui/Card";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import Stack from "../Stack";

export default function ProjectCard({
  name,
  github,
  start,
  end,
  duration,
  image,
  present,
  color,
  skills,
  description,
}: projectCardType) {
  const days = "";
  return (
    <Card color={color} className="flex-col">
      <div className="pb-5">
        <Image src="no-img.svg" width="40" height="40" alt="project logo" />
      </div>
      <div className="flex justify-between">
        <h5 className="text-xl text-black font-bold tracking-wide">{name}</h5>
        <div className="flex items-center">
          <Link
            href={github}
            target={"_blank"}
            className="p-[4px] border border-light-grey rounded-lg hover:border-[#8e8e8e]"
          >
            <Image alt="github link icon" src={`/${image}`} />
          </Link>
        </div>
      </div>
      <hr className="my-2.5 border-light-grey" />
      <div className="flex justify-between italic">
        {/* <div>{category}</div> */}
        <div>{days}</div>
      </div>
      <div className="mt-5 mb-8 grow">{description}</div>
      <div className="flex justify-between">
        <Button name={start} />
        <Button name={present ? present : end} />
      </div>
      <hr className="my-2.5 border-light-grey" />
      <Stack stack={skills} />
    </Card>
  );
}
