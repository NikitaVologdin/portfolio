import { Experiences } from "@/models/experience";
import { fetchDataWithPopulate } from "@/lib/utils";
import ExperienceAbout from "@/components/experiences/ExperienceAbout";
import { IExperience } from "@/types/Experience";

export default async function page({ params }: { params: { slug: string } }) {
  const experience = await fetchDataWithPopulate<IExperience>(
    Experiences,
    "skills",
    params.slug
  );

  return (
    <div className={"container h-full mx-auto lg:px-24"}>
      <ExperienceAbout experience={experience} />
    </div>
  );
}
