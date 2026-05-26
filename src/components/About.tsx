"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GithubIcon as Github, LinkedinIcon as Linkedin, InstagramIcon as Instagram, TwitterIcon as Twitter } from "@/components/Icons";

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const stats = [
    { label: "Total Projects", value: "20+", desc: "Open source & private" },
    { label: "Certificates", value: "4", desc: "Security, AI & Web Dev" },
    { label: "Experience", value: "3 Yrs", desc: "Building full-stack apps" },
    { label: "Technologies", value: "10+", desc: "Languages & Frameworks" },
  ];

  return (
    <section id="about" ref={containerRef} className="py-24 relative overflow-hidden bg-zinc-950/80">
      <motion.div
        style={{ opacity, y }}
        className="container mx-auto px-6 max-w-6xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Bio & Socials */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white uppercase tracking-tight">
                About <span className="text-cyan-500">Me</span>
              </h2>
              <div className="w-20 h-1 bg-cyan-500 mb-8 rounded-full" />
              <p className="text-lg text-zinc-400 leading-relaxed font-light">
                A Computer Science undergraduate student specializing in <span className="text-white font-medium">Full-Stack Web Development, Agentic AI, and Explainable Machine Learning</span>. Experienced in architecting scalable web applications (React, Next.js, Node.js, FastAPI) and integrating them with autonomous multi-agent platforms (LangGraph, Vertex AI, Google ADK).
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed mt-4 font-light">
                Proficient in building robust backend systems (PostgreSQL, REST APIs) and explainable ML models (XGBoost, SHAP) for scientific forecasting (RDKit). Passionate about developing immersive 3D interfaces (Three.js) and intelligent platforms that combine complex backend AI engineering with seamless frontend user experiences.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">Connect</h3>
              <div className="flex gap-4">
                {[
                  { icon: <Github size={20} />, url: "https://github.com/Tamim544", name: "GitHub" },
                  { icon: <Linkedin size={20} />, url: "https://www.linkedin.com/in/tamim-chowdhury-546a47262", name: "LinkedIn" },
                  { icon: <Instagram size={20} />, url: "https://www.instagram.com/tamimzenith", name: "Instagram" },
                  { icon: <Twitter size={20} />, url: "https://x.com/tzenith61?s=21", name: "Twitter" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all hover:-translate-y-1"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-cyan-500/30 transition-colors group"
              >
                <h3 className="text-4xl font-black text-white group-hover:text-cyan-400 transition-colors mb-2">
                  {stat.value}
                </h3>
                <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  {stat.label}
                </h4>
                <p className="text-xs text-zinc-500 font-medium">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
      
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
    </section>
  );
}
