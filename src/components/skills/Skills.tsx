"use client";
import SkillCard from "./SkillCard";
import { IFetchedSkillsGroup } from "@/types/Skills";
import SkillsGroup from "./SkillsGroup";
import { SearchContext } from "@/context/portfolio/SearchContext";
import { useContext, useEffect, useState } from "react";

interface props {
  groups: IFetchedSkillsGroup[];
}

export default function Skills({ groups }: props) {
  const [filtered, setFiltered] = useState<IFetchedSkillsGroup[]>([]);
  const ctx = useContext(SearchContext);

  function filterGroups(value: string, groups: IFetchedSkillsGroup[]) {
    const regex = new RegExp(value, "i");
    const filteredGroups: any[] = [];

    groups.forEach((group) => {
      const filteredSkills = group.skills.filter((s) => s.name.match(regex));

      if (filteredSkills.length) {
        filteredGroups.push({
          name: group.name,
          _id: group._id,
          skills: filteredSkills,
        });
      }
    });

    return filteredGroups;
  }

  useEffect(() => {
    setFiltered(filterGroups(ctx.value, groups));
  }, [ctx.value]);

  return (
    <div className="flex flex-col gap-5 mt-10">
      {filtered.map((group, index) => {
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
