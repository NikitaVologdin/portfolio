"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../components/nav/Logo";

export default function AdminNav() {
  const pathName = usePathname();
  const linkClasses =
    "inline-block hover:text-white border-b border-transparent hover:border-white";

  return (
    <nav className="h-full flex flex-col gap-2 px-10 py-5 bg-indigo-950 text-lg text-slate-300 fixed w-1/4">
      <Logo className="text-white" iconClass="white" />
      <p className="text-sm font-bold text-white">Pages</p>
      <div>
        <Link
          href={"/admin/intro"}
          className={`${linkClasses} ${
            pathName === "/admin/intro" ? "active" : ""
          }`}
        >
          Intro
        </Link>
      </div>
      <div>
        <Link
          href={"/admin/skills"}
          className={`${linkClasses} ${
            pathName === "/admin/skills" ? "active" : ""
          }`}
        >
          Skills
        </Link>
      </div>
      <div>
        <Link
          href={"/admin/projects"}
          className={`${linkClasses} ${
            pathName === "/admin/projects" ? "active" : ""
          }`}
        >
          Projects
        </Link>
      </div>
      <div>
        <Link
          href={"/admin/experiences"}
          className={`${linkClasses} ${
            pathName === "/admin/experiences" ? "active" : ""
          }`}
        >
          Experiences
        </Link>
      </div>
      <div>
        {" "}
        <Link
          href={"/admin/education"}
          className={`${linkClasses} ${
            pathName === "/admin/education" ? "active" : ""
          }`}
        >
          Education
        </Link>
      </div>
      <div>
        {" "}
        <Link
          href={"/admin/resume"}
          className={`${linkClasses} ${
            pathName === "/admin/resune" ? "active" : ""
          }`}
        >
          Resume
        </Link>
      </div>
    </nav>
  );
}
