import Heading from "../../components/Heading";
import Search from "../../ui/form/Search";
import Container from "../../components/Container";

export default function page() {
  return (
    <Container>
      <Heading>Search</Heading>
      <Search />
    </Container>
  );
}
