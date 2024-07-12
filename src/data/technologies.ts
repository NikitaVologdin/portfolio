import nodeSvg from "../../public/stack/nodejs.svg";
import cssSvg from "../../public/stack/css.svg";
import expressSvg from "../../public/stack/express.svg";
import htmlSvg from "../../public/stack/html.svg";
import jsSvg from "../../public/stack/js.svg";
import reactSvg from "../../public/stack/react.svg";
import sassSvg from "../../public/stack/sass.svg";
import tsSvg from "../../public/stack/ts.svg";

const technologies = {
  stack: [
    { name: "HTML", image: htmlSvg, color: "#ffedd5" },
    { name: "CSS", image: cssSvg, color: "#dbeafe" },
    { name: "Sass", image: sassSvg, color: "#fce7f3" },
    { name: "JavaScript", image: jsSvg, color: "#fef3c7" },
    { name: "Node", image: nodeSvg, color: "#ecfccb" },
    { name: "Express", image: expressSvg, color: "#f5f5f4" },
    { name: "React", image: reactSvg, color: "#cffafe" },
    { name: "TypeScript", image: tsSvg, color: "#dbeafe" },
  ],
  get slides() {
    return this.stack.map((t) => t.image);
  },
};

export default technologies;
