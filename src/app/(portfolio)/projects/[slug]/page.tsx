import { Projects } from "@/models/projects";
import ProjectAbout from "@/components/projects/ProjectAbout";
import { fetchDataWithPopulate } from "@/lib/utils";
import { IProject } from "@/types/Projects";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function page({ params }: { params: { slug: string } }) {
  async function Component() {
    const project = await fetchDataWithPopulate<IProject>(
      Projects,
      "skills",
      params.slug
    );
    return <ProjectAbout project={project} />;
  }

  return (
    <div className={"container h-full mx-auto lg:px-24"}>
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </div>
  );
}
