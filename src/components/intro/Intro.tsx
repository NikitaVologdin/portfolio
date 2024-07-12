"use client";

import gitHubSvg from "../../../public/social/github.svg";
import linkedInSvg from "../../../public/social/linkedin.svg";
import twitterSvg from "../../../public/social/twitter.svg";
import stackoverflowSvg from "../../../public/social/stackoverflow.svg";
import emailSvg from "../../../public/social/email.svg";
import youtubeSvg from "../../../public/social/youtube.svg";
import facebookSvg from "../../../public/social/facebook.svg";

import technologies from "../../data/technologies";
import Link from "next/link";
import Image from "next/image";
import Slider from "../ui/slider/slider";

export default function Intro() {
  return (
    <div className="flex flex-wrap md:flex-nowrap md:justify-around md:items-center">
      <div className="md:w-9/12 px-3 md:px-4">
        <h1 className="text-3xl text-center md:text-left md:text-6xl font-black my-1.5 tracking-heading-wider">
          Nikita Vologdins,
        </h1>
        <p className="text-medium-grey text-lg text-center md:text-left font-extralight text-left tracking-wider m-0">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti,
          rerum. Debitis accusantium deleniti enim iste dignissimos? Similique,
          exercitationem! Odit vero, numquam quae ratione maxime sunt reiciendis
          laudantium quaerat iure ipsum!
        </p>
        <div className="flex justify-center md:justify-start py-4 gap-2">
          <Link href="https://github.com/nikitaVologdin" target="_blank">
            <Image src={gitHubSvg} alt="github icon" className="" />
          </Link>
          <Link href="https://github.com/nikitaVologdin" target="_blank">
            <Image src={linkedInSvg} alt="github icon" className="" />
          </Link>
          <Link href="https://github.com/nikitaVologdin" target="_blank">
            <Image src={twitterSvg} alt="github icon" className="" />
          </Link>
          <Link href="https://github.com/nikitaVologdin" target="_blank">
            <Image src={stackoverflowSvg} alt="github icon" className="" />
          </Link>
          <Link href="https://github.com/nikitaVologdin" target="_blank">
            <Image src={emailSvg} alt="github icon" className="" />
          </Link>
          <Link href="https://github.com/nikitaVologdin" target="_blank">
            <Image src={youtubeSvg} alt="github icon" className="" />
          </Link>
          <Link href="https://github.com/nikitaVologdin" target="_blank">
            <Image src={facebookSvg} alt="github icon" className="" />
          </Link>
        </div>
      </div>
      <div className="w-3/5 sm:w-4/12 md:w-3/12 mx-auto mt-10 sm:mt-16 md:mt-0 flex items-center justify-center">
        <Slider
          firstElementIndex={0}
          slides={technologies.slides}
          direction={"right"}
          timeOut={2000}
        />
      </div>
    </div>
  );
}
