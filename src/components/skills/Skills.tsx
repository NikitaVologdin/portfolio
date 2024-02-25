import SkillCard from "./SkillCard";
import technologies from "../../data/technologies";

export default function Skills() {
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 md:auto-rows-auto gap-5 mt-10">
      {technologies.stack.map((technology, index) => {
        return (
          <SkillCard
            name={technology.name}
            key={index}
            image={technology.image}
            color={technology.color}
          />
        );
      })}
    </div>
  );
}
