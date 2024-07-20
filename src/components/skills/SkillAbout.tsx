import { IFetchedSkill } from "@/types/Skills";
import Heading from "../Heading";
import Background from "@/components/ui/about/Background";

interface props {
  skill: IFetchedSkill;
}

export default function SkillAbout({ skill }: props) {
  return (
    <div>
      <Background path={`/stack/${skill.image}`}>
        <div className="py-5 flex flex-col justify-center items-center">
          <Heading>{skill.name}</Heading>
        </div>
      </Background>
      <div className="mt-5 py-3 font-mono border-b border-[#e1e1e1]">
        <article>{skill.description}</article>
      </div>
    </div>
  );
}
