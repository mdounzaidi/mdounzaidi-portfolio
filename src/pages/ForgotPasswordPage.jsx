import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import LoadingButton from "../components/LoadingButton";
import StatusMessage from "../components/StatusMessage";
import { requestPasswordReset } from "../services/authApi";

function ForgotPasswordPage() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);

    if (!userName.trim()) {
      setError("Username or email is required");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const response = await requestPasswordReset(userName.trim());
      setStatus({ type: "success", message: response.message });
    } catch (apiError) {
      setStatus({ type: "error", message: apiError.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-900 px-4 text-white">
      <div className="w-full max-w-xl rounded-[2rem] border border-zinc-800 bg-[#1d1f1e] p-8 shadow-[0_0_80px_rgba(0,0,0,0.35)]">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          Password Reset
        </p>
        <h1 className="mt-3 font-FoundersGroteskCondensed text-5xl uppercase leading-none">
          Find Account
        </h1>
        <p className="mt-4 text-sm leading-6 text-zinc-400">
          Enter your username or email and we will send a reset link if the
          account exists.
        </p>

        <div className="mt-8">
          <StatusMessage type={status?.type} message={status?.message} />
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <FormInput
            name="userName"
            placeholder="Username or email"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            error={error}
          />
          <LoadingButton type="submit" loading={loading}>
            Send Reset Link
          </LoadingButton>
        </form>

        <Link to="/auth" className="mt-6 inline-block text-sm text-zinc-400 hover:text-white">
          Back to login
        </Link>
      </div>
    </section>
  );
}

export default ForgotPasswordPage;
