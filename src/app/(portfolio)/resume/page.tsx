import { Resume } from "@/models/resume";
import Heading from "../../../components/Heading";
import Container from "../../../components/Container";
import Button from "@/components/ui/Button";
import { fetchDataOnServer } from "@/lib/utils";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function page() {
  async function Component() {
    const [resume] = await fetchDataOnServer(Resume);
    return (
      <>
        <div className="flex justify-center">
          <Button
            name="Download"
            link={`/resume/${resume.file}`}
            target={"_blank"}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="mt-10">
        <Heading>Resume</Heading>
      </div>
      <Container>
        <Suspense fallback={<Loading />}>
          <Component />
        </Suspense>
      </Container>
    </>
  );
}
