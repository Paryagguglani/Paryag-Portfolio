"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/projects";

interface ProjectSceneProps {
  selectedProjectId: string | null;
}

export default function ProjectScene({ selectedProjectId }: ProjectSceneProps) {
  const selected = projects.find((project) => project.id === selectedProjectId) ?? projects[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="grid gap-6 rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_30px_120px_-65px_rgba(79,70,229,0.55)] ring-1 ring-slate-100/5 md:grid-cols-[1fr_0.96fr]"
    >
      <div className="space-y-4">
        <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100 shadow-sm shadow-cyan-500/10">
          Live portfolio node
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">{selected.title}</h2>
          <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">{selected.overview}</p>
        </div>
        <div className="space-y-2 rounded-3xl bg-slate-900/70 p-4 text-sm text-slate-300 ring-1 ring-white/5">
          <div className="font-semibold text-slate-100">Problem</div>
          <p>{selected.problem}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-3xl bg-zinc-950/80 p-5 text-sm text-slate-200 ring-1 ring-white/5">
          <div className="mb-3 font-semibold text-slate-100">Solution</div>
          <p className="leading-7 text-slate-300">{selected.solution}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-900/80 p-4 ring-1 ring-white/5">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Tech stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {selected.tech.map((item) => (
                <span key={item} className="rounded-2xl bg-slate-800/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-200 shadow-sm shadow-slate-950/20">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-slate-900/80 p-4 ring-1 ring-white/5">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Impact</p>
            <p className="mt-3 text-slate-300 leading-7">{selected.impact}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
