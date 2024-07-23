import Heading from "../../../components/Heading";
import Search from "../../../components/ui/form/Search";
import Experiences from "../../../components/experiences/Experiences";
import Container from "../../../components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import { Experiences as ExperienceModel } from "@/models/experience";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default async function Page() {
  const experiences = await fetchDataWithPopulate(ExperienceModel, "skills");

  return (
    <>
      <div className="mt-10">
        <Heading>Experiences</Heading>
      </div>
      <Container className="h-dvh my-auto">
        <Suspense fallback={<Loading />}>
          <Search />
          <Experiences experiences={experiences.reverse()} />
        </Suspense>
      </Container>
    </>
  );
}
