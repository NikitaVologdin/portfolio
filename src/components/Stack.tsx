import technologyType from "../types/technologyType";
import Image from "next/image";
import SquaredButton from "../ui/SquaredButton";

interface props {
  stack: technologyType[];
}

export default function Stack({ stack }: props) {
  return (
    <div className="flex gap-4 flex-wrap">
      {stack.map((t, index) => {
        return (
          <SquaredButton key={index} backdropText={t.name}>
            <Image
              src={t.image}
              width="15"
              height="15"
              alt={`${t.name} icon`}
            />
          </SquaredButton>
        );
      })}
    </div>
  );
}
