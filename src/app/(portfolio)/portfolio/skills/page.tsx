import Heading from "@/components/Heading";
import Search from "@/components/ui/form/Search";
import Skills from "@/components/skills/Skills";
import Container from "@/components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import { SkillsGroup as SkillsGroups } from "@/models/skills";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import SearchContextProvider from "@/context/portfolio/SearchContext";

export default async function page() {
  const cachedGroups = unstable_cache(
    async () => {
      return fetchDataWithPopulate(SkillsGroups, "skills");
    },
    ["portfolio-skills"],
    {
      tags: ["skills"],
    }
  );
  const groups = await cachedGroups();

  return (
    <>
      <header className="mt-10">
        <Heading>Skills</Heading>
      </header>
      <Container className="h-dvh my-auto">
        <SearchContextProvider>
          <Search />
          <Suspense fallback={<Loading />}>
            <Skills groups={groups} />
          </Suspense>
        </SearchContextProvider>
      </Container>
    </>
  );
}
