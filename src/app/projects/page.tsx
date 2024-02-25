import Heading from "../../components/Heading";
import Search from "../../ui/form/Search";
import Projects from "../../components/projects/Projects";
import Container from "../../components/Container";

export default function page() {
  return (
    <Container>
      <Heading>Projects</Heading>
      <Search />
      <Projects />
    </Container>
  );
}
