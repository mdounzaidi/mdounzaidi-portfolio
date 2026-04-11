import React, { useState } from "react";
import { FaArrowUpLong, FaGithub, FaGoogle } from "react-icons/fa6";

function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <section className="min-h-screen bg-zinc-900 text-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[85vh] max-w-6xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#1d1f1e] shadow-[0_0_80px_rgba(0,0,0,0.35)]">
        <div className="hidden w-[42%] flex-col justify-between bg-[#004D43] p-10 lg:flex">
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.35em] text-zinc-200">
              Secure Access
            </p>
            <h1 className="font-FoundersGroteskCondensed text-6xl uppercase leading-none">
              Enter
              <br />
              Your Space
            </h1>
            <p className="mt-6 max-w-sm text-base leading-7 text-zinc-100/80">
              A clean auth experience that matches the same bold portfolio
              theme.
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-black/10 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-200/70">
              Why this style
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-100/80">
              Minimal inputs, strong contrast, soft depth, and the same green
              accent already used across your site.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col justify-center bg-zinc-900 p-6 sm:p-10 lg:w-[58%] lg:p-12">
          <div className="mb-8 flex w-fit rounded-full border border-zinc-800 bg-zinc-950 p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-full px-5 py-2 text-sm uppercase tracking-wider transition-colors ${
                mode === "login"
                  ? "bg-[#004D43] text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-full px-5 py-2 text-sm uppercase tracking-wider transition-colors ${
                mode === "signup"
                  ? "bg-[#004D43] text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              Welcome Back
            </p>
            <h2 className="mt-3 font-FoundersGroteskCondensed text-5xl uppercase leading-none sm:text-6xl">
              {mode === "login" ? "Login To Continue" : "Create Your Account"}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400 sm:text-base">
              {mode === "login"
                ? "Access your dashboard with a focused, premium sign-in flow."
                : "Join with a smooth signup experience built in the same visual language."}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
            >
              <FaGoogle />
              Continue with Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
            >
              <FaGithub />
              Continue with GitHub
            </button>
          </div>

          <form className="mt-8 space-y-4">
            {mode === "signup" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="First name"
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-[#004D43]"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-[#004D43]"
                />
              </div>
            )}

            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-[#004D43]"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-[#004D43]"
            />

            {mode === "signup" && (
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-[#004D43]"
              />
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between gap-4 text-sm text-zinc-400">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-950 accent-[#004D43]"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="transition-colors hover:text-white"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-[#004D43] px-6 py-4 text-sm uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[0.99]"
            >
              {mode === "login" ? "Login Now" : "Create Account"}
              <FaArrowUpLong className="rotate-45" />
            </button>
          </form>

          <p className="mt-6 text-sm text-zinc-500">
            {mode === "login"
              ? "New here? Switch to sign up and create your account."
              : "Already have an account? Switch back to login."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AuthPage;
