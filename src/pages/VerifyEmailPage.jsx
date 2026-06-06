import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import StatusMessage from "../components/StatusMessage";
import { verifyEmail } from "../services/authApi";

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState({
    type: "info",
    message: "Verifying your email...",
  });
  const token = searchParams.get("token");

  useEffect(() => {
    let active = true;

    async function verify() {
      if (!token) {
        setStatus({ type: "error", message: "Verification token is missing." });
        return;
      }

      try {
        const response = await verifyEmail(token);
        if (active) setStatus({ type: "success", message: response.message });
      } catch (error) {
        if (active) setStatus({ type: "error", message: error.message });
      }
    }

    verify();

    return () => {
      active = false;
    };
  }, [token]);

  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-900 px-4 text-white">
      <div className="w-full max-w-xl rounded-[2rem] border border-zinc-800 bg-[#1d1f1e] p-8 shadow-[0_0_80px_rgba(0,0,0,0.35)]">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          Email Verification
        </p>
        <h1 className="mt-3 font-FoundersGroteskCondensed text-5xl uppercase leading-none">
          Account Check
        </h1>
        <div className="mt-8">
          <StatusMessage type={status.type} message={status.message} />
        </div>
        <Link
          to="/auth"
          className="mt-8 inline-flex rounded-full bg-[#004D43] px-6 py-3 text-sm uppercase tracking-[0.2em] text-white"
        >
          Go to login
        </Link>
      </div>
    </section>
  );
}

export default VerifyEmailPage;
