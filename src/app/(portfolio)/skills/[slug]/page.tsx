import { fetchDataOnServer } from "@/lib/utils";
import { Skill as Skills } from "@/models/skills";
import SkillAbout from "@/components/skills/SkillAbout";
import Container from "@/components/Container";

export default async function page({ params }: { params: { slug: string } }) {
  const skill = await fetchDataOnServer(Skills, params.slug);
  return (
    <div className={"container h-full mx-auto lg:px-24"}>
      <SkillAbout skill={skill} />
    </div>
  );
}
