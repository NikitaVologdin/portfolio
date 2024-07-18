import { fetchDataOnServer } from "@/lib/utils";
import { Skill as Skills } from "@/models/skills";
import SkillAbout from "@/components/skills/SkillAbout";
import Container from "@/components/Container";

export default async function page({ params }: { params: { slug: string } }) {
  const skill = await fetchDataOnServer(Skills, params.slug);
  return (
    <Container>
      <SkillAbout skill={skill} />
    </Container>
  );
}
