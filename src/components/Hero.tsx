"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FloatingIDCard from "./FloatingIDCard";
import Marquee from "./Marquee";

export default function Hero() {
  const basePath = process.env.NODE_ENV === 'production' ? '/tamim-chowdhury-portfolio' : '';
  const { scrollYProgress } = useScroll();

  // Vanish effect as we scroll down: fade out and slightly scale up
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const filter = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["blur(0px)", "blur(10px)"],
    { clamp: true }
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col pt-24 lg:pt-32 overflow-hidden">
      
      {/* Background Accent Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        style={{ opacity, scale, filter: isMobile ? "none" : filter }}
        className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 w-full flex-grow mb-12"
      >
        {/* Left Side: Information */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col space-y-6 lg:justify-center items-start h-full"
        >
          <motion.h2
            variants={item}
            className="text-cyan-500 font-heading font-bold tracking-widest uppercase text-xs sm:text-sm"
          >
            Creative Technologist
          </motion.h2>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl font-heading font-black leading-tight tracking-tight uppercase"
          >
            WELCOME TO MY <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              PORTFOLIO
            </span>
          </motion.h1>

          <motion.div variants={item} className="flex flex-col space-y-4">
            <p className="text-xl sm:text-2xl text-zinc-300 font-medium">
              <span className="inline-block border-r-2 border-cyan-500 pr-2 animate-pulse">
                Front-End / Full-Stack Developer
              </span>
            </p>
            <p className="max-w-md text-zinc-400 leading-relaxed text-sm sm:text-base">
              B.Tech CSE student at **IIIT-Delhi**, ICCR Scholar. 
              Specializing in building sleek, modern web experiences with Next.js and Tailwind.
            </p>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 uppercase tracking-wide text-sm"
            >
              View Projects
            </button>
            <a
              href={`${basePath}/CV_Tamim_Chowdhury.pdf`}
              download="CV_Tamim_Chowdhury.pdf"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-zinc-700 bg-zinc-900/50 text-white font-bold hover:bg-zinc-800 transition-all flex items-center justify-center hover:scale-105 active:scale-95 uppercase tracking-wide text-sm"
            >
              Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Floating ID Card */}
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 }}
          className="relative w-full flex items-center justify-center lg:justify-end"
        >
          <FloatingIDCard />
        </motion.div>
      </motion.div>

      {/* Infinite Marquee positioned at the bottom of the hero fold */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="w-full relative z-20"
      >
        <Marquee />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-zinc-500 animate-bounce cursor-pointer group z-30 hidden lg:flex"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] mb-2 group-hover:text-cyan-400 transition-colors">
          Scroll Down
        </span>
        <ChevronDown size={18} className="group-hover:text-cyan-400 transition-colors" />
      </motion.div>
    </section>
  );
}
