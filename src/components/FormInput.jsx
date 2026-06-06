import React from "react";

function FormInput({ label, error, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-zinc-500">
          {label}
        </span>
      )}
      <input
        {...props}
        className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-[#004D43]"
      />
      {error && <span className="mt-2 block text-sm text-red-300">{error}</span>}
    </label>
  );
}

export default FormInput;
