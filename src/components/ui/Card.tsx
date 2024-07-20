import { SyntheticEvent } from "react";
import useGradient from "../../hooks/use-gradient";
import useTransform from "../../hooks/use-transform";

interface props {
  children: JSX.Element[];
  color: string;
  className?: string;
  clickHandler: () => void;
}

export default function Card({
  children,
  color,
  className = "",
  clickHandler,
}: props) {
  const { gradient, moveGradient, removeGradient } = useGradient();
  const { transform, rotateTransform, removeTransform } = useTransform();

  function mouseMoveHandler(event: any) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    const card: HTMLElement = document.querySelector(".card") as HTMLElement;
    if (!card) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const coordinates = { x, y };

    rotateTransform(coordinates, 4, card);
    moveGradient(coordinates, color);
  }

  function mouseLeaveHandler() {
    removeGradient();
    removeTransform();
  }

  return (
    <div
      style={{
        transform: `perspective(1000px) rotateX(${transform.x}deg) rotateY(${transform.y}deg) scale(1.01)`,
        backgroundImage: `${gradient}`,
      }}
      className={`${className} border border-light-grey rounded-2xl p-6 font-lighter text-sm flex hover:border-[#8e8e8e] card hover:cursor-pointer`}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={mouseLeaveHandler}
      onClick={clickHandler}
    >
      {children}
    </div>
  );
}
