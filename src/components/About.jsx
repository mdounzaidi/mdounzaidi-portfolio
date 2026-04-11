import React from "react";
import { FaArrowUpLong } from "react-icons/fa6";

function About() {
  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed="0.01"
      className="w-full bg-[#1d1f1e] rounded-t-3xl py-10 sm:py-20"
    >
      <div className="container w-full">
        <h1 className="sm:text-3xl text-xl sm:leading-normal font-medium mb-10 border-b-[1px] border-zinc-700 pb-10">
          I’m Mohd Oun Zaidi, currently working as a Backend Java Developer at Accenture, building and supporting microservices-based systems in production environments.
        </h1>
        <div className="md:flex justify-center gap-10">
          <div className="about-text h-fit">
            <h1 className="text-4xl mb-4">What I’ve worked on:</h1>
            <p className="text-base sm:text-xl text-zinc-200 tracking-wide">
             With over 3 years of experience in backend development, I have worked on microservices-based systems powering real-world applications and integrations. I focus on building reliable, scalable systems that are designed to perform consistently in production environments.</p>
            <div className="h-[2vw] "></div>
            <div className="rounded-full flex gap-2 justify-center mt-4 w-fit bg-[#004D43] text-zinc-100 px-10 py-3 text-sm tracking-wider uppercase">
              Read more
              <FaArrowUpLong className="rotate-45 origin-center translate-y-[2px]" />
            </div>
          </div>
          <img
            className="w-full rounded-3xl mt-10 md:w-[40vw] md:mt-0"
            src="./src/assets/images/my1.jpeg"
            alt="about us"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
