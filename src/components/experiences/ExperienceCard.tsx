"use client";
import DateObject from "react-date-object";
import Card from "../ui/Card";
import SquaredButton from "../ui/SquaredButton";
import Stack from "../Stack";
import Image from "next/image";
import { IFetchedExperience } from "@/types/Experience";
import { useRouter } from "next/navigation";

interface props extends IFetchedExperience {
  className?: string;
}

export default function ExperienceCard({
  _id,
  name,
  company,
  location,
  image,
  contract,
  start,
  present,
  end,
  description,
  skills,
  className,
  color,
}: props) {
  const startDate = new DateObject(start);
  let endDate;
  const todayDate = new DateObject();
  let duration = todayDate.toUnix() - startDate.toUnix();
  if (!present) {
    endDate = new DateObject(end);
    duration = endDate.toUnix() - startDate.toUnix();
  }
  const daysAmount = Math.floor(duration / 60 / 60 / 24);
  const router = useRouter();
  function clickHandler() {
    return router.push(`/portfolio/experiences/${_id}`);
  }
  return (
    <Card
      color={color}
      className={`w-full flex-col md:flex-row items-stretch ${className}`}
      clickHandler={clickHandler}
    >
      <div className="mb-4 md:mb-0">
        <div className="h-10 w-10 relative">
          <Image
            alt="logo"
            src={`https://res.cloudinary.com/dojvgjueu/image/upload/v1722225586/${image}.svg`}
            width="75"
            height="75"
            className="h-auto w-auto rounded-xl"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 md:ml-6">
        <h5 className="text-xl text-black font-bold tracking-wide">{name}</h5>
        <div className="flex flex-row gap-2">
          <SquaredButton backdropText={`Company: ${company}`}>
            <Image
              src="../icons/town.svg"
              alt="company icon"
              width="14"
              height="14"
              className=""
            />
          </SquaredButton>
          <SquaredButton backdropText={`Location: ${location}`}>
            <Image
              src="../icons/location.svg"
              alt="location icon"
              width="14"
              height="14"
            />
          </SquaredButton>
          <SquaredButton backdropText={`Contract: ${contract}`}>
            <Image
              src="../icons/hour-glasses.svg"
              alt="contract icon"
              width="14"
              height="14"
            />
          </SquaredButton>
        </div>
        <div className="text-[#3e3e3e] text-sm font-extralight">
          {`${startDate.month.name} ${startDate.year} - ${
            present ? "present" : `${endDate?.month.name} ${endDate?.year}`
          } · ${daysAmount} days`}
        </div>
        <div>{description}</div>
        <Stack skills={skills} />
      </div>
    </Card>
  );
}
