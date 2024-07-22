import Container from "../../../../components/Container";
import Skills from "../../../../components/admin/skills/Skills";
import { fetchDataWithPopulate } from "@/lib/utils";
import { SkillsGroup as SkillsGroups } from "@/models/skills";

export default async function skillsPage() {
  const groups = await fetchDataWithPopulate(SkillsGroups, "skills");
  const path = process.env.APP_URL || process.env.VERCEL_URL;

  return (
    <Container>
      <Skills groups={groups} path={path ? path : ""} />
    </Container>
  );
}
