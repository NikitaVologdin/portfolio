import Heading from "../../../components/Heading";
import Search from "../../../components/ui/form/Search";
import Experiences from "../../../components/experiences/Experiences";
import Container from "../../../components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import { Experiences as ExperienceModel } from "@/models/experience";
import Loading from "@/components/ui/LoadingSkeleton";

export default async function Page() {
  const experiences = await fetchDataWithPopulate(ExperienceModel, "skills");

  return (
    <>
      <div className="mt-10">
        <Heading>Experiences</Heading>
      </div>
      <Container className="h-dvh my-auto">
        {experiences ? (
          <>
            <Search />
            <Experiences experiences={experiences.reverse()} />;
          </>
        ) : (
          <div className="absolute top-0 bottom-0 right-0 left-0 h-full flex justify-center items-center">
            <Loading />
          </div>
        )}
      </Container>
    </>
  );
}
