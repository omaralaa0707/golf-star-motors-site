"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { gsap, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/motion/reveal";
import { KEYS_FRAME } from "@/content/media";

export function Finance() {
  const root = useRef<HTMLElement>(null);
  const { content, locale } = useLocale();

  useGSAP(
    () => {
      // Counters tick up: the numbers are the pitch on this site.
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const fmt = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = fmt.format(Math.round(obj.v));
          },
        });
      });
    },
    { scope: root, dependencies: [locale] }
  );

  return (
    <section ref={root} id="finance" className="relative border-y border-gold/20 bg-pitch-2 py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <p className="mb-3 font-display text-[0.72rem] font-bold tracking-[0.16em] text-gold uppercase">
              {content.services.heading}
            </p>
            <h2 className="font-display max-w-[16ch] text-display leading-[1.04] font-extrabold uppercase">
              {locale === "ar" ? "قسّطها وانت مرتاح" : "Finance it without the runaround"}
            </h2>
            <p className="mt-5 max-w-[46ch] text-lead leading-[1.75] text-cream-dim">
              {content.services.intro}
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-cream/12 pt-8">
              <div>
                <p className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold text-gold tabular-nums">
                  <span data-count="1975">0</span>
                </p>
                <p className="mt-2 font-display text-[0.66rem] font-bold tracking-[0.12em] text-cream-dim uppercase">
                  {locale === "ar" ? "سنة التأسيس" : "Established"}
                </p>
              </div>
              <div>
                <p className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold text-gold tabular-nums">
                  <span data-count="8">0</span>
                </p>
                <p className="mt-2 font-display text-[0.66rem] font-bold tracking-[0.12em] text-cream-dim uppercase">
                  {locale === "ar" ? "سنين تقسيط" : "Years to pay"}
                </p>
              </div>
              <div>
                <p className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold text-gold tabular-nums">
                  <span data-count="120000">0</span>
                </p>
                <p className="mt-2 font-display text-[0.66rem] font-bold tracking-[0.12em] text-cream-dim uppercase">
                  {locale === "ar" ? "أقل مقدم" : "Lowest deposit"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-px bg-gold/22 sm:grid-cols-2">
            {content.services.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="h-full bg-pitch-2 p-6 md:p-8">
                  <span className="font-display text-[0.68rem] font-bold tracking-[0.16em] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-4 text-lg font-extrabold uppercase md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.75] text-cream-dim">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Heritage strip: their own "خبرة سنين معاك من ٧٥" key photograph. */}
        <div className="mt-16 grid items-center gap-8 border-t border-cream/12 pt-12 md:mt-24 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={KEYS_FRAME}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 34vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-script mb-3 text-2xl text-gold md:text-3xl">Since 1975</p>
            <h3 className="font-display max-w-[18ch] text-section font-extrabold uppercase">
              {content.about.heading}
            </h3>
            <div className="mt-5 space-y-4">
              {content.about.body.map((p, i) => (
                <p key={i} className="max-w-[56ch] leading-[1.8] text-cream-dim">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
