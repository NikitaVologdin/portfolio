import Container from "@/components/Container";
import Auth from "@/components/admin/auth/Auth";
import { fetchDataOnServer } from "@/lib/utils";
import User from "@/models/user";

export default async function page() {
  const path = (process.env.MY_DOMAIN ||
    process.env.APP_URL ||
    process.env.VERCEL_URL)!;

  let disabledCreateNewUser = false;
  const user = await fetchDataOnServer(User);
  if (user.length > 0) {
    disabledCreateNewUser = true;
  }
  return (
    <Container>
      <Auth path={path} canCreateNewUser={disabledCreateNewUser} />
    </Container>
  );
}
