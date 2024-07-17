import Intro from "../../components/intro/Intro";
import Container from "../../components/Container";
import { fetchDataOnServer } from "@/lib/utils";
import { Skill as Skills } from "@/models/skills";

export default async function Home() {
  const skills = await fetchDataOnServer(Skills);
  return (
    <Container className="h-dvh">
      <Intro skills={skills} />
    </Container>
  );
}
