import { svgType } from "../../types/svgType";

export interface props {
  firstElementIndex: number;
  slides: svgType[];
  direction: string;
  timeOut: number;
}
