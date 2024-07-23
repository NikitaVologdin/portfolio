import Heading from "../../../components/Heading";
import Search from "../../../components/ui/form/Search";
import Skills from "../../../components/skills/Skills";
import Container from "../../../components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import { SkillsGroup as SkillsGroups } from "@/models/skills";
import Loading from "@/components/ui/LoadingSkeleton";

export default async function page() {
  const groups = await fetchDataWithPopulate(SkillsGroups, "skills");

  return (
    <>
      <div className="mt-10">
        <Heading>Skills</Heading>
      </div>
      <Container className="h-dvh my-auto">
        {groups ? (
          <>
            <Search />
            <Skills groups={groups} />
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
