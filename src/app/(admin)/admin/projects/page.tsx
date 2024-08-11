import Container from "../../../../components/Container";
import Projects from "@/components/admin/projects/Projects";
import { fetchDataOnServer } from "@/lib/utils";
import { Projects as ProjectsModel } from "@/models/projects";
import { Skill as Skills } from "@/models/skills";
import { unstable_cache } from "next/cache";

export default async function skillsPage() {
  const cachedProjects = unstable_cache(
    async () => {
      return fetchDataOnServer(ProjectsModel);
    },
    ["my-app-projects"],
    { tags: ["projects"] }
  );
  const cachedSkills = unstable_cache(
    async () => {
      return fetchDataOnServer(Skills);
    },
    ["my-app-skills"],
    { tags: ["skills"] }
  );
  const projects = await cachedProjects();
  const skills = await cachedSkills();
  const path =
    process.env.MY_DOMAIN || process.env.APP_URL || process.env.VERCEL_URL;

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
