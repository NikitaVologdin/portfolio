"use client";
import ProjectCard from "./ProjectCard";
import { IFetchedProject } from "@/types/Projects";
import { SearchContext } from "@/context/portfolio/SearchContext";
import { useContext, useState, useEffect } from "react";
import filterData from "@/lib/search/filterData";

interface props {
  projects: IFetchedProject[];
}

export default function Projects({ projects }: props) {
  const [filtered, setFiltered] = useState<IFetchedProject[]>([]);
  const ctx = useContext(SearchContext);

  useEffect(() => {
    setFiltered(filterData<IFetchedProject>(ctx.value, projects));
  }, [ctx.value, projects]);
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 md:auto-rows-auto gap-5 mt-10">
      {filtered.map((p, index) => {
        return (
          <ProjectCard
            _id={p._id}
            name={p.name}
            github={p.github}
            link={p.link}
            category={p.category}
            image={p.image}
            duration={p.duration}
            preview={p.preview}
            description={p.description}
            start={p.start}
            present={p.present}
            end={p.end}
            skills={p.skills}
            color={p.color}
            key={index}
          />
        );
      })}
    </div>
  );
}
