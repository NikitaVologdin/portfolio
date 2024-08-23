"use client";
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
      <div className="h-full flex items-center justify-between px-10 relative">
        <h6 className="z-10 dark:text-gray-200">{name}</h6>
        <div className="absolute top-0 bottom-0 right-0 left-0 z-20 bg-gradient-to-l from-[#fffffff7] to-80%"></div>
        <div
          className={`absolute top-0 bottom-0 right-0 left-0 z-0 h-full bg-right bg-no-repeat bg-contain`}
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dojvgjueu/image/upload/v1722225586/${image}.svg)`,
            backgroundPosition: "85% 0%",
          }}
        ></div>
      </div>
    </div>
  );
}
