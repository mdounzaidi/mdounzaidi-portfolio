import React from "react";
import Logo from "../assets/logo.svg";
// import { LuMenu } from "react-icons/lu";

function Navbar() {
  const navLinks = ["Home", "About", "Projects", "Skills", "Experience", "Contact"];
  return (
    <div className="sticky bg-zinc-900/40 backdrop-blur-md top-0 z-[999] py-4 sm:py-5">
      <div className="container w-full font-NueueMontreal flex items-center justify-between">
        <div className="logo">
          <img src={"./src/assets/images/logo.png"} className="w-39 brightness-0 invert " alt="ochi logo" />
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
        {/* <LuMenu className="md:hidden block text-3xl" /> */}
      </div>
    </div>
  );
}

export default Navbar;
