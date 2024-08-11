import { Skill as Skills } from "@/models/skills";
import { fetchDataOnServer } from "@/lib/utils";
import SkillAbout from "@/components/skills/SkillAbout";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";

export default async function page({ params }: { params: { slug: string } }) {
  const cachedSkill = unstable_cache(
    async () => {
      return fetchDataOnServer(Skills, params.slug);
    },
    ["my-app-skills"],
    {
      tags: ["skills"],
    }
  );
  const skill = await cachedSkill();

  return (
    <div className={"container h-full mx-auto lg:px-24"}>
      <Suspense fallback={<Loading />}>
        <SkillAbout skill={skill} />
      </Suspense>
    </div>
  );
}
