import Heading from "../../components/Heading";
import Search from "../../ui/form/Search";
import Experiences from "../../components/experiences/Experiences";
import Container from "../../components/Container";

export default function Page() {
  return (
    <Container>
      <Heading>Experiences</Heading>
      <Search />
      <Experiences />
    </Container>
  );
}
