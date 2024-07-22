import Container from "@/components/Container";
import Resume from "@/components/admin/resume/Resume";
import { fetchDataOnServer } from "@/lib/utils";
import { Resume as ResumeModel } from "@/models/resume";

export default async function skillsPage() {
  const resume = await fetchDataOnServer(ResumeModel);
  const path = process.env.APP_URL || process.env.VERCEL_URL;

  return (
    <Container>
      <Resume resume={resume} path={path ? path : ""} />
    </Container>
  );
}
