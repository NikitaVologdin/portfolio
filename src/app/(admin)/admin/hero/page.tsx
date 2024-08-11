import Developer from "@/models/developer";
import Container from "@/components/Container";
import Hero from "@/components/admin/hero/Hero";
import { fetchDataOnServer } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "@/components/ui/Loading";
import { unstable_cache } from "next/cache";

export default async function page() {
  const cachedHero = unstable_cache(
    async () => {
      return fetchDataOnServer(Developer);
    },
    ["my-app-hero"],
    { tags: ["hero"] }
  );
  const [developer] = await cachedHero();

  const path =
    process.env.MY_DOMAIN || process.env.APP_URL || process.env.VERCEL_URL;

  return (
    <Container>
      <Suspense fallback={<Loading />}>
        <Hero developer={developer} path={path ? path : ""} />
      </Suspense>
    </Container>
  );
}
