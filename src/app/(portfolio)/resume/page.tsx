import { Resume } from "@/models/resume";
import Heading from "../../../components/Heading";
import Container from "../../../components/Container";
import Button from "@/components/ui/Button";
import { fetchDataOnServer } from "@/lib/utils";
import Loading from "@/components/ui/Loading";

export default async function page() {
  const [resume] = await fetchDataOnServer(Resume);

  return (
    <>
      <div className="mt-10">
        <Heading>Resume</Heading>
      </div>
      <Container>
        {resume ? (
          <div className="flex justify-center">
            <Button
              name="Download"
              link={`/resume/${resume.file}`}
              target={"_blank"}
            />
          </div>
        ) : (
          <div className="absolute top-0 bottom-0 right-0 left-0 h-full flex justify-center items-center">
            <Loading />
          </div>
        )}
      </Container>
    </>
  );
}

// <div>
//   <div className="h-[350px] bg-cover bg-gradient-to-l">
//     <div className="h-full flex flex-col justify-center items-center gap-5 py-5">
//       <Button
//         name="Download"
//         link={`/resume/${resume.file}`}
//         target={"_blank"}
//       />
//     </div>
//   </div>
// </div>;
