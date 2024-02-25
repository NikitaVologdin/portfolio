import Heading from "../../components/Heading";
import Search from "../../ui/form/Search";
import Skills from "../../components/skills/Skills";
import Container from "../../components/Container";

export default function page() {
  return (
    <Container>
      <Heading>Skills</Heading>
      <Search />
      <Skills />
    </Container>
  );
}
