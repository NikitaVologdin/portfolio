"use client";
import EducationCard from "../education/EducationCard";
import Image from "next/image";
import { IFetchedEducation } from "@/types/Education";
import { SearchContext } from "@/context/portfolio/SearchContext";
import { useContext, useState, useEffect } from "react";
import filterData from "@/lib/search/filterData";

interface props {
  education: IFetchedEducation[];
}

export default function Education({ education }: props) {
  const [filtered, setFiltered] = useState<IFetchedEducation[]>([]);
  const ctx = useContext(SearchContext);

  useEffect(() => {
    setFiltered(filterData<IFetchedEducation>(ctx.value, education));
  }, [ctx.value, education]);

  return (
    <div className="flex flex-col items-center relative mt-10 gap-5 md:gap-0">
      <div className="hidden md:block absolute w-px rounded bg-slate-300 top-0 bottom-0 py-12"></div>
      {filtered.map((e, index) => {
        const isEven = index % 2;
        const flexRow = isEven ? "flex-row md:flex-row-reverse" : "flex-row";
        return (
          <div key={index} className={`flex ${flexRow} w-full items-center`}>
            <div className="flex flex-1">
              <EducationCard
                _id={e._id}
                name={e.name}
                university={e.university}
                location={e.location}
                start={e.start}
                present={e.present}
                end={e.end}
                duration={e.duration}
                image={e.image}
                skills={e.skills}
                description={e.description}
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
