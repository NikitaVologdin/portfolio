import Link from "next/link";

interface NavItemProps {
  children: React.ReactNode;
  href: string;
  classes: string;
}

export default function NavItem({ children, href, classes }: NavItemProps) {
  const linkClasses =
    "flex w-full lg:w-auto items-center lg:justify-center px-3 py-3 text-grey text-xl md:text-sm hover:bg-light-grey tracking-wide dark:text-gray-200 dark:hover:bg-zinc-800";
  return (
    <Link href={href} className={`${linkClasses} ${classes}`}>
      {children}
    </Link>
  );
}
