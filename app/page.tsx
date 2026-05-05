"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import emailjs from "@emailjs/browser";

const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });
const ProjectScene = dynamic(() => import("@/components/ProjectScene"), { ssr: false });
const SkillGraph = dynamic(() => import("@/components/SkillGraph"), { ssr: false });
const SkillHeatmap = dynamic(() => import("@/components/SkillHeatmap"), { ssr: false });
const AIChatbot = dynamic(() => import("@/components/AIChatbot"), { ssr: false });
const ExperienceTimeline = dynamic(() => import("@/components/ExperienceTimeline"), { ssr: false });

const certifications = [
  {
    title: "Microsoft Copilot for Azure SQL Database",
    issuer: "LinkedIn Learning",
    year: "2026",
    description: "Verified training on Azure SQL Database automation and Copilot integration for intelligent data workflows.",
    link: "/certificates/linkedin-learning-certificate.pdf",
  },
  {
    title: "Essentials of Prompt Engineering",
    issuer: "AWS",
    year: "2026",
    description: "Certification covering prompt design best practices for reliable generative AI results.",
    link: "/certificates/prompt-engineering-certificate.pdf",
  },
  {
    title: "Fundamentals of ML & AI",
    issuer: "AWS",
    year: "2026",
    description: "Core machine learning and AI fundamentals certification focused on model development and deployment.",
    link: "/certificates/mlandai-certificate-amazon.pdf",
  },
  {
    title: "Intro to Generative AI Studio",
    issuer: "Google Cloud",
    year: "2026",
    description: "Introductory certification for Google Cloud's Generative AI Studio and production-ready workflows.",
    link: "/certificates/6757-10137783.pdf",
  },
  {
    title: "Hackathons & Innovation Programs",
    issuer: "Smart India Hackathon / Tech Sangam 2.0",
    year: "2024-2025",
    description: "Participation record for Smart India Hackathon 2024, 2025 and Tech Sangam 2.0 innovation programs.",
    link: "/certificates/paryag-guglani-simplilearn-certificates.pdf",
  },
];

