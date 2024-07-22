import Developer from "@/models/developer";
import IntroForm from "../../../../components/admin/IntroForm";
import Container from "../../../../components/Container";
import { fetchDataOnServer } from "@/lib/utils";

export default async function page() {
  const [developer] = await fetchDataOnServer(Developer);
  const path = process.env.VERCEL_URL;

  return (
    <Container>
      <IntroForm developer={developer} path={path ? path : ""} />
    </Container>
  );
}
