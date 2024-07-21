import { fetchDataWithPopulate } from "@/lib/utils";
import { Experiences } from "@/models/experience";
import ExperienceAbout from "@/components/experiences/ExperienceAbout";

export default async function page({ params }: { params: { slug: string } }) {
  const experience = await fetchDataWithPopulate(
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
