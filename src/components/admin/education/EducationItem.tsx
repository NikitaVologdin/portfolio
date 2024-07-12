import { IFetchedEducation } from "@/types/Education";

interface props {
  education: IFetchedEducation;
  editHandler: (id: string) => {};
  deleteHandler: (id: string) => {};
}

export default function ExperienceItem({
  education,
  editHandler,
  deleteHandler,
}: props) {
  const duration = education.duration / 1000 / 60 / 60 / 24;
  return (
    <>
      <div className="py-2">
        <h5 className="font-semibold text-lg text-indigo-900">
          {education.name}
        </h5>
        {/* <p className="mt-1">{education.description}</p> */}
        <p>
          Start date: <span className="font-semibold">{education.start}</span>
        </p>
        <p>
          Edn date:{" "}
          <span className="font-semibold">
            {education.present ? "present" : education.end}
          </span>
        </p>
        <p>
          Duration:{" "}
          <span className="font-semibold">
            {education.present ? "present" : `${duration} days`}
          </span>
        </p>
        <p>
          Image: <span className="font-semibold">{education.image}</span>
        </p>
      </div>
      <div className="mb-1 font-bold text-sm controls flex gap-4 items-center mb-4">
        <button
          className="hover:text-indigo-700"
          onClick={() => {
            editHandler(education._id);
          }}
        >
          Edit
        </button>
        <button
          className="hover:text-rose-700"
          onClick={() => {
            deleteHandler(education._id);
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}
