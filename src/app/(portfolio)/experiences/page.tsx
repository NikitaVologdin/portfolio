import Heading from "../../../components/Heading";
import Search from "../../../components/ui/form/Search";
import Experiences from "../../../components/experiences/Experiences";
import Container from "../../../components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import { Experiences as ExperienceModel } from "@/models/experience";

export default async function Page() {
  const experiences = await fetchDataWithPopulate(ExperienceModel, "skills");

  return (
    <Container>
      <Heading>Experiences</Heading>
      <Search />
      <Experiences experiences={experiences.reverse()} />
    </Container>
  );
}
