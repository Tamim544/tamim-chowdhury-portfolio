"use client";

import React, { useState, useEffect } from "react";

interface Comment {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export default function Guestbook() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data loader
  useEffect(() => {
    const mockFeed = [
      {
        id: 1,
        name: "Alex",
        message: "Insane portfolio structure! The animations are clean.",
        created_at: "2 mins ago",
      },
      {
        id: 2,
        name: "Sarah K.",
        message: "Love the floating badge effect in the hero fold.",
        created_at: "1 hour ago",
      },
    ];
    setComments(mockFeed);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setIsSubmitting(true);

    const newComment = {
      id: Date.now(),
      name,
      message,
      created_at: "Just now",
    };

    setComments([newComment, ...comments]);
    setMessage("");
    setName("");
    setIsSubmitting(false);
  };

  return (
    <section id="guestbook" className="py-20 relative overflow-hidden bg-slate-950/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Guest<span className="text-primary text-glow font-heading">book</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leave a public message for anyone visiting my profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Column: Form submission */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">Sign the Guestbook</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Anonymous"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Your note..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-sm transition-colors shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Broadcast Message"}
              </button>
            </form>
          </div>

          {/* Right Column: Live Feed display */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {comments.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-zinc-900/20 border border-zinc-800/60 rounded-xl space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-zinc-200">{item.name}</span>
                  <span className="text-[10px] font-mono text-zinc-600">
                    {item.created_at}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
