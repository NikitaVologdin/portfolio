import Link from "next/link";

interface props {
  name: string;
}

export default function Button({ name }: props) {
  return (
    <Link
      href={""}
      className="text-xs py-[5px] px-[15px] border border-light-grey rounded-2xl text-medium-grey hover:bg-[#e1e1e1]"
    >
      {name}
    </Link>
  );
}
