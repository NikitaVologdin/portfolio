import Container from "@/components/Container";
import Skills from "@/components/admin/skills/Skills";
import { fetchDataWithPopulate } from "@/lib/utils";
import { SkillsGroup as SkillsGroups } from "@/models/skills";
import { unstable_cache } from "next/cache";

export default async function skillsPage() {
  const cachedGroups = unstable_cache(
    async () => {
      return fetchDataWithPopulate(SkillsGroups, "skills");
    },
    ["my-app-skills"],
    { tags: ["skills"] }
  );
  const groups = await cachedGroups();
  const path =
    process.env.MY_DOMAIN || process.env.APP_URL || process.env.VERCEL_URL;

  return (
    <Container>
      <Skills groups={groups} path={path ? path : ""} />
    </Container>
  );
}
