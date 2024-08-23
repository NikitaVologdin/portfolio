import Link from "next/link";

interface props {
  name: string;
  link?: string;
  target?: string;
}

export default function Button({ name, link = "", target = "" }: props) {
  return (
    <Link
      href={link}
      className="text-xs py-[5px] px-[15px] border border-light-grey rounded-2xl text-medium-grey hover:bg-[#e1e1e1]"
      target={target}
    >
      <span className="dark:text-gray-200">{name}</span>
    </Link>
  );
}
