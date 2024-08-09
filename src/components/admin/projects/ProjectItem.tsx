import { IFetchedProject } from "@/types/Projects";
import Link from "next/link";

interface props {
  project: IFetchedProject;
  editHandler: (id: string) => {};
  deleteHandler: (id: string) => {};
}

export default function ProjectItem({
  project,
  editHandler,
  deleteHandler,
}: props) {
  const duration = project.duration / 1000 / 60 / 60 / 24;

  return (
    <>
      <div className="py-2">
        <h5 className="font-semibold text-lg text-indigo-900">
          {project.name}
        </h5>
        <p className="mt-1 font-semibold">{project.category}</p>
        <p className="mt-3">
          Preview: <span className="italic">{project.preview}</span>
        </p>
        <p className="mt-3">
          Link:{" "}
          {project.link ? (
            <Link href={project.link} target="_blank">
              {<span className="font-semibold">{project.link}</span>}
            </Link>
          ) : (
            "empty"
          )}
        </p>
        <p>
          Color:{" "}
          <span
            className={`font-semibold`}
            style={{ color: `${project.color}` }}
          >
            {project.color.toUpperCase()}
          </span>
        </p>
        <p>
          Start date: <span className="font-semibold">{project.start}</span>
        </p>
        <p>
          Edn date:{" "}
          <span className="font-semibold">
            {project.present ? "present" : project.end}
          </span>
        </p>
        <p>
          Duration:{" "}
          <span className="font-semibold">
            {project.present ? "present" : `${duration} days`}
          </span>
        </p>
        <p>
          Image: <span className="font-semibold">{project.image}</span>
        </p>
      </div>
      <div className="mb-1 font-bold text-sm controls flex gap-4 items-center mb-4">
        <button
          className="hover:text-indigo-700"
          onClick={() => {
            editHandler(project._id);
          }}
        >
          Edit
        </button>
        <button
          className="hover:text-rose-700"
          onClick={() => {
            deleteHandler(project._id);
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}
