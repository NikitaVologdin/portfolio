import { Projects } from "@/models/projects";
import ProjectAbout from "@/components/projects/ProjectAbout";
import { fetchDataWithPopulate } from "@/lib/utils";
import { IProject } from "@/types/Projects";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default async function page({ params }: { params: { slug: string } }) {
  const project = await fetchDataWithPopulate<IProject>(
    Projects,
    "skills",
    params.slug
  );

  return (
    <div className={"container h-full mx-auto lg:px-24"}>
      <Suspense fallback={<Loading />}>
        <ProjectAbout project={project} />
      </Suspense>
    </div>
  );
}
