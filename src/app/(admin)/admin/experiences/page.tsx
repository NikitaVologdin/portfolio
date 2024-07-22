import { Experiences } from "@/models/experience";
import Experience from "@/components/admin/experience/Experiences";
import Container from "@/components/Container";
import { fetchDataOnServer } from "@/lib/utils";
import { Skill as Skills } from "@/models/skills";

export default async function page() {
  const experiences = await fetchDataOnServer(Experiences);
  const skills = await fetchDataOnServer(Skills);
  const path = process.env.APP_URL || process.env.VERCEL_URL;

  return (
    <Container>
      <Experience
        experiences={experiences.reverse()}
        skills={skills}
        path={path ? path : ""}
      />
    </Container>
  );
}
