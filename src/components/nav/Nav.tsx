"use client";

import Link from "next/link";
import Image from "next/image";
import nameSvg from "../../../public/name.svg";
import skillsSvg from "../../../public/skills.svg";
import projectsSvg from "../../../public/projects.svg";
import experiencesSvg from "../../../public/experiences.svg";
import educationSvg from "../../../public/education.svg";
import resumeSvg from "../../../public/resume.svg";
import searchSvg from "../../../public/search.svg";
import sunSvg from "../../../public/sun.svg";
import moonSvg from "../../../public/moon.svg";
import linked from "../../../public/social-icons/linkedin.svg";
import { usePathname } from "next/navigation";

import NavItem from "./NavItem";

const Nav = () => {
  const pathName = usePathname();

  const spanClasses = "ml-3";
  const actionIconClasses =
    "flex items-center py-3 px-3 lg:py-2.5 lg:px-1.5 text-grey text-xl md:text-sm hover:bg-light-grey tracking-wide";

  return (
    <nav className="flex flex-col h-full lg:flex-row">
      <div className="menu flex flex-col lg:flex-row lg:flex-1 lg:justify-center">
        <NavItem
          href={"/skills"}
          classes={`${pathName === "/skills" ? "active" : ""}`}
        >
          <Image src={skillsSvg} alt="code icone" />
          <span className={spanClasses}>Skills</span>
        </NavItem>
        <NavItem
          href="/projects"
          classes={`${pathName === "/projects" ? "active" : ""}`}
        >
          <Image src={projectsSvg} alt="code icone" />
          <span className={spanClasses}>Projects</span>
        </NavItem>
        <NavItem
          href="/experiences"
          classes={`${pathName === "/experiences" ? "active" : ""}`}
        >
          <Image src={experiencesSvg} alt="code icone" />
          <span className={spanClasses}>Experiences</span>
        </NavItem>
        <NavItem
          href="/education"
          classes={`${pathName === "/education" ? "active" : ""}`}
        >
          <Image src={educationSvg} alt="code icone" />
          <span className={spanClasses}>Education</span>
        </NavItem>
        <NavItem
          href="/resume"
          classes={`${pathName === "/resume" ? "active" : ""}`}
        >
          <Image src={resumeSvg} alt="code icone" />
          <span className={spanClasses}>Resume</span>
        </NavItem>
      </div>
      <div className="actions flex flex-col lg:flex-row mt-5 lg:mt-0">
        <Link href="/search" className={actionIconClasses}>
          <Image src={searchSvg} alt="code icone" />
          <span className={`${spanClasses} lg:hidden`}>Search</span>
        </Link>
        <Link href="" className={actionIconClasses}>
          <Image src={sunSvg} alt="code icone" />
          <span className={`${spanClasses} lg:hidden`}>Light theme</span>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
