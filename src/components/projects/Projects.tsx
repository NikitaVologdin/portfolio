"use client";
import ProjectCard from "./ProjectCard";
import { IFetchedProject } from "@/types/Projects";

interface props {
  projects: IFetchedProject[];
}

export default function Projects({ projects }: props) {
  // const projects = [
  //   {
  //     name: "Next Portfolio",
  //     github: "https://github.com/NikitaVologdins",
  //     category: "Website Template",
  //     duration: "3 days",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore non dolores voluptatibus vitae praesentium aperiam, iure laboriosam repellendus sunt explicabo pariatur totam enim, nihil animi quisquam. Sit vero quod laborum!",
  //     date: "January 2024",
  //     now: "now",
  //     stack: technologies.stack,
  //     color: "#dbeafe",
  //   },
  //   {
  //     name: "Next Portfolio",
  //     github: "https://github.com/NikitaVologdins",
  //     category: "Website Template",
  //     duration: "3 days",
  //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     date: "January 2024",
  //     now: "now",
  //     stack: technologies.stack,
  //     color: "#fce7f3",
  //   },
  //   {
  //     name: "Next Portfolio",
  //     github: "https://github.com/NikitaVologdins",
  //     category: "Website Template",
  //     duration: "3 days",
  //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     date: "January 2024",
  //     now: "now",
  //     stack: technologies.stack,
  //     color: "#fef3c7",
  //   },
  //   {
  //     name: "Next Portfolio",
  //     github: "https://github.com/NikitaVologdins",
  //     category: "Website Template",
  //     duration: "3 days",
  //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     date: "January 2024",
  //     now: "now",
  //     stack: technologies.stack,
  //     color: "#f5f5f4",
  //   },
  // ];
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 md:auto-rows-auto gap-5 mt-10">
      {projects.map((p, index) => {
        return (
          <ProjectCard
            _id={p._id}
            name={p.name}
            github={p.github}
            category={p.category}
            image={p.image}
            duration={p.duration}
            description={p.description}
            start={p.start}
            present={p.present}
            end={p.end}
            skills={p.skills}
            key={index}
            color={p.color}
          />
        );
      })}
    </div>
  );
}
