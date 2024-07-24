"use client";

import Image from "next/image";
import useGradient from "../../hooks/use-gradient";
import useTransform from "../../hooks/use-transform";
import { useRouter } from "next/navigation";

interface props {
  _id: string;
  name: string;
  image: string;
  color: string;
}

export default function SkillCard({ _id, name, image, color }: props) {
  const { gradient, moveGradient, removeGradient } = useGradient();
  const { transform, rotateTransform, removeTransform } = useTransform();

  function mouseMoveHandler(event: any) {
    const card: HTMLElement = document.querySelector(".card") as HTMLElement;

    const coordinates = {
      x: event.nativeEvent.layerX,
      y: event.nativeEvent.layerY,
    };

    rotateTransform(coordinates, 2, card);
    moveGradient(coordinates, color);
  }

  function mouseLeaveHandler() {
    removeGradient();
  }

  const router = useRouter();
  function clickHandler() {
    return router.push(`/portfolio/skills/${_id}`);
  }

  return (
    <div
      style={{
        transform: `perspective(1000px) rotateX(${transform.x}deg) rotateY(${transform.y}deg) scale(1.01)`,
        backgroundImage: gradient,
      }}
      className={`card border-1 
    border-light-grey 
    rounded-2xl
    h-16 
    bg-gradient-to-br
    from-transparent
    via-transparent
    via-60%
    to-transparent
    relative
    overflow-hidden
    hover:border-[#8e8e8e]
    my-3 
    md:my-0
    hover:cursor-pointer
    `}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={mouseLeaveHandler}
      onClick={clickHandler}
    >
      <div className="absolute h-full w-full bg-gradient-to-r from-white via-transparent via-20% to-white z-10"></div>
      <h6 className="p-4">{name}</h6>
      <Image
        src={`../stack/${image}`}
        alt={`${name} logo`}
        width={100}
        height={100}
        className="absolute top-0 right-0 z-0 object-contain"
      />
    </div>
  );
}
