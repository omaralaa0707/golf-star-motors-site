import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Offers } from "@/components/site/offers";
import { Journey } from "@/components/site/journey";
import { Finance } from "@/components/site/finance";
import { Visit } from "@/components/site/visit";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Offers />
        <Journey />
        <Finance />
        <Visit />
      </main>
    </>
  );
}
