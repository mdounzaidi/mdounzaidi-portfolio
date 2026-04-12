import React, { useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import myImage from "../assets/images/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["Home", "About", "Projects", "Skills", "Experience", "Contact"];

  return (
    <div className="sticky top-0 z-[999] bg-zinc-900/40 py-4 backdrop-blur-md sm:py-5">
      <div className="container w-full font-NueueMontreal flex items-center justify-between">
        <div className="logo">
          <img
            src={myImage}
            className="w-28 brightness-0 invert sm:w-36"
            alt="ochi logo"
          />
        </div>
        <div className="links items-center gap-10 hidden md:flex">
          {navLinks.map((item, index) => (
            <a
              key={index}
              className={`group relative text-md font-light capitalize whitespace-nowrap cursor-pointer overflow-hidden h-6 ${
                index === 5 && "ml-[10vw]"
              }`}
            >
              <span className="relative block overflow-hidden">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                  {item}
                </span>
                <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
                  {item}
                </span>
              </span>
              <span className="absolute left-0 bottom-0 h-[1px] w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"></span>
            </a>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 text-2xl md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <LuX /> : <LuMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="container mt-4 md:hidden">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/95 px-5 py-4 shadow-2xl">
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <a
                  key={item}
                  className="border-b border-zinc-800 pb-3 text-base font-light capitalize text-zinc-200 last:border-b-0 last:pb-0"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
