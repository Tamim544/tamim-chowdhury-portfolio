"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Star, Code2, Terminal } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  homepage: string;
}

const ProjectCard = ({ repo }: { repo: Repo }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full min-h-[340px] w-full rounded-2xl bg-zinc-900/40 border border-white/5 p-8 glass flex flex-col justify-between group cursor-pointer hover:bg-zinc-800/60 transition-colors"
    >
      <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}>
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
            <Code2 size={24} />
          </div>
          <div className="flex gap-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
            >
              <Terminal size={20} />
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
          {repo.name.replace(/-/g, " ")}
        </h3>
        <p className="text-base text-zinc-400 line-clamp-3 leading-relaxed">
          {repo.description || "No description provided for this project."}
        </p>
      </div>

      <div style={{ transform: "translateZ(50px)" }} className="mt-4 flex flex-wrap gap-2">
        <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 font-medium">
          {repo.language || "Unknown"}
        </span>
        {repo.stargazers_count > 0 && (
          <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center gap-1">
            <Star size={12} fill="currentColor" /> {repo.stargazers_count}
          </span>
        )}
      </div>

      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

export default function Showcase() {
  const [activeTab, setActiveTab] = useState("projects");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/Tamim544/repos?sort=updated&per_page=30",
          { cache: "no-store" }
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          let validRepos = data.filter((r: any) => !r.fork);
          
          const privateRepos = [
            {
              id: 9000001,
              name: "Delhi-Pollution-Warning-System",
              description: "PM2.5 forecasting system using XGBoost & SHAP explanations for predictive modeling. (Private)",
              html_url: "#",
              stargazers_count: 0,
              language: "Python",
              homepage: ""
            },
            {
              id: 9000002,
              name: "Aura-RAG-Enterprise",
              description: "Document QA pipeline using LangChain, LangGraph, and automated agent flows. (Private)",
              html_url: "#",
              stargazers_count: 0,
              language: "Python",
              homepage: ""
            },
            {
              id: 9000003,
              name: "NutriMind-OS",
              description: "Hackathon Winner - Nutrition tracking app using Google Gemini API for visual QA. (Private)",
              html_url: "#",
              stargazers_count: 0,
              language: "TypeScript",
              homepage: ""
            },
            {
              id: 9000004,
              name: "Material-Properties-AI",
              description: "Predicts material properties from SMILES strings using advanced XGBoost models and RDKit. (Private)",
              html_url: "#",
              stargazers_count: 0,
              language: "Python",
              homepage: ""
            }
          ];

          validRepos = [...privateRepos, ...validRepos].map((r: any) => {
            if (r.name === "tamim-chowdhury-portfolio") {
              return {
                ...r,
                description: "🌌 High-end, immersive developer portfolio with 3D Canvas, orbital physics, and cinematic scroll"
              };
            }
            return r;
          });

          const priorityRepos = [
            "Delhi-Pollution-Warning-System",
            "Aura-RAG-Enterprise",
            "NutriMind-OS",
            "Material-Properties-AI",
            "Zuri-AI-Best-Friend-Assistant",
            "Face-recognition-api",
            "Safe-pass-",
            "Service-Booking-Apps",
            "tamim-chowdhury-portfolio"
          ];
          
          validRepos.sort((a, b) => {
            const indexA = priorityRepos.indexOf(a.name);
            const indexB = priorityRepos.indexOf(b.name);
            
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return 0;
          });
          
          setRepos(validRepos.slice(0, 9)); // Displaying 9 projects for a perfect 3x3 grid
        } else {
          setRepos([]);
        }
      } catch (err) {
        console.error("Failed to fetch repos", err);
      } finally {
        setLoadingRepos(false);
      }
    };
    fetchRepos();
  }, []);

  const TECH_STACK = [
    {
      name: "React",
      category: "Frontend",
      color: "text-cyan-400",
      bgHover: "hover:bg-cyan-500/10",
      borderHover: "hover:border-cyan-500/50",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
        </svg>
      ),
    },
    {
      name: "Next.js",
      category: "Fullstack",
      color: "text-white",
      bgHover: "hover:bg-white/10",
      borderHover: "hover:border-white/50",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.166 14.195l-3.32-4.996V16.2h-1.5V7.8h1.833l3.655 5.503V7.8h1.5v8.395h-2.168zM17.5 16.2h-1.5v-3.75h-2.25v-1.2h2.25v-2.25h1.5v2.25h2.25v1.2h-2.25v3.75z"/>
        </svg>
      ),
    },
    {
      name: "Python",
      category: "Backend / ML",
      color: "text-blue-400",
      bgHover: "hover:bg-blue-500/10",
      borderHover: "hover:border-blue-500/50",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.04 4.54c1.23 0 2.23.16 3.01.44.82.3 1.25.75 1.48 1.44l.02.08h-2.88v-1.13c0-.32-.23-.59-.57-.59H9.9c-.34 0-.58.27-.58.59v3.08h6.29c1.69 0 2.76.67 3.2 2.05.41 1.29.35 2.82-.16 4.14-1.29.35-2.85.5-4.6.5-1.76 0-3.32-.15-4.6-.5-.5-.11-1.02-.38-1.02-.9V12.7H5.56c-.5 0-.91-.41-.91-.91V7.95c0-1.84 1.34-3.41 3.19-3.41h4.2zm-2.73 2.1c-.42 0-.76.34-.76.76 0 .42.34.76.76.76.42 0 .76-.34.76-.76 0-.42-.34-.76-.76-.76zm5.34 6.75c.42 0 .76.34.76.76 0 .42-.34.76-.76.76-.42 0-.76-.34-.76-.76 0-.42.34-.76.76-.76z"/>
        </svg>
      ),
    },
    {
      name: "Tailwind CSS",
      category: "Styling",
      color: "text-cyan-300",
      bgHover: "hover:bg-cyan-400/10",
      borderHover: "hover:border-cyan-400/50",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 6c-2.4 0-4 1.6-4 4 0 1.6.8 2.8 2 3.6-1.2-.4-2-.8-2.4-1.6l-1.6 1.6C7.6 15.6 9.2 16 12 16c2.4 0 4-1.6 4-4 0-1.6-.8-2.8-2-3.6 1.2.4 2 .8 2.4 1.6l1.6-1.6C16.4 6.4 14.8 6 12 6zm-6 6c-2.4 0-4 1.6-4 4 0 1.6.8 2.8 2 3.6-1.2-.4-2-.8-2.4-1.6L0 19.6C1.6 21.6 3.2 22 6 22c2.4 0 4-1.6 4-4 0-1.6-.8-2.8-2-3.6 1.2.4 2 .8 2.4 1.6l1.6-1.6C10.4 12.4 8.8 12 6 12z"/>
        </svg>
      ),
    },
    {
      name: "Node.js",
      category: "Backend",
      color: "text-green-500",
      bgHover: "hover:bg-green-500/10",
      borderHover: "hover:border-green-500/50",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M11.8 1.4c-.4-.2-.8-.2-1.2 0L2.2 6c-.4.2-.6.7-.6 1.1v9.6c0 .4.2.9.6 1.1l8.4 4.8c.4.2.8.2 1.2 0l8.4-4.8c.4-.2.6-.7.6-1.1V7.1c0-.4-.2-.9-.6-1.1l-8.4-4.6zM12 21.3l-7.3-4.2V8.7l7.3 4.2v8.4zm.5-9.2l-7.3-4.2 7.3-4.2 7.3 4.2-7.3 4.2zm7.3 4.9l-7.3 4.2v-8.4l7.3-4.2v8.4z"/>
        </svg>
      ),
    },
    {
      name: "PostgreSQL",
      category: "Database",
      color: "text-blue-500",
      bgHover: "hover:bg-blue-600/10",
      borderHover: "hover:border-blue-600/50",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M21 16.5C21 16.5 19.5 21 12 21 4.5 21 3 16.5 3 16.5V7.5C3 7.5 4.5 3 12 3 19.5 3 21 7.5 21 7.5V16.5zM12 5.5C7.5 5.5 5 8 5 8v8s2.5 2.5 7 2.5 7-2.5 7-2.5V8s-2.5-2.5-7-2.5zM10.5 15h3v-1.5h-3V15zm0-3h3v-1.5h-3V12zm0-3h3V7.5h-3V9z"/>
        </svg>
      ),
    },
    {
      name: "TypeScript",
      category: "Language",
      color: "text-blue-400",
      bgHover: "hover:bg-blue-400/10",
      borderHover: "hover:border-blue-400/50",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M2 2h20v20H2z" fill="none"/>
          <path d="M12.2 15.6c0-1.8-1.5-2.2-3.1-2.6-1.5-.4-2-.8-2-1.4 0-.8.7-1.3 1.9-1.3 1.2 0 1.9.5 2.2 1.4l1.8-.7c-.5-1.5-1.8-2.4-4-2.4-2.4 0-4 1.3-4 3 0 1.8 1.5 2.2 3.1 2.6 1.4.3 2 .8 2 1.4 0 .9-.8 1.4-2 1.4-1.3 0-2.3-.6-2.7-1.7l-1.9.7c.7 1.8 2.2 2.8 4.6 2.8 2.5 0 4.1-1.3 4.1-3.2zm8.6-6.1h-5v9h2v-7.3h3v-1.7z"/>
        </svg>
      ),
    },
    {
      name: "Docker",
      category: "DevOps",
      color: "text-blue-500",
      bgHover: "hover:bg-blue-500/10",
      borderHover: "hover:border-blue-500/50",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M22 13.5c0-.9-.7-1.7-1.7-1.7h-1v-2.3c0-1.2-1-2.1-2.1-2.1h-3.4V4.9c0-.6-.5-1.1-1.1-1.1H9.9C9.3 3.8 8.8 4.3 8.8 4.9v2.5H5.4C4.3 7.4 3.3 8.3 3.3 9.5V11.8h-1C1.3 11.8.6 12.5.6 13.5c0 .9.7 1.6 1.7 1.6h.4v2.7c0 1.3 1 2.3 2.3 2.3h14c1.3 0 2.3-1 2.3-2.3v-2.7h.4c.9 0 1.7-.7 1.7-1.6zm-17.6.6c-.6 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.4 1-1 1zm4 0c-.6 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1zm4 0c-.6 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1zm4 0c-.6 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1z"/>
        </svg>
      ),
    },
    {
      name: "Java",
      category: "Language",
      color: "text-orange-500",
      bgHover: "hover:bg-orange-500/10",
      borderHover: "hover:border-orange-500/50",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
        </svg>
      )
    },
    {
      name: "FastAPI",
      category: "Backend",
      color: "text-teal-400",
      bgHover: "hover:bg-teal-500/10",
      borderHover: "hover:border-teal-500/50",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5l-6.5-3.25L12 3.5l6.5 2.75L12 9.5zM2 9.5v7l10 5 10-5v-7l-10 5-10-5z"/>
        </svg>
      )
    },
    {
      name: "Three.js",
      category: "3D / Visuals",
      color: "text-zinc-100",
      bgHover: "hover:bg-zinc-100/10",
      borderHover: "hover:border-zinc-100/50",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
          <line x1="12" y1="22" x2="12" y2="12" />
          <line x1="22" y1="8.5" x2="12" y2="12" />
          <line x1="2" y1="8.5" x2="12" y2="12" />
        </svg>
      )
    },
    {
      name: "XGBoost",
      category: "Machine Learning",
      color: "text-rose-500",
      bgHover: "hover:bg-rose-500/10",
      borderHover: "hover:border-rose-500/50",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5h-2v-4.3a6.5 6.5 0 0 1 2 0zm0-7a1.5 1.5 0 1 1-1.5-1.5A1.5 1.5 0 0 1 13 9.5z"/>
        </svg>
      )
    }
  ];


  return (
    <section id="showcase" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Interactive <span className="text-cyan-500 text-glow">Showcase</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Explore my recent creations, technical skills, and certifications.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 border-b border-zinc-800 pb-4 mb-12">
          {["projects", "certificates", "tech-stack"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 text-sm sm:text-base capitalize font-medium rounded-full transition-all ${
                activeTab === tab
                  ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "text-zinc-400 hover:text-white bg-zinc-900/50 border border-zinc-800/50"
              }`}
            >
              {tab.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Content Rendering */}
        <div className="min-h-[400px]">
          {activeTab === "projects" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {loadingRepos ? (
                <div className="w-full h-64 flex items-center justify-center">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {repos.length > 0 ? (
                    repos.map((repo) => <ProjectCard key={repo.id} repo={repo} />)
                  ) : (
                    <div className="col-span-full text-center w-full text-zinc-500 py-20">
                      No public repositories found.
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "certificates" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center h-48 group hover:border-cyan-500/30 transition-colors">
                <span className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">🛡️</span>
                <h4 className="text-lg font-bold text-white mb-2">Ethical Hacking</h4>
                <p className="text-sm text-zinc-500">Certificate of Completion</p>
              </div>
              <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center h-48 group hover:border-cyan-500/30 transition-colors">
                <span className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">💻</span>
                <h4 className="text-lg font-bold text-white mb-2">Haskell Mock</h4>
                <p className="text-sm text-zinc-500">Certificate of Completion</p>
              </div>
              <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center h-48 group hover:border-cyan-500/30 transition-colors">
                <span className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">🤖</span>
                <h4 className="text-lg font-bold text-white mb-2">AI Workshop</h4>
                <p className="text-sm text-zinc-500">Issued by IBM</p>
              </div>
              <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center h-48 group hover:border-cyan-500/30 transition-colors">
                <span className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">🌐</span>
                <h4 className="text-lg font-bold text-white mb-2">Web Development</h4>
                <p className="text-sm text-zinc-500">Issued by Coursera</p>
              </div>
            </motion.div>
          )}

          {activeTab === "tech-stack" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {TECH_STACK.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative overflow-hidden group p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm transition-all duration-300 ${tech.borderHover} ${tech.bgHover} flex flex-col items-center justify-center gap-4 cursor-pointer`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/0 via-zinc-800/0 to-zinc-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className={`relative z-10 p-4 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl group-hover:scale-110 transition-transform duration-500 ease-out ${tech.color}`}>
                    {tech.icon}
                  </div>
                  
                  <div className="relative z-10 text-center">
                    <h3 className={`font-bold tracking-wide ${tech.color}`}>
                      {tech.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-semibold">
                      {tech.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
