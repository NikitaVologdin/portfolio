import { fetchDataOnServer } from "@/lib/utils";
import { Projects } from "@/models/projects";
import ProjectAbout from "@/components/projects/ProjectAbout";
import Container from "@/components/Container";

export default async function page({ params }: { params: { slug: string } }) {
  const project = await fetchDataOnServer(Projects, params.slug);
  return (
    <Container>
      <ProjectAbout project={project} />
    </Container>
  );
}
