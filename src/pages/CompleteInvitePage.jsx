import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FormInput from "../components/FormInput";
import LoadingButton from "../components/LoadingButton";
import StatusMessage from "../components/StatusMessage";
import { completeInvite } from "../services/authApi";
import {
  validateEmail,
  validateMax,
  validatePassword,
  validateUsername,
} from "../utils/validation";

const initialForm = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function CompleteInvitePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.firstName.trim()) {
      nextErrors.firstName = "First name is required";
    } else {
      const firstNameError = validateMax(form.firstName, 20, "First name");
      if (firstNameError) nextErrors.firstName = firstNameError;
    }

    const lastNameError = validateMax(form.lastName, 20, "Last name");
    const usernameError = validateUsername(form.username.trim());
    const emailError = validateEmail(form.email.trim());
    const passwordError = validatePassword(form.password);

    if (lastNameError) nextErrors.lastName = lastNameError;
    if (usernameError) nextErrors.username = usernameError;
    if (emailError) nextErrors.email = emailError;
    if (passwordError) nextErrors.password = passwordError;
    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }
    if (!token) nextErrors.token = "Invite token is missing";

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
      await completeInvite(token, {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      setForm(initialForm);
      setStatus({ type: "success", message: "Invite completed. You can log in now." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-zinc-900 px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-2xl rounded-[2rem] border border-zinc-800 bg-[#1d1f1e] p-8 shadow-[0_0_80px_rgba(0,0,0,0.35)]">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          Invitation
        </p>
        <h1 className="mt-3 font-FoundersGroteskCondensed text-5xl uppercase leading-none">
          Complete Account
        </h1>
        <p className="mt-4 text-sm leading-6 text-zinc-400">
          Use the email address that received the invite.
        </p>

        <div className="mt-8 space-y-4">
          <StatusMessage type={status?.type} message={status?.message} />
          <StatusMessage type="error" message={errors.token} />
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={updateField}
              error={errors.firstName}
            />
            <FormInput
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={updateField}
              error={errors.lastName}
            />
          </div>
          <FormInput
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={updateField}
            error={errors.username}
          />
          <FormInput
            name="email"
            type="email"
            placeholder="Invited email address"
            value={form.email}
            onChange={updateField}
            error={errors.email}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={updateField}
            error={errors.password}
          />
          <FormInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={updateField}
            error={errors.confirmPassword}
          />
          <LoadingButton type="submit" loading={loading}>
            Complete Invite
          </LoadingButton>
        </form>

        <Link to="/auth" className="mt-6 inline-block text-sm text-zinc-400 hover:text-white">
          Back to login
        </Link>
      </div>
    </section>
  );
}

export default CompleteInvitePage;
