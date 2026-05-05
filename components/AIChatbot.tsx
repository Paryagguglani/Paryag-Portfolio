"use client";

import { useState } from "react";

const portfolioKnowledge = {
  skills: {
    keywords: ["skill", "expertise", "tech", "technology", "language", "tool", "competency"],
    response: `I'm proficient in:\n\n🔹 Languages: Python, C++, JavaScript, TypeScript\n🔹 Frontend: React, Next.js, Tailwind CSS, Three.js\n🔹 Backend: Flask, Node.js, Azure SQL\n🔹 AI/ML: NLP, Computer Vision, TensorFlow, Scikit-learn\n🔹 Specialization: Real-time systems, team leadership, AI product development`,
  },
  certificates: {
    keywords: ["certificate", "certification", "credential", "qualified", "certified", "training"],
    response: `My certifications include:\n\n📜 Microsoft Copilot for Azure SQL Database (LinkedIn Learning)\n📜 Essentials of Prompt Engineering (AWS)\n📜 Fundamentals of ML & AI (AWS)\n📜 Intro to Generative AI Studio (Google Cloud)\n📜 Smart India Hackathon (2024, 2025)\n📜 Tech Sangam 2.0 (2025)\n\nAll certificates are available in the Certifications section with direct links to PDFs.`,
  },
  projects: {
    keywords: ["project", "work", "portfolio", "innovation", "built", "developed", "created"],
    response: `My key projects include:\n\n🚀 AI Student Portal - Flask + React NLP for plagiarism detection\n🚀 Smart Resume Scoring System - NLP-based resume analysis (SIH 2024)\n🚀 Smart Crutch IoT Device - IoT assistive device for mobility (SIH 2025)\n🚀 3D Interactive Portfolio - React Three Fiber real-time visualization\n\nEach project demonstrates AI systems, full-stack development, and real-world impact.`,
  },
  aboutMe: {
    keywords: ["about", "who", "tell me", "introduce", "background", "experience"],
    response: `I'm Paryag Guglani, an AI/ML and Full Stack Developer based in Gurugram, India.\n\n🎯 Focus: Building intelligent systems that solve real-world problems\n🎯 Expertise: NLP, Computer Vision, Real-time systems, Team leadership\n🎯 Leadership: Led Smart India Hackathon teams and contributed to Tech Sangam 2.0\n🎯 Passion: Creating impactful solutions that enhance user experience\n\nLet's collaborate on AI-driven innovation!`,
  },
  default: "I can answer questions about my skills, certificates, projects, and background. What would you like to know?",
};

export default function AIChatbot() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([
    { role: "assistant", text: "Hi! Ask me about my skills, certificates, projects, or anything about my background. 🚀" },
  ]);
  const [input, setInput] = useState("");

  const getResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    for (const [category, data] of Object.entries(portfolioKnowledge)) {
      if (category === "default") continue;
      if (typeof data === "object" && "keywords" in data && data.keywords.some((kw) => lowerInput.includes(kw))) {
        return data.response;
      }
    }

    return portfolioKnowledge.default;
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim()) return;

    const reply = getResponse(input);
    setMessages((current) => [
      ...current,
      { role: "user", text: input.trim() },
      { role: "assistant", text: reply },
    ]);
    setInput("");
  }

  return (
    <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-5 shadow-2xl shadow-fuchsia-500/10 ring-1 ring-white/5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">AI assistant</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-50">Portfolio assistant</h3>
        </div>
        <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">Live answers</span>
      </div>
      <div className="space-y-3 rounded-3xl bg-slate-900/70 p-4 ring-1 ring-white/5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`rounded-3xl px-4 py-3 ${
              message.role === "assistant" ? "bg-slate-800/80 text-slate-200" : "bg-cyan-500/10 text-cyan-100"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{message.role}</p>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-6">{message.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="assistant-input">
          Ask a question
        </label>
        <input
          id="assistant-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about skills, certificates, projects..."
          className="min-w-0 flex-1 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:border-cyan-400 focus:ring-cyan-400/30"
        />
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-3xl bg-cyan-500 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Send
        </button>
      </form>
    </div>
  );
}
