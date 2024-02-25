import Heading from "../../components/Heading";
import Search from "../../ui/form/Search";
import Education from "../../components/education/Education";
import Container from "../../components/Container";

export default function Page() {
  return (
    <Container>
      <Heading>Education</Heading>
      <Search />
      <Education />
    </Container>
  );
}
