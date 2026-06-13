"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  threshold = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el); // une seule fois
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const dirClass =
    direction === "left"  ? "reveal--left"  :
    direction === "right" ? "reveal--right" :
    direction === "scale" ? "reveal--scale" : "";

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : "";

  return (
    <div ref={ref} className={cn("reveal", dirClass, delayClass, className)}>
      {children}
    </div>
  );
}
