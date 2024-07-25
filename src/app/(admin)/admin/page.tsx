import Container from "@/components/Container";
import Image from "next/image";
export default function Page() {
  return (
    <Container>
      <>
        <Image
          src="https://res.cloudinary.com/dojvgjueu/portfolio/nf5pkimioqansx5c9yzv"
          alt="sometext"
          width={100}
          height={100}
        />
      </>
    </Container>
  );
}
