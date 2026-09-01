"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { gsap, useGSAP } from "@/lib/gsap";
import { SCENES } from "@/content/media";

const SceneMorph = dynamic(
  () => import("@/components/three/scene-morph").then((m) => m.SceneMorph),
  { ssr: false }
);

/**
 * Pinned full-bleed section where scroll drives the shader dissolve between
 * their photographs, with a caption swapping over the top.
 */
export function Journey() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const { locale } = useLocale();

  const captions =
    locale === "ar"
      ? [
          { k: "road", t: "سافر بعربيتك الجديدة", s: "من جولف ستار" },
          { k: "lot", t: "منغير لف ولا دوران", s: "عربيتك بدون تعقيد" },
          { k: "desert", t: "تمشي في أي سكة", s: "واحنا معاك على الطريق" },
          { k: "collection", t: "بيع • اشتري • قسّط", s: "كل أنواع السيارات" },
        ]
      : [
          { k: "road", t: "Take the new car and go", s: "From Golf Star" },
          { k: "lot", t: "No running between showrooms", s: "One lot, every make" },
          { k: "desert", t: "Wherever the road goes", s: "We're with you on it" },
          { k: "collection", t: "Buy • Sell • Finance", s: "Every kind of car" },
        ];

  useGSAP(
    () => {
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=280%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        },
      });

      // Captions hand off in step with the dissolve.
      captions.forEach((_, i) => {
        if (i === 0) return;
        st.to(`[data-cap="${i - 1}"]`, { opacity: 0, y: -22, duration: 0.4 }, i - 1)
          .fromTo(
            `[data-cap="${i}"]`,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.4 },
            i - 1 + 0.15
          );
      });
    },
    { scope: root, dependencies: [locale] }
  );

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden">
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
                data-cap={i}
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
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
    </section>
  );
}
