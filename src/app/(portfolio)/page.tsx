import Intro from "../../components/intro/Intro";
import Container from "../../components/Container";
import { fetchDataOnServer } from "@/lib/utils";
import { Skill as Skills } from "@/models/skills";
import Developer from "@/models/developer";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function Home() {
  async function Component() {
    const skills = await fetchDataOnServer(Skills);
    const [developer] = await fetchDataOnServer(Developer);

    return <Intro developer={developer} skills={skills} />;
  }

  return (
    <Container className="h-dvh my-auto">
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </Container>
  );
}
