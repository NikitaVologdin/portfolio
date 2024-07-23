import { Projects as ProjectsModel } from "@/models/projects";
import Heading from "../../../components/Heading";
import Search from "../../../components/ui/form/Search";
import Projects from "../../../components/projects/Projects";
import Container from "../../../components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import { IProject } from "@/types/Projects";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default async function page() {
  const projects = await fetchDataWithPopulate<IProject>(
    ProjectsModel,
    "skills"
  );

  return (
    <>
      <div className="mt-10">
        <Heading>Skills</Heading>
      </div>
      <Container className="h-dvh my-auto">
        <Suspense fallback={<Loading />}>
          <Search />
          <Projects projects={projects.reverse()} />
        </Suspense>
      </Container>
    </>
  );
}