export default function Home() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);
  const [selectedCertification, setSelectedCertification] = useState<string | null>(null);
  const [uploadedCertificates, setUploadedCertificates] = useState<Array<{ name: string; type: string; url: string }>>([]);
  const [selectedUploadedFileUrl, setSelectedUploadedFileUrl] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const selectedProject = projects.find((project) => project.id === selectedProjectId) || projects[0];
  const activeCertification = certifications.find((cert) => cert.title === selectedCertification) || null;
  const activeUploadedFile = uploadedCertificates.find((file) => file.url === selectedUploadedFileUrl) || null;

  useEffect(() => {
    return () => {
      uploadedCertificates.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [uploadedCertificates]);

  const handleCertificateUpload = (event: { target: HTMLInputElement }) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files).map((file) => ({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
    }));

    setUploadedCertificates((prev) => [...prev, ...newFiles]);
    setSelectedUploadedFileUrl(newFiles[0].url);
    event.target.value = "";
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      await emailjs.send(
        "service_zujymz7",
        "template_4z1calm",
        {
          from_name: name,
          from_email: email,
          message: message,
          to_email: "guglaniparyag15@gmail.com",
        },
        "-QxcCG-J_iHrS62PD"
      );
      setFormStatus("success");
      form.reset();
    } catch (error) {
      console.error("Email send failed:", error);
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_25%),radial-gradient(circle_at_80%_10%,_rgba(168,85,247,0.12),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#090c15_100%)] text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <header className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200 shadow-[0_0_50px_rgba(34,211,238,0.12)] backdrop-blur-sm">
              Personal Portfolio
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Hi, I'm Paryag Guglani
              </h1>
              <p className="text-lg font-medium text-slate-400">B.Tech in CSE (AI &ML) | GD Goenka University</p>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Building Intelligent Systems That Solve Real Problems. AI/ML and Full Stack Developer passionate about creating impactful solutions.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <a
                href="/resume.pdf"
                download="Paryag-Guglani-Resume.pdf"
                className="rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Download Resume
              </a>
              <button
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="rounded-full border border-cyan-400 bg-cyan-500/10 px-6 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
              >
                Contact me
              </button>
            </div>
          </div>
          <div className="grid gap-3 text-sm sm:text-right">
            <div className="rounded-3xl bg-slate-900/80 px-5 py-4 ring-1 ring-white/5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Role</p>
              <p className="mt-2 text-xl font-semibold text-white">AI/ML + Full Stack Developer</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 px-5 py-4 ring-1 ring-white/5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Leadership</p>
              <p className="mt-2 text-xl font-semibold text-white">Hackathon & Innovation Lead</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 px-5 py-4 ring-1 ring-white/5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Location</p>
              <p className="mt-2 text-xl font-semibold text-white">Gurugram, India</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 px-5 py-4 ring-1 ring-white/5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Contact</p>
              <p className="mt-2 text-lg font-semibold text-white">Guglaniparyag15@gmail.com</p>
              <p className="text-sm text-slate-300">+917496877850</p>
            </div>
            <div className="flex gap-3">
              <a href="https://github.com/paryagguglani" target="_blank" rel="noreferrer" className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/paryag-guglani-672425291/" target="_blank" rel="noreferrer" className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
                LinkedIn
              </a>
            </div>
          </div>
        </header>

        <section className="mb-12 rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/10 ring-1 ring-white/5">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Leadership</p>
            <h2 className="text-3xl font-semibold text-white">Leadership achievements and innovation impact.</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-900/75 p-5 ring-1 ring-white/5">
              <p className="text-sm text-cyan-300">SIH 2024</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">Built an NLP-based resume scoring AI system that evaluates resumes, generates skill scores, and recommends learning pathways.</p>
            </div>
            <div className="rounded-3xl bg-slate-900/75 p-5 ring-1 ring-white/5">
              <p className="text-sm text-cyan-300">SIH 2025</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">Conceptualized an IoT-powered smart assistive device designed to improve mobility, safety, and independence for users.</p>
            </div>
            <div className="rounded-3xl bg-slate-900/75 p-5 ring-1 ring-white/5">
              <p className="text-sm text-cyan-300">Tech Sangam 2.0</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">Collaborated in a national-level innovation ecosystem, contributing to rapid prototyping and scalable solution design.</p>
            </div>
          </div>
        </section>

        <main className="space-y-16">
          <section className="grid gap-8 xl:grid-cols-[0.98fr_1.02fr]">
            <div className="space-y-6">
              <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-cyan-500/10 ring-1 ring-white/5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Interactive workspace</p>
                    <h2 className="mt-4 text-3xl font-semibold text-white">AI Developer Workspace</h2>
                  </div>
                  <div className="rounded-3xl bg-slate-900/90 px-4 py-3 text-sm text-slate-300 ring-1 ring-white/10">
                    Click a holographic node to preview projects
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl bg-slate-900/70 p-5 ring-1 ring-white/5">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Scope</p>
                    <p className="mt-3 text-lg font-semibold text-white">AI systems + full stack</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/70 p-5 ring-1 ring-white/5">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Focus</p>
                    <p className="mt-3 text-lg font-semibold text-white">Real-world impact</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/70 p-5 ring-1 ring-white/5">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Style</p>
                    <p className="mt-3 text-lg font-semibold text-white">Interactive & performant</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-indigo-500/10 ring-1 ring-white/5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-900/70 p-5 ring-1 ring-white/5">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Core expertise</p>
                    <p className="mt-3 text-lg font-semibold text-white">Python, C++, JavaScript, React, Flask, Azure SQL</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/70 p-5 ring-1 ring-white/5">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Experience</p>
                    <p className="mt-3 text-lg font-semibold text-white">NLP, Computer Vision, Real-time systems, Team leadership</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <Suspense fallback={<div className="flex h-[560px] items-center justify-center rounded-[32px] bg-slate-900/80 text-slate-300">Loading interactive workspace...</div>}>
                <Hero3D onSelectProject={setSelectedProjectId} />
              </Suspense>
              <div className="rounded-[32px] border border-white/10 bg-slate-950/90 p-6 ring-1 ring-white/5 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Selected node</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{selectedProject.title}</h3>
                <p className="mt-3 text-slate-300">{selectedProject.overview}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {selectedProject.tech.map((item) => (
                    <span key={item} className="rounded-full bg-slate-900/80 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-200 ring-1 ring-white/10">
                      {item}
                    </span>
                  ))}
                </div>
                {selectedProject.demo ? (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    View live demo
                  </a>
                ) : null}
              </div>
            </div>
          </section>

          <section id="projects" className="space-y-8">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Projects</p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Key Projects & Innovations</h2>
            </div>
            <ProjectScene selectedProjectId={selectedProjectId} />
            <div className="grid gap-6 xl:grid-cols-3">
              {projects.map((project) => (
                <motion.article
                  key={project.id}
                  whileHover={{ y: -6 }}
                  className="group rounded-[32px] border border-white/10 bg-slate-950/75 p-6 ring-1 ring-white/5 transition-shadow duration-300 hover:shadow-[0_30px_90px_-45px_rgba(56,189,248,0.45)]"
                >
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-2 text-xs uppercase tracking-[0.32em] text-slate-400">
                    {project.id === selectedProjectId ? "Active" : "Explore"}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{project.overview}</p>
                  <div className="mt-4 space-y-3 text-sm text-slate-300">
                    <div>
                      <span className="font-semibold text-slate-100">Problem: </span>
                      {project.problem}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-100">Impact: </span>
                      {project.impact}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProjectId(project.id)}
                    className="mt-6 inline-flex items-center rounded-3xl bg-white/10 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-cyan-500/15"
                  >
                    Open details
                  </button>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Skills</p>
                <h2 className="text-3xl font-semibold text-white">My technical toolkit.</h2>
                <p className="max-w-2xl text-slate-300">A blend of AI/ML expertise and full-stack development skills that I use to build intelligent systems.</p>
              </div>
              <Suspense fallback={<div className="flex h-[360px] items-center justify-center rounded-[32px] bg-slate-900/80 text-slate-300">Loading skills visualizer...</div>}>
                <SkillGraph />
              </Suspense>
            </div>
            <Suspense fallback={<div className="flex min-h-[440px] items-center justify-center rounded-[32px] bg-slate-900/80 text-slate-300">Loading heatmap...</div>}>
              <SkillHeatmap />
            </Suspense>
          </section>

          <section className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Experience</p>
                <h2 className="text-3xl font-semibold text-white">My journey so far.</h2>
              </div>
              <Suspense fallback={<div className="flex min-h-[420px] items-center justify-center rounded-[32px] bg-slate-900/80 text-slate-300">Loading timeline...</div>}>
                <ExperienceTimeline />
              </Suspense>
            </div>
            <Suspense fallback={<div className="flex min-h-[420px] items-center justify-center rounded-[32px] bg-slate-900/80 text-slate-300">Loading bot...</div>}>
              <AIChatbot />
            </Suspense>
          </section>

          <section id="leadership" className="space-y-8 rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/10 ring-1 ring-white/5">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Leadership</p>
              <h2 className="text-3xl font-semibold text-white">What I build and lead.</h2>
              <p className="max-w-3xl text-slate-300">I deliver innovation through team-led AI systems, assistive IoT devices, and collaboration in national-level tech ecosystems.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl bg-slate-900/75 p-6 ring-1 ring-white/5">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">🏆 Smart India Hackathon 2024</p>
                <p className="mt-4 text-slate-300">✅ Designed an AI-powered Smart Competency & Profile Scoring System that analyzes resumes using NLP, generates a quantified skill score, and recommends personalized learning resources to improve industry readiness.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/75 p-6 ring-1 ring-white/5">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">🏆 Smart India Hackathon 2025</p>
                <p className="mt-4 text-slate-300">✅ Engineered the concept of a Smart Crutch (IoT-based assistive device) integrating sensors and real-time feedback mechanisms to enhance mobility, safety, and independence for physically challenged individuals.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/75 p-6 ring-1 ring-white/5">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">🌐 Tech Sangam 2.0</p>
                <p className="mt-4 text-slate-300">✅ Collaborated in a national-level innovation environment, contributing to rapid prototyping and problem-solving alongside developers, while exploring scalable solutions using modern technologies.</p>
              </div>
            </div>
          </section>

          <section id="certifications" className="space-y-8 rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/10 ring-1 ring-white/5">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Certifications</p>
              <h2 className="text-3xl font-semibold text-white">Verified upskilling and industry credentials.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert) => (
                <button
                  key={cert.title}
                  type="button"
                  onClick={() => setSelectedCertification(cert.title)}
                  className="group rounded-3xl bg-slate-900/75 p-6 ring-1 ring-white/5 text-left transition hover:bg-cyan-500/10"
                >
                  <p className="text-lg font-semibold text-white">{cert.title}</p>
                  <p className="mt-2 text-sm text-slate-400">{cert.issuer} ({cert.year})</p>
                  <span className="mt-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs uppercase tracking-[0.32em] text-cyan-200 transition group-hover:bg-cyan-400/15">
                    Tap to preview
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-6 space-y-5">
              <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 ring-1 ring-white/10">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Upload certificates</p>
                    <p className="mt-2 text-sm text-slate-400">Upload certificate image or PDF files to preview them directly on this page.</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    multiple
                    onChange={handleCertificateUpload}
                    className="mt-4 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950 sm:mt-0 sm:w-auto"
                  />
                </div>
              </div>

              <div className="rounded-[28px] border border-cyan-500/10 bg-slate-900/80 p-6 ring-1 ring-cyan-300/10">
                {activeCertification ? (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Preview</p>
                        <h3 className="mt-3 text-2xl font-semibold text-white">{activeCertification.title}</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedCertification(null)}
                        className="rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                      >
                        Close
                      </button>
                    </div>
                    <p className="text-sm leading-7 text-slate-300">{activeCertification.description}</p>
                    <p className="text-sm text-slate-400">{activeCertification.issuer} • {activeCertification.year}</p>                  {activeCertification.link ? (
                    <a
                      href={activeCertification.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex rounded-3xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      View Certificate
                    </a>
                  ) : null}                  </div>
                ) : (
                  <p className="text-sm text-slate-400">Tap a certificate name to open its details on screen.</p>
                )}
              </div>

              <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 ring-1 ring-white/10">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Uploaded files</p>
                    <p className="mt-2 text-sm text-slate-400">Click a file to preview it below.</p>
                  </div>
                  {uploadedCertificates.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => {
                        uploadedCertificates.forEach((file) => URL.revokeObjectURL(file.url));
                        setUploadedCertificates([]);
                        setSelectedUploadedFileUrl(null);
                      }}
                      className="rounded-3xl bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                    >
                      Clear uploads
                    </button>
                  ) : null}
                </div>

                {uploadedCertificates.length > 0 ? (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {uploadedCertificates.map((file) => (
                      <button
                        key={file.url}
                        type="button"
                        onClick={() => setSelectedUploadedFileUrl(file.url)}
                        className={`rounded-3xl border px-4 py-3 text-left transition ${
                          selectedUploadedFileUrl === file.url ? "border-cyan-400 bg-cyan-500/10" : "border-white/10 bg-slate-950/70"
                        }`}
                      >
                        <p className="text-sm font-semibold text-white">{file.name}</p>
                        <p className="mt-1 text-xs text-slate-400">{file.type || "Uploaded file"}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-400">No certificate files uploaded yet.</p>
                )}

                {activeUploadedFile ? (
                  <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">File preview</p>
                    <p className="mt-2 text-sm text-slate-400">{activeUploadedFile.name}</p>
                    {activeUploadedFile.type.startsWith("image/") ? (
                      <img src={activeUploadedFile.url} alt={activeUploadedFile.name} className="mt-4 w-full rounded-3xl border border-white/10 object-contain" />
                    ) : (
                      <div className="mt-4 rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-300">
                        PDF preview is not available in this view, but the file has been uploaded successfully.
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section id="contact" className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-4 rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/10 ring-1 ring-white/5">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Contact</p>
              <h2 className="text-3xl font-semibold text-white">Let's connect</h2>
              <p className="max-w-2xl text-slate-300">I'm always open to discussing new opportunities, collaborations, or just chatting about AI and tech. Feel free to reach out!</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/75 p-5 ring-1 ring-white/5">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">GitHub</p>
                  <a href="https://github.com/paryagguglani" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center justify-center rounded-3xl bg-slate-800/80 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700">
                    GitHub
                  </a>
                </div>
                <div className="rounded-3xl bg-slate-900/75 p-5 ring-1 ring-white/5">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">LinkedIn</p>
                  <a href="https://www.linkedin.com/in/paryag-guglani-672425291/" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center justify-center rounded-3xl bg-slate-800/80 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/10 ring-1 ring-white/5">
              <form className="space-y-5" onSubmit={handleContactSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-200">
                    Name
                  </label>
                  <input id="name" name="name" type="text" placeholder="Your name" required className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-cyan-400 focus:ring-cyan-400/30" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-200">
                    Email
                  </label>
                  <input id="email" name="email" type="email" placeholder="your.email@example.com" required className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-cyan-400 focus:ring-cyan-400/30" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-200">
                    Message
                  </label>
                  <textarea id="message" name="message" rows={5} placeholder="Tell me about your project or idea..." required className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:border-cyan-400 focus:ring-cyan-400/30" />
                </div>
                {formStatus === "success" && (
                  <p className="text-sm text-green-400">Message sent successfully! I'll get back to you soon.</p>
                )}
                {formStatus === "error" && (
                  <p className="text-sm text-red-400">Failed to send message. Please try again or contact me directly.</p>
                )}
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="inline-flex h-12 items-center justify-center rounded-3xl bg-cyan-500 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === "sending" ? "Sending..." : "Send message"}
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
