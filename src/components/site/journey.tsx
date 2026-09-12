"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { SCENES } from "@/content/media";

const SceneMorph = dynamic(
  () => import("@/components/three/scene-morph").then((m) => m.SceneMorph),
  { ssr: false }
);

/**
 * Full-bleed section where scroll drives the shader dissolve between their
 * photographs, with a caption crossfading over the top. The section is
 * taller than the viewport and its content is CSS `position: sticky`, so it
 * stays pinned while the extra scroll distance passes; progress is read
 * straight off the section's bounding rect on scroll/resize, with no motion
 * library involved.
 */
export function Journey() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [activeCap, setActiveCap] = useState(0);
  const { locale } = useLocale();

  const captions =
    locale === "ar"
      ? [
          { k: "road", t: "سافر بعربيتك الجديدة", s: "من جولف ستار" },
          { k: "lot", t: "من غير لف ولا دوران", s: "عربيتك من غير تعقيد" },
          { k: "desert", t: "تمشي في أي سكة", s: "واحنا معاك على الطريق" },
        ]
      : [
          { k: "road", t: "Take the new car and go", s: "From Golf Star" },
          { k: "lot", t: "No running between showrooms", s: "One lot, every make" },
          { k: "desert", t: "Wherever the road goes", s: "We're with you on it" },
        ];

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    let raf = 0;
    function update() {
      const rect = el!.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      progress.current = p;
      const index = Math.min(captions.length - 1, Math.floor(p * captions.length));
      setActiveCap((prev) => (prev === index ? prev : index));
      raf = requestAnimationFrame(update);
    }
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [captions.length]);

  return (
    <section ref={root} className="relative h-[340vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <SceneMorph
          urls={SCENES.map((s) => s.src)}
          progressRef={progress}
          poster={SCENES[0].src}
          className="absolute inset-0 h-full w-full"
        />

        {/* Their photographs are promotional cards with type baked into the top
            edge; a cover crop clips it mid-word. Weighting the scrim toward the
            top lets the car carry the frame and the caption stay dominant. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pitch via-pitch/35 to-pitch/92" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-pitch to-transparent" />

        <div className="relative flex h-full items-end">
          <div className="mx-auto w-full max-w-[1500px] px-4 pb-16 md:px-8 md:pb-24">
            <div className="relative h-[8.5rem] md:h-[11rem]">
              {captions.map((c, i) => (
                <div
                  key={c.k}
                  className="absolute inset-0 transition-opacity duration-500 ease-out"
                  style={{ opacity: i === activeCap ? 1 : 0 }}
                >
                  <p className="font-script mb-2 text-xl text-gold md:text-2xl">{c.s}</p>
                  <h2 className="font-display max-w-[18ch] text-display leading-[1.02] font-extrabold uppercase">
                    {c.t}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
