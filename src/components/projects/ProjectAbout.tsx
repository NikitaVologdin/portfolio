import { IFetchedProject } from "@/types/Projects";
import Heading from "../Heading";
import Button from "../ui/Button";
import Link from "next/link";

interface props {
  project: IFetchedProject;
}

export default function SkillAbout({ project }: props) {
  return (
    <div>
      <div
        className={
          "bg-contain bg-right bg-no-repeat h-full h-80 bg-cover bg-gradient-to-l flex flex-col justify-center items-center border-b border-[#e1e1e1]"
        }
        style={{
          background: `linear-gradient(90deg, #FFF 0%, #FFF 55%, rgba(255, 255, 255, .6) 130%), no-repeat 110% 45% / 50% url('/projects/${project.image}')`,
        }}
      >
        <Heading>{project.name}</Heading>
        <h5 className="pt-3 pb-2">{project.category}</h5>
        <div className="w-9/12 h-px bg-slate-200 my-3 rounded"></div>
        <Button name="GitHub" link={project.github} target="_blank" />
      </div>
      <div className="mt-5 py-3 font-mono border-b border-[#e1e1e1]">
        <article>{project.description}</article>
      </div>
    </div>
  );
}
