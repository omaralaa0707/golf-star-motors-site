"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/locale-provider";
import { LINEUP } from "@/content/media";
import { Reveal } from "@/components/motion/reveal";

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
              {locale === "ar" ? "كل الماركات، تحت سقف واحد" : "Every make, under one roof"}
            </h2>
          </div>
          <p className="max-w-[38ch] text-sm leading-relaxed text-cream-dim">
            {content.gallery.intro}
          </p>
        </div>

        <Reveal className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
          {LINEUP.map((car, i) => (
            <article
              key={`${car.make}-${car.model}-${i}`}
              className="group relative h-full overflow-hidden rounded-sm border border-cream/10 bg-pitch-2 transition-colors duration-500 hover:border-gold/60"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={car.src}
                  alt={`${car.make} ${car.model}`}
                  fill
                  sizes="(max-width: 768px) 46vw, (max-width: 1280px) 30vw, 22vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>

              <div className="p-4 md:p-5">
                <p className="font-display text-[0.68rem] font-bold tracking-[0.14em] text-gold uppercase">
                  {car.make}
                </p>
                <h3 className="font-display mt-1 text-lg font-extrabold uppercase md:text-xl">
                  {car.model}
                </h3>

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
          ))}
        </Reveal>
      </div>
    </section>
  );
}
