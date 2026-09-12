"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * The one motion this site keeps: opacity 0→1 plus a small rise, ~450ms
 * ease-out, once per section (see the `[data-reveal]` rule in globals.css).
 * Never a per-child stagger — wrap a section's content once, not each item
 * inside it. `[data-reveal]` is observed by an IntersectionObserver and
 * gains `[data-seen]` the moment it is ~10% into the viewport; the observer
 * then disconnects, so it only ever plays once and never re-triggers on
 * scroll-back. `prefers-reduced-motion` and a scriptless request both leave
 * the content visible (see globals.css and layout.tsx).
 */
export function Reveal({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-seen", "");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} id={id} data-reveal="" className={className}>
      {children}
    </div>
  );
}
