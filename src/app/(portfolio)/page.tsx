import Intro from "../../components/intro/Intro";
import Container from "../../components/Container";
import { fetchDataOnServer } from "@/lib/utils";
import { Skill as Skills } from "@/models/skills";
import Developer from "@/models/developer";
import Loading from "@/components/ui/Loading";

export default async function Home() {
  const skills = await fetchDataOnServer(Skills);
  const [developer] = await fetchDataOnServer(Developer);

  return (
    <Container className="h-dvh my-auto">
      {developer ? (
        <Intro developer={developer} skills={skills} />
      ) : (
        <div className="absolute top-0 bottom-0 right-0 left-0 h-full flex justify-center items-center">
          <Loading />
        </div>
      )}
    </Container>
  );
}
