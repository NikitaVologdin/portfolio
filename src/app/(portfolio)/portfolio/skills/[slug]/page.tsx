import { Skill as Skills } from "@/models/skills";
import { fetchDataOnServer } from "@/lib/utils";
import SkillAbout from "@/components/skills/SkillAbout";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";
import { notFound } from "next/navigation";

export default function page({ params }: { params: { slug: string } }) {
  async function Component() {
    let skill;
    try {
      skill = await fetchDataOnServer(Skills, params.slug);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }

    if (!skill) {
      notFound();
    }
    return <SkillAbout skill={skill} />;
  }
  return (
    <div className={"container h-full mx-auto lg:px-24"}>
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </div>
  );
}
