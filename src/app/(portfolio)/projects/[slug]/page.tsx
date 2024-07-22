import { Projects } from "@/models/projects";
import ProjectAbout from "@/components/projects/ProjectAbout";
import { fetchDataWithPopulate } from "@/lib/utils";

export default async function page({ params }: { params: { slug: string } }) {
  const project = await fetchDataWithPopulate(Projects, "skills", params.slug);

  return (
    <div className={"container h-full mx-auto lg:px-24"}>
      <ProjectAbout project={project} />
    </div>
  );
}
