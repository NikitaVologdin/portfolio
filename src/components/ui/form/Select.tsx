import { IFetchedSkillsGroup } from "@/types/Skills";

interface props {
  id: string;
  name: string;
  value: string;
  isTouched: boolean;
  hasError: boolean;
  changeHandler: React.ChangeEventHandler<HTMLSelectElement>;
  blurHandler: React.FocusEventHandler<HTMLSelectElement>;
  groups: IFetchedSkillsGroup[];
}

export default function Select({
  id,
  name,
  value,
  isTouched,
  hasError,
  changeHandler,
  blurHandler,
  groups,
}: props) {
  const isValid = isTouched && !hasError;
  const isInValid = isTouched && hasError;
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={changeHandler}
      onBlur={blurHandler}
      className={`w-full border ${isTouched ? "" : "border-slate-300"} ${
        isValid ? "border-green-400" : ""
      } ${
        isInValid ? "border-red-400" : ""
      } focus:outline-indigo-700 rounded shadow-sm px-1.5 py-1 text-sm leading-5 disabled:opacity-75} hover:border-indigo-500`}
    >
      <option value="" disabled defaultValue="Select your option">
        Select your option
      </option>
      {groups.map((group, index) => (
        <option value={group.name} key={index}>
          {group.name}
        </option>
      ))}
      <option value="New group">New group</option>
    </select>
  );
}
