import { IFetchedSkill } from "@/types/Skills";
import Heading from "../Heading";
import Background from "@/components/ui/about/Background";
import Container from "@/components/Container";
import createMarkup from "@/lib/createMarkup";

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
          <Heading style={"dark:text-black"}>{skill.name}</Heading>
          <div className="w-9/12 h-px bg-slate-200 my-3 rounded dark:bg-slate-900"></div>
        </div>
      </Background>
      <div className="mt-5 py-3 font-mono border-b border-[#e1e1e1]">
        <Container>
          <article
            className="dark:text-gray-200"
            dangerouslySetInnerHTML={createMarkup(skill.description)}
          ></article>
        </Container>
      </div>
    </div>
  );
}
