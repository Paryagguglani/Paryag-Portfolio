"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    title: "Smart India Hackathon",
    role: "Team Lead",
    period: "2024–2025",
    description: "Led a high-performing team to architect an AI product demo, manage sprint delivery, and integrate computer vision with cloud-backed workflows.",
  },
  {
    title: "AI Student Portal",
    role: "Full Stack AI Developer",
    period: "2024",
    description: "Productized NLP and academic integrity features across Flask, React, and Azure SQL for a polished student-facing portal.",
  },
  {
    title: "Deepfake Detection System",
    role: "Computer Vision Engineer",
    period: "2023",
    description: "Implemented image-level detection models and OpenCV pipelines for safety monitoring in multimedia environments.",
  },
];

export default function ExperienceTimeline() {
  return (
    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-slate-950/20 ring-1 ring-white/5">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Leadership & delivery</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-50">Career timeline</h3>
        </div>
        <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">Impact-first roles</span>
      </div>
      <div className="space-y-6">
        {milestones.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 ring-1 ring-white/5"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-100">{item.title}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.22em] text-slate-400">{item.role}</p>
              </div>
              <p className="rounded-full bg-slate-800/90 px-3 py-1 text-sm text-slate-300">{item.period}</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
