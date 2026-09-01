"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { SplitText } from "@/components/motion/split-text";
import { gsap, useGSAP } from "@/lib/gsap";
import { MAKES, TEASER_FRAME } from "@/content/media";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { content, locale } = useLocale();

  useGSAP(
    () => {
      // Fast, retail-energy entrance — nothing lingers.
      gsap.from("[data-fact]", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.45,
      });

      gsap.to("[data-hero-photo]", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
      });
    },
    { scope: root, dependencies: [locale] }
  );

  const facts =
    locale === "ar"
      ? ["موزع معتمد", "تقسيط لحد ٨ سنين", "بالبطاقة الشخصية بس", "من غير استعلام"]
      : ["Authorised distributor", "Up to 8 years", "ID card only", "No credit inquiry"];

  return (
    <section ref={root} id="top" className="relative overflow-hidden pt-26 pb-0 md:pt-32">
      {/* Gold wash + hairline rules: the collateral's own visual furniture. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 start-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-gold-deep)_0%,transparent_68%)] opacity-45 rtl:translate-x-1/2" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/28 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-4 md:px-8">
        {/* Copy and photograph share the fold: the headline sits in its own
            column so it never grows tall enough to push the image below it. */}
        <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-14">
          <div>
            <p className="font-script mb-3 text-2xl text-gold md:text-3xl">Since 1975</p>

            <SplitText
              as="h1"
              text={content.hero.headline}
              className="font-display text-hero leading-[0.98] font-extrabold uppercase text-cream"
              lineStagger={0.07}
              delay={0.1}
            />

            <p className="mt-6 max-w-[46ch] text-lead leading-[1.75] text-cream-dim">
              {content.hero.sub}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#offers"
                className="rounded-sm bg-gold px-7 py-3.5 font-display text-[0.8rem] font-bold tracking-[0.08em] text-pitch uppercase transition-transform duration-300 hover:-translate-y-0.5 hover:bg-gold-lit"
              >
                {content.hero.primaryCta}
              </a>
              <a
                href="https://wa.me/2001012177600"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-cream/25 px-7 py-3.5 font-display text-[0.8rem] font-bold tracking-[0.08em] text-cream uppercase transition-colors hover:border-gold hover:text-gold"
              >
                {content.hero.secondaryCta}
              </a>
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-sm lg:aspect-[5/6]">
            <div data-hero-photo className="absolute inset-[-8%]">
              <Image
                src={TEASER_FRAME}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-pitch via-transparent to-transparent" />
          </div>
        </div>

        {/* Fact strip — the promises they lead with in every post. */}
        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden border-y border-gold/25 bg-gold/20 md:grid-cols-4">
          {facts.map((f) => (
            <li key={f} className="overflow-hidden bg-pitch px-4 py-5 text-center md:py-6">
              <span
                data-fact
                className="block font-display text-[0.72rem] font-bold tracking-[0.09em] text-gold uppercase md:text-[0.82rem]"
              >
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Make ticker: continuous, mechanical, the opposite of a slow fade. */}
      <div id="brands" className="mt-10 scroll-mt-24 overflow-hidden border-b border-gold/20 py-4">
        <div className="flex w-max animate-[ticker_38s_linear_infinite] gap-10 motion-reduce:animate-none">
          {[...MAKES, ...MAKES, ...MAKES].map((m, i) => (
            <span
              key={`${m}-${i}`}
              className="font-display text-2xl font-extrabold tracking-[0.06em] text-cream/22 uppercase md:text-4xl"
            >
              {m}
              <span className="mx-6 text-gold/60">★</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
