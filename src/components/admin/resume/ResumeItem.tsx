import { IFetchedResume } from "@/types/Resume";
import Link from "next/link";

interface props {
  resume: IFetchedResume;
  editHandler: (id: string) => {};
  deleteHandler: (id: string) => {};
}

export default function ResumeItem({
  resume,
  editHandler,
  deleteHandler,
}: props) {
  return (
    <>
      <div className="py-2">
        <h5 className="font-semibold text-lg text-indigo-900">{resume.name}</h5>
        <p>
          {resume.file}:{" "}
          <span className="font-semibold">
            <Link
              href={`/resume/${resume.file}`}
              target="_blank"
              rel="noopener noreferrer"
              locale={false}
              download={true}
            >
              download
            </Link>
          </span>
        </p>
      </div>
      <div className="mb-1 font-bold text-sm controls flex gap-4 items-center mb-4">
        <button
          className="hover:text-indigo-700"
          onClick={() => {
            editHandler(resume._id);
          }}
        >
          Edit
        </button>
        <button
          className="hover:text-rose-700"
          onClick={() => {
            deleteHandler(resume._id);
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}
