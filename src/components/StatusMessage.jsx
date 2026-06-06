import React from "react";

function StatusMessage({ type = "info", message }) {
  if (!message) return null;

  const styles = {
    error: "border-red-400/30 bg-red-950/40 text-red-100",
    success: "border-emerald-400/30 bg-emerald-950/40 text-emerald-100",
    info: "border-zinc-700 bg-zinc-950 text-zinc-200",
  };

  return (
    <div className={`rounded-2xl border px-5 py-4 text-sm leading-6 ${styles[type]}`}>
      {message}
    </div>
  );
}

export default StatusMessage;
