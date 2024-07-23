import { Projects } from "@/models/projects";
import ProjectAbout from "@/components/projects/ProjectAbout";
import { fetchDataWithPopulate } from "@/lib/utils";
import { IProject } from "@/types/Projects";
import Loading from "@/components/ui/Loading";

export default async function page({ params }: { params: { slug: string } }) {
  const project = await fetchDataWithPopulate<IProject>(
    Projects,
    "skills",
    params.slug
  );

  return (
    <div className={"container h-full mx-auto lg:px-24"}>
      {project ? (
        <ProjectAbout project={project} />
      ) : (
        <div className="absolute top-0 bottom-0 right-0 left-0 h-full flex justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
}
