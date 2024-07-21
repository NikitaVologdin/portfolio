import { fetchDataWithPopulate } from "@/lib/utils";
import { Projects } from "@/models/projects";
import ProjectAbout from "@/components/projects/ProjectAbout";
import Container from "@/components/Container";

export default async function page({ params }: { params: { slug: string } }) {
  const project = await fetchDataWithPopulate(Projects, "skills", params.slug);

  return (
    <div className={"container h-full mx-auto lg:px-24"}>
      <ProjectAbout project={project} />
    </div>
  );
}
