"use client";

import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

type HeroVideoProps = {
  /** Path to the MP4 video. Recommended: put `hero.mp4` in `public/`. */
  src?: string;
  /** Fallback poster/image if video cannot play or user prefers reduced motion */
  fallbackImage: string;
  children?: ReactNode;
};

export default function HeroVideo({ src = "/hero.mp4", fallbackImage, children }: HeroVideoProps) {
  const [canPlayMotion, setCanPlayMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) setCanPlayMotion(false);
    const onChange = () => setCanPlayMotion(!media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {canPlayMotion ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onError={() => setCanPlayMotion(false)}
          poster={fallbackImage}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <Image src={fallbackImage} alt="Hero background" fill className="object-cover" priority />
      )}
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 h-full flex items-center">
        <div className="px-6 sm:px-10 lg:px-14 w-full max-w-6xl">{children}</div>
      </div>
    </section>
  );
}


