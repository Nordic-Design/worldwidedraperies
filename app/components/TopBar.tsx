"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "./nav";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden sticky top-0 z-50">
      <div className="h-14 bg-[var(--brand-olive)] text-white flex items-center justify-between px-4 shadow-md">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/wwd-logo.png" alt="Worldwide Draperies" width={120} height={24} loading="eager" className="h-6 w-auto" />
        </Link>
        <button aria-label="Open menu" onClick={() => setOpen(true)} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50">
          <div className="w-5 h-[2px] bg-white mb-1" />
          <div className="w-5 h-[2px] bg-white mb-1" />
          <div className="w-5 h-[2px] bg-white" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-y-0 right-0 w-[78%] max-w-xs bg-[var(--card-bg)] shadow-xl z-50"
          >
            <div className="flex items-center justify-between h-14 px-4 border-b border-slate-200/60">
              <span className="font-medium">Menu</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2">✕</button>
            </div>
            <nav className="p-4 space-y-1">
              {NAV_LINKS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 rounded-md ${active ? "bg-[var(--brand-olive)] text-white" : "text-[var(--text-primary)] hover:bg-slate-100"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}
    </div>
  );
}


