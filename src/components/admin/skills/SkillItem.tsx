import { IFetchedSkill } from "@/types/Skills";

interface props {
  skill: IFetchedSkill;
  last: boolean;
  editSkillHandler: (skillId: string) => void;
  deleteSkillHandler: (skillId: string) => void;
}

export default function SkillItem({
  skill,
  last,
  editSkillHandler,
  deleteSkillHandler,
}: props) {
  const editOnClickHandler = () => {
    editSkillHandler(skill._id);
  };
  const deleteOnClickHandler = () => {
    if (confirm(`Are you sure you want to delete ${skill.name} skill ?`)) {
      deleteSkillHandler(skill._id);
    }
    return;
  };
  return (
    <>
      <div className="py-2">
        <h5 className="font-semibold text-lg text-indigo-900">{skill.name}</h5>
        <p className="mt-1">{skill.description}</p>
        <p className="mt-3">
          Color:{" "}
          <span className={`font-semibold`} style={{ color: `${skill.color}` }}>
            {skill.color.toUpperCase()}
          </span>
        </p>
        <p>
          Image: <span className="font-semibold">{skill.image}</span>
        </p>
      </div>
      <div className="mb-1 font-bold text-sm controls flex gap-4 items-center mb-4">
        <button className="hover:text-indigo-700" onClick={editOnClickHandler}>
          Edit
        </button>
        <button className="hover:text-rose-700" onClick={deleteOnClickHandler}>
          Delete
        </button>
      </div>

      {last ? "" : <hr></hr>}
    </>
  );
}
