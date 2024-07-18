// import technologyType from "../types/technologyType";
import { IFetchedSkill } from "@/types/Skills";
import Image from "next/image";
import SquaredButton from "./ui/SquaredButton";

interface props {
  skills: IFetchedSkill[];
}

export default function Stack({ skills }: props) {
  return (
    <div className="flex gap-4 flex-wrap">
      {skills.map((s, index) => {
        return (
          <SquaredButton key={index} backdropText={s.name}>
            <Image
              src={`/stack/${s.image}`}
              width="12"
              height="12"
              alt={`${s.name} icon`}
            />
          </SquaredButton>
        );
      })}
    </div>
  );
}
