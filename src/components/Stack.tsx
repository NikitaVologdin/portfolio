import { IFetchedSkill } from "@/types/Skills";
import SquaredButton from "./ui/SquaredButton";
import Image from "next/image";

interface props {
  skills: IFetchedSkill[];
}

export default function Stack({ skills }: props) {
  return (
    <div className="flex gap-4 flex-wrap">
      {skills.map((s, index) => {
        return (
          <SquaredButton key={index} backdropText={s.name}>
            <div className="h-3 w-3">
              <Image
                src={`https://res.cloudinary.com/dojvgjueu/image/upload/v1722225586/${s.image}.svg`}
                width={15}
                height={15}
                alt={`${s.name} icon`}
              />
            </div>
          </SquaredButton>
        );
      })}
    </div>
  );
}
