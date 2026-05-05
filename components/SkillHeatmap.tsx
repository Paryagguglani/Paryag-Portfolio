"use client";

import { useState } from "react";
import { skillCategories } from "@/lib/skills";

export default function SkillHeatmap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="rounded-[32px] border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-blue-500/10 ring-1 ring-white/5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Skill heatmap</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-50">Interactive capability grid</h3>
        </div>
        <div className="rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">Hover for strength</div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {skillCategories.map((category) => (
          <div key={category.title} className="rounded-3xl bg-slate-900/80 p-4 ring-1 ring-white/5">
            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-slate-400">{category.title}</p>
            <div className="grid gap-3">
              {category.skills.map((skill) => {
                const intensity = active === skill.name ? "bg-cyan-500/90 text-slate-950" : skill.intensity;
                return (
                  <button
                    key={skill.name}
                    onMouseEnter={() => setActive(skill.name)}
                    onMouseLeave={() => setActive(null)}
                    className={`rounded-3xl px-4 py-3 text-left text-sm font-medium transition ${intensity} shadow-sm shadow-slate-950/20`}
                  >
                    <span className="block font-semibold text-slate-100">{skill.name}</span>
                    <span className="text-xs text-slate-300">{skill.detail}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
