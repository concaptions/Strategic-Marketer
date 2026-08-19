import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StickyCta } from "@/components/sticky-cta";
import { ExitIntent } from "@/components/exit-intent";
import { Hero } from "@/components/sections/hero";
import { Trust } from "@/components/sections/trust";
import { Problem } from "@/components/sections/problem";
import { Stats } from "@/components/sections/stats";
import { Pov } from "@/components/sections/pov";
import { Method } from "@/components/sections/method";
import { Activation } from "@/components/sections/activation";
import { Assessment } from "@/components/sections/assessment";
import { Proof } from "@/components/sections/proof";
import { Industries } from "@/components/sections/industries";
import { Why } from "@/components/sections/why";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Trust />
        <Problem />
        <Stats />
        <Pov />
        <Method />
        <Activation />
        <Assessment />
        <Proof />
        <Industries />
        <Why />
        <FinalCta />
      </main>
      <SiteFooter />
      <StickyCta />
      <ExitIntent />
    </>
  );
}
