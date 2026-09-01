import type { Metadata } from "next";
import { Archivo, DM_Sans, Parisienne, Cairo } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ScrollProvider } from "@/components/motion/scroll-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-archivo",
});

const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-parisienne",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Golf Star Motors — since 1975, Nasr City",
  description:
    "Buy, sell and finance every make at Golf Star Motors, Ard El Golf, Nasr City. Deposits from 120,000 EGP, instalments up to 8 years, on your ID card alone.",
  icons: { icon: "/media/logo.jpg", apple: "/media/logo.jpg" },
  openGraph: {
    title: "Golf Star Motors — since 1975",
    description: "Fifty years of putting Cairo behind the wheel.",
    images: ["/media/car-15.webp"],
    locale: "ar_EG",
    type: "website",
  },
  other: { "theme-color": "#0a0906" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the site ships its own AR/EN copy, so browser
    // auto-translation would only garble hand-written bilingual text.
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`notranslate ${archivo.variable} ${dm.variable} ${parisienne.variable} ${cairo.variable}`}
    >
      <body className="bg-pitch text-cream antialiased">
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="ar">
          <ScrollProvider />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
