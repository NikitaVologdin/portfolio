import { Projects } from "@/models/projects";
import ProjectAbout from "@/components/projects/ProjectAbout";
import { fetchDataWithPopulate } from "@/lib/utils";
import { IProject } from "@/types/Projects";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";

export default async function page({ params }: { params: { slug: string } }) {
  const cachedProjects = unstable_cache(
    async () => {
      return fetchDataWithPopulate<IProject>(Projects, "skills", params.slug);
    },
    ["my-app-projects"],
    {
      tags: ["projects"],
    }
  );
  const project = await cachedProjects();

  return (
    <div className={"container h-full mx-auto lg:px-24"}>
      <Suspense fallback={<Loading />}>
        <ProjectAbout project={project} />
      </Suspense>
    </div>
  );
}
