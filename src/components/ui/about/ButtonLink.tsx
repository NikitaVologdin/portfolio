import Link from "next/link";

interface props {
  link?: string;
  target?: string;
  children: JSX.Element | JSX.Element[];
}

export default function ButtonLink({
  link = "",
  target = "",
  children,
}: props) {
  return (
    <Link
      href={link}
      className="text-xs py-[5px] px-[15px] border border-light-grey rounded-2xl text-medium-grey hover:bg-[#e1e1e1]"
      target={target}
    >
      <span className="text-xs">{children}</span>
    </Link>
  );
}
