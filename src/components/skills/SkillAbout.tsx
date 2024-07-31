import { IFetchedSkill } from "@/types/Skills";
import Heading from "../Heading";
import Background from "@/components/ui/about/Background";
import Container from "@/components/Container";

interface props {
  skill: IFetchedSkill;
}

export default function SkillAbout({ skill }: props) {
  return (
    <div className="about">
      <Background
        path={`https://res.cloudinary.com/dojvgjueu/image/upload/v1722225586/${skill.image}.svg`}
      >
        <div className="h-full flex flex-col justify-center items-center py-5">
          <Heading>{skill.name}</Heading>
          <div className="w-9/12 h-px bg-slate-200 my-3 rounded"></div>
        </div>
      </Background>
      <div className="mt-5 py-3 font-mono border-b border-[#e1e1e1]">
        <Container>
          <article>{skill.description}</article>
        </Container>
      </div>
    </div>
  );
}
