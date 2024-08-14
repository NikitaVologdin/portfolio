import { Resume } from "@/models/resume";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import Button from "@/components/ui/Button";
import { fetchDataOnServer } from "@/lib/utils";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";

export default async function page() {
  const cachedResume = unstable_cache(
    async () => {
      return fetchDataOnServer(Resume);
    },
    ["portfolio-resume"],
    { tags: ["resume"] }
  );
  const [resume] = await cachedResume();

  return (
    <>
      <header className="mt-10">
        <Heading>Resume</Heading>
      </header>
      <Container>
        <Suspense fallback={<Loading />}>
          <div className="flex justify-center">
            <Button
              name="Download"
              link={`../resume/${resume.file}`}
              target={"_blank"}
            />
          </div>
        </Suspense>
      </Container>
    </>
  );
}
