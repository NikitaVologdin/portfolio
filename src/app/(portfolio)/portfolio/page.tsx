import Intro from "../../../components/intro/Intro";
import Container from "../../../components/Container";
import { fetchDataOnServer } from "@/lib/utils";
import { Skill as Skills } from "@/models/skills";
import Developer from "@/models/developer";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";

export default async function page() {
  const cachedDeveloper = unstable_cache(
    async () => {
      return fetchDataOnServer(Developer);
    },
    ["my-app-hero"],
    {
      tags: ["hero"],
    }
  );
  const cachedSkills = unstable_cache(
    async () => {
      return fetchDataOnServer(Skills);
    },
    ["my-app-skills"],
    {
      tags: ["skills"],
    }
  );

  const skills = await cachedSkills();
  const [developer] = await cachedSkills();

  return (
    <Container className="h-dvh my-auto">
      <Suspense fallback={<Loading />}>
        <Intro developer={developer} skills={skills} />
      </Suspense>
    </Container>
  );
}
