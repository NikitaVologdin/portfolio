import Heading from "@/components/Heading";
import Search from "@/components/ui/form/Search";
import Container from "@/components/Container";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function page() {
  async function Component() {
    return <></>;
  }
  return (
    <Container>
      <Heading>Search</Heading>
      <Suspense fallback={<Loading />}>
        <Search />
      </Suspense>
    </Container>
  );
}
