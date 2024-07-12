import Heading from "../../../components/Heading";
import Search from "../../../components/ui/form/Search";
import Skills from "../../../components/skills/Skills";
import Container from "../../../components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import { SkillsGroup as SkillsGroups } from "@/models/skills";

export default async function page() {
  const groups = await fetchDataWithPopulate(SkillsGroups, "skills");

  return (
    <Container>
      <Heading>Skills</Heading>
      <Search />
      <Skills groups={groups} />
    </Container>
  );
}
