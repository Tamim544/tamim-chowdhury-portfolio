"use client";

import React, { useState } from "react";
import { X, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const basePath = process.env.NODE_ENV === 'production' ? '/tamim-chowdhury-portfolio' : '';

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 backdrop-blur-md bg-zinc-950/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={`${basePath}/your-avatar.jpg`} 
              alt="Tamim Chowdhury" 
              className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)] hover:border-cyan-400 transition-colors cursor-pointer" 
            />
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
            <a href="#guestbook" className="hover:text-white transition-colors">Guestbook</a>
          </div>
          <button
            onClick={() => setIsContactOpen(true)}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full hover:bg-cyan-500/20 transition-colors cursor-pointer"
          >
            Contact Me
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl max-w-md w-full relative"
            >
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-2xl font-heading font-bold text-white mb-2">Let's Connect</h3>
              <p className="text-zinc-400 mb-6 text-sm">Feel free to reach out to me for collaborations or inquiries.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800/50">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Email</p>
                    <a href="mailto:tamim.choudhury2890@gmail.com" className="text-zinc-200 hover:text-cyan-400 transition-colors">
                      tamim.choudhury2890@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800/50">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Phone</p>
                    <a href="tel:+917827851769" className="text-zinc-200 hover:text-purple-400 transition-colors">
                      +91 7827851769
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
