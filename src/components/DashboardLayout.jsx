import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HomeLogoLink from "./HomeLogoLink";

function DashboardLayout() {
  const { account, roles, signOut, hasAnyRole } = useAuth();

  const navItems = [
    { label: "Overview", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Password", path: "/dashboard/password" },
  ];

  if (hasAnyRole(["ROLE_WRITER", "ROLE_ADMIN", "ROLE_SUPERADMIN"])) {
    navItems.push({ label: "Articles", path: "/dashboard/articles" });
  }

  if (hasAnyRole(["ROLE_ADMIN", "ROLE_SUPERADMIN"])) {
    navItems.push({ label: "Invites", path: "/dashboard/invites" });
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
        <div className="container flex flex-col gap-5 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <HomeLogoLink />
            <div className="border-l border-zinc-800 pl-5">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Dashboard
              </p>
              <h1 className="mt-1 text-2xl font-medium">
                {account?.firstName || account?.username || "Account"}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `rounded-full border px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "border-[#004D43] bg-[#004D43] text-white"
                      : "border-zinc-800 text-zinc-300 hover:border-zinc-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={signOut}
              className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          {roles.map((role) => (
            <span
              key={role}
              className="rounded-full border border-zinc-800 px-3 py-1 text-xs uppercase tracking-[0.18em] text-zinc-400"
            >
              {role.replace("ROLE_", "")}
            </span>
          ))}
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
