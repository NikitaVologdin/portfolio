import { Resume } from "@/models/resume";
import Heading from "../../../components/Heading";
import Container from "../../../components/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { fetchDataOnServer } from "@/lib/utils";

export default async function page() {
  const [resume] = await fetchDataOnServer(Resume);
  console.log(resume);
  return (
    <Container>
      <Heading>Resume</Heading>
      <div className="flex justify-center">
        <Button
          name="Download"
          link={`/resume/${resume.file}`}
          target={"_blank"}
        />
      </div>
    </Container>
  );
}
