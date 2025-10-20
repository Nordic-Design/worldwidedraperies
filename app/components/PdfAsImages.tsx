"use client";

import { useEffect, useState } from "react";

type Props = { src: string };

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

async function loadPdfJs(): Promise<any> {
  if (typeof window === "undefined") return null;
  if (window.pdfjsLib) return window.pdfjsLib;
  await new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("pdfjs load failed"));
    document.head.appendChild(s);
  });
  const lib = (window as any).pdfjsLib;
  if (lib) {
    lib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
  }
  return lib;
}

export default function PdfAsImages({ src }: Props) {
  const [pages, setPages] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const pdfjsLib = await loadPdfJs();
        if (!pdfjsLib) return;
        const loadingTask = pdfjsLib.getDocument(src);
        const pdf = await loadingTask.promise;
        const images: string[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: ctx, viewport }).promise;
          images.push(canvas.toDataURL("image/png"));
        }
        if (alive) setPages(images);
      } catch (e: any) {
        console.error("PDF render failed", e);
        if (alive) setError("Unable to preview map. Use the links below to open or download the PDF.");
      }
    })();
    return () => { alive = false; };
  }, [src]);

  if (error) return <div className="text-[var(--text-muted)]">{error}</div>;
  if (!pages.length) return <div className="text-[var(--text-muted)]">Loading map…</div>;
  return (
    <div className="grid gap-4">
      {pages.map((url, idx) => (
        <img key={idx} src={url} alt={`PDF page ${idx + 1}`} className="w-full rounded-md" />
      ))}
    </div>
  );
}


