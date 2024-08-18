import { EducationModel } from "@/models/education";
import Education from "@/components/admin/education/Education";
import Container from "@/components/Container";
import { fetchDataOnServer } from "@/lib/utils";
import { Skill as Skills } from "@/models/skills";
import { unstable_cache } from "next/cache";
import { verifySession } from "@/lib/dal";

export default async function page() {
  const cashedEducation = unstable_cache(
    async () => {
      return fetchDataOnServer(EducationModel);
    },
    ["admin-education"],
    { tags: ["education"] }
  );
  const cashedSkills = unstable_cache(
    async () => {
      return fetchDataOnServer(Skills);
    },
    ["stack-skills"],
    { tags: ["skills"] }
  );
  const education = await cashedEducation();
  const skills = await cashedSkills();
  const session = await verifySession();

  const path =
    process.env.MY_DOMAIN || process.env.APP_URL || process.env.VERCEL_URL;
  return (
    <Container>
      <Education
        education={education.reverse()}
        skills={skills}
        path={path ? path : ""}
      />
      <div></div>
    </Container>
  );
}
