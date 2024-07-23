import { Experiences } from "@/models/experience";
import { fetchDataWithPopulate } from "@/lib/utils";
import ExperienceAbout from "@/components/experiences/ExperienceAbout";
import { IExperience } from "@/types/Experience";
import Loading from "@/components/ui/Loading";

export default async function page({ params }: { params: { slug: string } }) {
  const experience = await fetchDataWithPopulate<IExperience>(
    Experiences,
    "skills",
    params.slug
  );

  return (
    <div className={"container h-full mx-auto lg:px-24"}>
      {experience ? (
        <ExperienceAbout experience={experience} />
      ) : (
        <div className="absolute top-0 bottom-0 right-0 left-0 h-full flex justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
}
