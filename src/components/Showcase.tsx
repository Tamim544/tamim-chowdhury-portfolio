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

          validRepos = [...privateRepos, ...validRepos];

          const priorityRepos = [
            "Delhi-Pollution-Warning-System",
            "Aura-RAG-Enterprise",
            "NutriMind-OS",
            "Material-Properties-AI",
            "Zuri-AI-Best-Friend-Assistant",
            "Face-recognition-api",
            "Safe-pass-",
            "Service-Booking-Apps",
            "Portfolio"
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
    { name: "Python", color: "text-blue-400", dot: "🔵" },
    { name: "React", color: "text-cyan-400", dot: "⚛️" },
    { name: "Next.js", color: "text-white", dot: "⬛" },
    { name: "Tailwind CSS", color: "text-cyan-300", dot: "🌊" },
    { name: "Node.js", color: "text-green-500", dot: "🟢" },
    { name: "PostgreSQL", color: "text-blue-500", dot: "🐘" },
    { name: "TypeScript", color: "text-blue-400", dot: "📘" },
    { name: "Docker", color: "text-blue-500", dot: "🐳" },
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
              className={`px-6 py-2 capitalize font-medium rounded-full transition-all ${
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {TECH_STACK.map((tech) => (
                <div
                  key={tech.name}
                  className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-cyan-500/50 hover:bg-zinc-800/80 transition-all cursor-default"
                >
                  <span className="text-3xl">{tech.dot}</span>
                  <span className={`font-semibold tracking-wide ${tech.color}`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
