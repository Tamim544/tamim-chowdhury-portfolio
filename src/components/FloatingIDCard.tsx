"use client";

import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function FloatingIDCard() {
  // Motion values to track mouse position relative to the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse position to degree rotations (-15 to 15 degrees)
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to the center of the card
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;

    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    // Smoothly snap back to center when mouse leaves
    x.set(0);
    y.set(0);
  }

  return (
    <div className="flex items-center justify-center p-8 [perspective:1000px]">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-72 h-96 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md cursor-pointer group"
      >
        {/* Neon Accent Glow Border on Hover */}
        <div className="absolute inset-0 rounded-2xl border border-cyan-500/0 group-hover:border-cyan-500/30 transition-colors duration-500 pointer-events-none" />

        {/* Card Content Top String/Clip Holder Visual */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 w-16 h-4 bg-zinc-800 rounded-b-md border-b border-zinc-700" />

        {/* Card Body Container */}
        <div
          className="flex flex-col h-full justify-between items-center pt-4"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* Avatar Area */}
          <div className="w-28 h-28 rounded-xl bg-zinc-800 border-2 border-zinc-700 overflow-hidden relative group-hover:border-cyan-400 transition-colors duration-300 shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent z-10" />
            <img
              src="/your-avatar.jpg"
              alt="Profile"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Name & Title */}
          <div className="text-center mt-4">
            <h3 className="text-xl font-bold text-white tracking-wide uppercase">
              Tamim Chowdhury
            </h3>
            <p className="text-xs font-semibold text-cyan-400 tracking-widest mt-1 uppercase">
              Developer / Designer
            </p>
          </div>

          {/* Minimalist Grid Data / Barcode Visual */}
          <div className="w-full bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-3 text-[10px] font-mono text-zinc-400 space-y-1">
            <div className="flex justify-between">
              <span>LOC:</span>
              <span className="text-zinc-200">IIIT-DELHI</span>
            </div>
            <div className="flex justify-between">
              <span>DEPT:</span>
              <span className="text-zinc-200">CSE</span>
            </div>
            <div className="flex justify-between">
              <span>STATUS:</span>
              <span className="text-emerald-400 animate-pulse">● ONLINE</span>
            </div>
          </div>

          {/* Bottom Barcode Decorative Element */}
          <div className="w-full h-8 opacity-40 group-hover:opacity-70 transition-opacity bg-[linear-gradient(90deg,#fff_2px,transparent_2px)] bg-[size:6px_100%] filter invert mix-blend-screen" />
        </div>
      </motion.div>
    </div>
  );
}
