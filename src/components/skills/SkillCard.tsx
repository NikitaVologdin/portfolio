"use client";

import technologyType from "../../types/technologyType";
import Image from "next/image";
import useGradient from "../../hooks/use-gradient";
import useTransform from "../../hooks/use-transform";

export default function SkillCard({ name, image, color }: technologyType) {
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

  return (
    <div
      style={{
        transform: `perspective(1000px) rotateX(${transform.x}deg) rotateY(${transform.y}deg) scale(1.01)`,
        backgroundImage: gradient,
      }}
      className={`border-1 
    border-light-grey 
    rounded-2xl 
    bg-gradient-to-br
    from-transparent
    via-transparent
    via-60%
    to-transparent
    relative
    overflow-hidden
    hover:border-[#8e8e8e]
    card
    `}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div className="absolute h-full w-full bg-gradient-to-r from-white via-transparent via-20% to-white z-10"></div>
      <h6 className="p-4">{name}</h6>
      <Image
        src={image.src}
        alt={`${name} logo`}
        width={120}
        height={120}
        className="absolute -bottom-10 right-0 z-0"
      />
    </div>
  );
}
