import Heading from "@/components/Heading";
import Search from "@/components/ui/form/Search";
import Experiences from "@/components/experiences/Experiences";
import Container from "@/components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import { Experiences as ExperienceModel } from "@/models/experience";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function Page() {
  async function Component() {
    const experiences = await fetchDataWithPopulate(ExperienceModel, "skills");
    return (
      <>
        <Search />
        <Experiences experiences={experiences.reverse()} />
      </>
    );
  }

  return (
    <>
      <header className="mt-10">
        <Heading>Experiences</Heading>
      </header>
      <Container className="h-dvh my-auto">
        <Suspense fallback={<Loading />}>
          <Component />
        </Suspense>
      </Container>
    </>
  );
}
