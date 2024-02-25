import experienceCardType from "../../types/experienceCardType";
import ExperienceCard from "./ExperienceCard";
import Image from "next/image";
import technologies from "../../data/technologies";

const data: experienceCardType[] = [
  {
    position: "Open source developer",
    company: "Self-employed",
    location: "Latvia",
    contract: "Self-employed",
    description: "Creating awesome tools for developers",
    stack: technologies.stack,
    color: "#fafaf9",
  },
  {
    position: "Open source developer",
    company: "Self-employed",
    location: "Latvia",
    contract: "Self-employed",
    description: "Creating awesome tools for developers",
    stack: technologies.stack,
    color: "#fffbeb",
  },
  {
    position: "Open source developer",
    company: "Self-employed",
    location: "Latvia",
    contract: "Self-employed",
    description: "Creating awesome tools for developers",
    stack: technologies.stack,
    color: "#ecfeff",
  },
];

export default function Experiences() {
  return (
    <div className="flex flex-col items-center relative mt-10 gap-5 md:gap-0 ">
      <div className="hidden md:block absolute w-px rounded bg-slate-300 top-0 bottom-0 py-12"></div>
      {data.map((e, index) => {
        const isEven = index % 2;
        const flexRow = isEven ? "flex-row md:flex-row-reverse" : "flex-row";
        return (
          <div key={index} className={`flex ${flexRow} w-full items-center`}>
            <div className="flex flex-1">
              <ExperienceCard
                company={e.company}
                location={e.location}
                contract={e.contract}
                position={e.position}
                description={e.description}
                stack={e.stack}
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
