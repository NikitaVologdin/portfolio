import { IFetchedSkill } from "@/types/Skills";
import Heading from "../Heading";

interface props {
  skill: IFetchedSkill;
}

export default function SkillAbout({ skill }: props) {
  return (
    <div>
      <div
        className={
          "bg-contain bg-right bg-no-repeat h-full h-80 bg-cover bg-gradient-to-l flex justify-center items-center border-b border-[#e1e1e1]"
        }
        style={{
          background: `linear-gradient(90deg, #FFF 0%, #FFF 55%, rgba(255, 255, 255, .6) 130%), no-repeat 110% 45% / 50% url('/stack/${skill.image}')`,
        }}
      >
        <Heading>{skill.name}</Heading>
      </div>
      <div className="mt-5 py-3 font-mono border-b border-[#e1e1e1]">
        <article>{skill.description}</article>
      </div>
    </div>
  );
}
