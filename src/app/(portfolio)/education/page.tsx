import { EducationModel } from "@/models/education";
import Heading from "../../../components/Heading";
import Search from "../../../components/ui/form/Search";
import Education from "../../../components/education/Education";
import Container from "../../../components/Container";
import { fetchDataWithPopulate } from "@/lib/utils";
import Loading from "@/components/ui/Loading";

export default async function Page() {
  const education = await fetchDataWithPopulate(EducationModel, "skills");

  return (
    <>
      <div className="mt-10">
        <Heading>Education</Heading>
      </div>
      <Container className="h-dvh my-auto">
        {education ? (
          <>
            <Search />
            <Education education={education.reverse()} />
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
