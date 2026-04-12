import React from "react";

function MobileSkills() {
  const skills = [
    "Java",
    "Spring Boot",
    "Microservices",
    "React",
    "REST APIs",
    "SQL",
    "Git",
    "Postman",
  ];

  return (
    <section className="bg-[#004D43] px-5 py-10 text-white sm:hidden">
  <div className="mx-auto max-w-md rounded-[2rem] border border-white/15 bg-[#0b2f29] p-6">

    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Core Stack
        </p>
        <h2 className="mt-3 font-FoundersGroteskCondensed text-5xl uppercase leading-none">
          Skills
        </h2>
        <p className="mt-4 text-sm leading-6 text-zinc-400">
          Technologies I use to build reliable backend systems and modern web
          experiences.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-zinc-700 px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MobileSkills;
