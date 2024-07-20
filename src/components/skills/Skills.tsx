import SkillCard from "./SkillCard";
import { IFetchedSkillsGroup } from "@/types/Skills";
import SkillsGroup from "./SkillsGroup";
import Link from "next/link";

interface props {
  groups: IFetchedSkillsGroup[];
}

export default function Skills({ groups }: props) {
  return (
    <div className="flex flex-col gap-5 mt-10">
      {groups.map((group, index) => {
        return (
          <SkillsGroup key={index} name={group.name}>
            {group.skills.map((skill, index) => {
              return (
                <SkillCard
                  _id={skill._id}
                  name={skill.name}
                  image={skill.image}
                  color={skill.color}
                  key={index}
                />
              );
            })}
          </SkillsGroup>
        );
      })}
    </div>
  );
}
