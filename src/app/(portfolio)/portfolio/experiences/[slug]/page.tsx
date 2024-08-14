import { Experiences } from "@/models/experience";
import { fetchDataWithPopulate } from "@/lib/utils";
import ExperienceAbout from "@/components/experiences/ExperienceAbout";
import { IExperience, IFetchedExperience } from "@/types/Experience";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";

export default async function page({ params }: { params: { slug: string } }) {
  const cachedExperience = unstable_cache(
    async () => {
      return fetchDataWithPopulate(Experiences, "skills", params.slug);
    },
    [`experiences${params.slug}`],
    { tags: ["experiences"] }
  );
  const experience = await cachedExperience();

  return (
    <div className={"container h-full mx-auto lg:px-24"}>
      <Suspense fallback={<Loading />}>
        <ExperienceAbout experience={experience} />
      </Suspense>
    </div>
  );
}
