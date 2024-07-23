import Heading from "../../../components/Heading";
import Search from "../../../components/ui/form/Search";
import Skills from "../../../components/skills/Skills";
import Container from "../../../components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import { SkillsGroup as SkillsGroups } from "@/models/skills";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default async function page() {
  const groups = await fetchDataWithPopulate(SkillsGroups, "skills");

  return (
    <>
      <div className="mt-10">
        <Heading>Skills</Heading>
      </div>
      <Container className="h-dvh my-auto">
        <Search />
        <Suspense fallback={<Loading />}>
          <Skills groups={groups} />
        </Suspense>
      </Container>
    </>
  );
}
