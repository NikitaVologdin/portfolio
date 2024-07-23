import { EducationModel } from "@/models/education";
import Heading from "../../../components/Heading";
import Search from "../../../components/ui/form/Search";
import Education from "../../../components/education/Education";
import Container from "../../../components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default async function Page() {
  const education = await fetchDataWithPopulate(EducationModel, "skills");

  return (
    <>
      <div className="mt-10">
        <Heading>Education</Heading>
      </div>
      <Container className="h-dvh my-auto">
        <Suspense fallback={<Loading />}>
          <Search />
          <Education education={education.reverse()} />
        </Suspense>
      </Container>
    </>
  );
}
