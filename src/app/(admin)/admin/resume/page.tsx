import Container from "@/components/Container";
import Resume from "@/components/admin/resume/Resume";
import { fetchDataOnServer } from "@/lib/utils";
import { Resume as ResumeModel } from "@/models/resume";
import { unstable_cache } from "next/cache";

export default async function skillsPage() {
  const cachedResume = unstable_cache(
    async () => {
      return fetchDataOnServer(ResumeModel);
    },
    ["my-app-resume"],
    { tags: ["resume"] }
  );
  const resume = await cachedResume();
  const path =
    process.env.MY_DOMAIN || process.env.APP_URL || process.env.VERCEL_URL;

  return (
    <Container>
      <Resume resume={resume} path={path ? path : ""} />
    </Container>
  );
}
