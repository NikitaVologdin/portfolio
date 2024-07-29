import { IFetchedExperience } from "@/types/Experience";
import Heading from "../Heading";
import ButtonLink from "@/components/ui/about/ButtonLink";
import Background from "@/components/ui/about/Background";
import Image from "next/image";
import Container from "@/components/Container";
import { CldImage } from "next-cloudinary";

interface props {
  experience: IFetchedExperience;
}

export default function ProjectAbout({ experience }: props) {
  return (
    <div className="about">
      <Background path={`/projects/${experience.image}`}>
        <div className="h-full flex flex-col justify-center items-center py-5">
          <Heading>{experience.name}</Heading>
          <p className="pt-3 pb-2 text-sm">
            {experience.company} · {experience.location} ·{" "}
            {"Software Development"}
          </p>
          <div className="w-9/12 h-px bg-slate-200 my-3 rounded"></div>
          <div className="flex gap-2 flex-wrap mt-3 justify-center">
            {experience.skills.map((e, index) => {
              return (
                <ButtonLink link={`/skills/${e._id}`} target="" key={index}>
                  <div className="flex gap-2 items-center">
                    <div className="h-3 w-3">
                      <CldImage
                        src={e.image}
                        height={0}
                        width={0}
                        alt={`${e.name} logo`}
                        className="h-auto w-auto my-auto"
                      />
                    </div>
                    <span className="text-xs">{e.name}</span>
                  </div>
                </ButtonLink>
              );
            })}
          </div>
        </div>
      </Background>
      <div className="mt-5 py-3 font-mono border-b border-[#e1e1e1]">
        <Container>
          <article>{experience.description}</article>
        </Container>
      </div>
    </div>
  );
}
