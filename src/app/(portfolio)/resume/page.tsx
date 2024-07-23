import { Resume } from "@/models/resume";
import Heading from "../../../components/Heading";
import Container from "../../../components/Container";
import Button from "@/components/ui/Button";
import { fetchDataOnServer } from "@/lib/utils";

export default async function page() {
  const [resume] = await fetchDataOnServer(Resume);
  console.log(resume);
  return (
    <Container>
      <div>
        <div className="h-[350px] bg-cover bg-gradient-to-l">
          <div className="h-full flex flex-col justify-center items-center gap-5 py-5">
            <Heading>Resume</Heading>
            <Button
              name="Download"
              link={`/resume/${resume.file}`}
              target={"_blank"}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
