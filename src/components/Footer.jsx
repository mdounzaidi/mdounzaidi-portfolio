import React, { useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import logo from "../assets/images/logo.png";

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLScJ_bMQ9UObcdL3qTBGjk7_Ytodpv6EewL-1MkUAjJqth6wJA/formResponse";

const GOOGLE_FORM_FIELDS = {
  name: "entry.390715019",
  email: "entry.1447355971",
  message: "entry.26689094",
};

function Footer() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function validateForm() {
    if (!form.name.trim()) return "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Enter a valid email";
    if (!form.message.trim()) return "Message is required";
    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationError = validateForm();
    setError(validationError);
    setSuccess("");
    if (validationError) return;

    const body = new URLSearchParams({
      [GOOGLE_FORM_FIELDS.name]: form.name.trim(),
      [GOOGLE_FORM_FIELDS.email]: form.email.trim(),
      [GOOGLE_FORM_FIELDS.message]: form.message.trim(),
    });

    try {
      setLoading(true);
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body,
      });
      setForm({ name: "", email: "", message: "" });
      setSuccess("Message sent. I will get back to you soon.");
    } catch {
      setError("Could not send the message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="contact" className="h-fit w-full bg-[#1d1f1e]">
      <div className="container flex flex-col gap-10 py-10 md:flex-row">
        <div className="flex w-full flex-col justify-between gap-10 md:w-1/2">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-zinc-500">
              Contact
            </p>
            <h1 className="font-FoundersGroteskCondensed text-6xl font-bold uppercase leading-none sm:text-7xl">
              LET'S <br /> CONNECT
            </h1>
          </div>
          <img
            src={logo}
            className="hidden w-48 brightness-0 invert md:block"
            alt="Mohd Oun Zaidi"
          />
        </div>

        <div className="flex w-full flex-col justify-between gap-6 md:w-1/2">
          <div>
            <h2 className="mb-6 border-b border-zinc-700 pb-4 font-NueueMontreal text-3xl md:text-4xl">
              Get in touch
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                name="name"
                value={form.name}
                onChange={updateField}
                placeholder="Name"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#CDEA68]"
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                placeholder="Email"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#CDEA68]"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={updateField}
                placeholder="Message"
                rows={5}
                className="w-full resize-y rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm leading-7 text-white outline-none placeholder:text-zinc-500 focus:border-[#CDEA68]"
              />

              {error && (
                <p className="rounded-2xl border border-red-400/30 bg-red-950/40 px-5 py-3 text-sm text-red-100">
                  {error}
                </p>
              )}
              {success && (
                <p className="rounded-2xl border border-[#CDEA68]/30 bg-[#CDEA68]/10 px-5 py-3 text-sm text-[#CDEA68]">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-[#004D43] px-6 py-4 text-sm uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#CDEA68] hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <FaArrowUpLong className="rotate-45" />}
              </button>
            </form>
          </div>

          <div className="flex justify-between font-NueueMontreal text-sm text-zinc-400">
            <p>© 2026 Mohd Oun Zaidi.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
