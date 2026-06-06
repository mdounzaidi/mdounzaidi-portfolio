import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuMenu, LuX } from "react-icons/lu";
import myImage from "../assets/images/logo.png";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Projects", href: "#" },
    { label: "Articles", to: "/articles" },
    { label: "Skills", href: "#" },
    { label: "Experience", href: "#" },
    { label: "Contact", href: "#" },
    { label: isAuthenticated ? "Dashboard" : "Login", to: isAuthenticated ? "/dashboard" : "/auth" },
  ];

  function renderNavItem(item) {
    const className = `group relative h-6 cursor-pointer overflow-hidden whitespace-nowrap text-md font-light capitalize ${
      item.label === "Contact" ? "lg:ml-[6vw]" : ""
    }`;
    const content = (
      <>
        <span className="relative block overflow-hidden">
          <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
            {item.label}
          </span>
          <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
            {item.label}
          </span>
        </span>
        <span className="absolute left-0 bottom-0 h-[1px] w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"></span>
      </>
    );

    if (item.to) {
      return (
        <Link key={item.label} to={item.to} className={className}>
          {content}
        </Link>
      );
    }

    return (
      <a key={item.label} href={item.href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <div className="sticky top-0 z-[999] bg-zinc-900/40 py-4 backdrop-blur-md sm:py-5">
      <div className="container w-full font-NueueMontreal flex items-center justify-between">
        <Link to="/" className="logo block shrink-0" aria-label="Go to homepage">
          <img
            src={myImage}
            className="h-auto w-28 object-contain brightness-0 invert sm:w-36"
            alt="Mohd Oun Zaidi"
          />
        </Link>
        <div className="links items-center gap-6 hidden md:flex lg:gap-8 xl:gap-10">
          {navLinks.map(renderNavItem)}
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
              {navLinks.map((item) =>
                item.to ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="border-b border-zinc-800 pb-3 text-base font-light capitalize text-zinc-200 last:border-b-0 last:pb-0"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="border-b border-zinc-800 pb-3 text-base font-light capitalize text-zinc-200 last:border-b-0 last:pb-0"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
