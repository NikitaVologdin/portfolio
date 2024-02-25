import left from "../../../public/arrows/left.svg";
import right from "../../../public/arrows/right.svg";

import { svgType } from "../../types/svgType";
import { props } from "./types";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

export default function Slider({
  firstElementIndex,
  slides,
  direction,
  timeOut,
}: props) {
  const [currentSliderSettings, setSliderSettings] = useState({
    currentSlideIndex: firstElementIndex,
    currentSliderDirection: direction,
    timeOut,
    slides,
  });

  useEffect(() => {
    const slider = () => {
      const newSliderSettings = { ...currentSliderSettings };
      const { currentSlideIndex, currentSliderDirection } = newSliderSettings;
      let newSlideIndex = currentSlideIndex;

      if (currentSliderDirection === "right") {
        newSlideIndex = currentSlideIndex + 1;

        if (newSlideIndex > slides.length - 1) {
          newSlideIndex = 0;
        }
      }

      if (currentSliderDirection === "left") {
        newSlideIndex = currentSlideIndex - 1;

        if (newSlideIndex < 0) {
          newSlideIndex = slides.length - 1;
        }
      }

      newSliderSettings.currentSlideIndex = newSlideIndex;

      return setSliderSettings(newSliderSettings);
    };
    const interval = setInterval(() => {
      slider();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSliderSettings, slides]);

  const swipeSliderToLeftClickHandler = () => {
    swipeOneSlideToDirection("left");
  };

  const swipeSliderToRightClickHandler = () => {
    swipeOneSlideToDirection("right");
  };

  function swipeOneSlideToDirection(direction: string) {
    const newSliderSettings = { ...currentSliderSettings };
    if (direction === "right") {
      newSliderSettings.currentSlideIndex =
        newSliderSettings.currentSlideIndex + 1;

      if (newSliderSettings.currentSlideIndex > slides.length - 1) {
        newSliderSettings.currentSlideIndex = 0;
      }
    }

    if (direction === "left") {
      newSliderSettings.currentSlideIndex =
        newSliderSettings.currentSlideIndex - 1;

      if (newSliderSettings.currentSlideIndex < 0) {
        newSliderSettings.currentSlideIndex = slides.length - 1;
      }
    }
    setSliderSettings(newSliderSettings);
  }

  return (
    <div className="flex items-center justify-between grow">
      <button
        className="w-6 h-6 p-1.5 border rounded-full"
        onClick={swipeSliderToLeftClickHandler}
        data-testid="slideToLeft"
      >
        <Image
          src={left}
          alt="left arrow for corousel"
          data-testid="left-arrow"
        />
      </button>
      <div className="grow w-fit max-h-48 px-4 flex justify-center items-center">
        <Image
          src={slides[currentSliderSettings.currentSlideIndex]}
          alt="node-js icon"
          priority={true}
          className="object-cover"
        />
      </div>
      <button
        className="w-6 h-6 p-1.5 border rounded-full"
        onClick={swipeSliderToRightClickHandler}
      >
        <Image src={right} alt="right arrow for corousel" />
      </button>
    </div>
  );
}
