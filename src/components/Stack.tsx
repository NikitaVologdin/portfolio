import { IFetchedSkill } from "@/types/Skills";
import SquaredButton from "./ui/SquaredButton";
import { CldImage } from "next-cloudinary";

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
              <CldImage
                src={s.image}
                width={0}
                height={0}
                alt={`${s.name} icon`}
                className="h-auto w-auto"
              />
            </div>
          </SquaredButton>
        );
      })}
    </div>
  );
}
