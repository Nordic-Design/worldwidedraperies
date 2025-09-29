"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NAV_LINKS } from "../components/nav";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 h-dvh w-[260px] bg-[var(--brand-olive)] text-white p-6 hidden md:flex flex-col justify-between">
      <div>
        <Link href="/" className="block mb-8">
          <Image src="/wwd-logo.png" alt="Worldwide Draperies" width={160} height={36} loading="eager" className="h-9 w-auto" />
        </Link>
        <nav className="space-y-2">
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="block relative">
                <div className="px-3 py-2 rounded-md text-lg/7 hover:bg-white/10 transition-colors">
                  {item.label}
                </div>
                {active && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-md bg-white/10 -z-10"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="text-sm/6 text-white/80">
        <p>Celebrating over 55 years</p>
        <p>Crafted in Florida, USA</p>
      </div>
    </aside>
  );
}


