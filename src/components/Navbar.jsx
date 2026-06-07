import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuMenu, LuSearch, LuX } from "react-icons/lu";
import myImage from "../assets/images/logo.png";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Articles", to: "/articles" },
    { label: "Contact", href: "/#contact" },
    { label: isAuthenticated ? "Dashboard" : "Login", to: isAuthenticated ? "/dashboard" : "/auth" },
  ];

  function handleSearch(event) {
    event.preventDefault();
    const search = keyword.trim();
    navigate(search ? `/articles?keyword=${encodeURIComponent(search)}` : "/articles");
    setIsOpen(false);
  }

  function renderNavItem(item, mobile = false) {
    const className = mobile
      ? "border-b border-zinc-800 pb-3 text-base font-light capitalize text-zinc-200 last:border-b-0 last:pb-0"
      : "group relative h-6 cursor-pointer overflow-hidden whitespace-nowrap text-sm font-light capitalize lg:text-md";

    if (item.to) {
      return (
        <Link key={item.label} to={item.to} className={className} onClick={() => setIsOpen(false)}>
          {mobile ? item.label : <AnimatedLabel label={item.label} />}
        </Link>
      );
    }

    return (
      <a key={item.label} href={item.href} className={className} onClick={() => setIsOpen(false)}>
        {mobile ? item.label : <AnimatedLabel label={item.label} />}
      </a>
    );
  }

  return (
    <div className="sticky top-0 z-[999] bg-zinc-900/70 py-4 backdrop-blur-md sm:py-5">
      <div className="container flex w-full items-center justify-between gap-5 font-NueueMontreal">
        <Link to="/" className="block shrink-0" aria-label="Go to homepage">
          <img
            src={myImage}
            className="h-auto w-28 object-contain brightness-0 invert sm:w-36"
            alt="Mohd Oun Zaidi"
          />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-5 md:flex lg:gap-7">
          <div className="flex items-center gap-5 lg:gap-7">
            {navLinks.map((item) => renderNavItem(item))}
          </div>
          <form
            onSubmit={handleSearch}
            className="flex w-52 items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-4 py-2 lg:w-64"
          >
            <LuSearch className="shrink-0 text-zinc-500" />
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Search articles"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </form>
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
            <form
              onSubmit={handleSearch}
              className="mb-5 flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-4 py-3"
            >
              <LuSearch className="shrink-0 text-zinc-500" />
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Search articles"
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
              />
            </form>
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => renderNavItem(item, true))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AnimatedLabel({ label }) {
  return (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
          {label}
        </span>
        <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          {label}
        </span>
      </span>
      <span className="absolute left-0 bottom-0 h-[1px] w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"></span>
    </>
  );
}

export default Navbar;
