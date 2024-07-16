import { IFetchedExperience } from "@/types/Experience";
import ExperienceCard from "./ExperienceCard";
import Image from "next/image";

interface props {
  experiences: IFetchedExperience[];
}

export default function Experiences({ experiences }: props) {
  return (
    <div className="flex flex-col items-center relative mt-10 gap-5 md:gap-0 ">
      <div className="hidden md:block absolute w-px rounded bg-slate-300 top-0 bottom-0 py-12"></div>
      {experiences.map((e, index) => {
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
                description={e.description}
                skills={e.skills}
                color={e.color}
              />
            </div>
            <div className="hidden md:block p-3.5 mx-2 inline bg-white z-10">
              <Image src="bullet.svg" alt="" width="16" height="16" />
            </div>
            <div className="hidden md:block flex flex-1"></div>
          </div>
        );
      })}
    </div>
  );
}
