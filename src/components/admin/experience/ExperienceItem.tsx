import { IFetchedExperience } from "@/types/Experience";

interface props {
  experience: IFetchedExperience;
  editHandler: (id: string) => {};
  deleteHandler: (id: string) => {};
}

export default function ExperienceItem({
  experience,
  editHandler,
  deleteHandler,
}: props) {
  const duration = experience.duration / 1000 / 60 / 60 / 24;
  return (
    <>
      <div className="py-2">
        <h5 className="font-semibold text-lg text-indigo-900">
          {experience.name}
        </h5>
        <p className="mt-1">{experience.description}</p>
        <p className="mt-3">
          Color:
          <span
            className={`font-semibold`}
            style={{ color: `${experience.color}` }}
          >
            {experience.color.toUpperCase()}
          </span>
        </p>
        <p>
          Start date: <span className="font-semibold">{experience.start}</span>
        </p>
        <p>
          Edn date:{" "}
          <span className="font-semibold">
            {experience.present ? "present" : experience.end}
          </span>
        </p>
        <p>
          Duration:{" "}
          <span className="font-semibold">
            {experience.present ? "present" : `${duration} days`}
          </span>
        </p>
        <p>
          Image: <span className="font-semibold">{experience.image}</span>
        </p>
      </div>
      <div className="mb-1 font-bold text-sm controls flex gap-4 items-center mb-4">
        <button
          className="hover:text-indigo-700"
          onClick={() => {
            editHandler(experience._id);
          }}
        >
          Edit
        </button>
        <button
          className="hover:text-rose-700"
          onClick={() => {
            deleteHandler(experience._id);
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}
