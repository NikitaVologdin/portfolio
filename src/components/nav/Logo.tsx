import NavItem from "./NavItem";
import Image from "next/image";

import nameSvg from "../../../public/icons/name.svg";

interface props {
  className?: string;
  iconClass?: string;
}

export default function Logo({ className, iconClass }: props) {
  return (
    <div className="logo flex">
      <NavItem href="/" classes={"hover:bg-transparent"}>
        <Image
          src={nameSvg}
          alt="code icon"
          className={`scale-150 ${iconClass} dark:invert`}
        />
        <span
          className={`ml-3 text-sm md:text-base font-medium md:font-semibold ${className}`}
        >
          Nikita&nbsp;Vologdins
        </span>
      </NavItem>
    </div>
  );
}
