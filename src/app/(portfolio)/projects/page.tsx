import { Projects as ProjectsModel } from "@/models/projects";
import Heading from "../../../components/Heading";
import Search from "../../../components/ui/form/Search";
import Projects from "../../../components/projects/Projects";
import Container from "../../../components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import { IProject } from "@/types/Projects";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function page() {
  async function Component() {
    const projects = await fetchDataWithPopulate<IProject>(
      ProjectsModel,
      "skills"
    );

    return (
      <>
        <Search />
        <Projects projects={projects.reverse()} />
      </>
    );
  }

  return (
    <>
      <div className="mt-10">
        <Heading>Skills</Heading>
      </div>
      <Container className="h-dvh my-auto">
        <Suspense fallback={<Loading />}>
          <Component />
        </Suspense>
      </Container>
    </>
  );
}
