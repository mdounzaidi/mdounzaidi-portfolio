import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const { account, hasAnyRole } = useAuth();

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-[2rem] border border-zinc-800 bg-[#1d1f1e] p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          Account
        </p>
        <h2 className="mt-3 font-FoundersGroteskCondensed text-6xl uppercase leading-none">
          Welcome Back
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <InfoCard label="Name" value={`${account?.firstName || ""} ${account?.lastName || ""}`.trim()} />
          <InfoCard label="Username" value={account?.username} />
          <InfoCard label="Email" value={account?.email} />
          <InfoCard
            label="Email status"
            value={account?.emailVerified ? "Verified" : "Not verified"}
          />
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          Quick Actions
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <ActionLink to="/dashboard/profile" label="Update profile" />
          <ActionLink to="/dashboard/password" label="Change password" />
          {hasAnyRole(["ROLE_WRITER", "ROLE_ADMIN", "ROLE_SUPERADMIN"]) && (
            <ActionLink to="/dashboard/articles" label="Manage articles" />
          )}
          {hasAnyRole(["ROLE_ADMIN", "ROLE_SUPERADMIN"]) && (
            <ActionLink to="/dashboard/invites" label="Invite user" />
          )}
        </div>
      </section>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className="mt-2 break-words text-zinc-100">{value || "Not set"}</p>
    </div>
  );
}

function ActionLink({ to, label }) {
  return (
    <Link
      to={to}
      className="rounded-full border border-zinc-800 px-5 py-3 text-sm text-zinc-200 transition-colors hover:border-[#004D43] hover:text-white"
    >
      {label}
    </Link>
  );
}

export default DashboardPage;
