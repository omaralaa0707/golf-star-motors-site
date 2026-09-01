"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/locale-provider";
import { Reveal } from "@/components/motion/reveal";
import { LOT_FRAME } from "@/content/media";

export function Visit() {
  const { content, locale } = useLocale();
  const c = content.contact;

  return (
    <>
      <section id="visit" className="relative overflow-hidden bg-pitch py-20 md:py-28">
        <div className="absolute inset-0">
          <Image src={LOT_FRAME} alt="" fill sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-pitch via-pitch/86 to-pitch" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-4 md:px-8">
          <Reveal>
            <h2 className="font-display max-w-[20ch] text-display leading-[1.04] font-extrabold uppercase">
              {c.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-[52ch] text-lead leading-relaxed text-cream-dim">{c.intro}</p>
          </Reveal>

          <div className="mt-12 grid gap-8 border-t border-gold/25 pt-10 md:grid-cols-3">
            <Reveal>
              <p className="font-display mb-3 text-[0.68rem] font-bold tracking-[0.16em] text-gold uppercase">
                {c.addressLabel}
              </p>
              <p className="max-w-[30ch] leading-[1.75] text-cream">{c.address}</p>
              <a
                href={c.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-display text-[0.72rem] font-bold tracking-[0.1em] text-gold uppercase underline-offset-4 hover:underline"
              >
                {c.cta}
              </a>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="font-display mb-3 text-[0.68rem] font-bold tracking-[0.16em] text-gold uppercase">
                {c.phoneLabel}
              </p>
              <ul className="space-y-1.5">
                {c.phones.map((p) => (
                  <li key={p}>
                    <a
                      href={`tel:${p.replace(/[^\d+]/g, "")}`}
                      dir="ltr"
                      className="text-cream transition-colors hover:text-gold"
                    >
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="font-display mb-3 text-[0.68rem] font-bold tracking-[0.16em] text-gold uppercase">
                {c.hoursLabel}
              </p>
              <a
                href="https://wa.me/2001012177600"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-sm bg-gold px-6 py-3 font-display text-[0.76rem] font-bold tracking-[0.08em] text-pitch uppercase transition-colors hover:bg-gold-lit"
              >
                {locale === "ar" ? "كلمنا على واتساب" : "Message on WhatsApp"}
              </a>
              <div className="mt-5 flex gap-3">
                {c.instagramUrl && (
                  <a
                    href={c.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-[0.7rem] font-bold tracking-[0.1em] text-cream-dim uppercase hover:text-gold"
                  >
                    Instagram
                  </a>
                )}
                {c.facebookUrl && (
                  <a
                    href={c.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-[0.7rem] font-bold tracking-[0.1em] text-cream-dim uppercase hover:text-gold"
                  >
                    Facebook
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WhatsApp is how this showroom actually gets contacted, and the header
          button is desktop-only — so mobile gets a persistent bar instead. */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-gold/30 bg-pitch/95 p-3 backdrop-blur md:hidden">
        <a
          href="https://wa.me/2001012177600"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-sm bg-gold py-3 text-center font-display text-[0.78rem] font-bold tracking-[0.06em] text-pitch uppercase"
        >
          {locale === "ar" ? "واتساب" : "WhatsApp"}
        </a>
        <a
          href="tel:01012177600"
          className="flex-1 rounded-sm border border-cream/25 py-3 text-center font-display text-[0.78rem] font-bold tracking-[0.06em] text-cream uppercase"
        >
          {locale === "ar" ? "اتصل" : "Call"}
        </a>
      </div>

      <footer className="border-t border-gold/25 bg-pitch-2 pb-24 pt-10 md:pb-10">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/media/logo.jpg"
              alt={content.brand.name}
              width={48}
              height={48}
              className="h-10 w-10 rounded-sm object-cover"
            />
            <div>
              <p className="font-display text-gold-plate text-sm font-extrabold tracking-[0.12em]">
                GOLFSTAR
              </p>
              <p className="text-xs text-cream-dim">{content.brand.tagline}</p>
            </div>
          </div>

          <div className="text-xs text-cream-dim md:text-end">
            <p>{content.footer.disclaimer}</p>
            <p className="mt-1">
              {content.footer.rights}
              <span className="mx-2 opacity-40">/</span>
              {locale === "ar" ? "صُمم بواسطة Claude" : "Designed by Claude"}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
