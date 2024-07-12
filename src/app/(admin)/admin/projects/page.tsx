import Container from "../../../../components/Container";
import Projects from "@/components/admin/projects/Projects";
import { fetchDataOnServer } from "@/lib/utils";
import { Projects as ProjectsModel } from "@/models/projects";
import { Skill as Skills } from "@/models/skills";

export default async function skillsPage() {
  const projects = await fetchDataOnServer(ProjectsModel);
  const skills = await fetchDataOnServer(Skills);
  return (
    <Container>
      <Projects projects={projects} skills={skills} />
    </Container>
  );
}
