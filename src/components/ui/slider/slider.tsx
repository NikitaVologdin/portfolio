"use client";
import left from "../../../../public/arrows/left.svg";
import right from "../../../../public/arrows/right.svg";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IFetchedSkill } from "@/types/Skills";

interface props {
  firstElementIndex: number;
  skills: IFetchedSkill[];
  direction: string;
  timeOut: number;
}

export default function Slider({
  firstElementIndex,
  skills,
  direction,
  timeOut,
}: props) {
  const slides = skills.map((s) => s.image);
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
    const newSliderSettings = {
      ...currentSliderSettings,
      currentSliderDirection: direction,
    };
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
  const animateDirection = currentSliderSettings.currentSliderDirection;
  const xMovementValue = 20;
  const transitionDuration = 0.5;

  return (
    <AnimatePresence>
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
            className="dark:invert"
          />
        </button>
        <motion.div
          key={currentSliderSettings.currentSlideIndex}
          initial={{
            opacity: 0,
            x: animateDirection === "right" ? xMovementValue : -xMovementValue,
          }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            opacity: 0,
            x: animateDirection === "right" ? -xMovementValue : xMovementValue,
          }}
          transition={{ duration: transitionDuration }}
          className="grow w-fit h-48 px-4 flex justify-center items-center"
        >
          <Image
            src={`https://res.cloudinary.com/dojvgjueu/image/upload/v1722225586/${
              slides[currentSliderSettings.currentSlideIndex]
            }.svg`}
            alt={"logo"}
            height={160}
            width={150}
            priority={true}
            className="object-cover w-auto h-auto"
          />
        </motion.div>
        <button
          className="w-6 h-6 p-1.5 border rounded-full"
          onClick={swipeSliderToRightClickHandler}
        >
          <Image
            src={right}
            alt="right arrow for corousel"
            className="dark:invert"
          />
        </button>
      </div>
    </AnimatePresence>
  );
}
