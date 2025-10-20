"use client";

import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

type Props = { open: boolean; onClose: () => void; children: ReactNode; fullScreen?: boolean };

export default function Modal({ open, onClose, children, fullScreen }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 bg-black/60 z-[1000]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div className="fixed inset-0 z-[1001] flex items-center justify-center p-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <div className={fullScreen ? "bg-[var(--card-bg)] w-screen h-dvh overflow-hidden" : "bg-[var(--card-bg)] rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[color:var(--brand-taupe)]/30"}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}


