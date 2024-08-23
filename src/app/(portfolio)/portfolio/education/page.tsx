import { EducationModel } from "@/models/education";
import Heading from "@/components/Heading";
import Search from "@/components/ui/form/Search";
import Education from "@/components/education/Education";
import Container from "@/components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import SearchContextProvider from "@/context/portfolio/SearchContext";

export default async function Page() {
  const cashedEducation = unstable_cache(
    async () => {
      return fetchDataWithPopulate(EducationModel, "skills");
    },
    ["portfolio-education"],
    { tags: ["education"] },
  );
  const education = await cashedEducation();

  return (
    <>
      <header className="mt-10">
        <Heading style={"dark:invert"}>Education</Heading>
      </header>
      <Container className="h-dvh my-auto">
        <SearchContextProvider>
          <Search />
          <Suspense fallback={<Loading />}>
            <Education education={education.reverse()} />
          </Suspense>
        </SearchContextProvider>
      </Container>
    </>
  );
}
