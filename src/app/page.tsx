"use client";

import React, { Suspense, lazy } from "react";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { GithubIcon as Github, LinkedinIcon as Linkedin, InstagramIcon as Instagram } from "@/components/Icons";

// Lazy load components for better initial performance
const Hero = lazy(() => import("@/components/Hero"));
const About = lazy(() => import("@/components/About"));
const Showcase = lazy(() => import("@/components/Showcase"));
const Guestbook = lazy(() => import("@/components/Guestbook"));

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      
      <Suspense fallback={<Loading />}>
        <Hero />
        <About />
        <Showcase />
        <Guestbook />

        {/* Footer */}
        <footer className="py-12 border-t border-zinc-800 bg-zinc-950">
          <div className="container mx-auto px-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
              <span className="text-2xl font-heading font-black text-cyan-500">TC</span>
            </div>
            <h2 className="text-2xl font-heading font-bold mb-3 text-white">
              Ready to build the future?
            </h2>
            <p className="text-zinc-500 max-w-md mb-8 text-sm">
              Open for collaborations in Full Stack Development, ML Research, and Creative Technology.
            </p>
            <div className="flex gap-6">
              {[
                { icon: <Github size={20} />, url: "https://github.com/Tamim544", name: "GitHub" },
                { icon: <Linkedin size={20} />, url: "https://www.linkedin.com/in/tamim-chowdhury-546a47262", name: "LinkedIn" },
                { icon: <Instagram size={20} />, url: "https://www.instagram.com/tamimzenith", name: "Instagram" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-cyan-400 transition-colors hover:-translate-y-1"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="mt-12 text-xs text-zinc-600 font-mono">
              © {new Date().getFullYear()} Tamim Chowdhury. Built with Next.js & Tailwind CSS.
            </p>
          </div>
        </footer>
      </Suspense>
    </main>
  );
}
