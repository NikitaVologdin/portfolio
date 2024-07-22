import Container from "../../../../components/Container";
import Projects from "@/components/admin/projects/Projects";
import { fetchDataOnServer } from "@/lib/utils";
import { Projects as ProjectsModel } from "@/models/projects";
import { Skill as Skills } from "@/models/skills";

export default async function skillsPage() {
  const projects = await fetchDataOnServer(ProjectsModel);
  const skills = await fetchDataOnServer(Skills);
  const path = process.env.APP_URL || process.env.VERCEL_URL;

  return (
    <Container>
      <Projects
        projects={projects.reverse()}
        skills={skills}
        path={path ? path : ""}
      />
    </Container>
  );
}
