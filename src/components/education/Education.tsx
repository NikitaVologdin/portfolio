import educationCardType from "../../types/educationCardType";
import EducationCard from "../education/EducationCard";
import Image from "next/image";
import skills from "../../data/skills";

const data: educationCardType[] = [
  {
    course: "Bachelor degree of Computer Science",
    university: "ISTIC",
    location: "Latvia",
    duration: "2 years",
    skills: skills,
    color: "#fafaf9",
  },
  {
    course: "Bachelor degree of Computer Science",
    university: "ISTIC",
    location: "Latvia",
    duration: "2 years",
    skills: skills,
    color: "#fafaf9",
  },
];

export default function Education() {
  return (
    <div className="flex flex-col items-center relative mt-10 gap-5 md:gap-0">
      <div className="hidden md:block absolute w-px rounded bg-slate-300 top-0 bottom-0 py-12"></div>
      {data.map((e, index) => {
        const isEven = index % 2;
        const flexRow = isEven ? "flex-row md:flex-row-reverse" : "flex-row";
        return (
          <div key={index} className={`flex ${flexRow} w-full items-center`}>
            <div className="flex flex-1">
              <EducationCard
                course={e.course}
                university={e.university}
                location={e.location}
                duration={e.duration}
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
