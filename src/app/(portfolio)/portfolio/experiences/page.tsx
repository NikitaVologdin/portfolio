import Heading from "@/components/Heading";
import Search from "@/components/ui/form/Search";
import Experiences from "@/components/experiences/Experiences";
import Container from "@/components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import { Experiences as ExperienceModel } from "@/models/experience";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const cachedExperiences = unstable_cache(
    async () => {
      return fetchDataWithPopulate(ExperienceModel, "skills");
    },
    ["portfolio-experiences"],
    { tags: ["experiences"] }
  );
  const experiences = await cachedExperiences();

  return (
    <>
      <header className="mt-10">
        <Heading>Experiences</Heading>
      </header>
      <Container className="h-dvh my-auto">
        <Suspense fallback={<Loading />}>
          <Search />
          <Experiences experiences={experiences.reverse()} />
        </Suspense>
      </Container>
    </>
  );
}
