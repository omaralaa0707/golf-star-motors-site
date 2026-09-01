"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/locale-provider";
import { OFFERS } from "@/content/media";
import { Reveal } from "@/components/motion/reveal";

/** Egyptian pound amounts, grouped the way their own posts write them. */
function money(n: number, locale: string) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG").format(n);
}

export function Offers() {
  const { content, locale } = useLocale();

  return (
    <section id="offers" className="relative bg-pitch py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-4 md:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5 md:mb-14">
          <div>
            <p className="mb-3 font-display text-[0.72rem] font-bold tracking-[0.16em] text-gold uppercase">
              {content.gallery.heading}
            </p>
            <h2 className="font-display max-w-[20ch] text-display leading-[1.02] font-extrabold uppercase">
              {locale === "ar" ? "أقل مقدم وأقل قسط" : "Lowest deposit, lowest instalment"}
            </h2>
          </div>
          <p className="max-w-[38ch] text-sm leading-relaxed text-cream-dim">
            {content.gallery.intro}{" "}
            {locale === "ar"
              ? "الأسعار كما نُشرت وقابلة للتغيير."
              : "Prices as published and subject to change."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
          {OFFERS.map((o, i) => (
            <Reveal key={`${o.make}-${o.model}-${i}`} delay={(i % 4) * 0.05} y={26}>
              <article className="group relative h-full overflow-hidden rounded-sm border border-cream/10 bg-pitch-2 transition-colors duration-500 hover:border-gold/60">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={o.src}
                    alt={`${o.make} ${o.model}`}
                    fill
                    sizes="(max-width: 768px) 46vw, (max-width: 1280px) 30vw, 22vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>

                <div className="p-4 md:p-5">
                  <p className="font-display text-[0.68rem] font-bold tracking-[0.14em] text-gold uppercase">
                    {o.make}
                  </p>
                  <h3 className="font-display mt-1 text-lg font-extrabold uppercase md:text-xl">
                    {o.model}
                  </h3>

                  <dl className="mt-4 space-y-1.5 border-t border-cream/10 pt-3 text-sm">
                    {o.deposit && (
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-cream-dim">
                          {locale === "ar" ? "المقدم" : "Deposit"}
                        </dt>
                        <dd className="font-display font-bold text-cream tabular-nums">
                          {money(o.deposit, locale)}
                        </dd>
                      </div>
                    )}
                    {o.monthly && (
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-cream-dim">
                          {locale === "ar" ? "القسط الشهري" : "Monthly"}
                        </dt>
                        <dd className="font-display font-bold text-gold tabular-nums">
                          {money(o.monthly, locale)}
                        </dd>
                      </div>
                    )}
                  </dl>

                  <a
                    href="https://wa.me/2001012177600"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block rounded-sm border border-gold/40 py-2.5 text-center font-display text-[0.7rem] font-bold tracking-[0.1em] text-gold uppercase transition-colors group-hover:bg-gold group-hover:text-pitch"
                  >
                    {locale === "ar" ? "اسأل عنها" : "Enquire"}
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
