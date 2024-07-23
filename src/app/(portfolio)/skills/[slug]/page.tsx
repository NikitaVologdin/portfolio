import { Skill as Skills } from "@/models/skills";
import { fetchDataOnServer } from "@/lib/utils";
import SkillAbout from "@/components/skills/SkillAbout";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default async function page({ params }: { params: { slug: string } }) {
  const skill = await fetchDataOnServer(Skills, params.slug);

  return (
    <div className={"container h-full mx-auto lg:px-24"}>
      <Suspense fallback={<Loading />}>
        <SkillAbout skill={skill} />
      </Suspense>
    </div>
  );
}
