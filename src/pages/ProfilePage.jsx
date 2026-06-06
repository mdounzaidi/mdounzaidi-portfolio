import React, { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import LoadingButton from "../components/LoadingButton";
import StatusMessage from "../components/StatusMessage";
import { useAuth } from "../context/AuthContext";
import { updateMe } from "../services/accountApi";
import { validateEmail, validateMax, validateUsername } from "../utils/validation";

function ProfilePage() {
  const { account, setAccount } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!account) return;
    setForm({
      firstName: account.firstName || "",
      lastName: account.lastName || "",
      username: account.username || "",
      email: account.email || "",
    });
  }, [account]);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function validateForm() {
    const nextErrors = {};
    const firstNameError = validateMax(form.firstName, 20, "First name");
    const lastNameError = validateMax(form.lastName, 20, "Last name");
    const usernameError = form.username ? validateUsername(form.username.trim()) : "";
    const emailError = form.email ? validateEmail(form.email.trim()) : "";

    if (firstNameError) nextErrors.firstName = firstNameError;
    if (lastNameError) nextErrors.lastName = lastNameError;
    if (usernameError) nextErrors.username = usernameError;
    if (emailError) nextErrors.email = emailError;

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
      const updatedAccount = await updateMe({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
      });
      setAccount(updatedAccount);
      setStatus({
        type: "success",
        message: updatedAccount.emailVerified
          ? "Profile updated."
          : "Profile updated. Please verify your new email address.",
      });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-3xl rounded-[2rem] border border-zinc-800 bg-[#1d1f1e] p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
        Profile
      </p>
      <h2 className="mt-3 font-FoundersGroteskCondensed text-5xl uppercase leading-none">
        Account Details
      </h2>

      <div className="mt-8">
        <StatusMessage type={status?.type} message={status?.message} />
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
          placeholder="Email address"
          value={form.email}
          onChange={updateField}
          error={errors.email}
        />
        <LoadingButton type="submit" loading={loading}>
          Save Profile
        </LoadingButton>
      </form>
    </section>
  );
}

export default ProfilePage;
