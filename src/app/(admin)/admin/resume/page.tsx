import Container from "@/components/Container";
import Resume from "@/components/admin/resume/Resume";
import { fetchDataOnServer } from "@/lib/utils";
import { Resume as ResumeModel } from "@/models/resume";

export default async function skillsPage() {
  const resume = await fetchDataOnServer(ResumeModel);
  return (
    <Container>
      <Resume resume={resume} />
    </Container>
  );
}
