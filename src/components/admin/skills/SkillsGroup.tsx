interface props {
  name: string;
  children: React.ReactNode;
}

export default function SkillsGroups({ name, children }: props) {
  return (
    <div className={`group-${name}`}>
      <div className="groupName flex items-center gap-5">
        <div className="bg-gray-200 h-px basis-5"></div>
        <h5 className="text-gray-400 inline">{name}</h5>
        <div className="bg-gray-200 h-px grow"></div>
      </div>
      {children}
    </div>
  );
}
