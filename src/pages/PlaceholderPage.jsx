import React from "react";

function PlaceholderPage({ title, message }) {
  return (
    <section className="rounded-[2rem] border border-zinc-800 bg-[#1d1f1e] p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
        Coming Next
      </p>
      <h2 className="mt-3 font-FoundersGroteskCondensed text-5xl uppercase leading-none">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-400">
        {message}
      </p>
    </section>
  );
}

export default PlaceholderPage;
