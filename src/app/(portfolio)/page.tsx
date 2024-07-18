import Intro from "../../components/intro/Intro";
import Container from "../../components/Container";
import { fetchDataOnServer } from "@/lib/utils";
import { Skill as Skills } from "@/models/skills";
import Developer from "@/models/developer";

export default async function Home() {
  const skills = await fetchDataOnServer(Skills);
  const [developer] = await fetchDataOnServer(Developer);

  return (
    <Container className="h-dvh my-auto">
      <Intro developer={developer} skills={skills} />
    </Container>
  );
}
