import Heading from "../../../components/Heading";
import Search from "../../../components/ui/form/Search";
import Skills from "../../../components/skills/Skills";
import Container from "../../../components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import { SkillsGroup as SkillsGroups } from "@/models/skills";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function page() {
  async function Component() {
    const groups = await fetchDataWithPopulate(SkillsGroups, "skills");
    return (
      <>
        <Search />
        <Skills groups={groups} />
      </>
    );
  }

  return (
    <>
      <div className="mt-10">
        <Heading>Skills</Heading>
      </div>
      <Container className="h-dvh my-auto">
        <Suspense fallback={<Loading />}>
          <Component />
        </Suspense>
      </Container>
    </>
  );
}
