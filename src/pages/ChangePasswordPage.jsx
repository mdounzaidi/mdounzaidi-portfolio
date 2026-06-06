import React, { useState } from "react";
import FormInput from "../components/FormInput";
import LoadingButton from "../components/LoadingButton";
import StatusMessage from "../components/StatusMessage";
import { changePassword } from "../services/accountApi";
import { validatePassword } from "../utils/validation";

function ChangePasswordPage() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
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

    if (!form.oldPassword) {
      nextErrors.oldPassword = "Current password is required";
    } else if (form.oldPassword.length > 72) {
      nextErrors.oldPassword = "Current password must be 72 characters or less";
    }

    const passwordError = validatePassword(form.newPassword);
    if (passwordError) nextErrors.newPassword = passwordError;

    if (form.newPassword !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

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
      await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setStatus({ type: "success", message: "Password updated." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-2xl rounded-[2rem] border border-zinc-800 bg-[#1d1f1e] p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
        Security
      </p>
      <h2 className="mt-3 font-FoundersGroteskCondensed text-5xl uppercase leading-none">
        Change Password
      </h2>

      <div className="mt-8">
        <StatusMessage type={status?.type} message={status?.message} />
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <FormInput
          name="oldPassword"
          type="password"
          placeholder="Current password"
          value={form.oldPassword}
          onChange={updateField}
          error={errors.oldPassword}
        />
        <FormInput
          name="newPassword"
          type="password"
          placeholder="New password"
          value={form.newPassword}
          onChange={updateField}
          error={errors.newPassword}
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
          Update Password
        </LoadingButton>
      </form>
    </section>
  );
}

export default ChangePasswordPage;
