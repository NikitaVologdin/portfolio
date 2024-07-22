import { Projects as ProjectsModel } from "@/models/projects";
import Heading from "../../../components/Heading";
import Search from "../../../components/ui/form/Search";
import Projects from "../../../components/projects/Projects";
import Container from "../../../components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";

export default async function page() {
  const projects = await fetchDataWithPopulate(ProjectsModel, "skills");

  return (
    <Container>
      <Heading>Projects</Heading>
      <Search />
      <Projects projects={projects.reverse()} />
    </Container>
  );
}
