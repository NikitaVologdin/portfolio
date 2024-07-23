import { Experiences } from "@/models/experience";
import { fetchDataWithPopulate } from "@/lib/utils";
import ExperienceAbout from "@/components/experiences/ExperienceAbout";
import { IExperience } from "@/types/Experience";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default async function page({ params }: { params: { slug: string } }) {
  const experience = await fetchDataWithPopulate<IExperience>(
    Experiences,
    "skills",
    params.slug
  );

  return (
    <div className={"container h-full mx-auto lg:px-24"}>
      <Suspense fallback={<Loading />}>
        <ExperienceAbout experience={experience} />
      </Suspense>
    </div>
  );
}
