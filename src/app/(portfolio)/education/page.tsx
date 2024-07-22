import { EducationModel } from "@/models/education";
import Heading from "../../../components/Heading";
import Search from "../../../components/ui/form/Search";
import Education from "../../../components/education/Education";
import Container from "../../../components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";

export default async function Page() {
  const education = await fetchDataWithPopulate(EducationModel, "skills");
  return (
    <Container>
      <Heading>Education</Heading>
      <Search />
      <Education education={education.reverse()} />
    </Container>
  );
}
