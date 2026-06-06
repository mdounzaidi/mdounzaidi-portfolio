import React from "react";
import { FaArrowUpLong } from "react-icons/fa6";

function LoadingButton({ loading, children, className = "", ...props }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`flex w-full items-center justify-center gap-3 rounded-full bg-[#004D43] px-6 py-4 text-sm uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {loading ? "Please wait..." : children}
      {!loading && <FaArrowUpLong className="rotate-45" />}
    </button>
  );
}

export default LoadingButton;
