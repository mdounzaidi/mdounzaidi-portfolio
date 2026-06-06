import React, { useMemo, useState } from "react";
import FormInput from "../components/FormInput";
import LoadingButton from "../components/LoadingButton";
import StatusMessage from "../components/StatusMessage";
import { useAuth } from "../context/AuthContext";
import { createInvite } from "../services/accountApi";
import { validateEmail, validateMax } from "../utils/validation";

function InvitesPage() {
  const { hasAnyRole } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    accountRole: "ROLE_WRITER",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const roleOptions = useMemo(() => {
    if (hasAnyRole(["ROLE_SUPERADMIN"])) {
      return ["ROLE_WRITER", "ROLE_ADMIN", "ROLE_SUPERADMIN"];
    }
    return ["ROLE_WRITER"];
  }, [hasAnyRole]);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required";
    } else {
      const nameError = validateMax(form.name, 20, "Name");
      if (nameError) nextErrors.name = nameError;
    }

    const emailError = validateEmail(form.email.trim());
    if (emailError) nextErrors.email = emailError;

    if (!roleOptions.includes(form.accountRole)) {
      nextErrors.accountRole = "You cannot invite that role";
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
      const response = await createInvite({
        name: form.name.trim(),
        email: form.email.trim(),
        accountRole: form.accountRole,
      });
      setForm({ name: "", email: "", accountRole: roleOptions[0] });
      setStatus({ type: "success", message: response.message });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-2xl rounded-[2rem] border border-zinc-800 bg-[#1d1f1e] p-6 sm:p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Invites</p>
      <h2 className="mt-3 font-FoundersGroteskCondensed text-5xl uppercase leading-none">
        Invite User
      </h2>
      <p className="mt-4 text-sm leading-6 text-zinc-400">
        The backend will send the invite link to the email address.
      </p>

      <div className="mt-8">
        <StatusMessage type={status?.type} message={status?.message} />
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <FormInput
          name="name"
          placeholder="Invitee name"
          value={form.name}
          onChange={updateField}
          error={errors.name}
        />
        <FormInput
          name="email"
          type="email"
          placeholder="Invitee email"
          value={form.email}
          onChange={updateField}
          error={errors.email}
        />
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-zinc-500">
            Role
          </span>
          <select
            name="accountRole"
            value={form.accountRole}
            onChange={updateField}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-white outline-none focus:border-[#004D43]"
          >
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role.replace("ROLE_", "")}
              </option>
            ))}
          </select>
          {errors.accountRole && (
            <span className="mt-2 block text-sm text-red-300">{errors.accountRole}</span>
          )}
        </label>
        <LoadingButton type="submit" loading={loading}>
          Send Invite
        </LoadingButton>
      </form>
    </section>
  );
}

export default InvitesPage;
