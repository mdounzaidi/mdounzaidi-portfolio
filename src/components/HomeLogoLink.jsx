import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

function HomeLogoLink({ className = "" }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-3 text-sm text-zinc-300 transition-colors hover:text-white ${className}`}
      aria-label="Go to homepage"
    >
      <img
        src={logo}
        alt="Mohd Oun Zaidi"
        className="h-auto w-28 object-contain brightness-0 invert sm:w-32"
      />
      <span className="hidden rounded-full border border-zinc-800 px-4 py-2 sm:inline">
        Home
      </span>
    </Link>
  );
}

export default HomeLogoLink;
