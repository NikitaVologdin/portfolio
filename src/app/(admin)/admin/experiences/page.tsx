import { Experiences } from "@/models/experience";
import Experience from "@/components/admin/experience/Experiences";
import Container from "@/components/Container";
import { fetchDataOnServer } from "@/lib/utils";
import { Skill as Skills } from "@/models/skills";
import { unstable_cache } from "next/cache";

export default async function page() {
  const cachedExperiences = unstable_cache(
    async () => {
      return fetchDataOnServer(Experiences);
    },
    ["my-app-experiences"],
    { tags: ["experiences"] }
  );
  const cachedSkills = unstable_cache(
    async () => {
      return fetchDataOnServer(Skills);
    },
    ["my-app-skills"],
    { tags: ["skills"] }
  );
  const experiences = await cachedExperiences();
  const skills = await cachedSkills();
  const path =
    process.env.MY_DOMAIN || process.env.APP_URL || process.env.VERCEL_URL;

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
