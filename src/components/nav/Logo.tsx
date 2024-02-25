import NavItem from "./NavItem";
import Image from "next/image";

import nameSvg from "../../../public/name.svg";

export default function Logo() {
  return (
    <div className="logo flex">
      <NavItem href="/" classes={"hover:bg-transparent"}>
        <Image src={nameSvg} alt="code icone" className="scale-150" />
        <span
          className={`ml-3 text-sm md:text-base font-medium md:font-semibold`}
        >
          Nikita&nbsp;Vologdins
        </span>
      </NavItem>
    </div>
  );
}
