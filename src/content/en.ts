import type { SiteContent } from "@/i18n/schema";

export const en: SiteContent = {
  locale: "en",
  dir: "ltr",
  brand: {
    name: "Golf Star Motors",
    shortName: "GOLFSTAR",
    tagline: "Authorised distributor — since 1975",
  },
  nav: [
    { label: "Offers", href: "#offers" },
    { label: "Brands", href: "#brands" },
    { label: "Finance", href: "#finance" },
    { label: "Visit", href: "#visit" },
  ],
  hero: {
    eyebrow: "Ard El Golf, Nasr City",
    headline: "Fifty years on the road with Cairo",
    sub: "Buy, sell and finance every make. Deposits from 120,000 EGP and instalments up to eight years — on your ID card alone.",
    primaryCta: "See the offers",
    secondaryCta: "Book a free consultation",
  },
  about: {
    heading: "From 1975 to today",
    body: [
      "Golf Star opened in 1975 and has been one of the longest-standing car houses in Nasr City ever since. An authorised distributor, buying, selling and financing across every major make.",
      "The idea is simple: get you into your car without running between showrooms — no inquiry, no insurance requirement, no bank fees buried in the paperwork.",
    ],
    stats: [
      { value: "1975", label: "Established" },
      { value: "8", label: "Years to pay" },
      { value: "10+", label: "Makes carried" },
    ],
  },
  services: {
    heading: "How the finance works",
    intro: "Clear terms from day one, with nothing waiting for you at the end.",
    items: [
      {
        title: "No credit inquiry",
        body: "No bank inquiry, no statements. Your national ID is enough, and approval comes back fast.",
      },
      {
        title: "No insurance, no bank fees",
        body: "What you're quoted is what you pay. No administrative charges hidden in the contract.",
      },
      {
        title: "Up to 8 years",
        body: "We size the monthly instalment around your income rather than the other way around, over terms as long as eight years.",
      },
      {
        title: "Special terms",
        body: "Better rates for government employees, doctors, university professors, business owners and homemakers.",
      },
    ],
  },
  gallery: {
    heading: "Current offers",
    intro: "Real prices and deposits, straight from the showroom's own posts.",
    items: [],
  },
  contact: {
    heading: "Come by the showroom, or message us on WhatsApp",
    intro: "The sales team can price a car and work out the instalment before you visit.",
    addressLabel: "Showroom",
    address:
      "7 Shahid Mohamed Abdel Moneim St, off Nabil El Wakkad, Ard El Golf, Nasr City, Cairo",
    phoneLabel: "Phone",
    phones: ["010 1217 7600", "010 0859 2692", "010 0509 0102", "02 2414 5567"],
    hoursLabel: "WhatsApp",
    hours: "010 1217 7600",
    mapsUrl:
      "https://www.google.com/maps/place/%D8%AC%D9%88%D9%84%D9%81+%D8%B3%D8%AA%D8%A7%D8%B1%E2%80%AD/data=!4m2!3m1!1s0x0:0x678fcac3b2cab5e2",
    instagramUrl: "https://www.instagram.com/golf.star.motors/",
    facebookUrl: "https://www.facebook.com/golfstarmotors/",
    cta: "Get directions",
  },
  footer: {
    disclaimer: "Concept design — not an official Golf Star Motors website.",
    rights: "All imagery and offers belong to Golf Star Motors.",
  },
  a11y: {
    toggleLanguage: "Switch to Arabic",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
