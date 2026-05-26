import React from "react";

export default function Marquee() {
  return (
    <div className="w-full overflow-x-hidden bg-cyan-500 py-3 text-black font-black uppercase tracking-wider text-xl rotate-[-1deg] my-12 border-y border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
      <div className="flex w-[200%] animate-marquee whitespace-nowrap gap-4">
        {Array(10)
          .fill("FULL-STACK DEVELOPER • WEB DEVELOPMENT • MACHINE LEARNING • JAVA • DATABASES • AI • ")
          .map((text, idx) => (
            <span key={idx}>{text}</span>
          ))}
      </div>
    </div>
  );
}
