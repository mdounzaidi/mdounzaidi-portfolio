import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FormInput from "../components/FormInput";
import LoadingButton from "../components/LoadingButton";
import StatusMessage from "../components/StatusMessage";
import { confirmPasswordReset } from "../services/authApi";
import { validatePassword, validateUsername } from "../utils/validation";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [form, setForm] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function validateForm() {
    const nextErrors = {};
    const usernameError = validateUsername(form.userName.trim());
    const passwordError = validatePassword(form.password);

    if (usernameError) nextErrors.userName = usernameError;
    if (passwordError) nextErrors.password = passwordError;
    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }
    if (!token) nextErrors.token = "Reset token is missing";

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);
    setStatus(null);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setLoading(true);
      await confirmPasswordReset(token, {
        userName: form.userName.trim(),
        password: form.password,
      });
      setForm({ userName: "", password: "", confirmPassword: "" });
      setStatus({ type: "success", message: "Password reset complete. You can log in now." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
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
          New Password
        </h1>

        <div className="mt-8 space-y-4">
          <StatusMessage type={status?.type} message={status?.message} />
          <StatusMessage type="error" message={errors.token} />
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <FormInput
            name="userName"
            placeholder="Username"
            value={form.userName}
            onChange={updateField}
            error={errors.userName}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="New password"
            value={form.password}
            onChange={updateField}
            error={errors.password}
          />
          <FormInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={form.confirmPassword}
            onChange={updateField}
            error={errors.confirmPassword}
          />
          <LoadingButton type="submit" loading={loading}>
            Reset Password
          </LoadingButton>
        </form>

        <Link to="/auth" className="mt-6 inline-block text-sm text-zinc-400 hover:text-white">
          Back to login
        </Link>
      </div>
    </section>
  );
}

export default ResetPasswordPage;
