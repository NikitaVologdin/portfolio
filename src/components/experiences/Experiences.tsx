"use client";
import { IFetchedExperience } from "@/types/Experience";
import ExperienceCard from "./ExperienceCard";
import Image from "next/image";
import { SearchContext } from "@/context/portfolio/SearchContext";
import { useContext, useState, useEffect } from "react";
import filterData from "@/lib/search/filterData";

interface props {
  experiences: IFetchedExperience[];
}

export default function Experiences({ experiences }: props) {
  const [filtered, setFiltered] = useState<IFetchedExperience[]>([]);
  const ctx = useContext(SearchContext);

  useEffect(() => {
    setFiltered(filterData<IFetchedExperience>(ctx.value, experiences));
  }, [ctx.value, experiences]);
  return (
    <div className="flex flex-col items-center relative mt-10 gap-5 md:gap-0">
      <div className="hidden md:block absolute w-px rounded bg-slate-300 top-0 bottom-0 py-12"></div>
      {filtered.map((e, index) => {
        const isEven = index % 2;
        const flexRow = isEven ? "flex-row md:flex-row-reverse" : "flex-row";
        return (
          <div key={index} className={`flex ${flexRow} w-full items-center`}>
            <div className="flex flex-1">
              <ExperienceCard
                _id={e._id}
                name={e.name}
                company={e.company}
                location={e.location}
                contract={e.contract}
                image={e.image}
                duration={e.duration}
                start={e.start}
                present={e.present}
                end={e.end}
                preview={e.preview}
                description={e.description}
                skills={e.skills}
                color={e.color}
              />
            </div>
            <div className="hidden md:block p-3.5 mx-2 inline bg-white z-10 dark:bg-[#121212]">
              <Image
                src="../icons/bullet.svg"
                alt=""
                width="16"
                height="16"
                className={"dark:invert"}
              />
            </div>
            <div className="hidden md:block flex flex-1"></div>
          </div>
        );
      })}
    </div>
  );
}
