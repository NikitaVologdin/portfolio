import { IFetchedProject } from "@/types/Projects";
import Heading from "../Heading";
import ButtonLink from "@/components/ui/about/ButtonLink";
import Background from "@/components/ui/about/Background";
import Image from "next/image";
import Container from "@/components/Container";

interface props {
  project: IFetchedProject;
}

export default function ProjectAbout({ project }: props) {
  return (
    <div className="">
      <Background path={`/projects/${project.image}`}>
        <div className="py-5 flex flex-col justify-center items-center">
          <Heading>{project.name}</Heading>
          <h5 className="pt-3 pb-2">{project.category}</h5>
          <div className="w-9/12 h-px bg-slate-200 my-3 rounded"></div>
          <ButtonLink link={project.github} target="_blank">
            <div className="flex gap-2 items-center">
              <div className="h-3 w-3">
                <Image
                  src="/icons/link.svg"
                  height={0}
                  width={0}
                  alt="github logo"
                  className="h-auto w-auto my-auto"
                />
              </div>
              <span className="text-xs">GitHub</span>
            </div>
          </ButtonLink>
          <div className="flex gap-2 flex-wrap mt-3 justify-center">
            {project.skills.map((s, index) => {
              return (
                <ButtonLink link={`/skills/${s._id}`} target="" key={index}>
                  <div className="flex gap-2 items-center">
                    <div className="h-3 w-3">
                      <Image
                        src={`/stack/${s.image}`}
                        height={0}
                        width={0}
                        alt={`${s.name} logo`}
                        className="h-auto w-auto my-auto"
                      />
                    </div>
                    <span className="text-xs">{s.name}</span>
                  </div>
                </ButtonLink>
              );
            })}
          </div>
        </div>
      </Background>
      <div className="mt-5 py-3 font-mono border-b border-[#e1e1e1]">
        <Container>
          <article>{project.description}</article>
        </Container>
      </div>
    </div>
  );
}
