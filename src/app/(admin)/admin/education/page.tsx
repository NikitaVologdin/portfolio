import { EducationModel } from "@/models/education";
import Education from "@/components/admin/education/Education";
import Container from "@/components/Container";
import { fetchDataOnServer } from "@/lib/utils";
import { Skill as Skills } from "@/models/skills";

export default async function page() {
  const education = await fetchDataOnServer(EducationModel);
  const skills = await fetchDataOnServer(Skills);

  return (
    <Container>
      <Education education={education} skills={skills} />
    </Container>
  );
}
