"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useScrolledPast } from "@/lib/use-browser";
import { cn } from "@/lib/utils";

export function Nav() {
  const { content, locale, toggleLocale } = useLocale();
  const scrolled = useScrolledPast(80);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-pitch/92 py-2.5 shadow-[0_1px_0_var(--color-gold-deep)] backdrop-blur" : "py-5"
      )}
    >
      <div className="mx-auto flex max-w-[1500px] items-center gap-4 px-4 md:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <Image
            src="/media/logo.jpg"
            alt={content.brand.name}
            width={52}
            height={52}
            priority
            className="h-10 w-10 rounded-sm object-cover md:h-11 md:w-11"
          />
          <span className="hidden leading-tight sm:block">
            <span className="font-display text-gold-plate block text-base font-extrabold tracking-[0.12em]">
              GOLFSTAR
            </span>
            <span className="font-script block text-[0.78rem] text-cream-dim">
              Since 1975
            </span>
          </span>
        </a>

        <nav className="mx-auto hidden items-center gap-8 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-display text-[0.78rem] font-semibold tracking-[0.1em] text-cream/85 uppercase transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <a
            href="https://wa.me/2001012177600"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-sm bg-gold px-5 py-2.5 font-display text-[0.72rem] font-bold tracking-[0.1em] text-pitch uppercase transition-colors hover:bg-gold-lit md:block"
          >
            {locale === "ar" ? "واتساب" : "WhatsApp"}
          </a>

          <button
            onClick={toggleLocale}
            aria-label={content.a11y.toggleLanguage}
            className="rounded-sm border border-gold/45 px-3.5 py-2 font-display text-[0.72rem] font-bold text-gold transition-colors hover:bg-gold hover:text-pitch"
          >
            {locale === "ar" ? "EN" : "ع"}
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? content.a11y.closeMenu : content.a11y.openMenu}
            aria-expanded={open}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className={cn("h-0.5 w-5 bg-gold transition-transform", open && "translate-y-1 rotate-45")} />
            <span className={cn("h-0.5 w-5 bg-gold transition-transform", open && "-translate-y-1 -rotate-45")} />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-500 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <nav className="flex flex-col px-4 pt-4 pb-6">
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-gold/20 py-3.5 font-display text-lg font-semibold text-cream"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
