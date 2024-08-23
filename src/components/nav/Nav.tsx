"use client";

import Link from "next/link";
import Image from "next/image";
import nameSvg from "../../../public/icons/name.svg";
import skillsSvg from "../../../public/icons/skills.svg";
import projectsSvg from "../../../public/icons/projects.svg";
import experiencesSvg from "../../../public/icons/experiences.svg";
import educationSvg from "../../../public/icons/education.svg";
import resumeSvg from "../../../public/icons/resume.svg";
import searchSvg from "../../../public/icons/search.svg";
import sunSvg from "../../../public/icons/sun.svg";
import moonSvg from "../../../public/icons/moon.svg";
import linked from "../../../public/social-icons/linkedin.svg";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import NavItem from "./NavItem";

const Nav = () => {
  const pathName = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  function themeChangeHandler() {
    if (resolvedTheme === "light") {
      setTheme("dark");
    }
    if (resolvedTheme === "dark") {
      setTheme("light");
    }
  }

  const spanClasses = "ml-3";
  const actionIconClasses =
    "flex items-center py-3 px-3 lg:py-2.5 lg:px-1.5 text-grey text-xl md:text-sm hover:bg-light-grey tracking-wide";

  return (
    <nav className="flex flex-col h-full lg:flex-row">
      <div className="menu flex flex-col lg:flex-row lg:flex-1 lg:justify-center">
        <NavItem
          href={"/portfolio/skills"}
          classes={`${
            pathName === "/portfolio/skills" ? "active dark:bg-zinc-800" : ""
          }`}
        >
          <Image src={skillsSvg} alt="skills icon" className="dark:invert" />
          <span className={spanClasses}>Skills</span>
        </NavItem>
        <NavItem
          href="/portfolio/projects"
          classes={`${
            pathName === "/portfolio/projects" ? "active dark:bg-zinc-800" : ""
          }`}
        >
          <Image src={projectsSvg} alt="project icon" className="dark:invert" />
          <span className={spanClasses}>Projects</span>
        </NavItem>
        <NavItem
          href="/portfolio/experiences"
          classes={`${
            pathName === "/portfolio/experiences"
              ? "active dark:bg-zinc-800"
              : ""
          }`}
        >
          <Image
            src={experiencesSvg}
            alt="experience icon"
            className="dark:invert"
          />
          <span className={spanClasses}>Experiences</span>
        </NavItem>
        <NavItem
          href="/portfolio/education"
          classes={`${
            pathName === "/portfolio/education" ? "active dark:bg-zinc-800" : ""
          }`}
        >
          <Image
            src={educationSvg}
            alt="education icon"
            className="dark:invert"
          />
          <span className={spanClasses}>Education</span>
        </NavItem>
        <NavItem
          href="/portfolio/resume"
          classes={`${
            pathName === "/portfolio/resume" ? "active dark:bg-zinc-800" : ""
          }`}
        >
          <Image src={resumeSvg} alt="resume icon" className="dark:invert" />
          <span className={spanClasses}>Resume</span>
        </NavItem>
      </div>
      <div className="flex flex-col lg:flex-row mt-5 lg:mt-0">
        <Link
          href="/portfolio/search"
          className={`${actionIconClasses} dark:hover:bg-zinc-800`}
        >
          <Image src={searchSvg} alt="search icon" className="dark:invert" />
          <span className={`${spanClasses} lg:hidden`}>Search</span>
        </Link>
        <div
          className={`${actionIconClasses} cursor-pointer dark:hover:bg-zinc-800`}
          onClick={themeChangeHandler}
        >
          <Image src={sunSvg} alt="sun icon" className="dark:invert" />
          <span className={`${spanClasses} lg:hidden`}>Light theme</span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
