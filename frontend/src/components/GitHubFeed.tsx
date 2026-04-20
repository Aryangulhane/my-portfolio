// src/components/GitHubFeed.tsx
"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaCodeBranch } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  payload: { commits?: { message: string }[] };
  created_at: string;
}

export function GitHubFeed() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/Aryangulhane/events/public?per_page=10")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const pushes = data.filter((e: GitHubEvent) => e.type === "PushEvent");
          setEvents(pushes.slice(0, 5));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="space-y-2 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-10 rounded-lg bg-muted/40" />
      ))}
    </div>
  );

  if (!events.length) return (
    <div className="text-sm text-muted-foreground font-mono py-4">
      <span className="text-primary">$</span> No recent pushes found. Check back later.
    </div>
  );

  return (
    <div className="space-y-2">
      {events.map((event, i) => {
        const message = event.payload.commits?.[0]?.message || "Pushed code";
        const repo = event.repo.name.replace("Aryangulhane/", "");
        const date = new Date(event.created_at).toLocaleDateString("en-IN", {
          day: "numeric", month: "short",
        });
        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 rounded-lg border border-border/50 bg-surface/50 px-4 py-2.5 text-sm group hover:border-primary/20 transition-colors"
          >
            <FaCodeBranch className="shrink-0 text-primary" size={12} />
            <span className="font-mono text-primary text-xs shrink-0">{repo}</span>
            <span className="text-muted-foreground truncate flex-1 text-xs">{message}</span>
            <span className="text-muted-foreground text-xs shrink-0 font-mono">{date}</span>
          </motion.div>
        );
      })}
      <Link
        href="https://github.com/Aryangulhane"
        target="_blank"
        className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors mt-2 font-mono"
      >
        <FaGithub size={12} /> View all on GitHub →
      </Link>
    </div>
  );
}
