import Developer from "@/models/developer";
import IntroForm from "@/components/admin/IntroForm";
import Container from "@/components/Container";
import { fetchDataOnServer } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "@/components/ui/Loading";

export default function page() {
  const Intro = async () => {
    const [developer] = await fetchDataOnServer(Developer);

    return <IntroForm developer={developer} path={path ? path : ""} />;
  };

  const path =
    process.env.MY_DOMAIN || process.env.APP_URL || process.env.VERCEL_URL;

  return (
    <Container>
      <Suspense fallback={<Loading />}>
        <Intro />
      </Suspense>
    </Container>
  );
}
