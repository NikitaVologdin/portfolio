import { Projects as ProjectsModel } from "@/models/projects";
import Heading from "@/components/Heading";
import Search from "@/components/ui/form/Search";
import Projects from "@/components/projects/Projects";
import Container from "@/components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import { IProject } from "@/types/Projects";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import SearchContextProvider from "@/context/portfolio/SearchContext";

export default async function page() {
  const cachedProjects = unstable_cache(
    async () => {
      return fetchDataWithPopulate<IProject>(ProjectsModel, "skills");
    },
    ["portfolio-projects"],
    { tags: ["projects"] },
  );
  const projects = await cachedProjects();

  return (
    <>
      <div className="mt-10">
        <Heading style={"dark:invert"}>Projects</Heading>
      </div>
      <Container className="h-dvh my-auto">
        <SearchContextProvider>
          <Search />
          <Suspense fallback={<Loading />}>
            <Projects projects={projects.reverse()} />
          </Suspense>
        </SearchContextProvider>
      </Container>
    </>
  );
}
