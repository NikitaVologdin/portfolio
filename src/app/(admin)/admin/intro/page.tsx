import Developer from "@/models/developer";
import IntroForm from "../../../../components/admin/IntroForm";
import Container from "../../../../components/Container";
import { fetchDataOnServer } from "@/lib/utils";

export default async function page() {
  const [developer] = await fetchDataOnServer(Developer);

  return (
    <Container>
      <IntroForm developer={developer} />
    </Container>
  );
}
