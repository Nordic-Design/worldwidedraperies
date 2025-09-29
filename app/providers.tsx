"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type TransitionProviderProps = {
  children: ReactNode;
};

export function TransitionProvider({ children }: TransitionProviderProps) {
  const pathname = usePathname();
  return (
    <MotionConfig transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
      <AnimatePresence mode="wait" initial={false}>
        <div key={pathname} className="min-h-dvh will-change-transform">
          {children}
        </div>
      </AnimatePresence>
    </MotionConfig>
  );
}


