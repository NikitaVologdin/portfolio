import { Skill as Skills } from "@/models/skills";
import { fetchDataOnServer } from "@/lib/utils";
import SkillAbout from "@/components/skills/SkillAbout";
import Loading from "@/components/ui/LoadingSkeleton";

export default async function page({ params }: { params: { slug: string } }) {
  const skill = await fetchDataOnServer(Skills, params.slug);

  return (
    <div className={"container h-full mx-auto lg:px-24"}>
      {skill ? (
        <SkillAbout skill={skill} />
      ) : (
        <div className="absolute top-0 bottom-0 right-0 left-0 h-full flex justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
}
